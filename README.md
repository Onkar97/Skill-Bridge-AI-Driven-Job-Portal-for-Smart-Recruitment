`Job Portal Application`

`Overview`

The Job Portal Application is a web-based system that connects job seekers with recruiters and HR managers. It allows users to apply for jobs, manage job postings, and review job applications, depending on their role.

`Project Structure`

/backend          - Java Spring Boot Application (Backend API)
/frontend         - React.js Application (Frontend UI)

Technologies Used

	•	Frontend: React.js, Material-UI
	•	Backend: Java Spring Boot, PostgreSQL
	•	Database: PostgreSQL
	•	Build Tools: Maven

Features

	•	Job Seekers: Browse job listings, apply for jobs, view application status.
	•	Recruiters: Review applications, download resumes.
	•	HR Managers: Post new jobs, manage job applications, create notifications.


Prerequisites

	1.	Java JDK 11+
	2.	Node.js 14+ (for the frontend)
	3.	PostgreSQL (database)
	4.	Maven (for Java build)
	5.	Git (for version control)

Setup and Installation

1. Clone the Repository
   git clone https://github.com/CSYE-6200-Concepts-of-OOD-Fall-2024-S3/final-project-group6.git
   cd csye6200

2. Backend Setup

Navigate to the Backend Folder

start the driver


Create PostgreSQL Database

	1.	Open application.yml and set:

       spring.datasource.url=jdbc:postgresql://localhost:5432/jobportal
spring.datasource.username=your-username
spring.datasource.password=your-password

    The backend will start at http://localhost:8080.
3. Frontend Setup

Navigate to the Frontend Folder

`cd frontend`

Install Dependencies

`npm i`

Start the Frontend Application

`npm start`

The frontend will start at http://localhost:3000.

How to Use

	1.	Open http://localhost:3000 in your web browser.
	2.	Sign Up as a user, recruiter, or HR manager.
	3.	Login using your credentials.
	4.	Use the Application:
	•	Job Seekers: Browse and apply for jobs.
	•	Recruiters: Manage applications.
	•	HR Managers: Post jobs and review applications.

API Endpoints

User Endpoints

	•	POST /api/users/register - Register a user
	•	POST /api/users/login - Login a user

Job Endpoints

	•	GET /api/jobs/all - View all jobs
	•	POST /api/jobs - Post a new job (HR only)

Application Endpoints

	•	POST /api/job-application - Apply for a job
	•	GET /api/job-application/user/{userId} - View user applications
	•	GET /api/job-application/all - View all applications (Recruiters/HR)





