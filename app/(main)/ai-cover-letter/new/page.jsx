import React from 'react'
import CoverLetterGenerator from '../_components/cover-letter-generator'
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const createNewPage = () => {

  return (
    <div className="container mx-auto px-6 ">
  <div className="flex flex-col">
    
    <Link href="/ai-cover-letter">
      <Button
        variant="link"
        className="flex items-center gap-2 pl-0 text-orange-300 hover:text-orange-200"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cover Letters
      </Button>
    </Link>

    
    <div className="flex flex-col gap-3 border-b border-orange-500/20 pb-8">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent text-center">
        Create Cover Letter
      </h1>
      <p className="max-w-2xl text-sm text-orange-200/70 text-center mx-68">
        Generate a tailored cover letter for your job application
      </p>
    </div>
    
      <CoverLetterGenerator />
  </div>
</div>

  )
}

export default createNewPage