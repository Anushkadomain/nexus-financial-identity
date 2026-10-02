import { MonthlyCashFlow, FinancialRecord, ConsentPartner, FinancialInsight, ApplicantProfile } from '../types';

export const initialCashFlowData: MonthlyCashFlow[] = [
  { month: 'Apr 2026', inflow: 7850, outflow: 4200, netSavings: 3650, consistencyScore: 92 },
  { month: 'May 2026', inflow: 8400, outflow: 4600, netSavings: 3800, consistencyScore: 94 },
  { month: 'Jun 2026', inflow: 8100, outflow: 4150, netSavings: 3950, consistencyScore: 93 },
  { month: 'Jul 2026', inflow: 9200, outflow: 5100, netSavings: 4100, consistencyScore: 95 },
  { month: 'Aug 2026', inflow: 8950, outflow: 4800, netSavings: 4150, consistencyScore: 94 },
  { month: 'Sep 2026', inflow: 9600, outflow: 5250, netSavings: 4350, consistencyScore: 96 },
];

export const initialRecords: FinancialRecord[] = [
  {
    id: 'REC-0914',
    title: 'Stripe Merchant Settlement & Payouts',
    source: 'Stripe',
    category: 'Platform Earnings',
    amount: 5420.00,
    date: 'Sep 28, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'Direct API Sync',
    referenceId: 'po_1Nk84H2eZvKYlo2C9k'
  },
  {
    id: 'REC-0912',
    title: 'Upwork Enterprise Client Retainer - UX Systems',
    source: 'Upwork',
    category: 'Platform Earnings',
    amount: 3200.00,
    date: 'Sep 24, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'Direct API Sync',
    referenceId: 'upw_inv_9482104'
  },
  {
    id: 'REC-0908',
    title: 'Business Checking Statement - 90 Day Inflow Audit',
    source: 'Bank Account',
    category: 'Operating Reserve',
    amount: 14850.00,
    date: 'Sep 15, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'Encrypted PDF Statement',
    referenceId: 'boa_stmt_2026_q3'
  },
  {
    id: 'REC-0899',
    title: 'Custom Product Design Contract - Apex Labs',
    source: 'Invoicing System',
    category: 'Client Invoice',
    amount: 2500.00,
    date: 'Aug 30, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'Paid Invoice PDF',
    referenceId: 'inv-nx-2026-08'
  },
  {
    id: 'REC-0881',
    title: 'PayPal Business Services Payout',
    source: 'PayPal',
    category: 'Platform Earnings',
    amount: 980.00,
    date: 'Aug 18, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'Medium',
    fileFormat: 'Direct API Sync',
    referenceId: 'pp_tr_99184912'
  },
  {
    id: 'REC-0865',
    title: 'Tax Escrow Account Transfer Verification',
    source: 'Bank Account',
    category: 'Tax Escrow',
    amount: 1800.00,
    date: 'Aug 05, 2026',
    verificationStatus: 'self_reported',
    confidenceLevel: 'Standard',
    fileFormat: 'Manual Receipt Upload',
    referenceId: 'tx_escrow_8819'
  },
  {
    id: 'REC-0842',
    title: 'Q2 Independent Contractor Retainer - Solaria Systems',
    source: 'Upwork',
    category: 'Platform Earnings',
    amount: 4800.00,
    date: 'Jul 28, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'Direct API Sync',
    referenceId: 'upw_inv_8819401'
  },
  {
    id: 'REC-0820',
    title: 'Stripe SaaS Micro-Acquisition Milestone Payout',
    source: 'Stripe',
    category: 'Platform Earnings',
    amount: 3950.00,
    date: 'Jul 10, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'Direct API Sync',
    referenceId: 'po_1Nk84J00BbK2lo4F2x'
  },
  {
    id: 'REC-0795',
    title: 'Fleet Logistics Earnings Settlement',
    source: 'Uber / Lyft',
    category: 'Direct Deposit',
    amount: 1650.00,
    date: 'Jun 25, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'Medium',
    fileFormat: 'Weekly ACH Feed',
    referenceId: 'ub_payout_7718'
  },
  {
    id: 'REC-0770',
    title: 'Mid-Year Business Checking Audit Statement',
    source: 'Bank Account',
    category: 'Operating Reserve',
    amount: 6200.00,
    date: 'Jun 15, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'OFX Encrypted Statement',
    referenceId: 'boa_reserve_q2'
  },
  {
    id: 'REC-0745',
    title: 'Client Brand Identity Sprint - Hyperion Advisors',
    source: 'Invoicing System',
    category: 'Client Invoice',
    amount: 4100.00,
    date: 'May 12, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'High',
    fileFormat: 'Paid Invoice PDF',
    referenceId: 'inv-nx-2026-05'
  },
  {
    id: 'REC-0710',
    title: 'Square Merchant Countertop Sales Audit',
    source: 'Square',
    category: 'Platform Earnings',
    amount: 1120.00,
    date: 'Apr 22, 2026',
    verificationStatus: 'verified',
    confidenceLevel: 'Medium',
    fileFormat: 'Direct API Sync',
    referenceId: 'sq_payout_8819'
  },
  {
    id: 'REC-0690',
    title: 'Federal Quarterly Estimated Tax Voucher Settlement',
    source: 'Bank Account',
    category: 'Tax Escrow',
    amount: 1450.00,
    date: 'Apr 14, 2026',
    verificationStatus: 'self_reported',
    confidenceLevel: 'Standard',
    fileFormat: 'Tax Form 1040-ES Voucher',
    referenceId: 'tx_voucher_q1_2026'
  }
];

export const initialTransactions: import('../types').FinancialTransaction[] = [
  {
    id: 'TXN-1002',
    title: 'Stripe Direct Merchant Settlement',
    source: 'Stripe',
    category: 'Platform Inflow',
    type: 'inflow',
    amount: 5420.00,
    date: '2026-09-28',
    status: 'settled',
    referenceId: 'po_1Nk84H2eZvKYlo2C9k',
    counterparty: 'Stripe Payments US'
  },
  {
    id: 'TXN-1003',
    title: 'AWS Cloud Infrastructure Cluster',
    source: 'Bank Account',
    category: 'Cloud & Hosting',
    type: 'outflow',
    amount: 342.50,
    date: '2026-09-26',
    status: 'cleared',
    referenceId: 'aws_inv_881920',
    counterparty: 'Amazon Web Services'
  },
  {
    id: 'TXN-1004',
    title: 'Upwork Enterprise Milestone Payout',
    source: 'Upwork',
    category: 'Client Retainer',
    type: 'inflow',
    amount: 3200.00,
    date: '2026-09-24',
    status: 'settled',
    referenceId: 'upw_inv_9482104',
    counterparty: 'Vanguard UX Labs'
  },
  {
    id: 'TXN-1005',
    title: 'Figma Enterprise Organization License',
    source: 'Bank Account',
    category: 'Software & Tools',
    type: 'outflow',
    amount: 90.00,
    date: '2026-09-20',
    status: 'cleared',
    referenceId: 'sub_figma_0920',
    counterparty: 'Figma Inc.'
  },
  {
    id: 'TXN-1006',
    title: 'Commercial Design Studio Workspace Lease',
    source: 'Bank Account',
    category: 'Workspace & Studio',
    type: 'outflow',
    amount: 1450.00,
    date: '2026-09-18',
    status: 'cleared',
    referenceId: 'rent_sept_2026',
    counterparty: 'Westlake Creative Lofts'
  },
  {
    id: 'TXN-1007',
    title: 'Direct Client Retainer - FinTech Architecture',
    source: 'Invoicing System',
    category: 'Client Retainer',
    type: 'inflow',
    amount: 4500.00,
    date: '2026-09-15',
    status: 'verified',
    referenceId: 'inv-nx-2026-09',
    counterparty: 'Hyperion Capital Advisors'
  },
  {
    id: 'TXN-1008',
    title: 'Quarterly Federal Tax Reserve Escrow',
    source: 'Bank Account',
    category: 'Tax Escrow',
    type: 'outflow',
    amount: 1800.00,
    date: '2026-09-10',
    status: 'cleared',
    referenceId: 'eftps_q3_reserve',
    counterparty: 'Internal Revenue Service'
  },
  {
    id: 'TXN-1009',
    title: 'Stripe SaaS Subscription Billing Payout',
    source: 'Stripe',
    category: 'Platform Inflow',
    type: 'inflow',
    amount: 2890.00,
    date: '2026-08-30',
    status: 'settled',
    referenceId: 'po_1Nk84H88ZbM1lo3D1z',
    counterparty: 'Stripe Merchant Processing'
  },
  {
    id: 'TXN-1010',
    title: 'GitHub Enterprise & Copilot Seats',
    source: 'Bank Account',
    category: 'Software & Tools',
    type: 'outflow',
    amount: 63.00,
    date: '2026-08-25',
    status: 'cleared',
    referenceId: 'gh_org_bill_2026',
    counterparty: 'GitHub Inc.'
  },
  {
    id: 'TXN-1011',
    title: 'PayPal Business Consulting Remittance',
    source: 'PayPal',
    category: 'Platform Inflow',
    type: 'inflow',
    amount: 980.00,
    date: '2026-08-18',
    status: 'settled',
    referenceId: 'pp_tr_99184912',
    counterparty: 'Aura Design Collective'
  },
  {
    id: 'TXN-1012',
    title: 'Square Countertop Workshop Sales Settlement',
    source: 'Square',
    category: 'Platform Inflow',
    type: 'inflow',
    amount: 1120.00,
    date: '2026-08-12',
    status: 'settled',
    referenceId: 'sq_payout_8819',
    counterparty: 'Square Financial Services'
  },
  {
    id: 'TXN-1013',
    title: 'Vercel Pro & Edge Network Hosting',
    source: 'Bank Account',
    category: 'Cloud & Hosting',
    type: 'outflow',
    amount: 40.00,
    date: '2026-08-04',
    status: 'cleared',
    referenceId: 'vcl_sub_9921',
    counterparty: 'Vercel Inc.'
  },
  {
    id: 'TXN-1014',
    title: 'Upwork Enterprise Mobile App Design Sprint',
    source: 'Upwork',
    category: 'Client Retainer',
    type: 'inflow',
    amount: 4800.00,
    date: '2026-07-28',
    status: 'settled',
    referenceId: 'upw_inv_8819401',
    counterparty: 'Solaria Technologies'
  },
  {
    id: 'TXN-1015',
    title: 'Commercial Design Studio Workspace Lease',
    source: 'Bank Account',
    category: 'Workspace & Studio',
    type: 'outflow',
    amount: 1450.00,
    date: '2026-07-18',
    status: 'cleared',
    referenceId: 'rent_july_2026',
    counterparty: 'Westlake Creative Lofts'
  },
  {
    id: 'TXN-1016',
    title: 'Stripe Developer Contract Retainer',
    source: 'Stripe',
    category: 'Platform Inflow',
    type: 'inflow',
    amount: 3950.00,
    date: '2026-07-10',
    status: 'settled',
    referenceId: 'po_1Nk84J00BbK2lo4F2x',
    counterparty: 'Stripe Payments US'
  },
  {
    id: 'TXN-1017',
    title: 'Uber Freight Fleet Inflow Settlement',
    source: 'Uber / Lyft',
    category: 'Platform Inflow',
    type: 'inflow',
    amount: 1650.00,
    date: '2026-06-25',
    status: 'settled',
    referenceId: 'ub_payout_7718',
    counterparty: 'Uber Technologies Direct'
  },
  {
    id: 'TXN-1018',
    title: 'Operating Reserve Buffer Allocation',
    source: 'Bank Account',
    category: 'Operating Reserve',
    type: 'inflow',
    amount: 6200.00,
    date: '2026-06-15',
    status: 'verified',
    referenceId: 'boa_reserve_q2',
    counterparty: 'Business Checking Reserve'
  },
  {
    id: 'TXN-1019',
    title: 'Google Cloud Platform Compute Instance',
    source: 'Bank Account',
    category: 'Cloud & Hosting',
    type: 'outflow',
    amount: 185.00,
    date: '2026-05-20',
    status: 'cleared',
    referenceId: 'gcp_inv_66192',
    counterparty: 'Google Cloud Services'
  },
  {
    id: 'TXN-1020',
    title: 'Upwork Systems Consulting Retainer',
    source: 'Upwork',
    category: 'Client Retainer',
    type: 'inflow',
    amount: 4100.00,
    date: '2026-05-12',
    status: 'settled',
    referenceId: 'upw_inv_772109',
    counterparty: 'OmniHealth AI'
  },
  {
    id: 'TXN-1021',
    title: 'Commercial Design Studio Workspace Lease',
    source: 'Bank Account',
    category: 'Workspace & Studio',
    type: 'outflow',
    amount: 1450.00,
    date: '2026-05-01',
    status: 'cleared',
    referenceId: 'rent_may_2026',
    counterparty: 'Westlake Creative Lofts'
  },
  {
    id: 'TXN-1022',
    title: 'Stripe Integration & Audit Retainer',
    source: 'Stripe',
    category: 'Platform Inflow',
    type: 'inflow',
    amount: 3750.00,
    date: '2026-04-18',
    status: 'settled',
    referenceId: 'po_1Nk84D33AaM5lo1C8y',
    counterparty: 'Stripe Payments US'
  }
];

export const initialConsentPartners: ConsentPartner[] = [
  {
    id: 'PART-01',
    name: 'Horizon Commercial Capital',
    type: 'Fintech Underwriting',
    logoText: 'HC',
    requestedFields: ['6-Month Net Inflow Trend', 'Income Consistency Factor', 'Platform Verification Receipts'],
    purpose: 'Underwriting evaluation for working capital line of credit ($35,000)',
    grantedDate: 'Sep 12, 2026',
    expiryDate: 'Oct 12, 2026',
    status: 'active',
    accessLevel: 'Full Passport'
  },
  {
    id: 'PART-02',
    name: 'Westlake Residential Property Group',
    type: 'Landlord & Property Manager',
    logoText: 'WP',
    requestedFields: ['Average Monthly Inflow', 'Expense-to-Income Ratio', 'Bank Account Verification'],
    purpose: 'Commercial studio lease application financial verification',
    grantedDate: 'Aug 20, 2026',
    expiryDate: 'Sep 20, 2026',
    status: 'revoked',
    accessLevel: 'Cash-Flow Summary'
  },
  {
    id: 'PART-03',
    name: 'Beacon Equipment Leasing & Capital',
    type: 'Equipment Financing',
    logoText: 'BL',
    requestedFields: ['Platform Inflow History', 'Client Invoice History', 'Verified Records List'],
    purpose: 'Hardware and computing workstation lease qualification',
    grantedDate: 'Sep 01, 2026',
    expiryDate: 'Nov 01, 2026',
    status: 'active',
    accessLevel: 'Income Verification Only'
  }
];

export const initialInsights: FinancialInsight[] = [
  {
    id: 'INS-01',
    title: 'Consistent Multi-Channel Cash Flow',
    description: 'Your recorded income has followed a relatively stable pattern across the last 3 recorded months, averaging $8,916/mo with a variance of less than 7%.',
    category: 'Income Consistency',
    type: 'positive',
    metricNote: 'Variance < 7% over 90 days',
    actionLabel: 'View Cash-Flow Breakdown',
    actionRoute: '/dashboard'
  },
  {
    id: 'INS-02',
    title: 'Controlled Outflow vs. Recurring Revenue',
    description: 'Operating outflows remained balanced at 54.6% of gross deposits in September, maintaining a healthy reserve margin for independent operations.',
    category: 'Spending Trend',
    type: 'neutral',
    metricNote: '54.6% outflow ratio in Sep',
    actionLabel: 'Analyze Spending',
    actionRoute: '/records'
  },
  {
    id: 'INS-03',
    title: 'Profile Completeness Opportunity',
    description: 'Adding 1 additional verified platform source (such as Etsy, Square, or another institutional bank feed) would elevate record completeness to 100%.',
    category: 'Profile Completeness',
    type: 'recommendation',
    metricNote: 'Currently at 92% completeness',
    actionLabel: 'Connect Another Source',
    actionRoute: '/records'
  },
  {
    id: 'INS-04',
    title: 'Disciplined Net Savings Trajectory',
    description: 'Net cash additions averaged +$4,066 monthly over the past two quarters, demonstrating deliberate liquidity management without reliance on short-term credit.',
    category: 'Cash Flow',
    type: 'positive',
    metricNote: '+$24,100 cumulative additions',
    actionLabel: 'View Passport Metrics',
    actionRoute: '/passport'
  }
];

export const applicantProfiles: ApplicantProfile[] = [
  {
    id: 'APP-84920',
    fullName: 'Arslan Tariq',
    persona: 'Independent Software Engineer & Product Designer',
    passportId: 'DEMO-NX-84920',
    verificationStatus: 'Verified',
    profileCompletion: 92,
    monthlyAverageInflow: 8683,
    monthlyAverageOutflow: 4683,
    incomeConsistencyRating: 'High Consistency',
    expenseToIncomeRatio: '53.9%',
    consentExpiry: 'Oct 12, 2026',
    consentedDataFields: ['6-Month Net Inflow', 'Platform Verification Receipts', 'Expense Ratio Breakdown'],
    verifiedRecordsCount: 5,
    lastUpdated: 'Sep 29, 2026',
    notes: 'Applicant demonstrated consistent recurring inflows from direct Stripe API and Upwork Enterprise retainers. Zero overdraft events identified across 180 days.',
    applicationPurpose: 'Commercial working capital facility ($35,000)'
  },
  {
    id: 'APP-77312',
    fullName: 'Maya Chen',
    persona: 'Graduate Student & AI Research Consultant',
    passportId: 'DEMO-NX-77312',
    verificationStatus: 'Verified',
    profileCompletion: 88,
    monthlyAverageInflow: 6420,
    monthlyAverageOutflow: 3100,
    incomeConsistencyRating: 'Moderate Consistency',
    expenseToIncomeRatio: '48.2%',
    consentExpiry: 'Nov 04, 2026',
    consentedDataFields: ['University Stipend Verification', 'Consulting Inflow Receipts', 'Checking History'],
    verifiedRecordsCount: 4,
    lastUpdated: 'Sep 25, 2026',
    notes: 'Strong academic stipend base augmented by quarterly corporate AI advisory retainers.',
    applicationPurpose: 'Residential lease co-signer waiver'
  },
  {
    id: 'APP-65109',
    fullName: 'David O\'Connor',
    persona: 'Logistics Fleet Contractor & Rideshare Operator',
    passportId: 'DEMO-NX-65109',
    verificationStatus: 'Pending Records',
    profileCompletion: 76,
    monthlyAverageInflow: 5900,
    monthlyAverageOutflow: 3950,
    incomeConsistencyRating: 'Moderate Consistency',
    expenseToIncomeRatio: '66.9%',
    consentExpiry: 'Oct 20, 2026',
    consentedDataFields: ['Direct Platform Payouts (Uber/DoorDash)', 'Fuel Expense Audit'],
    verifiedRecordsCount: 3,
    lastUpdated: 'Sep 20, 2026',
    notes: 'Weekly payouts confirmed via platform statements; pending 30-day fuel ledger verification.',
    applicationPurpose: 'Commercial vehicle fleet lease'
  }
];
