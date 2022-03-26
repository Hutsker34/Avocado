import { createWebHistory, createRouter } from "vue-router";

import RegistarationScreen from '../RegistarationScreen'
import SignInScreen from '../SignInScreen'

const routes = [
    {
        path: '/',
        name: 'RegistarationScreen',
        component: RegistarationScreen
    },
    {
        path: '/signIn',
        name: 'SignInScreen',
        component: SignInScreen
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;