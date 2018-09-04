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
import Preview from './views/blogs/Preview'
import UpdateBlog from './views/blogs/UpdateBlog'
import ChannelSetting from './views/management/ChannelSetting'
import Admin from './views/system/Admin'
import GroupManager from './views/system/GroupManager'

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
    {
        path: '/',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-user-circle-o',
        children: [
            {path: '/group', component: GroupManager, name: '权限组设置'},
            {path: '/admin', component: Admin, name: '管理员设置'}
        ]
    },
    {
        path: '/',
        component: Home,
        name: '频道管理',
        iconCls: 'fa fa-user-circle-o',//图标样式class
        children: [
            { path: '/channel', component: ChannelSetting, name: '频道管理'},
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
            },
            {
                path:'/preview',
                component: Preview,
                name: '预览博客',
                hidden: true
            },
            {
                path:'/updateBlog',
                component: UpdateBlog,
                name: '修改博客',
                hidden: true
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