import { useMemo, useState, useEffect } from "react";
import { getAllJobs,deleteJob } from "../../services/adminServices";
import { useNavigate } from "react-router-dom";

export default function AdminManageJobsPage() {
  const navigate = useNavigate();
  const [jobs,setJobs]=useState([]);
  const [loading,setLoading]=useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  useEffect(()=>{
    let ignore=false;
    async function loadJobs(){
        try{
            const response=await getAllJobs();
            if(!ignore && response.data.success){
                setJobs(response.data.jobs);
            }
        }
        catch(error){
            console.log(error);
        }
        finally{
            if(!ignore){
                setLoading(false);
            }
        }
    }
    loadJobs();
    return ()=>{
        ignore=true;
    };
  },[]);
  const filteredJobs = useMemo(() => {
    return jobs.filter((job)=>{
    const matchesSearch=
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.category.toLowerCase().includes(search.toLowerCase()) ||
    job.full_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus=statusFilter==="All"||job.status===statusFilter;
    return matchesSearch && matchesStatus;
   });
  }, [jobs,search, statusFilter]);

  const statusStyles = {
    Open: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
    Closed: "bg-slate-100 text-slate-700 ring-1 ring-slate-200",
  };
  if(loading){
    return(
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-3xl font-bold">Loading Jobs...</h1>
        </div>
    );
  }
  const handleDelete=async(id)=>{
    if(!window.confirm("Delete this job?")){
        return;
    }
    try{
        const response=await deleteJob(id);
        alert(response.data.message);
        setJobs(prev=>
            prev.filter(job=>job.id!==id)
        );
    }
    catch(error){
        console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Manage Jobs
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Monitor and manage all jobs posted on the marketplace.
              </p>
              <button onClick={() => navigate("/admin/dashboard")} className="mb-6 rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100">
                ← Back to Dashboard
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Jobs"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:w-64"
                />
              </div>

              <div className="flex items-center gap-2">
                {["All", "Open", "Closed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                      statusFilter === status
                        ? "bg-[#2563EB] text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-[#2563EB]"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold leading-snug text-slate-900">
                    {job.title}
                  </h2>
                  <span className="mt-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-[#2563EB] ring-1 ring-blue-100">
                    {job.category}
                  </span>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[job.status]}`}
                >
                  {job.status}
                </span>
              </div>

              <div className="mt-5 grid gap-3 text-sm text-slate-600">
                <div className="flex justify-between gap-4">
                  <span>Budget</span>
                  <span className="font-medium text-slate-900">₹{Number(job.budget).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Location</span>
                  <span className="font-medium text-slate-900">{job.location}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Deadline</span>
                  <span className="font-medium text-slate-900">{job.deadline?.split("T")[0]}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Client Name</span>
                  <span className="font-medium text-slate-900">
                    {job.full_name}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Proposals</span>
                  <span className="font-medium text-slate-900">
                    0
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button onClick={()=>navigate(`/jobs/${job.id}`)} className="rounded-xl bg-[#2563EB] px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 hover:shadow-md">
                  View Job
                </button>
                <button onClick={()=>navigate(`/client/edit-job/${job.id}`)} className="rounded-xl border border-[#2563EB] px-3 py-2.5 text-sm font-medium text-[#2563EB] transition hover:bg-blue-50">
                  Edit Job
                </button>
                <button onClick={()=>handleDelete(job.id)} className="rounded-xl bg-red-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 hover:shadow-md">
                  Delete Job
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-slate-50 py-16 text-center">
            <p className="text-sm font-medium text-slate-600">
              No jobs match your search or filter.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}