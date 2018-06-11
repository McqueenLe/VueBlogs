import fetch from "./fetch";

/**
 * 登录接口
 * @param username
 * @param password
 * @returns {*}
 */
export function login(username, password) {
    return fetch({
        url: '/login/login',
        method: 'post',
        data: {
            'adminName': username,
            'usernameadminPassWord': password
        }
    })
}