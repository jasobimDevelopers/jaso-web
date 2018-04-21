<template>
  <div class="department">
    <header class="admin-header flex-sb">
      <div class="title">组织架构</div>
      <el-button type="text" @click="handleAdd">新建部门</el-button>
    </header>

    <div class="list-wrapper">
      <edit-line
        v-for="item in list"
        :key="item.id"
        :editInfo="item"
        @onEdit="handleEdit"
        @onDelete="handleDelete"
      >
        {{ item.name }}
      </edit-line>
    </div>

    <!-- dialog -->
    <el-dialog
      :visible.sync="dialogFormVisible"
      @close="resetForm"
      width="360px"
    >
      <div slot="title" style="font-weight: bolder">
        {{ this.actionStatus === 'add' ? '新建部门' : '编辑部门' }}
      </div>
      <el-form :rules="rules" ref="dialogForm" :model="department">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="department.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :disabled="department.name === ''" @click="handleSave">{{$t('btn.save')}}</el-button>
      </div>
    </el-dialog>
    <!-- /dialog -->
  </div>
</template>

<script>
import { getDepartmentList, addDepartment, deleteDepartment, updateDepartment } from '@/api/department';

export default {
  name: 'Department',
  data() {
    return {
      list: [],
      department: {
        name: '',
      },
      // dialog
      dialogFormVisible: false,
      // action status
      actionStatus: 'add',
      // rules
      rules: {
        name: [{ required: true, message: `部门名称${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getDepartmentList().then((res) => {
        const { data } = res;
        this.list = data;
      });
    },
    handleAdd() {
      this.actionStatus = 'add';
      this.dialogFormVisible = true;
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          if (this.actionStatus === 'add') {
            addDepartment(this.department).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          } else {
            updateDepartment(this.department).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          }
        }
      });
    },
    handleEdit(item) {
      this.actionStatus = 'edit';
      this.department = {
        id: item.id,
        name: item.name,
      };
      this.dialogFormVisible = true;
    },
    handleDelete(item) {
      const { id } = item;

      this.$confirm('此操作将永久删除该部门, 是否继续?', this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        deleteDepartment({ id }).then(() => {
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
    resetForm() {
      this.department = {
        name: '',
      };

      this.$refs.dialogForm.resetFields();
      this.$refs.dialogForm.$el.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
