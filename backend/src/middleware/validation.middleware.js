import { z } from 'zod';

// Validation schemas
const interviewReportSchema = z.object({
    jobDescription: z.string().min(10, 'Job description must be at least 10 characters').max(10000, 'Job description too long'),
    selfDescription: z.string().max(5000, 'Self description too long').optional(),
});

const interviewIdSchema = z.object({
    interviewId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid interview ID format'),
});

const interviewReportIdSchema = z.object({
    interviewReportId: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid interview report ID format'),
});

// Validation middleware factory
export const validate = (schema) => {
    return (req, res, next) => {
        try {
            if (req.body) {
                schema.parse(req.body);
            }
            next();
        } catch (error) {
            return res.status(400).json({
                error: 'Validation failed',
                details: error.errors
            });
        }
    };
};

// Validation middleware for params
export const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.params);
            next();
        } catch (error) {
            return res.status(400).json({
                error: 'Invalid parameter',
                details: error.errors
            });
        }
    };
};

export { interviewReportSchema, interviewIdSchema, interviewReportIdSchema };
