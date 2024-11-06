<script setup lang="ts">
import { ref } from 'vue'

const text = ref(false)
function handleClickBtn() {
  text.value = !text.value
}
</script>

<template>
  <YButton size="default" type="primary" icon="search" plain @click="handleClickBtn">
    <span v-show="text">button</span>
  </YButton>

  <YButton size="default" type="primary" icon="search">
    asdsa
  </YButton>
</template>

<style scoped>
</style>
