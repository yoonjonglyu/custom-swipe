<script lang="ts" setup>
import { ref } from 'vue';
import useSwipe from '../composables/useSwipe';

defineProps<{ items: Array<any> }>();
const swipeRef = ref();
useSwipe(swipeRef);
</script>

<template>
  <div class='swipe-container'>
    <ul class='swipe-wrap' ref="swipeRef">
      <li class="swipe-item" v-for="i in items" :key="i">
        {{ i }}
      </li>
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

.swipe-item {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
}

.swipe-carousel {
  position: absolute;
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
