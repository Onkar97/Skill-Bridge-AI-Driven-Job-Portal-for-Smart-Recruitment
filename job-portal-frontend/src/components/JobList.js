import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../services/jobService';

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetchJobs().then(setJobs).catch(console.error);
    }, []);

    return (
        <div className="container mt-5">
            <h1>Available Jobs</h1>
            <ul className="list-group">
                {jobs.map((job) => (
                    <li key={job.id} className="list-group-item">
                        <h4>{job.title}</h4>
                        <p>{job.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;