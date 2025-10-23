import { createRouter, createWebHistory } from 'vue-router'
import LDefault from '@/layouts/LDefault.vue'
import Dashboard from '@/views/DashboardView.vue'

const routes = [
    {
        path: '/',
        component: LDefault,
        children: [
            { path: '', component: Dashboard },
            {path: "news", component: ()=> import('@/views/PNews.vue'), name: 'News'},
            {path: 'settings', component: ()=> import('@/views/PSettings.vue'), name:'Settings'},
            {path: 'map', component: ()=> import('@/views/PMap.vue'), name:'Map'}
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
