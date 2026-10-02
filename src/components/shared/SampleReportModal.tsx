import React, { useRef } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  X, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { useNexus } from '../../context/NexusContext';

export const SampleReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, user, cashFlowData, records, showToast } = useNexus();
  const reportRef = useRef<HTMLDivElement>(null);

  if (!isReportModalOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('Report Downloaded', 'NEXUS Financial Trust Dossier (PDF format) generated.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Toolbar */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-800">
              Trust Dossier — Financial Credibility Certificate
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-200/60 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setIsReportModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200/60 ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document View */}
        <div ref={reportRef} className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-900 text-xs print:p-0">
          {/* Header */}
          <div className="border-b border-slate-200 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-slate-900">
                  NEXUS
                </span>
                <span className="text-xs font-mono font-medium text-slate-400">
                  / Alternative Financial Verification Dossier
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Cryptographically authenticated alternative cash-flow evaluation.
              </p>
            </div>

            <div className="text-left sm:text-right text-[11px] font-mono text-slate-500">
              <div>PASSPORT ID: <strong className="text-slate-900">{user.passportId}</strong></div>
              <div>DATE OF ISSUANCE: <strong>{user.lastUpdated}</strong></div>
              <div className="text-emerald-700 font-semibold flex items-center sm:justify-end gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                VERIFIED STATUS
              </div>
            </div>
          </div>

          {/* Subject Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Subject</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5">{user.name}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Declared Persona</div>
              <div className="text-xs font-medium text-slate-800 mt-0.5">{user.personaTitle}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Completeness</div>
              <div className="text-xs font-bold text-slate-900 mt-0.5 font-mono">{user.profileCompletion}% Authenticated</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400 uppercase font-medium">Verification Engine</div>
              <div className="text-xs font-medium text-slate-800 mt-0.5">SHA-256 Ledger Audit</div>
            </div>
          </div>

          {/* Core Quantitative Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              01. 6-Month Rolling Financial Performance Metrics
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-500 font-medium">Average Monthly Inflow</div>
                <div className="text-sm font-bold text-slate-900 font-mono tabular-nums mt-1">
                  ${user.inflowAverage.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Across verified feeds</div>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-500 font-medium">Average Monthly Outflow</div>
                <div className="text-sm font-bold text-slate-900 font-mono tabular-nums mt-1">
                  ${user.outflowAverage.toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Operating expenditures</div>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-500 font-medium">Net Monthly Reserve Add</div>
                <div className="text-sm font-bold text-emerald-700 font-mono tabular-nums mt-1">
                  +${(user.inflowAverage - user.outflowAverage).toLocaleString()}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Positive accumulation</div>
              </div>
              <div className="p-3 border border-slate-200 rounded-lg">
                <div className="text-[11px] text-slate-500 font-medium">Inflow Consistency Factor</div>
                <div className="text-sm font-bold text-blue-700 font-mono tabular-nums mt-1">
                  {user.consistencyScore}% Stable
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">&lt; 7% monthly variance</div>
              </div>
            </div>
          </div>

          {/* Cashflow Breakdown Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              02. Authenticated Monthly Cash-Flow Summary
            </h4>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 border-b border-slate-200">
                    <th className="py-2 px-3">Period</th>
                    <th className="py-2 px-3 text-right">Inflow ($)</th>
                    <th className="py-2 px-3 text-right">Outflow ($)</th>
                    <th className="py-2 px-3 text-right">Net Reserve ($)</th>
                    <th className="py-2 px-3 text-center">Stability Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {cashFlowData.map((row) => (
                    <tr key={row.month} className="hover:bg-slate-50/50">
                      <td className="py-2 px-3 font-sans font-medium text-slate-900">{row.month}</td>
                      <td className="py-2 px-3 text-right text-emerald-700 tabular-nums">${row.inflow.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right text-slate-700 tabular-nums">${row.outflow.toLocaleString()}</td>
                      <td className="py-2 px-3 text-right text-blue-700 tabular-nums">+${row.netSavings.toLocaleString()}</td>
                      <td className="py-2 px-3 text-center text-slate-600 font-sans">{row.consistencyScore}% High</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verified Evidence Sources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              03. Primary Records & Corroborating Data Feeds
            </h4>
            <div className="space-y-1.5">
              {records.slice(0, 4).map((rec) => (
                <div key={rec.id} className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">{rec.title}</div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        Source: {rec.source} · Ref: {rec.referenceId} · Date: {rec.date}
                      </div>
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-slate-900 text-xs">
                    ${rec.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Regulatory & Privacy Disclaimer */}
          <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2 text-[11px] text-amber-900">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              Regulatory & Evaluation Disclosure
            </div>
            <p className="leading-relaxed">
              <strong>Informational Notice: </strong> These alternative financial metrics, cash-flow indicators, and passport analyses are informational summaries compiled with the user's explicit consent. NEXUS is not a consumer reporting agency under the Fair Credit Reporting Act (FCRA). This dossier does not constitute a formal credit score, credit rating, guaranteed approval, or lending commitment. Institutional underwriters must perform independent verification and underwriting in accordance with applicable laws.
            </p>
            <div className="pt-1 text-slate-600 font-mono text-[10px] flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" />
              Your financial information is shared only with your explicit permission. Scoped session token.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500">
          <span>Signed via NEXUS Trust Network Protocol</span>
          <button
            onClick={() => setIsReportModalOpen(false)}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-medium transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
