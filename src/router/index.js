import Vue from 'vue'
import VueRouter from 'vue-router'
import { token } from '@/services/TokenService'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'MainLayout',
        component: () => import('@/layout/MainLayout'),
        redirect: { name: 'FaceDetect' },
        meta: {
            public: false,
        },
        children: [
            {
                path: 'face-detect',
                name: 'FaceDetect',
                component: () => import('@/views/Main/Scan')
            },
            {
                path: 'activity',
                name: 'Activity',
                component: () => import('@/views/Main/Activity'),
                redirect: { name: 'ActivityList' },
                children: [
                    {
                        path: 'list',
                        name: 'ActivityList',
                        component: () => import('@/views/Main/Activity/List')
                    },
                    {
                        path: 'list/:id',
                        name: 'ActivityID',
                        component: () => import('@/views/Main/Activity/Read')
                    }
                ]
            }
        ]
    },
    {
        path: '/auth',
        name: 'AuthLayout',
        component: () => import('@/layout/AuthLayout'),
        redirect: { name: 'Login' },
        meta: {
            public: true,
        },
        children: [
            {
                path: 'login',
                name: 'Login',
                component: () => import('@/views/Auth/Login')
            },
            {
                path: 'register',
                name: 'Register',
                component: () => import('@/views/Auth/Register')
            },
            {
                path: 'forget-password',
                name: 'ForgetPassword',
                component: () => import('@/views/Auth/ForgetPassword')
            }
        ]
    }
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
    let hasToken = !!token.get()
    let isPublic = to.matched.some((record) => record.meta.public)

    if (hasToken && isPublic) {
        return next(from.fullPath)
    }

    if (!hasToken && !isPublic) {
        return next({ name: 'AuthLayout' })
    }

    next()
})

export default router
