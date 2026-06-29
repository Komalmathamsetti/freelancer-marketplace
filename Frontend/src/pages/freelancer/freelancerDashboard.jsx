import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Mail,
  Search,
  Briefcase,
  User,
  FileText,
  MessageSquare,
  LogOut,
  LayoutDashboard,
  ChevronRight,
} from "lucide-react";

export default function FreelancerDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
   useEffect(() => {
    const token = localStorage.getItem("token");
       if (!token) {
        navigate("/login");
       }
    }, [navigate]);
    const handleLogout = () => {
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     navigate("/login");
    };

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, active: true },
    { label: "Profile", icon: User },
    { label: "Browse Jobs", icon: Briefcase },
    { label: "My Proposals", icon: FileText },
    { label: "Messages", icon: MessageSquare },
    { label: "Notifications", icon: Bell },
    { label: "Logout", icon: LogOut },
  ];

  const jobs = [
    { title: "React Developer", company: "Bluewave Studio", budget: "$1,200", time: "2 days ago" },
    { title: "Tailwind UI Designer", company: "Nova Labs", budget: "$800", time: "5 days ago" },
    { title: "Frontend Engineer", company: "Pixel Forge", budget: "$2,500", time: "1 day ago" },
  ];
  if(!user){
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-white border-r border-slate-200 shadow-sm transition-transform duration-300 md:static md:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
            <div>
              <h1 className="text-xl font-bold text-blue-600">FreelanceHub</h1>
              <p className="text-xs text-slate-500">Marketplace Dashboard</p>
            </div>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <ChevronRight className="h-5 w-5 text-slate-500" />
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label}>
                    <button
                      onClick={() => {
                        if (item.label === "Logout") {
                          handleLogout();
                        }
                      }}
                     className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition ${
                     item.active ? "bg-blue-50 text-blue-600": "text-slate-600 hover:bg-slate-100"}`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1">
          {/* Topbar */}
          <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <button
                className="rounded-xl border border-slate-200 p-2 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h2 className="text-lg font-semibold">Dashboard</h2>
                <p className="text-sm text-slate-500">Welcome back, {user?.full_name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  className="w-64 bg-transparent text-sm outline-none placeholder:text-slate-400"
                  placeholder="Search jobs..."
                />
              </div>
              <button className="rounded-xl border border-slate-200 p-2">
                <Bell className="h-5 w-5 text-slate-600" />
              </button>
              <button className="rounded-xl border border-slate-200 p-2">
                <Mail className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          </header>

          <div className="p-4 md:p-6">
            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { label: "Active Proposals", value: "12" },
                { label: "Messages", value: "8" },
                { label: "Profile Views", value: "324" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200"
                >
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <h3 className="mt-2 text-3xl font-bold text-blue-600">{stat.value}</h3>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Jobs */}
              <section className="lg:col-span-2 rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Browse Jobs</h3>
                    <p className="text-sm text-slate-500">Latest opportunities for freelancers</p>
                  </div>
                  <button className="text-sm font-medium text-blue-600">View All</button>
                </div>

                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.title}
                      className="rounded-2xl border border-slate-200 p-4 hover:border-blue-300 hover:shadow-sm transition"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">{job.title}</h4>
                          <p className="text-sm text-slate-500">{job.company}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-semibold text-blue-600">{job.budget}</p>
                            <p className="text-xs text-slate-400">{job.time}</p>
                          </div>
                          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Profile */}
              <section className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-linear-to-br from-blue-500 to-sky-300"></div>
                  <h3 className="mt-4 text-xl font-semibold">{user?.full_name}</h3>
                  <p className="text-sm text-slate-500">Freelancer</p>
                  <p className="mt-3 text-sm text-slate-600">
                    React • Tailwind • UI/UX • Responsive Design
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700">
                    Edit Profile
                  </button>
                  <button className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 hover:bg-slate-50">
                    View Proposals
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}