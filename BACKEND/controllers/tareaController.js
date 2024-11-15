
const Tarea = require('../models/Tarea');
const { CustomError } = require('../middleware/errorMiddleware');

// Crear una nueva tarea para un proyecto específico
exports.crearTarea = async (req, res, next) => {
    const { titulo, descripcion, estado, prioridad } = req.body;
    const { projectId } = req.params; // Verifica que usas 'projectId' y no 'proyectoId'

    try {
        const newTarea = new Tarea({
            titulo,
            descripcion,
            estado,
            prioridad,
            proyecto: projectId
        });
        const tarea = await newTarea.save();
        res.status(201).json(tarea);
    } catch (error) {
        next(error);
    }
};

// Obtener todas las tareas de un proyecto
exports.obtenerTareas = async (req, res, next) => {
    const { projectId } = req.params;
    try {
        const tareas = await Tarea.find({ proyecto: projectId });
        res.json(tareas);
    } catch (error) {
        next(error);
    }
};


// Actualizar una tarea por ID
exports.actualizarTarea = async (req, res, next) => {
    const { tareaId } = req.params;
    const { titulo, descripcion, estado, prioridad } = req.body;
    try {
        const tarea = await Tarea.findByIdAndUpdate(
            tareaId,
            { titulo, descripcion, estado, prioridad },
            { new: true }
        );
        if (!tarea) throw new CustomError('Tarea no encontrada', 404);
        res.json(tarea);
    } catch (error) {
        next(error);
    }
};
// Eliminar una tarea por ID
exports.eliminarTarea = async (req, res, next) => {
    const { tareaId } = req.params;
    try {
        const tarea = await Tarea.findByIdAndDelete(tareaId);
        if (!tarea) throw new CustomError('Tarea no encontrada', 404);
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        next(error);
    }
};