import Icon from './Icon';

Icon.install = function install() {
  const requireAll = requireContext => requireContext.keys().map(requireContext);
  const req = require.context('../../icons/svg', false, /\.svg$/);

  requireAll(req);
};

export default Icon;
