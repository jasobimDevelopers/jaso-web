<template>
  <div>
    <!-- filter -->
    <div class="filter-container">
      <div class="filter-wrapper">
        <el-form ref="filterForm" label-position="right" label-width="100px">
          <el-form-item :label="$t('question.questionType')">
            <el-radio
              v-model="listQuery.questionType"
              v-for="(item, i) in questionOfTypeList"
              :key="i"
              :label="i === 0 ? null : (i - 1)"
              @change="handleFilter"
            >{{item}}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('question.priority')">
            <el-radio
              v-model="listQuery.priority"
              v-for="(item, i) in questionOfPriorityList"
              :key="i"
              :label="i === 0 ? null : (i - 1)"
              @change="handleFilter"
            >{{item}}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('question.state')">
            <el-radio
              v-model="listQuery.state"
              v-for="(item, i) in questionStateList"
              :key="i"
              :label="i === 0 ? null : (i - 1)"
              @change="handleFilter"
            >{{item}}</el-radio>
          </el-form-item>
        </el-form>
      </div>
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
    >
      <el-table-column align="center" :label="$t('table.id')" prop="id">
      </el-table-column>
      <el-table-column align="center" :label="$t('question.questionType')" prop="questionType">
        <template slot-scope="scope">
          <span>{{questionOfTypeList[scope.row.questionType + 1]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('question.userId')" prop="userId">
      </el-table-column>
      <el-table-column align="center" :label="$t('question.name')" prop="name">
      </el-table-column>
      <el-table-column align="center" :label="$t('question.trades')" prop="trades">
      </el-table-column>
      <el-table-column align="center" :label="$t('question.questionDate')" prop="questionDate">
      </el-table-column>
      <el-table-column align="center" :label="$t('question.priority')">
        <template slot-scope="scope">
          <span>{{questionOfPriorityList[scope.row.priority + 1]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('question.state')">
        <template slot-scope="scope">
          <span>{{questionStateList[scope.row.state + 1]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.operation')" width="200">
        <template slot-scope="scope">
          <el-button type="danger" size="mini"  @click="handleDelete(scope.row.id)">{{$t('btn.delete')}}</el-button>
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
import { getQuestionList, deleteQuestion } from '@/api/question';
import { questionOfTypeList, questionOfPriorityList, questionStateList } from '@/filters';

export default {
  name: 'QuestionList',
  data() {
    const { params: { id } } = this.$route;
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        projectId: id,
        questionType: null,
        priority: null,
        state: null,
      },
      listLoading: false,
      list: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      // filters
      questionOfTypeList,
      questionOfPriorityList,
      questionStateList,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getQuestionList(this.listQuery).then((res) => {
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
    handleDelete(questionId) {
      const { params: { id } } = this.$route;

      this.$confirm(this.$t('message.deleteQuestion'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete
        deleteQuestion({
          questionId,
          projectId: id,
        }).then(() => {
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
