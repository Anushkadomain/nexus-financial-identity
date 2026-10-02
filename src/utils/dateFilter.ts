/**
 * Utility functions for parsing various date strings and filtering by date range
 */

export function parseDateToTime(dateStr: string): number {
  if (!dateStr) return 0;

  // Check if it's already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return new Date(dateStr + 'T00:00:00Z').getTime();
  }

  // Parse strings like "Sep 28, 2026" or "Aug 05, 2026"
  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) {
    return parsed;
  }

  return 0;
}

export function isWithinDateRange(itemDateStr: string, startDateStr?: string, endDateStr?: string): boolean {
  if (!startDateStr && !endDateStr) return true;

  const itemTime = parseDateToTime(itemDateStr);
  if (!itemTime) return true;

  if (startDateStr) {
    const startTime = parseDateToTime(startDateStr);
    if (itemTime < startTime) return false;
  }

  if (endDateStr) {
    // Add end of day buffer for inclusive matching
    const endTime = parseDateToTime(endDateStr) + (24 * 60 * 60 * 1000 - 1);
    if (itemTime > endTime) return false;
  }

  return true;
}

export function formatCurrency(amount: number): string {
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
