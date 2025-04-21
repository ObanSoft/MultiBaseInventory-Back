const User = require("../models/User");

const register = async (req, res) => {
  const { identificacion, correo, contraseña } = req.body;

  try {
    
    const existingUser = await User.findOne({
      $or: [{ identificacion }, { correo }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Ya existe un usuario con esta identificación o correo",
      });
    }

    const user = await User.create({ identificacion, correo, contraseña });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: {
        id: user._id,
        identificacion: user.identificacion,
        correo: user.correo,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
};



module.exports = { register };