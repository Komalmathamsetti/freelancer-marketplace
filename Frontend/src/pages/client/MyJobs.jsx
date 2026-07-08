import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyJobs,deleteJob } from "../../services/jobServices";
export default function MyJobsPage() {
  const navigate = useNavigate();
  const [jobs,setJobs] = useState([]);
  const [loading,setLoading] = useState(true);
  const [search,setSearch] = useState("");
  const [filter,setFilter] = useState("All");
  const loadJobs = async () => {
  try {
    const response = await getMyJobs();

    if (response.data.success) {
      setJobs(response.data.jobs);
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
  };
  useEffect(() => {
  let ignore = false;

  (async () => {
    if (!ignore) {
      await loadJobs();
    }
  })();

  return () => {
    ignore = true;
  };
  }, []);
  if(loading){
    return(
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-3xl font-bold">Loading Jobs...</h1>
        </div>
    );
  }
  const handleDelete=async(id)=>{
    const confirmDelete=
    window.confirm("Delete this job?");
    if(!confirmDelete) return;
    try{
        await deleteJob(id);
        alert("Job Deleted");
        loadJobs();
    }catch(error){
        console.log(error);
    }
  }
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Jobs</h1>
              <p className="mt-2 text-sm text-slate-600">
                Manage all the jobs you have posted.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <select value={filter} onChange={(e)=>setFilter(e.target.value)}className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option>All</option>
                <option>Open</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobs.filter(job=>{
            const matchesSearch=job.title.toLowerCase().includes(search.toLowerCase());
            const matchesFilter=filter==="All"||job.status===filter;
            return matchesSearch && matchesFilter;
            }).map((job) => (
            <div
              key={job.id}
              className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold leading-snug">{job.title}</h2>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {job.category}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Budget</p>
                  <p className="mt-1 font-medium">₹{Number(job.budget).toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-slate-500">Location</p>
                  <p className="mt-1 font-medium">{job.location}</p>
                </div>
                <div>
                  <p className="text-slate-500">Experience</p>
                  <p className="mt-1 font-medium">{job.experience_level}</p>
                </div>
                <div>
                  <p className="text-slate-500">Deadline</p>
                  <p className="mt-1 font-medium">{job.deadline?.split("T")[0]}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-500">Proposals</p>
                  <p className="text-sm font-semibold">{job.proposal_count}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    job.status === "Open"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-rose-50 text-rose-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <button onClick={()=>navigate(`/client/applicants/${job.id}`)} className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 hover:shadow-md">
                  View Applicants
                </button>
                <button onClick={()=>navigate(`/client/edit-job/${job.id}`)} className="rounded-2xl border border-blue-600 bg-white px-4 py-3 text-sm font-medium text-blue-600 transition hover:bg-blue-50">
                  Edit Job
                </button>
                <button onClick={()=>handleDelete(job.id)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600">
                  Delete Job
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}