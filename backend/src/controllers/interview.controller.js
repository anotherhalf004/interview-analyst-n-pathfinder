import {PDFParse} from "pdf-parse";
import generateInterviewReport from "../servcies/ai.services.js";
import interviewReportModel from "../models/interviewReport.model.js";

/**
 * @description Generates a new interview report based on the user's self description,
 * resume PDF, and job description. 
 */

async function generateInterviewReportController(req,res){


    const resumeContent =  await (new PDFParse(Uint8Array.from(req.file.buffer))).getText();
    const {selfDescription, jobDescription} = req.body;

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    });

    const interviewReport = await interviewReportModel.create({
        user: req.user._id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    });

    res.status(201).json({
        message: "Interview report generated successfully",
        interviewReport
    });

}

/**
 * @description Generates a JSDoc-style comment for documenting code in JSON format,
 * intended for describing the purpose and behavior of functions, classes, or files.
 */
async function getInterviewReportByIdController(req,res) {
    const { interviewId } = req.params;
    const interviewReport = await interviewReportModel.findOne({
        _id:interviewId,
        user: req.user._id
    })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        });
    }
    return res.status(200).json({
        message: "Interview report fetched successfully",
        interviewReport
    });
}

/**
 * @description Controller functions for handling interview report data, including generating a new interview report based on user input and resume, fetching a single interview report by its ID, and (outside this block) fetching all reports for a user.
 * Designed to interface with the interviewReportModel and provide responses for API endpoints.
 */

async function getAllInterviewReportsController(req,res) {
    const interviewReports = await interviewReportModel.find({user: req.user._id})
    .sort({createdAt: -1})
    .select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan')

    return res.status(200).json({
        message: "Interview reports fetched successfully",
        interviewReports
    });

}

export default {generateInterviewReportController, getInterviewReportByIdController , getAllInterviewReportsController }