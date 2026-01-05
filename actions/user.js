"use server";
import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import React from 'react'
import { generateAIInsights } from './dashboard';

export async function updateUser(data){
    const {userId} = await auth();
    if(!userId) {
        throw new Error('User not authenticated');
    }

        const user=await db.user.findUnique({
        where: {
            clerkUserId: userId
        }
        });

        if(!user) {
            throw new Error('User not found');
        }
    
        try {
          const existingIndustryInsight = await db.industryInsight.findUnique({
              where: { industry: data.industry },
            });

            let insights = null;
            if (!existingIndustryInsight) {
              insights = await generateAIInsights(data.industry); 
            }
        const result = await db.$transaction(
            async(tx)=>{
                // let industryInsight = await tx.industryInsight.findUnique({
                //     where: {
                //         industry: data.industry
                //     }
                // });
                let industryInsight = existingIndustryInsight;

                // if(!industryInsight) {
                //     // const insights = await generateAIInsights(data.industry);
                    
                //                 industryInsight = await db.industryInsight.create({
                //                 data: {
                //                     industry: data.industry,
                //                     ...insights,
                //                     nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                //                 },
                //                 });
                // }
                if (!industryInsight && insights) {
                    industryInsight = await tx.industryInsight.create({
                      data: {
                        industry: data.industry,
                        salaryRanges: insights.salaryRanges,
                        growthRate: insights.growthRate,
                        demandLevel: insights.demandLevel,
                        topSkills: insights.topSkills,
                        marketOutlook: insights.marketOutlook,
                        keyTrends: insights.keyTrends,
                        recommendedSkills: insights.recommendedSkills,
                        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                      },
                    });
                  }

                const updatedUser = await tx.user.update({
                    where: {
                    id: user.id,
                    },
                    data:{
                        industry: data.industry,
                        experience: data.experience,
                        bio: data.bio,
                        skills: data.skills,
                    },
                });

                return {updatedUser,industryInsight};
            },
            {
                timeout: 10000, // 10 seconds, default is 5 seconds
            }
            );
            return {success:true,...result };
        } 
        catch (error) {
            console.error("Error updating user and industry:", error.message);
            throw new Error("Failed to update profile");
        }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
      select: {
        industry: true,
      },
    });

    if (!user) throw new Error("User not found");
    return {
      isOnboarded: !!user?.industry,
    };
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}