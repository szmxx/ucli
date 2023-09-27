<!--
 * @Author: cola
 * @Date: 2022-07-05 16:16:23
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="flex flex-nowrap h-full w-full">
    <div class="min-w-[220px]">
      <LeftMenu></LeftMenu>
    </div>
    <div class="flex flex-col flex-1 border-l">
      <div class="flex items-center min-h-[60px] border-b pl">
        <slot>DEMO 系统</slot>
      </div>
      <div class="flex-1">
        <router-view v-if="isSelfRoute"></router-view>
        <section id="subapp-viewport" class="relative w-full h-full"></section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeftMenu from './components/LeftMenu.vue'
import { isSelfRouteFn } from '@/layout/utils'
// 是否是自身路由
const isSelfRoute = isSelfRouteFn()
</script>
