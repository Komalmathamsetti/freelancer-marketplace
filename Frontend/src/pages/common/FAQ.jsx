import { useState } from "react";
import {Link} from "react-router-dom";
// ─── Data ──────────────────────────────────────────────────────────────────────
const faqSections = [
  {
    id: "general",
    icon: "🌐",
    title: "General Questions",
    items: [
      {
        q: "What is SkillSphere?",
        a: "SkillSphere is a professional freelancer marketplace that connects talented independent professionals with clients looking for quality work. From design and development to writing, marketing, and beyond, SkillSphere makes collaboration simple, transparent, and secure.",
      },
      {
        q: "How does SkillSphere work?",
        a: "Clients post projects describing their needs and budget. Freelancers browse listings and submit proposals. Once a client selects a freelancer, work begins under a structured milestone system. Payments are held securely in escrow and released upon milestone approval, keeping both sides protected throughout the project.",
      },
      {
        q: "Is SkillSphere free to join?",
        a: "Yes, creating an account is completely free for both clients and freelancers. SkillSphere earns a small service fee only when a project is successfully completed, so you only pay when real value is delivered.",
      },
    ],
  },
  {
    id: "clients",
    icon: "💼",
    title: "For Clients",
    items: [
      {
        q: "How do I post a job?",
        a: "After signing in, click Post a Job from your dashboard. Describe the project scope, required skills, timeline, and your budget. The more detail you provide, the better the proposals you will receive. Your listing goes live immediately and starts attracting qualified freelancers.",
      },
      {
        q: "How do I hire a freelancer?",
        a: "Review the proposals you receive, check each freelancer's portfolio, ratings, and reviews, then message shortlisted candidates directly. When you've found the right fit, click Hire on their proposal to get the project started.",
      },
      {
        q: "How are payments handled?",
        a: "SkillSphere uses a secure escrow system. You fund a milestone before work begins, funds are held safely and only released to the freelancer once you approve the deliverable. You're never charged for work you haven't accepted.",
      },
      {
        q: "Can I cancel a project?",
        a: "Yes. You can request a cancellation at any time through your project dashboard. If work hasn't started, a full refund is issued automatically. For in-progress projects, our dispute resolution team steps in to mediate a fair outcome for both parties.",
      },
    ],
  },
  {
    id: "freelancers",
    icon: "🧑‍💻",
    title: "For Freelancers",
    items: [
      {
        q: "How do I apply for jobs?",
        a: "Browse open listings from your dashboard or use the search and filter tools to find projects matching your skills. Click 'Submit Proposal' on any listing, outline your approach, quote your rate, and send it off. Clients typically respond within 48 hours.",
      },
      {
        q: "How do I receive payments?",
        a: "Once a client approves a milestone, funds are released from escrow to your SkillSphere wallet. You can withdraw to your bank account, PayPal, or other supported methods. Withdrawals are typically processed within 1–3 business days.",
      },
      {
        q: "How can I improve my profile?",
        a: "A strong profile is your best pitch. Add a professional photo, write a focused bio that highlights your expertise, upload portfolio samples, and keep your skills list current. Completing your profile to 100% also unlocks a 'Verified' badge that builds client trust.",
      },
      {
        q: "How do ratings work?",
        a: "After each completed project, clients leave a star rating and written review, and you can review them in return. Ratings are public and directly influence how prominently you appear in search results. Consistently delivering quality work is the fastest way to rise in rankings.",
      },
    ],
  },
  {
    id: "account",
    icon: "🔐",
    title: "Account & Security",
    items: [
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login screen and enter your registered email address. You'll receive a secure reset link within a few minutes. If it doesn't arrive, check your spam folder or contact our support team.",
      },
      {
        q: "Is my information secure?",
        a: "Absolutely. SkillSphere uses industry-standard 256-bit SSL encryption to protect all data in transit. We never sell your personal information to third parties, and all financial transactions are processed through PCI-DSS compliant payment gateways.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes. Go to Settings → Account → Delete Account. Please note that once deleted, your profile, proposals, and project history are permanently removed and cannot be recovered. We recommend downloading any important records before proceeding.",
      },
    ],
  },
  {
    id: "support",
    icon: "🛠️",
    title: "Technical Support",
    items: [
      {
        q: "How do I contact support?",
        a: "Our support team is available 24/7. You can reach us via the live chat widget in the bottom-right corner of any page, by emailing support@skillsphere.com, or by submitting a ticket through the Help Center. We aim to respond to all queries within 2 hours.",
      },
      {
        q: "What should I do if I experience technical issues?",
        a: "First, try a hard refresh (Ctrl + Shift + R on Windows, Cmd + Shift + R on Mac) and clear your browser cache. If the issue persists, try a different browser or device. Still stuck? Contact our support team with a screenshot and a brief description of the problem so we can resolve it quickly.",
      },
    ],
  },
];

// ─── AccordionItem ──────────────────────────────────────────────────────────────
function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-200 ${
        isOpen ? "border-blue-300 shadow-sm" : "border-gray-200"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-blue-50 transition-colors duration-150 group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-sm sm:text-base font-semibold pr-4 transition-colors ${
            isOpen ? "text-blue-600" : "text-gray-800 group-hover:text-blue-600"
          }`}
        >
          {question}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? "bg-blue-600 text-white rotate-45"
              : "bg-gray-100 text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600"
          }`}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-5 pt-1 bg-white border-t border-gray-100">
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─── FAQSection ─────────────────────────────────────────────────────────────────
function FAQSection({ section }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="mb-12">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{section.icon}</span>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{section.title}</h2>
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {section.items.map((item, i) => (
          <AccordionItem
            key={i}
            question={item.q}
            answer={item.a}
            isOpen={openIndex === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ─── FAQPage ────────────────────────────────────────────────────────────────────
export default function FAQPage() {
  const [search, setSearch] = useState("");

  // Flatten + filter items based on search query
  const filtered =
    search.trim().length > 1
      ? faqSections
          .map((section) => ({
            ...section,
            items: section.items.filter(
              (item) =>
                item.q.toLowerCase().includes(search.toLowerCase()) ||
                item.a.toLowerCase().includes(search.toLowerCase())
            ),
          }))
          .filter((section) => section.items.length > 0)
      : faqSections;

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">
            Skill<span className="text-gray-800">Sphere</span>
          </a>
          <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/faq" className="text-blue-600 font-semibold">FAQ</Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="bg-linear-to-br from-blue-600 via-blue-500 to-indigo-600 text-white py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">
            Help Center
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Find clear answers to the questions clients and freelancers ask most.
            Can't find what you're looking for? Our support team is always here to help.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search questions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl text-gray-800 text-sm font-medium placeholder-gray-400 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── Quick Links ── */}
      {!search && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {faqSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition text-center group"
              >
                <span className="text-2xl">{s.icon}</span>
                <span className="text-xs sm:text-sm font-semibold text-gray-600 group-hover:text-blue-600 transition">
                  {s.title}
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── FAQ Sections ── */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-16">
        {filtered.length > 0 ? (
          filtered.map((section) => (
            <div key={section.id} id={section.id}>
              <FAQSection section={section} />
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-semibold text-gray-700 mb-2">No results found</p>
            <p className="text-sm text-gray-400">
              Try a different search term, or{" "}
              <a href="#contact" className="text-blue-600 hover:underline font-medium">
                contact our support team
              </a>
              .
            </p>
          </div>
        )}
      </main>

      {/* ── Contact Support ── */}
      <section
        id="contact"
        className="bg-linear-to-br from-blue-50 to-indigo-50 border-t border-blue-100 py-16 px-4 sm:px-6"
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-7 h-7 text-blue-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">
            Our support team is available 24/7 and typically responds within 2 hours.
            Don't hesitate, we're here to help you get the most out of SkillSphere.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:support@skillsphere.com"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3 rounded-xl transition shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Support
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-blue-50 text-blue-600 border border-blue-200 font-semibold text-sm px-6 py-3 rounded-xl transition shadow-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Live Chat
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block" />
              Available 24/7
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-blue-400 rounded-full inline-block" />
              Avg. 2-hour response
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-indigo-400 rounded-full inline-block" />
              98% satisfaction rate
            </span>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg font-extrabold text-white">
            Skill<span className="text-blue-400">Sphere</span>
          </p>
          <p className="text-xs text-center sm:text-right">
            © {new Date().getFullYear()} SkillSphere. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs">
            <Link to="#" className="hover:text-white transition">Privacy</Link>
            <Link to="#" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
