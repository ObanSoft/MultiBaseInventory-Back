const express = require("express");
const {
  createPortatil,
  getAllPortatiles,
  getPortatilByIdOrSerial,
  updatePortatil,
  deletePortatil,
} = require("../controllers/portatilController");

const router = express.Router();

router.post("/", createPortatil);

router.get("/", getAllPortatiles);

router.get("/search", getPortatilByIdOrSerial);

router.put("/:serial", updatePortatil);

router.delete("/:id", deletePortatil);

module.exports = router;