<!--
 * @Author: cola
 * @Date: 2022-07-04 19:17:18
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="flex justify-between h-[60px] items-center px-4 border-b">
    <div>{{ title }}</div>
    <div class="center gap-x-2">
      <DarkToggle></DarkToggle>
    </div>
  </div>
  <div class="flex gap-4 p-4">
    <div
      v-for="i in portals"
      :key="i.label"
      class="center rounded cursor-pointer w-400px h-200px bg-color hover:bg-primary"
      @click="openHandler(i)"
    >
      {{ i.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
import useStore from '@/store/app'
const { config } = useStore()
const title = config?.title
const portals = ref([
  {
    label: '中文',
    path: '/cn',
  },
  {
    label: '英文',
    path: '/en',
  },
])

const router = useRouter()

function openHandler(i: Record<string, string>) {
  router.push(i.path)
}
</script>
