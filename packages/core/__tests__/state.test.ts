import SwipeState from '../src/state';

describe('SwipeState', () => {
  it('should initialize with default values', () => {
    const state = new SwipeState(5, 'row');
    expect(state.isSwipe).toBe('wait');
    expect(state.startX).toBe(0);
    expect(state.startY).toBe(0);
    expect(state.currentX).toBe(0);
    expect(state.currentY).toBe(0);
    expect(state.currentStep).toBe(0);
    expect(state.direction).toBe('row');
  });

  it('should transition to pending state on startSwipe', () => {
    const state = new SwipeState(5, 'row');
    state.startSwipe(100, 200);
    expect(state.isSwipe).toBe('pending');
    expect(state.startX).toBe(100);
    expect(state.startY).toBe(200);
    expect(state.swipeTime).toBeGreaterThan(0);
  });

  it('should guard currentStep bounds correctly', () => {
    const state = new SwipeState(3, 'row');
    state.currentStep = 1;
    expect(state.currentStep).toBe(1);

    state.currentStep = 2;
    expect(state.currentStep).toBe(2);

    // Out of bounds - should be ignored
    state.currentStep = 3;
    expect(state.currentStep).toBe(2);

    state.currentStep = -1;
    expect(state.currentStep).toBe(2);
  });

  it('should loop currentStep when isInfinite is true', () => {
    const state = new SwipeState(3, 'row', true);
    expect(state.isInfinite).toBe(true);
    expect(state.currentStep).toBe(0);

    // Increment past end -> loop to 0
    state.currentStep = 3;
    expect(state.currentStep).toBe(0);

    // Increment to 4 -> 4 % 3 = 1
    state.currentStep = 4;
    expect(state.currentStep).toBe(1);

    // Decrement below 0 -> loop to 2
    state.currentStep = -1;
    expect(state.currentStep).toBe(2);

    state.currentStep = -2;
    expect(state.currentStep).toBe(1);
  });

  it('should transition to disable then wait on endSwipe', () => {
    jest.useFakeTimers();
    const state = new SwipeState(5, 'row');
    state.startSwipe(50, 50);
    state.endSwipe(300, 0, 333);

    expect(state.isSwipe).toBe('disable');
    expect(state.currentX).toBe(300);
    expect(state.currentY).toBe(0);
    expect(state.swipeTime).toBe(0);

    jest.advanceTimersByTime(333);
    expect(state.isSwipe).toBe('wait');
    jest.useRealTimers();
  });
});

