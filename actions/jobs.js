"use server";
import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { fetchGoogleJobs } from "@/lib/serpapi/googleJobs";
import { unstable_cache } from "next/cache";

const ONE_DAY = 60 * 60 * 24;

const cachedGetJobs = unstable_cache(
  async ({ role, location }) => {
    const jobs = await fetchGoogleJobs({ role, location });

    return jobs.map((job) => ({
      title: job.title || "",
      company: job.company_name || "",
      location: job.location || "Not specified",
      description: job.description || "",
      link: job.apply_options?.[0]?.link || "",
      source: "Google Jobs",
      postedAt: job.detected_extensions?.posted_at || null,
    }));
  },
  (params) => ["google-jobs", params.role, params.location],
  {
    revalidate: ONE_DAY,
  }
);


export async function getJobs({ role, location }) {
  return cachedGetJobs({ role, location });
}

export async function getUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
      },
    });

    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to get user");
  }
}
