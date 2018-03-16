import { login, getUserInfo } from '@/api/user';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    userInfo: null,
    roles: [],
    token: getToken(),
  },

  mutations: {
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, userInfo) => {
      state.userInfo = userInfo;
    },
  },

  actions: {
    // login
    Login({ commit }, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login(username, password).then((res) => {
          const { token, data } = res;

          if (token && token !== null) {
            setToken(token);
            commit('SET_TOKEN', token);
          }

          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        commit('SET_ROLES', []);
        commit('SET_USER', null);
        removeToken();
        resolve();
      });
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then((res) => {
          const { data } = res;
          const { userType } = data;

          if (userType === 0) {
            commit('SET_ROLES', ['admin']);
          } else {
            commit('SET_ROLES', ['user']);
          }

          commit('SET_USER', data);

          resolve(data);
        }).catch((error) => {
          reject(error);
        });
      });
    },
  },
};

export default user;
