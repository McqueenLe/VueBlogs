const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permissionCodes: state => state.user.permissionCodes,
  addRouters: state => state.permission.addRouters,
  allPermissions: state => state.permission.allPermissions
}
export default getters
