import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Bell, 
  Download, 
  Trash2, 
  Key, 
  Save, 
  Sparkles,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { UserPersona } from '../types';

export const SettingsPage: React.FC = () => {
  const { user, updateUserPersona, showToast } = useNexus();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [persona, setPersona] = useState<UserPersona>(user.persona);
  const [personaTitle, setPersonaTitle] = useState(user.personaTitle);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [tokenAlerts, setTokenAlerts] = useState(true);
  const [twoFactorActive, setTwoFactorActive] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserPersona(persona, personaTitle);
    showToast('Profile Saved', 'Financial persona and details updated.', 'success');
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({
      passportId: user.passportId,
      user: { name, email, persona, personaTitle },
      auditStamp: new Date().toISOString(),
      protocol: 'NEXUS-V1-ALTERNATIVE-CREDENTIAL'
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `nexus_passport_${user.passportId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Export Generated', 'Complete financial identity JSON archive downloaded.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
          Account Profile & Security Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
          Manage your personal verification credentials, data export, and security keys.
        </p>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveProfile} className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-6 shadow-2xs">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-2xs"
            referrerPolicy="no-referrer"
          />
          <div>
            <h3 className="text-sm font-bold text-slate-900">{user.name}</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Passport ID: {user.passportId}
            </p>
            <div className="flex items-center gap-2 mt-1.5 text-[11px] text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Identity Verified via Multi-Factor Check</span>
            </div>
          </div>
        </div>

        {/* Profile Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Full Legal Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Primary Account Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Financial Persona Profile
            </label>
            <select
              value={persona}
              onChange={(e) => {
                const newPersona = e.target.value as UserPersona;
                setPersona(newPersona);
                if (newPersona === 'freelancer') setPersonaTitle('Independent Software Engineer & Product Designer');
                if (newPersona === 'student') setPersonaTitle('Graduate Student & AI Research Fellow');
                if (newPersona === 'gig_worker') setPersonaTitle('Logistics Fleet Contractor & Rideshare Lead');
                if (newPersona === 'small_business') setPersonaTitle('Specialty Coffee Roastery & Retail Founder');
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            >
              <option value="freelancer">Freelancer & Consultant</option>
              <option value="student">Student & Academic Fellow</option>
              <option value="gig_worker">Gig Economy Contractor</option>
              <option value="small_business">Small Business Owner</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              Declared Professional Title
            </label>
            <input
              type="text"
              value={personaTitle}
              onChange={(e) => setPersonaTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile Updates</span>
          </button>
        </div>
      </form>

      {/* Security & Alerts */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-2xs text-xs">
        <h3 className="text-sm font-bold text-slate-900">
          Security & Partner Inquiry Alerts
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <div className="font-semibold text-slate-800">Token Query Push Alerts</div>
              <div className="text-[11px] text-slate-500">
                Receive an immediate notification whenever an authorized institution checks your passport.
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTokenAlerts(!tokenAlerts)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                tokenAlerts ? 'bg-blue-600' : 'bg-slate-300'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  tokenAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <div>
              <div className="font-semibold text-slate-800">Two-Factor Authentication (2FA)</div>
              <div className="text-[11px] text-slate-500">
                Protects token creation and record uploading with hardware security keys or authenticator apps.
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded font-semibold">
              Enforced
            </span>
          </div>
        </div>
      </div>

      {/* Data Export & Sovereignty */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-2xs text-xs">
        <h3 className="text-sm font-bold text-slate-900">
          Data Portability & Deletion
        </h3>
        <p className="text-slate-500 text-xs">
          NEXUS supports full GDPR, CCPA, and Open Banking data sovereignty rights.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleExportData}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Complete Financial Dossier (JSON)</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Account Locked', 'Data deletion request queued with 48h safety hold.', 'warning')}
            className="px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Request Account Purge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
