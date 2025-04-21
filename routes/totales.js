const express = require("express");
const { getTotalPortatiles } = require("../controllers/totalesController");

const router = express.Router();

router.get("/", getTotalPortatiles);

module.exports = router;