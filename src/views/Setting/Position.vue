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
        :editInfo="item"
        @onEdit="handleEdit"
        @onDelete="handleDelete"
      >
        <div class="role-item">
          <div class="name">{{ item.name }}</div>
          <div class="desc">{{ `共${item.menuList.length}项权限：${getMenuStr(item.menuList)}` }}</div>
        </div>
      </edit-line>
    </div>

    <!-- dialog -->
    <el-dialog
      :visible.sync="dialogFormVisible"
      @close="resetForm"
      width="435px"
    >
      <div slot="title" style="font-weight: bolder">
        {{ this.actionStatus === 'add' ? '新建职务' : '编辑职务' }}
      </div>
      <el-form :rules="rules" ref="dialogForm" :model="role" class="role-form">
        <el-form-item label="职务名称" prop="name">
          <el-input v-model="role.name" placeholder="请输入职务名称"></el-input>
        </el-form-item>
        <el-form-item label="职务权限" prop="name">
          <div class="menu-list">
            <el-checkbox-group v-model="role.menuList">
              <el-checkbox
                v-for="item in menuList"
                :key="item.id"
                :label="item.id"
              >{{ item.menuName }}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="可编辑" prop="readState">
          <div style="display: inline-block">
            <el-switch v-model="role.readState">
            </el-switch>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :disabled="role.name === '' || role.menuList.length === 0" @click="handleSave">{{$t('btn.save')}}</el-button>
      </div>
    </el-dialog>
    <!-- /dialog -->
  </div>
</template>

<script>
import { getMenuListList } from '@/api/menu';
import { getRoleList, addRole, updateRole, deleteRole } from '@/api/role';

export default {
  name: 'Position',
  data() {
    return {
      menuList: [],
      list: [],
      role: {
        name: '',
        readState: false,
        menuList: [],
      },
      // dialog
      dialogFormVisible: false,
      // action status
      actionStatus: 'add',
      // rules
      rules: {
        name: [{ required: true, message: `职务名称${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    getMenuListList().then((res) => {
      const menuList = res.data || [];

      this.menuList = menuList;
      this.getList();
    });
  },
  methods: {
    getList() {
      getRoleList().then((res) => {
        const { data } = res;

        data.forEach((menu) => {
          const menuList = this.getMenuList(menu.menuList);
          menu.menuList = menuList;
        });

        this.list = data;
      });
    },
    getMenuList(menuList) {
      const menuArr = [];

      menuList.forEach((menu) => {
        if (menu.children && menu.children.length > 0) {
          menu.children.forEach((childMenu) => {
            menuArr.push(childMenu);
          });
        }
      });

      return menuArr;
    },
    getMenuStr(list) {
      const menuArr = [];

      list.forEach((menu) => {
        menuArr.push(menu.name);
      });

      return menuArr.join(',');
    },
    checkMenu(menu) {
      const { menuList } = this.role;
      const menuIds = [];

      menuList.forEach((m) => {
        menuIds.push(m.id);
      });

      return menuIds.indexOf(menu.id) >= 0;
    },
    handleAdd() {
      this.actionStatus = 'add';
      this.dialogFormVisible = true;
    },
    handleEdit(item) {
      this.actionStatus = 'edit';
      const menuList = [];

      item.menuList.forEach((menu) => {
        menuList.push(Number(menu.id));
      });

      this.role = {
        id: item.id,
        name: item.name,
        menuList,
        readState: (item.readState === 1),
      };

      this.dialogFormVisible = true;
    },
    handleDelete(item) {
      const { id } = item;

      this.$confirm('此操作将永久删除该职务, 是否继续?', this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        deleteRole({ id }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.deleteOk'),
          });

          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.deleteCancel'),
        });
      });
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          const params = Object.assign(this.role, {
            readState: (this.role.readState ? 1 : 0),
            menuList: this.role.menuList.join(','),
          });

          if (this.actionStatus === 'add') {
            addRole(params).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          } else {
            updateRole(params).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          }
        }
      });
    },
    resetForm() {
      this.role = {
        name: '',
        readState: 0,
        menuList: [],
      };

      this.$refs.dialogForm.resetFields();
      this.$refs.dialogForm.$el.reset();
    },
  },
};
</script>

<style lang="scss">
  .role-form {
    .menu-list {
      display: inline-block;
      padding: 8px 0;
      width: 100%;
      background: #F0F2F5;

      .el-checkbox {
        margin-left: 14px;
        width: 112px;
      }
    }
  }
</style>

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
