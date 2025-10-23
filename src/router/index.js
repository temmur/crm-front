import { createRouter, createWebHistory } from 'vue-router'
import LDefault from '@/layouts/LDefault.vue'
import Dashboard from '@/views/DashboardView.vue'

const routes = [
    {
        path: '/',
        component: LDefault,
        children: [
            { path: '', component: Dashboard }
        ]
    }
]

export default createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})
