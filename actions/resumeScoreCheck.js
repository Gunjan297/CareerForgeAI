"use server";
export const runtime = "nodejs";

import { extractResumeText } from "@/lib/resumeParser";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function resumeScoreCheck(formData) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const jobDesc = formData.get("jobDesc");
    const resumeFile = formData.get("resume");

    if (!jobDesc || !resumeFile) {
        throw new Error("Missing inputs");
    }

  
    const resumeText = await extractResumeText(resumeFile);
    const MAX_CHARS = 12000;
    const trimmedResume = resumeText.slice(0, MAX_CHARS);

    const prompt = `
        You are an ATS (Applicant Tracking System).

        Strict rules:
        - Output ONLY valid JSON
        - Do NOT add explanations
        - Do NOT wrap in markdown

        Evaluate the resume against the job description.

        Job Description:
        ${jobDesc}

        Resume:
        ${trimmedResume}

        JSON schema:
        {
        "score": number,
        "strengths": string[],
        "missing_keywords": string[],
        "improvements": string[]
        }
        `;

    try{
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        });
        const text = response.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) throw new Error("Empty AI response");
        const cleanedText = text.replace(/```json|```/g, "").trim();
        return JSON.parse(cleanedText);
    }
    catch (error) {
        console.error("Error generating ATS score:", error);
        throw new Error("Failed to analyze resume");
    }
}
