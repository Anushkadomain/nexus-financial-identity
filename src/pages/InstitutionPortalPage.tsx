import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  UserCheck, 
  Search, 
  ExternalLink,
  Save,
  Lock,
  Sparkles,
  Info
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { ApplicantProfile } from '../types';

export const InstitutionPortalPage: React.FC = () => {
  const navigate = useNavigate();
  const { applicants, updateApplicantNotes, showToast } = useNexus();
  const [selectedApplicantId, setSelectedApplicantId] = useState<string>(applicants[0].id);
  const [reviewStatus, setReviewStatus] = useState<'Under Evaluation' | 'Document Verified' | 'Needs Clarification'>('Under Evaluation');
  const [underwriterNotes, setUnderwriterNotes] = useState(applicants[0].notes || '');
  const [reviewerName] = useState('Elena Vance');
  const [reviewerTitle] = useState('Senior Underwriting Risk Officer, Horizon Capital');
  const [reviewerAvatar] = useState('/src/assets/images/avatar_elena_1790925952532.jpg');

  const selectedApplicant = applicants.find((a) => a.id === selectedApplicantId) || applicants[0];

  const handleSelectApplicant = (app: ApplicantProfile) => {
    setSelectedApplicantId(app.id);
    setUnderwriterNotes(app.notes || '');
  };

  const handleSaveNotes = () => {
    updateApplicantNotes(selectedApplicant.id, underwriterNotes);
  };

  const handleUpdateStatus = (status: 'Under Evaluation' | 'Document Verified' | 'Needs Clarification') => {
    setReviewStatus(status);
    showToast('Assessment State Updated', `Marked applicant ${selectedApplicant.fullName} as ${status}.`, 'info');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased selection:bg-teal-100 selection:text-teal-900">
      {/* Top Institutional Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Return to User App</span>
          </button>

          <div className="h-4 w-px bg-slate-700 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center font-bold text-white text-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-tight text-white block">
                NEXUS Institutional Underwriter Portal
              </span>
              <span className="text-[10px] text-teal-400 font-mono block">
                HORIZON COMMERCIAL CAPITAL · VERIFIED PARTNER
              </span>
            </div>
          </div>
        </div>

        {/* Reviewer Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-white">{reviewerName}</div>
            <div className="text-[10px] text-slate-400">{reviewerTitle}</div>
          </div>
          <img
            src={reviewerAvatar}
            alt={reviewerName}
            className="w-9 h-9 rounded-full object-cover border border-teal-500/40"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      {/* Main Review Workspace */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Institutional Partner Banner with Visual */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 text-white p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div className="relative z-10 max-w-xl space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-teal-400 bg-teal-950/80 border border-teal-800/60 px-2.5 py-0.5 rounded">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HORIZON CAPITAL · ACCREDITED INSTITUTION</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Alternative Financial Underwriting Terminal
            </h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Evaluating verified cash flows, multi-platform deposits, and cryptographic record proofs for modern non-salaried applicants.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs font-bold text-white">Elena Vance</div>
              <div className="text-[11px] text-teal-300 font-mono">Senior Risk Officer</div>
            </div>
            <img
              src={reviewerAvatar}
              alt={reviewerName}
              className="w-12 h-12 rounded-xl object-cover border-2 border-teal-400 shadow-md"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Background Atmospheric Architectural Texture with measured scrim */}
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="/src/assets/images/institution_underwriting_1790930554679.jpg"
              alt="Institutional executive office backdrop"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
          </div>
        </div>

        {/* Important Regulatory Banner */}
        <div className="p-4 bg-teal-50 border border-teal-200 rounded-2xl flex items-start gap-3 text-xs text-teal-950 shadow-2xs">
          <Info className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-teal-900">Institutional Underwriting Mandate & Ethics Policy:</span>
            <p className="leading-relaxed text-teal-800">
              NEXUS provides authenticated, consent-governed alternative financial evidence. In compliance with fair lending guidelines, <strong>all financing decisions require certified human underwriter review</strong>. NEXUS does not generate automated lending approvals or rejections, nor does it score applicants with synthetic creditworthiness numbers.
            </p>
          </div>
        </div>

        {/* Workspace Split Layout: Applicant Queue + Deep Dossier Review */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Applicant Dossier Queue */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Consented Applicants Queue ({applicants.length})
              </h3>
              <span className="text-[10px] font-mono text-teal-800 bg-teal-100/70 px-1.5 py-0.5 rounded font-semibold">
                ACTIVE TOKENS
              </span>
            </div>

            <div className="space-y-2">
              {applicants.map((app) => {
                const isSelected = app.id === selectedApplicant.id;
                return (
                  <div
                    key={app.id}
                    onClick={() => handleSelectApplicant(app)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-teal-600 bg-white ring-2 ring-teal-500/10 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          {app.fullName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {app.persona}
                        </div>
                      </div>
                      <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {app.verificationStatus}
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>Avg Inflow: <strong>${app.monthlyAverageInflow.toLocaleString()}/mo</strong></span>
                      <span>Token Exp: {app.consentExpiry.split(' ')[0]}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Deep Dossier Review Panel */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-2xs space-y-6">
              {/* Applicant Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">
                      {selectedApplicant.fullName}
                    </h2>
                    <span className="text-xs font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60 font-semibold">
                      {selectedApplicant.passportId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">
                    Purpose: <strong className="text-slate-800">{selectedApplicant.applicationPurpose}</strong>
                  </p>
                </div>

                {/* Review status badge & action */}
                <div className="flex items-center gap-2">
                  <select
                    value={reviewStatus}
                    onChange={(e) => handleUpdateStatus(e.target.value as any)}
                    className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 focus:outline-hidden"
                  >
                    <option value="Under Evaluation">Status: Under Evaluation</option>
                    <option value="Document Verified">Status: Verified by Elena</option>
                    <option value="Needs Clarification">Status: Clarification Needed</option>
                  </select>
                </div>
              </div>

              {/* Consented Financial Indicators */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  01. Consented Alternative Financial Indicators
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[11px] font-medium text-slate-500 block">Avg Monthly Inflow</span>
                    <div className="text-base font-bold text-slate-900 font-mono tabular-nums mt-1">
                      ${selectedApplicant.monthlyAverageInflow.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium block">6-Month Rolling</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[11px] font-medium text-slate-500 block">Monthly Outflow</span>
                    <div className="text-base font-bold text-slate-800 font-mono tabular-nums mt-1">
                      ${selectedApplicant.monthlyAverageOutflow.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium block">Operating Expenses</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[11px] font-medium text-slate-500 block">Consistency Rating</span>
                    <div className="text-base font-bold text-teal-700 font-mono mt-1">
                      {selectedApplicant.incomeConsistencyRating}
                    </div>
                    <span className="text-[10px] text-slate-500 block">&lt; 7% monthly variance</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[11px] font-medium text-slate-500 block">Expense Ratio</span>
                    <div className="text-base font-bold text-slate-900 font-mono tabular-nums mt-1">
                      {selectedApplicant.expenseToIncomeRatio}
                    </div>
                    <span className="text-[10px] text-slate-500 block">Sustainable buffer</span>
                  </div>
                </div>
              </div>

              {/* Consented Fields & Record Verification Status */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  02. Cryptographic Record Authenticity
                </h4>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Verified Evidence Records:</span>
                    <span className="font-mono font-bold text-slate-900">{selectedApplicant.verifiedRecordsCount} Documents (SHA-256 Validated)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Overdraft / NSF Occurrences (180d):</span>
                    <span className="font-mono font-bold text-emerald-700">0 Events (Clean Audit)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Consented Data Scope:</span>
                    <span className="text-slate-600 font-medium">{selectedApplicant.consentedDataFields.join(' · ')}</span>
                  </div>
                </div>
              </div>

              {/* Explainable Assessment Factors Checklist */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  03. Explainable Underwriting Assessment Factors
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-950 font-semibold">Factor 1: Multi-Platform Inflow Redundancy</strong>
                      <p className="text-emerald-800 text-[11px] mt-0.5">
                        Applicant receives income across Stripe and Upwork Enterprise, mitigating single-client dependency risk.
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/50 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-emerald-950 font-semibold">Factor 2: Positive Operating Reserve Accumulation</strong>
                      <p className="text-emerald-800 text-[11px] mt-0.5">
                        Net monthly reserve additions averaged +$4,000/mo over 6 months, establishing strong repayment safety cushion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Underwriter Notes & Collaborative Dossier */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    04. Underwriter Risk Notes
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Audited by Elena Vance · ISO 27001 Logged
                  </span>
                </div>

                <textarea
                  rows={3}
                  value={underwriterNotes}
                  onChange={(e) => setUnderwriterNotes(e.target.value)}
                  placeholder="Record your formal underwriting rationale here..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-teal-500 leading-relaxed"
                />

                <div className="mt-3 flex items-center justify-end">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Underwriter Notes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
