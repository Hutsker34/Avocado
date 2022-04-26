import { createWebHistory, createRouter } from "vue-router";

import RegistarationScreen from '../screens/RegistrationScreen'
import SignInScreen from '../screens/SignInScreen'
import ContentScreen from '../screens/ContentScreen'
import Chat from '../screens/content/Chat'
import Friends from '../screens/content/Friends'

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
        component: ContentScreen,
        children: [
            {
                path: '/chat',
                name: 'Chat',
                component: Chat
            },
            {
                path: '/friends',
                name: 'Friends',
                component: Friends
            }
        ]
    }
    
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;