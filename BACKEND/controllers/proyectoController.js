// controllers/proyectoController.js
const Proyecto = require('../models/Proyecto');
const { CustomError } = require('../middleware/errorMiddleware'); // Importar CustomError para errores específicos

// Crear un nuevo proyecto
exports.crearProyecto = async (req, res, next) => {
    const { nombre, descripcion, fechaInicio, fechaFin } = req.body;
    try {
        const newProyecto = new Proyecto({
            nombre,
            descripcion,
            fechaInicio,
            fechaFin,
            usuario: req.user.id // Esto asigna el ID del usuario autenticado automáticamente
        });
        const proyecto = await newProyecto.save();
        res.status(201).json(proyecto);
    } catch (error) {
        next(error);
    }
};


// Obtener un proyecto específico del usuario
exports.obtenerProyecto = async (req, res, next) => {
    const { id } = req.params;
    try {
        const proyecto = await Proyecto.findById(id);
        if (!proyecto) {
            throw new CustomError('Proyecto no encontrado', 404); // Error si el proyecto no se encuentra
        }
        res.json(proyecto);
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};

// Actualizar un proyecto por ID
exports.actualizarProyecto = async (req, res, next) => {
    const { id } = req.params;
    const { nombre, descripcion } = req.body;
    try {
        const proyecto = await Proyecto.findByIdAndUpdate(id, { nombre, descripcion }, { new: true });
        if (!proyecto) throw new CustomError('Proyecto no encontrado', 404); // Error si no se encuentra el proyecto
        res.json(proyecto);
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};

// Eliminar un proyecto por ID
exports.eliminarProyecto = async (req, res, next) => {
    const { id } = req.params;
    try {
        const proyecto = await Proyecto.findByIdAndDelete(id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }
        res.json({ message: 'Proyecto eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};
exports.obtenerProyectos = async (req, res, next) => {
    try {
        const proyectos = await Proyecto.find({ usuario: req.user.id });
        res.json(proyectos);
    } catch (error) {
        next(error);
    }
};
