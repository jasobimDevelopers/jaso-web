<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-select
        v-model="listQuery.projectId"
        :placeholder="$t('project.name')"
        @change="handleFilter"
        class="filter-item"
      >
        <el-option
          v-for="item in projectList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="listQuery.questionType"
        :placeholder="$t('question.questionType')"
        @change="handleFilter"
        class="filter-item"
      >
        <el-option
          v-for="(item, i) in questionOfTypeList"
          :key="i"
          :label="item"
          :value="i === 0 ? null : (i - 1)"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="listQuery.priority"
        :placeholder="$t('question.priority')"
        @change="handleFilter"
        class="filter-item"
      >
        <el-option
          v-for="(item, i) in questionOfPriorityList"
          :key="i"
          :label="item"
          :value="i === 0 ? null : (i - 1)"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="listQuery.state"
        :placeholder="$t('question.state')"
        @change="handleFilter"
        class="filter-item"
      >
        <el-option
          v-for="(item, i) in questionStateList"
          :key="i"
          :label="item"
          :value="i === 0 ? null : (i - 1)"
        >
        </el-option>
      </el-select>
      <div class="filter-item" style="width: 240px">
        <el-input :placeholder="$t('message.keyword')" v-model="listQuery.content" @keyup.enter.native="handleFilter">
          <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
        </el-input>
      </div>
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">{{$t('btn.add')}}</el-button>
    </div>
    <!-- /filter -->

    <!-- percent -->
    <question-percent :percents="percentList"></question-percent>
    <!-- /percent -->

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
          <router-link :to="`question/${scope.row.id}`">
            <el-button type="primary" size="mini">{{$t('btn.view')}}</el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">{{$t('btn.delete')}}</el-button>
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
      <el-form :rules="rules" ref="dialogForm" :model="question" label-position="left" label-width="100px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('project.name')" prop="projectId">
          <el-select
            v-model="question.projectId"
            :placeholder="$t('project.name')"
          >
            <el-option
              v-for="item in projectList"
              v-if="item.id !== null"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('question.name')" prop="name">
          <el-input v-model="question.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('question.trades')" prop="trades">
          <el-input v-model="question.trades"></el-input>
        </el-form-item>
        <el-form-item :label="$t('question.questionType')" prop="questionType">
          <el-select
            v-model="question.questionType"
            :placeholder="$t('question.questionType')"
          >
            <el-option
              v-for="(item, i) in questionOfTypeList"
              v-if="i !== 0"
              :key="i"
              :label="item"
              :value="i - 1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('question.priority')" prop="priority">
          <el-select
            v-model="question.priority"
            :placeholder="$t('question.priority')"
          >
            <el-option
              v-for="(item, i) in questionOfPriorityList"
              v-if="i !== 0"
              :key="i"
              :label="item"
              :value="i - 1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('question.intro')" prop="intro">
          <el-input
            v-model="question.intro"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('question.fileList')" prop="fileList">
          <div class="upload-file-wrapper flex-row">
            <el-button type="primary" style="width: 100px">
              <input type="file" ref="file" @change="handleFileChange" multiple accept="image/*" />
              <span>上传</span>
            </el-button>
            <div style="marginLeft: 8px;">{{question.fileName}}</div>
          </div>
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
import { getQuestionListWithPercent, deleteQuestion, addQuestion } from '@/api/question';
import { getProjectList } from '@/api/projectManage';
import { questionOfTypeList, questionOfPriorityList, questionStateList } from '@/filters';
import QuestionPercent from './QuestionPercent';

export default {
  name: 'QualityManage',
  components: {
    QuestionPercent,
  },
  data() {
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        projectId: null,
        content: '',
        questionType: null,
        priority: null,
        state: null,
      },
      question: {
        projectId: null,
        name: '',
        trades: '',
        questionType: null,
        priority: null,
        intro: '',
        fileList: [],
        fileName: '',
      },
      percentList: {},
      listLoading: false,
      list: null,
      projectList: [],
      // page
      totalNumber: 0,
      totalPage: 1,
      // dialog
      dialogFormVisible: false,
      // filters
      questionOfTypeList,
      questionOfPriorityList,
      questionStateList,
      // rules
      rules: {
        projectId: [{ required: true, message: `${this.$t('project.name')}${this.$t('message.notEmpty')}`, trigger: 'change' }],
        name: [{ required: true, message: `${this.$t('question.name')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        questionType: [{ required: true, message: `${this.$t('question.priority')}${this.$t('message.notEmpty')}`, trigger: 'change' }],
        priority: [{ required: true, message: `${this.$t('question.priority')}${this.$t('message.notEmpty')}`, trigger: 'change' }],
      },
    };
  },
  created() {
    // project list
    getProjectList({ pageIndex: -1 }).then((res) => {
      this.projectList = [
        {
          id: null,
          name: '全部',
        },
        ...res.data,
      ];
    });
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getQuestionListWithPercent(this.listQuery).then((res) => {
        const { data, others, page } = res;
        const { totalNumber, totalPage } = page;
        this.list = data;
        this.percentList = others;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.pageIndex = 1;
      this.getList();
    },
    handleAdd() {
      this.dialogFormVisible = true;
    },
    handleFileChange(e) {
      const files = e.target.files;
      this.question.fileList = files;
      this.question.fileName = files.length > 0 ? `${files.length}个文件` : files[0].name;
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
      this.$confirm(this.$t('message.deleteQuestion'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete
        deleteQuestion({
          questionId,
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
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          addQuestion(this.question).then(() => {
            this.dialogFormVisible = false;
            this.getList();
          });
        }
      });
    },
    resetForm() {
      this.question = {
        projectId: null,
        name: '',
        trades: '',
        questionType: null,
        priority: null,
        intro: '',
        fileList: null,
        fileName: '',
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
