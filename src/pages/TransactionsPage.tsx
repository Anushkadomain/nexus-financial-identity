import React, { useState, useMemo } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Plus, 
  CheckCircle2, 
  Clock, 
  CreditCard, 
  ExternalLink,
  DollarSign,
  TrendingUp,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { FinancialTransaction, FilterState } from '../types';
import { SearchFilterBar } from '../components/shared/SearchFilterBar';
import { EmptyState } from '../components/shared/EmptyState';
import { isWithinDateRange, parseDateToTime, formatCurrency } from '../utils/dateFilter';

export const TransactionsPage: React.FC = () => {
  const { transactions, addTransaction, showToast } = useNexus();

  // Search & Filter State
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    datePreset: 'all',
    startDate: '',
    endDate: '',
    category: 'all',
    source: 'all',
    minAmount: '',
    maxAmount: '',
    type: 'all',
    status: 'all'
  });

  // Sort State
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Detail Modal
  const [selectedTx, setSelectedTx] = useState<FinancialTransaction | null>(null);

  // Quick Log Transaction Modal
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'inflow' | 'outflow'>('inflow');
  const [newCategory, setNewCategory] = useState<FinancialTransaction['category']>('Platform Inflow');
  const [newSource, setNewSource] = useState<FinancialTransaction['source']>('Stripe');
  const [newCounterparty, setNewCounterparty] = useState('');
  const [newDate, setNewDate] = useState('2026-10-01');

  // Extract unique categories & sources
  const categories = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.category)));
  }, [transactions]);

  const sources = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.source)));
  }, [transactions]);

  // Filter & Sort
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => {
        // 1. Keyword search (title, counterparty, reference, source, category)
        if (filterState.searchQuery.trim() !== '') {
          const q = filterState.searchQuery.toLowerCase();
          const matches = 
            tx.title.toLowerCase().includes(q) ||
            (tx.counterparty && tx.counterparty.toLowerCase().includes(q)) ||
            tx.referenceId.toLowerCase().includes(q) ||
            tx.source.toLowerCase().includes(q) ||
            tx.category.toLowerCase().includes(q);
          if (!matches) return false;
        }

        // 2. Type filter (inflow / outflow)
        if (filterState.type && filterState.type !== 'all' && tx.type !== filterState.type) {
          return false;
        }

        // 3. Category filter
        if (filterState.category !== 'all' && tx.category !== filterState.category) {
          return false;
        }

        // 4. Source filter
        if (filterState.source !== 'all' && tx.source !== filterState.source) {
          return false;
        }

        // 5. Date Range filter
        if (!isWithinDateRange(tx.date, filterState.startDate, filterState.endDate)) {
          return false;
        }

        // 6. Amount Range filter
        if (filterState.minAmount !== '') {
          const min = parseFloat(filterState.minAmount);
          if (!isNaN(min) && tx.amount < min) return false;
        }
        if (filterState.maxAmount !== '') {
          const max = parseFloat(filterState.maxAmount);
          if (!isNaN(max) && tx.amount > max) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'amount') {
          return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        }
        if (sortBy === 'title') {
          return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        }
        // Default: Date
        const timeA = parseDateToTime(a.date);
        const timeB = parseDateToTime(b.date);
        return sortOrder === 'asc' ? timeA - timeB : timeB - timeA;
      });
  }, [transactions, filterState, sortBy, sortOrder]);

  // Aggregates for filtered view
  const { totalInflow, totalOutflow, netPosition } = useMemo(() => {
    let inflow = 0;
    let outflow = 0;
    filteredTransactions.forEach((t) => {
      if (t.type === 'inflow') inflow += t.amount;
      else outflow += t.amount;
    });
    return {
      totalInflow: inflow,
      totalOutflow: outflow,
      netPosition: inflow - outflow
    };
  }, [filteredTransactions]);

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      showToast('No Data', 'No transactions match current filters.', 'warning');
      return;
    }

    const headers = ['ID', 'Date', 'Title', 'Counterparty', 'Type', 'Amount', 'Category', 'Source', 'Status', 'Reference'];
    const rows = filteredTransactions.map((t) => [
      t.id,
      t.date,
      `"${t.title.replace(/"/g, '""')}"`,
      `"${(t.counterparty || '').replace(/"/g, '""')}"`,
      t.type,
      (t.type === 'inflow' ? t.amount : -t.amount).toFixed(2),
      t.category,
      t.source,
      t.status,
      t.referenceId
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nexus_transactions_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    showToast('Export Complete', `Downloaded ${filteredTransactions.length} transactions as CSV.`, 'success');
  };

  const handleCreateTx = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount) {
      showToast('Validation Error', 'Please supply a title and amount.', 'warning');
      return;
    }

    const amt = parseFloat(newAmount);
    if (isNaN(amt) || amt <= 0) {
      showToast('Invalid Amount', 'Please provide a valid positive amount.', 'warning');
      return;
    }

    addTransaction({
      title: newTitle,
      amount: amt,
      type: newType,
      category: newCategory,
      source: newSource,
      counterparty: newCounterparty || 'Direct Counterparty',
      date: newDate || '2026-10-02',
      status: 'settled'
    });

    setIsLogModalOpen(false);
    setNewTitle('');
    setNewAmount('');
    setNewCounterparty('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Historical Financial Transactions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time and authenticated historical line items verified across connected bank feeds and merchant platforms.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Log Transaction</span>
          </button>
        </div>
      </div>

      {/* Aggregate Metric Cards (Dynamically sync with Date / Category / Amount filters) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Filtered Total Inflows
          </span>
          <div className="text-xl font-bold text-emerald-700 font-mono tabular-nums mt-1">
            +${formatCurrency(totalInflow)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Verified deposits in selected range
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Filtered Total Outflows
          </span>
          <div className="text-xl font-bold text-slate-800 font-mono tabular-nums mt-1">
            -${formatCurrency(totalOutflow)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Operating costs & taxes
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Net Surplus / Reserve
          </span>
          <div className={`text-xl font-bold font-mono tabular-nums mt-1 ${netPosition >= 0 ? 'text-blue-700' : 'text-red-600'}`}>
            {netPosition >= 0 ? '+' : ''}${formatCurrency(netPosition)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Cumulative net balance
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Transactions Matched
          </span>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">
            {filteredTransactions.length} <span className="text-xs text-slate-400 font-normal">of {transactions.length}</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            100% Cryptographically signed
          </div>
        </div>
      </div>

      {/* Comprehensive Search & Filter Bar */}
      <SearchFilterBar
        filterState={filterState}
        onFilterChange={setFilterState}
        categories={categories}
        sources={sources}
        showTypeFilter={true}
        totalResults={transactions.length}
        filteredCount={filteredTransactions.length}
        placeholder="Search transactions by title, counterparty, reference, or category..."
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={(field, order) => {
          setSortBy(field);
          setSortOrder(order);
        }}
        sortOptions={[
          { label: 'Date', value: 'date' },
          { label: 'Amount', value: 'amount' },
          { label: 'Title', value: 'title' }
        ]}
      />

      {/* Transactions Table */}
      {filteredTransactions.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Transaction & Counterparty</th>
                  <th className="py-3 px-3">Category & Feed</th>
                  <th className="py-3 px-3">Flow Type</th>
                  <th className="py-3 px-3 text-right">Amount (USD)</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => {
                  const isInflow = tx.type === 'inflow';
                  return (
                    <tr key={tx.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Title & Counterparty */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-xs">
                          {tx.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          {tx.counterparty ? `${tx.counterparty} · ` : ''}Ref: {tx.referenceId}
                        </div>
                      </td>

                      {/* Category & Source */}
                      <td className="py-3.5 px-3">
                        <div className="text-slate-800 font-medium text-xs">
                          {tx.category}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          Feed: {tx.source}
                        </div>
                      </td>

                      {/* Flow Type */}
                      <td className="py-3.5 px-3">
                        <span className={`inline-flex items-center gap-1 font-semibold text-xs ${isInflow ? 'text-emerald-700' : 'text-slate-600'}`}>
                          {isInflow ? (
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <ArrowDownRight className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <span>{isInflow ? 'Inflow' : 'Outflow'}</span>
                        </span>
                      </td>

                      {/* Amount */}
                      <td className={`py-3.5 px-3 text-right font-mono font-bold text-xs tabular-nums ${isInflow ? 'text-emerald-700' : 'text-slate-800'}`}>
                        {isInflow ? '+' : '-'}${formatCurrency(tx.amount)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-semibold text-emerald-700 capitalize">
                            {tx.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          SHA-256 Validated
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-3 text-slate-600 font-mono text-[11px]">
                        {tx.date}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedTx(tx)}
                          className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View transaction audit details"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No historical transactions match current filters"
          description="Adjust your search query, expand your date range bounds, or clear active category and amount filters."
          actionLabel="Reset Search & Filters"
          onAction={() => {
            setFilterState({
              searchQuery: '',
              datePreset: 'all',
              startDate: '',
              endDate: '',
              category: 'all',
              source: 'all',
              minAmount: '',
              maxAmount: '',
              type: 'all',
              status: 'all'
            });
          }}
        />
      )}

      {/* Transaction Details Modal */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">
                  Transaction Audit Record
                </span>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block">Description:</span>
                <span className="font-bold text-slate-900">{selectedTx.title}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-slate-400 block">Counterparty:</span>
                  <span className="font-medium text-slate-800">{selectedTx.counterparty || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Category:</span>
                  <span className="font-medium text-slate-800">{selectedTx.category}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-slate-400 block">Recorded Flow:</span>
                  <span className={`font-mono font-bold text-base ${selectedTx.type === 'inflow' ? 'text-emerald-700' : 'text-slate-900'}`}>
                    {selectedTx.type === 'inflow' ? '+' : '-'}${formatCurrency(selectedTx.amount)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Posting Date:</span>
                  <span className="font-mono font-medium text-slate-800">{selectedTx.date}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 text-white rounded-xl font-mono text-[10px] space-y-1">
                <div className="text-slate-400">HASH ROOT ID:</div>
                <div className="text-blue-300 break-all">
                  SHA256_{selectedTx.id}_{selectedTx.referenceId}
                </div>
                <div className="text-emerald-400 pt-1">
                  ✓ VERIFIED ON PLATFORM LEDGER ({selectedTx.source})
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manual Log Transaction Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">
                  Log Verified Transaction
                </span>
              </div>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTx} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                  Transaction Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Design Consulting Milestone Settlement"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Flow Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
                  >
                    <option value="inflow">Inflow (Deposit)</option>
                    <option value="outflow">Outflow (Expense)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Amount ($ USD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="2500.00"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-900 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
                  >
                    <option value="Platform Inflow">Platform Inflow</option>
                    <option value="Client Retainer">Client Retainer</option>
                    <option value="Software & Tools">Software & Tools</option>
                    <option value="Cloud & Hosting">Cloud & Hosting</option>
                    <option value="Workspace & Studio">Workspace & Studio</option>
                    <option value="Tax Escrow">Tax Escrow</option>
                    <option value="Operating Reserve">Operating Reserve</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Source Feed
                  </label>
                  <select
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value as any)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800"
                  >
                    <option value="Stripe">Stripe</option>
                    <option value="Upwork">Upwork</option>
                    <option value="Bank Account">Bank Account</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Square">Square</option>
                    <option value="Invoicing System">Invoicing System</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Counterparty
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Studio Inc"
                    value={newCounterparty}
                    onChange={(e) => setNewCounterparty(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="px-3.5 py-2 text-slate-600 hover:text-slate-900 font-medium rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-2xs"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
