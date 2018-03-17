const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles,
  userInfo: state => state.user.userInfo,
  project: state => state.project.info,
  building: state => state.project.building,
};

export default getters;
