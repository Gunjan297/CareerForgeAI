import React from 'react'
import { Brain, Target, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatsCards = ({ assessments }) => {
    const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[assessments.length-1];
  };

const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  return (
    <div className="grid gap-6 md:grid-cols-3 mt-6">
  {[
    {
      title: "Average Score",
      value: `${getAverageScore()}/10`,
      icon: <Trophy className="h-5 w-5 text-orange-400" />,
      subtitle: "Across all assessments",
    },
    {
      title: "Questions Practiced",
      value: getTotalQuestions(),
      icon: <Brain className="h-5 w-5 text-orange-400" />,
      subtitle: "Total questions solved",
    },
    {
      title: "Latest Score",
      value: `${getLatestAssessment()?.quizScore || 0}/10`,
      icon: <Target className="h-5 w-5 text-orange-400" />,
      subtitle: "Most recent quiz",
    },
  ].map((item, i) => (
    <Card
      key={i}
      className="border border-orange-500/20 bg-gradient-to-br from-black via-zinc-900 to-black shadow-lg rounded-2xl"
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm text-zinc-300">
          {item.title}
        </CardTitle>
        {item.icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-orange-400">
          {item.value}
        </div>
        <p className="text-xs text-zinc-500 mt-1">
          {item.subtitle}
        </p>
      </CardContent>
    </Card>
  ))}
</div>

  );
}

export default StatsCards