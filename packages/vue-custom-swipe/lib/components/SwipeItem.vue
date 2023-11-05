<script lang="ts" setup>
</script>

<template>
  <li class="swipe-item">
    <slot></slot>
  </li>
</template>

<style scoped>
.swipe-item {
  position: relative;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  box-sizing: border-box;
  -webkit-user-drag: none;
}
</style>
