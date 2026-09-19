import { useContext } from 'react';
import { getAllInterviewReports, generateInterviewReportById, generateInterviewReport, generateResumePdf } from '../services/interview.api'
import { InterviewContext } from '../interview.context';

export const useInterview = () => {

    const context = useContext(InterviewContext);

    if (!context) {
        throw new Error('useInterview must be used within an InterviewProvider');
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context;

    const generateReport = async ({ selfDescription, jobDescription, resumeFile }) => {
        setLoading(true);

        try {
            const response = await generateInterviewReport({ selfDescription, jobDescription, resumeFile });
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    };

    const getReportById = async (interviewId) => {
        setLoading(true);
        try {
            const response = await generateInterviewReportById(interviewId);
            setReport(response.interviewReport);
            return response.interviewReport;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getReports = async () => {
        setLoading(true);
        try {
            const response = await getAllInterviewReports();
            setReports(response.interviewReports);
            return response.interviewReports;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const getResumePdf = async (interviewReportId) => {
        setLoading(true);
        try {
            const response = await generateResumePdf({ interviewReportId });
            const url = window.URL.createObjectURL(new Blob([response], {type: 'application/pdf'}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `resume_${interviewReportId}.pdf`);
            document.body.appendChild(link)
            link.click();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    return {
        loading,
        report,
        reports,
        generateReport,
        getReportById,
        getReports,
        getResumePdf
    };

};