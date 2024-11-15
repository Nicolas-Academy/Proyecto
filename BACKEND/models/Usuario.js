const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});

usuarioSchema.index({ email: 1 }); // Indexa el campo `email`

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
