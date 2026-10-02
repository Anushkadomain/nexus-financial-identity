export type UserPersona = 'freelancer' | 'student' | 'gig_worker' | 'small_business';

export interface FinancialMetric {
  label: string;
  value: string;
  subtext: string;
  trend?: {
    value: string;
    isPositive: boolean;
    period: string;
  };
  indicator?: 'healthy' | 'neutral' | 'attention';
}

export interface MonthlyCashFlow {
  month: string;
  inflow: number;
  outflow: number;
  netSavings: number;
  consistencyScore: number;
}

export interface FinancialRecord {
  id: string;
  title: string;
  source: 'Bank Account' | 'Stripe' | 'Upwork' | 'PayPal' | 'Square' | 'Uber / Lyft' | 'Invoicing System';
  category: 'Platform Earnings' | 'Direct Deposit' | 'Client Invoice' | 'Operating Reserve' | 'Tax Escrow';
  amount: number;
  date: string;
  verificationStatus: 'verified' | 'pending_verification' | 'self_reported';
  confidenceLevel: 'High' | 'Medium' | 'Standard';
  fileFormat?: string;
  referenceId: string;
}

export interface FinancialTransaction {
  id: string;
  title: string;
  source: 'Bank Account' | 'Stripe' | 'Upwork' | 'PayPal' | 'Square' | 'Uber / Lyft' | 'Invoicing System';
  category: 'Platform Inflow' | 'Client Retainer' | 'Software & Tools' | 'Cloud & Hosting' | 'Workspace & Studio' | 'Tax Escrow' | 'Operating Reserve';
  type: 'inflow' | 'outflow';
  amount: number;
  date: string; // YYYY-MM-DD or formatted
  status: 'settled' | 'cleared' | 'verified';
  referenceId: string;
  counterparty?: string;
}

export interface FilterState {
  searchQuery: string;
  datePreset: 'all' | '30d' | '90d' | '6m' | 'custom';
  startDate: string;
  endDate: string;
  category: string;
  source: string;
  minAmount: string;
  maxAmount: string;
  type?: 'all' | 'inflow' | 'outflow';
  status?: string;
}

export interface ConsentPartner {
  id: string;
  name: string;
  type: 'Lender' | 'Landlord & Property Manager' | 'Equipment Financing' | 'Fintech Underwriting';
  logoText: string;
  requestedFields: string[];
  purpose: string;
  grantedDate?: string;
  expiryDate?: string;
  status: 'active' | 'pending' | 'revoked';
  accessLevel: 'Full Passport' | 'Income Verification Only' | 'Cash-Flow Summary';
}

export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  category: 'Income Consistency' | 'Spending Trend' | 'Cash Flow' | 'Profile Completeness';
  type: 'positive' | 'neutral' | 'recommendation';
  metricNote?: string;
  actionLabel?: string;
  actionRoute?: string;
}

export interface ApplicantProfile {
  id: string;
  fullName: string;
  persona: string;
  passportId: string;
  verificationStatus: 'Verified' | 'Pending Records' | 'Under Review';
  profileCompletion: number;
  monthlyAverageInflow: number;
  monthlyAverageOutflow: number;
  incomeConsistencyRating: 'High Consistency' | 'Moderate Consistency' | 'Variable';
  expenseToIncomeRatio: string;
  consentExpiry: string;
  consentedDataFields: string[];
  verifiedRecordsCount: number;
  lastUpdated: string;
  notes?: string;
  applicationPurpose: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type?: 'success' | 'info' | 'warning';
}
