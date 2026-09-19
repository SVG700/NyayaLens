'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { LegalDocument } from '@/lib/types';
import {
  DEMO_RENTAL_AGREEMENT,
  DEMO_EMPLOYMENT_AGREEMENT,
  ALL_DEMO_DOCUMENTS
} from '@/lib/mockData';
import { analyzeDocument } from '@/lib/ai';

interface DocumentContextType {
  currentDocument: LegalDocument;
  documentsList: LegalDocument[];
  setCurrentDocument: (doc: LegalDocument) => void;
  selectDocumentById: (id: string) => void;
  loadDemoDocument: (id?: string) => void;
  uploadDocumentFile: (
    file: File,
    onProgress?: (stage: string, pct: number) => void
  ) => Promise<LegalDocument>;
  toggleChecklistItem: (itemId: string) => void;
  addCustomChecklistItem: (text: string, category: 'Immediate' | 'Pre-Signing' | 'Ongoing' | 'Legal Consultation') => void;
  comparisonDocA: LegalDocument;
  comparisonDocB: LegalDocument;
  setComparisonDocA: (doc: LegalDocument) => void;
  setComparisonDocB: (doc: LegalDocument) => void;
  isDemoActive: boolean;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

const STORAGE_KEY = 'nyayalens_active_doc';
const DOCS_LIST_KEY = 'nyayalens_docs_list';

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documentsList, setDocumentsList] = useState<LegalDocument[]>(ALL_DEMO_DOCUMENTS);
  const [currentDocument, setCurrentDocumentState] = useState<LegalDocument>(DEMO_RENTAL_AGREEMENT);
  const [comparisonDocA, setComparisonDocA] = useState<LegalDocument>(DEMO_RENTAL_AGREEMENT);
  const [comparisonDocB, setComparisonDocB] = useState<LegalDocument>(DEMO_EMPLOYMENT_AGREEMENT);
  const [isDemoActive, setIsDemoActive] = useState<boolean>(true);

  // Hydrate from localStorage if available
  useEffect(() => {
    try {
      const savedDoc = localStorage.getItem(STORAGE_KEY);
      if (savedDoc) {
        const parsed = JSON.parse(savedDoc);
        if (parsed && parsed.id && parsed.clauses) {
          setCurrentDocumentState(parsed);
        }
      }
      const savedList = localStorage.getItem(DOCS_LIST_KEY);
      if (savedList) {
        const parsedList = JSON.parse(savedList);
        if (Array.isArray(parsedList) && parsedList.length > 0) {
          setDocumentsList(parsedList);
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const setCurrentDocument = useCallback((doc: LegalDocument) => {
    setCurrentDocumentState(doc);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(doc));
    } catch {
      // ignore
    }
  }, []);

  const selectDocumentById = useCallback((id: string) => {
    setDocumentsList((currentList) => {
      const found = currentList.find((d) => d.id === id) || ALL_DEMO_DOCUMENTS.find((d) => d.id === id);
      if (found) {
        setCurrentDocumentState(found);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
        } catch {
          // ignore
        }
      }
      return currentList;
    });
  }, []);

  const loadDemoDocument = useCallback((id: string = 'doc-rental-001') => {
    const found = ALL_DEMO_DOCUMENTS.find((d) => d.id === id) || DEMO_RENTAL_AGREEMENT;
    setCurrentDocumentState(found);
    setIsDemoActive(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    } catch {
      // ignore
    }
  }, []);

  const uploadDocumentFile = useCallback(async (
    file: File,
    onProgress?: (stage: string, pct: number) => void
  ): Promise<LegalDocument> => {
    let rawText = '';
    try {
      if (file.type.includes('text') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        rawText = await file.text();
      } else {
        rawText = DEMO_RENTAL_AGREEMENT.rawText || '';
      }
    } catch {
      rawText = DEMO_RENTAL_AGREEMENT.rawText || '';
    }

    const analyzed = await analyzeDocument(file.name, rawText, onProgress);
    setCurrentDocumentState(analyzed);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(analyzed));
    } catch {
      // ignore
    }

    setDocumentsList((prev) => {
      const updated = [analyzed, ...prev.filter((d) => d.id !== analyzed.id)];
      try {
        localStorage.setItem(DOCS_LIST_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    return analyzed;
  }, []);

  const toggleChecklistItem = useCallback((itemId: string) => {
    setCurrentDocumentState((prevDoc) => {
      const updatedChecklist = prevDoc.checklist.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      );
      const updatedDoc = {
        ...prevDoc,
        checklist: updatedChecklist
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDoc));
      } catch {
        // ignore
      }
      return updatedDoc;
    });
  }, []);

  const addCustomChecklistItem = useCallback((
    text: string,
    category: 'Immediate' | 'Pre-Signing' | 'Ongoing' | 'Legal Consultation'
  ) => {
    const newItem = {
      id: `chk-${Date.now()}`,
      text,
      category,
      completed: false,
      deadline: 'Pending'
    };
    setCurrentDocumentState((prevDoc) => {
      const updatedDoc = {
        ...prevDoc,
        checklist: [...prevDoc.checklist, newItem]
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDoc));
      } catch {
        // ignore
      }
      return updatedDoc;
    });
  }, []);

  const contextValue = useMemo<DocumentContextType>(() => ({
    currentDocument,
    documentsList,
    setCurrentDocument,
    selectDocumentById,
    loadDemoDocument,
    uploadDocumentFile,
    toggleChecklistItem,
    addCustomChecklistItem,
    comparisonDocA,
    comparisonDocB,
    setComparisonDocA,
    setComparisonDocB,
    isDemoActive
  }), [
    currentDocument,
    documentsList,
    setCurrentDocument,
    selectDocumentById,
    loadDemoDocument,
    uploadDocumentFile,
    toggleChecklistItem,
    addCustomChecklistItem,
    comparisonDocA,
    comparisonDocB,
    isDemoActive
  ]);

  return (
    <DocumentContext.Provider value={contextValue}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};
