import { createWebHashHistory, createRouter } from "vue-router";

import RegistarationScreen from '../screens/RegistrationScreen'

import ContentScreen from '../screens/ContentScreen'
import Chats from '../screens/content/Chats'
import Friends from '../screens/content/Friends'
import Profile from '../screens/content/Profile'
import Messages from '../screens/content/Messages'
import Sandbox from '../screens/content/Sandbox'

const routes = [
    {
        path: '/',
        name: 'RegistrationScreen',
        component: RegistarationScreen
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
                path: '/sandbox',
                name: 'Sandbox',
                component: Sandbox
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
    history: createWebHashHistory(),
    routes,
});

router.replace({ path: '*', redirect: '/' })

export default router;