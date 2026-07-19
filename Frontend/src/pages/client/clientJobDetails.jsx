import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClientJob,closeJob } from "../../services/jobServices";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
export default function ClientJobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommendations,setRecommendations] = useState([]);
  const [loadingRecommendations,setLoadingRecommendations] = useState(false);
  const [showRecommendations,setShowRecommendations] = useState(false);
  useEffect(() => {
    const loadJob = async () => {
      try {
        setLoading(true);
        const response = await getClientJob(id);
        toast(response.data);
        if (response.data.success) {
          setJob(response.data.job);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Unable to load Job");
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <p className="text-lg font-medium text-slate-700">Loading Job...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="rounded-3xl bg-white shadow-sm border border-slate-100 px-8 py-10 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Job Not Found</h2>
        </div>
      </div>
    );
  }
  const handleCloseJob = async()=>{
    const result = await Swal.fire({
        title: "Close Job?",
        text: "Freelancers will no longer be able to apply for this job.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#6b7280",
        confirmButtonText: "Yes, Close Job",
        cancelButtonText: "Cancel",
    });
    if (!result.isConfirmed) return;
    try {
        const response = await closeJob(id);
        toast.success(response.data.message);
        setJob({
            ...job,
            status: "Closed",
        });
    } catch (error) {
        toast.error(
          error.response?.data?.message || "Unable to close the job."
        );
    }
  }
  const handleRecommendations = async()=>{
    try{
      setLoadingRecommendations(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/ai/recommend/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );
      setRecommendations(response.data.recommendations);
      setShowRecommendations(true);
    }catch(error){
      console.log(error);
      toast.error("Unable to fetch AI recommendations");
    }finally{
      setLoadingRecommendations(false);
    }
  }
  const isOpen = (job.status || "").toLowerCase() === "open";

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="rounded-3xl bg-white shadow-sm hover:shadow-lg transition-shadow border border-slate-100 p-6 sm:p-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  {job.title}
                </h1>

                {job.category && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                    {job.category}
                  </span>
                )}

                {job.status && (
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold ${
                      isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {job.status}
                  </span>
                )}
              </div>

              <p className="text-slate-500 font-medium">
                {job.full_name}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/client/proposals")}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Job Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {[
            {label:"Budget",value:`₹${Number(job.budget).toLocaleString("en-IN")}`},
            {label:"Experience Level",value:job.experience_level},
            {label:"Location",value:job.location},
            {label:"Deadline",value:job.deadline?.split("T")[0]},
            {label:"Status",value:job.status},
            {label:"Posted Date",value:job.created_at?.split("T")[0]}
        ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-white shadow-sm hover:shadow-lg transition-shadow border border-slate-100 p-6"
            >
              <div className="h-1 w-14 rounded-full bg-blue-600 mb-4" />
              <p className="text-sm font-medium text-slate-500">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">
                {item.value || "—"}
              </p>
            </div>
          ))}
        </div>

        {/* Job Description */}
        <div className="rounded-3xl bg-white shadow-sm hover:shadow-lg transition-shadow border border-slate-100 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Job Description</h2>
          <p className="mt-4 text-slate-700 leading-8 whitespace-pre-wrap">
            {job.description || "—"}
          </p>
        </div>

        {/* Required Skills */}
        <div className="rounded-3xl bg-white shadow-sm hover:shadow-lg transition-shadow border border-slate-100 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Required Skills</h2>
          <div className="mt-4">
            <span className="text-slate-500">
                Skills are not available.
            </span>
          </div>
        </div>

        {/* Applicants Summary */}
        <div className="rounded-3xl bg-white shadow-sm hover:shadow-lg transition-shadow border border-slate-100 p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-slate-900">Applicants Summary</h2>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {[
              { label: "Total Applicants", value: job.totalApplicants },
              { label: "Pending", value: job.pendingApplicants },
              { label: "Accepted", value: job.acceptedApplicants },
              { label: "Rejected", value: job.rejectedApplicants },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-3xl bg-blue-50 border border-blue-100 p-5"
              >
                <p className="text-sm font-medium text-slate-600">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {item.value ?? 0}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="rounded-3xl bg-white shadow-sm hover:shadow-lg transition-shadow border border-slate-100 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <button
              onClick={() => navigate(`/client/edit-job/${id}`)}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
            >
              Edit Job
            </button>

            <button
              onClick={() => navigate(`/client/applicants/${id}`)}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              View Applicants
            </button>
            <button onClick={handleRecommendations} className="rounded-2xl bg-purple-600 px-5 py-3 text-sm font-medium text-white hover:bg-purple-700 transition">
              {loadingRecommendations ? "Generating...": "🤖 AI Recommendations"}
            </button>
            {isOpen ? (
              <button onClick={handleCloseJob} className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-medium text-white hover:bg-red-700 transition">
                Close Job
              </button>
            ) : (
              <button
                disabled
                className="rounded-2xl bg-slate-200 px-5 py-3 text-sm font-medium text-slate-500 cursor-not-allowed"
              >
                Job Closed
              </button>
            )}

            <button
              onClick={() => navigate("/client/my-jobs")}
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              Back to My Jobs
            </button>
          </div>
        </div>
        {showRecommendations && (
          <div className="rounded-3xl bg-white shadow-sm border border-slate-100 p-6 sm:p-8 mt-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              🤖 AI Recommended Freelancers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {recommendations.map((freelancer) => (
                <div key={freelancer.id} className="rounded-2xl border border-slate-200 shadow hover:shadow-lg transition p-5">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{freelancer.full_name}</h3>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                      {freelancer.match}%
                    </span>
                  </div>
                  <p className="text-slate-500 mt-2">{freelancer.email}</p>
                  <div className="mt-4">
                    <p className="font-semibold mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {freelancer.skills?.split(",").map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold">Experience</p>
                    <p className="text-slate-600">{freelancer.experience_level}</p>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold">Hourly Rate</p>
                    <p className="text-slate-600">₹{freelancer.hourly_rate}</p>
                  </div>
                  <div className="mt-4">
                    <p className="font-semibold text-purple-700">AI Reason</p>
                    <p className="text-slate-700 mt-2">{freelancer.reason}</p>
                  </div>
                  {freelancer.portfolio && (
                    <a href={freelancer.portfolio} target="_blank" rel="noreferrer" className="inline-block mt-5 text-blue-600 hover:underline">
                      View Portfolio →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}