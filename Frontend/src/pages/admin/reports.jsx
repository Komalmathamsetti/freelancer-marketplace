import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlatformAnalytics,getPlatformInsights } from "../../services/adminServices";
import{
  Users,
  Briefcase,
  FileText,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import toast from "react-hot-toast";
export default function ReportsAnalyticsPage() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState({
    totalUsers:0,
    totalClients:0,
    totalFreelancers:0,
    totalJobs:0,
    totalProposals:0,
    accepted:0,
    pending:0,
    rejected:0
  });
  const [insights,setInsights] = useState({
     mostActiveUser:null,
     mostAppliedJob:null,
     highestBudgetJob:null,
     recentActivity:null
  });
  const [lastUpdated,setLastUpdated] = useState("");
  const [loading,setLoading]=useState(true);
  const stats=[
    {label:"Total Users",value:analytics.totalUsers,icon:Users},
    {label:"Clients",value:analytics.totalClients,icon:Users},
    {label:"Freelancers",value:analytics.totalFreelancers,icon:Users},
    {label:"Jobs",value:analytics.totalJobs,icon:Briefcase},
    {label:"Proposals",value:analytics.totalProposals,icon:FileText},
    {label:"Accepted",value:analytics.accepted,icon:CheckCircle},
    {label:"Pending",value:analytics.pending,icon:Clock},
    {label:"Rejected",value:analytics.rejected,icon:XCircle},
  ];
  const insightCards=[
    {label:"Most Active User",value:insights.mostActiveUser?.full_name || "No Users",meta:"Latest Registered User"},
    {label:"Most Applied Job",value:insights.mostAppliedJob?.title || "No Jobs",meta:`${insights.mostAppliedJob?.applications || 0} Applications`},
    {label:"Highest Budget Job",value:insights.highestBudgetJob?.title || "No Jobs",meta:`₹${Number(insights.highestBudgetJob?.budget || 0).toLocaleString("en-IN")}`},
    {label:"Today's Activity",value:`${insights.recentActivity?.proposals_today || 0} Proposals`,meta:"Submitted Today"}
  ];
  const total = analytics.accepted+analytics.pending+analytics.rejected;
  const proposalSummary=[
    {label:"Accepted",value:total===0?0:Math.round((analytics.accepted/total)*100),color:"bg-green-100 text-green-700"},
    {label:"Pending",value:total===0?0:Math.round((analytics.pending/total)*100),color:"bg-yellow-100 text-yellow-700"},
    {label:"Rejected",value:total===0?0:Math.round((analytics.rejected/total)*100),color:"bg-red-100 text-red-700"}
  ];
    const loadAnalytics=async()=>{
      try{
        setLoading(true);
        const analyticsResponse = await getPlatformAnalytics();
        if(analyticsResponse.data.success){
          setAnalytics(analyticsResponse.data.analytics);
        }
        const insightResponse = await getPlatformInsights();
        if(insightResponse.data.success){
          setInsights(insightResponse.data.insights);
        }
        setLastUpdated(new Date().toLocaleTimeString());
      }catch(error){
        toast.error(error.response?.data?.message || "Unable to load analytics");
      }finally{
        setLoading(false);
      }
    };
    useEffect(()=>{
      const fetchData = async () => {
        await loadAnalytics();
      };fetchData();
    },[]);
  if(loading){
    return(
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-3xl font-bold">
                Loading Analytics...
            </h1>
        </div>
    );
  }  
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Reports & Analytics
          </h1>
          <p className="mt-2 text-gray-600">
            Platform statistics and marketplace performance.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Last Updated : {lastUpdated}
          </p>
          <button onClick={() => navigate("/admin/dashboard")} className="mb-6 rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100">
            ← Back to Dashboard
          </button>
        </div>

        {/* Statistics Cards */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item)=>{
            const Icon=item.icon;
            return(
            <div key={item.label} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">
                    {item.label}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold text-blue-600">
                    {item.value}
                  </h2>
                </div>
              <div className="rounded-full bg-blue-100 p-3">
                <Icon className="h-6 w-6 text-blue-600"/>
              </div>
            </div>
            </div>
          );
          })}
        </section>

        {/* Proposal Status Summary */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Proposal Status Summary
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {proposalSummary.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-700">{item.label}</p>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${item.color}`}>
                    {item.value}% ({item.label==="Accepted"?analytics.accepted:item.label==="Pending"?analytics.pending:analytics.rejected})
                  </span>
                </div>
                <div className="mt-5 h-3 w-full rounded-full bg-gray-100">
                  <div
                    className={`h-3 rounded-full ${
                      item.label === "Accepted"
                        ? "bg-green-500 "
                        : item.label === "Pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{
                        width:`${item.value}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Platform Insights */}
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Platform Insights
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {insightCards.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-sm font-medium text-gray-500">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-gray-600">{item.meta}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button onClick={()=>window.print()} className="rounded-2xl bg-[#2563EB] px-6 py-3 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg">
              Export Report
            </button>
            <button onClick={loadAnalytics} className="rounded-2xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50">
              Refresh Analytics
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}