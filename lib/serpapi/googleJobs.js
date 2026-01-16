import { getJson } from "serpapi";

export async function fetchGoogleJobs({ role, location }) {
  return new Promise((resolve, reject) => {
    getJson(
      {
        engine: "google_jobs",
        q: role,
        location,
        hl: "en",
        api_key: process.env.SERPAPI_API_KEY,
      },
      (json) => {
        if (json.error) {
          reject(json.error);
        } else {
          resolve(json.jobs_results || []);
        }
      }
    );
  });
}
