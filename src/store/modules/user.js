import { login, addAdmin, getAdmins, delAdmin, logout, getInfo, getCaptcha } from '../../api/api'
import { getToken, setToken, removeToken } from '../../api/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    permissionCodes: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PERMISSIONCODE: (state, permissionCodes) => {
      state.permissionCodes = permissionCodes
    }
  },

  actions: {
      /**
       * 登录
       * @param commit
       * @param userInfo
       * @returns {Promise<any>}
       * @constructor
       */
    Login({ commit }, userInfo) {
      const username = userInfo.username.toString().trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data;
          if (data.code === 200) {
            commit('SET_TOKEN', data.data.token);
            setToken(data.data.token);
            resolve(data.message)
          } else {
            reject(data.message)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

      /**
       * 添加管理员
       * @param commit
       * @param admin
       * @returns {Promise<any>}
       * @constructor
       */
      AddAdmin({commit}, admin) {
        return new Promise((resolve, reject) => {
          addAdmin(admin).then(res => {
            resolve(res);
          }).catch(error => {
            reject(error);
          })
        });
      },

      /**
       * 根据id删除管理员
       * @param commit
       * @param admin
       * @returns {Promise<any>}
       * @constructor
       */
      UpdateAdmin({commit}, admin) {
        return new Promise((resolve, reject) => {
            delAdmin(admin.id).then(res => {
              resolve(res);
            }).catch(error => {
              reject(error);
            })
        });
      },

      /**
       * 获取管理员列表
       * @returns {Promise<any>}
       * @constructor
       */
      GetAdmins({commit}, params) {
        return new Promise((resolve, reject) => {
          getAdmins(params).then(res => {
            resolve(res);
          }).catch(error => {
            reject(error);
          });
        })
      },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data.data
          commit('SET_PERMISSIONCODE', data.permissionCodes)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)

          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取验证码
    GetCaptcha() {
      return new Promise((resolve, reject) => {
        getCaptcha().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_PERMISSIONCODE', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user;
