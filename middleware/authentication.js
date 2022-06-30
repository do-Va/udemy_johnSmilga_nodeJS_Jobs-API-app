const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  // Metot çalıştığında istek body'si içerisindeki authorization değerini alıyoruz.
  const authHeader = req.headers.authorization;

  // alınan değerin dolu olduğunu veya Bearer ile başlayıp başlamadığını sorguluyoruz. Eğer false dönerse hata gönderiyoruz.
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  // Eğer sıkıntı yoksa Bearer yazısından sonraki değeri toke'na atıyoruz.
  const token = authHeader.split(" ")[1];

  try {
    // Sonrasında gelen token'ı gizli şifremiz ile dönüştürüp o token'a kayıtlı veriyi alıp payload'a atıyoruz.
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Daha sonrasında payload içerisindeki verileri parçalayıp user adlı bir değişkene atayıp istek olarak sonraki metodumuza gönderiyoruz.
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
