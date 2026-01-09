"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";

const PerformanceChart = ({ assessments }) => {
  const formattedData = assessments.map((assessment) => ({
    date: format(new Date(assessment.createdAt), "MMM dd, yyyy"),
    score: assessment.quizScore,
  }));

  return (
    <Card className="bg-black/80 border border-white/10">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
          Performance Trend
        </CardTitle>
        <CardDescription className="text-white/60">
          Your quiz scores over time
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 md:px-6">
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 20, right: 20, left: -10, bottom: 10 }}
            >
              {/* Subtle grid – Y axis only */}
              <CartesianGrid
                strokeDasharray="3 6"
                vertical={false}
                stroke="rgba(255,255,255,0.08)"
              />

              <XAxis
                dataKey="date"
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,165,0,0.6)" }}
                tickLine={{ stroke: "rgba(255,165,0,0.4)" }}
                />

              <YAxis
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
                tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                axisLine={{ stroke: "rgba(255,165,0,0.6)" }}
                tickLine={{ stroke: "rgba(255,165,0,0.4)" }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid rgba(255,165,0,0.3)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#fb923c" }}
                cursor={{ stroke: "rgba(255,165,0,0.2)" }}
              />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#fb923c"
                strokeWidth={3}
                dot={{ r: 4, fill: "#fb923c" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
