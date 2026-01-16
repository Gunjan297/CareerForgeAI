import JobCard from "./job-card";

const JobsList = ({ jobs }) => {
  if (!jobs?.length) {
    return (
      <p className="text-muted-foreground">
        No jobs found matching your profile.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {jobs.map((job, index) => (
        <JobCard key={index} job={job} />
      ))}
    </div>
  );
};

export default JobsList;
