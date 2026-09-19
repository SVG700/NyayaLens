import { describe, it, expect, vi, beforeEach } from 'vitest';
import { analyzeDocument, extractFromCustomText } from '@/lib/ai';
import { DEMO_RENTAL_AGREEMENT } from '@/lib/mockData';

describe('Document Analysis & Clause Extraction', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns canonical rental agreement for standard demo requests', async () => {
    const doc = await analyzeDocument('Standard Lease Agreement', '');
    expect(doc).toBeDefined();
    expect(doc.id).toBe(DEMO_RENTAL_AGREEMENT.id);
    expect(doc.clauses.length).toBeGreaterThanOrEqual(6);
    expect(doc.obligations.length).toBeGreaterThan(0);
    expect(doc.dates.length).toBeGreaterThan(0);
    expect(doc.reviewPoints.length).toBeGreaterThan(0);
  });

  it('extracts clauses from custom legal text using heuristic parser', () => {
    const customText = `
RESIDENTIAL SUB-LEASE AGREEMENT
Section 1.1 Rent and Security Deposit
The sub-tenant shall pay a monthly rental sum of $2,200.00 due on the first calendar day of each month. A security deposit of $4,400.00 is required upon signing.

Section 2.1 Termination and Notice
Either party may terminate this sub-lease agreement by providing forty-five (45) calendar days prior written notice. Early abandonment incurs a fee equal to two months rent.

Section 3.1 Maintenance and Repairs
The sub-tenant is obligated to perform regular upkeep and repair any minor damages under $150.00 per occurrence.

Section 4.1 Indemnity and Liability
The sub-tenant agrees to indemnify and hold harmless the principal tenant against all third-party claims, property damage, and legal expenses.

Section 5.1 Dispute Resolution and Governing Law
Any dispute arising under this instrument shall be resolved through binding arbitration in the City of Bengaluru, Karnataka.
    `;

    const doc = extractFromCustomText('Custom_Sublease.txt', customText);

    expect(doc.name).toBe('Custom_Sublease.txt');
    expect(doc.clauses.length).toBeGreaterThanOrEqual(5);

    // Verify clause structure
    const rentClause = doc.clauses.find(c => c.category === 'Financial');
    expect(rentClause).toBeDefined();
    expect(rentClause?.tags).toContain('Financial');
    expect(rentClause?.explanation.whatItSays).toBeDefined();
    expect(rentClause?.explanation.whyItMatters).toBeDefined();
    expect(rentClause?.explanation.suggestedQuestionForLawyer).toBeDefined();

    // Verify Termination category
    const termClause = doc.clauses.find(c => c.category === 'Termination');
    expect(termClause).toBeDefined();
    expect(termClause?.tags).toContain('Review Recommended');

    // Verify Liability category
    const liabClause = doc.clauses.find(c => c.category === 'Liability');
    expect(liabClause).toBeDefined();
    expect(liabClause?.tags).toContain('Potential Concern');

    // Verify Responsibilities category
    const respClause = doc.clauses.find(c => c.category === 'Responsibilities');
    expect(respClause).toBeDefined();

    // Verify Review Points generation
    expect(doc.reviewPoints.length).toBeGreaterThanOrEqual(2);
    expect(doc.reviewPoints[0].actionableStep).toBeDefined();
    expect(doc.reviewPoints[0].severity).toBe('Review Recommended');
  });

  it('falls back to heuristics when live Gemini API call fails', async () => {
    // Mock fetch to simulate network or 500 error
    global.fetch = vi.fn().mockRejectedValue(new Error('Network offline'));

    const customText = `
Section 1.0 Consulting Fees
Client shall pay Contractor $150.00 per billable hour on Net-30 day payment terms.
Section 2.0 Work Product Ownership
All deliverables shall remain exclusive property of Contractor until paid in full.
    `;

    const doc = await analyzeDocument('Consulting_Agreement.txt', customText);
    expect(doc).toBeDefined();
    expect(doc.clauses.length).toBeGreaterThanOrEqual(2);
    expect(doc.name).toBe('Consulting_Agreement.txt');
  });

  it('invokes progress callbacks during document analysis', async () => {
    const progressStages: string[] = [];
    const progressValues: number[] = [];

    await analyzeDocument('Test_Doc.pdf', '', (stage, pct) => {
      progressStages.push(stage);
      progressValues.push(pct);
    });

    expect(progressStages.length).toBe(4);
    expect(progressValues).toEqual([20, 45, 75, 95]);
  });
});
