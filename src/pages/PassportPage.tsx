import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Share2, 
  Download, 
  Lock, 
  QrCode, 
  CheckCircle2, 
  Copy, 
  ExternalLink,
  Layers,
  FileText,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { TrustPassportCard } from '../components/shared/TrustPassportCard';

export const PassportPage: React.FC = () => {
  const { user, records, cashFlowData, setIsShareModalOpen, setIsReportModalOpen, showToast } = useNexus();
  const [activeTab, setActiveTab] = useState<'card' | 'proofs' | 'preview'>('card');
  const [tokenCopied, setTokenCopied] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText('0x9a8f238b91c1074e2d837651a0b32948cde9103857102948cb91283749201a09');
    setTokenCopied(true);
    showToast('Ledger Proof Copied', 'Cryptographic verification root hash copied.', 'success');
    setTimeout(() => setTokenCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Financial Trust Passport
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your portable, cryptographic proof of financial reliability and cash-flow health.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download Sample Report</span>
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Passport</span>
          </button>
        </div>
      </div>

      {/* Navigation Segmented Tabs */}
      <div className="flex items-center p-1 bg-slate-100 rounded-xl w-fit text-xs font-semibold">
        <button
          onClick={() => setActiveTab('card')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'card'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Digital Passport
        </button>
        <button
          onClick={() => setActiveTab('proofs')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'proofs'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Cryptographic Proofs
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'preview'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Underwriter View Preview
        </button>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'card' && (
        <div className="space-y-6">
          {/* Main Visual Passport Card */}
          <TrustPassportCard />

          {/* Explained Indicators Grid */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                How Your Passport Indicators Are Evaluated
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every factor is grounded in verifiable cash movements rather than debt utilization.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">1. Inflow Consistency Factor</span>
                  <span className="font-mono text-emerald-700 font-semibold">94% Stability</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Measures the regularity of client payments and platform deposits over 6 months. High scores confirm that income is predictable and ongoing.
                </p>
              </div>

              <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">2. Operating Outflow Discipline</span>
                  <span className="font-mono text-blue-700 font-semibold">53.9% Outflow Ratio</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Calculates total expenditures against gross monthly inflows. Demonstrates that you maintain positive operating margin without reliance on overdrafts.
                </p>
              </div>

              <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">3. Verified Record Feeds</span>
                  <span className="font-mono text-slate-800 font-semibold">5 Authenticated</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cross-checked through direct API integrations (Stripe, Upwork) and OFX encrypted statements. Protects reviewers from forged paystubs.
                </p>
              </div>

              <div className="p-4 bg-slate-50/70 border border-slate-200/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">4. Liquidity Reserve Cushion</span>
                  <span className="font-mono text-teal-700 font-semibold">+$24.1k Cumulative</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Analyzes net positive cash generation across consecutive quarterly cycles to verify emergency liquidity.
                </p>
              </div>
            </div>

            {/* Privacy Notice Banner */}
            <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl flex items-start gap-3 text-xs text-blue-950">
              <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-blue-900">Privacy Notice: </strong>
                Your financial information is shared only with your explicit permission. You choose the exact institutions, the duration of validity, and can revoke credentials with one click.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Cryptographic Proofs */}
      {activeTab === 'proofs' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Cryptographic Ledger Integrity
                </h3>
                <p className="text-xs text-slate-500">
                  Every connected record produces an immutable digital signature.
                </p>
              </div>
              <button
                onClick={handleCopyHash}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{tokenCopied ? 'Hash Copied' : 'Copy Verification Hash'}</span>
              </button>
            </div>

            <div className="p-3 bg-slate-900 text-white rounded-xl text-xs font-mono space-y-2">
              <div className="flex items-center justify-between text-slate-400 text-[10px]">
                <span>ROOT MERKLE HASH:</span>
                <span className="text-emerald-400">STATUS: VALIDATED</span>
              </div>
              <div className="text-blue-300 break-all">
                0x9a8f238b91c1074e2d837651a0b32948cde9103857102948cb91283749201a09
              </div>
              <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-800">
                BLOCK STAMP: 2026-10-02T00:24:24Z · ENCRYPTION: SHA-256 · CLIENT SCOPE: READ_ONLY
              </div>
            </div>

            {/* Records Log Table */}
            <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
              <div className="bg-slate-50 px-4 py-2.5 font-bold text-slate-700 border-b border-slate-200 text-[11px] uppercase tracking-wider">
                Indexed Evidence Records
              </div>
              <div className="divide-y divide-slate-100">
                {records.map((r) => (
                  <div key={r.id} className="p-3.5 flex items-center justify-between hover:bg-slate-50/50">
                    <div className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <div className="font-semibold text-slate-900 text-xs">{r.title}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {r.source} · {r.referenceId} · {r.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-slate-900 text-xs tabular-nums">
                        ${r.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                      <div className="text-[10px] font-mono text-emerald-700">Verified</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Institutional View Preview */}
      {activeTab === 'preview' && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">
                Read-Only Session Preview
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                What Horizon Capital Sees During Underwriting
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded">
              Token expires in 10 days
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Applicant:</span>
              <span className="font-bold text-slate-900">{user.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">6-Month Average Inflow:</span>
              <span className="font-mono font-bold text-slate-900">${user.inflowAverage.toLocaleString()}/mo</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Inflow Consistency Factor:</span>
              <span className="font-mono font-bold text-emerald-700">{user.consistencyScore}% (High Stability)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Operating Outflow:</span>
              <span className="font-mono font-bold text-slate-800">53.9% of recurring revenue</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Private Bank Passwords / SSN:</span>
              <span className="text-emerald-700 font-semibold">REDACTED / Zero Exposure</span>
            </div>
          </div>

          <div className="text-right pt-2">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Modify Sharing Permissions</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
