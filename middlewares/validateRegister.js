const { check, validationResult } = require("express-validator");

const validateRegister = [
  check("identificacion")
    .isLength({ min: 8 })
    .withMessage("El número de identificación debe tener al menos 8 dígitos"),
  check("correo")
    .isEmail()
    .withMessage("Debe ser un correo electrónico válido"),
  check("contraseña")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe incluir al menos una letra minúscula")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe incluir al menos una letra mayúscula")
    .matches(/\d/)
    .withMessage("La contraseña debe incluir al menos un número")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("La contraseña debe incluir al menos un carácter especial"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateRegister;