
const TokenKey = 'Admin-Token'

export function getToken() {
  return sessionStorage.getItem(TokenKey);
}
export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

export function setToken(token) {
    return sessionStorage.setItem(TokenKey, token)
}

