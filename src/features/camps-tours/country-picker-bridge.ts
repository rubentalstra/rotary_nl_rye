/**
 * Module-level bridge for the country picker.
 *
 * The picker lives on its own modal route (`/country-picker`) so it can host a
 * native `headerSearchBarOptions` search bar. Selection is plumbed back to the
 * caller via this single-slot resolver instead of URL params — keeps the
 * camps-tours screen's `filters` state as the single source of truth.
 *
 * Usage:
 *   setCountryResolver((code) => setFilters((p) => ({ ...p, country: code })));
 *   router.push("/country-picker");
 *   // ... picker calls resolveCountry(code) on tap, then router.back()
 */

let resolver: ((code: string) => void) | null = null;

export function setCountryResolver(cb: (code: string) => void) {
  resolver = cb;
}

export function resolveCountry(code: string) {
  resolver?.(code);
  resolver = null;
}

export function clearCountryResolver() {
  resolver = null;
}
