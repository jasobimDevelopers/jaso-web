<template>
  <div class="work-group">
    <header class="admin-header flex-sb">
      <div class="title">班组管理</div>
      <el-button type="text" @click="handleAdd">新建班组</el-button>
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
        {{ this.actionStatus === 'add' ? '新建班组' : '编辑班组' }}
      </div>
      <el-form :rules="rules" ref="dialogForm" :model="team">
        <el-form-item label="班组名称" prop="name">
          <el-input v-model="team.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :disabled="team.name === ''" @click="handleSave">{{$t('btn.save')}}</el-button>
      </div>
    </el-dialog>
    <!-- /dialog -->
  </div>
</template>

<script>
import { getUserTeamList, addUserTeam, deleteUserTeam, updateUserTeam } from '@/api/team';

export default {
  name: 'WorkGroup',
  data() {
    return {
      list: [],
      team: {
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
      getUserTeamList().then((res) => {
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
            addUserTeam(this.team).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          } else {
            updateUserTeam(this.team).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          }
        }
      });
    },
    handleEdit(item) {
      this.actionStatus = 'edit';
      this.team = {
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
        deleteUserTeam({ id }).then(() => {
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
      this.team = {
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
