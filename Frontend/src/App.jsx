import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import FreelancerDashboard from "./pages/freelancer/freelancerDashboard";
import ClientDashboard from "./pages/client/clientDashboard";
import AdminDashboard from "./pages/admin/adminDashboard";
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
</Routes>
</BrowserRouter>
);
}
export default App;