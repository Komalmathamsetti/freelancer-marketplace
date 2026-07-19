import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile,updateProfile,uploadResume,generateBio } from "../../services/profileServices";
import toast from "react-hot-toast";
export default function EditFreelancerProfile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [formData, setFormData] = useState({
    full_name:"",
    bio: "",
    skills: "",
    hourly_rate: "",
    experience: "",
    portfolio: "",
    resume_url:"",
  });
  const [resume,setResume] = useState(null);
  const [uploading,setUploading] = useState(false);
  const [generatingBio,setGeneratingBio] = useState(false);
   const fetchProfile = async () => {
    try {
        const response = await getProfile();
        if (response.data.profile) {
            setFormData({
                full_name: response.data.user?.full_name || "",
                bio: response.data.profile.bio || "",
                skills: response.data.profile.skills || "",
                hourly_rate: response.data.profile.hourly_rate || "",
                experience: response.data.profile.experience || "",
                portfolio: response.data.profile.portfolio || "",
                resume_url: response.data.profile.resume_url || "",
            });
        }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to find profile");
    }
  };
  useEffect(() => {
    const loadProfile = async()=>{
      await fetchProfile();
    };
    loadProfile();
  }, []);
  const handleResumeUpload = async () => {
    if (!resume) {
        toast.error("Please select a resume");
        return;
    }
    try {
        setUploading(true);
        const data = new FormData();
        data.append("resume", resume);
        const response = await uploadResume(data);
        toast.success(response.data.message);
        await fetchProfile();
        setResume(null);
    } catch (error) {
        console.log(error);
        toast.error(
            error.response?.data?.message ||
            "Resume Upload Failed"
        );
    } finally {
      setUploading(false);
    }
  };
  const handleGenerateBio = async()=>{
    try{
      setGeneratingBio(true);
      const response = await generateBio({
        skills:formData.skills,
        experience:formData.experience,
        hourly_rate:formData.hourly_rate,
      });
      setFormData((prev)=>({
        ...prev,
        bio:response.data.bio,
      }));
    }catch(error){
      console.log(error);
      toast.error("Failed to generate bio");
    }finally{
      setGeneratingBio(false);
    }
  };
  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
  };
  const handleSubmit = async () => {
    try{
        await updateProfile({
            ...formData,
            company_name:"",
            company_description:"",
            website:"",
            contact_number:""
        });
        toast.success("Profile Updated Successfully");
        navigate("/freelancer/dashboard");
    }
    catch(error){
        toast.error("Update failed");
        console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-3xl bg-white shadow-lg ring-1 ring-blue-100">
          <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
            <h1 className="text-2xl font-bold text-slate-900">Edit Freelancer Profile</h1>
            <p className="mt-1 text-sm text-slate-500">
              Update your professional details and portfolio information.
            </p>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-8">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-blue-100 bg-blue-50 text-sm font-medium text-blue-500">
                  Photo
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-slate-800">{user?.full_name}</h2>
                  <p className="text-sm text-slate-500">
                    Add a professional image to improve your profile visibility.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                  <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"/>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500 outline-none"
                  />
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-700">Bio</label>
                    <button type="button" onClick={handleGenerateBio} disabled={generatingBio} className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700 disabled:opacity-50">
                      {generatingBio ? "Generating..." : formData.bio? "🔄 Regenerate Bio": "✨ Generate Bio"}
                    </button>
                  </div>
                  <textarea name="bio" value={formData.bio} onChange={handleChange} rows="4"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Skills</label>
                  <input type="text" name="skills" value={formData.skills} onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Experience</label>
                  <input type="text" name="experience" value={formData.experience} onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Hourly Rate</label>
                  <input type="number" name="hourly_rate" value={formData.hourly_rate} onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Portfolio Link</label>
                  <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Resume (PDF)</label>
                <input type="file" accept=".pdf" onChange={(e)=>setResume(e.target.files[0])} className="w-full border rounded-lg p-2"/>
              </div>
              <button onClick = {handleResumeUpload} disabled={!resume || uploading} className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
                {uploading ? "uploading...":"Upload Resume"}
              </button>
              {formData.resume_url && (
                <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4">
                  <h3 className="font-semibold text-green-700">Current Resume</h3>
                  <a href={`${import.meta.env.VITE_API_URL}${formData.resume_url}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-600 hover:underline">
                    📄 View Resume
                  </a>
                </div>
              )}
              <button onClick={handleSubmit} className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
                Save Changes
              </button>
              <button onClick={()=>navigate("/freelancer/dashboard")} className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}