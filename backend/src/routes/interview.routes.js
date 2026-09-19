import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import interviewController from '../controllers/interview.controller.js';
import upload from '../middleware/file.middleware.js';
import { validate, validateParams, interviewReportSchema, interviewIdSchema, interviewReportIdSchema } from '../middleware/validation.middleware.js';
import { aiLimiter } from '../middleware/rateLimit.middleware.js';

const interviewRouter = express.Router();

/**
 * @route POST /api/interview
 * @description generate new interview report on basis of user self description, resume pdf and job description.
 * @access private
 */
interviewRouter.post('/', authMiddleware.authUser, aiLimiter, validate(interviewReportSchema), upload.single('resume'), interviewController.generateInterviewReportController)

/**
 *  @route GET /api/interview/report/:interviewId
 *  @description get interview report by interviewId
 *  @access private
 */
interviewRouter.get('/report/:interviewId', authMiddleware.authUser, validateParams(interviewIdSchema), interviewController.getInterviewReportByIdController)

/**
 *  @route GET /api/interview
 *  @description get all interview reports of logged in user
 *  @access private
 */
interviewRouter.get('/', authMiddleware.authUser, interviewController.getAllInterviewReportsController)

/**
 *  @route POST /api/interview/resume/pdf
 *  @description get resume pdf of interview report
 *  @access private
 */
interviewRouter.post('/resume/pdf/:interviewReportId', authMiddleware.authUser, validateParams(interviewReportIdSchema), interviewController.generateResumePdfController)





export default interviewRouter;