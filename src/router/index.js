import Vue from 'vue';
import Router from 'vue-router';

/* Layout */
import Layout from '../views/Layout';

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
*/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
*/

const asyncImport = file => () => import(`@/views/${file}`);

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: asyncImport('Home'),
    hidden: true,
  },
  {
    path: '/login',
    name: 'login',
    component: asyncImport('Login'),
    hidden: true,
  },
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});

export const asyncRouterMap = [
  {
    path: '/userManage',
    component: Layout,
    redirect: '/userManage/index',
    meta: { roles: ['admin'] },
    children: [{
      path: 'index',
      component: asyncImport('UserManage'),
      name: 'UserManage',
      meta: {
        title: 'userManage',
        icon: 'user',
        roles: ['admin'],
      },
    }],
  },
  {
    path: '/projectManage',
    component: Layout,
    redirect: '/projectManage/index',
    meta: { roles: ['admin', 'user'] },
    children: [{
      path: 'index',
      component: asyncImport('ProjectManage'),
      name: 'projectManage',
      meta: {
        title: 'projectManage',
        icon: 'project',
        roles: ['admin', 'user'],
      },
    }],
  },
  {
    path: '/qualityManage',
    component: Layout,
    redirect: '/qualityManage/index',
    meta: { roles: ['admin', 'user'] },
    children: [{
      path: 'index',
      component: asyncImport('QualityManage'),
      name: 'qualityManage',
      meta: {
        title: 'qualityManage',
        icon: 'quality',
        roles: ['admin', 'user'],
      },
    }],
  },
  {
    path: '/prefabricationManage',
    component: Layout,
    redirect: '/prefabricationManage/index',
    meta: { roles: ['admin'] },
    children: [{
      path: 'index',
      component: asyncImport('PrefabricationManage'),
      name: 'prefabricationManage',
      meta: {
        title: 'prefabricationManage',
        icon: 'prefabrication',
        roles: ['admin'],
      },
    }],
  },
  {
    path: '/outputValueManage',
    component: Layout,
    redirect: '/outputValueManage/index',
    meta: { roles: ['admin'] },
    children: [{
      path: 'index',
      component: asyncImport('OutputValueManage'),
      name: 'outputValueManage',
      meta: {
        title: 'outputValueManage',
        icon: 'money',
        roles: ['admin'],
      },
    }],
  },
  {
    path: '/userRecords',
    component: Layout,
    redirect: '/userRecords/index',
    meta: { roles: ['admin'] },
    children: [{
      path: 'index',
      component: asyncImport('UserRecords'),
      name: 'userRecords',
      meta: {
        title: 'userRecords',
        icon: 'record',
        roles: ['admin'],
      },
    }],
  },
  {
    path: '/qrcode',
    component: Layout,
    redirect: '/qrcode/index',
    meta: { roles: ['user'] },
    children: [{
      path: 'index',
      component: asyncImport('Qrcode'),
      name: 'qrcode',
      meta: {
        title: 'qrcode',
        icon: 'dashboard',
        roles: ['user'],
      },
    }],
  },
  {
    path: '/standard',
    component: Layout,
    redirect: '/standard/index',
    meta: { roles: ['user'] },
    children: [{
      path: 'index',
      component: asyncImport('Standard'),
      name: 'standard',
      meta: {
        title: 'standard',
        icon: 'dashboard',
        roles: ['user'],
      },
    }],
  },
  {
    path: '/about',
    component: Layout,
    redirect: '/about/index',
    meta: { roles: ['user'] },
    children: [{
      path: 'index',
      component: asyncImport('About'),
      name: 'about',
      meta: {
        title: 'about',
        icon: 'dashboard',
        roles: ['user'],
      },
    }],
  },
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/index',
    meta: { roles: ['admin', 'user'] },
    children: [{
      path: 'index',
      component: asyncImport('Feedback'),
      name: 'feedback',
      meta: {
        title: 'feedback',
        icon: 'message',
        roles: ['admin', 'user'],
      },
    }],
  },
];
