import axios from 'axios';
import fetch from './fetch'

let base = 'http://localhost:8089';

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

export const requestLogin = params => { return axios.post('http://192.168.0.3:8089/api/flow/auth/login', params).then(res => res.data); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

export const getBlogList = params => { return axios.get(`${base}/blogs`, { params: params});};

export const batchPublish = params => { return axios.get(`${base}/publish`, { params: params});};