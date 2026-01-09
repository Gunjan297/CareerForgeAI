// import { Button } from '@/components/ui/button'
// import { ArrowLeft } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'
// import Quiz from '../_components/quiz'

// const MockInterviewPage = () => {
//   return (
//     <div className="container mx-auto space-y-4 py-6">
//       <div className="flex flex-col space-y-2 mx-2">
//         <Link href="/interview">
//           <Button variant="link" className="gap-2 pl-0">
//             <ArrowLeft className="h-4 w-4" />
//             Back to Interview Preparation
//           </Button>
//         </Link>

//         <div>
//           <h1 className="text-6xl font-bold gradient-title bg-gradient-to-r from-orange-100 via-orange-200 to-orange-400 bg-clip-text text-transparent">Mock Interview</h1>
//           <p className="text-muted-foreground">
//             Test your knowledge with industry-specific questions
//           </p>
//         </div>
//         </div>

//         <Quiz/>
//     </div>
//   )
// }

// export default MockInterviewPage

// import { Button } from '@/components/ui/button'
// import { ArrowLeft } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'
// import Quiz from '../_components/quiz'

// const MockInterviewPage = () => {
//   return (
//     <div className="container mx-auto min-h-screen space-y-8 px-4 py-8 bg-black text-white">
//       <div className="flex flex-col space-y-4 max-w-4xl mx-auto">
//         <Link href="/interview">
//           <Button
//             variant="link"
//             className="gap-2 pl-0 text-orange-400 hover:text-orange-300"
//           >
//             <ArrowLeft className="h-4 w-4" />
//             Back to Interview Preparation
//           </Button>
//         </Link>

//         <div className="space-y-2">
//           <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
//             Mock Interview
//           </h1>
//           <p className="text-gray-400 max-w-xl">
//             Test your knowledge with industry-specific questions
//           </p>
//         </div>
//       </div>

//       <div className="max-w-4xl mx-auto rounded-2xl border border-orange-500/20 bg-gradient-to-br from-neutral-900 to-black p-6 shadow-lg shadow-orange-500/10">
//         <Quiz />
//       </div>
//     </div>
//   )
// }

// export default MockInterviewPage

import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import Quiz from '../_components/quiz'

const MockInterviewPage = () => {
  return (
    <div className="container mx-auto min-h-screen text-white space-y-10 px-4 pt-2">
  {/* Heading section */}
  <div className="text-center mt-0">
    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-300 via-orange-400 to-orange-500 bg-clip-text text-transparent">
      Mock Interview
    </h1>
    <p className="text-gray-400 text-lg max-w-xl mx-auto">
      Test your knowledge with industry-specific questions
    </p>
  </div>

  {/* Quiz card */}
  <div className="rounded-2xl bg-zinc-900/80 border border-orange-500/20 shadow-lg shadow-orange-500/10 p-6">
    <Quiz />
  </div>
</div>

  )
}

export default MockInterviewPage
