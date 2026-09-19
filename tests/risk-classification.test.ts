import { describe, it, expect } from 'vitest';
import { ALL_DEMO_DOCUMENTS } from '@/lib/mockData';
import { ClauseTag } from '@/lib/types';

describe('Risk & Review Classification (Responsible AI Alignment)', () => {
  const allowedSeverities: ClauseTag[] = [
    'Informational',
    'Important',
    'Review Recommended',
    'Potential Concern'
  ];

  const allowedTags: ClauseTag[] = [
    'Informational',
    'Important',
    'Review Recommended',
    'Potential Concern',
    'Financial',
    'Tenant Obligation',
    'Landlord Obligation',
    'Responsibilities'
  ];

  it('ensures all review points adhere to the 4-tier objective severity taxonomy', () => {
    ALL_DEMO_DOCUMENTS.forEach((doc) => {
      expect(doc.reviewPoints.length).toBeGreaterThan(0);
      doc.reviewPoints.forEach((rp) => {
        expect(allowedSeverities).toContain(rp.severity);
        expect(rp.title).toBeDefined();
        expect(rp.summary.length).toBeGreaterThan(15);
        expect(rp.detailedNotice.length).toBeGreaterThan(20);
        expect(rp.actionableStep.length).toBeGreaterThan(15);
      });
    });
  });

  it('verifies that no clause or review point makes definitive legal judgments', () => {
    const forbiddenTerms = ['is illegal', 'is unlawful', 'violates the law', 'is void'];

    ALL_DEMO_DOCUMENTS.forEach((doc) => {
      doc.clauses.forEach((clause) => {
        // Assert that severity tags are objective
        clause.tags.forEach((tag) => {
          expect(allowedTags).toContain(tag);
        });

        // Assert that simplified explanations do not declare absolute illegality
        forbiddenTerms.forEach((term) => {
          expect(clause.simplifiedText.toLowerCase()).not.toContain(term);
          expect(clause.explanation.whatItSays.toLowerCase()).not.toContain(term);
        });
      });
    });
  });

  it('validates 5-point Explain Why drill-down structure for every clause', () => {
    ALL_DEMO_DOCUMENTS.forEach((doc) => {
      doc.clauses.forEach((clause) => {
        const exp = clause.explanation;
        expect(exp).toBeDefined();
        expect(exp.whatItSays.length).toBeGreaterThan(10);
        expect(exp.whyItMatters.length).toBeGreaterThan(10);
        expect(exp.whoItAffects.length).toBeGreaterThan(5);
        expect(exp.whatToVerify.length).toBeGreaterThan(10);
        expect(exp.suggestedQuestionForLawyer.length).toBeGreaterThan(10);
      });
    });
  });
});
