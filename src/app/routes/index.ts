import { Router } from 'express'
import { UserRoutes } from '../modules/User/user.route'
import { BlogRoutes } from '../modules/Blog/blog.route'
import { MessageRoutes } from '../modules/Message/message.route'

const router = Router()

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/blogs',
        route: BlogRoutes,
    },
    {
        path: '/messages',
        route: MessageRoutes,
    },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
