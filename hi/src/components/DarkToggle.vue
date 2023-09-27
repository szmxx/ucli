<!--
 * @Author: cola
 * @Date: 2023-09-09 00:59:50
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
const theme = computed(() => currentTheme.value)
function toggleDark() {
  useTheme(theme.value === 'light' ? 'dark' : 'light')
}
</script>

<template>
  <button class="cursor-pointer" @click="toggleDark">
    <div class="i-carbon-sun" :class="{ 'i-carbon-moon!': theme === 'dark' }" />
  </button>
</template>
