import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { DashboardHeader } from './DashboardHeader';
import { ToastNotification } from '../shared/ToastNotification';
import { ConsentModal } from '../shared/ConsentModal';
import { SharePassportModal } from '../shared/SharePassportModal';
import { SampleReportModal } from '../shared/SampleReportModal';
import { UploadRecordModal } from '../shared/UploadRecordModal';

export const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/dashboard':
        return {
          title: 'Financial Overview',
          subtitle: 'Holistic alternative financial credibility and cash-flow health.'
        };
      case '/passport':
        return {
          title: 'Financial Trust Passport',
          subtitle: 'Your portable, cryptographic proof of financial reliability.'
        };
      case '/insights':
        return {
          title: 'AI Financial Insights',
          subtitle: 'Transparent, consent-governed cash-flow pattern explanations.'
        };
      case '/transactions':
        return {
          title: 'Financial Transactions',
          subtitle: 'Real-time and historical transactions across connected bank feeds and merchant platforms.'
        };
      case '/records':
        return {
          title: 'Financial Records & Proofs',
          subtitle: 'Authenticated invoices, merchant payouts, and bank ledger records.'
        };
      case '/privacy':
        return {
          title: 'Privacy & Consent Center',
          subtitle: 'Zero-silent-sharing permission ledger and token authorization.'
        };
      case '/settings':
        return {
          title: 'Settings & Account Security',
          subtitle: 'Manage encryption keys, API connections, and personal preferences.'
        };
      default:
        return {
          title: 'NEXUS Network',
          subtitle: 'Alternative Financial Identity Platform'
        };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row antialiased">
      {/* Sidebar */}
      <AppSidebar 
        isOpen={mobileSidebarOpen} 
        onClose={() => setMobileSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0 min-h-screen">
        <DashboardHeader
          title={title}
          subtitle={subtitle}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <ConsentModal />
      <SharePassportModal />
      <SampleReportModal />
      <UploadRecordModal />
      <ToastNotification />
    </div>
  );
};
