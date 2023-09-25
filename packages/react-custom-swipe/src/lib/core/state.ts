export interface SwipeStateProps {
  isSwipe: boolean | null;
  startX: number;
  startY: number;
  currentX: number;
  currentStep: number;
  swipeTime: number;
}
class SwipeState implements SwipeStateProps {
  isSwipe: boolean | null;
  startX: number;
  startY: number;
  currentX: number;
  currentStep: number;
  swipeTime: number;
  
  constructor() {
    this.isSwipe = false;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentStep = 0;
    this.swipeTime = 0;
  }
}

export default SwipeState;
