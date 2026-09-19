import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials:true
});

/**
 * @description Generates a new interview report by sending user inputs
 * (self description, job description, and resume file) to the backend API.
 * Returns the generated interview report data.
 */

export const generateInterviewReport = async ({ selfDescription, jobDescription, resumeFile }) => {
    const formData = new FormData();
    formData.append('selfDescription', selfDescription);
    formData.append('jobDescription', jobDescription);
    formData.append('resume', resumeFile);

    const res = await api.post('/api/interview', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return res.data;
};


/**
 * @description Generates a new interview report by sending the user's self description, job description,
 * and resume file to the backend API. Returns the generated interview report data upon successful creation.
 */

export const generateInterviewReportById = async (interviewId) => {
    const res = await api.get(`/api/interview/report/${interviewId}`);
    return res.data;
};

/**
 * @description Fetches all interview reports for the logged-in user from the backend API.
 * Returns an array of interview report data.
 */
export const getAllInterviewReports = async () => {
    const res = await api.get('/api/interview');
    return res.data;
};

/**
 * @description Generates a resume PDF for the given interview report ID.
 * Returns the generated PDF as a blob.
 */
export const generateResumePdf = async ({interviewReportId}) => {
    const res = await api.post(`/api/interview/resume/pdf/${interviewReportId}` , null , {
        responseType: 'blob'
    });
    return res.data;
}


