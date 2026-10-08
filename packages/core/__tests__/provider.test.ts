import SwipeProvider from '../src/provider';

describe('SwipeProvider', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    Object.defineProperty(container, 'clientWidth', { value: 500, configurable: true });
    Object.defineProperty(container, 'clientHeight', { value: 300, configurable: true });
  });

  it('should create provider with all expected interface methods', () => {
    const provider = SwipeProvider(3, { direction: 'row' });

    expect(typeof provider.desktopStart).toBe('function');
    expect(typeof provider.desktopMove).toBe('function');
    expect(typeof provider.desktopEnd).toBe('function');
    expect(typeof provider.mobileStart).toBe('function');
    expect(typeof provider.mobileMove).toBe('function');
    expect(typeof provider.mobileEnd).toBe('function');
    expect(typeof provider.resize).toBe('function');
    expect(typeof provider.init).toBe('function');
    expect(typeof provider.slidehandler).toBe('function');
    expect(typeof provider.changeIndex).toBe('function');
  });

  it('should handle slidehandler calls without errors', () => {
    const provider = SwipeProvider(3, { direction: 'row' });
    expect(() => {
      provider.slidehandler('R', container);
      provider.slidehandler('L', container);
    }).not.toThrow();
  });

  it('should handle changeIndex without errors', () => {
    const provider = SwipeProvider(4, { direction: 'column' });
    expect(() => {
      provider.changeIndex(2, container);
    }).not.toThrow();
  });
});
