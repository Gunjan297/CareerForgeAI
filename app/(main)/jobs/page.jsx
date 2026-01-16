import React from 'react'
import JobsList from './_components/jobs-list'
import { getJobs, getUser } from '@/actions/jobs';

const page = async() => {
    const user =await getUser();
    
    if (!user || !user.industry) {
    return (
      <div className="container mx-auto py-8">
        <p className="text-red-500">User industry not found.</p>
      </div>
    );
  }
  const role = user.industry
    .split("-")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");

    const jobs = await getJobs({
        role,
        location: "India",
    });

console.log(jobs);
  return (
    <div className="container mx-auto space-y-5">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 bg-clip-text text-transparent text-center">
        Recommended Jobs
      </h1>

      <JobsList jobs={jobs} />
    </div>
  )
}

export default page