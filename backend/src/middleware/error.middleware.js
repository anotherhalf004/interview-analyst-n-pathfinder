// Global error handling middleware
export const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    // Don't expose stack traces or internal errors in production
    const isDevelopment = process.env.NODE_ENV === 'development';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation failed',
            details: isDevelopment ? err.errors : undefined
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            error: 'Invalid ID format'
        });
    }

    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            error: 'Token expired'
        });
    }

    // Default error response
    const statusCode = err.statusCode || 500;
    const message = err.message || 'An error occurred. Please try again.';

    res.status(statusCode).json({
        error: message,
        ...(isDevelopment && { stack: err.stack })
    });
};

// 404 handler
export const notFoundHandler = (req, res) => {
    res.status(404).json({
        error: 'Route not found'
    });
};
