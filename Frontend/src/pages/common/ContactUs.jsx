import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Headphones,
  Code2,
  BriefcaseBusiness,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import {
  FaLinkedin,
  FaGithub,
  FaInstagram
} from "react-icons/fa";
const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    lines: ["support@skillsphere.com"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+91 8885489886"],
  },
  {
    icon: MapPin,
    title: "Address",
    lines: ["IIIT Sri City", "Chittoor District", "Andhra Pradesh", "517646"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    lines: ["Monday-Friday", "9 AM - 6 PM"],
  },
];

const faqs = [
  {
    q: "How do I hire a freelancer?",
    a: "Browse freelancer profiles, compare skills and ratings, then send a job invitation or post your project to get started.",
  },
  {
    q: "How do I become a freelancer?",
    a: "Create your profile, add your skills and portfolio, then start applying to projects that match your expertise.",
  },
  {
    q: "How are payments handled?",
    a: "Payments are securely managed through the platform to help protect both clients and freelancers during collaboration.",
  },
  {
    q: "Is SkillSphere secure?",
    a: "Yes. SkillSphere uses secure platform practices, protected messaging, and safe payment workflows.",
  },
  {
    q: "How can I contact support?",
    a: "Use the contact form on this page or reach out through the support email and phone number listed above.",
  },
];

const socialLinks = [
  { icon: FaLinkedin, name: "LinkedIn" },
  { icon: FaGithub, name: "GitHub" },
  { icon: FaInstagram, name: "Instagram" },
];

const supportCards = [
  {
    icon: Headphones,
    title: "Customer Support",
    desc: "Get help with account access, hiring, and general platform questions.",
  },
  {
    icon: Code2,
    title: "Technical Support",
    desc: "Need help with a bug, issue, or platform behavior? Our tech team is ready.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business Partnerships",
    desc: "Reach out for collaborations, enterprise needs, or growth opportunities.",
  },
];

function AccordionItem({ item, isOpen, onClick }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/50 backdrop-blur-xl shadow-lg overflow-hidden">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-blue-50/60"
      >
        <span className="font-semibold text-slate-900">{item.q}</span>
        <ChevronDown
          className={`h-5 w-5 text-blue-700 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-7 text-slate-600">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function ContactUsPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen overflow-hidden bg-linear-to-b from-blue-50 via-white to-blue-100 text-slate-900">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-300 blur-3xl" />
        <div className="absolute top-40 right-20 h-104 w-104 rounded-full bg-blue-200 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-white blur-3xl" />
      </div>
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
              <Link to="/contact" className="text-blue-700 hover:text-gray-600 transition">
                Contact
              </Link>
            </div>
          </div>
          </div>
      <main className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Hero */}
        <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/30 shadow-2xl backdrop-blur-xl">
          <div className="bg-linear-to-r from-blue-600/10 via-transparent to-blue-400/10">
            <div className="px-6 py-16 text-center sm:px-10 lg:px-16 lg:py-24">
              <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                SkillSphere Support
              </div>

              <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                We'd Love to Hear From You
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
                Our team is always ready to help you with hiring, freelancing, or any platform-related queries.
              </p>
            </div>
          </div>
        </section>

        {/* Contact info */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Contact Information
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Reach us through any of these channels
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/70 bg-white/50 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="inline-flex rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 p-3 text-white shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <div className="mt-3 space-y-1 text-slate-600">
                    {item.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Form + FAQ */}
        <section className="mt-20 grid gap-8 lg:grid-cols-2">
          

          {/* FAQ */}
          <div className="rounded-3xl border border-white/70 bg-white/50 p-6 shadow-xl backdrop-blur-xl sm:p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Frequently Asked Questions
              </p>
              <h2 className="mt-2 text-3xl font-bold">Quick answers</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((item, index) => (
                <AccordionItem
                  key={item.q}
                  item={item}
                  isOpen={openFaq === index}
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Follow us */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Follow Us
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Stay connected across platforms
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href="#"
                  className="group rounded-3xl border border-white/70 bg-white/50 p-5 text-center shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="mx-auto inline-flex rounded-2xl bg-blue-600/10 p-3 text-blue-700 transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-4 font-semibold">{item.name}</p>
                </a>
              );
            })}
          </div>
        </section>

        {/* Map */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Map Section
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Find us on the map
            </h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/70 bg-white/50 shadow-xl backdrop-blur-xl">
            <div className="relative h-105 w-full bg-linear-to-br from-blue-100 to-white">
              {/* Replace src with your preferred Google Maps embed URL */}
              <iframe
                title="SkillSphere Location"
                src="https://www.google.com/maps?q=IIIT%20Sri%20City%20Chittoor%20District%20Andhra%20Pradesh%20517646&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-blue-900/10 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* Support cards */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Support Cards
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              We’re here to help
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {supportCards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/70 bg-white/50 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="inline-flex rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 p-3 text-white shadow-md">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-20 mb-8">
          <div className="rounded-3xl border border-blue-100 bg-linear-to-r from-slate-900 via-blue-900 to-blue-700 px-6 py-14 text-center text-white shadow-2xl sm:px-10">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Let's Build Something Amazing Together
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Whether you're hiring talent or offering your expertise, SkillSphere is ready to support your next move.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="#"
                className="rounded-full bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
              >
                Contact Support
              </a>
              <a
                href="#"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Join SkillSphere
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}