const mongoose = require('mongoose');
const URI = 'mongodb://localhost/empleadosDB';

mongoose.connect(URI)
    .then(() => console.log('MongoDB conectada'))
    .catch(err => console.error('Error de conexión:', err));

module.exports = mongoose;


