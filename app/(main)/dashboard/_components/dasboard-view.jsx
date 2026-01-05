// "use client";
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   BriefcaseIcon,
//   LineChart,
//   TrendingUp,
//   TrendingDown,
//   Brain,
// } from "lucide-react";
// import { format, formatDistanceToNow } from "date-fns";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";


// const DashboardView = ({insights}) => {
//     const salaryData = insights.salaryRanges.map((range) => ({
//         name: range.role,
//         min: range.min/1000,
//         max: range.max/1000,
//         median: range.median/1000,
//     }));

//     const getDemandLevelColor = (level) => {
//     switch (level.toLowerCase()) {
//       case "high":
//         return "bg-green-500";
//       case "medium":
//         return "bg-yellow-500";
//       case "low":
//         return "bg-red-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   const getMarketOutlookInfo = (outlook) => {
//     switch (outlook.toLowerCase()) {
//       case "positive":
//         return { icon: TrendingUp, color: "text-green-500" };
//       case "neutral":
//         return { icon: LineChart, color: "text-yellow-500" };
//       case "negative":
//         return { icon: TrendingDown, color: "text-red-500" };
//       default:
//         return { icon: LineChart, color: "text-gray-500" };
//     }
//   };

//   const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
//   const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  
//   const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
//   const nextUpdateDistance = formatDistanceToNow(
//     new Date(insights.nextUpdate),
//     { addSuffix: true }
//   );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Market Outlook
//             </CardTitle>
//             <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{insights.marketOutlook}</div>
//             <p className="text-xs text-muted-foreground">
//               Next update {nextUpdateDistance}
//             </p>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Industry Growth
//             </CardTitle>
//             <TrendingUp className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">
//               {insights.growthRate.toFixed(1)}%
//             </div>
//             <Progress value={insights.growthRate} className="mt-2" />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
//             <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{insights.demandLevel}</div>
//             <div
//               className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
//                 insights.demandLevel
//               )}`}
//             />
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
//             <Brain className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-wrap gap-1">
//               {insights.topSkills.map((skill) => (
//                 <Badge key={skill} variant="secondary">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="col-span-4">
//         <CardHeader>
//           <CardTitle>Salary Ranges by Role</CardTitle>
//           <CardDescription>
//             Displaying minimum, median, and maximum salaries (in thousands)
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[400px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={salaryData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip
//                   content={({ active, payload, label }) => {
//                     if (active && payload && payload.length) {
//                       return (
//                         <div className="bg-background border rounded-lg p-2 shadow-md">
//                           <p className="font-medium">{label}</p>
//                           {payload.map((item) => (
//                             <p key={item.name} className="text-sm">
//                               {item.name}: ${item.value}K
//                             </p>
//                           ))}
//                         </div>
//                       );
//                     }
//                     return null;
//                   }}
//                 />
//                 <Bar dataKey="min" fill="#94a3b8" name="Min Salary (K)" />
//                 <Bar dataKey="median" fill="#64748b" name="Median Salary (K)" />
//                 <Bar dataKey="max" fill="#475569" name="Max Salary (K)" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <Card>
//           <CardHeader>
//             <CardTitle>Key Industry Trends</CardTitle>
//             <CardDescription>
//               Current trends shaping the industry
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ul className="space-y-4">
//               {insights.keyTrends.map((trend, index) => (
//                 <li key={index} className="flex items-start space-x-2">
//                   <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
//                   <span>{trend}</span>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader>
//             <CardTitle>Recommended Skills</CardTitle>
//             <CardDescription>Skills to consider developing</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-wrap gap-2">
//               {insights.recommendedSkills.map((skill) => (
//                 <Badge key={skill} variant="outline">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DashboardView;


// "use client";
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   BriefcaseIcon,
//   LineChart,
//   TrendingUp,
//   TrendingDown,
//   Brain,
// } from "lucide-react";
// import { format, formatDistanceToNow } from "date-fns";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Progress } from "@/components/ui/progress";

// const DashboardView = ({ insights }) => {
//   const salaryData = insights.salaryRanges.map((range) => ({
//     name: range.role,
//     min: range.min / 1000,
//     max: range.max / 1000,
//     median: range.median / 1000,
//   }));

//   const getDemandLevelColor = (level) => {
//     switch (level.toLowerCase()) {
//       case "high":
//         return "bg-green-500";
//       case "medium":
//         return "bg-yellow-500";
//       case "low":
//         return "bg-red-500";
//       default:
//         return "bg-gray-500";
//     }
//   };

//   const getMarketOutlookInfo = (outlook) => {
//     switch (outlook.toLowerCase()) {
//       case "positive":
//         return { icon: TrendingUp, color: "text-orange-400" };
//       case "neutral":
//         return { icon: LineChart, color: "text-orange-300" };
//       case "negative":
//         return { icon: TrendingDown, color: "text-orange-200" };
//       default:
//         return { icon: LineChart, color: "text-zinc-400" };
//     }
//   };

//   const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
//   const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

//   const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
//   const nextUpdateDistance = formatDistanceToNow(
//     new Date(insights.nextUpdate),
//     { addSuffix: true }
//   );

//   return (
//     <div className="space-y-8 bg-black text-zinc-200">
//       <div className="flex justify-end">
//         <Badge className="border-orange-400/40 text-orange-300 bg-black">
//           Last updated: {lastUpdatedDate}
//         </Badge>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <Card className="bg-zinc-900 border-orange-400/20 shadow-md hover:shadow-orange-400/10 transition">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm text-zinc-400">
//               Market Outlook
//             </CardTitle>
//             <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-orange-300">
//               {insights.marketOutlook}
//             </div>
//             <p className="text-xs text-zinc-500 mt-1">
//               Next update {nextUpdateDistance}
//             </p>
//           </CardContent>
//         </Card>

//         <Card className="bg-zinc-900 border-orange-400/20 shadow-md hover:shadow-orange-400/10 transition">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm text-zinc-400">
//               Industry Growth
//             </CardTitle>
//             <TrendingUp className="h-4 w-4 text-orange-300" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-orange-300">
//               {insights.growthRate.toFixed(1)}%
//             </div>
//             <Progress className="mt-3 bg-zinc-800 [&>div]:bg-orange-400" value={insights.growthRate} />
//           </CardContent>
//         </Card>

//         <Card className="bg-zinc-900 border-orange-400/20 shadow-md hover:shadow-orange-400/10 transition">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm text-zinc-400">
//               Demand Level
//             </CardTitle>
//             <BriefcaseIcon className="h-4 w-4 text-orange-300" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-3xl font-bold text-orange-300">
//               {insights.demandLevel}
//             </div>
//             <div className="h-2 w-full rounded-full mt-3 bg-zinc-800 overflow-hidden">
//               <div
//                 className={`h-full ${getDemandLevelColor(
//                   insights.demandLevel
//                 )}`}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         <Card className="bg-zinc-900 border-orange-400/20 shadow-md hover:shadow-orange-400/10 transition">
//           <CardHeader className="flex flex-row items-center justify-between pb-2">
//             <CardTitle className="text-sm text-zinc-400">
//               Top Skills
//             </CardTitle>
//             <Brain className="h-4 w-4 text-orange-300" />
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-wrap gap-2">
//               {insights.topSkills.map((skill) => (
//                 <Badge
//                   key={skill}
//                   className="bg-orange-400/10 text-orange-300 border-orange-400/30"
//                 >
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="bg-zinc-900 border-orange-400/20">
//         <CardHeader>
//           <CardTitle className="text-orange-300">
//             Salary Ranges by Role
//           </CardTitle>
//           <CardDescription className="text-zinc-400">
//             Displaying minimum, median, and maximum salaries (in thousands)
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[420px] bg-zinc-950 rounded-lg p-4">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={salaryData}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
//                 <XAxis dataKey="name" stroke="#a1a1aa" />
//                 <YAxis stroke="#a1a1aa" />
//                 <Tooltip
//                   content={({ active, payload, label }) => {
//                     if (active && payload && payload.length) {
//                       return (
//                         <div className="bg-black border border-orange-400 rounded-lg p-3 text-sm">
//                           <p className="font-semibold text-orange-300">
//                             {label}
//                           </p>
//                           {payload.map((item) => (
//                             <p key={item.name} className="text-zinc-300">
//                               {item.name}: ₹{item.value}K
//                             </p>
//                           ))}
//                         </div>
//                       );
//                     }
//                     return null;
//                   }}
//                 />
//                 <Bar dataKey="min" fill="#fed7aa" />
//                 <Bar dataKey="median" fill="#fb923c" />
//                 <Bar dataKey="max" fill="#f97316" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className="bg-zinc-900 border-orange-400/20">
//           <CardHeader>
//             <CardTitle className="text-orange-300">
//               Key Industry Trends
//             </CardTitle>
//             <CardDescription className="text-zinc-400">
//               Current trends shaping the industry
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ul className="space-y-3">
//               {insights.keyTrends.map((trend, index) => (
//                 <li key={index} className="flex items-start gap-2">
//                   <div className="h-2 w-2 mt-2 rounded-full bg-orange-400" />
//                   <span>{trend}</span>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>
//         </Card>

//         <Card className="bg-zinc-900 border-orange-400/20">
//           <CardHeader>
//             <CardTitle className="text-orange-300">
//               Recommended Skills
//             </CardTitle>
//             <CardDescription className="text-zinc-400">
//               Skills to consider developing
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="flex flex-wrap gap-2">
//             {insights.recommendedSkills.map((skill) => (
//               <Badge
//                 key={skill}
//                 className="bg-orange-400/10 text-orange-300 border-orange-400/30"
//               >
//                 {skill}
//               </Badge>
//             ))}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DashboardView;

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
    { addSuffix: true }
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
              Next refresh {nextUpdateDistance}
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
            <div className="text-2xl font-bold">{insights.demandLevel}</div>
            <Progress
              className="mt-3 bg-zinc-800 [&>div]:bg-orange-400"
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
                className="bg-orange-400/10 text-orange-300 border-orange-400/30"
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
                className="border-orange-400/40 text-orange-300"
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
