import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import temp from './temp.js';

const { resume, selfDescription, jobDescription } = temp;

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});


const interviewReportSchema = z.object({
    matchScore: z.number().describe('The match score between the candidate and the job description'),
    technicalQuestions: z.array(z.object({
        question: z.string().describe('The technical questions can be asked in interview'),
        intention: z.string().describe('The intention of interview behind asking this question'),
        answer: z.string().describe('How to answer this question, what points to cover and what approach to take etc.')
    })).describe('Technical questions for software enginerr'),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe('The technical questions can be asked in interview'),
        intention: z.string().describe('The intention of interview behind asking this question'),
        answer: z.string().describe('How to answer this question, what points to cover and what approach to take etc.')
    })).describe('Behavioural questions for software enginerr'),
    skillGap: z.array(z.object({
        skill: z.string().describe('The skill gap between the candidate and the job description'),
        severity: z.enum(['High', 'Medium', 'Low']).describe('The severity of the skill gap'),
    })).describe('Skill gap between the candidate and the job description'),
    preparationPlan: z.array(z.object({
        day: z.number().describe('The day number in the preparation plan, starting from 1'),
        focus: z.string().describe('The main focus of day in prep plan'),
        tasks: z.array(z.string().describe('The list of tasks to be performed on the day'))
    })).describe('Preparation plan for the candidate')

})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `Generate a interview report for a candidate based on the following information:
        Resume: ${resume}
        Self-Description: ${selfDescription}
        Job Description: ${jobDescription}
    `;


    const responseSchema = z.toJSONSchema(interviewReportSchema, {
        target: 'draft-07',
    });
    delete responseSchema.$schema;

    const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema,
        }
    });

    const report = interviewReportSchema.parse(JSON.parse(response.text));
    console.log(JSON.stringify(report, null, 2));
    return report;

}

export default generateInterviewReport;