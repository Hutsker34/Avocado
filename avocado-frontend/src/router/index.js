import { createWebHistory, createRouter } from "vue-router";

import RegistarationScreen from '../screens/RegistrationScreen'
import SignInScreen from '../screens/SignInScreen'
import ContentScreen from '../screens/ContentScreen'

const routes = [
    {
        path: '/regist',
        name: 'RegistrationScreen',
        component: RegistarationScreen
    },
    {
        path: '/sign-in',
        name: 'SignInScreen',
        component: SignInScreen
    },
    {
        path: '/content',
        name: 'ContentScreen',
        component: ContentScreen
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;