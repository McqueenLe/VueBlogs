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
        data: {
            title: param.title,
            detail: param.detail,
            author: param.author,
            headUrl: param.headUrl,
            channelId: param.channelId,
            keyWord: param.keyWord
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
        data: {
            articleId: param.articleId,
            title: param.title,
            detail: param.detail,
            headUrl: param.headUrl,
            author: param.author
        }
    })
}

/**
 * 发布文章
 * @param token
 * @param param
 * @returns {*}
 */
export function publishBlog(token, param) {
    return fetch({
        url: '/api/flow/auth/blog/publishBlog',
        method: 'post',
        params: {
            ids: param.ids
        }
    })
}

/**
 * 图片上传
 * @param token
 * @param param
 * @returns {*}
 */
export function uploadFile(token, param) {
    return fetch({
        url: '/api/flow/auth/blog/uploadImg',
        method: 'post',
        params: param
    })
}

/**
 * 获取频道列表
 * @param token
 * @param param
 * @returns {*}
 */
export function getChannels(token, param) {
    return fetch({
        url: '/api/flow/auth/channel/getChannels',
        method: 'get',
        params: param
    })
}

/**
 * 添加频道
 * @param token
 * @param param
 * @returns {*}
 */
export function addChannel(token, param) {
    return fetch({
        url: '/api/flow/auth/channel/addChannel',
        method: 'post',
        data: param
    })
}

/**
 * 修改频道的状态为已下架
 * @param token
 * @param param
 * @returns {*}
 */
export function delChannel(token, param) {
    return fetch({
        url: '/api/flow/auth/channel/delChannel',
        method: 'post',
        data: param
    });
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