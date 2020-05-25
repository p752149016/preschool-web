import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { //判断当前用户是否已获取权限列表
        console.log(store.getters.roles.length);
        store.dispatch('getInfo').then(res => { // 拉取用户信息
            console.log(res);
          let menus=res.menus;
          let username=res.name;
          console.log('name: ' + username);
          console.log('menus: ' + menus);
          store.dispatch('GenerateRoutes', { menus,username }).then(() => { // 生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            next({ ...to, replace: true }) // 确保addRoutes已完成  这行代码导致页面报错 Uncaught (in promise) undefined  但暂时没影响
          })
        }).catch((err) => {
          store.dispatch('resetToken').then(() => {
              console.log('out login')
            Message.error(err || 'Verification failed, please login again')
            next({ path: '/' })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单中直接进入页面
      next()
    } else {
      // token 不存在就到登录页面
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
