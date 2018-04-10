import { asyncRouterMap, constantRouterMap } from '@/router';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
// function hasPermission(roles, route) {
//   if (route.meta && route.meta.roles) {
//     return roles.some(role => route.meta.roles.indexOf(role) >= 0);
//   }

//   return true;
// }

/**
 * 将menuList转换成menuMap，方便检索
 * @param roles
 * @param route
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
function filterAsyncRouter(routerMap, menuList) {
  const accessedRouters = [];
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

        const menuChildrenPathList = menuChildren.map(menuChild => menuChild.menuPath);
        routerChildren = routerChildren.filter(routerChild => menuChildrenPathList.indexOf(routerChild.name) >= 0);

        // reset the children for router
        router.children = routerChildren;
        accessedRouters.push(router);
      }
    }
  });
  // const accessedRouters = routerMap.filter((route) => {
  //   if (hasPermission(menuList, route)) {
  //     if (route.children && route.children.length) {
  //       route.children = filterAsyncRouter(route.children, menuList);
  //     }
  //     return true;
  //   }
  //   return false;
  // });
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
        const { menuList } = data;
        // let accessedRouters;
        // if (roles.indexOf('admin') >= 0) {
        //   accessedRouters = asyncRouterMap;
        // } else {
        //   accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        // }

        const accessedRouters = filterAsyncRouter(asyncRouterMap, menuList);
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    },
  },
};

export default permission;
