const mongoose = require('mongoose');

const ProyectoSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, trim: true },
    fechaInicio: { type: Date, required: true, default: Date.now },
    fechaFin: { type: Date, required: true } // Este campo es obligatorio
}, {
    timestamps: true
});

const Proyecto = mongoose.model('Proyecto', ProyectoSchema);
module.exports = Proyecto;
