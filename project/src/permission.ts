// 路由鉴权
// 项目路由中能不能被权限的设置 一个路由可不可以访问
import router from '@/router'
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"
import setting from './setting'
//去掉加载小球
nprogress.configure({ showSpinner: false })
//拿到仓库存储的token
import useUserStore from '@/store/modules/user';
import pinia from '@/store';
let userStore = useUserStore(pinia)

//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = `${setting.title} - ${to.meta.title}`
    //to  将要访问的路由对象
    //  from 从哪里的路由来的
    // next 放行函数
    nprogress.start()
    let token = userStore.token;
    let username = userStore.username;
    let avatar = userStore.avatar;
    if (token) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            //登录成功访问其他路由获取用户信息
            if (username) {
                next();
            } else {
                try {
                    await userStore.userInfo();
                    next()
                } catch (error: any) {
                    await userStore.userLogout();
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next();
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }
});



//全局配置守卫
router.afterEach((to: any, from: any) => {
    nprogress.done()
});

// 任意路由切换实现进度条业务 -- nprogress
// 路由鉴权 路由组件访问权限的设置

//全部路由组件 登录 404 任意路由  首页  数据大屏 权限管理3个子路由  商品管理4个子路由
//用户未登录 可以访问login 其余六个路由不能访问
//用户登录成功 不能访问登录了 其余路由可以访问