import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  MessageSquareText,
  ShieldCheck,
  Handshake,
  Zap,
  Globe,
  Target,
  Lightbulb,
  Users,
  HeartHandshake,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Freelancers",
    desc: "Work with trusted professionals whose profiles are reviewed and validated.",
  },
  {
    icon: MessageSquareText,
    title: "Secure Messaging",
    desc: "Communicate safely with built-in messaging designed for fast collaboration.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Payments",
    desc: "Enjoy protected transactions and secure payment handling from start to finish.",
  },
  {
    icon: Handshake,
    title: "Real-time Collaboration",
    desc: "Keep projects moving with seamless updates and live collaboration tools.",
  },
  {
    icon: Zap,
    title: "Fast Hiring",
    desc: "Find the right talent quickly with streamlined discovery and onboarding.",
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    desc: "Connect businesses and freelancers across borders with ease.",
  },
];

const values = [
  {
    icon: Target,
    title: "Integrity",
    desc: "We believe in honest work, clear expectations, and dependable outcomes.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We continuously improve the freelance experience with modern tools and features.",
  },
  {
    icon: ShieldCheck,
    title: "Trust",
    desc: "We create a platform where businesses and freelancers can collaborate confidently.",
  },
  {
    icon: HeartHandshake,
    title: "Community",
    desc: "We support a global network built on growth, opportunity, and shared success.",
  },
];

const team = [
  {
    name: "Aarav Mehta",
    role: "CEO",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Nisha Verma",
    role: "CTO",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Rohan Das",
    role: "Community Manager",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
  },
];

const stats = [
  { label: "Freelancers", value: 250000, suffix: "+" },
  { label: "Clients", value: 180000, suffix: "+" },
  { label: "Jobs Posted", value: 1500000, suffix: "+" },
  { label: "Projects Completed", value: 3200000, suffix: "+" },
];

function CountUp({ end, suffix = "+" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const duration = 1600;
    const step = Math.max(1, Math.ceil(end / (duration / 16)));

    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  const format = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(num % 1000 === 0 ? 0 : 1)}K`;
    return num.toString();
  };

  return (
    <>
      {format(count)}
      {suffix}
    </>
  );
}

export default function AboutUsPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-linear-to-b from-blue-50 via-white to-blue-100 text-slate-900">
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
                SkillSphere | Premium Freelancer Marketplace
              </div>

              <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Empowering Businesses with World-Class Freelancers
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600 sm:text-xl">
                SkillSphere connects talented freelancers with businesses across the globe, making hiring simple, secure, and efficient.
              </p>

              <div className="mt-10 flex justify-center">
                <a
                  href="#"
                  className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 to-blue-500 px-7 py-4 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/40"
                >
                  Get Started
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="mt-20 grid items-center gap-8 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Our Story
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Built to bridge the gap between talent and opportunity.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              SkillSphere was built to bridge the gap between talented freelancers and clients by providing a trusted platform for collaboration. We help businesses discover the right talent and empower freelancers to grow, create, and succeed.
            </p>
          </div>

          <div className="rounded-3xl border border-white/60 bg-white/40 p-8 shadow-xl backdrop-blur-xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-linear-to-br from-blue-600 to-blue-500 p-5 text-white shadow-lg">
                <Users className="h-7 w-7" />
                <p className="mt-4 text-2xl font-bold">Trusted Network</p>
                <p className="mt-2 text-sm text-blue-100">
                  A professional ecosystem for clients and freelancers.
                </p>
              </div>
              <div className="rounded-2xl bg-white p-5 shadow-md">
                <BriefcaseBusiness className="h-7 w-7 text-blue-600" />
                <p className="mt-4 text-2xl font-bold text-slate-900">Smart Hiring</p>
                <p className="mt-2 text-sm text-slate-600">
                  A smoother way to discover and onboard top talent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Mission & Vision
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              What drives SkillSphere forward
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/70 bg-white/50 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-5 inline-flex rounded-2xl bg-blue-600/10 p-3 text-blue-700">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Mission</h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                To make freelancing accessible, transparent, and rewarding.
              </p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/50 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="mb-5 inline-flex rounded-2xl bg-blue-600/10 p-3 text-blue-700">
                <Lightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">Vision</h3>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                To become the world's most trusted freelance marketplace.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Why Choose SkillSphere
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Everything you need to hire with confidence
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-white/70 bg-white/50 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="inline-flex rounded-2xl bg-linear-to-r from-blue-600 to-blue-500 p-3 text-white shadow-md transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-20 rounded-3xl border border-blue-100 bg-linear-to-r from-blue-700 to-blue-500 px-6 py-14 shadow-2xl sm:px-10">
          <div className="text-center text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Platform Statistics
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Growing a global freelance ecosystem
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/20 bg-white/10 p-6 text-center text-white shadow-lg backdrop-blur-xl"
              >
                <div className="text-3xl font-bold">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Meet Our Values
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              The principles behind everything we build
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/70 bg-white/50 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div className="inline-flex rounded-2xl bg-blue-600/10 p-3 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Team */}
        <section className="mt-20">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Team Section
            </p>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
              Meet the people behind SkillSphere
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {team.map((person) => (
              <div
                key={person.name}
                className="rounded-3xl border border-white/70 bg-white/50 p-6 text-center shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="mx-auto h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                />
                <h3 className="mt-5 text-xl font-semibold">{person.name}</h3>
                <p className="mt-2 font-medium text-blue-700">{person.role}</p>
                <p className="mt-3 text-slate-600">
                  Dedicated to building a world-class freelancer experience.
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 mb-8">
          <div className="rounded-3xl border border-blue-100 bg-linear-to-r from-slate-900 via-blue-900 to-blue-700 px-6 py-14 text-center text-white shadow-2xl sm:px-10">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Whether you’re hiring talent or building your freelance career, SkillSphere is ready for you.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <a
                href="#"
                className="rounded-full bg-white px-6 py-3 font-semibold text-blue-700 shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
              >
                Hire Talent
              </a>
              <a
                href="#"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Become a Freelancer
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}