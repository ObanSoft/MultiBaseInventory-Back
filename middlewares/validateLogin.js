const { check, validationResult } = require("express-validator");

const validateLogin = [
  check("identificacion")
    .notEmpty()
    .withMessage("El número de identificación es obligatorio"),
  check("contraseña")
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validateLogin;