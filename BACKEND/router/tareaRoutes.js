const express = require('express');
const { 
    crearTarea, 
    obtenerTareas, 
    actualizarTarea, 
    eliminarTarea 
} = require('../controllers/tareaController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

// Crear una nueva tarea en un proyecto
router.post('/', authMiddleware, crearTarea);

// Obtener todas las tareas de un proyecto
router.get('/', authMiddleware, obtenerTareas);

// Actualizar una tarea por ID
router.put('/:tareaId', authMiddleware, actualizarTarea);

// Eliminar una tarea por ID
router.delete('/:tareaId', authMiddleware, eliminarTarea);


module.exports = router;
