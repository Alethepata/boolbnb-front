import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import RicercaAppartamenti from './pages/RicercaAppartamenti.vue';
import Accedi from './pages/Accedi.vue';
import Registrati from './pages/Registrati.vue';
import Error404 from './pages/Error404.vue';
import ApartmentDetail from './pages/ApartmentDetail.vue';

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',

    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
        },
        {
            path: '/ricerca-appartamenti',
            name: 'ricerca',
            component: RicercaAppartamenti,
        },
        {
            path: '/accedi',
            name: 'accedi',
            component: Accedi,
        },
        {
            path: '/registrati',
            name: 'registrati',
            component: Registrati,
        },

        {
            path: '/apartment-detail/:slug',
            name: 'apartment-detail',
            component: ApartmentDetail,
        },

        {
            path: '/:pathMatch(.*)*',
            component: Error404,
        },
    ]
})

export {router}