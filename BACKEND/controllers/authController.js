const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { CustomError } = require('../middleware/errorMiddleware'); // Importar CustomError para errores específicos

const JW_SECRET = process.env.JWT_SECRET_KEY; // Asegúrate de que el nombre de la variable sea correcto en tu .env

// Registro de usuario
exports.registrarUsuario = async (req, res, next) => {
    const { nombre, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Usuario({ nombre, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send('Usuario creado');
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};

// Login de usuario
exports.loginUsuario = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await Usuario.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new CustomError('Credenciales inválidas', 401); // Usar CustomError para lanzar un error específico
        }
        const token = jwt.sign({ id: user._id, nombre: user.nombre }, JW_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};
