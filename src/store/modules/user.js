import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  }
}

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    RESET_STATE: (state) => {
      Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    login({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login(username.trim(), password).then(response => {
          const { data } = response
          const tokenStr = data.tokenHead+data.token
          commit('SET_TOKEN', tokenStr)
          setToken(tokenStr)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    getInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const { data } = response
          if (!data) {
            reject('Verification failed, please Login again.')
          }

          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          const { name, avatar } = data
          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          removeToken() // must remove  token  first
          resetRouter()
          commit('RESET_STATE')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 删除 token
    resetToken({ commit }) {
      return new Promise(resolve => {
        removeToken() // must remove  token  first
        commit('RESET_STATE')
        resolve()
      })
    }
  }
}

export default user;

