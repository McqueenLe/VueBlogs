import axios from 'axios';
import fetch from './fetch'

let base = '';

/**
 * 登录接口
 * @param username
 * @param password
 * @returns {*}
 */
export function login(username, password) {
    return fetch({
        url: '/api/flow/auth/login',
        method: 'post',
        data: {
            'adminName': username,
            'password': password

        }
    })
}

export function getInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

export function logout() {
    return request({
        url: '/login/logout',
        method: 'post'
    })
}

export function getCaptcha() {
    return request({
        url: '/login/captcha',
        method: 'get'
    })
}

/**
 * 获取博客文章列表
 * @param param
 * @returns {*}
 */
export function getBlogList(token, param) {
    return fetch({
        url: '/api/flow/auth/blog/getBlogs',
        method: 'get',
        params: {
            page: param.page,
            author: param.author,
            publishState: param.publishState,
            token: token
        }
    })
}

/**
 * 添加文章
 * @param token
 * @param param
 */
export function addBlog(token, param) {
    return fetch({
        url: '/api/flow/auth/blog/addBlog',
        method: 'post',
        params: {
            title: param.title,
            detail: param.detail,
            author: param.author
        }
    })
}

/**
 * 根据id删除文章
 * @param token
 * @param param
 * @returns {*}
 */
export function delBlog(token, param) {
    return fetch({
        url: '/api/flow/auth/blog/delBlog',
        method: 'post',
        params: {
            id: param.id,
            token: token
        }
    })
}

/**
 * 修改文章
 * @param token
 * @param param
 * @returns {*}
 */
export function updateBlog(token, param) {
    return fetch({
        url: '/api/flow/auth/blog/updateBlog',
        method: 'post',
        params: {
            id: param.id,
            title: param.title,
            detail: param.detail
        }
    })
}

export const requestLogin = params => { return axios.post('http://192.168.0.3:8089/api/flow/auth/login', params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

// export const getBlogList = params => { return axios.get(`${base}/blogs`, { params: params});};

export const batchPublish = params => { return axios.get(`${base}/publish`, { params: params});};