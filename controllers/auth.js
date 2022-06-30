const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  // Metot çalıştığında öncelikle http istek body'sinden gelen json bilgiler ile User oluşturuyoruz.
  const user = await User.create({ ...req.body });

  // Sonrasında kayıt yapılan user'ın bilgileri ile json token oluşturuyoruz.
  const token = user.createJWT();

  // en son olarak user'ın name'ini ve oluşan token'ı cevap olarak dönüyoruz.
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  // kullanıcı girişi isteği yaptığında istek body'sinde gelen email ve password'u ayrı değişkenlere atıyoruz.
  const { email, password } = req.body;

  // Öncelikle gelen email ve password'un boş gelip gelmediğini kontrol ediyoruz.
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  // dolu olduğunu öğrendikten sonra o email'e ait kullanıcının bilgilerini veritabanından çekiyoruz.
  const user = await User.findOne({ email });

  // Eğer o email'e sahip kullanıcı yoksa hata gönderiyoruz.
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // Eğer öyle bir user varsa şifresini karşılaştırıyoruz.
  const isPasswordCorrect = await user.comparePassword(password);

  // Karşılaştırılan şifre doğru değilse hata gönderiyoruz.
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  // Eğer şifre doğruysa kullanıcı bilgilerine göre token oluşturuyoruz
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = {
  register,
  login,
};
