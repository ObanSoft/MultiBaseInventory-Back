const express = require('express');
const router = express.Router();
const controller = require('../controllers/controllerAsignacionesPortatiles');

router.post('/', controller.crearAsignacion);

router.get('/:identificacion', controller.buscarPorIdentificacion);

router.put('/:serial_portatil', controller.editarAsignacion);

router.delete('/', controller.eliminarAsignacion);

module.exports = router;