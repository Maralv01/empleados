const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Empleado = require('./models/empleado');

// Rutas
app.get('/api/empleados', async (req, res) => {
  const empleados = await Empleado.find();
  res.json(empleados);
});

app.post('/api/empleados', async (req, res) => {
  const nuevo = new Empleado(req.body);
  await nuevo.save();
  res.json({ mensaje: 'Empleado guardado' });
});

app.get('/api/empleados/:id', async (req, res) => {
  const empleado = await Empleado.findById(req.params.id);
  res.json(empleado);
});

app.put('/api/empleados/:id', async (req, res) => {
  await Empleado.findByIdAndUpdate(req.params.id, req.body);
  res.json({ mensaje: 'Empleado actualizado' });
});

app.delete('/api/empleados/:id', async (req, res) => {
  await Empleado.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Empleado eliminado' });
});

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión', err));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor activo en el puerto ${PORT}`));
