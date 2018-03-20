<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('feedback.userName')" v-model="listQuery.userName">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('feedback.content')" v-model="listQuery.content">
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
      <el-table-column align="center" :label="$t('feedback.userName')" prop="realName">
      </el-table-column>
      <el-table-column align="center" :label="$t('feedback.content')" prop="content">
      </el-table-column>
      <el-table-column align="center" :label="$t('feedback.date')" prop="date">
      </el-table-column>
      <el-table-column align="center" :label="$t('table.operation')" width="200">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="handleDelete({ feedbackId: scope.row.id })">{{$t('btn.delete')}}</el-button>
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
  </div>
</template>

<script>
import { getFeedbackList, deleteFeedback } from '@/api/feedback';

export default {
  name: 'Feedback',
  data() {
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        content: '',
        dates: '',
      },
      listLoading: false,
      list: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      // multi select
      multipleSelection: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getFeedbackList(this.listQuery).then((res) => {
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
        feedbackId: list.join(','),
      });
    },
    handleDelete(params) {
      this.$confirm(this.$t('message.deleteFeedback'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        deleteFeedback(params).then(() => {
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
