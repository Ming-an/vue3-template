export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',//命名路由
        meta: {
            title: '登录',//菜单需要的标题
            hidden: true,//代表路由标题在菜单中是否隐藏 true 隐藏 false 不隐藏
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        // name: 'layout',
        // meta: {
        //     title: 'layout',//菜单需要的标题
        //     hidden: false,
        //     icon: "HomeFilled"
        // },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',//菜单需要的标题
                    hidden: false,
                    icon: "HomeFilled"
                }
            },
        ]
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        hidden: false,
        meta: {
            title: '数据大屏',
            icon:'Platform'
        }
    },
    {
        path:'/acl',
        component:()=>import('@/layout/index.vue'),
        name:'Acl',
        meta:{
            title:'权限管理',
            hidden:false,
            icon:'lock'
        },
        redirect:'/acl/user',
        children:[
            {
                path:'/acl/user',
                component:()=>import('@/views/acl/user/index.vue'),
                name:'User',
                meta:{
                    title:'用户管理',
                    hidden:false,
                    icon:'User'
                }
            },
            {
                path:'/acl/role',
                component:()=>import('@/views/acl/role/index.vue'),
                name:'Role',
                meta:{
                    title:'角色管理',
                    hidden:false,
                    icon:'UserFilled'
                }
            },
            {
                path:'/acl/perrmission',
                component:()=>import('@/views/acl/perrmission/index.vue'),
                name:'Perrmission',
                meta:{
                    title:'菜单管理',
                    hidden:false,
                    icon:'Management'
                }
            }
        ]

    },
    {
        path:'/product',
        component:()=>import('@/layout/index.vue'),
        name:'Product',
        meta:{
            title:'商品管理',
            icon:'Goods',
            hidden:false
        },
        redirect:'/product/trademark',
        children:[
            {
                path:'/product/trademark',
                component:()=>import('@/views/product/trademark/index.vue'),
                name:'Trademark',
                meta:{
                    title:'品牌管理',
                    icon:'ShoppingCartFull',
                    hidden:false
                }
            },
            {
                path:'/product/attr',
                component:()=>import('@/views/product/attr/index.vue'),
                name:'Attr',
                meta:{
                    title:'属性管理',
                    icon:'ChromeFilled',
                    hidden:false
                }
            },
            {
                path:'/product/spu',
                component:()=>import('@/views/product/spu/index.vue'),
                name:'Spu',
                meta:{
                    title:'SPU管理',
                    icon:'Briefcase',
                    hidden:false
                }
            },
            {
                path:'/product/sku',
                component:()=>import('@/views/product/sku/index.vue'),
                name:'Sku',
                meta:{
                    title:'SKU管理',
                    icon:'TrendCharts',
                    hidden:false
                }
            }

        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',//菜单需要的标题
            hidden: true,
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'any',
        meta: {
            title: '任意路由',//菜单需要的标题
            hidden: true,
        }
    }
]