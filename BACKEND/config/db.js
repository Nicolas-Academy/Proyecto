const mongoose = require('mongoose');

const conectarDB = async (MONGODB_URI) => {
    try {
        //Esta es una forma odsoleta de hacer la importacion de la base de datos
        //await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        await mongoose.connect(MONGODB_URI);
        //Mensaje que verisifa que la coneccion con la base de datos esta conectada correcta mente
        console.log('Conectado a MongoDB');
    } catch (error) {
        //Caso contrario saldra este erro que ubo un problema el la implementacion de la conexion a mongo
        console.error('Error al conectar a MongoDB:', error);
    }
};

module.exports = conectarDB; // Exportar la función
