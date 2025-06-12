const Empleado = require('../models/empleado');

const empleadoCtrl = {};

// ✅ Esta función es la que falta
empleadoCtrl.getEmpleados = async (req, res) => {
    const empleados = await Empleado.find();
    res.json(empleados);
};

empleadoCtrl.createEmpleados = async (req, res) => {
    const empleado = new Empleado({
        nombre: req.body.nombre,
        puesto: req.body.puesto, // Asegúrate de que en el formulario se llame "puesto" y no "cargo"
        salario: req.body.salario
    });
    await empleado.save();
    res.json({ status: 'Empleado guardado' });
};

empleadoCtrl.getUnicoEmpleado = async (req, res) => {
    const empleado = await Empleado.findById(req.params.id);
    res.json(empleado);
};

empleadoCtrl.editarEmpleado = async (req, res) => {
    await Empleado.findByIdAndUpdate(req.params.id, req.body);
    res.json({ mensaje: 'Empleado actualizado' });
};

empleadoCtrl.eliminarEmpleado = async (req, res) => {
    await Empleado.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Empleado eliminado' });
};

module.exports = empleadoCtrl;



