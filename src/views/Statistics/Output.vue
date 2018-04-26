<template>
  <div>
    <breadcrumb>
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item v-if="downloadLink !== ''">
          <a :href="downloadLink | setFileRoot" target="__blank" style="color: #606266; font-weight: normal">下载</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-button type="text" @click="handleAdd">新增产值</el-button>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </breadcrumb>

    <div class="app-container">
      <!-- table -->
      <el-table
        :data="list"
        v-loading="listLoading"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="月份" prop="date" width="100">
        </el-table-column>
        <el-table-column align="center" label="当月产值" prop="finished">
        </el-table-column>
        <el-table-column align="center" label="累计产值" prop="priceCount">
        </el-table-column>
        <el-table-column align="center" label="总产值" prop="price">
        </el-table-column>
        <el-table-column align="center" label="累计占比" prop="priceCountPercent">
        </el-table-column>
        <el-table-column align="center" :label="$t('table.operation')" width="100">
          <template slot-scope="scope">
            <div class="operation-btns">
              <i class="el-icon-edit-outline" @click="handleEdit(scope.row)"></i>
              <i class="el-icon-delete" @click="handleDelete({ idList: scope.row.id })"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table -->

      <!-- dialog -->
      <el-dialog
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="360px"
      >
        <div slot="title" style="font-weight: bolder">
          {{ this.actionStatus === 'add' ? '新增产值' : '编辑产值' }}
        </div>
        <el-form :rules="rules" ref="dialogForm" :model="output" label-position="top">
          <el-form-item v-if="this.actionStatus === 'add'" label="月份：" prop="month">
            <el-date-picker
              type="month"
              placeholder="请选择月份"
              v-model="output.date"
              @change="handleDateChange"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="产值(万元)：" prop="finished">
            <el-input-number v-model="output.finished" :min="1" label="请输入产值"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>
      <!-- /dialog -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getValueOutputList, deleteValueOutput, addValueOutput, getValueOutputByDate, updateValueOutput, exportValueOutput } from '@/api/output';

export default {
  name: 'OutputValueManage',
  data() {
    const { params: { id } } = this.$route;

    return {
      listQuery: {
        pageIndex: -1,
        projectId: id,
      },
      output: {
        projectId: id,
        year: null,
        month: null,
        finished: 0,
      },
      listLoading: false,
      list: null,
      // action status
      actionStatus: 'add',
      // dialog
      dialogFormVisible: false,
      // download link
      downloadLink: '',
      // rules
      rules: {
        month: [{ required: true, message: `月份${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        finished: [{ required: true, message: `产值${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapGetters([
      'project',
    ]),
  },
  created() {
    const { params: { id } } = this.$route;
    // project list
    this.getList();
    // fetch download link
    exportValueOutput({
      projectId: id,
    }).then((res) => {
      const { data } = res;

      this.downloadLink = data;
    });
  },
  methods: {
    handleFilterList(data) {
      const { price } = this.project;
      let numCount = 0;

      data.forEach((output) => {
        numCount += output.finished;
        output.date = `${output.year}年${output.month + 1}月`;
        output.price = `${price}万元`;
        output.priceCount = `${Number(numCount).toFixed(2)}万元`;
        output.priceCountPercent = `${Number((numCount / price) * 100).toFixed(2)}%`;
      });

      this.list = data;
    },
    getList() {
      this.listLoading = true;

      getValueOutputList(this.listQuery).then((res) => {
        const { data } = res;
        this.handleFilterList(data);
        this.listLoading = false;
      });
    },
    handleDateChange(dateArr) {
      if (dateArr) {
        const date = new Date(dateArr);
        const year = date.getFullYear();
        const month = date.getMonth();

        this.output.year = year;
        this.output.month = month;

        getValueOutputByDate({
          month,
          year,
          projectId: this.output.projectId,
        }).then((res) => {
          const { finished } = res.data;

          this.output.finished = finished;
        });
      } else {
        this.output.year = null;
        this.output.month = null;
      }
    },
    handleDelete(params) {
      this.$confirm(this.$t('message.deleteOutput'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        deleteValueOutput(params).then(() => {
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
    handleAdd() {
      this.actionStatus = 'add';
      this.dialogFormVisible = true;
    },
    handleEdit(item) {
      this.actionStatus = 'edit';

      this.output = {
        ...this.output,
        id: item.id,
        year: item.year,
        month: item.month,
        finished: item.finished,
        date: new Date(`${item.year}-${item.month}`),
      };

      this.dialogFormVisible = true;
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          if (this.actionStatus === 'add') {
            addValueOutput(this.output).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          } else {
            updateValueOutput(this.output).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          }
        }
      });
    },
    resetForm() {
      const { params: { id } } = this.$route;
      this.output = {
        projectId: id,
        year: null,
        month: null,
        finished: 0,
      };

      this.$refs.dialogForm.resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
