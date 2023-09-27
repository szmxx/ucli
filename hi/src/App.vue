<!--
 * @Author: cola
 * @Date: 2022-07-04 16:13:38
 * @LastEditors: cola
 * @Description:
-->

<template>
  <router-view v-if="isSelfRoute"></router-view>
  <LayoutPage v-else></LayoutPage>
</template>

<script lang="ts" setup>
import LayoutPage from '@/layout'
import { isSelfRouteFn } from '@/layout/utils'
// 是否是自身路由
const isSelfRoute = isSelfRouteFn()

console.log(import.meta.env.VITE_APP_NAME)
</script>
