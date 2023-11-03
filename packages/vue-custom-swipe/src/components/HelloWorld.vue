<script setup lang="ts">
import { ref } from 'vue';
import Swipe from './Swipe.vue';

defineProps<{ msg: string }>()
const items = ref([
  "./image/cat1.jpg",
  "./image/cat2.jpg",
  "./image/cat3.jpg",
  "./image/cat4.jpg",
  "./image/cat5.jpeg",
  "./image/cat6.jpeg",
  "./image/cat7.jpg",
  "./image/cat8.jpg",
  "./image/cat9.png",
  "./image/cat10.jpg",
  "./image/iu1.jpg",
  "./image/iu2.jpg",
]);

</script>

<template>
  <div class="wrap">
    <h1 @click="items.push('88')">{{ msg }}</h1>
    <Swipe :items="items" />
  </div>
</template>

<style scoped>
.wrap {
  width: 100%;
  max-width: 720px;
  max-height: 1800px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
