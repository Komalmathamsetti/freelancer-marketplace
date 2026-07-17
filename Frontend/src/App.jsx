import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./pages/common/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import FreelancerDashboard from "./pages/freelancer/freelancerDashboard";
import ClientDashboard from "./pages/client/clientDashboard";
import AdminDashboard from "./pages/admin/adminDashboard";
import EditClientProfile from "./pages/client/editClientProfile";
import EditFreelancerProfile from "./pages/freelancer/editFreelancerProfile";
import PostJob from "./pages/client/PostJob";
import JobDetails from "./pages/freelancer/JobDetails";
import BrowseJobs from "./pages/freelancer/BrowseJobs";
import MyApplications from "./pages/freelancer/MyApplications";
import ViewApplicants from "./pages/client/viewApplicants";
import MyJobs from "./pages/client/MyJobs";
import EditJob from "./pages/client/EditJob";
import ManageUsers from "./pages/admin/manageUsers";
import ManageJobs from "./pages/admin/manageJobs";
import SavedJobs from "./pages/freelancer/savedJobs";
import ManageProposals from "./pages/admin/managaeProposals";
import ReportsAnalyticsPage from "./pages/admin/reports";
import ClientProposals from "./pages/client/clientProposals";
import ClientJobDetails from "./pages/client/clientJobDetails";
import MessagingModule from "./pages/common/Messages";
import About from "./pages/common/About";
import ContactUsPage from "./pages/common/ContactUs";
import FAQPage from "./pages/common/FAQ";
import TermsAndConditions from "./pages/common/TermsAndConditions";
import PrivacyPolicy from "./pages/common/PrivacyPolicy";
function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/about" element={<About />}/>
<Route path="/contact" element={<ContactUsPage />} />
<Route path="/faq" element={<FAQPage/>} />
<Route path="/privacy" element={<PrivacyPolicy/>} />
<Route path="/terms-conditions" element={<TermsAndConditions/>}/>
<Route
path="/freelancer/dashboard"
element={<FreelancerDashboard />}
/>
<Route
path="/client/dashboard"
element={<ClientDashboard />}
/>
<Route
path="/admin/dashboard"
element={<AdminDashboard />}
/>
<Route
  path="/freelancer/profile/edit"
  element={<EditFreelancerProfile />}
/>
<Route
  path="/client/profile/edit"
  element={<EditClientProfile />}
/>
<Route 
  path="/client/post-job"
  element={<PostJob />}
/>
<Route 
  path="/client/my-jobs"
  element={<MyJobs/>}
/>
<Route 
  path="/client/edit-job/:id"
  element={<EditJob/>}
/>
<Route 
  path="/client/proposals"
  element={<ClientProposals/>}
/>
<Route
    path="/client/jobs/:id"
    element={<ClientJobDetails />}
/>
<Route
    path="/messages/:userId?"
    element={<MessagingModule />}
/>
<Route 
  path="/admin/users"
  element={<ManageUsers/>}
/>
<Route 
  path="/admin/jobs"
  element={<ManageJobs/>}
/>
<Route 
  path="/admin/proposals"
  element={<ManageProposals/>}
/>
<Route
    path="/admin/reports"
    element={<ReportsAnalyticsPage/>}
/>
<Route 
  path="/freelancer/jobs"
  element={<BrowseJobs />}
/>
<Route 
  path="/freelancer/my-applications"
  element={<MyApplications />}
/>
<Route 
  path="/freelancer/saved-jobs"
  element={<SavedJobs/>}
/>
<Route
  path="/client/applicants/:jobId"
  element={<ViewApplicants />}
/>
<Route 
  path="/freelancer/jobs/:id"
  element={<JobDetails/>}
/>
<Route
  path="/jobs/:id"
  element={<JobDetails />}
/>
</Routes>
</BrowserRouter>
);
}
export default App;