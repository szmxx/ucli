<!--
 * @Author: cola
 * @Date: 2023-07-15 16:03:37
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
import { ref } from 'vue'
const msg = ref('hello world')
const count = ref(0)
function onClick() {
  msg.value = 'greeting'
  count.value++
}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="onClick">count is {{ count }}</button>
  </div>
</template>
