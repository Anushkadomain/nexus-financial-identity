import React, { useState } from 'react';
import { 
  KeyRound, 
  ShieldCheck, 
  Lock, 
  Building2, 
  Trash2, 
  AlertTriangle, 
  Plus, 
  Clock, 
  CheckCircle2, 
  Sliders, 
  EyeOff, 
  FileCheck 
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { ConsentPartner } from '../types';

export const PrivacyPage: React.FC = () => {
  const { partners, revokeConsent, openConsentModal, showToast } = useNexus();
  const [dataMinimizationActive, setDataMinimizationActive] = useState(true);
  const [sessionAutoExpiry, setSessionAutoExpiry] = useState(true);

  const activePartners = partners.filter((p) => p.status === 'active');
  const revokedPartners = partners.filter((p) => p.status === 'revoked');

  const handleRevoke = (id: string, name: string) => {
    revokeConsent(id);
  };

  const handleAuditDownload = () => {
    showToast('Audit Log Exported', 'Immutable cryptographic access log downloaded in CSV format.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Privacy & Consent Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Cryptographic governance over which institutions may query your alternative financial passport.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAuditDownload}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <FileCheck className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Access Log</span>
          </button>
          <button
            onClick={() => openConsentModal(null)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Grant New Permission</span>
          </button>
        </div>
      </div>

      {/* Zero Silent Sharing Declaration Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 relative overflow-hidden shadow-sm">
        <div className="max-w-2xl relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono font-semibold">
            <Lock className="w-4 h-4 text-blue-400" />
            <span>CORE PROTOCOL RULE: ZERO SILENT SHARING</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            You retain absolute sovereignty over your financial identity.
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Unlike legacy credit rating bureaus that sell consumer inquiry histories and debt profiles to third-party marketers, NEXUS never transmits data without explicit, cryptographic customer authorization. Every session is time-limited and instantly revocable.
          </p>
        </div>
      </div>

      {/* Active Consented Institutions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Authorized Institutions ({activePartners.length})
            </h3>
            <p className="text-xs text-slate-500">
              Partners currently possessing an active, read-only token to query specified passport indicators.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activePartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold flex items-center justify-center text-sm border border-blue-100">
                    {partner.logoText}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {partner.name}
                    </h4>
                    <div className="text-[11px] text-slate-500">
                      {partner.type}
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Active Token
                </span>
              </div>

              {/* Purpose & Access Level */}
              <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Scope:</span>
                  <span className="font-semibold text-slate-800">{partner.accessLevel}</span>
                </div>
                <div className="text-[11px] text-slate-600 leading-normal pt-1">
                  <strong>Declared Purpose:</strong> {partner.purpose}
                </div>
              </div>

              {/* Disclosed Fields */}
              <div className="space-y-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Permitted Indicators:
                </span>
                <div className="flex flex-wrap gap-1">
                  {partner.requestedFields.map((field, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded"
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dates & Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-400 font-mono">
                  Expires: <strong className="text-slate-700">{partner.expiryDate}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openConsentModal(partner)}
                    className="px-2.5 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded text-xs font-medium transition-colors"
                  >
                    Adjust Scope
                  </button>
                  <button
                    onClick={() => handleRevoke(partner.id, partner.name)}
                    className="px-2.5 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded text-xs font-semibold transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Revoke</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revoked & Expired History */}
      {revokedPartners.length > 0 && (
        <div className="space-y-3 pt-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Revoked & Expired Access History ({revokedPartners.length})
            </h3>
            <p className="text-xs text-slate-500">
              Tokens that have been explicitly terminated. These institutions receive 403 Access Denied.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 divide-y divide-slate-100 overflow-hidden text-xs">
            {revokedPartners.map((partner) => (
              <div key={partner.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-400 font-bold flex items-center justify-center text-xs">
                    {partner.logoText}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 text-xs">{partner.name}</div>
                    <div className="text-[11px] text-slate-400">
                      Scope: {partner.accessLevel} · Purpose: {partner.purpose}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-red-700 bg-red-50 px-2 py-0.5 rounded font-medium">
                    Access Revoked
                  </span>
                  <button
                    onClick={() => openConsentModal(partner)}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Re-authorize
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Rules & Security Governance */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          Global Protocol Protection Controls
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <div className="font-bold text-slate-900">Data Minimization Filter</div>
              <div className="text-[11px] text-slate-500">
                Automatically masks merchant transaction line items and personal account routing numbers.
              </div>
            </div>
            <button
              onClick={() => {
                setDataMinimizationActive(!dataMinimizationActive);
                showToast('Setting Updated', `Data minimization is now ${!dataMinimizationActive ? 'Enabled' : 'Disabled'}.`, 'info');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                dataMinimizationActive ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  dataMinimizationActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <div className="font-bold text-slate-900">Automatic Session Expiration (TTL)</div>
              <div className="text-[11px] text-slate-500">
                Ensures every granted token automatically self-terminates after 30 days maximum.
              </div>
            </div>
            <button
              onClick={() => {
                setSessionAutoExpiry(!sessionAutoExpiry);
                showToast('Setting Updated', `TTL policy updated.`, 'info');
              }}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                sessionAutoExpiry ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  sessionAutoExpiry ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
