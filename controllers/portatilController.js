const Portatil = require("../models/Portatil");
const Asignaciones = require("../models/asignacionesPortatiles");


const createPortatil = async (req, res) => {
  try {
    const { serial } = req.body;

    if (!serial || serial.length < 5) {
      return res.status(400).json({ message: "El serial debe tener al menos 5 caracteres" });
    }

    const newPortatil = await Portatil.create(req.body);

    const total = await Portatil.getTotal();
    res.status(201).json({
      message: "Portátil creado con éxito",
      portatil: newPortatil,
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "Ya existe un portatil con el mismmo numero serial" });
  }
};


const getAllPortatiles = async (req, res) => {
  try {
    const portatiles = await Portatil.getAll();
    res.status(200).json(portatiles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener portátiles" });
  }
};

const getPortatilByIdOrSerial = async (req, res) => {
  try {
    const { id, serial } = req.query;
    const portatil = await Portatil.getByIdOrSerial(id, serial);
    if (!portatil) {
      return res.status(404).json({ message: "Portátil no encontrado" });
    }
    res.status(200).json(portatil);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener portátil" });
  }
};

const updatePortatil = async (req, res) => {
  try {
    const { serial } = req.params;
    const updatedRows = await Portatil.updateBySerial(serial, req.body);
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Portátil no encontrado" });
    }
    res.status(200).json({ message: "Portátil actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar portátil" });
  }
};

const deletePortatil = async (req, res) => {
  try {
    const { id } = req.params;

    const serialInfo = await Portatil.obtenerSerialPorId(id);
    if (!serialInfo) {
      return res.status(404).json({ message: "Portátil no encontrado" });
    }

    const { serial } = serialInfo; 
    await Asignaciones.eliminarPorSerial(serial); 

    const deletedRows = await Portatil.delete(id);
    if (deletedRows === 0) {
      return res.status(404).json({ message: "Portátil no encontrado al eliminar" });
    }

    await Portatil.decrementTotal();

    res.status(200).json({ message: "Portátil y asignaciones eliminadas" });

  } catch (error) {
    console.error("Error al eliminar portátil y asignación:", error);
    res.status(500).json({ message: "Error al eliminar portátil" });
  }
};



module.exports = {
  createPortatil,
  getAllPortatiles,
  getPortatilByIdOrSerial,
  updatePortatil,
  deletePortatil,
};