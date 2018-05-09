import Avatar from './Avatar';
import Icon from './Icon';
import EmptyCard from './EmptyCard';
import ZoomingImg from './ZoomingImg';
import EditLine from './EditLine';
import Breadcrumb from './Breadcrumb';

const components = [
  Avatar,
  Icon,
  EmptyCard,
  ZoomingImg,
  EditLine,
  Breadcrumb,
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
  ZoomingImg,
  EditLine,
  Breadcrumb,
};
