import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../services/jobServices";

export default function BrowseJobsPage() {
    const navigate = useNavigate();
    const [jobs,setJobs] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(() => {
    const loadJobs = async () => {
        try {
            const response = await getAllJobs();
            setJobs(response.data.jobs);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    loadJobs();
  }, []);
  if (loading) {
    return (
        <h1 className="text-center mt-20 text-2xl">
            Loading Jobs...
        </h1>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Browse Jobs</h1>
          <p className="mt-2 text-gray-600">
            Explore available opportunities and find the right match.
          </p>
        </div>
        {jobs.length === 0 && (
            <div className="text-center text-2xl">No Jobs Available</div>
        )}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="rounded-3xl bg-white p-6 shadow-lg ring-1 ring-blue-100 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-blue-900">{job.title}</h2>
                  <p className="mt-1 text-sm text-gray-500">{job.full_name}</p>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {job.category}
                </span>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">Budget</span>
                  <span className="font-semibold">₹{Number(job.budget).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-semibold">{job.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-semibold">{job.experience_level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Deadline</span>
                  <span className="font-semibold">{job.deadline?.split("T")[0]}</span>
                </div>
              </div>

              <button onClick = {()=> navigate(`/freelancer/jobs/${job.id}`)} className="mt-6 w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}