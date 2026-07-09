import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSavedJobs,removeJob } from "../../services/freelancerServices";
export default function SavedJobsPage() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [jobs,setJobs] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    let ignore=false;
    async function loadSavedJobs(){
        try{
            const response=await getSavedJobs();
            if(!ignore && response.data.success){
                setJobs(response.data.jobs);
            }
        }catch(error){
            console.log(error);
        }finally{
            if(!ignore){
                setLoading(false);
            }
        }
    }loadSavedJobs();
    return()=>{
        ignore=true;
    };
  },[]);
  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return jobs;
    return jobs.filter((job) =>
      [job.title, job.company, job.category, job.location, job.experience, job.status]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [jobs,search]);
  if(loading){
    return(
    <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading Saved Jobs...</h1>
        </div>
    );
  }
  const handleRemove=async(jobId)=>{
    if(!window.confirm("Remove this saved job?")){
        return;
    }
    try{
        const response=await removeJob(jobId);
        alert(response.data.message);
        setJobs(prev=>
            prev.filter(job=>job.id!==jobId)
        );
    }catch(error){
        console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="sticky top-0 z-20 -mx-4 mb-8 border-b border-slate-100 bg-white/95 px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Saved Jobs
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
                Access all your bookmarked opportunities in one place.
              </p>
            </div>

            <div className="w-full md:max-w-md">
              <label className="sr-only" htmlFor="saved-jobs-search">
                Search Saved Jobs
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" />
                  </svg>
                </span>
                <input
                  id="saved-jobs-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Saved Jobs"
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </div>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <article
                key={job.id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,99,235,0.12)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-100">
                      {job.category}
                    </span>
                    <h2 className="mt-4 text-xl font-semibold tracking-tight text-slate-900">
                      {job.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">{job.full_name}</p>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      job.status === "Open"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                        : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="mt-6 grid gap-3 text-sm">
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-slate-500">Budget</span>
                    <span className="font-medium text-slate-900">₹{Number(job.budget).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-slate-500">Location</span>
                    <span className="font-medium text-slate-900">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-slate-500">Experience</span>
                    <span className="font-medium text-slate-900">{job.experience_level}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-slate-500">Deadline</span>
                    <span className="font-medium text-slate-900">{job.deadline?.split("T")[0]}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                    <span className="text-slate-500">Posted</span>
                    <span className="font-medium text-slate-900">{job.created_at?.split("T")[0]}</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button onClick={()=>navigate(`/freelancer/jobs/${job.id}`)} className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]">
                    View Job
                  </button>
                  <button onClick={()=>navigate(`/freelancer/jobs/${job.id}`)} className="rounded-2xl border border-blue-600 bg-white px-4 py-3 text-sm font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:shadow-sm active:scale-[0.98]">
                    Apply Now
                  </button>
                  <button onClick = {()=>handleRemove(job.id)} className="rounded-2xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-600 transition-all duration-200 hover:bg-red-50 hover:shadow-sm active:scale-[0.98]">
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white px-6 py-12 text-center shadow-[0_10px_35px_rgba(15,23,42,0.06)] sm:px-10">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-blue-50">
                <svg viewBox="0 0 120 120" className="h-16 w-16 text-blue-600" fill="none">
                  <rect x="24" y="28" width="72" height="54" rx="16" stroke="currentColor" strokeWidth="3" />
                  <path d="M40 48h40M40 60h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <path d="M47 82h26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="88" cy="88" r="10" fill="currentColor" opacity="0.12" />
                  <path d="M88 83v10M83 88h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>

              <h2 className="mt-6 text-2xl font-semibold tracking-tight">
                No Saved Jobs Yet
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Save interesting jobs while browsing and they will appear here.
              </p>

              <button onClick={()=>navigate("/freelancer/jobs")} className="mt-8 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]">
                Browse Jobs
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}