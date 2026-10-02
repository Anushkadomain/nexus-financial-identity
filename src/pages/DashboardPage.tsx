import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Lock, 
  AlertCircle,
  FileText,
  CheckCircle2,
  PieChart,
  Layers
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { MetricCard } from '../components/shared/MetricCard';
import { CashFlowChart } from '../components/shared/CashFlowChart';
import { InsightCard } from '../components/shared/InsightCard';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    cashFlowData, 
    insights, 
    records, 
    setIsShareModalOpen, 
    setIsReportModalOpen 
  } = useNexus();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Good morning, {user.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Here is a simple overview of your financial profile.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <FileText className="w-3.5 h-3.5 text-slate-500" />
            <span>View Sample Report</span>
          </button>
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Share Passport</span>
          </button>
        </div>
      </div>

      {/* Component A: Financial Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  {user.name}
                </h2>
                <span className="text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {user.verificationStatus}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {user.personaTitle}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 font-mono">
                <span>Passport ID: <strong className="text-slate-700">{user.passportId}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Last updated: {user.lastUpdated}</span>
              </div>
            </div>
          </div>

          {/* Profile Completion & Quick Action */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:w-96">
            <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl p-3">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700">Profile Completion</span>
                <span className="font-bold text-blue-600 font-mono tabular-nums">{user.profileCompletion}%</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${user.profileCompletion}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 mt-1.5 flex items-center justify-between">
                <span>5 of 5 records indexed</span>
                <span className="text-emerald-700 font-medium">Ready to share</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/passport')}
              className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs whitespace-nowrap"
            >
              <span>View Passport</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Component B: Financial Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Monthly Inflow"
          value={`$${user.inflowAverage.toLocaleString()}`}
          subtext="6-month rolling avg"
          trend={{ value: '+14.2%', isPositive: true, period: 'vs prior base' }}
          icon={<DollarSign className="w-4 h-4" />}
        />
        <MetricCard
          label="Monthly Outflow"
          value={`$${user.outflowAverage.toLocaleString()}`}
          subtext="Operating expenses"
          trend={{ value: '53.9%', isPositive: true, period: 'healthy ratio' }}
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <MetricCard
          label="Net Savings Trend"
          value={`+$${(user.inflowAverage - user.outflowAverage).toLocaleString()}`}
          subtext="Monthly reserve addition"
          trend={{ value: '+$4.1k/mo', isPositive: true, period: 'surplus' }}
          icon={<PieChart className="w-4 h-4" />}
        />
        <MetricCard
          label="Cash-Flow Consistency"
          value={`${user.consistencyScore}%`}
          subtext="Stability benchmark"
          trend={{ value: '< 7%', isPositive: true, period: 'low variance' }}
          icon={<ShieldCheck className="w-4 h-4" />}
        />
      </div>

      {/* Component C: Cash-Flow Chart */}
      <CashFlowChart data={cashFlowData} />

      {/* Grid: Insights (Component D) + Profile Breakdown (Component E) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Component D: Financial Insights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                AI Financial Insights
              </h3>
              <p className="text-xs text-slate-500">
                Pattern explanations derived from authenticated transactions.
              </p>
            </div>
            <button
              onClick={() => navigate('/insights')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
            >
              View all 4 insights →
            </button>
          </div>

          <div className="space-y-3">
            {insights.slice(0, 3).map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </div>

          {/* Informational Disclaimer */}
          <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              <strong>Informational Disclaimer: </strong> These insights are informational and do not constitute a credit decision, credit score, or formal financial advice.
            </p>
          </div>
        </div>

        {/* Component E: Financial Profile Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Financial Profile Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Underlying indicators evaluated by institutional reviewers.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200/90 p-5 space-y-4 shadow-2xs">
            {/* Income consistency */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Income Consistency</span>
                <span className="font-mono font-bold text-emerald-700">High (94%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '94%' }} />
              </div>
              <p className="text-[11px] text-slate-500">
                Recurring monthly payouts received across Stripe and Upwork.
              </p>
            </div>

            {/* Savings pattern */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Savings Pattern</span>
                <span className="font-mono font-bold text-blue-700">Positive (+46%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '86%' }} />
              </div>
              <p className="text-[11px] text-slate-500">
                Average monthly surplus of $4,000 kept in operating checking.
              </p>
            </div>

            {/* Expense management */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Expense Management</span>
                <span className="font-mono font-bold text-slate-800">Disciplined (53.9%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-700 h-full rounded-full" style={{ width: '78%' }} />
              </div>
              <p className="text-[11px] text-slate-500">
                Outflows well within sustainable operating revenue thresholds.
              </p>
            </div>

            {/* Record completeness */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800">Record Completeness</span>
                <span className="font-mono font-bold text-blue-700">92%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '92%' }} />
              </div>
              <p className="text-[11px] text-slate-500">
                5 authenticated proof records on file. Zero overdraft flags.
              </p>
            </div>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => navigate('/transactions')}
                className="w-full py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Filter Historical Transactions Ledger</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate('/records')}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Manage Connected Feeds & Records</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
