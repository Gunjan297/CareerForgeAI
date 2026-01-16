import {
  BrainCircuit,
  Briefcase,
  LineChart,
  ScrollText,
  SearchCheck,
  FileSearch,
} from "lucide-react";

export const features = [
  {
    icon: <BrainCircuit className="w-10 h-10 mb-4 text-primary" />,
    title: "AI-Powered Personalized Career Roadmap",
    description:
      "AI-driven guidance tailored to your skills, goals, and market demand—so you always know your next best move.",
  },
  {
    icon: <Briefcase className="w-10 h-10 mb-4 text-primary" />,
    title: "Interview Preparation",
    description:
      "Practice with role-specific questions and get instant feedback to improve your performance.",
  },
  {
    icon: <LineChart className="w-10 h-10 mb-4 text-primary" />,
    title: "Industry Trends",
    description:
      "Access real-time industry trends, role demand, and salary insights to make smarter career decisions.",
  },
  {
    icon: <ScrollText className="w-10 h-10 mb-4 text-primary" />,
    title: "ATS-Optimized Resume Builder",
    description:
      "Create professional, ATS-friendly resumes that highlight your strengths and boost shortlisting chances.",
  },
  {
    icon: <SearchCheck className="w-10 h-10 mb-4 text-primary" />,
    title: "Personalized Job Recommendations",
    description:
      "Get real-time job opportunities tailored to your role and industry, powered by intelligent search and matching.",
  },
  {
    icon: <FileSearch className="w-10 h-10 mb-4 text-primary" />,
    title: "Resume–Job Match Score",
    description:
      "Analyze how well your resume matches a job description with an AI-powered score, strengths, and improvement tips.",
  },
];
