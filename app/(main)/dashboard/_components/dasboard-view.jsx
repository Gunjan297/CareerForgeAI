"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  LineChart,
  BriefcaseIcon,
  Brain,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    median: range.median / 1000,
    max: range.max / 1000,
  }));

  const outlookIconMap = {
    positive: <TrendingUp className="text-orange-400" />,
    neutral: <LineChart className="text-orange-300" />,
    negative: <TrendingDown className="text-orange-200" />,
  };

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd MMM yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    // { addSuffix: true }
  );

  return (
    <div className="space-y-10 bg-black text-zinc-200">

      <Card className="bg-gradient-to-r from-zinc-900 to-black border-orange-400/30">
        <CardContent className="flex flex-col md:flex-row justify-between gap-6 p-6">
          <div>
            <h2 className="text-3xl font-bold text-orange-300">
                {insights.industry
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
            </h2>

            <p className="text-zinc-400 mt-1">
              Last updated on {lastUpdatedDate}
            </p>
            <p className="text-sm text-zinc-500 mt-2">
              Next refresh in {nextUpdateDistance}
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-sm text-zinc-400">Market Outlook</div>
              <div className="flex items-center gap-2 text-xl font-semibold text-orange-300">
                {outlookIconMap[insights.marketOutlook.toLowerCase()]}
                {insights.marketOutlook}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm text-zinc-400">Growth</div>
              <div className="text-xl font-semibold text-orange-300">
                {insights.growthRate.toFixed(1)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-orange-400/20">
          <CardHeader className="flex flex-row items-center gap-2">
            <BriefcaseIcon className="text-orange-300" />
            <CardTitle className="text-orange-300 text-lg">
              Demand Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl  text-zinc-400 font-bold">{insights.demandLevel}</div>
            <Progress
              className="mt-3 bg-zinc-800  [&>div]:bg-orange-400"
              value={
                insights.demandLevel.toLowerCase() === "high"
                  ? 80
                  : insights.demandLevel.toLowerCase() === "medium"
                  ? 55
                  : 30
              }
            />
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-orange-400/20">
          <CardHeader className="flex flex-row items-center gap-2">
            <Brain className="text-orange-300" />
            <CardTitle className="text-orange-300 text-lg">
              Core Skills
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {insights.topSkills.map((skill) => (
              <Badge
                key={skill}
                className="bg-zinc-900 text-zinc-400 border-black-400/30"
              >
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-orange-400/20">
          <CardHeader>
            <CardTitle className="text-orange-300 text-lg">
              Skill Focus
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {insights.recommendedSkills.map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="bg-zinc-900 text-zinc-400 border-black-400/30"
              >
                {skill}
              </Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-zinc-900 border-orange-400/20">
        <CardHeader>
          <CardTitle className="text-orange-300">
            Role-wise Salary Comparison
          </CardTitle>
          <p className="text-zinc-400 text-sm">
            Displaying minimum, median, and maximum salaries (in thousands)
          </p>
        </CardHeader>
        <CardContent className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salaryData} barGap={6}>
              <CartesianGrid stroke="#27272a" />
              <XAxis dataKey="name" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border rounded-lg p-2 shadow-md">
                          <p className="font-medium">{label}</p>
                          {payload.map((item) => (
                            <p key={item.name} className="text-sm">
                              {item.name}: ${item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              <Bar dataKey="min" fill="#fed7aa" name="Min Salary (K)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="median" fill="#fb923c" name="Median Salary (K)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="max" fill="#f97316" name="Max Salary (K)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border-orange-400/20">
        <CardHeader>
          <CardTitle className="text-orange-300">
            Industry Signals & Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {insights.keyTrends.map((trend, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-zinc-950 border border-orange-400/10"
              >
                <div className="h-2 w-2 mt-2 rounded-full bg-orange-400" />
                <p className="text-zinc-300">{trend}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardView;
