"use client";
import React from 'react'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateCoverLetter } from "@/actions/cover-letter";
import useFetch from "@/hooks/use-fetch";
import { coverLetterSchema } from "@/app/lib/schema";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CoverLetterGenerator = () => {
    const router = useRouter();

    const {register,
    handleSubmit,
    formState: { errors },
    reset,} = useForm({
        resolver: zodResolver(coverLetterSchema),
    })

    const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
    } = useFetch(generateCoverLetter);

    useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully!");
      router.push(`/ai-cover-letter/${generatedLetter.id}`);
      reset();
    }
    }, [generatedLetter]);

    const onSubmit = async(data)=>{
        try {
           await generateLetterFn(data); 
        } catch (error) {
            toast.error(error.message || "Failed to generate cover letter");
        }
    };

  return (
    <div className="space-y-8">
  <Card className="border border-orange-500/20 bg-black/40 shadow-lg shadow-orange-500/10">
    <CardHeader className="space-y-2 border-b border-orange-500/20 pb-6">
      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-orange-300 to-orange-500 bg-clip-text text-transparent">
        Job Details
      </CardTitle>
      <CardDescription className="text-sm text-orange-200/70">
        Provide information about the position you're applying for
      </CardDescription>
    </CardHeader>

    <CardContent className="pt-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Form fields remain the same */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-orange-200">
              Company Name
            </Label>
            <Input
              id="companyName"
              placeholder="Enter company name"
              className="bg-black/60 border-orange-500/30 focus-visible:ring-orange-400"
              {...register("companyName")}
            />
            {errors.companyName && (
              <p className="text-sm text-red-400">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-orange-200">
              Job Title
            </Label>
            <Input
              id="jobTitle"
              placeholder="Enter job title"
              className="bg-black/60 border-orange-500/30 focus-visible:ring-orange-400"
              {...register("jobTitle")}
            />
            {errors.jobTitle && (
              <p className="text-sm text-red-400">
                {errors.jobTitle.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobDescription" className="text-orange-200">
            Job Description
          </Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here"
            className="h-36 bg-black/60 border-orange-500/30 focus-visible:ring-orange-400"
            {...register("jobDescription")}
          />
          {errors.jobDescription && (
            <p className="text-sm text-red-400">
              {errors.jobDescription.message}
            </p>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            disabled={generating}
            className="bg-gradient-to-r from-orange-400 to-orange-300 text-black hover:from-orange-500 hover:to-orange-400"
          >
            {generating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Cover Letter"
            )}
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>

  )
}

export default CoverLetterGenerator