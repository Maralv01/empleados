const express = require('express');
const router = express.Router();
const empleadoCtrl = require('../controllers/empleado.controller');

router.get('/', empleadoCtrl.getEmpleados);
router.post('/', empleadoCtrl.createEmpleados);
router.get('/:id', empleadoCtrl.getUnicoEmpleado);
router.put('/:id', empleadoCtrl.editarEmpleado);
router.delete('/:id', empleadoCtrl.eliminarEmpleado);

module.exports = router;


