const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
    nombre: String,
    puesto: String,
    salario: Number
});

module.exports = mongoose.model('Empleado', EmpleadoSchema);


