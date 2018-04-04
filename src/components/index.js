import Avatar from './Avatar';
import Icon from './Icon';
import EmptyCard from './EmptyCard';
import zoomingImg from './zoomingImg';

const components = [
  Avatar,
  Icon,
  EmptyCard,
  zoomingImg,
];

const install = function install(Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export {
  install,
  Icon,
  EmptyCard,
  zoomingImg,
};
