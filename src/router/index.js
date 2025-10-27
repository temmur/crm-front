import { createRouter, createWebHistory } from 'vue-router'
import LDefault from '@/layouts/LDefault.vue'
import Dashboard from '@/views/DashboardView.vue'

// importlar bilan routing tuzilmasi
const routes = [
    // 🔹 Asosiy layout ichidagi sahifalar
    {
        path: '/',
        component: LDefault,
        children: [
            { path: '', component: Dashboard, name: 'Dashboard' },
            { path: 'news', component: () => import('@/views/PNews.vue'), name: 'News' },
            { path: 'settings', component: () => import('@/views/PSettings.vue'), name: 'Settings' },
            { path: 'map', component: () => import('@/views/PMap.vue'), name: 'Map' },
            {path: 'calendar',component: () => import('@/views/Calendar.vue'), name: 'Calendar' },

        ],
    },

    // 🔹 Auth sahifalar (layout’siz)
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/Login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue'),
    },


    // 🔹 404 sahifa (ixtiyoriy)
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})

export default router
