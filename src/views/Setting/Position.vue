<template>
  <div class="position">
    <header class="admin-header flex-sb">
      <div class="title">职务权限</div>
      <el-button type="text" @click="handleAdd">新建职务</el-button>
    </header>

    <div class="info-wrapper">
      <section class="title">最高职务拥有以下特权：</section>
      <section>1、可以进入系统设置</section>
      <section>2、查看和编辑所有项目</section>
      <section>3、更新公司信息</section>
    </div>

    <div class="list-wrapper">
      <edit-line
        v-for="item in list"
        :key="item.id"
      >
        <div class="role-item">
          <div class="name">{{ item.name }}</div>
          <div class="desc">{{ `共${item.menuList.length}项权限：${getMenuStr(item.menuList)}` }}</div>
        </div>
      </edit-line>
    </div>
  </div>
</template>

<script>
import { getMenuListList } from '@/api/menu';
import { getRoleList } from '@/api/role';

export default {
  name: 'Position',
  data() {
    return {
      menuMap: {},
      list: [],
    };
  },
  created() {
    getMenuListList().then((res) => {
      const menuList = JSON.parse(res.data);
      const menuMap = {};

      menuList.forEach((menu) => {
        // menuMap[menu.id] = {
        //   id: menu.id,
        //   name: menu.name,
        // };

        if (menu.children && menu.children.length > 0) {
          menu.children.forEach((childMenu) => {
            menuMap[childMenu.id] = {
              id: childMenu.id,
              name: childMenu.name,
            };
          });
        }
      });

      this.menuMap = menuMap;

      this.getList();
    });
  },
  methods: {
    getList() {
      getRoleList().then((res) => {
        const { data } = res;

        data.forEach((menu) => {
          const menuList = this.getMenuInfo(menu.menuList);
          menu.menuList = menuList;
        });

        this.list = data;
      });
    },
    getMenuInfo(menuIds) {
      const list = menuIds.split(',');
      const menuMap = this.menuMap;
      const menuList = [];

      list.forEach((id) => {
        if (menuMap[id]) {
          menuList.push(menuMap[id]);
        }
      });

      return menuList;
    },
    getMenuStr(list) {
      const menuArr = [];

      list.forEach((menu) => {
        menuArr.push(menu.name);
      });

      return menuArr.join(',');
    },
    handleAdd() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .position .admin-header {
    border-bottom: none;
  }

  .info-wrapper {
    padding: 11px 15px;
    color: #909399;
    background: #F0F2F5;

    .title {
      margin-bottom: 5px;
    }
  }

  .list-wrapper {
    .edit-line {
      height: 72px;
    }

    .role-item {
      .desc {
        color: #909399;
      }
    }
  }
</style>
