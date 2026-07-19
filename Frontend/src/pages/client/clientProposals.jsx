import { useMemo, useState,useEffect } from "react";
import { getClientProposals } from "../../services/proposalServices";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export default function ClientProposals() {
  const navigate = useNavigate();

  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  useEffect(() => {
    const loadProposals = async () => {
        try {
            const response = await getClientProposals();

            if(response.data.success){
                setProposals(response.data.proposals);
            }
        } catch(error){
          toast.error(error.response?.data?.message || "Unable to load proposals");
        } finally{
            setLoading(false);
        }
    };
    loadProposals();
  }, []);
  const filteredProposals = useMemo(() => {
    return proposals.filter((proposal) => {
      const freelancerName = proposal?.full_name || "";
      const jobTitle = proposal?.title || "";
      const status = proposal?.status || "";

      const matchesSearch =
        freelancerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jobTitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [proposals, searchTerm, statusFilter]);

  const getStatusStyles = (status) => {
    switch ((status || "").toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const statCards = [
    {
      label: "Total Proposals",
      value: proposals.length,
    },
    {
      label: "Pending",
      value: proposals.filter((p) => (p?.status || "").toLowerCase() === "pending").length,
    },
    {
      label: "Accepted",
      value: proposals.filter((p) => (p?.status || "").toLowerCase() === "accepted").length,
    },
    {
      label: "Rejected",
      value: proposals.filter((p) => (p?.status || "").toLowerCase() === "rejected").length,
    },
  ];

  const openProposalModal = (proposal) => {
    setSelectedProposal(proposal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProposal(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="rounded-3xl bg-white shadow-lg border border-slate-100 px-8 py-6 text-slate-700 text-lg font-medium">
          Loading Proposals...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="rounded-3xl bg-white shadow-sm border border-slate-100 p-6 sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <button
                onClick={() => navigate("/client/dashboard")}
                className="mb-4 inline-flex items-center rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 transition"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Client Proposals
              </h1>
              <p className="mt-2 text-slate-500">
                Review all proposals submitted by freelancers for your posted jobs.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="rounded-3xl bg-white shadow-sm border border-slate-100 p-6"
            >
              <div className="h-1 w-14 rounded-full bg-blue-600 mb-4" />
              <div className="text-3xl font-bold text-slate-900">{card.value}</div>
              <div className="mt-1 text-sm font-medium text-slate-500">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="rounded-3xl bg-white shadow-sm border border-slate-100 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Search by Freelancer Name or Job Title
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search proposals..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status Filter
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Accepted</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredProposals.length === 0 ? (
          <div className="rounded-3xl bg-white shadow-sm border border-slate-100 p-10 text-center text-slate-600">
            No proposals found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProposals.map((proposal) => (
              <div
                key={proposal.id}
                className="rounded-3xl bg-white shadow-sm border border-slate-100 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {proposal.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {proposal.full_name}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyles(
                        proposal.status
                      )}`}
                    >
                      {proposal.status}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Budget</p>
                      <p className="font-medium text-slate-900">₹{Number(proposal.budget).toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Bid Amount</p>
                      <p className="font-medium text-slate-900">₹{Number(proposal.bid_amount).toLocaleString("en-IN")}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Estimated Days</p>
                      <p className="font-medium text-slate-900">{proposal.estimated_days}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Proposal Date</p>
                      <p className="font-medium text-slate-900">{proposal.created_at?.split("T")[0]}</p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <p className="text-sm text-slate-500 mb-2">Proposal Text</p>
                    <p className="text-sm text-slate-700 leading-6">
                      {(proposal.proposal_text || "").length > 120
                        ? `${proposal.proposal_text.slice(0, 120)}...`
                        : proposal.proposal_text}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openProposalModal(proposal)}
                    className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
                  >
                    View Proposal
                  </button>
                  <button
                    onClick={() => navigate(`/client/jobs/${proposal.job_id}`)}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    View Job
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedProposal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">Proposal Details</h2>
                <p className="text-sm text-slate-500">{selectedProposal.title}</p>
              </div>
              <button
                onClick={closeModal}
                className="rounded-xl px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                ✕
              </button>
            </div>

            <div className="px-6 py-5">
              <div className="mb-4">
                <p className="text-sm text-slate-500">Freelancer</p>
                <p className="font-medium text-slate-900">{selectedProposal.full_name}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-slate-500 mb-2">Full Proposal Text</p>
                <div className="max-h-72 overflow-y-auto rounded-2xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-slate-700 leading-7 whitespace-pre-wrap">
                    {selectedProposal.proposal_text}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">Budget</p>
                  <p className="font-medium text-slate-900">₹{Number(selectedProposal.budget).toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-slate-500">Bid Amount</p>
                  <p className="font-medium text-slate-900">₹{Number(selectedProposal.bid_amount).toLocaleString("en-IN")}</p>
                </div>
                <div>
                  <p className="text-slate-500">Estimated Days</p>
                  <p className="font-medium text-slate-900">{selectedProposal.estimated_days} Days</p>
                </div>
                <div>
                  <p className="text-slate-500">Proposal Date</p>
                  <p className="font-medium text-slate-900">{selectedProposal.created_at?.split("T")[0]}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 px-6 py-4 flex justify-end">
              <button
                onClick={closeModal}
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}