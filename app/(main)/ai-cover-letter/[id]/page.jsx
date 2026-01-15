import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCoverLetter } from "@/actions/cover-letter";
import CoverLetterPreview from "../_components/cover-letter-preview";

export default async function EditCoverLetterPage({ params }) {
  const { id } = await params;
  const coverLetter = await getCoverLetter(id);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col">
        <Link href="/ai-cover-letter">
          <Button variant="link" className="flex items-center gap-2 pl-0 text-orange-300 hover:text-orange-200">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>

        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-200 to-orange-400 bg-clip-text text-transparent text-center mb-6 border-b border-orange-500/20 pb-8">
          {coverLetter?.jobTitle} at {coverLetter?.companyName}
        </h1>
      </div>

      <CoverLetterPreview content={coverLetter?.content} />
    </div>
  );
}