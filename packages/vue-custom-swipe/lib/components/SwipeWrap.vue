<script lang="ts" setup>
import { ref, onMounted, onUpdated } from 'vue';
import { ConfigProps } from 'swipe-core-provider';
import useSwipe from '../composables/useSwipe';

export interface SwipeWrapProps extends ConfigProps {
  isCarousel: boolean;
}

const { config } = defineProps<{ config: SwipeWrapProps }>();
const swipeRef = ref();
const dotRef = ref();
const dotsCount = ref(0);

const { handleSlide } = useSwipe(swipeRef, {
  ...config, historyCallback: (state) => {
    config?.historyCallback && config?.historyCallback(state);
    if (config.isCarousel && !config.isHistory) handleDot(state.currentStep);
  },
});

const handleDot = (index: number) => {
  if (dotRef.value !== null) {
    dotRef.value.childNodes.forEach((node: ChildNode, idx: number) => {
      const Node = node as HTMLLIElement;
      Node.className = index === idx ? 'active' : '';
    });
  }
};
onMounted(() => {
  dotsCount.value = swipeRef.value.children.length - 1;
});
onUpdated(() => {
  handleDot(parseInt(new URLSearchParams(location.search).get(config.paramName || 'index') || '0'));
});
</script>

<template>
  <div class='swipe-container'>
    <div v-if="config.isCarousel && !config.isHistory" class='swipe-carousel'>
      <button class='swipe-button swipe-left-button' @click="handleSlide('L')">
        〈
      </button>
      <button class='swipe-button swipe-right-button' @click="handleSlide('R')">
        〉
      </button>
      <ul class='carousel-dots' ref="dotRef">
        <li v-for="i in dotsCount" :key="i">
          {{ i }}
        </li>
      </ul>
    </div>
    <ul :class="{ 'swipe-wrap': true, 'column': config.direction === 'column' }" ref="swipeRef">
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped>
.swipe-container {
  position: relative;
  display: flex;
  padding: 0;
  overflow: hidden;
  z-index: 1;
}

.swipe-wrap {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 0;
  list-style: none;
  box-sizing: content-box;
}

.swipe-container .column {
  flex-direction: column !important;
}

.swipe-button {
  position: absolute;
  top: 50%;
  padding: 4px 2px 3px 4px;
  font-size: 2rem;
  color: rgba(48, 48, 48, 0.582);
  border: none;
  background: none;
  z-index: 2;
  cursor: pointer;
}

.swipe-left-button {
  left: 18px;
}

.swipe-right-button {
  right: 18px;
}

.carousel-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
  font-size: 0;
  z-index: 2;
}

.carousel-dots li {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 3px;
  list-style: none;
  font-size: 0px;
  border: 1px solid rgb(54, 53, 53);
  background: rgba(8, 8, 8, 0.199);
  border-radius: 100%;
}

.carousel-dots .active {
  background: rgb(103 39 39);
}
</style>
