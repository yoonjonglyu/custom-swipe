export default function SwipeEvents(
  Container: HTMLElement,
  itemLength: number,
) {
  let isSwipe = false;
  let initOffset = 0;
  let currentStep = 0;
  let currentOffset = 0;
  let swipeTime = 0;

  /**
   * @description 스와이프 기능(플립액션)과 리사이즈 관련 된 로직들
   */
  const handleStart = (x: number) => {
    isSwipe = true;
    initOffset = x;
    swipeTime = Date.now();
  };
  const handleMove = (x: number) => {
    if (isSwipe) {
      const offset = initOffset - x - currentOffset;
      Container.style.transition = 'none';
      Container.style.transform = `translateX(${offset}px)`;
    }
  };
  const handleEnd = (x: number) => {
    if (isSwipe) {
      const viewport = window.innerWidth > 500 ? 720 : 360;
      const offset = initOffset - x;
      if (Math.abs(offset) >= viewport / 2 || Date.now() - swipeTime < 200) {
        if (offset > 0 && currentStep > 0) {
          currentStep--;
          currentOffset = currentStep * viewport;
        } else if (offset < 0 && currentStep < itemLength - 1) {
          currentStep++;
          currentOffset = currentStep * viewport;
        }
      }
      Container.style.transition = '400ms';
      Container.style.transform = `translateX(-${currentOffset}px)`;
      isSwipe = false;
      swipeTime = 0;
    }
  };
  const handleResize = () => {
    const viewport = window.innerWidth > 500 ? 720 : 360;
    currentOffset = currentStep * viewport;
    Container.style.transition = '0';
    Container.style.transform = `translateX(-${currentOffset}px)`;
  };

  return {
    desktopStart: (e: MouseEvent) => {
      handleStart(e.pageX);
    },
    desktopMove: (e: MouseEvent) => {
      handleMove(e.pageX);
    },
    desktopEnd: (e: MouseEvent) => {
      if (!/iPhone|iPad|Android/g.test(navigator.userAgent)) handleEnd(e.pageX);
    },
    mobileStart: (e: TouchEvent) => {
      handleStart(e.touches[0].pageX);
    },
    mobileMove: (e: TouchEvent) => {
      handleMove(e.targetTouches[0].pageX);
    },
    mobileEnd: (e: TouchEvent) => {
      handleEnd(e.changedTouches[0].pageX);
    },
    resize: () => {
      handleResize();
    },
  };
}
