import { BrowserRouter, Routes, Route } from "react-router-dom";
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
function App() {
return (
<BrowserRouter>
<Routes>
<Route path="/" element={<Login />} />
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
  path="/freelancer/jobs"
  element={<BrowseJobs />}
/>
<Route 
  path="/freelancer/jobs/:id"
  element={<JobDetails/>}
/>
</Routes>
</BrowserRouter>
);
}
export default App;