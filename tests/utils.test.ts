import { describe, it, expect } from 'vitest';
import { cn, formatDate } from '@/lib/utils';
import { computeCacheFingerprint } from '@/lib/serverUtils';

describe('Utility Functions', () => {
  describe('cn (Class Merger)', () => {
    it('merges class names and handles conditional classnames', () => {
      expect(cn('px-2', 'py-1')).toBe('px-2 py-1');
      expect(cn('px-2', false && 'hidden', true && 'block')).toBe('px-2 block');
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500'); // Tailwind merge conflict resolution
    });
  });

  describe('formatDate', () => {
    it('formats ISO date strings into readable format', () => {
      const formatted = formatDate('2026-03-15');
      expect(formatted).toBe('Mar 15, 2026');
    });

    it('gracefully returns invalid date strings untouched', () => {
      expect(formatDate('invalid-date-string')).toBe('invalid-date-string');
    });
  });

  describe('computeCacheFingerprint (Deterministic SHA-256 Cache Safety)', () => {
    it('produces identical fingerprints for identical inputs', () => {
      const fp1 = computeCacheFingerprint('Lease.pdf', 'what is rent', 'Sample contract body text', 'None');
      const fp2 = computeCacheFingerprint('Lease.pdf', 'what is rent', 'Sample contract body text', 'None');
      expect(fp1).toBe(fp2);
      expect(fp1).toMatch(/^[a-f0-9]{64}$/); // Standard 64-char SHA-256 hex digest
    });

    it('changes fingerprint when later content of document changes despite identical prefix', () => {
      const prefix = 'A'.repeat(500); // Identical 500-char prefix
      const docA = prefix + 'Ending clause version 1 with fee $100';
      const docB = prefix + 'Ending clause version 2 with fee $999';

      const fpA = computeCacheFingerprint('Lease.pdf', 'rent', docA, 'None');
      const fpB = computeCacheFingerprint('Lease.pdf', 'rent', docB, 'None');

      expect(fpA).not.toBe(fpB);
    });

    it('changes fingerprint when conversation history changes', () => {
      const doc = 'Standard contract text';
      const fpWithoutHistory = computeCacheFingerprint('Doc.pdf', 'penalties', doc, 'None');
      const fpWithHistory = computeCacheFingerprint('Doc.pdf', 'penalties', doc, 'User: Prior inquiry\nAssistant: Prior response');

      expect(fpWithoutHistory).not.toBe(fpWithHistory);
    });

    it('prevents collisions between documents sharing same filename and prefix', () => {
      const sharedPreamble = 'RESIDENTIAL TENANCY AGREEMENT executed between Landlord and Tenant';
      const doc1 = sharedPreamble + ' with clause 10 specifying termination in 30 days';
      const doc2 = sharedPreamble + ' with clause 10 specifying termination in 90 days';

      const key1 = computeCacheFingerprint('Agreement.pdf', 'notice', doc1, 'None');
      const key2 = computeCacheFingerprint('Agreement.pdf', 'notice', doc2, 'None');

      expect(key1).not.toBe(key2);
    });

    it('prevents collision in document comparison when later content changes', () => {
      const baseline = 'Baseline service contract terms';
      const rev1 = 'Revision with liability cap $50,000';
      const rev2 = 'Revision with liability cap $500,000';

      const compareKey1 = computeCacheFingerprint('Draft A', baseline, 'Draft B', rev1);
      const compareKey2 = computeCacheFingerprint('Draft A', baseline, 'Draft B', rev2);

      expect(compareKey1).not.toBe(compareKey2);
    });

    it('does not leak or expose raw document text or conversation contents in the key', () => {
      const sensitiveText = 'CONFIDENTIAL SETTLEMENT: $5,000,000 USD ESCROW';
      const key = computeCacheFingerprint('Settlement.pdf', 'escrow', sensitiveText, 'None');

      expect(key).not.toContain(sensitiveText);
      expect(key).not.toContain('CONFIDENTIAL');
      expect(key).toHaveLength(64);
    });
  });
});
