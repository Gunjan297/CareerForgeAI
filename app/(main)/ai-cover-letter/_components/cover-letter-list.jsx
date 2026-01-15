"use client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Edit2, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Card,CardContent,CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

const CoverLetterList = ({coverLetters}) => {
    const router = useRouter();

    const handleDelete = async(id)=>{
        try {
            await deleteCoverLetter(id);
            toast.success("Cover letter deleted successfully!");
            router.refresh();
        } 
        catch (error) {
            toast.error(error.message || "Failed to delete cover letter");
        }
    };
    
    if (!coverLetters?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Cover Letters Yet</CardTitle>
          <CardDescription>
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
  {coverLetters.map((letter) => (
    <Card
      key={letter.id}
      className="group relative overflow-hidden border border-orange-500/20 bg-black/40 shadow-lg shadow-orange-500/10 transition-all hover:border-orange-400/40"
    >
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-orange-400 via-orange-400 to-orange-400 bg-clip-text text-transparent">
              {letter.jobTitle}{" "}
              <span className="font-medium text-orange-200">at</span>{" "}
              {letter.companyName}
            </CardTitle>
            <CardDescription className="text-sm text-orange-200/60">
              Created on {format(new Date(letter.createdAt), "PPP")}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="border-orange-500/30 bg-black/50 text-orange-300 hover:bg-orange-500/10 hover:text-orange-400"
              onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
            >
              <Eye className="h-4 w-4" />
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-orange-500/30 bg-black/50 text-orange-300 hover:bg-red-500/10 hover:text-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="border border-orange-500/20 bg-black">
                <AlertDialogHeader>
                  <AlertDialogTitle >
                    Delete Cover Letter?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your cover letter for {letter.jobTitle} at{" "}
                        {letter.companyName}.
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel className="border-orange-500/30 bg-black hover:bg-orange-500/10">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(letter.id)}
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-400 hover:to-red-500"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="text-sm text-orange-200/70 leading-relaxed line-clamp-3">
          {letter.jobDescription}
        </div>
      </CardContent>

      {/* Subtle hover accent */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-orange-400/0 via-orange-400/40 to-orange-400/0 opacity-0 transition-opacity group-hover:opacity-100" />
    </Card>
  ))}
</div>

  )
}

export default CoverLetterList