"use client";
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import QuizResult from './quiz-result';
const QuizList = ({ assessments }) => {
   const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <>
    <Card className="bg-black/80 border border-orange-500/20 backdrop-blur-xl shadow-xl shadow-orange-500/10">
  <CardHeader className="space-y-2">
    <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
      Recent Quizzes
    </CardTitle>
    <CardDescription className="text-white/60">
      Review your past quiz performance
    </CardDescription>
  </CardHeader>

  <CardContent className="px-2 md:px-6">
    <div className="space-y-4">
      {assessments?.map((assessment, i) => (
        <Card
          key={assessment.id}
          className="cursor-pointer border border-white/10 bg-black/60 
          transition-all duration-300 
          hover:border-orange-400/40 hover:bg-orange-500/5 
          hover:shadow-lg hover:shadow-orange-500/10"
          onClick={() => setSelectedQuiz(assessment)}
        >
          <CardHeader className="space-y-2">
            <CardTitle className="text-xl font-bold text-white">
              Quiz {i + 1}
            </CardTitle>

            <CardDescription className="flex flex-wrap items-center justify-between gap-2 text-white/60">
              <div className="font-medium">
                Score: <span className="text-orange-400">{assessment.quizScore}</span>/10
              </div>
              <div className="text-sm">
                {format(
                  new Date(assessment.createdAt),
                  "MMMM dd, yyyy HH:mm"
                )}
              </div>
            </CardDescription>
          </CardHeader>

          {assessment.improvementTip && (
            <CardContent className="pt-0">
              <p className="text-sm text-white/50 leading-relaxed">
                {assessment.improvementTip}
              </p>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  </CardContent>
</Card>

<Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
  <DialogContent
    className="max-w-3xl max-h-[90vh] overflow-y-auto 
    bg-black/90 border border-orange-500/20 
    shadow-2xl shadow-orange-500/20 backdrop-blur-xl"
  >
    <DialogHeader>
      <DialogTitle>
      </DialogTitle>
    </DialogHeader>

    <QuizResult
      result={selectedQuiz}
      hideStartNew={true}
      onStartNew={() => router.push("/interview/mock")}
    />
  </DialogContent>
</Dialog>
    </>
  );
};
export default QuizList