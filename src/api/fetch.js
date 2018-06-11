import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import store from '@/store'
import { getToken } from './auth'

// create an axios instance
const qs = require('qs')
const tokenPreffix = 'Bearer '
const prod = require('../../config/prod.env')
const service = axios.create({
    baseURL: prod.BASE_URL, // api的base_url
    timeout: 20000, // request timeout
    headers: {'Access-Control-Allow-Origin':' *', 'Access-Control-Allow-Methods':'OPTIONS, GET, POST',
        'Access-Control-Allow-Headers':'x-requested-with', 'Access-Control-Max-Age':'86400'}
})

// request interceptor
service.interceptors.request.use(config => {
    // if (store.getters.token) {
    //     config.headers['Authorization'] = tokenPreffix + getToken() // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
    // }
    config.data = qs.stringify(config.data)
    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
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
        Message({
            message: res.message,
            type: 'error',
            duration: 3 * 1000
        })
         if(res.code == 200) { // 接口返回成功
            return response;
        } else { // 接口返回失败
            console.log(res);
         }
    },
    error => {
        debugger;
        console.log('err' + error)// for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    })

export default service;
