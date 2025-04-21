const express = require("express");
const { register } = require("../controllers/authController");
const  loginUser  = require("../controllers/controllerLogin");
const validateRegister = require("../middlewares/validateRegister");
const validateLogin = require("../middlewares/validateLogin");


const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, loginUser);

module.exports = router;