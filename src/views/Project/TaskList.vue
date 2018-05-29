<template>
  <div class="task-page">
    <breadcrumb></breadcrumb>

    <div class="app-container">
      <!-- filter -->
      <div class="filter-container">
        <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('btn.search')" v-model="listQuery.othersAttention">
        </el-input>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('btn.search')}}</el-button> -->
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
        <el-table-column align="center" :label="$t('table.id')" prop="id" width="55">
        </el-table-column>
        <el-table-column align="center" label="签发人" prop="createUserName">
        </el-table-column>
        <el-table-column align="center" label="任务单状态" prop="nextApprovalPeopleType">
        </el-table-column>
        <el-table-column align="center" label="当前进度">
          <template slot-scope="scope">
            <span>{{scope.row.taskFlag | setStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="下一审批人" prop="nextReceivePeopleName">
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createDate">
        </el-table-column>
        <el-table-column align="center" :label="$t('table.operation')" width="200">
          <template slot-scope="scope">
            <div class="operation-btns">
              <i class="el-icon-edit-outline" @click="handleView(scope.row)"></i>
              <i class="el-icon-delete" v-if="!disableEdit" @click="handleDelete({ id: scope.row.id })"></i>
            </div>
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
        :title="$t('btn.add')"
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="640px"
      >
        <el-form :rules="rules" ref="dialogForm" :model="task" label-position="right" label-width="120px" style='margin: 0 50px;'>
          <el-form-item label="签收人" prop="receiveUserId">
            <el-select
              v-model="task.receiveUserId"
              placeholder="签收人"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.realName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指派人员" prop="workPeopleNameList">
            <el-select v-model="task.workPeopleNameList" multiple placeholder="指派人员">
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.realName"
                :value="`${item.id}`">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班组名称" prop="teamName">
            <el-input v-model="task.teamName"></el-input>
          </el-form-item>
          <el-form-item label="施工内容" prop="taskContent">
            <el-input v-model="task.taskContent"></el-input>
          </el-form-item>
          <el-form-item label="完成期限" prop="finishedDate">
            <el-date-picker
              v-model="task.finishedDate"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="奖惩内容" prop="rewards">
            <el-input v-model="task.rewards"></el-input>
          </el-form-item>
          <el-form-item label="交底内容" prop="detailContent">
            <el-input v-model="task.detailContent"></el-input>
          </el-form-item>
          <el-form-item :label="$t('btn.file')" prop="files">
            <input type="file" @change="handleUpload" multiple />
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>

      <el-dialog
        v-if="stepTask"
        title="施工任务单详情"
        :visible.sync="dialogStepsVisible"
        width="640px"
      >
        <div slot="title" style="font-weight: bolder">
          施工任务单详情
        </div>
        <el-form label-width="100px" class="task-step">
          <el-form-item label="任务单编号：">{{ stepTask.id }}</el-form-item>
          <el-form-item label="签发日期：">{{ stepTask.createDate }}</el-form-item>
          <el-form-item label="签发人：">{{ stepTask.createUserName }}</el-form-item>
          <el-form-item label="签收人：">{{ stepTask.receiveUserName }}</el-form-item>
          <el-form-item label="指派人员：">{{ stepTask.workPeopleNameList }}</el-form-item>
          <el-form-item label="施工部位：">{{ stepTask.taskContent }}</el-form-item>
          <el-form-item label="限定时间：">{{ stepTask.finishedDate }}</el-form-item>
          <el-form-item label="奖惩办法：">{{ stepTask.rewards }}</el-form-item>
          <el-form-item label="交底内容：">{{ stepTask.detailContent }}</el-form-item>
        </el-form>

        <div class="task-line"></div>

        <div class="flex-sb">
          <div style="margin-top: 20px; font-weight: bolder">
            任务单状态
          </div>
          <el-button type="text" v-if="stepTask.nextReceivePeopleName === userInfo.realName" @click="dialogAddNoteVisible = true">操作</el-button>
        </div>
        <div :style="`margin-top: 20px; height: ${ stepList.length * 80 }px`">
          <el-steps direction="vertical" :active="stepList.length - 1">
            <el-step v-for="(item, i) in stepList" :key="i" :title="`步骤${i + 1}`">
              <div slot="description">
                <div>{{ item.name }}: ({{ item.type }})</div>
                <div>{{ item.idea }}: {{ item.note }}</div>
              </div>
            </el-step>
          </el-steps>
        </div>
      </el-dialog>

      <el-dialog
        v-if="stepTask"
        title="施工任务单详情"
        :visible.sync="dialogAddNoteVisible"
        width="360px"
        @close="resetNoteForm"
      >
        <div slot="title" style="font-weight: bolder">
          操作
        </div>
        <el-form :rules="noteRules" ref="dialogNoteForm" :model="note" label-position="top">
          <el-form-item label="验收是否合格：" prop="approvalPeopleIdeaList">
            <el-select
              v-model="note.approvalPeopleIdeaList"
              placeholder="验收是否合格"
            >
              <el-option label="同意" value="同意">
              </el-option>
              <el-option label="不同意" value="不同意">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下一步骤" prop="nextApprovalPeopleType">
            <el-select
              v-model="note.nextApprovalPeopleType"
              placeholder="下一步骤"
            >
              <el-option
                v-for="(item, i) in stepTaskType"
                :key="i"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="传至人员" prop="nextReceivePeopleId">
            <el-select
              v-model="note.nextReceivePeopleId"
              placeholder="传至人员"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.realName"
                :value="item.realName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="意见：" prop="approvalPeopleNoteList">
            <el-input type="textarea" v-model="note.approvalPeopleNoteList"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogAddNoteVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" @click="handleSaveNote">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>
      <!-- /dialog -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getConstructionTaskList, addConstructionTask, deleteConstructionTask, updateConstructionTask } from '@/api/task';
import { getUserList } from '@/api/user';
import { stepTaskType } from '@/filters';

export default {
  name: 'TaskList',
  data() {
    const { params: { id } } = this.$route;
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        projectId: id,
        // othersAttention: '',
      },
      task: {
        projectId: id,
        receiveUserId: null,
        teamName: '',
        taskContent: '',
        finishedDate: '',
        rewards: '',
        detailContent: '',
        files: null,
        workPeopleNameList: [],
      },
      note: {
        nextApprovalPeopleType: '',
        nextReceivePeopleId: '',
        projectId: id,
        approvalPeopleNoteList: '',
        approvalPeopleIdeaList: '',
      },
      stepTask: null,
      stepList: [],
      listLoading: false,
      list: null,
      userList: [],
      stepTaskType,
      // page
      totalNumber: 0,
      totalPage: 1,
      // dialog
      dialogFormVisible: false,
      dialogStepsVisible: false,
      dialogAddNoteVisible: false,
      // multi select
      multipleSelection: [],
      // rules
      rules: {
        receiveUserId: [{ required: true, message: `签收人${this.$t('message.notEmpty')}`, trigger: 'change' }],
        teamName: [{ required: true, message: `班组名称${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        taskContent: [{ required: true, message: `施工内容${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        finishedDate: [{ required: true, message: `完成期限${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        rewards: [{ required: true, message: `奖惩内容${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        detailContent: [{ required: true, message: `交底内容${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        workPeopleNameList: [{ required: true, message: `交底内容${this.$t('message.notEmpty')}`, trigger: 'change' }],
      },
      noteRules: {
        approvalPeopleIdeaList: [{ required: true, message: `意见${this.$t('message.notEmpty')}`, trigger: 'change' }],
        nextApprovalPeopleType: [{ required: true, message: `下一步骤${this.$t('message.notEmpty')}`, trigger: 'change' }],
        nextReceivePeopleId: [{ required: true, message: `传至人员${this.$t('message.notEmpty')}`, trigger: 'change' }],
        approvalPeopleNoteList: [{ required: true, message: `意见${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  created() {
    this.getList();

    getUserList({
      pageIndex: -1,
    }).then((res) => {
      const { data } = res;
      this.userList = data;
    });
  },
  methods: {
    getList() {
      this.listLoading = true;

      getConstructionTaskList(this.listQuery).then((res) => {
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
    handleAdd() {
      this.dialogFormVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDeleteSelects() {
      const list = [];
      this.multipleSelection.forEach((user) => {
        list.push(user.id);
      });

      this.handleDelete({
        id: list.join(','),
      });
    },
    handleDelete(params) {
      this.$confirm(this.$t('message.deleteLog'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        deleteConstructionTask(params).then(() => {
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
    handleUpload(e) {
      const files = e.target.files;

      this.task.files = files;
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.task.workPeopleNameList = this.task.workPeopleNameList.join(',');
          addConstructionTask(this.task).then(() => {
            this.dialogFormVisible = false;
            this.getList();
          });
        }
      });
    },
    resetForm() {
      const { params: { id } } = this.$route;
      this.task = {
        projectId: id,
        receiveUserId: null,
        teamName: '',
        taskContent: '',
        finishedDate: '',
        rewards: '',
        detailContent: '',
        files: null,
      };

      this.$refs.dialogForm.resetFields();
      this.$refs.dialogForm.$el.reset();
    },
    handleView(task) {
      const { id } = task;
      this.stepTask = task;

      getConstructionTaskList({ id }).then((res) => {
        const { data } = res;
        let stepList = [];

        if (data.length >= 0) {
          const { approvalDateList, approvalPeopleIdeaList, approvalPeopleNameList, approvalPeopleNoteList, approvalPeopleTypeList } = data[0];
          stepList = new Array(approvalDateList.length).fill({});

          approvalDateList.forEach((item, i) => {
            stepList[i].date = item;
          });

          approvalPeopleIdeaList.forEach((item, i) => {
            stepList[i].idea = item;
          });

          approvalPeopleNameList.forEach((item, i) => {
            stepList[i].name = item;
          });

          approvalPeopleNoteList.forEach((item, i) => {
            stepList[i].note = item;
          });

          approvalPeopleTypeList.forEach((item, i) => {
            stepList[i].type = item;
          });
        }

        this.stepList = stepList;
        this.dialogStepsVisible = true;
      });
    },
    handleSaveNote() {
      this.$refs.dialogNoteForm.validate((valid) => {
        if (valid) {
          this.note.id = this.stepTask.id;
          updateConstructionTask(this.note).then(() => {
            this.handleView(this.stepTask, this.stepTask.id);
            this.getList();
            this.dialogAddNoteVisible = false;
          });
        }
      });
    },
    resetNoteForm() {
      this.$refs.dialogNoteForm.resetFields();
      this.$refs.dialogNoteForm.$el.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
  .task-page {
    .task-step {
      .el-form-item {
        margin-bottom: 0px;
      }
    }
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app-container {
  padding-top: 32px;
}

.task-line {
  border: 1px dashed #DCDFE6;
}
</style>
