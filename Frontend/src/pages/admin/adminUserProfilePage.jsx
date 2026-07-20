import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserProfile } from "../../services/adminServices";
import toast from "react-hot-toast";

export default function AdminUserProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profile,setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function loadUser() {
        try {
            const response = await getUserProfile(id);
            setUser(response.data.user);
            setProfile(response.data.profile);
        }
        catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to load profile"
            );
        }
        finally {
            setLoading(false);
        }
    }
        loadUser();
    }, [id]);
    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-3xl font-bold">
                    Loading Profile...
                </h1>
            </div>
        );
    }
    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-3xl font-bold">
                    User Not Found
                </h1>
            </div>
        );
    }
   return (
  <div className="min-h-screen bg-slate-100 py-10 px-4">
    <div className="max-w-5xl mx-auto space-y-8">

      {/* Header */}
      <div className="rounded-3xl bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-xl p-8">

        <button
          onClick={() => navigate("/admin/users")}
          className="mb-8 rounded-xl bg-white/20 px-5 py-2 hover:bg-white/30 transition"
        >
          ← Back
        </button>

        <div className="flex items-center gap-6">

          <div className="h-24 w-24 rounded-full bg-white text-blue-600 flex items-center justify-center text-4xl font-bold shadow-lg">
            {user.full_name?.charAt(0).toUpperCase()}
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              {user.full_name}
            </h1>

            <p className="mt-2 text-blue-100">
              {user.email}
            </p>

            <span className="inline-block mt-4 bg-white/20 rounded-full px-4 py-1 capitalize font-semibold">
              {user.role}
            </span>

          </div>

        </div>

      </div>

      {/* Personal Info */}

      <div className="rounded-3xl bg-white shadow-lg p-8">

        <h2 className="text-2xl font-bold text-slate-800 mb-8">
          Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="text-slate-500">
              Email
            </p>

            <p className="font-semibold text-lg">
              {user.email}
            </p>

          </div>

          <div>

            <p className="text-slate-500">
              Role
            </p>

            <p className="font-semibold capitalize text-lg">
              {user.role}
            </p>

          </div>

          <div>

            <p className="text-slate-500">
              Phone
            </p>

            <p className="font-semibold">
              {user.phone || "-"}
            </p>

          </div>

          <div>

            <p className="text-slate-500">
              Joined
            </p>

            <p className="font-semibold">
              {user.created_at?.split("T")[0]}
            </p>

          </div>

        </div>

      </div>

      {/* Freelancer */}

      {user.role === "freelancer" && profile && (

        <div className="rounded-3xl bg-white shadow-lg p-8">

          <h2 className="text-2xl font-bold text-purple-700 mb-8">
            💼 Freelancer Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <p className="text-slate-500 mb-2">
                Skills
              </p>

              <div className="flex flex-wrap gap-2">

                {profile.skills
                  ? profile.skills.split(",").map((skill, index) => (

                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {skill.trim()}
                      </span>

                    ))
                  : "-"}

              </div>

            </div>

            <div>

              <p className="text-slate-500">
                Experience
              </p>

              <p className="font-semibold">
                {profile.experience || "-"}
              </p>

            </div>

            <div>

              <p className="text-slate-500">
                Hourly Rate
              </p>

              <p className="font-semibold text-green-600">
                ₹{profile.hourly_rate || "-"}
              </p>

            </div>

            <div>

              <p className="text-slate-500">
                Portfolio
              </p>

              {profile.portfolio ? (

                <a
                  href={profile.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  View Portfolio
                </a>

              ) : (
                "-"
              )}

            </div>

            <div className="md:col-span-2">

              <p className="text-slate-500 mb-2">
                Bio
              </p>

              <div className="bg-slate-50 rounded-xl p-4">
                {profile.bio || "-"}
              </div>

            </div>

            <div>

              <p className="text-slate-500 mb-2">
                Resume
              </p>

              {profile.resume_url ? (

                <a
                  href={`http://localhost:5000${profile.resume_url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-xl bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition"
                >
                  View Resume
                </a>

              ) : (
                "-"
              )}

            </div>

          </div>

        </div>

      )}

      {/* Client */}

      {user.role === "client" && profile && (

        <div className="rounded-3xl bg-white shadow-lg p-8">

          <h2 className="text-2xl font-bold text-blue-700 mb-8">
            🏢 Company Information
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <p className="text-slate-500">
                Company Name
              </p>

              <p className="font-semibold">
                {profile.company_name || "-"}
              </p>

            </div>

            <div>

              <p className="text-slate-500">
                Contact Number
              </p>

              <p className="font-semibold">
                {profile.contact_number || "-"}
              </p>

            </div>

            <div>

              <p className="text-slate-500">
                Website
              </p>

              {profile.website ? (

                <a
                  href={profile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Visit Website
                </a>

              ) : (
                "-"
              )}

            </div>

            <div className="md:col-span-2">

              <p className="text-slate-500 mb-2">
                Company Description
              </p>

              <div className="bg-slate-50 rounded-xl p-4">
                {profile.company_description || "-"}
              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  </div>
);
}