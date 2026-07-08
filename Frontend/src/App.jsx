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
function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
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
  path="/admin/users"
  element={<ManageUsers/>}
/>
<Route 
  path="/admin/jobs"
  element={<ManageJobs/>}
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