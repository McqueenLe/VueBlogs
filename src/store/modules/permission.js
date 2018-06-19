// import { constantRouterMap } from '@/router'
// import { getAllPermissionList } from '@/api/permission'
//
// /**
//  * 通过meta.role判断是否与当前用户权限匹配
//  * @param roles
//  * @param route
//  */
// /*
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0)
//   } else {
//     return true
//   }
// }
// */
//
// /**
//  * 递归过滤异步路由表，返回符合用户角色权限的路由表
//  * @param asyncRouterMap
//  * @param roles
//  */
// /*
// function filterAsyncRouter(asyncRouterMap, roles) {
//   const accessedRouters = asyncRouterMap.filter(route => {
//     if (hasPermission(roles, route)) {
//       if (route.children && route.children.length) {
//         route.children = filterAsyncRouter(route.children, roles)
//       }
//       return true
//     }
//     return false
//   })
//   return accessedRouters
// }
// */
//
// const permission = {
//   state: {
//     routers: constantRouterMap,
//     addRouters: [],
//     allPermissions: []// 所有权限
//   },
//   mutations: {
//     SET_ROUTERS: (state, routers) => {
//       state.addRouters = routers
//       state.routers = constantRouterMap.concat(routers)
//     },
//     SET_ALL_PERMISSIONS: (state, data) => {
//       state.allPermissions = data
//     }
//   },
//   actions: {
//     GenerateRoutes({ commit }, data) {
//       return new Promise(resolve => {
//         commit('SET_ROUTERS', constantRouterMap)
//         resolve()
//       })
//     },
//     GeneratePermissions({ state, commit }) {
//       return new Promise((resolve, reject) => {
//         if (state.allPermissions.length !== 0) {
//           const data = { message: '操作成功' }
//           resolve(data)
//         } else {
//           getAllPermissionList()
//             .then(res => {
//               if (res.data.code !== 200) {
//                 reject(res.data)
//               }
//               commit('SET_ALL_PERMISSIONS', res.data.permissionList)
//               resolve(res.data)
//             })
//             .catch(err => {
//               reject(err.data)
//             })
//         }
//       })
//     }
//   }
// }
//
// export default permission
