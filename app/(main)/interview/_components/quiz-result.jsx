"use client";
import React, { use } from 'react';
import { Trophy, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const QuizResult = ({result, hideStartNew=false, onStartNew}) => {
  if(!result) {
    return null;
  }
  return (
    <div className="mx-auto max-w-3xl space-y-6">
  {/* Title */}
  <h1 className="flex items-center justify-center gap-3 text-3xl md:text-4xl font-extrabold 
                 bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-500 
                 bg-clip-text text-transparent">
    <Trophy className="h-7 w-7 text-yellow-400 drop-shadow" />
    Quiz Results
  </h1>

  <CardContent className="space-y-8">
    {/* Score Overview */}
    <div className="text-center space-y-3 bg-zinc-900/70 border border-yellow-500/20 rounded-2xl p-6 shadow-lg shadow-yellow-500/10">
      <h3 className="text-4xl font-bold text-yellow-400">
        {result.quizScore}
        <span className="text-xl text-zinc-400"> / 10</span>
      </h3>
      <Progress
        value={ result.quizScore * 10 }
        className="w-full h-3 rounded-full bg-zinc-800 [&>div]:bg-gradient-to-r [&>div]:from-yellow-400 [&>div]:to-orange-500"
      />
    </div>

    {/* Improvement Tip */}
    {result.improvementTip && (
      <div className="bg-zinc-900/70 border border-orange-500/20 p-5 rounded-xl shadow-md">
        <p className="font-semibold text-orange-400">Improvement Tip</p>
        <p className="text-zinc-300 mt-1">{result.improvementTip}</p>
      </div>
    )}

    {/* Question Review */}
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-zinc-200">
        Question Review
      </h3>

      {result.questions.map((q, index) => (
        <div
          key={index}
          className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 space-y-3"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="font-medium text-zinc-100 leading-snug">
              {q.question}
            </p>
            {q.isCorrect ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
            )}
          </div>

          <div className="text-sm space-y-1">
            <p className="text-zinc-400">
              Your answer:{" "}
              <span className="text-zinc-200">{q.userAnswer}</span>
            </p>
            {!q.isCorrect && (
              <p className="text-emerald-400">
                Correct answer: {q.answer}
              </p>
            )}
          </div>

          <div className="text-sm bg-zinc-800/70 border border-zinc-700 p-3 rounded-lg">
            <p className="font-semibold text-zinc-200">Explanation</p>
            <p className="text-zinc-400">{q.explanation}</p>
          </div>
        </div>
      ))}
    </div>
  </CardContent>

  {!hideStartNew && (
    <CardFooter className="pt-2">
      <Button
        onClick={onStartNew}
        className="w-full h-12 text-base font-semibold 
                   bg-gradient-to-r from-orange-500 to-yellow-500 
                   hover:from-orange-400 hover:to-yellow-400 
                   text-black shadow-lg shadow-orange-500/30"
      >
        Start New Quiz
      </Button>
    </CardFooter>
  )}
</div>

  )
}

export default QuizResult