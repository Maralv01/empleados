const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { mongoose } = require('./database');

app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.static(__dirname + '/public')); // ✅ Para servir el frontend
app.use('/api/empleados', require('./routes/empleado.routes'));

app.listen(app.get('port'), () => {
  console.log('Servidor activo en el puerto', app.get('port'));
});
