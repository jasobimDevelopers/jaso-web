import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import user from './modules/user';
import project from './modules/project';
import permission from './modules/permission';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    user,
    project,
    permission,
  },
  getters,
});

export default store;
