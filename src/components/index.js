import Avatar from './Avatar';
import Icon from './Icon';

const components = [
  Avatar,
  Icon,
];

const install = function install(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export {
  install,
  Icon,
};
