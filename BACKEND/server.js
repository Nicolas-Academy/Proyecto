// En la parte superior importamos los módulos a utilizar para la creación de nuestro proyecto
require('dotenv').config(); // Cargar las variables de entorno
const express = require('express'); 
const cors = require('cors');
const authRoutes = require('./router/authRoutes'); // Importar el enrutador de autenticación
const proyectosRoutes = require('./router/proyectoRoutes'); // Importar el enrutador de proyectos
const tareasRoutes = require('./router/tareaRoutes'); // Importar el enrutador de tareas
const conectarDB = require('./config/db'); // Importar la función para conectar a la base de datos

const app = express();
const port = process.env.PORT || 5000; // Instanciamos el puerto que vamos a utilizar

app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes en formato JSON

// La URL de conexión te la da el mismo mongoose.
const MONGODB_URI = process.env.MONGODB_URI; // Asegúrate de que esto esté en tu .env
conectarDB(MONGODB_URI); // Llamar a la función de conexión

// Habilitación de CORS en el proyecto
app.use(cors({
    origin: 'http://localhost:5173', // Esta es la URL del proyecto
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Estos son los métodos que vamos a permitir
    credentials: true, // Si usas algún tipo de autenticación
})); 

// Usar el enrutador
app.use('/api', authRoutes); // Rutas de autenticación
app.use('/api/proyectos', proyectosRoutes); // Rutas de proyectos
app.use('/api/proyectos/:proyectId/tarea', tareasRoutes); // Rutas de tareas relacionadas con un proyecto específico

// Importar y usar el middleware de manejo de errores (debe ir al final para capturar todos los errores)
const { handleError } = require('./middleware/errorMiddleware'); 
app.use(handleError);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
