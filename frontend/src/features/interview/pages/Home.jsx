import {useState,useRef,useEffect} from 'react';
import '../style/home.scss';
import { useInterview } from '../hooks/useInterview';
import { useNavigate } from 'react-router';


function Home() {

    const { loading, generateReport, reports, getReports } = useInterview();
    const [jobDescription, setJobDescription] = useState('');
    const [selfDescription, setSelfDescription] = useState('');
    const resumeInputRef = useRef();

    const navigate = useNavigate();

    useEffect(() => {
        getReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files[0];
        const data = await generateReport({ jobDescription,selfDescription,resumeFile})
        navigate(`/interview/${data._id}`)
    }

    if(loading){
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan</h1>
            </main>
        )
    }

  return (
    <main className='home'>
        <div className="header-section">
            <h1>Create Your Custom <span className="highlight-text">Interview</span> Plan</h1>
            <p className="subtitle">Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
        </div>

        <div className="main-card">
            <div className="card-body">
                {/* Left Column */}
                <div className="left-panel">
                    <div className="panel-header">
                        <div className="title-group">
                            <svg className="icon red-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                            <h2>Target Job Description</h2>
                        </div>
                        <span className="badge-required">Required</span>
                    </div>
                    <div className="textarea-wrapper">
                        <textarea 
                            onChange={(e) => {setJobDescription(e.target.value)}}
                            name="job-description" 
                            id="job-description" 
                            placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                        ></textarea>
                        <span className="char-counter">0 / 5000 chars</span>
                    </div>
                </div>

                {/* Right Column */}
                <div className="right-panel">
                    <div className="panel-header">
                        <div className="title-group">
                            <svg className="icon red-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                            <h2>Your Profile</h2>
                        </div>
                    </div>
                    
                    <div className="input-group">
                        <label>Upload Resume <span className="highlight-subtext">(Best Results)</span></label>
                        <div className="upload-dropzone" onClick={() => resumeInputRef.current?.click()}>
                            <svg className="icon red-icon large-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/></svg>
                            <p className="upload-title">Click to upload or drag & drop</p>
                            <p className="upload-subtitle">PDF or DOCX (Max 5MB)</p>
                            <input ref={resumeInputRef} hidden type="file" name="resume" id="resume" accept='.pdf'/>
                        </div>
                    </div>

                    <div className="divider-or">
                        <span>OR</span>
                    </div>

                    <div className="input-group">
                        <label htmlFor="self-description">Quick Self-Description</label>
                        <textarea 
                            onChange={(e) => {setSelfDescription(e.target.value)}}
                            name="self-description" 
                            id="self-description" 
                            className="small-textarea"
                            placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                        ></textarea>
                    </div>

                    <div className="info-alert">
                        <svg className="icon blue-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                        <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                    </div>
                </div>
            </div>

            {/* Recent Reports List */}
            <section className="recent-reports" style={{ textAlign: 'center' }}>
                <h3 style={{ display: 'inline-block' }}>Recent Reports</h3>
                <div className="reports-list-container">
                    <ul className="reports-list">
                        {reports.map((report) => (
                            <li key={report._id} className="report-item" onClick={() => navigate(`/interview/${report._id}`)}>
                                <p className='report-title' style={{ display: 'inline-block' }}>{report.title}</p>
                                <p className='report-meta' style={{ display: 'inline-block' }}>{new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className='match-score'>{report.matchScore}% Match</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <div className="card-footer">
                <span className="footer-status">AI-Powered Strategy Generation • Approx 30s</span>
                <button 
                onClick={handleGenerateReport}
                type='submit' className='button primary-button-pink'>
                    <svg className="icon white-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2zm4 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"/></svg>
                    Generate My Interview Strategy
                </button>
            </div>
        </div>
    </main>
  );
}

export default Home;