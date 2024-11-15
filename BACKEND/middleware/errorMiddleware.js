class CustomError extends Error {
    constructor(message = 'Error interno del servidor', statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    if (statusCode === 500) {
        console.error(`Error del Servidor: ${message}\n`, err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};

module.exports = { handleError, CustomError };
