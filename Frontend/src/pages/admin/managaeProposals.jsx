import { useMemo, useState, useEffect } from "react";
import { getAllProposals, deleteProposal } from "../../services/adminServices";
import { useNavigate } from "react-router-dom";

const statusClasses = {
  Pending: "bg-yellow-100 text-yellow-700 ring-yellow-200",
  Accepted: "bg-green-100 text-green-700 ring-green-200",
  Rejected: "bg-red-100 text-red-700 ring-red-200",
};

export default function ProposalManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [proposals,setProposals] = useState([]);
  const [loading,setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
    const loadProposals = async()=>{
        try{
            const response = await getAllProposals();
            if(response.data.success){
                setProposals(response.data.proposals);
            }
        }catch(error){
            console.log(error);

        }finally{
            setLoading(false);
        }
    }
    loadProposals();
  },[]);
  const filteredProposals = useMemo(() => {
    return proposals.filter((proposal) => {
      const matchesSearch =
        proposal.job_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.freelancer_name.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || proposal.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [proposals,searchTerm, statusFilter]);
   if(loading){
    return(
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-3xl font-bold">
                Loading Proposals...
            </h1>
        </div>
    );
  }
  const handleDelete = async(id)=>{
    const confirmDelete = window.confirm(
        "Delete this proposal?"
    );
    if(!confirmDelete){
        return;
    }
    try{
        const response = await deleteProposal(id);
        alert(response.data.message);
        setProposals(
            proposals.filter(
                proposal=>proposal.id!==id
            )
        );
    }catch(error){
        console.log(error);
    }
  }
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Manage Proposals
          </h1>
          <p className="mt-2 text-gray-600">
            Review all proposals submitted by freelancers.
          </p>
          <button onClick={() => navigate("/admin/dashboard")} className="mb-6 rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100">
            ← Back to Dashboard
          </button>
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by job title or freelancer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div className="md:w-56">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {filteredProposals.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 py-16 text-center text-gray-500 shadow-sm">
            No proposals found.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {proposal.job_title}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      {proposal.freelancer_name}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ${
                      statusClasses[proposal.status]
                    }`}
                  >
                    {proposal.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-2xl bg-gray-50 p-3">
                    <p className="text-gray-500">Bid Amount</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      ₹{Number(proposal.bid_amount).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-3">
                    <p className="text-gray-500">Estimated Days</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {proposal.estimated_days} Days
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-3">
                    <p className="text-gray-500">Proposal Date</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {proposal.created_at?.split("T")[0]}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-gray-50 p-3">
                    <p className="text-gray-500">Status</p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {proposal.status}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm text-gray-600">
                    {proposal.proposal_text.length > 120
                      ? `${proposal.proposal_text.slice(0, 120)}...`
                      : proposal.proposal_text}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button onClick={()=>alert(proposal.proposal_text)} className="flex-1 rounded-2xl bg-[#2563EB] px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-blue-700">
                    View Proposal
                  </button>
                  <button onClick = {()=>handleDelete(proposal.id)} className="flex-1 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition duration-300 hover:bg-red-100">
                    Delete Proposal
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}