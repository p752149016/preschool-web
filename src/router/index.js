import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from "@/views/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRouterMap = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true //为true时此路由不会显示在侧边栏中
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '',
        component: Layout,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'home',
            component: () => import('@/views/home/index'),
            meta: {title: '首页', icon: 'home'}
        }]
    },


    {
        path: '/setting',
        component: Layout,
        redirect: '/setting/device',
        name: 'setting',
        meta: {title: '设置', icon: 'setting'},
        children: [
            {
                path: 'device',
                name: 'device',
                component: () => import('@/views/setting/device/index'),
                meta: {title: '设备管理', icon: 'device'}
            },
            {
                path: 'baby',
                name: 'baby',
                component: () => import('@/views/setting/baby/index'),
                meta: {title: '宝宝信息', icon: 'baby'}
            },
            {
                path: 'eyeProtection',
                name: 'eyeProtection',
                component: () => import('@/views/setting/eyeProtection/index'),
                meta: {title: '护眼设置', icon: 'eye-protection'}
            },
            {
                path: 'school',
                name: 'school',
                component: () => import('@/views/setting/school/index'),
                meta: {title: '学校信息', icon: 'school'}
            }
        ]
    },
    {
        path: '/upload',
        component: Layout,
        redirect: '/upload/file',
        name: 'upload',
        meta: {title: '文件', icon: 'file'},
        children: [
            {
                path: 'file',
                name: 'file',
                component: () => import('@/views/upload/file/index'),
                meta: {title: '文件管理', icon: 'file'}
            },
            {
                path: 'addFile',
                name: 'addFile',
                component: () => import('@/views/upload/file/add'),
                meta: {title: '添加文件'},
                hidden: true
            },
            {
                path: 'updateFile',
                name: 'updateFile',
                component: () => import('@/views/upload/file/update'),
                meta: {title: '编辑文件'},
                hidden: true
            }
        ]
    }
]

export const asyncRouterMap = [
    {
        path: '/user',
        component: Layout,
        redirect: '/user/admin',
        name: 'user',
        meta: {title: '权限', icon: 'authority'},
        children: [
            {
                path: 'admin',
                name: 'admin',
                component: () => import('@/views/user/admin/index'),
                meta: {title: '用户列表', icon: 'user-admin'}
            },
            {
                path: 'role',
                name: 'role',
                component: () => import('@/views/user/role/index'),
                meta: {title: '角色列表', icon: 'user-role'}
            },
            {
                path: 'allocateResource',
                name: 'allocateResource',
                component: () => import('@/views/user/role/allocateResource'),
                meta: {title: '分配资源'},
                hidden: true
            },
            {
                path: 'permission',
                name: 'permission',
                component: () => import('@/views/user/permission/index'),
                meta: {title: '权限列表', icon: 'user-permission'}
            }
        ]
    },
    // 404 page must be placed at the end !!!
    {path: '*', redirect: '/404', hidden: true}
]

// 为全局的push加上catch方法 处理部分Uncaught (in promise) undefined 报错问题
// const originalPush = Router.prototype.push
// Router.prototype.push = function push(location, onResolve, onReject) {
//     if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//     return originalPush.call(this, location).catch(err => err)
// }

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
