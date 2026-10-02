import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  DollarSign, 
  X, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  SlidersHorizontal,
  ArrowDownUp,
  Tag
} from 'lucide-react';
import { FilterState } from '../../types';

interface SearchFilterBarProps {
  filterState: FilterState;
  onFilterChange: (newState: FilterState) => void;
  categories: string[];
  sources?: string[];
  showTypeFilter?: boolean;
  showStatusFilter?: boolean;
  statuses?: string[];
  totalResults: number;
  filteredCount: number;
  placeholder?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  sortOptions?: { label: string; value: string }[];
}

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  filterState,
  onFilterChange,
  categories,
  sources = [],
  showTypeFilter = false,
  showStatusFilter = false,
  statuses = [],
  totalResults,
  filteredCount,
  placeholder = 'Search by title, reference ID, platform or counterparty...',
  sortBy,
  sortOrder,
  onSortChange,
  sortOptions
}) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  // Helper to update individual filter properties
  const updateFilter = (updates: Partial<FilterState>) => {
    onFilterChange({
      ...filterState,
      ...updates
    });
  };

  const handleReset = () => {
    onFilterChange({
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
  };

  // Check if any filter is actively deviating from default
  const activeFiltersCount = [
    filterState.searchQuery.trim() !== '',
    filterState.datePreset !== 'all' || filterState.startDate !== '' || filterState.endDate !== '',
    filterState.category !== 'all',
    filterState.source !== 'all',
    filterState.minAmount !== '' || filterState.maxAmount !== '',
    showTypeFilter && filterState.type && filterState.type !== 'all',
    showStatusFilter && filterState.status && filterState.status !== 'all'
  ].filter(Boolean).length;

  const handlePresetSelect = (preset: FilterState['datePreset']) => {
    const today = new Date('2026-10-02'); // Current application baseline
    let start = '';
    let end = '2026-10-02';

    if (preset === '30d') {
      const d = new Date(today);
      d.setDate(d.getDate() - 30);
      start = d.toISOString().split('T')[0];
    } else if (preset === '90d') {
      const d = new Date(today);
      d.setDate(d.getDate() - 90);
      start = d.toISOString().split('T')[0];
    } else if (preset === '6m') {
      const d = new Date(today);
      d.setMonth(d.getMonth() - 6);
      start = d.toISOString().split('T')[0];
    } else if (preset === 'all') {
      start = '';
      end = '';
    }

    updateFilter({
      datePreset: preset,
      startDate: start,
      endDate: end
    });
  };

  const handleAmountTier = (tier: string) => {
    if (tier === 'under500') {
      updateFilter({ minAmount: '', maxAmount: '500' });
    } else if (tier === '500to2500') {
      updateFilter({ minAmount: '500', maxAmount: '2500' });
    } else if (tier === '2500to5000') {
      updateFilter({ minAmount: '2500', maxAmount: '5000' });
    } else if (tier === 'over5000') {
      updateFilter({ minAmount: '5000', maxAmount: '' });
    } else {
      updateFilter({ minAmount: '', maxAmount: '' });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all">
      {/* Top Primary Search & Quick Filter Controls */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Main Keyword Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={placeholder}
              value={filterState.searchQuery}
              onChange={(e) => updateFilter({ searchQuery: e.target.value })}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {filterState.searchQuery && (
              <button
                onClick={() => updateFilter({ searchQuery: '' })}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-md focus:outline-hidden"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Date Preset Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-medium shrink-0">
              <button
                type="button"
                onClick={() => handlePresetSelect('all')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  filterState.datePreset === 'all'
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Time
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect('30d')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  filterState.datePreset === '30d'
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                30 Days
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect('90d')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  filterState.datePreset === '90d'
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                90 Days
              </button>
              <button
                type="button"
                onClick={() => handlePresetSelect('6m')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  filterState.datePreset === '6m'
                    ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                6 Months
              </button>
            </div>

            {/* Toggle Advanced Filters Drawer */}
            <button
              type="button"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0 ${
                isAdvancedOpen || activeFiltersCount > 0
                  ? 'border-blue-500 bg-blue-50/70 text-blue-700'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-mono font-bold flex items-center justify-center ml-0.5">
                  {activeFiltersCount}
                </span>
              )}
              {isAdvancedOpen ? (
                <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
              )}
            </button>
          </div>
        </div>

        {/* Sort & Quick Inflow/Outflow toggles if available */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Quick Type Filter for Transactions */}
            {showTypeFilter && (
              <div className="flex items-center p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
                <button
                  type="button"
                  onClick={() => updateFilter({ type: 'all' })}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filterState.type === 'all'
                      ? 'bg-white text-slate-900 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Flows
                </button>
                <button
                  type="button"
                  onClick={() => updateFilter({ type: 'inflow' })}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filterState.type === 'inflow'
                      ? 'bg-white text-emerald-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  + Inflows
                </button>
                <button
                  type="button"
                  onClick={() => updateFilter({ type: 'outflow' })}
                  className={`px-2.5 py-1 rounded-md transition-colors ${
                    filterState.type === 'outflow'
                      ? 'bg-white text-slate-800 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  - Outflows
                </button>
              </div>
            )}

            {/* Quick Category Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium text-[11px]">Category:</span>
              <select
                value={filterState.category}
                onChange={(e) => updateFilter({ category: e.target.value })}
                className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100/70 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
              >
                <option value="all">All Categories ({categories.length})</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Source Dropdown */}
            {sources.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-medium text-[11px]">Feed:</span>
                <select
                  value={filterState.source}
                  onChange={(e) => updateFilter({ source: e.target.value })}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100/70 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                >
                  <option value="all">All Feeds ({sources.length})</option>
                  {sources.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Result Count and Sort Controls */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-500">
              Showing <strong className="text-slate-900 font-semibold">{filteredCount}</strong> of {totalResults} items
            </span>

            {sortOptions && onSortChange && sortBy && (
              <div className="flex items-center gap-1.5">
                <ArrowDownUp className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value, sortOrder || 'desc')}
                  className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-hidden"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      Sort: {opt.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1 text-slate-500 hover:text-slate-800 rounded bg-slate-100"
                  title={`Currently ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expandable Advanced Filter Drawer: Date Range & Amount Brackets */}
      {isAdvancedOpen && (
        <div className="border-t border-slate-100 bg-slate-50/80 p-4 sm:p-5 space-y-4 animate-in fade-in slide-in-from-top-1 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Section A: Date Range Precision */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  Filter By Date Range
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Custom calendar bounds
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filterState.startDate}
                    onChange={(e) => {
                      updateFilter({
                        startDate: e.target.value,
                        datePreset: 'custom'
                      });
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filterState.endDate}
                    onChange={(e) => {
                      updateFilter({
                        endDate: e.target.value,
                        datePreset: 'custom'
                      });
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => handlePresetSelect('30d')}
                  className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[11px] text-slate-600 font-medium"
                >
                  Past Month
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('90d')}
                  className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[11px] text-slate-600 font-medium"
                >
                  Past Quarter (90d)
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('6m')}
                  className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[11px] text-slate-600 font-medium"
                >
                  Past 6 Months
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('all')}
                  className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[11px] text-slate-500"
                >
                  Clear Date
                </button>
              </div>
            </div>

            {/* Section B: Amount Range Filter */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  Filter By Amount (USD)
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Min & max bracket
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">
                    Minimum Amount ($)
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={filterState.minAmount}
                    onChange={(e) => updateFilter({ minAmount: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-slate-500 block mb-1">
                    Maximum Amount ($)
                  </label>
                  <input
                    type="number"
                    placeholder="10000.00"
                    value={filterState.maxAmount}
                    onChange={(e) => updateFilter({ maxAmount: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-medium text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleAmountTier('under500')}
                  className={`px-2 py-0.5 rounded text-[11px] border font-medium transition-colors ${
                    filterState.maxAmount === '500' && filterState.minAmount === ''
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  &lt; $500
                </button>
                <button
                  type="button"
                  onClick={() => handleAmountTier('500to2500')}
                  className={`px-2 py-0.5 rounded text-[11px] border font-medium transition-colors ${
                    filterState.minAmount === '500' && filterState.maxAmount === '2500'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  $500 – $2,500
                </button>
                <button
                  type="button"
                  onClick={() => handleAmountTier('2500to5000')}
                  className={`px-2 py-0.5 rounded text-[11px] border font-medium transition-colors ${
                    filterState.minAmount === '2500' && filterState.maxAmount === '5000'
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  $2,500 – $5,000
                </button>
                <button
                  type="button"
                  onClick={() => handleAmountTier('over5000')}
                  className={`px-2 py-0.5 rounded text-[11px] border font-medium transition-colors ${
                    filterState.minAmount === '5000' && filterState.maxAmount === ''
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  &gt; $5,000
                </button>
                {(filterState.minAmount || filterState.maxAmount) && (
                  <button
                    type="button"
                    onClick={() => updateFilter({ minAmount: '', maxAmount: '' })}
                    className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] text-slate-500"
                  >
                    Clear Amount
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Filter Chips Bar (Visible when filters are active) */}
      {activeFiltersCount > 0 && (
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mr-1">
              Active Filters:
            </span>

            {/* Search Query chip */}
            {filterState.searchQuery && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 text-slate-800 rounded-md text-[11px]">
                <span>Query: "{filterState.searchQuery}"</span>
                <button
                  onClick={() => updateFilter({ searchQuery: '' })}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Date range chip */}
            {(filterState.datePreset !== 'all' || filterState.startDate || filterState.endDate) && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 text-slate-800 rounded-md text-[11px]">
                <Calendar className="w-3 h-3 text-blue-600" />
                <span>
                  {filterState.datePreset === '30d'
                    ? 'Past 30 Days'
                    : filterState.datePreset === '90d'
                    ? 'Past 90 Days'
                    : filterState.datePreset === '6m'
                    ? 'Past 6 Months'
                    : `${filterState.startDate || 'start'} to ${filterState.endDate || 'now'}`}
                </span>
                <button
                  onClick={() => handlePresetSelect('all')}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Category chip */}
            {filterState.category !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 text-slate-800 rounded-md text-[11px]">
                <Tag className="w-3 h-3 text-slate-400" />
                <span>{filterState.category}</span>
                <button
                  onClick={() => updateFilter({ category: 'all' })}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Source chip */}
            {filterState.source !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 text-slate-800 rounded-md text-[11px]">
                <span>Feed: {filterState.source}</span>
                <button
                  onClick={() => updateFilter({ source: 'all' })}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Amount range chip */}
            {(filterState.minAmount || filterState.maxAmount) && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 text-slate-800 rounded-md text-[11px] font-mono">
                <DollarSign className="w-3 h-3 text-emerald-600" />
                <span>
                  {filterState.minAmount ? `$${filterState.minAmount}` : '$0'}
                  {' – '}
                  {filterState.maxAmount ? `$${filterState.maxAmount}` : '∞'}
                </span>
                <button
                  onClick={() => updateFilter({ minAmount: '', maxAmount: '' })}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Type chip */}
            {showTypeFilter && filterState.type && filterState.type !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 text-slate-800 rounded-md text-[11px]">
                <span>Flow: {filterState.type === 'inflow' ? 'Inflows Only' : 'Outflows Only'}</span>
                <button
                  onClick={() => updateFilter({ type: 'all' })}
                  className="hover:text-red-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>

          {/* Reset All Filters Button */}
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1 transition-colors ml-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}
    </div>
  );
};
