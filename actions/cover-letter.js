"use server";
import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const generateCoverLetter = async(data)=>{
    const {userId} = await auth();
        if(!userId) {
            throw new Error('User not authenticated');
        }
    
            const user=await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            });
    
            if(!user) {
                throw new Error('User not found');
            }

            const prompt = `
    Write a professional cover letter for a ${data.jobTitle} position at ${
    data.companyName
  }.
    
    About the candidate:
    - Industry: ${user.industry}
    - Years of Experience: ${user.experience}
    - Skills: ${user.skills?.join(", ")}
    - Professional Background: ${user.bio}
    
    Job Description:
    ${data.jobDescription}
    
    Requirements:
    1. Use a professional, enthusiastic tone
    2. Highlight relevant skills and experience
    3. Show understanding of the company's needs
    4. Keep it concise (max 400 words)
    5. Use proper business letter formatting in markdown
    6. Include specific examples of achievements
    7. Relate candidate's background to job requirements
    
    Format the letter in markdown.
  `;

    try {
        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        });
        const content = response.text.trim();

        const result = await db.coverLetter.create({
            data:{
                userId:user.id,
                content,
                jobDescription: data.jobDescription,
                companyName: data.companyName,
                jobTitle: data.jobTitle,
                status: "completed",
            },
        })

        return result;
    } 
    catch (error) {
        console.error("Error generating cover letter:", error.message);
        throw new Error("Failed to generate cover letter");
    }
    
}

export const getCoverLetters = async()=>{
    const {userId} = await auth();
        if(!userId) {
            throw new Error('User not authenticated');
        }
    
            const user=await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            });
    
            if(!user) {
                throw new Error('User not found');
            }
        
        try {
            return await db.coverLetter.findMany({
                where:{
                    userId:user.id,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        } 
        catch (error) {
            console.error("Error getting cover letters:", error.message);
            throw new Error("Failed to get cover letters");
        }
}

export const getCoverLetter = async(id)=>{
    const {userId} = await auth();
        if(!userId) {
            throw new Error('User not authenticated');
        }
    
            const user=await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            });
    
            if(!user) {
                throw new Error('User not found');
            }
        
        try {
            return await db.coverLetter.findUnique({
                where:{
                    id,
                    userId:user.id,
                },
            });
        } 
        catch (error) {
            console.error("Error getting cover letter:", error.message);
            throw new Error("Failed to get cover letter");
        }
}

export const deleteCoverLetter = async(id)=>{
    const {userId} = await auth();
        if(!userId) {
            throw new Error('User not authenticated');
        }
    
            const user=await db.user.findUnique({
            where: {
                clerkUserId: userId
            },
            });
    
            if(!user) {
                throw new Error('User not found');
            }
        
        try {
            return await db.coverLetter.delete({
                where:{
                    id,
                    userId:user.id,
                },
            });
        } 
        catch (error) {
            console.error("Error deleting cover letter:", error.message);
            throw new Error("Failed to delete cover letter");
        }
}