import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createJob } from "../../services/jobServices";
export default function JobPostingPage() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        title:"",
        description:"",
        category:"",
        budget:"",
        experience_level:"",    
        deadline:"",
        location:""
    });
    const handleChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit = async()=>{
        try{
            await createJob(formData);
            alert("Job Posted Successfully");
            navigate("/client/dashboard");
        }catch(error){
            console.log(error);
            alert("Falied to post the job");
        }
    };
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-xl ring-1 ring-blue-100 md:p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Post a Job</h1>
          <p className="mt-2 text-gray-600">
            Create a job listing and attract the right talent.
          </p>
          <button onClick={() => navigate("/client/dashboard")} className="mb-6 rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100">
            ← Back to Dashboard
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Frontend React Developer"
              className="w-full rounded-2xl border border-gray-200 bg-blue-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Job Description
            </label>
            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and expectations..."
              className="w-full rounded-2xl border border-gray-200 bg-blue-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 bg-blue-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Budget
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="$500 - $1000"
              className="w-full rounded-2xl border border-gray-200 bg-blue-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Experience Level
            </label>
            <input
              type="text"
              name="experience_level"
              value={formData.experience_level}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 bg-blue-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-200 bg-blue-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Remote, New York, London"
              placeholder="e.g. Remote, New York, London"
              className="w-full rounded-2xl border border-gray-200 bg-blue-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
        </div>

        <div className="mt-8">
          <button 
            onClick={handleSubmit}
            className="w-full rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
            Post Job
          </button>
        </div>
      </div>
    </div>
  );
}