import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Lock, Mail, KeyRound, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNexus } from '../context/NexusContext';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useNexus();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('arslan.tariq@nexustrust.io');
  const [password, setPassword] = useState('••••••••••••');
  const [fullName, setFullName] = useState('Arslan Tariq');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Welcome to NEXUS', isSignUp ? 'Account created successfully.' : 'Signed into your verified dashboard.', 'success');
      navigate(isSignUp ? '/onboarding' : '/dashboard');
    }, 600);
  };

  const handleDemoSignIn = (persona: 'freelancer' | 'student' | 'gig_worker') => {
    showToast('Demo Environment Initialized', `Loaded ${persona} verification session.`, 'info');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-blue-100 selection:text-blue-900">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-xs shadow-blue-500/20">
            N
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            NEXUS
          </span>
        </Link>
        <h2 className="text-xl font-bold tracking-tight text-slate-900">
          {isSignUp ? 'Create your Financial Trust Passport' : 'Sign in to your NEXUS account'}
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Consent-governed alternative financial credibility.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-10 space-y-6">
          {/* Quick Demo Fill Buttons for Judges */}
          <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-blue-900">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Quick Test Credentials
              </span>
              <span className="font-mono text-[10px] text-blue-600 bg-blue-100/60 px-1.5 py-0.5 rounded">DEMO READY</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => handleDemoSignIn('freelancer')}
                className="px-2 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded text-[11px] font-medium text-slate-700 text-left transition-colors truncate"
              >
                Arslan (Freelancer)
              </button>
              <button
                type="button"
                onClick={() => handleDemoSignIn('student')}
                className="px-2 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded text-[11px] font-medium text-slate-700 text-left transition-colors truncate"
              >
                Maya (Student/AI)
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isSignUp && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
            )}

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <label className="flex items-center gap-1.5 text-slate-600">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-blue-600" />
                <span>Remember this workstation</span>
              </label>
              <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-2xs text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>{loading ? 'Authenticating...' : isSignUp ? 'Create Trust Passport' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Switch mode */}
          <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
            {isSignUp ? (
              <span>
                Already have an authenticated passport?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Sign in
                </button>
              </span>
            ) : (
              <span>
                Don't have an account yet?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Create one now
                </button>
              </span>
            )}
          </div>

          {/* Privacy Note */}
          <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>NEXUS stores zero unencrypted banking credentials.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
