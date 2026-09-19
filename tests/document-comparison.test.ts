import { describe, it, expect } from 'vitest';
import { compareDocuments } from '@/lib/ai';
import {
  DEMO_RENTAL_AGREEMENT,
  DEMO_EMPLOYMENT_AGREEMENT,
  COMPARISON_DEMO_DATA,
  COMPARISON_PRESETS
} from '@/lib/mockData';

describe('Document Comparison Engine', () => {
  it('generates structured side-by-side comparison with AI summary', async () => {
    const result = await compareDocuments(DEMO_RENTAL_AGREEMENT, DEMO_EMPLOYMENT_AGREEMENT);

    expect(result).toBeDefined();
    expect(result.summary).toBeDefined();
    expect(result.summary.length).toBeGreaterThan(50);
    expect(result.items.length).toBeGreaterThanOrEqual(4);
  });

  it('validates comparison item structure and strict type enforcement', async () => {
    const result = await compareDocuments(DEMO_RENTAL_AGREEMENT, DEMO_EMPLOYMENT_AGREEMENT);

    const validDifferenceTypes = ['warning', 'significant_difference', 'minor_difference', 'identical'];

    result.items.forEach((item) => {
      expect(item.category).toBeDefined();
      expect(item.field).toBeDefined();
      expect(item.docAValue).toBeDefined();
      expect(item.docBValue).toBeDefined();
      expect(item.aiExplanation).toBeDefined();
      expect(item.affectedParty).toBeDefined();
      expect(validDifferenceTypes).toContain(item.differenceType);
    });
  });

  it('flags aggressive unilateral covenants with warning differenceType', async () => {
    const result = await compareDocuments(DEMO_RENTAL_AGREEMENT, DEMO_EMPLOYMENT_AGREEMENT);

    const warnings = result.items.filter((item) => item.differenceType === 'warning');
    expect(warnings.length).toBeGreaterThan(0);

    // Verify warning item contains clear risk explanation
    warnings.forEach((w) => {
      expect(w.aiExplanation.length).toBeGreaterThan(20);
    });
  });

  it('ensures all comparison presets are populated and consistent', () => {
    const presetList = Object.values(COMPARISON_PRESETS);
    expect(presetList.length).toBe(3);

    presetList.forEach((preset) => {
      expect(preset.id).toBeDefined();
      expect(preset.label).toBeDefined();
      expect(preset.category).toBeDefined();
      expect(preset.docA.name).toBeDefined();
      expect(preset.docB.name).toBeDefined();
      expect(preset.comparisonItems.length).toBeGreaterThan(0);
      expect(preset.summaryAI.length).toBeGreaterThan(20);
    });
  });
});
