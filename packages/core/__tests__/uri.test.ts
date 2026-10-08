import { formatQueryString, getSearchParams, getURL } from '../src/uri';

describe('uri utilities', () => {
  it('should format query string properly', () => {
    expect(formatQueryString({ index: '2', tab: 'home' })).toBe('?index=2&tab=home');
    expect(formatQueryString({})).toBe('');
  });

  it('should be safe when window is defined in test environment', () => {
    const url = getURL();
    expect(typeof url).toBe('string');
  });

  it('should parse search params into an object', () => {
    delete (window as any).location;
    (window as any).location = new URL('https://example.com/test?index=3&tag=react');

    const params = getSearchParams();
    expect(params.index).toBe('3');
    expect(params.tag).toBe('react');
  });
});
