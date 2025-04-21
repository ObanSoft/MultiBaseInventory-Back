const Asignaciones = require('../models/asignacionesPortatiles');
const User = require('../models/User');

const crearAsignacion = async (req, res) => {
  try {
    const { user_id_mongo, identificacion, serial_portatil } = req.body;

    const usuario = await User.findById(user_id_mongo);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado en MongoDB' });
    }

    if (usuario.identificacion !== identificacion) {
      return res.status(400).json({ error: 'El numero de identificacion no existe en la base de datos' });
    }

    const asignacionExistente = await Asignaciones.buscarPorUsuarioIdentificacionYSerial(user_id_mongo, identificacion, serial_portatil);
    if (asignacionExistente.length > 0) {
      return res.status(400).json({ error: 'Ya existe una asignación con estos datos' });
    }

    const rol_usuario = usuario.rol;

    const result = await Asignaciones.crear({
      user_id_mongo,
      identificacion,
      serial_portatil,
      rol_usuario
    });

    res.status(200).json({
      message: 'Asignación creada exitosamente',
      rol_usuario
    });
  } catch (error) {
    console.error('Error al crear asignación:', error);
    res.status(500).json({ error: 'Número serial no registrado' });
  }
};

const buscarPorIdentificacion = async (req, res) => {
  try {
    const { identificacion } = req.params;
    console.log('Identificación recibida:', identificacion); // Debug

    const asignaciones = await Asignaciones.buscarPorIdentificacion(identificacion);
    
    if (asignaciones.length === 0) {
      return res.status(400).json({ error: 'Identificación no registrada' });
    }
    
    res.status(200).json(asignaciones);
  } catch (error) {
    console.error('Error al buscar asignación:', error);
    res.status(500).json({ error: 'Error al buscar asignación' });
  }
};

const editarAsignacion = async (req, res) => {
  try {
    const { serial_portatil } = req.params;
    const { user_id_mongo, identificacion, rol_usuario } = req.body;

    const result = await Asignaciones.editarPorSerial(serial_portatil, {
      user_id_mongo,
      identificacion,
      rol_usuario
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Asignación no encontrada para ese serial' });
    }

    res.status(200).json({ message: 'Asignación actualizada' });
  } catch (error) {
    console.error('Error al editar asignación:', error);
    res.status(500).json({ error: 'Error al editar asignación' });
  }
};

const eliminarAsignacion = async (req, res) => {
  try {
    const { serial_portatil, identificacion } = req.body;

    if (!serial_portatil || !identificacion) {
      return res.status(400).json({ error: 'Faltan datos: se requiere serial_portatil y numero_identificacion' });
    }

    const eliminados = await Asignaciones.eliminarPorSerialYIdentificacion(serial_portatil, identificacion);

    if (eliminados === 0) {
      return res.status(404).json({ error: 'No se encontró una asignación con ese serial e identificación' });
    }

    res.status(200).json({ message: 'Asignación eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar asignación:', error);
    res.status(500).json({ error: 'Error al eliminar asignación' });
  }
};

module.exports = {
  crearAsignacion,
  buscarPorIdentificacion,
  editarAsignacion,
  eliminarAsignacion,
};
