import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart, 
  ShieldCheck, 
  Info 
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { useNexus } from '../context/NexusContext';
import { InsightCard } from '../components/shared/InsightCard';

export const InsightsPage: React.FC = () => {
  const { insights, cashFlowData, user, setIsUploadModalOpen, showToast } = useNexus();
  const [filter, setFilter] = useState<'all' | 'income' | 'spending' | 'records'>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const spendingTrendData = cashFlowData.map((d) => ({
    month: d.month,
    inflow: d.inflow,
    outflow: d.outflow,
    burnRate: Math.round((d.outflow / d.inflow) * 100)
  }));

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Insights Re-evaluated', 'Algorithms reviewed all 5 connected financial feeds.', 'info');
    }, 600);
  };

  const filteredInsights = insights.filter((item) => {
    if (filter === 'income') return item.category === 'Income Consistency';
    if (filter === 'spending') return item.category === 'Spending Trend';
    if (filter === 'records') return item.category === 'Profile Completeness';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            AI Financial Insights
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Transparent, explainable diagnostics generated from your consent-linked financial records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Re-evaluate Records</span>
          </button>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Add Feeds to Improve Profile</span>
          </button>
        </div>
      </div>

      {/* Mandatory Regulatory & Informational Disclaimer */}
      <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-950">
        <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-amber-900">Regulatory Disclaimer:</span>
          <p className="leading-relaxed text-amber-800">
            These insights are informational and do not constitute a credit decision, formal lending commitment, or certified financial advice. All indicators reflect past transaction movements across connected accounts and are shared solely under your explicit instruction.
          </p>
        </div>
      </div>

      {/* High-level 3-Factor Behavioral Diagnostic Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
            <span>Cash-Flow Pattern Analysis</span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 text-lg font-bold text-slate-900">Stable Growth Trajectory</div>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Your recorded income has followed a relatively stable pattern across 180 days, averaging $8,683/mo.
          </p>
          <div className="mt-3 text-[11px] font-mono font-semibold text-emerald-700 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            +7.8% higher than initial quarter
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
            <span>Spending Trend Diagnostic</span>
            <PieChart className="w-4 h-4 text-slate-500" />
          </div>
          <div className="mt-2 text-lg font-bold text-slate-900">Controlled Reserve Outflow</div>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Your spending increased slightly during September to $5,250, remaining under 55% of total inflow.
          </p>
          <div className="mt-3 text-[11px] font-mono text-slate-600">
            Burn-to-revenue ratio: <strong className="text-slate-900">54.6%</strong>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase">
            <span>Record Completeness</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-lg font-bold text-slate-900 font-mono">92% Index Coverage</div>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Adding more verified financial records (like an extra merchant account) may help complete your profile to 100%.
          </p>
          <div className="mt-3 text-[11px] font-mono text-blue-700 font-semibold">
            5 Authenticated Feeds on File
          </div>
        </div>
      </div>

      {/* Spending Trend Visualization Chart */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              6-Month Income vs Spending Trend
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Visual confirmation of continuous net-positive operational liquidity.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
              <span className="text-slate-600 font-medium">Inflow</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 inline-block" />
              <span className="text-slate-600 font-medium">Outflow</span>
            </div>
          </div>
        </div>

        <div className="h-60 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={spendingTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} tickLine={false} />
              <YAxis 
                stroke="#94A3B8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(v) => `$${v / 1000}k`}
              />
              <Tooltip 
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, '']}
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.75rem', fontSize: '11px' }}
              />
              <Line type="monotone" dataKey="inflow" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="outflow" stroke="#94A3B8" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter Tabs & Detailed Insight Cards */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-sm font-bold text-slate-900">
            Categorized Algorithmic Findings
          </h3>

          <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('income')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filter === 'income' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Income Stability
            </button>
            <button
              onClick={() => setFilter('spending')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filter === 'spending' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Spending Ratio
            </button>
            <button
              onClick={() => setFilter('records')}
              className={`px-3 py-1 rounded-md transition-colors ${
                filter === 'records' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Completeness
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInsights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>
    </div>
  );
};
