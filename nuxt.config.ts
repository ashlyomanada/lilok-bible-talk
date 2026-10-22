// https://nuxt.com/docs/api/configuration/nuxt-config
import { eventConfig } from './config/event'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: '.',
  devtools: { enabled: false },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: eventConfig.seo.title,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: eventConfig.seo.description },
        { name: 'theme-color', content: '#0F1B26' },

        // Open Graph / Facebook / Messenger
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: "You're invited to Lilok Bible Talk" },
        { property: 'og:description', content: eventConfig.seo.description },
        { property: 'og:image', content: eventConfig.seo.ogImage },
        { property: 'og:site_name', content: eventConfig.groupName },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: "You're invited to Lilok Bible Talk" },
        { name: 'twitter:description', content: eventConfig.seo.description },
        { name: 'twitter:image', content: eventConfig.seo.ogImage }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', href: '/images/mnl-logo.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
      ]
    }
  },

  nitro: {
    prerender: {
      routes: ['/']
    }
  }
})
