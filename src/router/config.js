export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard', title: 'dashboard', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/form', title: '表单', icon: 'edit',
            subs: [
                { key: '/app/form/basicForm', title: '基础表单' },
                { key: '/app/form/stepForm', title: '分步表单' },
                { key: '/app/form/advancedform', title: '高级表单' }
            ],
        },
        {
            key: '/app/charts', title: '图表', icon: 'edit',
            subs: [
                { key: '/app/charts/echarts', title: 'echarts' },
            ]
        }
    ]
}