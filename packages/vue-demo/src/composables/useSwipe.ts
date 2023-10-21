import { onMounted, onBeforeUnmount, Ref } from 'vue';

export interface useSwipeProps {}

const useSwipe = (ref: Ref<HTMLElement>) => {
  const click = (e: MouseEvent) => console.log(e);
  onMounted(() => {
    ref.value.addEventListener('click', click);
  });
  onBeforeUnmount(() => {
    ref.value.removeEventListener('click', click);
  });
};

export default useSwipe;
