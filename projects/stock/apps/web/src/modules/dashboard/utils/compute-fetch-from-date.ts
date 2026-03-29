/**
 * Format a Date as YYYY-MM-DD string (ISO date only, no time).
 */
export function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Compute the fetch-from date for price queries.
 *
 * Ensures at least 60 calendar days of data is fetched (from `toDate` backwards),
 * even if `fromDate` is more recent. This guarantees enough look-back data for
 * trade_value and foreign aggregate calculations.
 */
export function computeFetchFromDate(fromDate: string, toDate: string): string {
  const toDateObj = new Date(toDate + "T00:00:00");
  const minFetch = new Date(toDateObj);
  minFetch.setDate(minFetch.getDate() - 60);
  const minFetchStr = formatDate(minFetch);
  return fromDate < minFetchStr ? fromDate : minFetchStr;
}
