const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY; // Asigna la clave secreta usada para verificar 
//el token, la cual debe estar almacenada en variables de entorno.

const verificarToken = (req, res, next) => {// Define una función middleware para verificar el token JWT.
    const authHeader = req.headers['authorization'];// Obtiene el encabezado 'authorization' del request.
    if (!authHeader) {
        return res.status(403).json({ message: 'Token no proporcionado' });// Verifica si el encabezado está vacío; si es así, envía una respuesta de error 403.
    }

    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }
        req.user = decoded; // Guardar el objeto decodificado completo en `req.user`
        next();
    });
};

module.exports = verificarToken;
