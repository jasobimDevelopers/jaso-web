const user = {
  state: {
    user: '',
    roles: [],
  },

  mutations: {
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit }) {
      commit('SET_ROLES', ['admin']);
    },
  },
};

export default user;
