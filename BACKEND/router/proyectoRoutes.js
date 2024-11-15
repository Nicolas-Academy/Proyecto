const express = require('express');
const tareaRoutes = require('./tareaRoutes'); // Importa las rutas de tareas
const {
    crearProyecto,
    obtenerProyectos,
    obtenerProyecto,
    actualizarProyecto,
    eliminarProyecto
} = require('../controllers/proyectoController'); // Importa las funciones del controlador de proyectos

const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Crear un proyecto
router.post('/', authMiddleware, crearProyecto);

// Obtener todos los proyectos del usuario autenticado
router.get('/', authMiddleware, obtenerProyectos);

// Obtener un proyecto específico del usuario
router.get('/:id', authMiddleware, obtenerProyecto);

// Actualizar un proyecto por ID
router.put('/:id', authMiddleware, actualizarProyecto);

// Eliminar un proyecto por ID
router.delete('/:id', authMiddleware, eliminarProyecto);

// Rutas para tareas de un proyecto específico
router.use('/:projectId/tareas', authMiddleware, tareaRoutes);

module.exports = router;
