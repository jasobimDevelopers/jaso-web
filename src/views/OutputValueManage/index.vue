<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.name')" v-model="listQuery.others">
      </el-input>
      <el-date-picker
        v-model="listQuery.dates"
        type="date"
        placeholder="选择日期"
        class="filter-item"
        value-format="yyyy-MM-dd"
        @change="handleFilter"
      >
      </el-date-picker>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('btn.search')}}</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">{{$t('btn.add')}}</el-button>
      <el-button class="filter-item" type="danger" icon="el-icon-delete" :disabled="multipleSelection.length === 0" @click="handleDeleteSelects">{{$t('btn.delete')}}</el-button>
    </div>
    <!-- /filter -->

    <!-- table -->
    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" :label="$t('table.id')" prop="id" width="100">
      </el-table-column>
      <el-table-column align="center" :label="$t('project.name')" prop="projectName">
      </el-table-column>
      <el-table-column align="center" :label="$t('output.num')" prop="num">
      </el-table-column>
      <el-table-column align="center" :label="$t('output.finished')" prop="finished">
      </el-table-column>
      <el-table-column align="center" :label="$t('output.dates')" prop="dates">
      </el-table-column>
      <el-table-column align="center" :label="$t('table.operation')" width="200">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDelete({ idList: scope.row.id })">{{$t('btn.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /table -->

    <!-- pagination -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.pageIndex"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="listQuery.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalNumber">
      </el-pagination>
    </div>
  <!-- /pagination -->

  <!-- dialog -->
    <el-dialog
      :title="$t('dialog.add')"
      :visible.sync="dialogFormVisible"
      @close="resetForm"
      width="640px"
    >
      <el-form :rules="rules" ref="dialogForm" :model="output" label-position="right" label-width="80px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('project.name')" prop="projectId">
          <el-select
            v-model="output.projectId"
            :placeholder="$t('project.name')"
            @change="handleChangeProject"
          >
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('project.name')" prop="others">
          <el-input v-model="output.others"></el-input>
        </el-form-item>
        <el-form-item :label="$t('output.num')" prop="num">
          <el-input-number v-model="output.num" :min="1" :label="$t('output.num')"></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('output.finished')" prop="finished">
          <el-input-number v-model="output.finished" :min="1" :label="$t('output.finished')"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- /dialog -->
  </div>
</template>

<script>
import { getValueOutputList, deleteValueOutput, addValueOutput } from '@/api/output';
import { getProjectList } from '@/api/projectManage';

export default {
  name: 'OutputValueManage',
  data() {
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        others: '',
        dates: '',
      },
      output: {
        others: '',
        projectId: null,
        num: null,
        finished: null,
      },
      listLoading: false,
      list: null,
      projectList: [],
      // page
      totalNumber: 0,
      totalPage: 1,
      // multi select
      multipleSelection: [],
      // dialog
      dialogFormVisible: false,
      // rules
      rules: {
        others: [{ required: true, message: `${this.$t('project.name')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        num: [{ required: true, message: `${this.$t('output.num')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        finished: [{ required: true, message: `${this.$t('output.finished')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    // project list
    getProjectList({ pageIndex: -1 }).then((res) => {
      this.projectList = res.data;
    });
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getValueOutputList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.pageIndex = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDeleteSelects() {
      const list = [];
      this.multipleSelection.forEach((output) => {
        list.push(output.id);
      });

      this.handleDelete({
        idList: list.join(','),
      });
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
      this.dialogFormVisible = true;
    },
    handleChangeProject(val) {
      this.projectList.forEach((item) => {
        if (item.id === val) {
          this.output.others = item.name;
        }
      });
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          addValueOutput(this.output).then(() => {
            this.dialogFormVisible = false;
            this.getList();
          });
        }
      });
    },
    resetForm() {
      this.output = {
        name: '',
        projectId: null,
        num: null,
        finished: null,
      };

      this.$refs.dialogForm.resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
