import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-indigo-600/30 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-72 w-72 rounded-full bg-purple-600/30 blur-[120px]" />
      </div>

      {/* Content */}
      <div className="max-w-xl text-center px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="h-6 w-6 text-indigo-400" />
          <span className="text-sm font-semibold tracking-wider text-indigo-400 uppercase">
            CareerForge AI
          </span>
        </div>

        <h1 className="text-6xl font-extrabold tracking-tight mb-4">
          404
        </h1>

        <h2 className="text-2xl font-semibold mb-3">
          Looks like you’re off the career path
        </h2>

        <p className="text-slate-400 mb-8 leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
          Don’t worry — CareerForge AI is here to guide you back towards
          the right direction.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/">
            <Button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-5 text-base font-semibold hover:bg-indigo-500">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button
              variant="outline"
              className="rounded-xl border-slate-700 px-6 py-5 text-base font-semibold text-slate-200 hover:bg-slate-800"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Footer Quote */}
      <p className="absolute bottom-6 text-xs text-slate-500">
        “Your career is a journey — detours help you learn.”
      </p>
    </div>
  );
}
