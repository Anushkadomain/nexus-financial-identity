import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  X, 
  Clock, 
  Building2, 
  Check, 
  AlertTriangle 
} from 'lucide-react';
import { useNexus } from '../../context/NexusContext';

export const ConsentModal: React.FC = () => {
  const { 
    isConsentModalOpen, 
    setIsConsentModalOpen, 
    activeConsentPartner, 
    grantConsent, 
    revokeConsent,
    showToast 
  } = useNexus();

  const [partnerName, setPartnerName] = useState(activeConsentPartner?.name || 'Apex Capital Partners');
  const [partnerType, setPartnerType] = useState(activeConsentPartner?.type || 'Lender');
  const [duration, setDuration] = useState('30_days');
  const [purpose, setPurpose] = useState(activeConsentPartner?.purpose || 'Working capital verification and risk assessment');
  const [selectedFields, setSelectedFields] = useState<string[]>([
    '6-Month Inflow & Outflow History',
    'Direct Platform Verification (Stripe & Upwork)',
    'Expense-to-Income Ratio Trend'
  ]);
  const [accessLevel, setAccessLevel] = useState<'Full Passport' | 'Income Verification Only' | 'Cash-Flow Summary'>('Full Passport');

  if (!isConsentModalOpen) return null;

  const availableFields = [
    { id: 'f1', label: '6-Month Inflow & Outflow History', desc: 'Monthly cash aggregates without individual itemized personal spending.' },
    { id: 'f2', label: 'Direct Platform Verification (Stripe & Upwork)', desc: 'Cryptographically signed platform receipts confirming independent income.' },
    { id: 'f3', label: 'Expense-to-Income Ratio Trend', desc: 'Quarterly ratio proving operational cashflow discipline.' },
    { id: 'f4', label: 'Checking Balance Reserve Cushion', desc: 'Confirmation of 3+ months average liquidity buffer.' },
  ];

  const toggleField = (label: string) => {
    if (selectedFields.includes(label)) {
      if (selectedFields.length > 1) {
        setSelectedFields(selectedFields.filter((f) => f !== label));
      } else {
        showToast('Required Field', 'At least one financial data field must be specified.', 'warning');
      }
    } else {
      setSelectedFields([...selectedFields, label]);
    }
  };

  const handleConfirm = () => {
    if (activeConsentPartner?.id) {
      // renew/update
      showToast('Consent Renewed', `Access token updated for ${activeConsentPartner.name}.`, 'success');
    } else {
      grantConsent({
        name: partnerName,
        type: partnerType as any,
        logoText: partnerName.slice(0, 2).toUpperCase(),
        requestedFields: selectedFields,
        purpose,
        expiryDate: duration === '7_days' ? 'Oct 09, 2026' : duration === '30_days' ? 'Nov 02, 2026' : 'Jan 02, 2027',
        accessLevel
      });
    }
    setIsConsentModalOpen(false);
  };

  const handleRevoke = () => {
    if (activeConsentPartner?.id) {
      revokeConsent(activeConsentPartner.id);
    }
    setIsConsentModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Consent-Based Data Sharing Agreement
              </h3>
              <p className="text-xs text-slate-500">
                You retain complete revocable control over your financial records.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsConsentModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Recipient & Purpose Section */}
          <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-blue-950 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-600" />
                Authorized Recipient
              </span>
              <span className="text-[11px] font-mono text-blue-700 font-medium bg-blue-100/60 px-2 py-0.5 rounded">
                Verified Institution
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">
                  Recipient Organization
                </label>
                <input
                  type="text"
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-500 block mb-1">
                  Institution Type
                </label>
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value as any)}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Lender">Fintech Lender / Credit Provider</option>
                  <option value="Landlord & Property Manager">Landlord & Property Manager</option>
                  <option value="Equipment Financing">Equipment Leasing Company</option>
                  <option value="Fintech Underwriting">Underwriting Risk Service</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-medium text-slate-500 block mb-1">
                Declared Purpose for Data Access
              </label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Granular What Will Be Shared */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-900 text-xs">
                Select Exact Attributes To Disclose
              </span>
              <span className="text-[11px] text-slate-400">
                Never exposes raw account numbers or logins
              </span>
            </div>

            <div className="space-y-2">
              {availableFields.map((field) => {
                const isSelected = selectedFields.includes(field.label);
                return (
                  <div
                    key={field.id}
                    onClick={() => toggleField(field.label)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-blue-300 bg-blue-50/30'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-slate-800 text-xs">
                        {field.label}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {field.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Duration & Access Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Consent Validity Duration
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                <option value="7_days">7 Days (Single Application Review)</option>
                <option value="30_days">30 Days (Standard Underwriting)</option>
                <option value="90_days">90 Days (Ongoing Credit Facility)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                Access Depth Level
              </label>
              <select
                value={accessLevel}
                onChange={(e) => setAccessLevel(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                <option value="Full Passport">Full Trust Passport (All Selected)</option>
                <option value="Income Verification Only">Income Verification Only</option>
                <option value="Cash-Flow Summary">Cash-Flow Summary (High Level)</option>
              </select>
            </div>
          </div>

          {/* Protection Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-100 border border-slate-200/80 text-[11px] text-slate-600">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800 font-semibold">Zero Silent Sharing: </strong>
              NEXUS never transmits alternative financial metrics without active, cryptographic consent. You may revoke access at any time from your Privacy & Consent Center.
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between">
          {activeConsentPartner?.status === 'active' ? (
            <button
              onClick={handleRevoke}
              className="px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              Revoke Existing Access
            </button>
          ) : (
            <button
              onClick={() => setIsConsentModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsConsentModalOpen(false)}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Authorize & Sign Token</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
