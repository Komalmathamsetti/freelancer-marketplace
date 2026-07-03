import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { getSingleJob } from "../../services/jobServices";
export default function JobDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchJob = async () => {
        try {
            const response = await getSingleJob(id);
            setJob(response.data.job);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    };
    fetchJob();
  }, [id]);
  if(loading){
    return(
        <h1 className="text-center mt-20 text-2xl">
            Loading Job...
        </h1>
    );
  }
  if(!job){
    return(
        <h1 className="text-center mt-20 text-2xl">
            Job Not Found
        </h1>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-blue-100 md:p-10">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              {job.title}
            </h1>
            <p className="mt-2 text-gray-600">{job.full_name}</p>
          </div>
          <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {job.category}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm text-gray-500">Budget</p>
            <p className="mt-1 text-lg font-semibold text-blue-900">₹{Number(job.budget).toLocaleString("en-IN")}</p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm text-gray-500">Experience Level</p>
            <p className="mt-1 text-lg font-semibold text-blue-900">{job.experience_level}</p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm text-gray-500">Deadline</p>
            <p className="mt-1 text-lg font-semibold text-blue-900">{job.deadline?.split("T")[0]}</p>
          </div>
          <div className="rounded-2xl bg-blue-50 p-5">
            <p className="text-sm text-gray-500">Location</p>
            <p className="mt-1 text-lg font-semibold text-blue-900">{job.location}</p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-blue-900">Job Description</h2>
          <p className="mt-3 leading-7 text-gray-700">
            {job.description}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <button className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            Apply
          </button>
          <button onClick={() => navigate("/freelancer/jobs")}
            className="rounded-2xl border border-blue-200 bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}