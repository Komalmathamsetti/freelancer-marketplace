import API from "./api";

// Apply for a Job
export const applyJob = (jobId, data) => {
  return API.post(`/proposals/apply/${jobId}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// My Applications
export const getMyApplications = () => {
  return API.get("/proposals/my-applications", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// View Applicants (Client)
export const getApplicants = (jobId) => {
  return API.get(`/proposals/applicants/${jobId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// Accept Proposal
export const acceptProposal = (proposalId) => {
  return API.put(`/proposals/accept/${proposalId}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

// Reject Proposal
export const rejectProposal = (proposalId) => {
  return API.put(`/proposals/reject/${proposalId}`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const withdrawApplication = (proposalId) => {
    return API.delete(`/proposals/${proposalId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};
export const checkApplication = (jobId) => {
    return API.get(`/proposals/check/${jobId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};
export const getClientProposals = () => {
    return API.get("/proposals/client", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
};