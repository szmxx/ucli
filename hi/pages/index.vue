<!--
 * @Author: cola
 * @Date: 2023-08-06 17:42:54
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  const online = useOnline()
</script>

<template>
  <Suspense>
    <Counter v-if="online" />
    <div v-else text-gray:80>You're offline</div>
    <template #fallback>
      <div italic op50>
        <span animate-pulse>Loading...</span>
      </div>
    </template>
  </Suspense>
</template>
