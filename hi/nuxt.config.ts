/*
 * @Author: cola
 * @Date: 2023-08-06 17:42:54
 * @LastEditors: cola
 * @Description:
 */
import { pwa } from './config/pwa'
import { description } from './package.json'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    
    '@vite-pwa/nuxt',
  ],
  runtimeConfig: {
    public: {
      name: process.env.NUXT_APP_NAME,
    },
  },

  experimental: {
    payloadExtraction: false,
    inlineSSRStyles: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  css: ['@unocss/reset/tailwind.css', '@/style/global.scss'],

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
        drop: ['console', 'debugger'],
        minify: true,
        minifyWhitespace: true,
        minifySyntax: true,
      },
    },
    minify: true,
    sourceMap: false,
    prerender: {
      failOnError: false,
      crawlLinks: true,
      routes: ['/'],
      ignore: [],
    },
  },

  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1,maximum-scale=1.0,user-scalable=0',
        },
        { name: 'description', content: description },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
      ],
    },
  },
  imports: {
    dirs: ['store'],
  },
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate', 'storeToRefs'],
  },

  pwa,

  devtools: {
    enabled: true,
  },
})
