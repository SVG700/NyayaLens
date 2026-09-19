import { describe, it, expect } from 'vitest';
import { generateChecklist, generateLawyerQuestions } from '@/lib/ai';
import {
  DEMO_RENTAL_AGREEMENT,
  DEMO_EMPLOYMENT_AGREEMENT,
  DEMO_SERVICE_CONTRACT
} from '@/lib/mockData';

describe('Action Checklist & Lawyer Preparation Briefs', () => {
  describe('Action Checklist Generation', () => {
    it('extracts structured diligence items categorized across lifecycle phases', () => {
      const checklist = generateChecklist(DEMO_RENTAL_AGREEMENT);

      expect(checklist).toBeDefined();
      expect(checklist.length).toBeGreaterThanOrEqual(4);

      const categories = checklist.map((i) => i.category);
      expect(categories).toContain('Pre-Signing');
      expect(categories).toContain('Immediate');
      expect(categories).toContain('Ongoing');
      expect(categories).toContain('Legal Consultation');

      checklist.forEach((item) => {
        expect(item.id).toBeDefined();
        expect(item.text.length).toBeGreaterThan(15);
        expect(typeof item.completed).toBe('boolean');
        expect(item.deadline).toBeDefined();
      });
    });

    it('handles employment contract checklist items', () => {
      const checklist = generateChecklist(DEMO_EMPLOYMENT_AGREEMENT);
      expect(checklist.length).toBeGreaterThan(0);
      const preSigning = checklist.filter((c) => c.category === 'Pre-Signing');
      expect(preSigning.length).toBeGreaterThan(0);
    });
  });

  describe('Lawyer Preparation Questions Generation', () => {
    it('generates high-leverage targeted inquiries for legal consultation', () => {
      const questions = generateLawyerQuestions(DEMO_RENTAL_AGREEMENT);

      expect(questions).toBeDefined();
      expect(questions.length).toBeGreaterThanOrEqual(3);

      questions.forEach((q) => {
        expect(q.id).toBeDefined();
        expect(typeof q.number).toBe('number');
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.rationale.length).toBeGreaterThan(20);
        expect(q.relatedClause).toBeDefined();
        expect(q.category).toBeDefined();
      });
    });

    it('cross-references specific contract clauses in inquiries', () => {
      const questions = generateLawyerQuestions(DEMO_EMPLOYMENT_AGREEMENT);
      const clausesReferenced = questions.map((q) => q.relatedClause);

      expect(clausesReferenced.some((ref) => ref.includes('Section'))).toBe(true);
    });
  });
});
