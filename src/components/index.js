import Avatar from './Avatar';
import Icon from './Icon';
import EmptyCard from './EmptyCard';
import zoomingImg from './zoomingImg';
import EditLine from './EditLine';
import Breadcrumb from './Breadcrumb';

const components = [
  Avatar,
  Icon,
  EmptyCard,
  zoomingImg,
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
  zoomingImg,
  EditLine,
  Breadcrumb,
};
