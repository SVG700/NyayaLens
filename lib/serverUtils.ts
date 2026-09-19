import crypto from 'crypto';

/**
 * Computes a deterministic SHA-256 fingerprint for caching API requests.
 * Uses Node's built-in crypto module with zero external dependencies.
 * Ensures identical inputs map to the same key and any difference in document text,
 * dialogue history, or parameters produces a distinct key.
 * Never logs or exposes raw document contents or secrets.
 */
export function computeCacheFingerprint(...parts: (string | number | undefined | null)[]): string {
  const hash = crypto.createHash('sha256');
  for (const part of parts) {
    hash.update(String(part ?? ''));
    hash.update('__NYAYA_DELIM__');
  }
  return hash.digest('hex');
}
