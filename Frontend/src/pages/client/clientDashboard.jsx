import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Mail,
  Search,
  Briefcase,
  LayoutDashboard,
  FileText,
  MessageSquare,
  LogOut,
  ChevronRight,
  User
} from "lucide-react";

const clientItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Company Profile", icon: User},
  { label: "Post Job", icon: Briefcase },
  { label: "My Jobs", icon: FileText },
  { label: "Proposals", icon: MessageSquare },
  { label: "Messages", icon: Mail },
  { label: "Notifications", icon: Bell },
  { label: "Logout", icon: LogOut },
];

function Sidebar({ items, title, subtitle, sidebarOpen, setSidebarOpen,handleLogout,navigate }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-white border-r border-slate-200 shadow-sm transition-transform duration-300 md:static md:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
        <div>
          <h1 className="text-xl font-bold text-blue-600">{title}</h1>
          <p className="text-xs text-slate-500">{subtitle}</p>
        </div>
        <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
          <ChevronRight className="h-5 w-5 text-slate-500" />
        </button>
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label}>
                <button
                      onClick={() => {
                        if(item.label === "Company Profile"){
                          navigate("/client/profile/edit");
                        }else if(item.label === "Dashboard"){ 
                          navigate("/client/dashboard");
                        }else if(item.label === "Logout"){
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
  );
}

function Topbar({ title, subtitle, setSidebarOpen }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          className="rounded-xl border border-slate-200 p-2 md:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
            placeholder="Search..."
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
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <h3 className="mt-2 text-3xl font-bold text-blue-600">{value}</h3>
    </div>
  );
}

export default function ClientDashboard() {
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
  const jobs = [
    { title: "Build Landing Page", status: "Active", bids: 12, budget: "$900" },
    { title: "Mobile App UI Design", status: "Reviewing", bids: 8, budget: "$1,500" },
    { title: "React Dashboard", status: "Closed", bids: 20, budget: "$2,200" },
  ];
  if(!user){
    return null;
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen">
        <Sidebar
          items={clientItems}
          title="Client Portal"
          subtitle="Freelancer Marketplace"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
          navigate={navigate}
        />

        <main className="flex-1">
          <Topbar
            title="Dashboard"
            subtitle={`Welcome back,${user?.full_name}`}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <StatCard label="Open Jobs" value="14" />
              <StatCard label="Proposals" value="38" />
              <StatCard label="Unread Messages" value="7" />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">My Jobs</h3>
                    <p className="text-sm text-slate-500">Track your posted jobs</p>
                  </div>
                  <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Post Job
                  </button>
                </div>

                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div
                      key={job.title}
                      className="rounded-2xl border border-slate-200 p-4 transition hover:border-blue-300"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">{job.title}</h4>
                          <p className="text-sm text-slate-500">
                            {job.bids} proposals received
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="text-sm font-semibold text-blue-600">{job.budget}</p>
                            <p className="text-xs text-slate-400">{job.status}</p>
                          </div>
                          <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-semibold">Quick Actions</h3>
                <div className="mt-4 space-y-3">
                  <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700">
                    Post a New Job
                  </button>
                  <button className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 hover:bg-slate-50">
                    Review Proposals
                  </button>
                  <button className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 hover:bg-slate-50">
                    Open Messages
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