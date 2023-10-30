export interface ConfigProps {
  isHistory?: boolean;
  paramName?: string;
  historyCallback?: (state: SwipeStateProps) => void;
  direction?: 'row' | 'column';
}
export interface SwipeStateProps {
  isSwipe: 'pending' | 'wait' | 'disable';
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  currentStep: number;
  swipeTime: number;
}