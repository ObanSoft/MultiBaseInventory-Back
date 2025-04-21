const Totales = require("../models/Totales");

const getTotalPortatiles = async (req, res) => {
  try {
    const total = await Totales.getTotalPortatiles();
    res.status(200).json({ total });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener total de portátiles" });
  }
};

module.exports = { getTotalPortatiles };
