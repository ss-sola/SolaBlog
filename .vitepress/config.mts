import { defineConfig } from 'vitepress'
import AutoSidebarPlugin from 'vitepress-auto-sidebar-plugin'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SolaBlog",
  description: "SolaBlog",
  appearance:'dark',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }]
  ],
  srcDir: 'docs',
  outDir: 'dist',
  sitemap:{
    hostname: 'https://blog.metasola.cn/'
  },
  ignoreDeadLinks: true,
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    logo:'/logo.ico',
    outline:[1,3],
    nav: [
      { text: '粒子效果', link: '/首页/粒子效果' },
      { text: 'FreeMovie', link: '/FreeMovie/使用指南' },
      { text: '友链', link: '/' },
    ],
    search: {
      provider: 'algolia',
      options: {
        appId: 'D0ABS6ZBZS', // 你的 Application ID
        apiKey: 'f4029465497d63e93ad166438207c696', // 你的Search API Key
        indexName: 'metasola' // 你的indexName
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  vite: {
    plugins: [
      AutoSidebarPlugin({
        
      }),
    ],
  },
})
