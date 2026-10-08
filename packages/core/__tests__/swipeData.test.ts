import { getStart, getMove, getEnd } from '../src/swipeData';
import SwipeState from '../src/state';

describe('swipeData calculations', () => {
  it('should extract mouse event coordinates correctly', () => {
    const mouseEvent = { pageX: 150, pageY: 250 } as any;
    const start = getStart(mouseEvent);
    expect(start).toEqual({ x: 150, y: 250 });
  });

  it('should extract touch event coordinates correctly', () => {
    const touchEvent = {
      targetTouches: [{ pageX: 80, pageY: 90 }],
    } as any;
    const start = getStart(touchEvent);
    expect(start).toEqual({ x: 80, y: 90 });
  });

  it('should calculate move offset correctly', () => {
    const state = new SwipeState(3, 'row');
    state.startSwipe(100, 100);
    state.currentX = 50;
    state.currentY = 0;

    const moveEvent = { pageX: 180, pageY: 120 } as any;
    const move = getMove(moveEvent, state);

    expect(move.x).toBe(180);
    expect(move.y).toBe(120);
    // offset.x = x - startX - currentX = 180 - 100 - 50 = 30
    expect(move.offset.x).toBe(30);
    // offset.y = y - startY - currentY = 120 - 100 - 0 = 20
    expect(move.offset.y).toBe(20);
  });

  it('should calculate end offset correctly', () => {
    const state = new SwipeState(3, 'row');
    state.startSwipe(200, 200);

    const endEvent = {
      changedTouches: [{ pageX: 120, pageY: 210 }],
    } as any;
    const end = getEnd(endEvent, state);

    expect(end.x).toBe(120);
    expect(end.y).toBe(210);
    // offset.x = startX - x = 200 - 120 = 80
    expect(end.offset.x).toBe(80);
    // offset.y = startY - y = 200 - 210 = -10
    expect(end.offset.y).toBe(-10);
  });
});
