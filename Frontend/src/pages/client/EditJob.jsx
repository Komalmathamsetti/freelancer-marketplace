// EditJobPage.jsx
import { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { getSingleJob, updateJob } from "../../services/jobServices";
import toast from "react-hot-toast";
export default function EditJobPage() {
  const navigate=useNavigate();
  const {id}=useParams();
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState(false);
  const [job,setJob]=useState({
    title:"",
    category:"",
    budget:"",
    experience_level:"",
    location:"",
    deadline:"",
    description:""
   });
   useEffect(() => {
  let ignore = false;
  async function fetchJob() {
    try {
      const response = await getSingleJob(id);

      if (!ignore && response.data.success) {
        setJob(response.data.job);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to get Job");
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  }
  fetchJob();
  return () => {
    ignore = true;
  };
  }, [id]);
  const handleUpdate=async()=>{
    try{
        setSaving(true);
        const response=await updateJob(id,job);
        toast.success(response.data.message);
        navigate("/client/my-jobs");
    }catch(error){
      toast.error(error.response?.data?.message || "Unable to update job");
    }finally{
        setSaving(false);
    }
   };
   if(loading){
    return(
    <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading Job...</h1>
    </div>
    );
  }
  const handleChange=(e)=>{
    setJob({
        ...job,[e.target.name]:e.target.value
    });
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Edit Job</h1>
              <p className="mt-2 text-sm text-slate-600">
                Update your job details and keep your listing up to date.
              </p>
            </div>

            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                job.status === "Open"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"}`}>
              {job.status}
            </span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Job Title</label>
              <input
                type="text"
                name="title"
                value={job.title}
                onChange={handleChange}
                defaultValue="Website Redesign for SaaS Startup"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={job.category}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Budget</label>
              <div className="flex items-center rounded-2xl border border-slate-200 px-4 py-3 transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                <span className="mr-2 text-slate-500">₹</span>
                <input
                   type="number"
                   name="budget"
                   value={job.budget}
                   onChange={handleChange}
                   className="w-full outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Experience Level</label>
              <select name="experience_level" value={job.experience_level} onChange={handleChange} className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={job.location}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={job.deadline?.split("T")[0] || ""}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Job Description</label>
              <textarea
                rows={8}
                name="description"
                value={job.description}
                onChange={handleChange}
                className="w-full rounded-3xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <button onClick={()=>navigate("/client/my-jobs")} className="rounded-2xl border border-blue-600 bg-white px-6 py-3 font-medium text-blue-600 transition hover:bg-blue-50">
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              disabled={saving}
              className="rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Updating..." : "Update Job"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}