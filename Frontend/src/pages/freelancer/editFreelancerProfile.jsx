import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile,updateProfile } from "../../services/profileServices";
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
  });
   useEffect(() => {
    const fetchProfile = async () => {
        try {
            const response = await getProfile();
            if (response.data.profile) {
                setFormData({
                    full_name:response.data.user?.full_name||"",
                    bio: response.data.profile.bio || "",
                    skills: response.data.profile.skills || "",
                    hourly_rate: response.data.profile.hourly_rate || "",
                    experience: response.data.profile.experience || "",
                    portfolio: response.data.profile.portfolio || "",
                });
            }
        } catch (error) {
           console.log(error);
        }
    };
    fetchProfile();
  }, []);
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
        alert("Profile Updated Successfully");
        navigate("/freelancer/dashboard");
    }
    catch(error){
        alert("Update failed");
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
                  <label className="mb-2 block text-sm font-medium text-slate-700">Bio</label>
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