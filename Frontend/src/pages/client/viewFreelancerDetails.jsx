import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFreelancerProfile } from "../../services/profileServices";
export default function ViewFreelancerProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [user, setUser] = useState(null);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getFreelancerProfile(id);
                if(response.data.success){
                    setUser(response.data.user);
                    setProfile(response.data.profile);
                }
            } catch(error){
                console.log(error);
            }
        };
        fetchProfile();
    }, [id]);
    if(!profile){
        return <h1 className="text-center mt-10">Loading...</h1>;
    }
    return (
  <div className="min-h-screen bg-slate-100 py-10 px-4">
    <div className="max-w-6xl mx-auto">

      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-blue-700 via-blue-600 to-sky-400 text-white shadow-xl">

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 rounded-xl bg-white/20 px-4 py-2 backdrop-blur hover:bg-white/30 transition"
        >
          ← Back
        </button>

        <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-12">

          <div className="flex items-center gap-6">

            <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center text-5xl font-bold text-blue-700 shadow-lg">
              {user.full_name
                ?.split(" ")
                .map(name => name[0])
                .join("")
                .slice(0,2)}
            </div>

            <div>

              <h1 className="text-5xl font-bold">
                {user.full_name}
              </h1>

              <p className="mt-3 text-lg text-blue-100">
                {user.email}
              </p>

              <span className="inline-block mt-4 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold">
                Freelancer
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="grid lg:grid-cols-3 gap-8 mt-8">

        {/* Left */}

        <div className="lg:col-span-2 space-y-8">

          {/* Bio */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              About
            </h2>

            <p className="leading-8 text-slate-600">
              {profile.bio || "No bio added."}
            </p>

          </div>

          {/* Skills */}

          <div className="bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-5">
              Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {profile.skills
                ?.split(",")
                .map((skill,index)=>(
                  <span
                    key={index}
                    className="rounded-full bg-blue-100 px-4 py-2 text-blue-700 font-medium hover:bg-blue-600 hover:text-white transition"
                  >
                    {skill.trim()}
                  </span>
              ))}

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-6">

          {/* Hourly */}

          <div className="rounded-3xl bg-linear-to-r from-green-50 to-green-100 p-6 shadow-lg">

            <p className="text-sm font-semibold uppercase text-green-700">
              Hourly Rate
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              ₹{profile.hourly_rate}/hr
            </h2>

          </div>

          {/* Experience */}

          <div className="rounded-3xl bg-linear-to-r from-purple-50 to-purple-100 p-6 shadow-lg">

            <p className="text-sm font-semibold uppercase text-purple-700">
              Experience
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-800">
              {profile.experience}
            </h2>

          </div>

          {/* Portfolio */}

          <div className="rounded-3xl bg-linear-to-r from-blue-50 to-blue-100 p-6 shadow-lg">
            <p className="text-sm font-semibold uppercase text-blue-700">
              Portfolio
            </p>
            {profile.portfolio ? (
              <a href={profile.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block break-all text-blue-700 hover:underline"
              >
                Visit Portfolio
              </a>
              ) : (
              <p className="mt-3 text-gray-600">
                Portfolio not added.
              </p>
            )}
          </div>
          {/* Resume */}
          <div className="rounded-3xl bg-linear-to-r from-orange-50 to-orange-100 p-6 shadow-lg">
            <p className="text-sm font-semibold uppercase text-orange-700">
              Resume
            </p>
            {profile.resume_url ? (
              <a href={`${import.meta.env.VITE_API_URL}${profile.resume_url}`} target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex items-center rounded-xl bg-orange-600 px-4 py-2 font-medium text-white transition hover:bg-orange-700">
                📄 View Resume
              </a>
              ) : (
              <p className="mt-3 text-gray-600">
                Resume not uploaded.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}