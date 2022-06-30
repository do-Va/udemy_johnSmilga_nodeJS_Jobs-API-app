const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
  },
});

// Veri tabanına saldırıldığında şifrelerin alınmasını engellemek için hash'leme yapıp veri tabanına kaydediyoruz.
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// user'ın id'sini ve name'ini alıp json token oluşturuyoruz ve token'ı dönüyoruz.
UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// Şifreleri karşılaştır.
UserSchema.methods.comparePassword = async function (canditatePassword) {
  // parametre ile gelen şifreyi bcrypte çevirip var olan şifre ile karşılaştırıyoruz. Eğer doğruysa true değilse false dönüyoruz.
  const isMatch = await bcrypt.compare(canditatePassword, this.password);

  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
