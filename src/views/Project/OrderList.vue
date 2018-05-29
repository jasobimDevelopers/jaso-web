<template>
  <div>
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
        <el-table-column align="center" label="项目负责人" prop="leader">
        </el-table-column>
        <el-table-column align="center" label="施工部位" prop="constructPart" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column align="center" label="下一审批人" prop="nextReceivePeopleId">
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status | setStatus}}</span>
          </template>
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
          <el-form-item label="下一审批人" prop="nextReceivePeopleId">
            <el-select
              v-model="task.nextReceivePeopleId"
              placeholder="下一审批人"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.realName"
                :value="item.realName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="月份" prop="month">
            <el-select
              v-model="task.month"
              placeholder="月份"
            >
              <el-option
                v-for="(item, i) in monthList"
                :key="i"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目负责人" prop="leader">
            <el-input v-model="task.leader" placeholder="项目负责人"></el-input>
          </el-form-item>
          <el-form-item label="施工部位" prop="constructPart">
            <el-input v-model="task.constructPart"  placeholder="施工部位"></el-input>
          </el-form-item>
          <el-form-item label="工程量" prop="quantityDes">
            <el-input v-model="task.quantityDes"  placeholder="工程量"></el-input>
          </el-form-item>
          <el-form-item label="现场图片" prop="contentFiles">
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
          单详情
        </div>
        <el-form label-width="100px" class="task-step">
          <el-form-item label="任务单编号：">{{ stepTask.id }}</el-form-item>
          <el-form-item label="签发日期：">{{ stepTask.createDate }}</el-form-item>
          <el-form-item label="项目负责人：">{{ stepTask.leader }}</el-form-item>
          <el-form-item label="签发人：">{{ stepTask.createUserName }}</el-form-item>
          <el-form-item label="签收人：">{{ stepTask.nextReceivePeopleId }}</el-form-item>
          <el-form-item label="施工部位：">{{ stepTask.constructPart }}</el-form-item>
          <el-form-item label="月份：">{{ stepTask.month }}</el-form-item>
          <el-form-item label="工程量：">{{ stepTask.quantityDes }}</el-form-item>
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
import { getAdvancedOrderList, addAdvancedOrder, deleteAdvancedOrder, updateAdvancedOrder } from '@/api/order';
import { getUserList } from '@/api/user';
import { stepTaskType } from '@/filters';

export default {
  name: 'OrderList',
  data() {
    const { params: { id } } = this.$route;
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        projectId: id,
        othersAttention: '',
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
      monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
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
        nextReceivePeopleId: [{ required: true, message: `下一审批人${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        month: [{ required: true, message: `月份${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        leader: [{ required: true, message: `负责人${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        constructPart: [{ required: true, message: `施工部位${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        quantityDes: [{ required: true, message: `工程量${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        detailContent: [{ required: true, message: `交底内容${this.$t('message.notEmpty')}`, trigger: 'blur' }],
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

      getAdvancedOrderList(this.listQuery).then((res) => {
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
        deleteAdvancedOrder(params).then(() => {
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
          addAdvancedOrder(this.task).then(() => {
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

      getAdvancedOrderList({ id }).then((res) => {
        const { data } = res;
        let stepList = [];

        if (data.length >= 0 && data.approvalDateList) {
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
          updateAdvancedOrder(this.note).then(() => {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app-container {
  padding-top: 32px;
}
</style>
