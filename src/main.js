// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
// progress
import Progress from 'vue-multiple-progress';

// import photo swipe css
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';

import Element from 'element-ui';
// import '../theme/index.css';
// import 'element-ui/lib/theme-chalk/index.css';

import './styles/index.scss';

import App from './App';
import router from './router';
import store from './store';
import { install } from './components/index';
import Icon from './components/Icon';

import i18n from './lang'; // Internationalization
import './permission'; // permission control
import * as filters from './filters'; // global filters

Vue.config.productionTip = false;

Vue.use(Element, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value),
});

Vue.use(Progress);

// register components
install(Vue);
// svg icon
Icon.install();

// register global utility filters.
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>',
});
