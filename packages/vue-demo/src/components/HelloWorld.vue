<script setup lang="ts">
import { ref } from 'vue';
import Swipe from './Swipe.vue';

defineProps<{ msg: string }>()
const items = ref([1, 2, 3, 4, 5, 6]);

</script>

<template>
  <h1 @click="items.push(88)">{{ msg }}</h1>
  <Swipe :items="items" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
