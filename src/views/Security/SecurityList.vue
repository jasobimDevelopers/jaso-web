<template>
  <div>
    <breadcrumb>
      <div>
        <el-input placeholder="请输入内容" v-model="listQuery.content" class="input-with-select" style="margin-right: 15px; width: 340px">
          <el-select v-model="listQuery.searchType" slot="prepend" placeholder="请选择" style="width: 108px">
            <el-option label="用户姓名" value="0"></el-option>
            <el-option label="问题名称" value="1"></el-option>
            <el-option label="问题详情" value="2"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
        <el-button class="filter-item" type="text" icon="el-icon-plus" @click="handleAdd">新增</el-button>
      </div>
    </breadcrumb>

    <div class="app-container">
      <div class="list-wrapper">
        <moment
          v-for="item in list"
          :key="item.id"
          :moment="item"
          :type="1"
          @resetAudioList="handleResetAudioList"
          @refreshList="getList"
        ></moment>
      </div>

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
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="480px"
      >
        <div slot="title" style="font-weight: bolder">
          新增安全整改单
        </div>
        <el-form :rules="rules" ref="dialogForm" :model="question" label-position="top">
          <el-form-item label="检查部位：" prop="name">
            <el-input v-model="question.name" placeholder="请输入检查部位"></el-input>
          </el-form-item>
          <el-form-item label="存在隐患：" prop="intro">
            <el-input type="textarea" v-model="question.intro" placeholder="请输入存在的隐患"></el-input>
          </el-form-item>
          <el-form-item label="整改措施：" prop="trades">
            <el-input type="textarea" v-model="question.intro" placeholder="请输入要求整改措施"></el-input>
          </el-form-item>
          <el-form-item label="问题程度：" prop="priority">
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
          <el-form-item label="指定人员：" prop="userList">
            <el-select v-model="question.userList" multiple placeholder="选择指定人员">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.realName"
                :value="`${item.id}`">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="现场图片：" prop="file">
            <div class="upload-file-wrapper flex-column">
              <div class="flex-row">
                <el-button type="primary" style="margin-right: 15px;">
                <input type="file" ref="picInput" multiple accept="image/*" @change="handleFileChange" />
                  <span>点击上传</span>
                </el-button>
                <span>{{ question.fileList.length > 0 ? `${question.fileList.length}个文件` : '' }}</span>
              </div>
              <div style="font-size: 12px;">只能上传jpg/png文件，且不超过500kb</div>
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
  </div>
</template>

<script>
import { getQuestionHash, addQuestion } from '@/api/security';
import { getUserTeam } from '@/api/userManage';
import { questionOfPriorityList } from '@/filters';
import Moment from '../Quality/components/Moment';

export default {
  name: 'SecurityList',
  components: {
    Moment,
  },
  data() {
    const { params: { id } } = this.$route;

    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 5,
        projectId: id,
        searchType: '0',
        content: '',
      },
      question: {
        name: '',
        intro: '',
        trades: '',
        userList: [],
        priority: null,
        fileList: [],
        projectId: id,
      },
      questionOfPriorityList,
      // page
      totalNumber: 0,
      totalPage: 1,
      // list
      list: [],
      userList: [],
      // dialog
      dialogFormVisible: false,
      // rules
      rules: {
        name: [{ required: true, message: `检查部位${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        intro: [{ required: true, message: `存在隐患${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        trades: [{ required: true, message: `整改措施${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        priority: [{ required: true, message: `问题程度${this.$t('message.notEmpty')}`, trigger: 'change' }],
      },
    };
  },
  created() {
    const { params: { id } } = this.$route;
    this.getList();

    getUserTeam({
      pageIndex: -1,
      projectId: id,
    }).then((res) => {
      const { data } = res;
      this.userList = data;
    });
  },
  methods: {
    getList() {
      getQuestionHash(this.listQuery).then((res) => {
        const { data, page } = res;
        this.list = data;

        if (page) {
          const { totalNumber, totalPage } = page;
          this.totalNumber = totalNumber;
          this.totalPage = totalPage;
        } else {
          this.totalNumber = 0;
          this.totalPage = 1;
        }
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },
    handleResetAudioList() {
      this.$children.forEach((comp) => {
        if (comp.resetAudioList) {
          comp.resetAudioList();
        }
      });
    },
    handleFileChange(e) {
      const files = e.target.files;
      this.question.fileList = files;
    },
    handleAdd() {
      this.dialogFormVisible = true;
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
      this.$refs.dialogForm.resetFields();
      this.$refs.dialogForm.$el.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
