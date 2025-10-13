import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Menu, X, HeartPulse, Activity, ShieldCheck, Smartphone, BarChart3, Sun } from "lucide-react";
import emailjs from "@emailjs/browser";


export default function RadiantLanding() {
  const [open, setOpen] = useState(false);
  const [eaOpen, setEaOpen] = useState(false);
  const [eaStep, setEaStep] = useState<1 | 2>(1);
  const [platform, setPlatform] = useState<"iOS" | "Android" | "">("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<string | null>(null);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);


  const CW = "max-w-[1120px] mx-auto px-5";
  const HERO_Y = "py-[120px] lg:py-[140px]";
  const SEC_Y = "py-[96px]";
  const H1 = "text-[44px] leading-[1.1] sm:text-[56px] sm:leading-[1.08] font-extrabold tracking-[-0.02em]";
  const H2 = "text-[32px] leading-[1.2] sm:text-[36px] font-bold tracking-[-0.01em]";
  const P = "text-[16px] leading-[1.7] text-slate-300";
  const BTN_PRIMARY =
    "inline-flex items-center gap-2 h-12 px-6 rounded-xl text-[15px] font-medium bg-sky-400 text-slate-900 shadow hover:bg-sky-300";
  const BTN_SECONDARY =
    "inline-flex items-center gap-2 h-12 px-6 rounded-xl text-[15px] font-medium border border-slate-700 hover:bg-slate-800";

  const navItems = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "FAQ", href: "#faq" },
  ];

  const features = [
    { icon: <HeartPulse className="w-6 h-6" aria-hidden />, title: "24/7 Wellness Tracking", desc: "Log Nutrition, Water, Supplement, Mood, Sleep, and more in one simple ecosystem." },
    { icon: <BarChart3 className="w-6 h-6" aria-hidden />, title: "Personal Insights", desc: "See your personalized trends and correlations and understand your health better. Leverage our AI to build better health." },
    { icon: <ShieldCheck className="w-6 h-6" aria-hidden />, title: "Privacy First", desc: "Your data stays yours. No one, including us, has access to your data. Your privacy is our highest priority." },
    { icon: <Activity className="w-6 h-6" aria-hidden />, title: "Real-time Metrics", desc: "Sync wearables in future Radiant versions, and gain deeper insights to your health." },
  ];

  function openEarlyAccess() {
    setErrors(null);
    setPlatform("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setEaStep(1);
    setEaOpen(true);
  }

  function handleEAContinue() {
    if (!platform) {
      setErrors("Please choose iOS or Android.");
      return;
    }
    setErrors(null);
    setEaStep(2);
  }

  function validateEmail(val: string) {
    return /[^\s@]+@[^\s@]+\.[^\s@]+/.test(val);
  }

  function submitEarlyAccess(e: React.FormEvent) {
  e.preventDefault();
  if (!firstName.trim() || !lastName.trim() || !validateEmail(email)) {
    setErrors("Please provide first name, last name, and a valid email.");
    return;
  }
  setErrors(null);

  // Ensure keys are configured
  if (
    EMAILJS_SERVICE_ID === "REPLACE_ME" ||
    EMAILJS_TEMPLATE_ID === "REPLACE_ME" ||
    EMAILJS_PUBLIC_KEY === "REPLACE_ME"
  ) {
    setErrors("Email service is not configured yet. Add your EmailJS keys (VITE_EMAILJS_*).");
    return;
  }

  setSending(true);
  const templateParams = {
    to_email: "kendallhuntwork@gmail.com",
    platform,
    firstName,
    lastName,
    email,
  };

  emailjs
    .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, {
      publicKey: EMAILJS_PUBLIC_KEY,
    })
    .then(() => {
      setSending(false);
      setSent(true);
      // Close after a short success message
      setTimeout(() => {
        setEaOpen(false);
        setSent(false);
        setPlatform("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setEaStep(1);
      }, 1000);
    })
    .catch((err: any) => {
      console.error(err);
      setSending(false);
      setErrors("Sending failed. Please check your internet and EmailJS settings.");
    });
}

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100">
      {/* Top banner */}
      <div className="w-full bg-slate-900 border-b border-slate-800">
        <div className={`${CW} py-2 text-center text-sm`}>
          <span className="inline-flex items-center gap-2 font-medium text-slate-200">
            Welcome to Radiant — your wellbeing atlas
          </span>
        </div>
      </div>

      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 border-b border-slate-800">
        <div className={`${CW} py-4 flex items-center justify-between`}>
          <a href="#home" className="flex items-center gap-2 font-semibold text-lg">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 overflow-hidden">
              <img src="/sunwave.png" alt="Radiant logo" className="w-full h-full object-contain" />
            </span>
            Radiant
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((n) => (
              <a key={n.label} href={n.href} className="text-sm text-slate-300 hover:text-sky-300 transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={openEarlyAccess} className="inline-flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-medium bg-sky-400 text-slate-900 shadow hover:bg-sky-300">
              Get Early Access <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button aria-label="Open menu" className="md:hidden p-2 rounded-lg border border-slate-800" onClick={() => setOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900/80">
            <div className={`${CW} py-4`}>
              <div className="flex items-center justify-between text-slate-200">
                <span className="font-semibold">Menu</span>
                <button aria-label="Close menu" className="p-2 rounded-lg border border-slate-800" onClick={() => setOpen(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-4 grid gap-2">
                {navItems.map((n) => (
                  <a key={n.label} href={n.href} className="px-3 py-2 rounded-lg hover:bg-slate-800 text-slate-200" onClick={() => setOpen(false)}>
                    {n.label}
                  </a>
                ))}
                <button onClick={() => { setOpen(false); openEarlyAccess(); }} className="mt-2 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl text-[15px] font-medium bg-sky-400 text-slate-900 shadow">
                  Get Early Access <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950 to-slate-900" />
        <div className={`${CW} ${HERO_Y} grid lg:grid-cols-[1.08fr_0.92fr] gap-24 items-center`}>
          <div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className={H1}>
              Advanced Health Monitoring
              <span className="block text-sky-300">for everyday wellbeing</span>
            </motion.h1>
            <p className={`mt-5 ${P} max-w-[58ch]`}>
              Track your health, visualize trends, and turn small actions into big results. Radiant breaks down paywalls, and brings you the tools for you to succeed in your health journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={openEarlyAccess} className={BTN_PRIMARY}>
                Get Early Access <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#features" className={BTN_SECONDARY}>
                Explore features
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 bg-gradient-to-tr from-slate-800 to-transparent rounded-3xl" />
            <div className="rounded-3xl border border-slate-800 shadow-xl overflow-hidden bg-slate-900">
              <div className="aspect-[4/3] p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 overflow-hidden">
                    <img src="/sunwave.png" alt="Radiant logo" className="w-full h-full object-contain" />
                  </span>
                  <h3 className="font-semibold text-slate-200">Today</h3>
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    { k: "Net Calories", v: "1542 cals" },
                    { k: "Water", v: "106 oz" },
                    { k: "Supplements", v: "Vitamin D - 1000 IU" },
                    { k: "Micro Nutrients", v: "Sugar: 42g / 50g Daily Goal" },
                    { k: "Mood", v: "90% Happy, 10% Neutral" },
                    { k: "Energy Level", v: "88%" },
                    { k: "Sleep", v: "7h 45m" },
                    { k: "Steps", v: "9,842" },
                  ].map((row) => (
                    <div key={row.k} className="flex items-center justify-between rounded-xl border border-slate-800 px-3 py-2">
                      <span className="text-sm text-slate-400">{row.k}</span>
                      <span className="text-sm font-medium text-slate-200">{row.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-900 text-slate-200 rounded-2xl border border-slate-800 shadow p-3 inline-flex items-center gap-2">
              <Smartphone className="w-5 h-5" /> iOS & Android
            </div>
          </div>
        </div>
      </section>

      <section id="features" className={`${SEC_Y} border-t border-slate-800 bg-[#0b1220]`}>
        <div className={CW}>
          <div className="text-center max-w-[680px] mx-auto">
            <h2 className={H2}>Every tool you can imagine to track your health your way.</h2>
            <p className={`mt-3 ${P}`}>A focused toolkit for daily health tracking, long‑term trend spotting.</p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-slate-800 p-6 bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-sky-400/15 text-sky-300 inline-flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-slate-100">{f.title}</h3>
                <p className={`mt-2 text-sm ${P}`}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className={`${SEC_Y} bg-gradient-to-b from-[#0b1220] to-slate-950 border-t border-slate-800`}>
        <div className={`${CW} grid lg:grid-cols-3 gap-10 items-start`}>
          <div className="lg:col-span-1">
            <h2 className={H2}>How it works</h2>
            <p className={`mt-3 ${P}`}>Three simple steps to better awareness.</p>
          </div>
          <div className="lg:col-span-2 grid gap-6">
            {[
              { step: "1", title: "Track", desc: "Log your day in seconds: mood, sleep, meals, movement." },
              { step: "2", title: "Understand", desc: "Spot patterns with clean charts and gentle insights." },
              { step: "3", title: "Improve", desc: "Turn signals into habits with reminders and goals." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-400 text-slate-900 font-bold grid place-items-center">{s.step}</div>
                  <div>
                    <h3 className="font-semibold text-slate-100">{s.title}</h3>
                    <p className={`mt-1 text-sm ${P}`}>{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className={`${SEC_Y} bg-[#0b1220] border-t border-slate-800`}>
        <div className={`${CW} max-w-[900px]`}>
          <h2 className={`${H2} text-center`}>FAQ</h2>
          <div className="mt-10 grid gap-6">
            {[
              { q: "Is Radiant medical software?", a: "No. Radiant offers general wellbeing insights and is not a substitute for professional medical advice." },
              { q: "How do you handle my data?", a: "We use strong encryption and granular privacy settings. You control what is synced and can export anytime." },
            ].map((f) => (
              <details key={f.q} className="rounded-2xl border border-slate-800 p-5 bg-slate-900">
                <summary className="font-semibold cursor-pointer list-none text-slate-100">
                  <span className="select-none">{f.q}</span>
                </summary>
                <p className={`mt-3 text-sm ${P}`}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="py-[88px] bg-gradient-to-r from-sky-500 to-sky-400 text-slate-900">
        <div className={`${CW} grid lg:grid-cols-2 gap-10 items-center`}>
          <div>
            <h2 className={H2}>Sign up for Early Access</h2>
            <p className="mt-3 text-slate-800/80">Be the first to try the Radiant mobile app and help shape the roadmap.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <button onClick={openEarlyAccess} className="inline-flex items-center justify-center h-12 rounded-xl px-5 text-[15px] font-medium bg-slate-900 text-slate-100 shadow">
              Join Early Access
            </button>
          </div>
        </div>
      </section>

      <footer className="py-[72px] bg-[#0b1220] border-t border-slate-800">
        <div className={`${CW} grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm`}>
            <div>
                <div className="inline-flex items-center gap-2 font-semibold text-lg">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 overflow-hidden">
                    <img src="/sunwave.png" alt="Radiant logo" className="w-full h-full object-contain" />
                    </span>
                    Radiant
            </div>
        <p className={`mt-3 ${P}`}>A simple atlas for your everyday wellbeing.</p>
        </div>
        <div>
        <p className="font-semibold">Product</p>
        <ul className="mt-3 grid gap-2 text-slate-300">
        <li><a href="#features" className="hover:text-sky-300">Features</a></li>
        <li><a href="#faq" className="hover:text-sky-300">FAQ</a></li>
        </ul>
        </div>
        <div>
        <p className="font-semibold">Legal</p>
        <ul className="mt-3 grid gap-2 text-slate-300">
        <li><a href="#/privacy" className="hover:text-sky-300">Privacy</a></li>
        </ul>
        </div>
        </div>
        <div className="mt-8 text-center text-xs text-slate-500">© {new Date().getFullYear()} Radiant. All rights reserved.</div>
    </footer>

      {eaOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setEaOpen(false)} />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
            <button aria-label="Close" onClick={() => setEaOpen(false)} className="absolute top-3 right-3 p-2 rounded-lg border border-slate-800">
              <X className="w-4 h-4" />
            </button>

            {eaStep === 1 && (
              <div>
                <h3 className="text-xl font-semibold">Get Early Access</h3>
                <p className={`mt-2 ${P}`}>Which platform would you like early access for?</p>

                <div className="mt-5 grid gap-3">
                  <label className="flex items-center gap-3 rounded-xl border border-slate-800 p-3 cursor-pointer hover:bg-slate-800/60">
                    <input type="radio" name="platform" className="accent-sky-400" checked={platform === "iOS"} onChange={() => setPlatform("iOS")} />
                    <span>iOS</span>
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-slate-800 p-3 cursor-pointer hover:bg-slate-800/60">
                    <input type="radio" name="platform" className="accent-sky-400" checked={platform === "Android"} onChange={() => setPlatform("Android")} />
                    <span>Android</span>
                  </label>
                </div>

                {errors && <p className="mt-4 text-sm text-red-400">{errors}</p>}

                <div className="mt-6 flex justify-end gap-3">
                  <button className={BTN_SECONDARY} onClick={() => setEaOpen(false)}>Cancel</button>
                  <button className={BTN_PRIMARY} onClick={handleEAContinue}>Continue</button>
                </div>
              </div>
            )}

            {eaStep === 2 && (
              <form onSubmit={submitEarlyAccess}>
                <h3 className="text-xl font-semibold">Your info</h3>
                <p className={`mt-2 ${P}`}>We’ll send your request to our inbox at <span className="text-sky-300">kendallhuntwork@gmail.com</span>.</p>

                <div className="mt-5 grid gap-4">
                  <div className="grid gap-2">
                    <label className="text-sm text-slate-300" htmlFor="first">First name</label>
                    <input id="first" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-11 rounded-xl bg-slate-800 border border-slate-700 px-3 outline-none focus:ring-2 focus:ring-sky-400" required />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm text-slate-300" htmlFor="last">Last name</label>
                    <input id="last" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-11 rounded-xl bg-slate-800 border border-slate-700 px-3 outline-none focus:ring-2 focus:ring-sky-400" required />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm text-slate-300" htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-xl bg-slate-800 border border-slate-700 px-3 outline-none focus:ring-2 focus:ring-sky-400" required />
                  </div>
                </div>

                {errors && <p className="mt-4 text-sm text-red-400">{errors}</p>}

                <div className="mt-6 flex justify-between gap-3">
                  <button type="button" className={BTN_SECONDARY} onClick={() => { setEaStep(1); setErrors(null); }}>Back</button>
                  <button type="submit" className={`${BTN_PRIMARY} ${sending ? "opacity-70 cursor-not-allowed" : ""}`} disabled={sending}>
                    {sending ? "Sending..." : sent ? "Sent!" : "Send request"}
                  </button>
                  {sent && <p className="mt-3 text-sm text-sky-300">Request sent. Thank you!</p>}
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
