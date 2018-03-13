import { login } from '@/api/user';
import { getToken, setToken } from '@/utils/auth';

const user = {
  state: {
    user: '',
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
  },

  actions: {
    // login
    Login({ commit }, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve) => {
        login(username, password).then((response) => {
          const { token } = response;
          setToken(token);
          commit('SET_TOKEN', token);

          resolve();
        });
      });
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      commit('SET_ROLES', ['admin']);
    },
  },
};

export default user;
