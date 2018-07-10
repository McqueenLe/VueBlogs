import { getToken, setToken, removeToken } from '../../api/auth'
import { getChannels, addChannel, delChannel } from '../../api/api'

const channel = {
    state: {

    },
    mutations: {

    },
    actions: {
        /**
         * 获取频道列表
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        GetChannels( {commit}, params) {
            return new Promise((resolve, reject) => {
                const token = getToken();
                getChannels(token, params).then(res => {
                    resolve(res);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        },

        /**
         * 添加频道
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        AddChannel( {commit}, params) {
            return new Promise((resolve, reject) => {
                const token = getToken();
                addChannel(token, params).then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            });
        },

        /**
         * 修改频道的状态为已下架
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        DelChannel( {commit}, params) {
            return new Promise((resolve, reject) => {
                const token = getToken();
                delChannel(token, params).then(res => {
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            });
        }
    }
}

export default channel;