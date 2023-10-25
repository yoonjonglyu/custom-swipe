<script lang="ts" setup>
import SwipeWrap from './SwipeWrap.vue';
import SwipeItem from './SwipeItem.vue';

defineProps<{ items: Array<any> }>();
const swipeConfig = {
  isHistory: false,
  paramName: 'ss',
  historyCallback: (state: any) => { console.log(state) },
};
</script>

<template>
  <SwipeWrap :config="swipeConfig">
    <SwipeItem v-for="i in items" :key="i">
      {{ i }}
    </SwipeItem>
  </SwipeWrap>
</template>

<style scoped></style>
