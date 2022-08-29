import { createWebHistory, createRouter } from "vue-router";

import RegistarationScreen from '../screens/RegistrationScreen'
import SignInScreen from '../screens/SignInScreen'
import ContentScreen from '../screens/ContentScreen'
import Chats from '../screens/content/Chats'
import Friends from '../screens/content/Friends'
import Profile from '../screens/content/Profile'
import Messages from '../screens/content/Messages'

const routes = [
    {
        path: '/regist',
        name: 'RegistrationScreen',
        component: RegistarationScreen
    },
    {
        path: '/',
        name: 'SignInScreen',
        component: SignInScreen
    },
    {
        path: '/content',
        name: 'ContentScreen',
        component: ContentScreen,
        children: [
            {
                path: '/chats',
                name: 'Chats',
                component: Chats
                
            },
            {
                path: '/friends',
                name: 'Friends',
                component: Friends
            },
            {
                path: '/profile',
                name: 'profile',
                component: Profile
            },
            {
                path: '/messages/:id',
                name: 'Messages',
                component: Messages
            }
        ]
    }
    
]
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.replace({ path: '*', redirect: '/' })

export default router;