"use client";

import { useEffect, useState } from "react";
import { resumeScoreCheck } from "@/actions/resumeScoreCheck";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ResumeReviewPage() {
  const [jobDesc, setJobDesc] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const {
    loading,
    fn: resumeScoreCheckFn,
    data: result,
    error,
    setData,
  } = useFetch(resumeScoreCheck);

  useEffect(() => {
    if (result && !loading) {
      toast.success("Resume analyzed successfully");
    }
    if (error) {
      toast.error(error.message || "Failed to analyze resume");
    }
  }, [loading, result, error]);

  const handleSubmit = async () => {
    try {
      if (!jobDesc || !resumeFile) return;

      const formData = new FormData();
      formData.append("jobDesc", jobDesc);
      formData.append("resume", resumeFile);

      await resumeScoreCheckFn(formData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" bg-black text-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-6 shadow-lg">
        {!result && (
        <>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-orange-200 to-orange-400 bg-clip-text text-transparent text-center">
            Resume Score Checker
          </h1>
          <p className="text-sm text-gray-400">
            Analyze your resume against a job description using ATS logic
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-orange-200">
            Job Description
          </label>
          <textarea
            placeholder="Paste the job description here..."
            className="w-full min-h-[140px] bg-black border border-zinc-700 rounded-lg p-4 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />
        </div>

        
        <div className="space-y-2">
          <label className="text-sm font-medium text-orange-200">
            Upload Resume
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setResumeFile(e.target.files[0])}
              className="block w-full text-sm text-gray-300
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-zinc-300 file:text-black
                hover:file:bg-zinc-100
                cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          variant="destructive"
          className="w-full px-6 py-2 rounded-lg font-medium text-orange-700 bg-gradient-to-r from-orange-200 to-orange-300 hover:from-orange-100 hover:to-orange-200 transition-all duration-300"
       >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing Resume...
            </span>
          ) : (
            "Get Resume Review"
          )}

        </button>
        </>
      )}

        {/* Results */}
        {result && (

          <div className="mt-6 space-y-6 border-t border-zinc-800 pt-6">
            
            <button
            onClick={()=>{
              setData(null);
              setJobDesc("");
            }}
              className="text-sm text-orange-300 hover:text-orange-200 transition"
            >
              ← Go back
            </button>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">
                Resume Match Score
              </span>
              <span className="text-2xl font-bold text-orange-300">
                {result.score}/100
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black border border-zinc-800 rounded-lg p-4">
                <h3 className="text-orange-300 font-semibold mb-2">
                  Strengths
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  {result.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-black border border-zinc-800 rounded-lg p-4">
                <h3 className="text-orange-300 font-semibold mb-2">
                  Improvements
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  {result.improvements.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
