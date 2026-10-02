import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  subtext: string;
  trend?: {
    value: string;
    isPositive: boolean;
    period: string;
  };
  indicator?: 'healthy' | 'neutral' | 'attention';
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  trend,
  indicator = 'healthy',
  icon
}) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-2xs hover:border-slate-300 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <div className="text-slate-400">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-slate-900 font-mono tabular-nums">
          {value}
        </span>
      </div>

      <div className="mt-2.5 flex items-center gap-2 text-xs">
        {trend && (
          <span 
            className={`font-semibold flex items-center font-mono tabular-nums ${
              trend.isPositive ? 'text-emerald-700' : 'text-slate-600'
            }`}
          >
            {trend.isPositive ? (
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
            ) : (
              <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />
            )}
            {trend.value}
          </span>
        )}

        {trend && <span className="text-slate-300" aria-hidden="true">·</span>}

        <span className="text-slate-500 truncate">
          {subtext}
        </span>
      </div>
    </div>
  );
};
