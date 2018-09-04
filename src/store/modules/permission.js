import { getToken } from '../../api/auth'
import { getPermissionsByGroupId } from '../../api/api'

const permission = {
  state: {

  },
  mutations: {

  },
  actions: {
      /**
       * 根据管理组id获取权限列表
       * @param commit
       * @param params
       * @returns {Promise<any>}
       * @constructor
       */
    GetPermissionsByGroupId({ commit }, params ) {
      return new Promise((resolve, reject) => {
          const token = getToken();
          getPermissionsByGroupId(token, params).then(res => {
              resolve(res);
          }).catch(error => {
              reject(error);
          })
      })
    }
  }
}

export default permission;
