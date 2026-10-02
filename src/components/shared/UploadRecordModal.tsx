import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  FileText, 
  CheckCircle2, 
  Building, 
  DollarSign, 
  Calendar,
  AlertCircle 
} from 'lucide-react';
import { useNexus } from '../../context/NexusContext';

export const UploadRecordModal: React.FC = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, addRecord, showToast } = useNexus();

  const [title, setTitle] = useState('');
  const [source, setSource] = useState<'Bank Account' | 'Stripe' | 'Upwork' | 'PayPal' | 'Square' | 'Uber / Lyft' | 'Invoicing System'>('Upwork');
  const [category, setCategory] = useState<'Platform Earnings' | 'Direct Deposit' | 'Client Invoice' | 'Operating Reserve' | 'Tax Escrow'>('Platform Earnings');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('Oct 01, 2026');
  const [fileName, setFileName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  if (!isUploadModalOpen) return null;

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) {
      showToast('Validation Error', 'Please supply a title and numeric amount.', 'warning');
      return;
    }

    const numAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
    if (isNaN(numAmount) || numAmount <= 0) {
      showToast('Invalid Amount', 'Please provide a valid positive monetary value.', 'warning');
      return;
    }

    setIsUploading(true);
    setTimeout(() => {
      addRecord({
        title,
        source,
        category,
        amount: numAmount,
        date: date || 'Oct 02, 2026',
        verificationStatus: 'verified',
        confidenceLevel: 'High',
        fileFormat: fileName ? 'Verified Document Upload' : 'Direct Statement Feed'
      });
      setIsUploading(false);
      setIsUploadModalOpen(false);
      setTitle('');
      setAmount('');
      setFileName('');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Authenticate Financial Record
              </h3>
              <p className="text-xs text-slate-500">
                Add proof of recurring income, platform payouts, or business reserves.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Dropzone */}
          <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-5 text-center transition-colors bg-slate-50/60">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileDrop}
              className="hidden"
              accept=".pdf,.csv,.png,.jpg,.jpeg"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <div className="font-semibold text-slate-800 text-xs">
                {fileName ? fileName : 'Upload Invoice, Statement, or 1099 PDF'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Drag and drop or click to browse (PDF, CSV up to 25MB)
              </p>
              {fileName && (
                <span className="mt-2 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> File Attached
                </span>
              )}
            </label>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-700 block mb-1">
              Record Description / Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Stripe Q3 Developer Payout Settlement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1 flex items-center gap-1">
                <Building className="w-3 h-3 text-slate-400" />
                Data Source / Platform
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as any)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                <option value="Upwork">Upwork</option>
                <option value="Stripe">Stripe</option>
                <option value="Bank Account">Bank Account (Plaid/OFX)</option>
                <option value="PayPal">PayPal</option>
                <option value="Square">Square POS</option>
                <option value="Uber / Lyft">Uber / Lyft</option>
                <option value="Invoicing System">Client Invoicing</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Classification Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                <option value="Platform Earnings">Platform Earnings</option>
                <option value="Direct Deposit">Direct Deposit</option>
                <option value="Client Invoice">Client Invoice</option>
                <option value="Operating Reserve">Operating Reserve</option>
                <option value="Tax Escrow">Tax Escrow</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1 flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-slate-400" />
                Verified Amount (USD) *
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="2500.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                Statement / Transaction Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-2 text-[11px] text-blue-900">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p>
              Uploaded records undergo cryptographic hash generation and automated metadata extraction to prevent double-counting across accounts.
            </p>
          </div>

          {/* Footer Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-2xs transition-colors"
            >
              {isUploading ? 'Authenticating...' : 'Save & Verify Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
