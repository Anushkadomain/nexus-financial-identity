import React, { createContext, useContext, useState } from 'react';
import { 
  FinancialRecord, 
  FinancialTransaction,
  MonthlyCashFlow, 
  ConsentPartner, 
  FinancialInsight, 
  ApplicantProfile,
  ToastMessage,
  UserPersona 
} from '../types';
import { 
  initialCashFlowData, 
  initialRecords, 
  initialTransactions,
  initialConsentPartners, 
  initialInsights, 
  applicantProfiles 
} from '../data/mockData';

export interface UserProfile {
  name: string;
  email: string;
  persona: UserPersona;
  personaTitle: string;
  passportId: string;
  verificationStatus: 'Verified' | 'Pending Records' | 'Under Review';
  profileCompletion: number;
  avatarUrl: string;
  lastUpdated: string;
  inflowAverage: number;
  outflowAverage: number;
  consistencyScore: number;
}

interface NexusContextType {
  user: UserProfile;
  updateUserPersona: (persona: UserPersona, personaTitle: string) => void;
  cashFlowData: MonthlyCashFlow[];
  records: FinancialRecord[];
  addRecord: (record: Omit<FinancialRecord, 'id' | 'referenceId'>) => void;
  deleteRecord: (id: string) => void;
  transactions: FinancialTransaction[];
  addTransaction: (tx: Omit<FinancialTransaction, 'id' | 'referenceId'>) => void;
  deleteTransaction: (id: string) => void;
  partners: ConsentPartner[];
  revokeConsent: (id: string) => void;
  grantConsent: (partner: Omit<ConsentPartner, 'id' | 'grantedDate' | 'status'>) => void;
  insights: FinancialInsight[];
  applicants: ApplicantProfile[];
  updateApplicantNotes: (id: string, notes: string) => void;
  
  // Modals & Sheets
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  isUploadModalOpen: boolean;
  setIsUploadModalOpen: (open: boolean) => void;
  isConsentModalOpen: boolean;
  setIsConsentModalOpen: (open: boolean) => void;
  activeConsentPartner: ConsentPartner | null;
  openConsentModal: (partner: ConsentPartner | null) => void;
  
  // Toasts
  toasts: ToastMessage[];
  showToast: (title: string, description: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const NexusContext = createContext<NexusContextType | undefined>(undefined);

export const NexusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>({
    name: 'Arslan Tariq',
    email: 'arslan.tariq@nexustrust.io',
    persona: 'freelancer',
    personaTitle: 'Independent Software Engineer & Product Designer',
    passportId: 'DEMO-NX-84920',
    verificationStatus: 'Verified',
    profileCompletion: 92,
    avatarUrl: '/src/assets/images/avatar_arslan_1790925930605.jpg',
    lastUpdated: 'Oct 02, 2026',
    inflowAverage: 8683,
    outflowAverage: 4683,
    consistencyScore: 94
  });

  const [cashFlowData] = useState<MonthlyCashFlow[]>(initialCashFlowData);
  const [records, setRecords] = useState<FinancialRecord[]>(initialRecords);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>(initialTransactions);
  const [partners, setPartners] = useState<ConsentPartner[]>(initialConsentPartners);
  const [insights] = useState<FinancialInsight[]>(initialInsights);
  const [applicants, setApplicants] = useState<ApplicantProfile[]>(applicantProfiles);

  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const [activeConsentPartner, setActiveConsentPartner] = useState<ConsentPartner | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = 'toast-' + Date.now() + Math.random().toString(36).substring(2, 5);
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const updateUserPersona = (persona: UserPersona, personaTitle: string) => {
    setUser((prev) => ({
      ...prev,
      persona,
      personaTitle
    }));
    showToast('Profile Persona Updated', `Switched view mode to ${personaTitle}.`, 'info');
  };

  const addRecord = (recordData: Omit<FinancialRecord, 'id' | 'referenceId'>) => {
    const newRecord: FinancialRecord = {
      ...recordData,
      id: `REC-09${Math.floor(Math.random() * 90) + 10}`,
      referenceId: `nx_ref_${Date.now().toString(36)}`
    };
    setRecords((prev) => [newRecord, ...prev]);
    showToast('Record Added', `${recordData.title} was uploaded and indexed.`, 'success');
  };

  const deleteRecord = (id: string) => {
    setRecords((prev) => prev.filter((r) => r.id !== id));
    showToast('Record Removed', 'The selected record was removed from your passport data.', 'info');
  };

  const addTransaction = (txData: Omit<FinancialTransaction, 'id' | 'referenceId'>) => {
    const newTx: FinancialTransaction = {
      ...txData,
      id: `TXN-${Math.floor(Math.random() * 9000) + 1000}`,
      referenceId: `nx_tx_${Date.now().toString(36)}`
    };
    setTransactions((prev) => [newTx, ...prev]);
    showToast('Transaction Logged', `${txData.title} was authenticated and recorded.`, 'success');
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    showToast('Transaction Removed', 'The selected entry was deleted from your history.', 'info');
  };

  const revokeConsent = (id: string) => {
    setPartners((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'revoked' as const } : p))
    );
    showToast('Access Revoked', 'Partner access was terminated. No further data queries will be fulfilled.', 'warning');
  };

  const grantConsent = (partnerData: Omit<ConsentPartner, 'id' | 'grantedDate' | 'status'>) => {
    const newPartner: ConsentPartner = {
      ...partnerData,
      id: `PART-0${partners.length + 1}`,
      grantedDate: 'Oct 02, 2026',
      status: 'active'
    };
    setPartners((prev) => [newPartner, ...prev]);
    showToast('Consent Granted', `Permission granted to ${partnerData.name} for ${partnerData.accessLevel}.`, 'success');
  };

  const openConsentModal = (partner: ConsentPartner | null) => {
    setActiveConsentPartner(partner);
    setIsConsentModalOpen(true);
  };

  const updateApplicantNotes = (id: string, notes: string) => {
    setApplicants((prev) =>
      prev.map((app) => (app.id === id ? { ...app, notes } : app))
    );
    showToast('Notes Saved', 'Assessment notes updated in applicant dossier.', 'success');
  };

  return (
    <NexusContext.Provider
      value={{
        user,
        updateUserPersona,
        cashFlowData,
        records,
        addRecord,
        deleteRecord,
        transactions,
        addTransaction,
        deleteTransaction,
        partners,
        revokeConsent,
        grantConsent,
        insights,
        applicants,
        updateApplicantNotes,
        isShareModalOpen,
        setIsShareModalOpen,
        isReportModalOpen,
        setIsReportModalOpen,
        isUploadModalOpen,
        setIsUploadModalOpen,
        isConsentModalOpen,
        setIsConsentModalOpen,
        activeConsentPartner,
        openConsentModal,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </NexusContext.Provider>
  );
};

export const useNexus = () => {
  const context = useContext(NexusContext);
  if (!context) {
    throw new Error('useNexus must be used within a NexusProvider');
  }
  return context;
};
