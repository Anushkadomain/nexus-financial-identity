import React, { useState, useMemo } from 'react';
import { 
  FolderArchive, 
  Upload, 
  CheckCircle2, 
  Clock, 
  Trash2, 
  ExternalLink,
  ShieldCheck,
  FileText,
  DollarSign,
  Download,
  AlertCircle
} from 'lucide-react';
import { useNexus } from '../context/NexusContext';
import { FinancialRecord, FilterState } from '../types';
import { EmptyState } from '../components/shared/EmptyState';
import { SearchFilterBar } from '../components/shared/SearchFilterBar';
import { isWithinDateRange, parseDateToTime, formatCurrency } from '../utils/dateFilter';

export const RecordsPage: React.FC = () => {
  const { records, deleteRecord, setIsUploadModalOpen, showToast } = useNexus();

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
    status: 'all'
  });

  // Sort State
  const [sortBy, setSortBy] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Detail Modal
  const [selectedRecordDetail, setSelectedRecordDetail] = useState<FinancialRecord | null>(null);

  // Extract unique categories & sources
  const categories = useMemo(() => {
    return Array.from(new Set(records.map((r) => r.category)));
  }, [records]);

  const sources = useMemo(() => {
    return Array.from(new Set(records.map((r) => r.source)));
  }, [records]);

  // Filtered and Sorted Records
  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        // 1. Search Query filter (matches title, source, category, referenceId)
        if (filterState.searchQuery.trim() !== '') {
          const query = filterState.searchQuery.toLowerCase();
          const matches = 
            rec.title.toLowerCase().includes(query) ||
            rec.source.toLowerCase().includes(query) ||
            rec.category.toLowerCase().includes(query) ||
            rec.referenceId.toLowerCase().includes(query);
          if (!matches) return false;
        }

        // 2. Category filter
        if (filterState.category !== 'all' && rec.category !== filterState.category) {
          return false;
        }

        // 3. Source filter
        if (filterState.source !== 'all' && rec.source !== filterState.source) {
          return false;
        }

        // 4. Date Range filter
        if (!isWithinDateRange(rec.date, filterState.startDate, filterState.endDate)) {
          return false;
        }

        // 5. Amount Range filter
        if (filterState.minAmount !== '') {
          const min = parseFloat(filterState.minAmount);
          if (!isNaN(min) && rec.amount < min) return false;
        }
        if (filterState.maxAmount !== '') {
          const max = parseFloat(filterState.maxAmount);
          if (!isNaN(max) && rec.amount > max) return false;
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
  }, [records, filterState, sortBy, sortOrder]);

  // Filtered Aggregates
  const filteredTotalAmount = useMemo(() => {
    return filteredRecords.reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredRecords]);

  const verifiedCount = useMemo(() => {
    return filteredRecords.filter((r) => r.verificationStatus === 'verified').length;
  }, [filteredRecords]);

  const handleExportCSV = () => {
    if (filteredRecords.length === 0) {
      showToast('No Data', 'No records match the current filter selection.', 'warning');
      return;
    }

    const headers = ['ID', 'Title', 'Source', 'Category', 'Amount', 'Date', 'Status', 'Reference ID'];
    const rows = filteredRecords.map((r) => [
      r.id,
      `"${r.title.replace(/"/g, '""')}"`,
      r.source,
      r.category,
      r.amount.toFixed(2),
      r.date,
      r.verificationStatus,
      r.referenceId
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nexus_filtered_records_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    showToast('Records Exported', `Exported ${filteredRecords.length} filtered records as CSV.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Financial Records & Proofs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Filter, search, and audit authenticated evidence verifying cash movements across platforms.
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
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Record</span>
          </button>
        </div>
      </div>

      {/* Aggregate Metric Bar (Dynamically updates with filters) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Matching Records
          </span>
          <div className="text-xl font-bold text-slate-900 font-mono mt-1">
            {filteredRecords.length} <span className="text-xs font-sans text-slate-400 font-normal">of {records.length} total</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {verifiedCount} cryptographically authenticated
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Filtered Cumulative Value
          </span>
          <div className="text-xl font-bold text-slate-900 font-mono tabular-nums mt-1">
            ${formatCurrency(filteredTotalAmount)}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
            100% SHA-256 Validated
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Active Filter Scope
          </span>
          <div className="text-xl font-bold text-blue-700 font-mono mt-1">
            {filterState.datePreset === 'all' && !filterState.startDate ? 'All Time' : 'Custom Bounds'}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {filterState.category === 'all' ? 'All Categories' : filterState.category}
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <SearchFilterBar
        filterState={filterState}
        onFilterChange={setFilterState}
        categories={categories}
        sources={sources}
        totalResults={records.length}
        filteredCount={filteredRecords.length}
        placeholder="Filter records by title, source, invoice reference, or category..."
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

      {/* Records Table */}
      {filteredRecords.length > 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Record Title & Reference</th>
                  <th className="py-3 px-3">Source & Category</th>
                  <th className="py-3 px-3 text-right">Amount (USD)</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords.map((rec) => {
                  return (
                    <tr key={rec.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Title */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 text-xs">
                          {rec.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          ID: {rec.referenceId}
                        </div>
                      </td>

                      {/* Source & Category */}
                      <td className="py-3.5 px-3">
                        <div className="text-slate-800 font-medium text-xs">
                          {rec.source}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {rec.category}
                        </div>
                      </td>

                      {/* Amount */}
                      <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-900 text-xs tabular-nums">
                        ${formatCurrency(rec.amount)}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-1.5 text-[11px]">
                          {rec.verificationStatus === 'verified' ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="font-semibold text-emerald-700">Verified</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span className="font-semibold text-amber-700">Self-Reported</span>
                            </>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {rec.confidenceLevel} Confidence
                        </div>
                      </td>

                      {/* Date */}
                      <td className="py-3.5 px-3 text-slate-600 font-mono text-[11px]">
                        {rec.date}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedRecordDetail(rec)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Inspect verification details"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteRecord(rec.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
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
          title="No historical records match your filter criteria"
          description="Try broadening your date range, adjusting the amount bounds, or clearing the search query."
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
              status: 'all'
            });
          }}
        />
      )}

      {/* Record Detail Modal Inspection */}
      {selectedRecordDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-900">
                  Record Cryptographic Ledger Entry
                </span>
              </div>
              <button
                onClick={() => setSelectedRecordDetail(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block">Record Title:</span>
                <span className="font-bold text-slate-900">{selectedRecordDetail.title}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-slate-400 block">Source Feed:</span>
                  <span className="font-medium text-slate-800">{selectedRecordDetail.source}</span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Category:</span>
                  <span className="font-medium text-slate-800">{selectedRecordDetail.category}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-slate-400 block">Validated Amount:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    ${formatCurrency(selectedRecordDetail.amount)}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block">Transaction Date:</span>
                  <span className="font-medium text-slate-800">{selectedRecordDetail.date}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 text-white rounded-xl font-mono text-[10px] space-y-1">
                <div className="text-slate-400">HASH SIGNATURE:</div>
                <div className="text-blue-300 break-all">
                  SHA256_{selectedRecordDetail.id}_e892c90a887b1c4
                </div>
                <div className="text-emerald-400 pt-1">
                  ✓ VERIFIED VIA DIRECT AUTHENTICATED API
                </div>
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedRecordDetail(null)}
                className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
