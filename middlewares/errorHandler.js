// Handle 404 Not Found
export const notFoundHandler = (req, res, next) => {
    res.status(404).json({ 
        message: 'Route not found' 
    });
};

// Centralized Error Handler
export const errorHandler = (err, req, res, next) => {
    console.error("Error: ", err);

    const statusCode = err.statusCode || 500;
    req.status(statusCode).json({
        message: err.message || 'Internal Server Error'
    });
}