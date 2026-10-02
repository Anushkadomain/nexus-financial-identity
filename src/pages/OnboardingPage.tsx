import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Building, 
  Lock, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  Store,
  Sparkles,
  FileCheck
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { UserPersona } from '../types';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserPersona, showToast } = useNexus();

  const [step, setStep] = useState(1);
  const [selectedPersona, setSelectedPersona] = useState<UserPersona>('freelancer');
  const [connectedSources, setConnectedSources] = useState<string[]>(['Stripe', 'Upwork']);
  const [defaultValidity, setDefaultValidity] = useState('30_days');
  const [maskPii, setMaskPii] = useState(true);
  const [generating, setGenerating] = useState(false);

  const personaOptions = [
    {
      id: 'freelancer',
      title: 'Freelancer & Consultant',
      subtitle: 'Client retainers, Upwork contracts, Stripe invoices',
      icon: Briefcase
    },
    {
      id: 'student',
      title: 'Student & Academic Fellow',
      subtitle: 'Stipends, assistantships, scholarship disbursements',
      icon: GraduationCap
    },
    {
      id: 'gig_worker',
      title: 'Gig Economy Contractor',
      subtitle: 'Rideshare, delivery apps, on-demand task platforms',
      icon: TrendingUp
    },
    {
      id: 'small_business',
      title: 'Small Business / Shop Owner',
      subtitle: 'Point-of-sale merchant terminals, vendor sales',
      icon: Store
    },
  ];

  const sourceOptions = [
    { name: 'Stripe', desc: 'Direct merchant payout & invoicing history' },
    { name: 'Upwork', desc: 'Enterprise milestone payouts & client ratings' },
    { name: 'Bank of America / Chase', desc: 'Encrypted checking cash-flow aggregates' },
    { name: 'PayPal Business', desc: 'International client settlements & balance' },
    { name: 'Square POS', desc: 'Retail and countertop card sales' },
    { name: 'Uber / DoorDash', desc: 'Weekly gig contractor direct deposits' },
  ];

  const toggleSource = (source: string) => {
    if (connectedSources.includes(source)) {
      setConnectedSources(connectedSources.filter((s) => s !== source));
    } else {
      setConnectedSources([...connectedSources, source]);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      const match = personaOptions.find((p) => p.id === selectedPersona);
      if (match) updateUserPersona(selectedPersona, match.title);
      setStep(2);
    } else if (step === 2) {
      if (connectedSources.length === 0) {
        showToast('Source Required', 'Select at least one source to seed your alternative profile.', 'warning');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setGenerating(true);
      setTimeout(() => {
        setGenerating(false);
        showToast('Passport Activated', 'Your Financial Trust Passport has been initialized.', 'success');
        navigate('/dashboard');
      }, 900);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-2xl mx-auto">
        {/* Header with Step Tracker */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              N
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">NEXUS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Financial Identity Onboarding
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Build your portable alternative credibility in 4 simple steps.
          </p>

          {/* Stepper bar */}
          <div className="flex items-center justify-between mt-6 max-w-md mx-auto">
            {['Persona', 'Feeds', 'Privacy', 'Passport'].map((name, i) => {
              const stepNumber = i + 1;
              const isPassed = step > stepNumber;
              const isCurrent = step === stepNumber;
              return (
                <div key={name} className="flex-1 flex flex-col items-center relative">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      isPassed
                        ? 'bg-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isPassed ? <Check className="w-3.5 h-3.5" /> : stepNumber}
                  </div>
                  <span
                    className={`text-[11px] mt-1 font-medium ${
                      isCurrent ? 'text-blue-700 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          {/* Step 1: Persona */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Step 1: Choose Your Primary Financial Profile
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  This customizes the cash-flow evaluation rules suited to your income structure.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {personaOptions.map((p) => {
                  const Icon = p.icon;
                  const isSelected = selectedPersona === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPersona(p.id as UserPersona)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/40 ring-1 ring-blue-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                      <div className="font-bold text-slate-900 text-xs">{p.title}</div>
                      <div className="text-[11px] text-slate-500 mt-1 leading-snug">{p.subtitle}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Connect Sources */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Step 2: Connect Verified Data Sources
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select which platforms to authenticate. Read-only, cryptographically hashed.
                </p>
              </div>

              <div className="space-y-2.5 pt-2">
                {sourceOptions.map((src) => {
                  const isConnected = connectedSources.includes(src.name);
                  return (
                    <div
                      key={src.name}
                      onClick={() => toggleSource(src.name)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        isConnected
                          ? 'border-blue-500 bg-blue-50/30'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                            isConnected ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-300 bg-white'
                          }`}
                        >
                          {isConnected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800 text-xs">{src.name}</div>
                          <div className="text-[11px] text-slate-500">{src.desc}</div>
                        </div>
                      </div>
                      <span className={`text-[11px] font-mono ${isConnected ? 'text-blue-700 font-semibold' : 'text-slate-400'}`}>
                        {isConnected ? 'Connected' : 'Click to Link'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Consent & Privacy */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Step 3: Define Your Default Privacy & Consent Policy
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  You stay in charge. Institutions never receive silent or permanent access.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Default Validity For New Share Tokens
                    </label>
                    <select
                      value={defaultValidity}
                      onChange={(e) => setDefaultValidity(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
                    >
                      <option value="7_days">7 Days (Standard Rental Application)</option>
                      <option value="30_days">30 Days (Commercial Loan Review)</option>
                      <option value="90_days">90 Days (Active Working Capital Facility)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <div>
                      <div className="text-xs font-semibold text-slate-800">Mask PII & Account Details</div>
                      <div className="text-[11px] text-slate-500">
                        Hides individual client names and banking routing numbers from institutional summaries.
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setMaskPii(!maskPii)}
                      className={`w-10 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                        maskPii ? 'bg-blue-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                          maskPii ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2 text-[11px] text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <p>
                    <strong>Consent Guarantee: </strong> You can review, modify, or immediately revoke every active partner access token from your Privacy Center at any time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Passport Activation */}
          {step === 4 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-8 h-8" />
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                Ready to Activate Financial Trust Passport
              </h2>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                NEXUS has indexed <strong className="text-slate-800">{connectedSources.length} verified feeds</strong> and generated your unique passport identifier:
              </p>

              <div className="max-w-xs mx-auto p-3.5 bg-slate-900 text-white rounded-xl text-xs font-mono">
                <div className="text-[10px] text-slate-400">PASSPORT ID:</div>
                <div className="text-sm font-bold text-blue-300">{user.passportId}</div>
                <div className="text-[10px] text-emerald-400 mt-1">✓ SHA-256 Ledger Initialized</div>
              </div>

              <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                Next, explore your live cash-flow health metrics and generate your first share token.
              </p>
            </div>
          )}

          {/* Step Navigation Buttons */}
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5 rounded-lg"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNextStep}
              disabled={generating}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-2xs transition-colors"
            >
              <span>{generating ? 'Finalizing...' : step === 4 ? 'Enter Dashboard' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
