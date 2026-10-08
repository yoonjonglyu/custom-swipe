export function getURL(): string {
  if (typeof window === 'undefined') return '';
  return `${window.location.origin}${window.location.pathname}`;
}

export function getSearchParams(): { [key: string]: string } {
  if (typeof window === 'undefined') return {};
  const result: { [key: string]: string } = {};
  const uri = new URLSearchParams(window.location.search);
  for (const [key, value] of uri.entries()) {
    result[key] = value;
  }
  return result;
}

export function formatQueryString(obj: { [key: string]: string }): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null) {
      params.set(key, value);
    }
  }
  const str = params.toString();
  return str ? `?${str}` : '';
}

export function setHistory(data: { [key: string]: string }, url?: string): void {
  if (typeof window === 'undefined' || !window.history) return;
  const targetUrl = url !== undefined ? url : getURL() + formatQueryString(data);
  window.history.pushState(data, '', targetUrl);
}

export function changeHistory(data: { [key: string]: string }, url?: string): void {
  if (typeof window === 'undefined' || !window.history) return;
  const targetUrl = url !== undefined ? url : getURL() + formatQueryString(data);
  window.history.replaceState(data, '', targetUrl);
}

