<script lang="ts" setup>
import SwipeWrap from '../../lib/components/SwipeWrap.vue';
import SwipeItem from '../../lib/components/SwipeItem.vue';
// import { SwipeItem, SwipeWrap } from 'vue-custom-swipe';

defineProps<{ items: Array<any> }>();
const swipeConfig = {
  isHistory: false,
  historyCallback: (state: any) => { console.log(state) },
  isCarousel: false,
  direction: 'row',
} as any;
</script>

<template>
  <SwipeWrap :config="swipeConfig">
    <SwipeItem v-for="i in items" :key="i">
      <img :src="i" alt="img" />
    </SwipeItem>
  </SwipeWrap>
</template>

<style scoped></style>
  