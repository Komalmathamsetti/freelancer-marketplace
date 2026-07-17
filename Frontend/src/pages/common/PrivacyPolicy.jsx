import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// ─── Shared Design Tokens ────────────────────────────────────────────────────
const colors = {
  primary: "#6C63FF",
  primaryDark: "#574FD6",
  primaryLight: "#EEF0FF",
  accent: "#FF6584",
  dark: "#1A1A2E",
  darkAlt: "#16213E",
  text: "#374151",
  textLight: "#6B7280",
  surface: "#FFFFFF",
  surfaceAlt: "#F9FAFB",
  border: "#E5E7EB",
  success: "#10B981",
};

const theme = {
  fontFamily: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
};

// ─── Inline Style Helpers ─────────────────────────────────────────────────────
const styles = {
  page: {
    fontFamily: theme.fontFamily,
    color: colors.text,
    backgroundColor: colors.surfaceAlt,
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  },

  // NAV
  nav: {
    background: colors.surface,
    borderBottom: `1px solid ${colors.border}`,
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 68,
    position: "sticky",
    top: 0,
    zIndex: 100,
    boxShadow: "0 1px 12px rgba(108,99,255,0.07)",
  },
  logo: {
    fontSize: 22,
    fontWeight: 800,
    color: colors.primary,
    letterSpacing: "-0.5px",
    textDecoration: "none",
  },
  logoSpan: { color: colors.accent },
  navLinks: {
    display: "flex",
    gap: 28,
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: colors.text,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
    transition: "color 0.2s",
  },
  navBtn: {
    background: colors.primary,
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "9px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 0.2s, transform 0.15s",
  },

  // HERO
  hero: {
    background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.darkAlt} 60%, #0F3460 100%)`,
    padding: "88px 24px 72px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(108,99,255,0.18)",
    border: "1px solid rgba(108,99,255,0.35)",
    borderRadius: 50,
    padding: "6px 16px",
    marginBottom: 20,
    fontSize: 13,
    fontWeight: 600,
    color: "#A89DFF",
    letterSpacing: "0.02em",
  },
  heroTitle: {
    fontSize: "clamp(2rem, 5vw, 3.25rem)",
    fontWeight: 800,
    color: "#FFFFFF",
    margin: "0 0 16px",
    letterSpacing: "-0.5px",
    lineHeight: 1.15,
  },
  heroSubtitle: {
    fontSize: "clamp(0.95rem, 2vw, 1.125rem)",
    color: "rgba(255,255,255,0.68)",
    maxWidth: 560,
    margin: "0 auto 28px",
    lineHeight: 1.7,
  },
  heroMeta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: "10px 20px",
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    fontWeight: 500,
  },

  // LAYOUT
  container: {
    maxWidth: 880,
    margin: "0 auto",
    padding: "56px 24px 80px",
  },

  // TOC CARD
  tocCard: {
    background: colors.surface,
    borderRadius: 18,
    border: `1px solid ${colors.border}`,
    boxShadow: "0 4px 24px rgba(108,99,255,0.07)",
    padding: "28px 32px",
    marginBottom: 40,
  },
  tocTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.textLight,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  tocGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "8px 24px",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  tocItem: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: 500,
    cursor: "pointer",
    padding: "4px 0",
    borderBottom: `1px dashed ${colors.border}`,
    transition: "color 0.2s",
  },

  // SECTION CARD
  sectionCard: {
    background: colors.surface,
    borderRadius: 18,
    border: `1px solid ${colors.border}`,
    boxShadow: "0 4px 24px rgba(108,99,255,0.06)",
    padding: "36px 40px",
    marginBottom: 24,
    transition: "box-shadow 0.25s, transform 0.25s",
  },
  sectionIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    background: colors.primaryLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    fontSize: 20,
  },
  sectionNum: {
    fontSize: 11,
    fontWeight: 700,
    color: colors.primary,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: colors.dark,
    margin: "0 0 14px",
    lineHeight: 1.3,
  },
  sectionBody: {
    fontSize: 15,
    lineHeight: 1.8,
    color: colors.text,
  },

  // HIGHLIGHT BOX
  highlightBox: {
    background: colors.primaryLight,
    border: `1px solid rgba(108,99,255,0.2)`,
    borderRadius: 12,
    padding: "16px 20px",
    marginTop: 16,
    fontSize: 14,
    color: colors.primaryDark,
    lineHeight: 1.7,
    fontWeight: 500,
  },

  // DATA TABLE
  dataTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: 18,
    fontSize: 14,
  },
  thCell: {
    background: colors.primaryLight,
    color: colors.primaryDark,
    fontWeight: 700,
    padding: "10px 14px",
    textAlign: "left",
    borderBottom: `2px solid rgba(108,99,255,0.2)`,
  },
  tdCell: {
    padding: "11px 14px",
    borderBottom: `1px solid ${colors.border}`,
    verticalAlign: "top",
    lineHeight: 1.6,
  },
  trEven: { background: colors.surfaceAlt },

  // UL
  ul: {
    paddingLeft: 20,
    margin: "10px 0",
    lineHeight: 1.9,
  },

  // CONTACT CARD
  contactCard: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
    borderRadius: 18,
    padding: "36px 40px",
    marginTop: 8,
    color: "#fff",
  },
  contactTitle: {
    fontSize: "1.3rem",
    fontWeight: 700,
    marginBottom: 10,
  },
  contactBody: {
    fontSize: 15,
    opacity: 0.85,
    lineHeight: 1.8,
    marginBottom: 20,
  },
  contactEmail: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(255,255,255,0.15)",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: 10,
    padding: "10px 20px",
    color: "#fff",
    fontWeight: 600,
    fontSize: 15,
    textDecoration: "none",
    transition: "background 0.2s",
  },

  // FOOTER
  footer: {
    background: colors.dark,
    color: "rgba(255,255,255,0.55)",
    textAlign: "center",
    padding: "28px 24px",
    fontSize: 13,
    lineHeight: 1.7,
  },
  footerLink: {
    color: colors.primary,
    textDecoration: "none",
    fontWeight: 600,
  },
};

// ─── Section Data ──────────────────────────────────────────────────────────────
const CURRENT_YEAR = new Date().getFullYear();

const sections = [
  {
    id: "information-we-collect",
    icon: "📋",
    num: "01",
    title: "Information We Collect",
    content: (
      <>
        <p style={styles.sectionBody}>
          When you register and use SkillSphere, we collect the following
          categories of personal information to provide you with a seamless
          freelancing experience:
        </p>
        <table style={styles.dataTable}>
          <thead>
            <tr>
              <th style={styles.thCell}>Data Category</th>
              <th style={styles.thCell}>Fields Collected</th>
              <th style={styles.thCell}>Applies To</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Core Account Data", "Full Name, Email Address, User Role (Client or Freelancer)", "All Users"],
              ["Credentials", "Password, stored exclusively in an encrypted, hashed format using industry-standard algorithms (e.g., bcrypt). Your raw password is never stored.", "All Users"],
              ["Freelancer Profile", "Professional Title, Skills, Years of Experience, Bio / Description, Portfolio Links (optional), Profile Picture (optional), Availability Status", "Freelancers"],
              ["Client Profile", "Company Name (optional), Company Description (optional)", "Clients"],
              ["Platform Activity", "Job Posts created by clients, Project Proposals submitted by freelancers", "All Users"],
              ["Communications", "Messages exchanged between clients and freelancers through the SkillSphere messaging system", "All Users"],
              ["Reviews & Ratings", "Feedback and star ratings submitted after project completion", "All Users"],
            ].map(([cat, fields, applies], i) => (
              <tr key={i} style={i % 2 === 0 ? styles.trEven : {}}>
                <td style={{ ...styles.tdCell, fontWeight: 600, color: colors.dark }}>{cat}</td>
                <td style={styles.tdCell}>{fields}</td>
                <td style={{ ...styles.tdCell, color: colors.primary, fontWeight: 600 }}>{applies}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={styles.highlightBox}>
          🔒 <strong>No Analytics or Tracking:</strong> SkillSphere does{" "}
          <strong>not</strong> use third-party analytics tools (e.g., Google
          Analytics, Mixpanel, Hotjar), advertising pixels, or any behavioral
          tracking technologies. We do not sell or share your browsing behavior
          with any advertiser or data broker.
        </div>
      </>
    ),
  },
  {
    id: "how-we-use",
    icon: "⚙️",
    num: "02",
    title: "How We Use Your Information",
    content: (
      <>
        <p>
          We use the information we collect solely to operate, improve, and
          support the SkillSphere platform. Specifically, we use your data to:
        </p>
        <ul style={styles.ul}>
          <li>Create and manage your account and authenticate your identity securely.</li>
          <li>Display your public profile to potential clients or freelancers on the platform.</li>
          <li>Facilitate job postings, proposals, and project collaborations between clients and freelancers.</li>
          <li>Enable real-time and asynchronous messaging between platform users.</li>
          <li>Publish and display reviews and ratings following project completion.</li>
          <li>Send transactional communications such as account confirmations, password resets, and platform notifications (no promotional emails without explicit consent).</li>
          <li>Ensure compliance with our Terms & Conditions and enforce platform policies.</li>
          <li>Respond to support requests and resolve disputes between users.</li>
          <li>Maintain the security, integrity, and performance of the platform.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          We do <strong>not</strong> use your information for targeted advertising,
          automated profiling, or any purpose beyond what is necessary to operate the
          platform.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    icon: "🍪",
    num: "03",
    title: "Cookies and Tracking Technologies",
    content: (
      <>
        <p>
          SkillSphere uses a minimal and purposeful approach to cookies. We use
          only <strong>strictly necessary cookies</strong> required for the
          platform to function:
        </p>
        <ul style={styles.ul}>
          <li>
            <strong>Session Cookies:</strong> Used to maintain your logged-in
            state during an active browser session. These expire when you close
            your browser.
          </li>
          <li>
            <strong>Authentication Tokens:</strong> Secure tokens (e.g., JWT
            stored in HTTP-only cookies) used to verify your identity on
            subsequent requests.
          </li>
          <li>
            <strong>CSRF Protection Tokens:</strong> Used to protect your
            account against cross-site request forgery attacks.
          </li>
        </ul>
        <div style={styles.highlightBox}>
          🚫 We do <strong>not</strong> use advertising cookies, third-party
          tracking cookies, analytics cookies, or any persistent tracking
          technologies. You do not need to consent to any non-essential cookies
          to use SkillSphere.
        </div>
      </>
    ),
  },
  {
    id: "data-security",
    icon: "🔐",
    num: "04",
    title: "Data Security",
    content: (
      <>
        <p>
          We take the security of your personal data seriously and implement
          appropriate technical and organizational measures to protect it from
          unauthorized access, disclosure, alteration, or destruction:
        </p>
        <ul style={styles.ul}>
          <li><strong>Password Hashing:</strong> All passwords are processed through a cryptographic hashing algorithm (bcrypt or equivalent) before storage. No plaintext passwords are ever retained.</li>
          <li><strong>HTTPS Encryption:</strong> All data transmitted between your browser and our servers is encrypted using TLS (Transport Layer Security).</li>
          <li><strong>Access Controls:</strong> Access to user data is restricted to authorized personnel on a need-to-know basis.</li>
          <li><strong>Secure Infrastructure:</strong> Our servers are hosted on reputable cloud providers with industry-standard physical and network security controls.</li>
          <li><strong>Regular Security Reviews:</strong> We periodically review our security practices and update them as necessary.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          Despite our best efforts, no method of electronic transmission or storage
          is 100% secure. If you believe your account has been compromised, please
          contact us immediately at{" "}
          <strong>support@skillsphere.in</strong>.
        </p>
      </>
    ),
  },
  {
    id: "data-sharing",
    icon: "🤝",
    num: "05",
    title: "Data Sharing",
    content: (
      <>
        <p>
          SkillSphere does not sell, rent, or trade your personal information.
          We share your data only in the following limited circumstances:
        </p>
        <ul style={styles.ul}>
          <li>
            <strong>Within the Platform:</strong> Your public profile
            information (name, professional title, skills, bio, portfolio links,
            profile picture, availability status, ratings) is visible to other
            registered users to facilitate hiring and collaboration.
          </li>
          <li>
            <strong>Payment Processing:</strong> When payments are processed
            on the platform, relevant transaction data is shared with our
            payment partner, <strong>Razorpay</strong>, solely for the purpose
            of completing the transaction. Razorpay is subject to its own
            Privacy Policy and is compliant with applicable payment security
            standards (PCI-DSS).
          </li>
          <li>
            <strong>Legal Obligations:</strong> We may disclose your data if
            required by law, court order, or governmental authority, or if we
            believe such action is necessary to protect the rights, property, or
            safety of SkillSphere, its users, or the public.
          </li>
          <li>
            <strong>Business Transfers:</strong> In the event of a merger,
            acquisition, or sale of substantially all of our assets, your data
            may be transferred as part of that transaction, subject to equivalent
            privacy protections.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "user-rights",
    icon: "⚖️",
    num: "06",
    title: "User Rights",
    content: (
      <>
        <p>
          As a user of SkillSphere, you have the following rights with respect
          to your personal data, consistent with applicable Indian data
          protection laws including the <strong>Digital Personal Data Protection Act, 2023 (DPDPA)</strong>:
        </p>
        <ul style={styles.ul}>
          <li><strong>Right to Access:</strong> You may request a copy of the personal data we hold about you.</li>
          <li><strong>Right to Correction:</strong> You may update or correct inaccurate information through your account settings or by contacting us.</li>
          <li><strong>Right to Erasure:</strong> You may request deletion of your account and associated personal data, subject to legal and contractual obligations.</li>
          <li><strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time.</li>
          <li><strong>Right to Grievance Redressal:</strong> You may lodge a complaint with our designated grievance officer (contact details below).</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          To exercise any of the above rights, please contact us at{" "}
          <strong>privacy@skillsphere.in</strong>. We will respond within{" "}
          <strong>30 days</strong> of receiving your request.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    icon: "🔗",
    num: "07",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          SkillSphere integrates with a limited number of third-party services
          that are essential to platform operations:
        </p>
        <ul style={styles.ul}>
          <li>
            <strong>Razorpay (Payment Gateway):</strong> Used to securely process
            payments between clients and freelancers. SkillSphere does not store
            credit or debit card details. All payment data is handled exclusively
            by Razorpay in accordance with PCI-DSS standards and Razorpay's own
            Privacy Policy. By making a payment on the platform, you agree to
            Razorpay's terms of service.
          </li>
          <li>
            <strong>Cloud Infrastructure:</strong> Our platform is hosted on
            secure cloud server infrastructure. Hosting providers may process
            server-level data (e.g., IP addresses in access logs) as part of
            standard operations.
          </li>
          <li>
            <strong>Email Delivery Services:</strong> Transactional emails (e.g.,
            account verification, notifications) may be routed through a
            third-party email delivery provider. Only the information necessary
            to deliver the email is shared.
          </li>
        </ul>
        <p style={{ marginTop: 12 }}>
          We do not integrate with advertising networks, social media tracking
          pixels, or analytics platforms.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    icon: "🗂️",
    num: "08",
    title: "Data Retention",
    content: (
      <>
        <p>
          We retain your personal data for as long as your account is active or
          as needed to provide you with our services. Specifically:
        </p>
        <ul style={styles.ul}>
          <li><strong>Active Accounts:</strong> All profile, activity, and communication data is retained for the duration of your account.</li>
          <li><strong>Deleted Accounts:</strong> Upon account deletion, we will remove or anonymize your personal data within <strong>90 days</strong>, except where retention is required by applicable Indian law (e.g., financial transaction records under the Prevention of Money Laundering Act, 2002).</li>
          <li><strong>Payment Records:</strong> Transaction records may be retained for up to <strong>7 years</strong> as required under Indian tax and financial regulations.</li>
          <li><strong>Legal Holds:</strong> Where data is subject to an ongoing dispute or legal proceeding, it will be retained until resolution.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          After the applicable retention period, your data will be securely
          deleted or permanently anonymized.
        </p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    icon: "👶",
    num: "09",
    title: "Children's Privacy",
    content: (
      <p>
        SkillSphere is intended for individuals who are at least{" "}
        <strong>18 years of age</strong>. We do not knowingly collect personal
        information from anyone under the age of 18. If you are a parent or
        guardian and believe that a minor has provided us with personal
        information, please contact us immediately at{" "}
        <strong>privacy@skillsphere.in</strong>, and we will take prompt steps
        to delete such information from our systems.
      </p>
    ),
  },
  {
    id: "policy-updates",
    icon: "🔄",
    num: "10",
    title: "Policy Updates",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices, technology, or legal requirements. When we make
          material changes, we will:
        </p>
        <ul style={styles.ul}>
          <li>Update the <strong>"Effective Date"</strong> at the top of this page.</li>
          <li>Notify registered users via email or a prominent in-platform notification at least <strong>14 days</strong> before the changes take effect.</li>
          <li>For significant changes affecting your rights, we may request your renewed consent.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          Your continued use of SkillSphere after the effective date of any
          updated Policy constitutes your acceptance of the changes. We encourage
          you to review this Policy periodically.
        </p>
      </>
    ),
  },
];

// ─── Section Card Component ────────────────────────────────────────────────────
function SectionCard({ section }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      id={section.id}
      style={{
        ...styles.sectionCard,
        boxShadow: hovered
          ? "0 12px 40px rgba(108,99,255,0.14)"
          : "0 4px 24px rgba(108,99,255,0.06)",
        transform: hovered ? "translateY(-2px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.sectionIcon}>{section.icon}</div>
      <div style={styles.sectionNum}>Section {section.num}</div>
      <h2 style={styles.sectionTitle}>{section.title}</h2>
      <div style={{ ...styles.sectionBody }}>{section.content}</div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function PrivacyPolicy() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={styles.page}>
      {/* ── Navigation ── */}
      <nav
        style={{
          ...styles.nav,
          boxShadow: navScrolled
            ? "0 4px 24px rgba(108,99,255,0.12)"
            : "0 1px 12px rgba(108,99,255,0.07)",
        }}
      >
        <a href="/" style={styles.logo}>
          Skill<span style={styles.logoSpan}>Sphere</span>
        </a>
        <ul style={styles.navLinks}>
          <li><Link to="/" style={styles.navLink}>Home</Link></li>
        </ul>
      </nav>

      {/* ── Hero ── */}
      <section style={styles.hero}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(108,99,255,0.12)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,101,132,0.08)", pointerEvents: "none" }} />

        <div style={styles.heroBadge}>🔒 Your Privacy Matters</div>
        <h1 style={styles.heroTitle}>Privacy Policy</h1>
        <p style={styles.heroSubtitle}>
          We believe transparency is the foundation of trust. Here's exactly
          what data we collect, why we collect it, and how we protect it.
        </p>
        <div style={styles.heroMeta}>
          📅 &nbsp;<strong>Effective Date:</strong>&nbsp; January 1, {CURRENT_YEAR}&nbsp;&nbsp;|&nbsp;&nbsp;
          🌏 &nbsp;<strong>Jurisdiction:</strong>&nbsp; India
        </div>
      </section>

      {/* ── Main Container ── */}
      <div style={styles.container}>

        {/* Table of Contents */}
        <div style={styles.tocCard}>
          <div style={styles.tocTitle}>📑 Table of Contents</div>
          <ul style={styles.tocGrid}>
            {sections.map((s) => (
              <li
                key={s.id}
                style={styles.tocItem}
                onClick={() => scrollTo(s.id)}
              >
                {s.num}. {s.title}
              </li>
            ))}
            <li style={styles.tocItem} onClick={() => scrollTo("contact")}>
              11. Contact Information
            </li>
          </ul>
        </div>

        {/* Intro note */}
        <div style={{ ...styles.highlightBox, marginBottom: 32, background: "#FFF7ED", border: "1px solid #FED7AA", color: "#92400E", fontSize: 14 }}>
          📌 <strong>Please read this Privacy Policy carefully.</strong> By registering for or using SkillSphere, you acknowledge that you have read, understood, and agree to the collection and use of your information as described in this Policy. This Policy applies to all users of the SkillSphere platform, including clients, freelancers, and visitors.
        </div>

        {/* Section Cards */}
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}

        {/* Contact Card */}
        <div id="contact" style={styles.contactCard}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📬</div>
          <div style={styles.contactTitle}>11. Contact Information</div>
          <p style={styles.contactBody}>
            If you have any questions, concerns, or requests regarding this Privacy
            Policy or the handling of your personal data, please reach out to our
            dedicated privacy team. We are committed to addressing all inquiries
            within <strong>30 business days</strong>.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <a href="mailto:support@skillsphere.in" style={{ ...styles.contactEmail }}>
              🛠️ support@skillsphere.in
            </a>
             <a href="mailto:komalmathamsetti@gmail.com" style={{ ...styles.contactEmail }}>
              🛠️ komalmathamsetti@gmail.com
            </a>
          </div>
          <div style={{ marginTop: 20, fontSize: 14, opacity: 0.8, lineHeight: 1.7 }}>
            <strong>Grievance Officer:</strong> As required under the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023, our Grievance Officer can be reached at{" "}
            <strong>grievance@skillsphere.in</strong>. Complaints will be acknowledged within{" "}
            <strong>24 hours</strong> and resolved within <strong>30 days</strong>.
            <br /><br />
            <strong>Registered Address:</strong> SkillSphere Technologies Pvt. Ltd., India.
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={styles.footer}>
        <div style={{ marginBottom: 8 }}>
          <a href="/" style={{ ...styles.footerLink, fontSize: 16, fontWeight: 800 }}>
            Skill<span style={{ color: colors.accent }}>Sphere</span>
          </a>
        </div>
        <div>
          © {CURRENT_YEAR} SkillSphere Technologies Pvt. Ltd. All rights reserved. &nbsp;|&nbsp;{" "}
          <a href="/terms" style={styles.footerLink}>Terms & Conditions</a>
          &nbsp;|&nbsp;{" "}
          <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
        </div>
        <div style={{ marginTop: 6, fontSize: 12, opacity: 0.6 }}>
          Governed by the laws of India &nbsp;·&nbsp; Digital Personal Data Protection Act, 2023
        </div>
      </footer>
    </div>
  );
}
