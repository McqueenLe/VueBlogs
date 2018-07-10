import { getToken, setToken, removeToken } from '../../api/auth'
import {getBlogList, delBlog, updateBlog, addBlog, publishBlog, uploadFile} from "../../api/api";

const blog = {
    state: {

    },
    mutations: {

    },
    actions: {
        /**
         * 获取文章列表
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        GetBlogList({ commit }, params) {
            return new Promise((resolve, reject) => {
                const token = getToken();
                getBlogList(token, params).then((res) => {
                    console.log(res.toLocaleString());
                    resolve(res);
                }).catch(error => {
                    reject(error)
                    console.log(error);
                });
            })
        },

        /**
         * 添加文章
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        AddBlog({ commit }, params) {
            return new Promise((resolve, reject) => {
                const token = getToken();
                addBlog(token, params).then((res) => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                });
            })
        },

        /**
         * 通过id删除文章
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        DelBlogById({ commit }, params) {
            return new Promise((resolve, reject) => {
                const token = getToken();
                delBlog(token, params).then((res) => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 修改文章
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        UpdateBlogById({ commit }, params) {
            return new Promise((resolve, reject) => {
                debugger;
                const token = getToken();
                updateBlog(token, params).then((res) => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 发布文章博客
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        PublishBlog({ commit }, params) {
            return new Promise((resolve, reject) => {
                const token = getToken();
                publishBlog(token, params).then((res) => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        /**
         * 上传图片
         * @param commit
         * @param params
         * @returns {Promise<any>}
         * @constructor
         */
        UploadImg({ commit }, params) {
            return new Promise((resolve, reject) => {
                const token = getToken();
                uploadFile(token, params).then(res => {
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        }
    }
}

export default blog;