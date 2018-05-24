import { Message } from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/auth'; // getToken from cookie

import router from './router';
import store from './store';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/', '/login']; // no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start(); // start progress bar

  if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next();
  } else {
    if (getToken()) { // determine if there has token
      // has token
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then((res) => { // 拉取user_info
          // note: roles must be a array! such as: ['editor','develop']
          const { menuList, userType } = res;

          store.dispatch('GenerateRoutes', { menuList, userType }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
            // hack方法 确保addRoutes已完成
            // set the replace: true so the navigation will not leave a history record
            next({ ...to, replace: true });
          });
        }).catch(() => {
          store.dispatch('LogOut').then(() => {
            Message.error('Verification failed, please login again');
            next({ path: '/login' });
          });
        });
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next();
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } });
        }
      }
    } else {
      // has no token
      next('/login'); // 否则全部重定向到登录页
      // if current page is login will not trigger afterEach hook, so manually handle it
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});
