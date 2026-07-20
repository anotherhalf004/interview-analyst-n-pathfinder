import {PDFParse} from "pdf-parse";
import generateInterviewReport from "../servcies/ai.services.js";
import interviewReportModel from "../models/interviewReport.model.js";


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

export default {generateInterviewReportController}