<!--
 * @Author: cola
 * @Date: 2023-08-06 17:42:54
 * @LastEditors: cola
 * @Description:
-->
<script setup lang="ts">
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import { name } from './package.json'

  useHead({
    title: name,
  })
  const { locale } = useI18n()
  let current = shallowRef()
  watch(
    locale,
    (newVal) => {
      switch (newVal) {
        case 'zh-CN':
          current.value = zhCn
          break
        case 'en':
          current.value = null
          break
      }
    },
    {
      immediate: true,
    },
  )
</script>

<template>
  <Html dir="ltr">
    <Head>
      <VitePwaManifest />
    </Head>
    <Body>
      <el-config-provider :locale="current">
        <NuxtLayout>
          <NuxtLoadingIndicator />
          <NuxtPage />
        </NuxtLayout>
      </el-config-provider>
    </Body>
  </Html>
</template>
