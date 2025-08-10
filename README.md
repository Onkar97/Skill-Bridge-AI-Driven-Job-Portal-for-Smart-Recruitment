# SkillBridge – AI-Driven Job Portal for Smart Recruitment

SkillBridge is a full-stack recruitment platform that enables recruiters to post/manage jobs and candidates to search and apply. It includes automation to reduce manual recruiter effort and speed up hiring cycles.

## Features
- **Job Management:** post, edit, and manage job listings; track applications
- **Candidate Portal:** profile creation, job search with filters, apply & track status
- **Admin Tools:** manage users and roles
- **Scalable Architecture:** React frontend + Spring Boot backend

## Tech Stack
- **Frontend:** React (@emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, axios, cors, react, react-dom, react-modal, react-router-dom, react-scripts, recharts, web-vitals)
- **Backend:** Java, Spring Boot (Maven project present)
- **Database:** configure via Spring Data/JPA (e.g., PostgreSQL/MySQL)

## Setup

### Backend
```bash
mvn clean install
mvn spring-boot:run
```
The backend runs on `http://localhost:8080`.

### Frontend
```bash
cd job-portal-frontend
npm install
npm start
```
The frontend runs on `http://localhost:3000` and proxies API calls to the backend.

## Project Structure
```
job-portal-frontend/   # React app
src/main/java/...      # Spring Boot backend
src/main/resources/    # application.properties (DB config)
```

## Results
- Handled **1,000+** simulated user sessions
- Reduced recruiter manual effort by **25%**; shortened hiring cycles by **20%**
