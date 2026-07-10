import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile,updateProfile } from "../../services/profileServices";
export default function EditClientProfile() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        company_name: "",
        company_description:"",
        website:"",
        contact_number:""
    });
    useEffect(() => {
     const fetchProfile = async () => {
      try {
      const response = await getProfile();
      if (response.data.success) {
        setFormData({
          company_name: response.data.profile?.company_name || "",
          company_description: response.data.profile?.company_description || "",
          website: response.data.profile?.website || "",
          contact_number: response.data.profile?.contact_number || "",
        });
      }
    }catch (error) {
      console.log(error);
    }
    };
    fetchProfile();
    }, []);
    const handleChange=(e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit = async()=>{
       try{
           await updateProfile({
            bio: "",
            skills: "",
            hourly_rate: "",
            experience: "",
            portfolio: "",
            company_name: formData.company_name,
            company_description: formData.company_description,
            website: formData.website,
            contact_number: formData.contact_number
           });
           alert("Profile Updated");
           navigate("/client/dashboard");
       }catch(error){
        console.log(error)
;
       }
    };
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl bg-white shadow-lg ring-1 ring-blue-100">
          <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
            <h1 className="text-2xl font-bold text-slate-900">Edit Client Profile</h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your company details in one place.
            </p>
            <button onClick={() => navigate("/client/dashboard")} className="mb-6 rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100">
              ← Back to Dashboard
            </button>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Company Name</label>
                <input
                  type="text"
                  placeholder="Enter company name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Company Description</label>
                <textarea
                  rows="4"
                  name="company_description"
                  value={formData.company_description}
                  placeholder="Tell us about your company"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  placeholder="https://example.com"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Contact Number</label>
                <input
                  type="tel"
                  name="contact_number"
                  value={formData.contact_number}
                  placeholder="+1 555 000 0000"
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button onClick={handleSubmit} className="w-full rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
                Save Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}