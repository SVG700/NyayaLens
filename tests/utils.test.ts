import { describe, it, expect } from 'vitest';
import { cn, formatDate } from '@/lib/utils';

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
});
