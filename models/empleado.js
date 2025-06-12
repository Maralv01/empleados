const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  nombre: String,
  puesto: String,
  salario: Number
});

module.exports = mongoose.model('Empleado', empleadoSchema);



