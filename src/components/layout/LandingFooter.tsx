import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-100">
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                N
              </div>
              <span className="text-base font-bold text-slate-900 tracking-tight">
                NEXUS
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Financial Identity & Trust Network. Empowering students, freelancers, gig contractors, and independent creators with consent-governed alternative credibility.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <Lock className="w-3.5 h-3.5 text-blue-600" />
              <span>Zero Silent Sharing · Client-Side Consent Keys</span>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/passport" className="hover:text-slate-900 transition-colors">
                  Trust Passport
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-slate-900 transition-colors">
                  AI Financial Insights
                </Link>
              </li>
              <li>
                <Link to="/records" className="hover:text-slate-900 transition-colors">
                  Financial Records & Feeds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-slate-900 transition-colors">
                  Privacy & Consent Center
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Institutions
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/partner-portal" className="hover:text-slate-900 transition-colors">
                  Underwriter Portal
                </Link>
              </li>
              <li>
                <a href="#institutions" className="hover:text-slate-900 transition-colors">
                  Commercial Landlords
                </a>
              </li>
              <li>
                <a href="#institutions" className="hover:text-slate-900 transition-colors">
                  Equipment Financiers
                </a>
              </li>
              <li>
                <a href="#institutions" className="hover:text-slate-900 transition-colors">
                  API & Token Specs
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Transparency
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="hover:text-slate-900 transition-colors">
                  Consent Architecture
                </Link>
              </li>
              <li>
                <span className="text-slate-400">FCRA Informational Policy</span>
              </li>
              <li>
                <span className="text-slate-400">SOC2 Type II Readiness</span>
              </li>
              <li>
                <span className="text-slate-400">Data Minimization Code</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="max-w-3xl leading-relaxed">
            NEXUS is an alternative financial identity and data verification platform. NEXUS does not provide consumer credit ratings, credit scores, or underwriting decisions. All financial insights and passport metrics are informational indicators compiled strictly with customer consent.
          </p>
          <div className="font-mono shrink-0">
            © 2026 NEXUS Trust Network Inc.
          </div>
        </div>
      </div>
    </footer>
  );
};
