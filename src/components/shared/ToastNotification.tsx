import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useNexus } from '../../context/NexusContext';

export const ToastNotification: React.FC = () => {
  const { toasts, removeToast } = useNexus();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-white border border-slate-200 rounded-xl p-3.5 shadow-lg flex items-start gap-3 transition-all duration-200 animate-in fade-in slide-in-from-bottom-3"
          >
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            )}
            {toast.type === 'warning' && (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            {toast.type === 'info' && (
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            )}

            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold text-slate-900 leading-tight">
                {toast.title}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {toast.description}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded focus:outline-hidden"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
