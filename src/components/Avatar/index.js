import Avatar from './Avatar.vue';

Avatar.install = function install(Vue) {
  Vue.component(Avatar.name, Avatar);
};

export default Avatar;
