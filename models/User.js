const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  identificacion: {
    type: String,
    required: true,
    unique: true,
    minlength: 8, 
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  },
  contraseña: {
    type: String,
    required: true,
    minlength: 8, 
  },
  rol: {
    type: String,
    default: "agente", 
    enum: ["admin", "agente"], 
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("contraseña")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.contraseña = await bcrypt.hash(this.contraseña, salt);
  next();
});


UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.contraseña);
};

module.exports = mongoose.model("User", UserSchema);