import { useEffect } from "react";
import { ArrowLeft, ShieldCheck, Mail, FileText, Sun } from "lucide-react";

export default function RadiantPrivacyPage() {
  useEffect(() => {
    document.title = "Radiant • Privacy Policy";
  }, []);

  const CW = "max-w-[900px] mx-auto px-5";
  const H1 = "text-[36px] leading-tight sm:text-[44px] font-extrabold tracking-[-0.02em]";
  const H2 = "text-[22px] sm:text-[24px] font-bold";
  const P = "text-[16px] leading-[1.8] text-slate-300";
  const LINK = "text-sky-300 hover:text-sky-200 underline underline-offset-4";

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100">
      {/* Top banner (kept consistent with site) */}
      <div className="w-full bg-slate-900 border-b border-slate-800">
        <div className={`${CW} py-2 text-center text-sm`}>
          <span className="inline-flex items-center gap-2 font-medium text-slate-200">
            <Sun className="w-4 h-4" /> Radiant – Privacy
          </span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-slate-800">
        <div className={`${CW} py-6 flex items-center justify-between`}>
          <a href="#/" className="inline-flex items-center gap-3 text-slate-200 hover:text-white">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-slate-800 overflow-hidden">
              <img src="../public/sunwave.png" alt="Radiant logo" className="w-full h-full object-contain" />
            </span>
            <span className="text-sm inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </span>
          </a>
          <div className="hidden sm:flex items-center gap-2 text-slate-400 text-sm">
            Privacy First
          </div>
        </div>
      </header>

      {/* Title */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className={`${CW} py-12 sm:py-16`}> 
          <h1 className={H1}>Privacy Policy</h1>
          <p className="mt-3 text-slate-400">Effective Date: <time dateTime="2025-07-31">07/31/2025</time></p>
          <p className={`mt-6 ${P}`}>Your privacy is central to Radiant. This page explains what we collect, how we use it, and the choices you have.</p>
        </div>
      </section>

      {/* Quick nav */}
      <nav aria-label="Sections" className="border-b border-slate-800 bg-[#0b1220]">
        <div className={`${CW} py-4`}> 
          <ul className="flex flex-wrap gap-3 text-sm text-slate-300">
            {[
              { href: "#info-we-collect", label: "1. Information We Collect" },
              { href: "#use-of-info", label: "2. How We Use Information" },
              { href: "#security", label: "3. Data Security" },
              { href: "#retention", label: "4. Data Retention" },
              { href: "#your-rights", label: "5. Your Rights" },
              { href: "#wearables", label: "6. Wearables" },
              { href: "#children", label: "7. Children’s Privacy" },
              { href: "#changes", label: "8. Changes" },
              { href: "#contact", label: "9. Contact" },
            ].map((i) => (
              <li key={i.href}><a className="hover:text-sky-300" href={i.href}>{i.label}</a></li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Policy Body */}
      <main className={`${CW} py-12 sm:py-16`}>
        <section id="info-we-collect" className="scroll-mt-24">
          <h2 className={H2}>1. Information We Collect</h2>
          <p className={`mt-3 ${P}`}>Radiant collects only the data you explicitly choose to provide. This may include:</p>
          <ul className="mt-4 list-disc list-outside pl-6 space-y-2 text-slate-300">
            <li>Fitness metrics</li>
            <li>Nutrition information</li>
            <li>Food nutrient data</li>
            <li>Water, supplement, and sleep logs</li>
            <li>Mood tracking</li>
            <li>Health-related goals and preferences</li>
            <li>Personally Identifiable Information (PII): name, email, phone number, age, height, weight</li>
          </ul>
          <p className={`mt-4 ${P}`}>This information is voluntarily entered by you and is never collected without your clear action.</p>
        </section>

        <section id="use-of-info" className="mt-10 scroll-mt-24">
          <h2 className={H2}>2. How We Use Your Information</h2>
          <p className={`mt-3 ${P}`}>We use your data solely to:</p>
          <ul className="mt-4 list-disc list-outside pl-6 space-y-2 text-slate-300">
            <li>Provide personalized insights</li>
            <li>Help you track your health progress</li>
            <li>Improve your in-app experience</li>
            <li>Maintain app functionality</li>
          </ul>
          <p className={`mt-4 ${P}`}>We do not sell, rent, or share your data — including de-identified or anonymized data — with third parties for marketing or advertising purposes.</p>
        </section>

        <section id="security" className="mt-10 scroll-mt-24">
          <h2 className={H2}>3. Data Security and Encryption</h2>
          <p className={`mt-3 ${P}`}>Radiant follows strict industry best practices to protect your data:</p>
          <ul className="mt-4 list-disc list-outside pl-6 space-y-2 text-slate-300">
            <li>All PII and HIPAA-sensitive data is encrypted both in transit and at rest.</li>
            <li>Encrypted data includes: food logs, water logs, supplement logs, sleep logs, mood logs, nutrient information, personal identifiers, and health-related goals/preferences.</li>
            <li>This encrypted data is only accessible by you, the owner of the account.</li>
            <li>No Radiant employee, contractor, or service provider can view or access your personal health information.</li>
            <li>Non-sensitive data (that is not PII or HIPAA-relevant) may be collected for internal performance and usage metrics only. This data is never sold or distributed.</li>
          </ul>
        </section>

        <section id="retention" className="mt-10 scroll-mt-24">
          <h2 className={H2}>4. Data Retention</h2>
          <p className={`mt-3 ${P}`}>Your data is retained only while your account remains active. You may request full data deletion at any time. Once your request is processed, all personal health information will be permanently deleted from our systems within 30 days.</p>
        </section>

        <section id="your-rights" className="mt-10 scroll-mt-24">
          <h2 className={H2}>5. Your Rights</h2>
          <p className={`mt-3 ${P}`}>You have full control over your data at all times. You can:</p>
          <ul className="mt-4 list-disc list-outside pl-6 space-y-2 text-slate-300">
            <li>Access, update, or delete your information within the app</li>
            <li>Request complete deletion of your data</li>
            <li>Export your data upon request</li>
            <li>Opt out of any non-essential data collection features</li>
          </ul>
        </section>

        <section id="wearables" className="mt-10 scroll-mt-24">
          <h2 className={H2}>6. Future Integrations with Wearables</h2>
          <p className={`mt-3 ${P}`}>Radiant plans to support integration with third-party wearable devices (e.g., fitness trackers). When this feature becomes available:</p>
          <ul className="mt-4 list-disc list-outside pl-6 space-y-2 text-slate-300">
            <li>You will explicitly choose whether to connect wearable services</li>
            <li>Radiant will never share your data with wearables unless you approve it</li>
            <li>Each third-party integration will be governed by its own privacy policy</li>
          </ul>
        </section>

        <section id="children" className="mt-10 scroll-mt-24">
          <h2 className={H2}>7. Children’s Privacy</h2>
          <p className={`mt-3 ${P}`}>Radiant is intended for users age 13 and older. We do not knowingly collect personal health information from children under 13. If you believe a child under 13 has provided us with personal data, please contact us immediately and we will delete the information promptly.</p>
        </section>

        <section id="changes" className="mt-10 scroll-mt-24">
          <h2 className={H2}>8. Changes to This Policy</h2>
          <p className={`mt-3 ${P}`}>We may update this Privacy Policy from time to time. Any changes will be clearly posted in the app and on this website. Continued use of the app after such updates constitutes acceptance of the revised policy.</p>
        </section>

        <section id="contact" className="mt-10 scroll-mt-24">
          <h2 className={H2}>9. Contact Us</h2>
          <p className={`mt-3 ${P}`}>If you have questions, concerns, or requests related to this Privacy Policy or your data, please contact us at:</p>
          <p className={`mt-2 ${P} inline-flex items-center gap-2`}>
            <Mail className="w-5 h-5 text-sky-300" />
            Email: <a className={LINK} href="mailto:privacy@radiantapp.com">privacy@radiantapp.com</a>
          </p>
          <p className={`mt-4 ${P}`}>We respond to all inquiries within 48 hours.</p>
        </section>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-slate-500 text-xs">© {new Date().getFullYear()} Radiant. All rights reserved.</div>
      </main>
    </div>
  );
}