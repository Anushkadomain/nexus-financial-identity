import React from 'react';
import { 
  ShieldCheck, 
  Share2, 
  Download, 
  Calendar, 
  Lock, 
  Sparkles, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { useNexus } from '../../context/NexusContext';

interface TrustPassportCardProps {
  onShare?: () => void;
  onDownloadReport?: () => void;
  compact?: boolean;
}

export const TrustPassportCard: React.FC<TrustPassportCardProps> = ({
  onShare,
  onDownloadReport,
  compact = false
}) => {
  const { user, setIsShareModalOpen, setIsReportModalOpen } = useNexus();

  const handleShare = () => {
    if (onShare) onShare();
    else setIsShareModalOpen(true);
  };

  const handleReport = () => {
    if (onDownloadReport) onDownloadReport();
    else setIsReportModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all hover:shadow-md">
      {/* Top Banner / Identity Brand Stripe */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-xs">
            N
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                NEXUS Financial Trust Passport
              </span>
              <span className="text-[10px] font-mono font-medium text-blue-200 bg-blue-900/60 border border-blue-700/50 px-1.5 py-0.5 rounded">
                DEMO IDENTIFIER
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              SHA-256 Ledger: {user.passportId}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold justify-end">
            <ShieldCheck className="w-4 h-4" />
            <span>Verified Credential</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">
            Updated {user.lastUpdated}
          </div>
        </div>
      </div>

      {/* Main Passport Content */}
      <div className="p-6 relative">
        {/* Subtle Guilloche / Security Seal Background Accent */}
        <div className="absolute right-6 top-6 opacity-[0.03] pointer-events-none hidden sm:block">
          <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3" />
            <polygon points="100,20 120,80 180,100 120,120 100,180 80,120 20,100 80,80" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-14 h-14 rounded-xl object-cover border border-slate-200 shadow-2xs"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-white shadow-2xs">
                <ShieldCheck className="w-3 h-3" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  {user.name}
                </h2>
                <span className="hidden sm:inline text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200/60 px-1.5 py-0.5 rounded font-semibold">
                  CHIP-AUTH
                </span>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {user.personaTitle}
              </div>
              <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500">
                <span>Direct API Feeds: 3 Active</span>
                <span aria-hidden="true">·</span>
                <span>Verified Records: 5</span>
              </div>
            </div>
          </div>

          {/* Profile Completion Indicator */}
          <div className="w-full sm:w-48 bg-slate-50 border border-slate-200/90 rounded-xl p-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700">Profile Completion</span>
              <span className="font-bold text-blue-600 font-mono tabular-nums">{user.profileCompletion}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full" 
                style={{ width: `${user.profileCompletion}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-1.5 flex items-center justify-between">
              <span>Alternative Credibility</span>
              <span>Level 3 (Max)</span>
            </div>
          </div>
        </div>

        {/* 4 Quantitative Financial Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-5">
          <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <span className="text-[11px] font-medium text-slate-500 block">Avg. Monthly Inflow</span>
            <div className="text-base font-bold text-slate-900 font-mono tabular-nums mt-1">
              ${user.inflowAverage.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block font-mono">
              +14.2% vs 6-mo base
            </span>
          </div>

          <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <span className="text-[11px] font-medium text-slate-500 block">Inflow Consistency</span>
            <div className="text-base font-bold text-blue-700 font-mono tabular-nums mt-1">
              {user.consistencyScore}% Stable
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Low multi-month variance
            </span>
          </div>

          <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <span className="text-[11px] font-medium text-slate-500 block">Operating Outflow Ratio</span>
            <div className="text-base font-bold text-slate-800 font-mono tabular-nums mt-1">
              53.9% Outflow
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Balanced operating buffer
            </span>
          </div>

          <div className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl">
            <span className="text-[11px] font-medium text-slate-500 block">Liquidity Discipline</span>
            <div className="text-base font-bold text-teal-700 font-mono tabular-nums mt-1">
              +$4,000/mo
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">
              Consistent net positive
            </span>
          </div>
        </div>

        {/* Verification Status Breakdown */}
        <div className="pt-2 pb-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-600">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Stripe Connect Authenticated</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Upwork Retainer Verified</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Bank OFX Inflow Corroborated</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Privacy Notice */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span className="font-medium">
              Your financial information is shared only with your explicit permission.
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleReport}
              className="flex-1 sm:flex-none px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Sample Report</span>
            </button>
            <button
              onClick={handleShare}
              className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Passport</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
