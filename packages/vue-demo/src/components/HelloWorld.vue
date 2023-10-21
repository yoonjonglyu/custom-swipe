<script setup lang="ts">
import Swipe from './Swipe.vue';

defineProps<{ msg: string }>()
const items = [1,2,3,4,5,6];

</script>

<template>
  <h1>{{ msg }}</h1>
  <Swipe :items="items" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
