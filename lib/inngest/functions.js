import { inngest } from "./client";
import { db } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights" },
  { cron: "0 0 * * 0" },
  async ({step}) => {
    const industries = await step.run("Fetch Industries", async()=>{
       return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      const prompt = `Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "HIGH" | "MEDIUM" | "LOW",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

        const response = await step.ai.wrap(
        "gemini",
        async () => {
          return await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
                });
        },
        prompt
      );


      //   const response = await step.ai.infer(
      //   `call-gemini-${industry}`,
      //   {
      //     model: step.ai.models.google({
      //       model: "gemini-2.5-flash",
      //     }),
      //     body: {
      //       contents: [
      //         {
      //           role: "user",
      //           parts: [{ text: prompt }],
      //         },
      //       ],
      //     },
      //   }
      // );

        // console.log("AI Response:", response);
        const text =
          response.text ??
          response.candidates?.[0]?.content?.parts?.[0]?.text ??
          "";

        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

        const insights = JSON.parse(cleanedText);

        await step.run(`Update ${industry} insights`, async () => {
          await db.industryInsight.update({
            where: { industry },
            data: {
              ...insights,
              lastUpdated: new Date(),
              nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            },
          });
      });

      }
    }
);