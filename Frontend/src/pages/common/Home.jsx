import { useState,useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
import { getFeaturedFreelancers,getCategories,getFeaturedJobs,getHomeStats,getTestimonials } from '../../services/homeServices';
import {
  Menu,
  X,
  Search,
  MapPin,
  Briefcase,
  Star,
  Users,
  Code,
  Pencil,
  Palette,
  Camera,
  BarChart3,
  ChevronDown
} from 'lucide-react';
import {
FaGithub,
FaLinkedin,
FaInstagram,
FaEnvelope
} from "react-icons/fa";

export default function SkillSphereLanding() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [keyword,setKeyword]=useState("");
  const [category,setCategory]=useState("");
  const [location,setLocation]=useState("");
  const [loading,setLoading] = useState(true);
  const [showMenu,setShowMenu] = useState(false);
  const [testimonials,setTestimonials] = useState([]);
  const [stats,setStats] = useState({
    freelancers:0,
    clients:0,
    jobs:0,
    completedProjects:0
  });
  const user = JSON.parse(localStorage.getItem("user"));
  const handleQuickLink = (type) => {

    // User not logged in
    if (!user) {
        navigate("/login");
        return;
    }
    switch (type) {
        case "jobs":
            if (user.role === "freelancer") {
                navigate("/freelancer/jobs");
            } else {
                navigate("/client/post-job");
            }
            break;
        case "become":
            if (user.role === "freelancer") {
                navigate("/freelancer/dashboard");
            } else {
                navigate("/register");
            }
            break;
        case "pricing":
            navigate("/");
            break;
        default:
            navigate("/");
    }
  };
  useEffect(() => {
    let ignore = false;
    async function loadHomeData(){
        try{
            const jobsResponse =
            await getFeaturedJobs();
            const categoryResponse =
            await getCategories();
            const freelancerResponse =
            await getFeaturedFreelancers();
            const statsResponse = await getHomeStats();
            const testimonialResponse = await getTestimonials();
            if(!ignore){
                setJobs(jobsResponse.data.jobs);
                setCategories(categoryResponse.data.categories);
                setFreelancers(freelancerResponse.data.freelancers);
                setStats(statsResponse.data);
                setTestimonials(testimonialResponse.data.testimonials);
            }
        }
        catch(error){
            console.log(error);
        }finally{
          setLoading(false);
        }
    }
    loadHomeData();
    return ()=>{
        ignore=true;
    };
  },[]);
  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
  }, []);
  if(loading){
    return(
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold">Loading...</h1>
    </div>
    );
  }
  const steps = [
    { number: 1, title: 'Post Your Job', description: 'Describe your project and requirements' },
    { number: 2, title: 'Receive Proposals', description: 'Get proposals from qualified freelancers' },
    { number: 3, title: 'Hire & Chat', description: 'Choose the best fit and start collaborating' },
    { number: 4, title: 'Complete & Pay', description: 'Release payment after project completion' },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* Navbar */}
      <nav
        className={`fixed w-full top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg'
            : 'bg-linear-to-b from-blue-50 to-white'
        }`}
      >
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
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
                Contact
              </Link>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {!user ? (
                <>
                <button onClick={() => navigate("/login")} className="px-6 py-2 text-blue-600 font-medium hover:cursor: pointer-none:text-blue-700 transition">
                  Login
                </button>
                <button onClick={() => navigate("/register")} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  Register
                </button>
                </>
                ) : (
                <div className="relative">
                  <button onClick={() => setShowMenu(!showMenu)} className="h-11 w-11 rounded-full bg-blue-600 text-white font-bold">
                    {user.full_name.split(" ").map(word=>word[0]).join("").toUpperCase()}
                  </button>
                {showMenu && (
                  <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white shadow-xl border">
                    <div className="border-b p-4">
                      <h3 className="font-semibold">{user.full_name}</h3>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <button className="w-full px-4 py-3 text-left hover:bg-gray-100" onClick={() => {
                      if(user.role==="freelancer"){
                        navigate("/freelancer/dashboard");
                      }else if(user.role==="client"){
                        navigate("/client/dashboard");
                      }else{
                        navigate("/admin/dashboard");
                      }
                      setShowMenu(false);
                      }}>Dashboard
                      </button>
                      <button className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        navigate("/");
                        window.location.reload();
                      }}>Logout
                      </button>
                    </div>)}
                    </div>
                  )}
                  </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-blue-600"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-gray-200">
              <a href="#home" className="block px-4 py-2 text-gray-700 hover:text-blue-600">
                Home
              </a>
              <Link href="/about" className="block px-4 py-2 text-gray-700 hover:text-blue-600">
                About
              </Link>
              <a href="#contact" className="block px-4 py-2 text-gray-700 hover:text-blue-600">
                Contact
              </a>
              <div className="px-4 py-3 border-t border-gray-200">
                {!user ? (
                  <div className="flex gap-2">
                    <button onClick={()=>navigate("/login")} className="flex-1 border border-blue-600 rounded-lg py-2 text-blue-600">
                      Login
                    </button>
                    <button onClick={()=>navigate("/register")} className="flex-1 rounded-lg bg-blue-600 py-2 text-white">
                      Register
                    </button>
                  </div>):(
                    <div className="space-y-2">
                      <div className="font-semibold">
                        {user.full_name}
                      </div>
                      <button className="w-full rounded-lg border py-2" 
                        onClick={()=>{
                          if(user.role==="freelancer"){
                            navigate("/freelancer/dashboard");
                          }else if(user.role==="client"){
                            navigate("/client/dashboard");
                          }else{
                            navigate("/admin/dashboard");
                          }
                          }}>
                          Dashboard
                      </button>
                      <button className="w-full rounded-lg bg-red-500 py-2 text-white" 
                        onClick={()=>{
                          localStorage.removeItem("token");
                          localStorage.removeItem("user");
                          navigate("/");
                          window.location.reload();
                        }}>
                          Logout
                      </button>
                      </div>
                    )}
                  </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 bg-linear-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-20 -mr-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full opacity-40"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Hire the Best Freelancers for Every Project
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Connect with top-rated professionals across web development, design, marketing, and more. Scale your team, complete your projects on time and on budget.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden lg:flex justify-center">
              <div className="relative w-full max-w-md h-96 bg-linear-to-br from-blue-400 to-blue-600 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center">
                  <Users size={120} className="text-white mx-auto mb-4 opacity-90" />
                  <p className="text-white text-lg font-semibold">Premium Talent Network</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Search Card */}
      <section className="relative -mt-16 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Find Your Next Project</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="text"
                  value={keyword}
                  onChange={(e)=>setKeyword(e.target.value)}
                  placeholder="Enter keyword"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Category Dropdown */}
              <div className="relative">
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">All Categories</option>
                    {
                    categories.map((cat)=>(
                    <option key={cat.category} value={cat.category}>{cat.category}</option>
                    ))
                    }
                </select>
                <ChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={20} />
              </div>

              {/* Location Input */}
              <div className="relative">
                <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                <input
                  type="text"
                  value={location}
                  onChange={(e)=>setLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>

              {/* Search Button */}
              <button onClick={()=>{
                if (!user) {
                  alert("Please login to search jobs.");
                  navigate("/login");
                  return;
                }
                const query = new URLSearchParams();
                if(keyword) query.append("keyword", keyword);
                if(category) query.append("category", category);
                if(location) query.append("location", location);
                if (user.role === "freelancer") {
                  navigate(`/freelancer/jobs?${query.toString()}`);
                } else {
                  alert("Only freelancers can search jobs.");
                }
                }}className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:shadow-lg transition">
                Search Jobs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section id="categories" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600">Browse through thousands of projects in your field of expertise</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => {
              const icons = {
                "Web Development": Code,
                "UI/UX Design": Palette,
                "Content Writing": Pencil,
                "Photography": Camera,
                "Marketing": BarChart3,
              };
              const IconComponent = icons[cat.category] || Briefcase;
              return (
                <div
                  key={cat.category}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-14 h-14 bg-linear-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <IconComponent className="text-blue-600" size={28} />
                    </div>
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                      {cat.total_jobs.toLocaleString()} jobs
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{cat.category}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section id="jobs" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
            <p className="text-xl text-gray-600">Latest opportunities from top companies</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.length===0?
            <div className="col-span-full text-center text-gray-500">No Jobs Available</div>:
            jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-600">{job.full_name}</p>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Budget</span>
                    <span className="font-bold text-blue-600">₹{Number(job.budget).toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Category</span>
                    <span className="text-sm font-medium text-gray-900">{job.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Location</span>
                    <span className="text-sm font-medium text-gray-900">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Deadline</span>
                    <span className="text-sm font-medium text-orange-600">{job.deadline?.split("T")[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Freelancers */}
      <section id="freelancers" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Top Freelancers</h2>
            <p className="text-xl text-gray-600">Connect with the most skilled professionals on our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {freelancers.length===0?
            <div className="col-span-full text-center">No Freelancers Found</div>:
            freelancers.map((freelancer) => (
              <div
                key={freelancer.id}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 text-center group"
              >
                <div className="mb-6">
                  <img
                    src={`https://ui-avatars.com/api/?background=2563eb&color=fff&name=${freelancer.full_name}`}
                    alt={freelancer.full_name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 group-hover:scale-110 transition"
                  />
                  <h3 className="text-lg font-bold text-gray-900">{freelancer.full_name}</h3>
                  <p className="text-sm text-gray-600 mb-4">FreeLancer</p>
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(freelancer.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      5 (0 reviews)
                    </span>
                  </div>
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      Available for Work
                      </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How SkillSphere Works */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How SkillSphere Works</h2>
            <p className="text-xl text-gray-600">Four simple steps to get your project started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                {/* Connector Line */}
                {step.number < 4 && (
                  <div className="hidden lg:block absolute top-20 -right-4 w-8 h-1 bg-linear-to-r from-blue-600 to-transparent"></div>
                )}

                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition border border-gray-100 h-full">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-2xl font-bold text-white">{step.number}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 text-center mb-2">{step.title}</h3>
                  <p className="text-center text-gray-600 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">
          <h2 className="text-5xl font-extrabold text-white">
          {stats.freelancers}
          </h2>
          <p className="mt-3 text-blue-100 font-medium">
          Registered Freelancers
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">
        <h2 className="text-5xl font-extrabold text-white">
          {stats.clients}
        </h2>
        <p className="mt-3 text-blue-100 font-medium">
          Registered Clients
        </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">
        <h2 className="text-5xl font-extrabold text-white">
          {stats.jobs}
        </h2>
        <p className="mt-3 text-blue-100 font-medium">
          Jobs Posted
        </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-lg hover:scale-105 transition duration-300">
        <h2 className="text-5xl font-extrabold text-white">
          {stats.completedProjects}
        </h2>
        <p className="mt-3 text-blue-100 font-medium">
          Completed Projects
        </p>
        </div>
      </div>
      </div>
     </section>
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {testimonials.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold">No Reviews Yet</h2>
            <p className="text-gray-500 mt-3">Testimonials will appear here after successful projects.</p>
          </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">
                    {testimonial.full_name}
                  </h3>
                <span className="text-yellow-500 font-semibold">
                  ⭐ {testimonial.rating}
                </span>
                </div>
              <p className="text-gray-600">"{testimonial.review}"</p>
              </div>
            ))}
          </div>
        )}
        </div>
      </section>
      {/* CTA Section */}
      <section id="cta" className="py-20 bg-linear-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of professionals and businesses on SkillSphere today.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="font-bold text-white text-lg">SkillSphere</span>
              </div>
              <p className="text-sm text-gray-400">
                SkillSphere is a modern freelancer marketplace that connects talented professionals with businesses worldwide. Post projects, hire skilled freelancers, collaborate in real-time, and complete projects securely.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button onClick={() => navigate("/")} className="hover:text-white transition">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/about")} className="hover:text-white transition">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate("/contact")} className="hover:text-white transition">
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => handleQuickLink("jobs")} className="hover:text-white transition">
                    Browse Jobs
                  </button>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-white mb-4">
                Popular Categories
                </h4>
                <ul className="space-y-3 text-sm">
                  {categories.slice(0,6).map((category)=>(
                    <li key={category.category}>
                    <button className="hover:text-white transition"
                    onClick={()=>{
                      if(!user){
                        navigate("/login");
                        return;
                      }
                      if(user.role==="freelancer"){
                        navigate(`/freelancer/jobs?category=${encodeURIComponent(category.category)}`);
                      }else{
                        navigate("/client/post-job");
                      }
                    }}>
                      {category.category}
                    </button>
                  </li>
                  ))}
                </ul>
            </div>
            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: support@skillsphere.com</li>
                <li>Phone: 8885489886</li>
                <li>Address: IIIT SRICITY,Chitoor District,517646</li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="font-bold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="https://github.com/Komalmathamsetti" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                <FaGithub/>
                </a>
                <a href="https://www.linkedin.com/in/komal-mathamsetti/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                <FaLinkedin/>
                </a>
                <a href="mailto:support@skillsphere.com" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                  <FaEnvelope/>
                </a>
                <a href="https://instagram.com/YOUR_USERNAME" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                <FaInstagram/>
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <p>&copy; {new Date().getFullYear()} SkillSphere. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link to="/privacy" className="hover:text-white transition">
                Privacy Policy
                </Link>
                <Link to="/terms-conditions" className="hover:text-white transition">
                Terms & Conditions
                </Link>
                <Link to="/faq" className="hover:text-white transition">
                FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
