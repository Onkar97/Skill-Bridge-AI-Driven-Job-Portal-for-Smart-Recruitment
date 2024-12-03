import React, { useState } from 'react';
import { createJobApplication } from '../services/jobApplicationService';
import '../styles/file.css'; // Assume we have a separate CSS file

const JobApplicationForm = () => {
    const [formData, setFormData] = useState({ jobId: '', applicantName: '', resume: null });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: '', type: '' });

        const form = new FormData();
        form.append('jobId', formData.jobId);
        form.append('applicantName', formData.applicantName);
        form.append('resume', formData.resume);

        try {
            await createJobApplication(form);
            setMessage({ text: 'Application submitted successfully!', type: 'success' });
            setFormData({ jobId: '', applicantName: '', resume: null });
        } catch (error) {
            console.error(error);
            setMessage({ text: 'Failed to submit application. Please try again.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="job-application-container">
            <h2>Job Application Form</h2>
            <form onSubmit={handleSubmit} className="job-application-form">
                <div className="form-group">
                    <label htmlFor="jobId">Job ID</label>
                    <input
                        type="text"
                        id="jobId"
                        name="jobId"
                        value={formData.jobId}
                        onChange={handleChange}
                        required
                        placeholder="Enter Job ID"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="applicantName">Your Name</label>
                    <input
                        type="text"
                        id="applicantName"
                        name="applicantName"
                        value={formData.applicantName}
                        onChange={handleChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resume">Resume</label>
                    <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleChange}
                        required
                        accept=".pdf,.doc,.docx"
                    />
                    <small>Accepted formats: PDF, DOC, DOCX</small>
                </div>
                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}
                <button type="submit" disabled={isSubmitting} className="submit-button">
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
            </form>
        </div>
    );
};

export default JobApplicationForm;