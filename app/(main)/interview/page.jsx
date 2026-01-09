import { getAssessments } from '@/actions/interview'
import React from 'react'
import StatsCards from './_components/stats-cards';
import PerformanceChart from './_components/performance-chart';
import QuizList from './_components/quiz-list';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const InterviewPage = async () => {
  const assessments = await getAssessments();
  return (
    <div className="px-5">
        <div className="flex items-center justify-between mb-4">
  <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-300 via-orange-400 to-orange-200 bg-clip-text text-transparent">
  Interview Preparation
</h2>


  <Link href="/interview/mock">
    <Button
      className="group relative overflow-hidden rounded-xl 
      bg-gradient-to-r from-orange-300 to-orange-400
      px-6 py-3 text-sm font-semibold text-black
      shadow-lg shadow-orange-500/20
      transition-all duration-300
      hover:from-orange-400 hover:to-orange-500
      hover:shadow-orange-500/40
      active:scale-95"
    >
      <span className="relative z-10">Start New Quiz</span>

      {/* subtle shine */}
      <span className="absolute inset-0 -translate-x-full 
        bg-gradient-to-r from-transparent via-white/20 to-transparent 
        transition-transform duration-500 group-hover:translate-x-full" />
    </Button>
  </Link>
</div>

<div className="space-y-6">
  <StatsCards assessments={assessments} />
  <PerformanceChart assessments={assessments} />
  <QuizList assessments={assessments} />
</div>
    </div>
  )
}

export default InterviewPage