import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/favourite/Table.vue'
import Form from './views/favourite/Form.vue'
import user from './views/favourite/user.vue'
import AddBlog from './views/blogs/AddBlog.vue'
import BlogsManage from './views/blogs/BlogsManage'
import Publish from './views/blogs/Publish'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '个人管理',
        iconCls: 'fa fa-user-circle-o',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '博客管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            {
                path: '/addBlogs',
                component: AddBlog,
                name: '添加博客'
            },
            {
                path: '/blogs',
                component: BlogsManage,
                name: '博客列表'
            },
            {
                path: '/publish',
                component: Publish,
                name: '审核发布'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '网站统计',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;