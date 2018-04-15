import Vue from 'vue';
import Router from 'vue-router';

/* Layout */
import Layout from '../views/Layout';
import commonLayout from '../views/Layout/common';

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
*/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
                                 this attribute is invalid later.
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
    basePath: 'project',         record the own for path for SideBar comp
    redirect: 'projectManage',   try to redirect to child link fro Breadcrumb comp
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
  { path: '/404', component: asyncImport('errorPage/404'), hidden: true },
  { path: '/401', component: asyncImport('errorPage/401'), hidden: true },
];

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap,
});

// admin routers
export const adminRouterMap = [
  {
    path: '/admin',
    component: commonLayout,
    redirect: '/admin/UserManage',
    meta: { roles: ['admin'] },
    hidden: true,
    children: [{
      path: 'UserManage',
      component: asyncImport('UserManage'),
      name: 'UserManage',
    }, {
      path: 'setting',
      component: asyncImport('Setting'),
      name: 'setting',
    }],
  },
];

// async menu list routers
export const asyncRouterMap = [
  /* ******* Common Layout ******* */
  {
    path: '/projectList',
    component: commonLayout,
    redirect: '/projectList/index',
    meta: { roles: ['admin', 'user'] },
    hidden: true,
    children: [{
      path: 'index',
      component: asyncImport('ProjectList'),
      name: 'ProjectList',
    }],
  },
  /* ******* /Common Layout ******* */

  {
    path: '/project/:id',
    component: Layout,
    name: 'project',
    meta: {
      basePath: 'project',
      icon: 'project',
      title: '生产管理',
      roles: ['admin', 'user'],
    },
    children: [{
      path: 'project_detail_info',
      component: asyncImport('ProjectManage/BasicInfo'),
      name: 'project_detail_info',
      meta: {
        title: '项目基本信息',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'construction_task',
      component: asyncImport('Production/TaskList'),
      name: 'construction_task',
      meta: {
        title: '施工任务单',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'construction_log',
      component: asyncImport('Production/ConstructionLog'),
      name: 'construction_log',
      meta: {
        title: '施工日志',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'order',
      component: asyncImport('ProjectManage'),
      name: 'order',
      meta: {
        title: '预付单',
        roles: ['admin', 'user'],
      },
    }],
  },
  {
    path: '/cost/:id',
    component: Layout,
    name: 'cost',
    meta: {
      basePath: 'cost',
      icon: 'project',
      title: '成本管理',
      roles: ['admin', 'user'],
    },
    children: [{
      path: 'budget',
      component: asyncImport('ProjectManage'),
      name: 'budget',
      meta: {
        title: '预算',
        roles: ['admin', 'user'],
      },
    }],
  },
  {
    path: '/statistics/:id',
    component: Layout,
    name: 'statistics',
    meta: {
      basePath: 'statistics',
      icon: 'project',
      title: '统计管理',
      roles: ['admin', 'user'],
    },
    children: [{
      path: 'workers',
      component: asyncImport('ProjectManage'),
      name: 'workers',
      meta: {
        title: '用工统计',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'attendance',
      component: asyncImport('ProjectManage'),
      name: 'attendance',
      meta: {
        title: '考勤管理',
        roles: ['admin', 'user'],
      },
    }],
  },
  {
    path: '/material/:id',
    component: Layout,
    name: 'material',
    meta: {
      basePath: 'material',
      icon: 'project',
      title: '物资管理',
      roles: ['admin', 'user'],
    },
    children: [{
      path: 'material_count',
      component: asyncImport('ProjectManage'),
      name: 'material_count',
      meta: {
        title: '物资统计',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'material_plan',
      component: asyncImport('ProjectManage'),
      name: 'material_plan',
      meta: {
        title: '材料计划',
        roles: ['admin', 'user'],
      },
    }],
  },
  {
    path: '/quality/:id',
    component: Layout,
    name: 'quality',
    meta: {
      basePath: 'quality',
      icon: 'project',
      title: '质量管理',
      roles: ['admin', 'user'],
    },
    children: [{
      path: 'quality_question',
      component: asyncImport('ProjectManage'),
      name: 'quality_question',
      meta: {
        title: '质量整改单',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'quality_ticket',
      component: asyncImport('ProjectManage'),
      name: 'quality_ticket',
      meta: {
        title: '质量罚款单',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'quality_files',
      component: asyncImport('Quality/QualityFiles'),
      name: 'quality_files',
      meta: {
        title: '质量交底',
        roles: ['admin', 'user'],
      },
    }],
  },
  {
    path: '/security/:id',
    component: Layout,
    name: 'security',
    meta: {
      basePath: 'security',
      icon: 'project',
      title: '安全管理',
      roles: ['admin', 'user'],
    },
    children: [{
      path: 'security_question',
      component: asyncImport('ProjectManage'),
      name: 'security_question',
      meta: {
        title: '安全整改单',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'security_ticket',
      component: asyncImport('ProjectManage'),
      name: 'security_ticket',
      meta: {
        title: '安全罚款单',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'security_files',
      component: asyncImport('Security/SecurityFiles'),
      name: 'security_files',
      meta: {
        title: '安全交底',
        roles: ['admin', 'user'],
      },
    }],
  },
  {
    path: '/datas/:id',
    component: Layout,
    name: 'datas',
    meta: {
      basePath: 'datas',
      icon: 'project',
      title: '资料管理',
      roles: ['admin', 'user'],
    },
    children: [{
      path: 'paper',
      component: asyncImport('Datas/Paper'),
      name: 'paper',
      meta: {
        title: '图纸信息',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'docs',
      component: asyncImport('ProjectManage'),
      name: 'docs',
      meta: {
        title: '文档',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'pics',
      component: asyncImport('ProjectManage'),
      name: 'pics',
      meta: {
        title: '图片',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'model',
      component: asyncImport('ProjectManage'),
      name: 'model',
      meta: {
        title: 'BIM模型',
        roles: ['admin', 'user'],
      },
    }],
  },
  { path: '*', redirect: '/404', hidden: true },
];
