import Layout from '@/page/index/'
export default [{
    path: '/wel',
    component: Layout,
    redirect: '/wel/index',
    children: [{
        path: 'index',
        name: '首页',
        component: () =>
            import ('@/page/wel'),
    }]
}, {
    path: '/info',
    component: Layout,
    redirect: '/info/index',
    children: [{
        path: 'index',
        name: '个人信息',
        // meta: { tag: false },配置后不会添加到tag里
        component: () =>
            import ('@/views/info/index'),
    }]
}, {
    path: '/dev',
    component: Layout,
    redirect: '/dev/index',
    children: [{
        path: 'index',
        name: '环境变量',
        component: () =>
            import ('@/views/dev/index'),
    }]
}, {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [{
        path: 'index',
        name: '引导页',
        component: () =>
            import ('@/views/guide/index'),
    }]
}, {
    path: '/store',
    component: Layout,
    redirect: '/store/index',
    children: [{
        path: 'index',
        name: '数据持久化',
        component: () =>
            import ('@/views/store/index')
    }]
}, {
    path: '/clipboard',
    component: Layout,
    redirect: '/clipboard/index',
    children: [{
        path: 'index',
        name: '剪切板',
        component: () =>
            import ('@/views/clipboard/index')
    }]
}, {
    path: '/role',
    component: Layout,
    redirect: '/role/index',
    children: [{
        path: 'index',
        name: '权限测试页',
        component: () =>
            import ('@/views/role')
    }]
}, {
    path: '/gray',
    component: Layout,
    redirect: '/gray/index',
    children: [{
        path: 'index',
        name: '灰度模式',
        component: () =>
            import ('@/views/gray/index')
    }]
}, {
    path: '/table',
    component: Layout,
    redirect: '/table/index',
    children: [{
            path: 'index',
            name: '表格CRUD',
            component: () =>
                import ('@/views/table/index')
        },
        {
            path: 'generator',
            name: '表格生成器',
            component: () =>
                import ('@/views/table/generator')
        },
        {
            path: 'tree',
            name: '普通的tree表格',
            component: () =>
                import ('@/views/table/table-tree/index')
        },
        {
            path: 'alltree',
            name: '自定义tree表格',
            component: () =>
                import ('@/views/table/table-tree/all')
        }
    ]
}, {
    path: '/exhibition',
    component: Layout,
    redirect: '/exhibition/index',
    children: [{
        path: 'index',
        name: '数据展示',
        component: () =>
            import ('@/views/exhibition/index')
    }]
}, {
    path: '/forms',
    component: Layout,
    redirect: '/forms/index',
    children: [{
        path: 'index',
        name: '表单CRUD',
        component: () =>
            import ('@/views/forms/index')
    }]
}, {
    path: '/select',
    component: Layout,
    redirect: '/select/index',
    children: [{
        path: 'index',
        name: '多级select联动',
        component: () =>
            import ('@/views/select/index')
    }]
}, {
    path: '/iconfont',
    component: Layout,
    redirect: '/iconfont/index',
    children: [{
        path: 'index',
        name: '阿里图标',
        component: () =>
            import ('@/views/iconfont/index')
    }]
}, {
    path: '/errlog',
    component: Layout,
    redirect: '/errlog/index',
    children: [{
        path: 'index',
        name: '错误日志',
        component: () =>
            import ('@/page/errlog/index')
    }, {
        path: 'page',
        name: '错误页面',
        component: () =>
            import ('@/page/errlog/errorPage')
    }]
}, {
    path: '/advanced-router',
    component: Layout,
    children: [{
        path: 'mutative-router',
        name: '动态路由',
        component: () =>
            import ('@/views/advanced-router/mutative-router')
    }, {
        path: 'argument-page',
        name: '参数路由',
        component: () =>
            import ('@/views/advanced-router/argument-page')
    }, {
        path: 'mutative-detail/:id',
        name: '动态路由详情页',
        component: () =>
            import ('@/views/advanced-router/mutative-detail')
    }, {
        path: 'argument-detail',
        name: '参数路由详情页',
        component: () =>
            import ('@/views/advanced-router/argument-detail')
    }]
}, {
    path: '/admin',
    component: Layout,
    children: [{
        path: 'user',
        name: '用户管理',
        component: () =>
            import ('@/views/admin/user/index')
    }, {
        path: 'role',
        name: '角色管理',
        component: () =>
            import ('@/views/admin/role/index')
    }, {
        path: 'menu',
        name: '菜单管理',
        component: () =>
            import ('@/views/admin/menu/index')
    }]
}]