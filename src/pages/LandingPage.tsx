import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  Building2, 
  FileCheck, 
  ChevronDown, 
  HelpCircle,
  Eye,
  Sliders,
  DollarSign,
  Briefcase,
  GraduationCap,
  Store,
  Sparkles
} from 'lucide-react';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { LandingFooter } from '../components/layout/LandingFooter';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does NEXUS differ from a traditional credit score like FICO?',
      a: 'Traditional credit bureaus rely on historical debt repayments, credit card balances, and legacy loan history. NEXUS looks at real-time alternative financial reliability: consistent gig/freelance platform inflows (Stripe, Upwork, Square), on-time invoice settlements, and operating cash-flow discipline—all shared strictly with your explicit consent.'
    },
    {
      q: 'Can institutions see my private transaction line items or banking passwords?',
      a: 'Never. NEXUS enforces strict zero-knowledge data minimization. You choose the exact aggregated indicators (e.g., 6-month average inflow, variance ratio) and the specific institution permitted to see them. Your raw banking credentials and line-by-line personal purchases are never exposed.'
    },
    {
      q: 'Does NEXUS make automated loan or apartment approval decisions?',
      a: 'No. NEXUS is an alternative financial identity and verification protocol, not a credit bureau or lending underwriter. We provide verified, tamper-evident financial indicators to help underwriters and landlords evaluate non-traditional applicants fairly and transparently.'
    },
    {
      q: 'Can I revoke access after applying for a lease or business line of credit?',
      a: 'Yes, with one click. In your Privacy & Consent Center, every granted partner session has an active token that you can revoke or set to expire automatically after 24 hours, 7 days, or 30 days.'
    }
  ];

  const steps = [
    {
      step: '01',
      title: 'Connect Verified Feeds',
      description: 'Link your Stripe, Upwork, PayPal, or business bank accounts via read-only, cryptographically authenticated APIs.',
      icon: Briefcase
    },
    {
      step: '02',
      title: 'Analyze Cash-Flow Stability',
      description: 'NEXUS evaluates inflow consistency, operating outflow discipline, and liquidity cushions over 3 to 12 months.',
      icon: TrendingUp
    },
    {
      step: '03',
      title: 'Generate Your Trust Passport',
      description: 'Receive a portable digital financial passport with verified proof of credibility without debt-history bias.',
      icon: ShieldCheck
    },
    {
      step: '04',
      title: 'Share With Scoped Consent',
      description: 'Grant time-limited, read-only verification access to lenders, landlords, or equipment suppliers on your own terms.',
      icon: Lock
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Core Value Proposition */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/60">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Next-Gen Financial Identity Protocol</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
                Your Financial Story Deserves to Be Seen.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Turn your financial activity into clear, understandable insights with a secure Financial Trust Passport. Prove creditworthiness through real-world cash flow, not outdated credit bureau rules.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  to="/onboarding"
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-sm shadow-blue-600/20 hover:shadow-md"
                >
                  <span>Create Your Trust Passport</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#how-it-works"
                  className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Explore How It Works</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>100% Consent-Governed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No Hard Inquiries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Built for Independent Workers</span>
                </div>
              </div>
            </div>

            {/* Right Column: Visually Rich Product Preview */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Background decorative glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl blur-xl opacity-70 transform -rotate-1" />

                {/* Main Product Preview Card */}
                <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                  {/* Top Bar of Passport Preview */}
                  <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                        N
                      </div>
                      <span className="font-bold tracking-tight">NEXUS Financial Trust Passport</span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded">
                      AUTHENTICATED
                    </span>
                  </div>

                  <div className="p-5 space-y-4 text-xs">
                    {/* Passport Holder Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <div className="text-sm font-bold text-slate-900">Arslan Tariq</div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          Independent Software Engineer & Product Designer
                        </div>
                        <div className="text-[10px] font-mono text-blue-600 mt-0.5">
                          ID: DEMO-NX-84920
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-slate-900 font-mono">92%</div>
                        <div className="text-[10px] text-slate-400">Profile Complete</div>
                      </div>
                    </div>

                    {/* Financial Health Overview 3-Pillar Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Avg Inflow</span>
                        <span className="text-xs font-bold text-slate-900 font-mono tabular-nums mt-0.5 block">
                          $8,683/mo
                        </span>
                        <span className="text-[9px] text-emerald-700 font-medium block">+14% vs base</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Consistency</span>
                        <span className="text-xs font-bold text-blue-700 font-mono tabular-nums mt-0.5 block">
                          94% Stable
                        </span>
                        <span className="text-[9px] text-slate-500 block">&lt; 7% variance</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Outflow Ratio</span>
                        <span className="text-xs font-bold text-slate-800 font-mono tabular-nums mt-0.5 block">
                          53.9%
                        </span>
                        <span className="text-[9px] text-slate-500 block">Balanced reserve</span>
                      </div>
                    </div>

                    {/* Cash-Flow Mini Visualizer */}
                    <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-100">
                      <div className="flex items-center justify-between text-[11px] mb-2 font-medium">
                        <span className="text-slate-700">6-Month Cash-Flow Trajectory</span>
                        <span className="text-blue-600 font-mono text-[10px]">+$4,150 net avg/mo</span>
                      </div>
                      <div className="grid grid-cols-6 gap-1.5 h-14 items-end">
                        {[
                          { month: 'Apr', h: '65%', net: '+$3.6k' },
                          { month: 'May', h: '75%', net: '+$3.8k' },
                          { month: 'Jun', h: '70%', net: '+$3.9k' },
                          { month: 'Jul', h: '88%', net: '+$4.1k' },
                          { month: 'Aug', h: '82%', net: '+$4.1k' },
                          { month: 'Sep', h: '95%', net: '+$4.3k' },
                        ].map((bar, i) => (
                          <div key={i} className="flex flex-col items-center gap-1 h-full justify-end">
                            <div
                              className="w-full bg-blue-600 rounded-xs transition-all hover:bg-blue-700"
                              style={{ height: bar.h }}
                              title={`${bar.month}: ${bar.net}`}
                            />
                            <span className="text-[9px] text-slate-400 font-mono">{bar.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Verification Indicators & Privacy Control Indicator */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                      <div className="flex items-center gap-2 text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Stripe + Upwork Verified</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-blue-700 font-medium">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Consent-Protected</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Button Bar in preview */}
                  <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => navigate('/dashboard')}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                      <span>Interactive Demo View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Ready for Partner Review
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience Bar: Students, Freelancers, Gig Workers, Small Business */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Engineered For The New Modern Workforce
            </h2>
            <p className="text-sm font-semibold text-slate-800 mt-1">
              Alternative financial credibility tailored to modern earning structures
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-colors">
              <GraduationCap className="w-5 h-5 text-blue-600 mb-2" />
              <h3 className="text-xs font-bold text-slate-900">Students & Graduates</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Demonstrate credibility for apartment leases through stipends, fellowship grants, and research fees without a co-signer.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-colors">
              <Briefcase className="w-5 h-5 text-teal-600 mb-2" />
              <h3 className="text-xs font-bold text-slate-900">Freelancers & Creators</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Turn recurring client retainers, Upwork ratings, and Stripe invoices into recognized proof of stability.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-colors">
              <TrendingUp className="w-5 h-5 text-emerald-600 mb-2" />
              <h3 className="text-xs font-bold text-slate-900">Gig Economy Contractors</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Aggregate multi-app weekly earnings (DoorDash, Uber, Lyft) into clear rolling cash-flow verification.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-blue-200 transition-colors">
              <Store className="w-5 h-5 text-amber-600 mb-2" />
              <h3 className="text-xs font-bold text-slate-900">Small Business Owners</h3>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                Access equipment financing and operational capital based on real sales receipts and merchant terminal data.
              </p>
            </div>
          </div>

          {/* Visual Editorial Spotlight */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-900 text-white grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-6 sm:p-10 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 bg-blue-950/80 border border-blue-800/60 px-3 py-1 rounded-full">
                <span>The Independent Creative Economy</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                Designed for workers whose balance sheet lives in real-world activity, not legacy debt.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Over 73 million Americans earn independent or non-traditional income. NEXUS transforms distributed invoices, platform retainers, and merchant settlement feeds into an immutable, portable financial credential accepted by institutional underwriters.
              </p>
              <div className="pt-2 flex items-center gap-6 text-xs text-slate-300">
                <div>
                  <div className="text-base font-bold text-white font-mono">$8.9k/mo</div>
                  <div className="text-[11px] text-slate-400">Avg Verified Inflow</div>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <div className="text-base font-bold text-emerald-400 font-mono">0 Inquiries</div>
                  <div className="text-[11px] text-slate-400">Zero Score Impact</div>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <div className="text-base font-bold text-blue-300 font-mono">100% Consent</div>
                  <div className="text-[11px] text-slate-400">Client-Controlled</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 h-64 sm:h-80 lg:h-full relative overflow-hidden bg-slate-800">
              <img
                src="/src/assets/images/freelancer_workspace_1790930542043.jpg"
                alt="Contemporary creative studio workspace with financial analytics"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Comparison */}
      <section className="py-16 md:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              The Structural Gap
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2 text-balance">
              Traditional credit scoring was built in 1989 for corporate salaried workers.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              If you don't carry debt balances or traditional W-2 paystubs, the legacy system treats you as an unverified risk. NEXUS changes the equation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* The Broken Legacy System */}
            <div className="bg-white rounded-2xl border border-red-200/80 p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-red-100">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Legacy Credit Scoring
                </span>
                <span className="text-[11px] text-red-700 font-medium">Debt-Dependent</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Requires borrowing money and carrying credit cards to build credibility.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Ignores healthy freelance revenue, creator payouts, and business cash reserves.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Penalizes credit checks with score drops (hard inquiry penalties).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>Opaque black-box models with zero user privacy controls or revocability.</span>
                </li>
              </ul>
            </div>

            {/* The NEXUS Way */}
            <div className="bg-white rounded-2xl border border-emerald-300 p-6 shadow-2xs space-y-4 ring-1 ring-emerald-500/10">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  NEXUS Trust Network
                </span>
                <span className="text-[11px] text-emerald-700 font-medium">Cash-Flow Grounded</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Demonstrates credibility through positive cash flow and real-time earnings.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Direct API sync with Stripe, Upwork, PayPal, and business bank accounts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Zero hard inquiries. Sharing your passport never penalizes your standing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>100% consent-governed. You approve who sees what, with one-click revocation.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works 4-Step Visual Flow */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              From Disconnected Invoices to Verified Financial Passport
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-3">
              No paper printouts, no bank branch visits, and no loss of data sovereignty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, index) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="p-6 bg-slate-50/70 border border-slate-200/90 rounded-2xl relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-blue-600 bg-blue-100/70 px-2 py-0.5 rounded">
                      Step {s.step}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-2xs transition-colors"
            >
              <span>Begin Your 3-Minute Setup</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Key Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Everything You Need to Prove Financial Reliability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <TrendingUp className="w-6 h-6 text-blue-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Rolling Cash-Flow Diagnostics
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                6-month rolling view of net cash generation, stability ratios, and liquidity buffers computed transparently.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <ShieldCheck className="w-6 h-6 text-teal-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Tamper-Evident SHA-256 Ledger
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every uploaded record and direct API sync is hashed to guarantee authenticity to institutional reviewers.
              </p>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-2xs">
              <Lock className="w-6 h-6 text-indigo-600 mb-3" />
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Granular Attribute Disclosure
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Authorize only the exact indicators needed (e.g. Inflow stability without exposing line-item retail purchases).
              </p>
            </div>
          </div>

          {/* Infrastructure Visual Showcase */}
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 h-56 sm:h-72 relative overflow-hidden bg-slate-900">
              <img
                src="/src/assets/images/landing_network_visual_1790930526461.jpg"
                alt="Encrypted financial verification network nodes"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/90 hidden lg:block" />
            </div>
            <div className="lg:col-span-5 p-6 sm:p-8 space-y-3">
              <div className="text-[11px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                Cryptographic Infrastructure
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                Bank-Grade Transport with SHA-256 Ledger Provenance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All platform feeds are authenticated through mutual TLS and hashed at the source. Institutions receive tamper-evident receipts that eliminate manual fraud verification.
              </p>
              <div className="pt-2 flex items-center gap-4 text-[11px] font-mono text-slate-500">
                <span>SOC2 Compliant</span>
                <span aria-hidden="true">·</span>
                <span>Zero-Knowledge Proofs</span>
                <span aria-hidden="true">·</span>
                <span>Real-Time Sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Partnership Section */}
      <section id="institutions" className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                For Underwriters & Landlords
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Access a massive, credit-worthy market you currently reject.
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Millions of independent contractors, creators, and modern founders earn high, predictable incomes but fail legacy automated filters. NEXUS provides verifiable alternative dossiers without manual document chasing.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Instant verification of Stripe, Upwork, and OFX bank ledgers.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Explainable cash-flow metrics without synthetic black-box scores.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Guaranteed compliance with user consent and data minimization.</span>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  to="/partner-portal"
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-2 transition-colors shadow-2xs"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Launch Institution Partner Portal</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 overflow-hidden">
                {/* Visual Header Banner */}
                <div className="h-32 sm:h-40 -mx-6 -mt-6 mb-2 relative overflow-hidden bg-slate-800">
                  <img
                    src="/src/assets/images/institution_underwriting_1790930554679.jpg"
                    alt="Institutional credit risk and underwriting suite"
                    className="w-full h-full object-cover opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex items-end p-4">
                    <div>
                      <div className="text-[10px] font-mono font-semibold text-teal-300 uppercase tracking-wider">
                        HORIZON COMMERCIAL CAPITAL · VERIFIED SUITE
                      </div>
                      <div className="text-xs font-bold text-white">
                        Consented Underwriter Review Workspace
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-700" />
                    <span className="text-xs font-bold text-slate-800">
                      Partner Underwriting Portal Simulation
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded font-medium">
                    Consented Session
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Arslan Tariq</div>
                      <div className="text-[11px] text-slate-500">Commercial Credit Evaluation · $35,000 Facility</div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      High Consistency
                    </span>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">Maya Chen</div>
                      <div className="text-[11px] text-slate-500">Residential Lease Verification · Studio Apt</div>
                    </div>
                    <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      Stipend Verified
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  * All evaluations require independent human underwriting. NEXUS does not make automated credit determinations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Transparent Answers About Alternative Financial Trust
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                  >
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform shrink-0 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Build Your Financial Credibility?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of independent professionals, students, and founders demonstrating their true financial reliability today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/onboarding"
              className="px-6 py-3.5 bg-white text-blue-700 hover:bg-blue-50 rounded-xl text-xs font-bold transition-colors shadow-md shadow-blue-900/20"
            >
              Get Started for Free
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white border border-blue-500 rounded-xl text-xs font-semibold transition-colors"
            >
              Explore Sample Dashboard
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};
