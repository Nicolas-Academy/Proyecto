// models/Tarea.js
const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    proyecto: { type: mongoose.Schema.Types.ObjectId, ref: 'Proyecto', required: true },
    titulo: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    estado: {
        type: String,
        enum: ['pendiente', 'en progreso', 'completada'],
        default: 'pendiente'
    },
    prioridad: {
        type: Number,
        enum: [1, 2, 3, 4, 5], // Define las opciones numéricas de prioridad
        default: 3 // Puedes definir un valor predeterminado, por ejemplo, 3 (media prioridad)
    }
}, {
    timestamps: true
});

const Tarea = mongoose.model('Tarea', tareaSchema);
module.exports = Tarea;
