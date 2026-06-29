import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Mail,
  Search,
  Briefcase,
  LogOut,
  Users,
  BarChart3,
  CreditCard,
  AlertTriangle,
  ChevronRight,
} from "lucide-react";

const adminItems = [
  { label: "Users", icon: Users, active: true },
  { label: "Jobs", icon: Briefcase },
  { label: "Reports", icon: AlertTriangle },
  { label: "Payments", icon: CreditCard },
  { label: "Analytics", icon: BarChart3 },
  { label: "Logout", icon: LogOut },
];

function Sidebar({ items, title, subtitle, sidebarOpen, setSidebarOpen, handleLogout }) {
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

export default function AdminDashboard() {
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
  const metrics = [
    { label: "Total Users", value: "2,480" },
    { label: "Active Jobs", value: "312" },
    { label: "Payments", value: "$48K" },
  ];

  const reports = [
    { title: "Disputed Payment", status: "Pending Review" },
    { title: "Spam Job Post", status: "Resolved" },
    { title: "Abuse Report", status: "Investigation" },
  ];
  if(!user){
    return null;
  }
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <div className="flex min-h-screen">
        <Sidebar
          items={adminItems}
          title="Admin Panel"
          subtitle="Marketplace Management"
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />

        <main className="flex-1">
          <Topbar
            title="Admin Dashboard"
            subtitle={`Welcome back, ${user?.full_name}`}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="p-4 md:p-6">
            <div className="grid gap-4 md:grid-cols-3">
              {metrics.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} />
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <section className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">Analytics</h3>
                    <p className="text-sm text-slate-500">Professional marketplace overview</p>
                  </div>
                  <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50">
                    Export
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl bg-blue-50 p-5">
                    <p className="text-sm text-slate-600">Platform Growth</p>
                    <h4 className="mt-2 text-3xl font-bold text-blue-600">+18%</h4>
                    <p className="mt-1 text-sm text-slate-500">Compared to last month</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <p className="text-sm text-slate-600">Conversion Rate</p>
                    <h4 className="mt-2 text-3xl font-bold text-slate-800">6.4%</h4>
                    <p className="mt-1 text-sm text-slate-500">Applications to hires</p>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-semibold">Reports</h3>
                <div className="mt-4 space-y-3">
                  {reports.map((report) => (
                    <div key={report.title} className="rounded-xl border border-slate-200 p-3">
                      <p className="font-medium">{report.title}</p>
                      <p className="text-sm text-slate-500">{report.status}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 space-y-3">
                  <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700">
                    Review Payments
                  </button>
                  <button className="w-full rounded-xl border border-slate-200 px-4 py-3 font-medium text-slate-700 hover:bg-slate-50">
                    Manage Users
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