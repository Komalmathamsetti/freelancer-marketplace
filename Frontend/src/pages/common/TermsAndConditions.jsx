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
  warning: "#F59E0B",
  danger: "#EF4444",
};

const fontFamily = "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif";

// ─── Inline Styles ─────────────────────────────────────────────────────────────
const styles = {
  page: {
    fontFamily,
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
    background: `linear-gradient(135deg, ${colors.darkAlt} 0%, #0F3460 50%, ${colors.dark} 100%)`,
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
    maxWidth: 580,
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

  // TOC
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

  // BOXES
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
  warningBox: {
    background: "#FFFBEB",
    border: `1px solid #FCD34D`,
    borderRadius: 12,
    padding: "16px 20px",
    marginTop: 16,
    fontSize: 14,
    color: "#92400E",
    lineHeight: 1.7,
    fontWeight: 500,
  },
  dangerBox: {
    background: "#FEF2F2",
    border: `1px solid #FECACA`,
    borderRadius: 12,
    padding: "16px 20px",
    marginTop: 16,
    fontSize: 14,
    color: "#991B1B",
    lineHeight: 1.7,
    fontWeight: 500,
  },

  // PAYMENT CARD
  paymentCard: {
    background: `linear-gradient(135deg, #F0FDF4 0%, #ECFDF5 100%)`,
    border: "1px solid #A7F3D0",
    borderRadius: 14,
    padding: "20px 24px",
    marginTop: 16,
    display: "flex",
    alignItems: "flex-start",
    gap: 14,
  },
  paymentIcon: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: "#10B981",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
    flexShrink: 0,
  },

  // PROHIBITED LIST
  prohibitedGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 12,
    marginTop: 16,
  },
  prohibitedItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    background: "#FEF2F2",
    border: "1px solid #FECACA",
    borderRadius: 10,
    padding: "12px 14px",
    fontSize: 14,
    color: "#991B1B",
    lineHeight: 1.5,
  },

  // UL
  ul: {
    paddingLeft: 20,
    margin: "10px 0",
    lineHeight: 1.9,
    fontSize: 15,
  },

  // FOOTER ACCEPTANCE BANNER
  acceptanceBanner: {
    background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.darkAlt} 100%)`,
    borderRadius: 18,
    padding: "36px 40px",
    textAlign: "center",
    marginBottom: 0,
    border: "1px solid rgba(108,99,255,0.2)",
  },
  acceptanceIcon: { fontSize: 40, marginBottom: 12 },
  acceptanceTitle: {
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#FFFFFF",
    marginBottom: 12,
  },
  acceptanceBody: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 1.8,
    maxWidth: 600,
    margin: "0 auto 20px",
  },
  acceptancePill: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    background: "rgba(108,99,255,0.25)",
    border: "1px solid rgba(108,99,255,0.4)",
    borderRadius: 50,
    padding: "8px 20px",
    color: "#A89DFF",
    fontSize: 13,
    fontWeight: 600,
  },

  // CONTACT
  contactCard: {
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
    borderRadius: 18,
    padding: "36px 40px",
    marginTop: 24,
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
    id: "acceptance",
    icon: "✅",
    num: "01",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          Welcome to <strong>SkillSphere</strong>, a premier online marketplace
          connecting skilled freelancers with clients across India and beyond.
          These Terms &amp; Conditions (<strong>"Terms"</strong>) constitute a
          legally binding agreement between you (<strong>"User"</strong>) and
          SkillSphere Technologies Pvt. Ltd. (<strong>"SkillSphere"</strong>,
          <strong>"we"</strong>, <strong>"us"</strong>, or <strong>"our"</strong>).
        </p>
        <p style={{ marginTop: 12 }}>
          By accessing or using the SkillSphere platform, including its website,
          mobile applications, and any related services, you confirm that you:
        </p>
        <ul style={styles.ul}>
          <li>Are at least <strong>18 years of age</strong> and legally capable of entering into a binding contract under applicable Indian law.</li>
          <li>Have read, understood, and agree to be bound by these Terms and our <a href="/privacy" style={{ color: colors.primary }}>Privacy Policy</a>.</li>
          <li>Are not barred from using the platform under any applicable law.</li>
        </ul>
        <div style={styles.highlightBox}>
          📌 If you do not agree to these Terms, you must immediately discontinue
          use of the SkillSphere platform. Your continued use constitutes your
          ongoing acceptance of these Terms.
        </div>
      </>
    ),
  },
  {
    id: "user-accounts",
    icon: "👤",
    num: "02",
    title: "User Accounts",
    content: (
      <>
        <p>
          To access most features of SkillSphere, you must create an account.
          You agree to the following when creating and managing your account:
        </p>
        <ul style={styles.ul}>
          <li><strong>Accurate Information:</strong> You must provide truthful, current, and complete information during registration and keep it updated at all times.</li>
          <li><strong>One Account Per User:</strong> Each individual may maintain only one account unless expressly authorized by SkillSphere in writing.</li>
          <li><strong>Account Security:</strong> You are solely responsible for maintaining the confidentiality of your login credentials and for all activities conducted under your account.</li>
          <li><strong>No Impersonation:</strong> You may not impersonate any person or entity, or misrepresent your affiliation with any person or entity.</li>
          <li><strong>Unauthorized Access:</strong> You must notify us immediately at <strong>support@skillsphere.in</strong> if you suspect any unauthorized use of your account.</li>
          <li><strong>Non-Transferable:</strong> Your account is personal to you and may not be transferred, sold, or assigned to any third party.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          SkillSphere reserves the right to verify your identity, qualifications,
          or information at any time and to suspend accounts that provide
          inaccurate or misleading information.
        </p>
      </>
    ),
  },
  {
    id: "client-responsibilities",
    icon: "🏢",
    num: "03",
    title: "Client Responsibilities",
    content: (
      <>
        <p>
          As a <strong>Client</strong> on SkillSphere, you agree to the following
          responsibilities:
        </p>
        <ul style={styles.ul}>
          <li>Post job listings that are accurate, lawful, and in genuine need of freelance services.</li>
          <li>Provide clear, complete, and realistic project briefs, timelines, and budgets to enable freelancers to submit informed proposals.</li>
          <li>Respond to freelancer communications in a timely and professional manner.</li>
          <li>Evaluate and select freelancers based on legitimate, merit-based criteria without discrimination.</li>
          <li>Honor agreed-upon payment terms and release funds promptly upon satisfactory project completion.</li>
          <li>Refrain from soliciting freelancers to work outside the SkillSphere platform to circumvent platform fees or protections.</li>
          <li>Submit reviews and ratings honestly and in good faith after project completion.</li>
          <li>Comply with all applicable Indian laws, including those relating to intellectual property, privacy, and anti-discrimination.</li>
        </ul>
        <div style={styles.warningBox}>
          ⚠️ Clients who engage in payment fraud, false dispute filing, or other
          bad-faith conduct may have their accounts permanently suspended and may
          be subject to legal action under applicable Indian law.
        </div>
      </>
    ),
  },
  {
    id: "freelancer-responsibilities",
    icon: "💼",
    num: "04",
    title: "Freelancer Responsibilities",
    content: (
      <>
        <p>
          As a <strong>Freelancer</strong> on SkillSphere, you agree to the
          following responsibilities:
        </p>
        <ul style={styles.ul}>
          <li>Represent your skills, qualifications, experience, and portfolio accurately and honestly on your profile.</li>
          <li>Submit proposals only for projects you are genuinely qualified and available to complete.</li>
          <li>Deliver work that meets the agreed-upon scope, quality standards, and deadlines.</li>
          <li>Communicate proactively with clients regarding project progress, delays, or changes in scope.</li>
          <li>Ensure that work delivered is your own original creation or properly licensed, and does not infringe any third-party intellectual property rights.</li>
          <li>Refrain from accepting payment outside the SkillSphere platform for work sourced through the platform.</li>
          <li>Issue valid invoices and comply with applicable Indian tax obligations, including GST registration where required.</li>
          <li>Maintain client confidentiality and refrain from disclosing sensitive project information to third parties.</li>
        </ul>
        <div style={styles.warningBox}>
          ⚠️ Freelancers who submit plagiarized work, create fake reviews, or
          engage in other dishonest conduct risk immediate suspension and
          forfeiture of pending earnings.
        </div>
      </>
    ),
  },
  {
    id: "payments",
    icon: "💳",
    num: "05",
    title: "Payments",
    content: (
      <>
        <p>
          All financial transactions on SkillSphere are governed by the following
          terms:
        </p>

        <div style={styles.paymentCard}>
          <div style={styles.paymentIcon}>💚</div>
          <div>
            <div style={{ fontWeight: 700, color: colors.dark, marginBottom: 4 }}>
              Powered by Razorpay
            </div>
            <div style={{ fontSize: 14, color: colors.text, lineHeight: 1.7 }}>
              All payments on SkillSphere are securely processed by{" "}
              <strong>Razorpay Software Pvt. Ltd.</strong>, a licensed payment
              aggregator regulated by the Reserve Bank of India (RBI). By making
              a payment, you agree to Razorpay's{" "}
              <a
                href="https://razorpay.com/terms/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.success, fontWeight: 600 }}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="https://razorpay.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: colors.success, fontWeight: 600 }}
              >
                Privacy Policy
              </a>
              . SkillSphere does not store your card, UPI, or banking
              credentials.
            </div>
          </div>
        </div>

        <ul style={{ ...styles.ul, marginTop: 18 }}>
          <li><strong>Currency:</strong> All transactions are conducted in Indian Rupees (INR) unless otherwise specified.</li>
          <li><strong>Platform Fees:</strong> SkillSphere charges a service fee on transactions, as disclosed on the platform's Pricing page. Fees are subject to change with 30 days' notice.</li>
          <li><strong>Escrow / Payment Protection:</strong> Client payments may be held in a secure escrow arrangement and released to the freelancer upon project milestone completion or final approval.</li>
          <li><strong>Refunds:</strong> Refund eligibility is governed by our Refund Policy. Disputes between clients and freelancers must first be raised through the SkillSphere Resolution Centre before seeking external remedies.</li>
          <li><strong>Taxes:</strong> SkillSphere will deduct and remit applicable TDS (Tax Deducted at Source) as required under the Income Tax Act, 1961. Freelancers are responsible for their own GST obligations where applicable.</li>
          <li><strong>Failed Transactions:</strong> SkillSphere is not liable for transaction failures caused by technical issues at the bank or payment processor level. Please contact Razorpay support or your bank in such cases.</li>
        </ul>
      </>
    ),
  },
  {
    id: "prohibited-activities",
    icon: "🚫",
    num: "06",
    title: "Prohibited Activities",
    content: (
      <>
        <p>
          You agree not to engage in any of the following activities on
          SkillSphere. Violations may result in immediate account suspension,
          termination, and/or legal action:
        </p>
        <div style={styles.prohibitedGrid}>
          {[
            ["❌", "Posting false, misleading, or fraudulent job listings or profiles"],
            ["❌", "Circumventing the platform by arranging off-platform payments"],
            ["❌", "Harassing, threatening, or abusing other users"],
            ["❌", "Uploading malware, viruses, or malicious code"],
            ["❌", "Creating multiple accounts to manipulate reviews or rankings"],
            ["❌", "Infringing copyrights, trademarks, or other intellectual property rights"],
            ["❌", "Submitting fake reviews, ratings, or testimonials"],
            ["❌", "Engaging in money laundering, fraudulent chargebacks, or payment fraud"],
            ["❌", "Scraping, crawling, or data-mining the platform without authorization"],
            ["❌", "Violating any applicable Indian or international laws or regulations"],
            ["❌", "Attempting to gain unauthorized access to other users' accounts or platform systems"],
            ["❌", "Sharing illegal, obscene, defamatory, or hate-speech content"],
          ].map(([icon, text], i) => (
            <div key={i} style={styles.prohibitedItem}>
              <span style={{ flexShrink: 0 }}>{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "intellectual-property",
    icon: "©️",
    num: "07",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          <strong>Platform IP:</strong> All content, features, code, design, logos, trademarks, and other materials constituting the SkillSphere platform are the exclusive property of SkillSphere Technologies Pvt. Ltd. and are protected under Indian copyright, trademark, and other applicable intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written consent.
        </p>
        <p style={{ marginTop: 14 }}>
          <strong>User-Generated Content:</strong> You retain ownership of all content you post on SkillSphere (including proposals, messages, portfolio items, and reviews). By posting content, you grant SkillSphere a non-exclusive, royalty-free, worldwide license to display and use such content solely for the purpose of operating the platform.
        </p>
        <p style={{ marginTop: 14 }}>
          <strong>Delivered Work:</strong> Intellectual property rights in work delivered by a freelancer to a client shall be governed by the specific agreement between those parties. Absent a written agreement, the freelancer retains all intellectual property rights until full payment is received, at which point rights transfer to the client unless otherwise agreed.
        </p>
        <div style={styles.highlightBox}>
          💡 We strongly encourage clients and freelancers to document IP
          ownership terms clearly in their project agreements before work commences.
        </div>
      </>
    ),
  },
  {
    id: "suspension-termination",
    icon: "🔒",
    num: "08",
    title: "Account Suspension or Termination",
    content: (
      <>
        <p>
          SkillSphere reserves the right, at its sole discretion, to suspend,
          restrict, or permanently terminate your account under the following
          circumstances:
        </p>
        <ul style={styles.ul}>
          <li>Violation of any provision of these Terms &amp; Conditions.</li>
          <li>Provision of false, inaccurate, or misleading information during registration or otherwise.</li>
          <li>Engagement in fraudulent, abusive, or illegal activity on the platform.</li>
          <li>Receipt of multiple substantiated complaints from other users.</li>
          <li>Non-payment of outstanding dues or fees owed to SkillSphere.</li>
          <li>Any conduct that, in our reasonable judgment, is harmful to the platform, other users, or third parties.</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          <strong>User-Initiated Termination:</strong> You may close your account
          at any time by contacting support@skillsphere.in. Account closure does
          not automatically waive outstanding payment obligations or ongoing
          project commitments.
        </p>
        <div style={styles.dangerBox}>
          ⛔ Upon termination, your access to the platform will be revoked
          immediately. Any pending earnings will be processed in accordance with
          our payment timelines, subject to the absence of unresolved disputes
          or policy violations.
        </div>
      </>
    ),
  },
  {
    id: "liability",
    icon: "⚖️",
    num: "09",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable Indian law:
        </p>
        <ul style={styles.ul}>
          <li>
            <strong>Platform as Marketplace:</strong> SkillSphere acts solely as a
            marketplace facilitating connections between clients and freelancers. We
            are not a party to any contract between users and are not responsible for
            the quality, safety, legality, or delivery of any services offered or
            procured through the platform.
          </li>
          <li>
            <strong>No Warranty:</strong> The platform is provided on an{" "}
            <strong>"as is" and "as available"</strong> basis without any warranties
            of any kind, express or implied, including warranties of merchantability,
            fitness for a particular purpose, or non-infringement.
          </li>
          <li>
            <strong>Indirect Damages:</strong> SkillSphere shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages
            arising out of or related to your use of the platform.
          </li>
          <li>
            <strong>Liability Cap:</strong> Our total aggregate liability to any
            user shall not exceed the amount of fees paid by or to that user through
            the platform in the three (3) months preceding the claim.
          </li>
          <li>
            <strong>Force Majeure:</strong> We are not liable for failure to perform
            our obligations due to causes beyond our reasonable control, including
            natural disasters, government actions, or internet outages.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    icon: "🔄",
    num: "10",
    title: "Changes to the Terms",
    content: (
      <>
        <p>
          SkillSphere reserves the right to modify these Terms at any time to
          reflect changes in law, platform features, or business practices. When
          we make material changes:
        </p>
        <ul style={styles.ul}>
          <li>We will update the <strong>"Effective Date"</strong> displayed on this page.</li>
          <li>Registered users will be notified via email and/or a prominent in-platform notice at least <strong>14 days</strong> before the changes take effect.</li>
          <li>For changes that materially affect your rights, we may require your renewed acceptance before you can continue using the platform.</li>
        </ul>
        <div style={styles.highlightBox}>
          📌 Your continued use of SkillSphere after the effective date of any
          updated Terms constitutes your agreement to the revised Terms. If you
          do not agree with the changes, you must cease using the platform and
          close your account before the effective date.
        </div>
      </>
    ),
  },
  {
    id: "governing-law",
    icon: "🏛️",
    num: "11",
    title: "Governing Law",
    content: (
      <>
        <p>
          These Terms &amp; Conditions shall be governed by and construed in
          accordance with the laws of the <strong>Republic of India</strong>,
          without regard to its conflict of law principles. The following
          legislation is particularly applicable:
        </p>
        <ul style={styles.ul}>
          <li>The Information Technology Act, 2000 (and its amendments)</li>
          <li>The Indian Contract Act, 1872</li>
          <li>The Consumer Protection Act, 2019</li>
          <li>The Digital Personal Data Protection Act, 2023</li>
          <li>The Copyright Act, 1957</li>
          <li>The Payment and Settlement Systems Act, 2007</li>
        </ul>
        <p style={{ marginTop: 12 }}>
          <strong>Dispute Resolution:</strong> Any dispute, controversy, or
          claim arising out of or relating to these Terms shall first be
          attempted to be resolved through good-faith negotiation. If
          unresolved within 30 days, disputes shall be referred to binding
          arbitration in accordance with the{" "}
          <strong>Arbitration and Conciliation Act, 1996</strong>, with the
          seat of arbitration in <strong>Bengaluru, Karnataka, India</strong>.
          The language of arbitration shall be English.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Jurisdiction:</strong> Subject to the arbitration clause
          above, the courts of <strong>Bengaluru, Karnataka</strong> shall
          have exclusive jurisdiction over any matters not subject to
          arbitration.
        </p>
      </>
    ),
  },
];

// ─── TOC Items ─────────────────────────────────────────────────────────────────
const tocItems = [
  ...sections.map((s) => ({ id: s.id, num: s.num, title: s.title })),
  { id: "contact-tc", num: "12", title: "Contact Information" },
];

// ─── Section Card ──────────────────────────────────────────────────────────────
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
      <div style={styles.sectionBody}>{section.content}</div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function TermsAndConditions() {
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
        <div
          style={{
            position: "absolute", top: -80, right: -80, width: 320, height: 320,
            borderRadius: "50%", background: "rgba(108,99,255,0.12)", pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute", bottom: -60, left: -60, width: 240, height: 240,
            borderRadius: "50%", background: "rgba(255,101,132,0.08)", pointerEvents: "none",
          }}
        />
        <div style={styles.heroBadge}>📜 Legal Agreement</div>
        <h1 style={styles.heroTitle}>Terms &amp; Conditions</h1>
        <p style={styles.heroSubtitle}>
          These terms govern your use of SkillSphere. Please read them carefully, they define your rights, our responsibilities, and how we work together.
        </p>
        <div style={styles.heroMeta}>
          📅 &nbsp;<strong>Effective Date:</strong>&nbsp; January 1, {CURRENT_YEAR}
          &nbsp;&nbsp;|&nbsp;&nbsp;
          🏛️ &nbsp;<strong>Jurisdiction:</strong>&nbsp; Republic of India
        </div>
      </section>

      {/* ── Main Container ── */}
      <div style={styles.container}>

        {/* Table of Contents */}
        <div style={styles.tocCard}>
          <div style={styles.tocTitle}>📑 Table of Contents</div>
          <ul style={styles.tocGrid}>
            {tocItems.map((item) => (
              <li
                key={item.id}
                style={styles.tocItem}
                onClick={() => scrollTo(item.id)}
              >
                {item.num}. {item.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Intro Note */}
        <div
          style={{
            ...styles.highlightBox,
            marginBottom: 32,
            background: "#FFF7ED",
            border: "1px solid #FED7AA",
            color: "#92400E",
            fontSize: 14,
          }}
        >
          📌 <strong>Important:</strong> These Terms &amp; Conditions form a
          legally binding contract between you and SkillSphere Technologies Pvt.
          Ltd. By registering an account or using the platform, you confirm that
          you have read and agree to these Terms. If you are using SkillSphere on
          behalf of a company, you represent that you have the authority to bind
          that company to these Terms.
        </div>

        {/* Section Cards */}
        {sections.map((section) => (
          <SectionCard key={section.id} section={section} />
        ))}

        {/* Contact Card */}
        <div id="contact-tc" style={styles.contactCard}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>📬</div>
          <div style={styles.contactTitle}>12. Contact Information</div>
          <p style={styles.contactBody}>
            If you have any questions about these Terms &amp; Conditions, wish to
            report a violation, or need to reach our legal team, please contact
            us through the following channels. We aim to respond within{" "}
            <strong>5 business days</strong>.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <a href="mailto:legal@skillsphere.in" style={styles.contactEmail}>
              ⚖️ legal@skillsphere.in
            </a>
            <a href="mailto:support@skillsphere.in" style={styles.contactEmail}>
              🛠️ support@skillsphere.in
            </a>
          </div>
          <div style={{ fontSize: 14, opacity: 0.8, lineHeight: 1.7 }}>
            <strong>SkillSphere Technologies Pvt. Ltd.</strong>
            <br />
            Registered in India under the Companies Act, 2013.
            <br />
            Disputes subject to arbitration in Bengaluru, Karnataka, India.
          </div>
        </div>

        {/* Acceptance Banner */}
        <div style={{ ...styles.acceptanceBanner, marginTop: 32 }}>
          <div style={styles.acceptanceIcon}>🤝</div>
          <div style={styles.acceptanceTitle}>Your Continued Use = Your Acceptance</div>
          <p style={styles.acceptanceBody}>
            By continuing to access or use SkillSphere, whether as a client,
            freelancer, or visitor, you acknowledge that you have read,
            understood, and agree to be bound by these Terms &amp; Conditions
            and our Privacy Policy. If you do not accept these Terms, please
            discontinue use of the platform immediately.
          </p>
          <div style={styles.acceptancePill}>
            ✅ Last reviewed: January {CURRENT_YEAR} &nbsp;·&nbsp; Governed by the laws of India
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
          © {CURRENT_YEAR} SkillSphere Technologies Pvt. Ltd. All rights reserved.
          &nbsp;|&nbsp;{" "}
          <a href="/terms" style={styles.footerLink}>Terms &amp; Conditions</a>
          &nbsp;|&nbsp;{" "}
          <a href="/privacy" style={styles.footerLink}>Privacy Policy</a>
        </div>
        <div style={{ marginTop: 6, fontSize: 12, opacity: 0.6 }}>
          Governed by the laws of India &nbsp;·&nbsp; Bengaluru, Karnataka &nbsp;·&nbsp; Arbitration under the Arbitration and Conciliation Act, 1996
        </div>
      </footer>
    </div>
  );
}
