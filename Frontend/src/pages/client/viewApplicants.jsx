import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
Clock3,
DollarSign,
Award,
Star,
Eye,
CheckCircle2,
XCircle
} from "lucide-react";

import {
getApplicants,
acceptProposal,
rejectProposal
} from "../../services/proposalServices";

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

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

export default function ApplicantsPage() {
    const { jobId } = useParams();
    const [applicants,setApplicants]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(() => {
    const fetchApplicants = async () => {
        try {
            const response = await getApplicants(jobId);

            if (response.data.success) {
                setApplicants(response.data.applicants);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    fetchApplicants();
    }, [jobId]);
    const handleAccept = async (id) => {
    try {
        await acceptProposal(id);
        const response = await getApplicants(jobId);
        if (response.data.success) {
            setApplicants(response.data.applicants);
        }
        alert("Proposal Accepted");
    } catch (error) {
        console.log(error);
    }
  };
  const handleReject = async (id) => {
    try {
        await rejectProposal(id);
        const response = await getApplicants(jobId);
        if (response.data.success) {
            setApplicants(response.data.applicants);
        }
        alert("Proposal Rejected");
    } catch (error) {
        console.log(error);
    }
  };
  if(loading){
    return(
    <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">Loading Applicants...</h1>
    </div>
    );
  }
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">Freelancer Marketplace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Applicants</h1>
          <p className="mt-3 text-slate-500">Review freelancer proposals for this job.</p>
        </div>

        <div className="grid gap-6">
          {applicants.map((applicant, index) => (
            <div
              key={index}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex flex-col gap-5 sm:flex-row">
                  <img
                    src={applicant.photo}
                    alt={applicant.freelancerName}
                    className="h-24 w-24 rounded-3xl object-cover ring-4 ring-blue-50"
                  />

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">{applicant.full_name}</h2>
                      <p className="mt-1 text-sm text-slate-500">FreeLancer</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">Proposal Submitted</span>
                    </div>

                    <p className="max-w-3xl text-sm leading-6 text-slate-600">{applicant.proposal_text}</p>

                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      <InfoItem icon={DollarSign} label="Bid Amount" value={`₹${Number(applicant.bid_amount).toLocaleString("en-IN")}`} />
                      <InfoItem icon={Clock3} label="Estimated Completion Time" value={`${applicant.estimated_days} Days`} />
                      <div className="rounded-2xl bg-slate-50 p-4">
                        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                          <Star className="h-4 w-4" />
                          Rating
                        </div>
                        <div className="mt-2">
                          <StarRating rating={5} />
                        </div>
                      </div>
                      <InfoItem
                        icon={Award}
                        label="Completed Projects"
                        value={0}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-4 lg:items-end">
                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    Submitted: {applicant.created_at?.split("T")[0]}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                      <Eye className="h-4 w-4" />
                      View Profile
                    </button>
                     {applicant.status === "Pending" ? (
                    <>
                      <button onClick={() => handleAccept(applicant.id)} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />Accept Proposal
                      </button>
                      <button onClick={() => handleReject(applicant.id)} className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">
                        <XCircle className="h-4 w-4" />Reject Proposal
                      </button>
                    </>
                    ) : applicant.status === "Accepted" ? (
                    <button disabled className="rounded-2xl bg-green-600 px-5 py-3 font-semibold text-white cursor-not-allowed">✓ Accepted</button>
                    ) : (
                    <button disabled className="rounded-2xl bg-red-600 px-5 py-3 font-semibold text-white cursor-not-allowed">✕ Rejected</button>
                  )}
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