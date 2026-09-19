export type ClauseTag =
  | 'Informational'
  | 'Important'
  | 'Review Recommended'
  | 'Potential Concern'
  | 'Financial'
  | 'Tenant Obligation'
  | 'Landlord Obligation'
  | 'Responsibilities';

export type ClauseCategory = 'Financial' | 'Termination' | 'Liability' | 'Responsibilities' | 'Governance' | 'General';

export interface ClauseExplanation {
  whatItSays: string;
  whyItMatters: string;
  whoItAffects: string;
  whatToVerify: string;
  suggestedQuestionForLawyer: string;
}

export interface Clause {
  id: string;
  sectionNumber: string;
  title: string;
  pageNumber: number;
  originalText: string;
  simplifiedText: string;
  tags: ClauseTag[];
  category: ClauseCategory;
  explanation: ClauseExplanation;
}

export interface Obligation {
  id: string;
  party: string;
  description: string;
  originalSection: string;
  frequencyOrCondition?: string;
  consequence?: string;
  importance: 'Standard' | 'Critical' | 'Watch';
}

export interface LegalDateEvent {
  id: string;
  date: string;
  formattedDate: string;
  event: string;
  explanation: string;
  actionRequired: string;
  isUpcoming?: boolean;
  daysRemaining?: number;
  sourceSection?: string;
}

export interface ReviewPoint {
  id: string;
  title: string;
  severity: ClauseTag;
  summary: string;
  detailedNotice: string;
  actionableStep: string;
  clauseId?: string;
}

export interface ActionChecklistItem {
  id: string;
  text: string;
  category: 'Immediate' | 'Pre-Signing' | 'Ongoing' | 'Legal Consultation';
  completed: boolean;
  note?: string;
  deadline?: string;
}

export interface LawyerQuestion {
  id: string;
  number: number;
  question: string;
  rationale: string;
  relatedClause: string;
  category: string;
}

export interface DocumentComparisonItem {
  category: string;
  field: string;
  docAValue: string;
  docBValue: string;
  aiExplanation: string;
  differenceType: 'identical' | 'minor_difference' | 'significant_difference' | 'warning';
  affectedParty: string;
}

export interface LegalDocument {
  id: string;
  name: string;
  type: string;
  fileSize?: string;
  uploadDate: string;
  lastAnalyzed: string;
  status: 'Ready' | 'Processing' | 'Analyzed';
  parties: string[];
  duration: string;
  governingLaw: string;
  totalClauses: number;
  summary: string;
  simpleLanguageSummary: {
    corePremise: string;
    financialSummary: string;
    exitConditions: string;
    mainRisks: string;
  };
  clauses: Clause[];
  obligations: Obligation[];
  dates: LegalDateEvent[];
  reviewPoints: ReviewPoint[];
  checklist: ActionChecklistItem[];
  lawyerQuestions: LawyerQuestion[];
  rawText?: string;
}

export interface ChatSourceCitation {
  clauseTitle: string;
  section: string;
  page: number;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  sources?: ChatSourceCitation[];
}
