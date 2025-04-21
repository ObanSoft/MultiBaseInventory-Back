const jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginUser = async (req, res) => {
  const { identificacion, contraseña } = req.body;

  try {
    const user = await User.findOne({ identificacion });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await user.matchPassword(contraseña);
    if (!isMatch) {
      return res.status(400).json({ message: "Los datos no coinciden con los registrados" });
    }

    const token = jwt.sign(
      { identificacion: user.identificacion, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } 
    );

    res.status(200).json({
      identificacion: user.identificacion,
      token,
      rol: user.rol,
    });
  } catch (error) {
    console.error("Error en login:", error.message);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

module.exports = loginUser;