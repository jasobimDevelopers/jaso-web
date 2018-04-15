import { asyncRouterMap, constantRouterMap, adminRouterMap } from '@/router';

/**
 * 将menuList转换成menuMap，方便检索
 * @param menuList
 */
function transformMenuToMap(menuList) {
  const menuMap = {};
  menuList.forEach((menu) => {
    menuMap[menu.menuPath] = menu;
  });

  return menuMap;
}

/**
 * 递归过滤异步路由表，返回符合后台给出的路由列表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routerMap, menuList, userType) {
  let accessedRouters = [];
  const menuMap = transformMenuToMap(menuList);
  routerMap.forEach((router) => {
    // 目前如果router是隐藏的，说明路由是一定要加载的
    if (router.hidden) {
      accessedRouters.push(router);
    } else {
      const menuRoot = menuMap[router.name];

      if (menuRoot && menuRoot.children && menuRoot.children.length > 0) {
        const menuChildren = menuRoot.children;
        let routerChildren = router.children;

        // convert name
        if (menuRoot.name) {
          router.meta.title = menuRoot.name;
        }

        const menuChildrenPathList = menuChildren.map(menuChild => menuChild.menuPath);
        routerChildren = routerChildren.filter(routerChild => menuChildrenPathList.indexOf(routerChild.name) >= 0);

        // reset the children for router
        router.children = routerChildren;
        accessedRouters.push(router);
      }
    }
  });

  // if user is admin role
  if (userType === 0) {
    accessedRouters = accessedRouters.concat(adminRouterMap);
  }

  return accessedRouters;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    },
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve) => {
        const { menuList, userType } = data;

        const accessedRouters = filterAsyncRouter(asyncRouterMap, menuList, userType);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    },
  },
};

export default permission;
