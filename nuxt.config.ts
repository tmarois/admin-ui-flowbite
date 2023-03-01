import { createResolver } from '@nuxt/kit'
const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            BASE_URL: process.env.BASE_URL,
            API_URL: process.env.API_URL,
        }
    },
    css: [
        resolve('./assets/css/main.css')
    ],
    modules: [
        '@nuxtjs/tailwindcss',
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    'defineStore', 
                    ['defineStore', 'definePiniaStore'],
                    'storeToRefs'
                ],
            },
        ],
        '@pinia-plugin-persistedstate/nuxt',
    ],
    vite: {
        // resolve: {
        //     alias: {
        //         $houdini: path.resolve('.', '$houdini'),
        //     },
        // },
        server: {
            fs: {
                // Allow serving files from one level up to the project root
                allow: ['..'],
            },
        },
    }
})