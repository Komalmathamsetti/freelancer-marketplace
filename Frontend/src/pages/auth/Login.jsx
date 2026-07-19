import { useState } from "react";
import { loginUser } from "../../services/loginService";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await loginUser(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
      toast.success(`Welcome back, ${response.data.user.full_name}!`);
      const role = response.data.user.role;

      if (role === "client") {
        navigate("/client/dashboard");
      } else if (role === "freelancer") {
        navigate("/freelancer/dashboard");
      } else {
        navigate("/admin/dashboard");
      }

    } catch (error) {

      toast.error(error.response?.data?.message || "Login Failed");

    }

  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="shrink-0 flex items-center gap-2">
              <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span onClick={()=>navigate("/")} className="font-bold text-xl text-gray-900 hidden sm:inline">
                SkillSphere
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                Home
              </Link>
            </div>
          </div>
        </div>
          <div className="bg-blue-600 px-8 py-10 text-center">
            <h1 className="text-3xl font-bold text-white">
              Freelancer Marketplace
            </h1>

            <p className="text-blue-100 mt-2">
              Sign in to continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="px-8 py-8 space-y-5"
          >

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />

            </div>

            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-600">

                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                />

                Remember Me

              </label>

              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Forgot Password
              </a>

            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition shadow-lg shadow-blue-200"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-600">

              Don't have an account?

              <a
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-semibold ml-2"
              >
                Register
              </a>

            </p>

          </form>

        </div>

      </div>
    </div>
  );
}