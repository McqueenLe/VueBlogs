import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store/index'
import { getToken } from './auth'

// create an axios instance
const qs = require('qs')
const tokenPreffix = 'Bearer '
const prod = require('../../config/prod.env')
const service = axios.create({
    baseURL: prod.BASE_URL, // api的base_url
    timeout: 50000, // request timeout
    headers: {
        // 'Access-Control-Allow-Origin':' *',
        // 'Access-Control-Allow-Methods':'OPTIONS, GET, POST',
        // 'Access-Control-Allow-Headers':'x-requested-with',
        // 'Access-Control-Max-Age':'86400'
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

// request interceptor
service.interceptors.request.use(config => {
    debugger;
    if (config.data) {
        config.data = qs.stringify(config.data);
    }else if(config.token) {
        config.headers['Authorization'] = tokenPreffix + config.data.token; // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
    } else if(config.params) {
        config.data = qs.stringify(config.params);
    } else if(config.params.token) {
        config.headers['Authorization'] = tokenPreffix + config.params.token;
    }
    config.params = null;
    return config;
}, error => {
    console.log(error); // for debug
    Promise.reject(error);
})

// respone interceptor
service.interceptors.response.use(
    response => {
        /**
         * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
         * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
         */
        debugger;
        const res = response.data;
        if(!res) {
            cosole.log('respnse is null');
            return;
        }
         if(res.code == 200) { // 接口返回成功
             Message({
                 message: res.message,
                 type: 'success',
                 duration: 3 * 1000
             })
            return response;
        } else if (res.code === 405) {
             MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                 confirmButtonText: '重新登录',
                 cancelButtonText: '取消',
                 type: 'warning'
             }).then(() => {
                 store.dispatch('FedLogOut').then(() => {
                     location.reload()// 为了重新实例化vue-router对象 避免bug
                 })
             })
         } else { // 接口返回失败
             Message({
                 message: res.message,
                 type: 'error',
                 duration: 3 * 1000
             })
            console.log(res);
         }
    },
    error => {
        console.log('err' + error)// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })

export default service;
