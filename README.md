# CareerForge AI – Turn Potential into Progress with AI-Powered Career Guidance.
CareerForge AI is an intelligent career development platform designed to help individuals kickstart their careers, unlock fresh opportunities, and advance in their current roles. By combining AI-powered tools, personalized guidance, and industry insights, CareerForge AI empowers users to transform their potential into tangible career growth. Whether you are preparing for interviews, exploring career paths, or seeking actionable insights to advance professionally, CareerForge AI provides a smart, tailored experience to turn potential into real progress.
<img width="960" height="479" alt="image" src="https://github.com/user-attachments/assets/4f2a959e-7177-480e-b393-1c34cdb18d93" />

# Problem Addressed:
Many professionals and job seekers struggle with career guidance, resume optimization, interview preparation, and finding relevant job opportunities. Traditional methods are often time-consuming, generic, and lack personalization. Users may not know how to tailor their resumes or cover letters, identify skills in demand, or practice industry-specific interviews effectively.

# Key Features:

1) **User Authentication with Clerk**: Secure sign-up and sign-in system to protect user data and provide personalized experiences.
2) **Personalized Onboarding**: Users submit their industry, sub-industry, experience, skills, and bio, which is stored in the database to tailor insights and recommendations.
3 **Industry Dashboard & Insights**: Provides an overview of the user’s industry including market growth, demand, roles, salary packages, required skills, and additional requirements.Industry data is updated weekly to keep insights current.
4) **Resume Builder & PDF Generation**: Users can create and save resume details and generate a downloadable PDF for professional applications.
5) **AI-Powered Resume Analysis**: Evaluates resumes against job descriptions, providing matching scores, strengths, suggested improvements, and missing keywords to increase job compatibility.
6) **Cover Letter Generator**: Generates tailored cover letters based on job descriptions to boost interview opportunities.
7) **Interview Preparation**: Offers AI-generated multiple-choice questions relevant to the user’s industry.Provides detailed feedback, correct answers, explanations, and performance tracking over time.
8) **Job Recommendations**: Uses SERP API to provide daily updated job listings matching the user’s industry and role preferences.
9) **Performance Tracking & Analytics**: Users can monitor their quiz scores, resume improvements, and overall progress through visual graphs and stats on the dashboard.

# Tech Stack
Frontend: Next.js, React Hook Form, Zod, Recharts, html2canvas & pdf.js, React Markdown Editor, ShadCN UI

Backend: Next.js (API Routes / Server Actions)

Database: PostgreSQL, Neon, Prisma

Authentication & User Management: Clerk

Background Jobs & Automation: Inngest

APIs & Integrations: Serpapi, Gemini

Deployment: Vercel (website link: https://career-forge-ai-ecru.vercel.app/)

# Getting Started
Follow these instructions to set up CareerForge AI locally.

Prerequisites
1) Node.js (v16+)
2) PostgreSQL Database (Neon PostgreSQL (recommended for serverless setup))

3)Clone the Repository
```
git clone https://github.com/Gunjan297/CareerForgeAI.git
cd CareerForgeAI
```
4)Install Dependencies

```
npm install
```
5) Configure Environment Variables
Create a .env file in the root directory and add the following variables:
```
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# AI Provider
GEMINI_API_KEY=

# Database
DATABASE_URL=

# Job Listings API
SERPAPI_API_KEY=

```
6) Run the Application
```
npm run dev
```
The application will start at: http://localhost:3000

# Contact
For any questions or suggestions: 
Email: mgpsgunjan6166@gmail.com

Project Link: https://career-forge-ai-ecru.vercel.app/

<img width="960" height="476" alt="image" src="https://github.com/user-attachments/assets/47b73688-8084-4c38-bfa7-013dc4327192" />
<img width="953" height="473" alt="image" src="https://github.com/user-attachments/assets/283e2908-fba2-4853-bcdc-b27db5d8f551" />
<img width="955" height="470" alt="image" src="https://github.com/user-attachments/assets/58ef0e0c-4564-4249-a28c-ebea343add8a" />
<img width="957" height="479" alt="image" src="https://github.com/user-attachments/assets/511b0f21-2ea6-4a49-9bfb-ce8410193990" />
<img width="957" height="473" alt="image" src="https://github.com/user-attachments/assets/a0574ba8-8a79-464e-ab6d-a9f4eae11e20" />
<img width="958" height="479" alt="image" src="https://github.com/user-attachments/assets/b018140f-7e9f-4b75-8eea-67273b5ea3f2" />
<img width="959" height="469" alt="image" src="https://github.com/user-attachments/assets/586d3d65-438d-4cfa-9d49-40396eb7c86f" />
<img width="960" height="473" alt="image" src="https://github.com/user-attachments/assets/2771bbd3-6866-4447-8e68-f3118652d319" />
<img width="953" height="470" alt="image" src="https://github.com/user-attachments/assets/a50b9eb5-c07f-4f3f-a1a7-fc8773e48e04" />
<img width="956" height="479" alt="image" src="https://github.com/user-attachments/assets/2f953524-aee9-4287-90c0-04e4a4a74274" />
<img width="956" height="476" alt="image" src="https://github.com/user-attachments/assets/ed4e5906-4cbe-4bc8-9bbe-62daf654b17a" />
<img width="956" height="477" alt="image" src="https://github.com/user-attachments/assets/c96840ad-f756-402c-bd01-e0796d8e8678" />





















