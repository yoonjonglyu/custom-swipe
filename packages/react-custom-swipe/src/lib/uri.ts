export function getURL() {
  return `${location.origin}${location.pathname}`;
}
export function getSearchParams() {
  const result: { [key: string]: number | string } = {};
  const URI = new URLSearchParams(location.search);
  for (const [key, value] of URI.entries()) result[key] = value;

  return result;
}
export function formatQueryString(obj: { [key: string]: number | string }) {
  let result = '?';
  const params = Object.entries(obj);
  for (const [key, value] of params) result += `${key}=${value}&`;

  return params.length > 0 ? result.slice(0, result.length - 1) : result;
}
export function setHistory(
  data: { [key: string]: number | string },
  url?: string,
) {
  history.pushState(
    data,
    '',
    url !== undefined ? url : getURL() + formatQueryString(data),
  );
}
