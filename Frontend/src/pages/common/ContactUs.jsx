import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Linkedin,
  Github,
  Twitter,
  Instagram,
  Facebook,
  Headphones,
  Code2,
  BriefcaseBusiness,
  ChevronDown,
  Sparkles,
} from "lucide-react";

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
  { icon: Linkedin, name: "LinkedIn" },
  { icon: Github, name: "GitHub" },
  { icon: Twitter, name: "Twitter" },
  { icon: Instagram, name: "Instagram" },
  { icon: Facebook, name: "Facebook" },
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

  return (
    <div className="min-h-screen overflow-hidden bg-linear-to-b from-blue-50 via-white to-blue-100 text-slate-900">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-300 blur-3xl" />
        <div className="absolute top-40 right-20 h-104 w-104 rounded-full bg-blue-200 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-white blur-3xl" />
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
          {/* Form */}
          <div className="rounded-3xl border border-white/70 bg-white/50 p-6 shadow-xl backdrop-blur-xl sm:p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
                Contact Form
              </p>
              <h2 className="mt-2 text-3xl font-bold">Send us a message</h2>
            </div>

            <form className="space-y-5">
              {[
                { id: "name", label: "Full Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "subject", label: "Subject", type: "text" },
              ].map((field) => (
                <div key={field.id} className="relative">
                  <input
                    id={field.id}
                    type={field.type}
                    placeholder=" "
                    className="peer w-full rounded-2xl border border-blue-100 bg-white/80 px-4 py-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                  />
                  <label
                    htmlFor={field.id}
                    className="pointer-events-none absolute left-4 top-4 text-slate-500 transition-all duration-200 peer-focus:-top-2 peer-focus:left-3 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-blue-700 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500"
                  >
                    {field.label}
                  </label>
                </div>
              ))}

              <div className="relative">
                <textarea
                  id="message"
                  rows="6"
                  placeholder=" "
                  className="peer w-full rounded-2xl border border-blue-100 bg-white/80 px-4 py-4 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-200"
                />
                <label
                  htmlFor="message"
                  className="pointer-events-none absolute left-4 top-4 text-slate-500 transition-all duration-200 peer-focus:-top-2 peer-focus:left-3 peer-focus:bg-white peer-focus:px-2 peer-focus:text-xs peer-focus:text-blue-700 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500"
                >
                  Message
                </label>
              </div>

              <button
                type="button"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/40"
              >
                Send Message
                <Send className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>
          </div>

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