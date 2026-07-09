import  { useMemo,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications,withdrawApplication } from "../../services/proposalServices";
import {
  Search,
  Filter,
  Briefcase,
  Clock3,
  CheckCircle2,
  XCircle,
  Eye,
  CalendarDays,
  Building2,
  DollarSign,
  HandCoins,
} from "lucide-react";


function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{value}</h3>
        </div>
        <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles =
    status === "Pending"
      ? "bg-amber-100 text-amber-700 ring-amber-200"
      : status === "Accepted"
      ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
      : "bg-red-100 text-red-700 ring-red-200";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${styles}`}>
      {status}
    </span>
  );
}

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export default function MyApplicationsPage() {
  const navigate = useNavigate(); 
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [applications,setApplications] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
  const loadApplications = async () => {
    try {
      const response = await getMyApplications();

      if (response.data.success) {
        setApplications(response.data.proposals);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  loadApplications();
  }, []);
   const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
        const matchesSearch = `${app.title} ${app.category}`
            .toLowerCase()
            .includes(search.toLowerCase());
        const matchesFilter =
            filter === "All" ||
            app.status === filter;
        return matchesSearch && matchesFilter;
    });
  }, [applications, search, filter]);
  if (loading) {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold">Loading Applications...</h1>
    </div>
  );
  }
  const totals = {
    total: applications.length,
    pending: applications.filter(app => app.status === "Pending").length,
    accepted: applications.filter(app => app.status === "Accepted").length,
    rejected: applications.filter(app => app.status === "Rejected").length
  };
  const handleWithdraw = async (proposalId) => {
    try {
        console.log("Deleting proposal:", proposalId);

        const response = await withdrawApplication(proposalId);

        alert(response.data.message);

        setApplications(prev =>
            prev.filter(app => app.id !== proposalId)
        );

    } catch (error) {
        console.log(error);
        console.log(error.response?.data);
        alert(error.response?.data?.message || "Error withdrawing application");
    }
  };
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">Freelancer Marketplace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">My Applications</h1>
          <p className="mt-3 text-slate-500">Track the jobs you have applied for.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Applications" value={totals.total} icon={Briefcase} />
          <StatCard title="Pending" value={totals.pending} icon={Clock3} />
          <StatCard title="Accepted" value={totals.accepted} icon={CheckCircle2} />
          <StatCard title="Rejected" value={totals.rejected} icon={XCircle} />
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5">
          {filteredApplications.map((app, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold tracking-tight">{app.title}</h2>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="h-4 w-4" />
                          Client
                        </span>
                        <span className="h-1 w-1 rounded-full bg-slate-300" />
                        <span>{app.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <InfoItem icon={DollarSign} label="Budget" value={Number(app.budget).toLocaleString("en-IN")} />
                    <InfoItem icon={HandCoins} label="My Bid Amount" value={Number(app.bid_amount).toLocaleString("en-IN")} />
                    <InfoItem icon={Clock3} label="Estimated Completion Days" value={app.estimated_days} Days />
                    <InfoItem icon={CalendarDays} label="Applied Date" value={app.created_at?.split("T")[0]} />
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <StatusBadge status={app.status} />
                  <div className="flex flex-wrap gap-3">
                    <button onClick={() => navigate(`/freelancer/jobs/${app.job_id}`)} className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                      <Eye className="h-4 w-4" />
                      View Job
                    </button>
                    <button onClick={() => handleWithdraw(app.id)} className="inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100">
                      <XCircle className="h-4 w-4" />
                      Withdraw Application 
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}