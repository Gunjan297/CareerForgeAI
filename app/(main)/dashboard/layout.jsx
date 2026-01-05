import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const layout = ({ children }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-center mb-5">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-100 via-orange-200 to-orange-400 bg-clip-text text-transparent text-center">
          Industry Overview
        </h1>
      </div>

      <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="gray" />}
      >
        {children}
      </Suspense>
    </div>
  )
}

export default layout