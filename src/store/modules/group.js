import { getToken } from '../../api/auth'
import { addGroup, getGroups } from '../../api/api'

const group = {
    state: {

    },
    mutations: {

    },
    actions: {
        /**
         * 添加权限组
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        AddGroup({commit}, params) {
            return new Promise((resolve, reject) => {
                const token = getToken();
                addGroup(token, params).then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },

        /**
         * 获取权限管理组列表
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        GetGroups({commit}, params) {
            return new Promise((resolve, reject) => {
                const token = getToken();
                getGroups(token, params).then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        }
    }
};

export default group;