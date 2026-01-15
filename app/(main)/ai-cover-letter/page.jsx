import { getCoverLetters } from '@/actions/cover-letter'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import CoverLetterList from './_components/cover-letter-list'

const AICoverLettersPage = async () => {
  const coverLetters = await getCoverLetters();

  return (
    <div>
      <div data-color-mode="light" className="space-y-4 flex flex-col md:flex-row justify-between items-center gap-2 gap-4 border-b border-orange-500/30 pb-4">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-100 via-orange-200 to-orange-400 bg-clip-text text-transparent text-center">
          Cover Letter Portfolio
        </h1>

        <div className="space-x-2">
          <Link href="/ai-cover-letter/new">
            <Button
              variant="destructive"
              className="px-6 py-2 rounded-lg font-medium text-orange-700 bg-gradient-to-r from-orange-200 to-orange-300 hover:from-orange-100 hover:to-orange-200 transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New
            </Button>
          </Link>
          </div>
     </div>

     <CoverLetterList coverLetters={coverLetters} />
    </div>
  )
}

export default AICoverLettersPage