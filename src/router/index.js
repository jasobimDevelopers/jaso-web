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
      component: asyncImport('Project/BasicInfo'),
      name: 'project_detail_info',
      meta: {
        title: '项目基本信息',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'construction_task',
      component: asyncImport('Project/TaskList'),
      name: 'construction_task',
      meta: {
        title: '施工任务单',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'construction_log',
      component: asyncImport('Project/ConstructionLog'),
      name: 'construction_log',
      meta: {
        title: '施工日志',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'item',
      component: asyncImport('ProjectManage'),
      name: 'item',
      meta: {
        title: '构建信息',
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
      path: 'value_output',
      component: asyncImport('Statistics/Output'),
      name: 'value_output',
      meta: {
        title: '产值统计',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'workers',
      component: asyncImport('Statistics/Workers'),
      name: 'workers',
      meta: {
        title: '用工统计',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'attendance',
      component: asyncImport('Statistics/Attendance'),
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
      component: asyncImport('Material/MaterialCount'),
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
    }, {
      path: 'quality_feedback',
      component: asyncImport('ProjectManage'),
      name: 'quality_feedback',
      meta: {
        title: '质量整改反馈单',
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
    }, {
      path: 'question_feedback',
      component: asyncImport('ProjectManage'),
      name: 'question_feedback',
      meta: {
        title: '安全整改反馈单',
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
      path: 'file',
      component: asyncImport('Datas/File'),
      name: 'file',
      meta: {
        title: '文件',
        roles: ['admin', 'user'],
      },
    },
    // {
    //   path: 'model',
    //   component: asyncImport('ProjectManage'),
    //   name: 'model',
    //   meta: {
    //     title: 'BIM模型',
    //     roles: ['admin', 'user'],
    //   },
    // }
    ],
  },
  {
    path: '/work_manage/:id',
    component: Layout,
    name: 'work_manage',
    meta: {
      basePath: 'work_manage',
      icon: 'project',
      title: '劳务管理',
      roles: ['admin', 'user'],
    },
    children: [{
      path: 'mechanic',
      component: asyncImport('WorkManage/Mechanic'),
      name: 'mechanic',
      meta: {
        title: '记工管理',
        roles: ['admin', 'user'],
      },
    }, {
      path: 'roster',
      component: asyncImport('WorkManage/Roster'),
      name: 'roster',
      meta: {
        title: '人员花名册',
        roles: ['admin', 'user'],
      },
    }],
  },
  { path: '*', redirect: '/404', hidden: true },
];
