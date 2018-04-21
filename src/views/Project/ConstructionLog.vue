<template>
  <div>
    <breadcrumb></breadcrumb>
    <div class="app-container">
      <!-- filter -->
      <div class="filter-container flex-end">
        <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">{{$t('btn.add')}}</el-button>
      </div>
      <!-- /filter -->

      <!-- table -->
      <!-- <el-table
        :data="list"
        v-loading="listLoading"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" :label="$t('table.id')" prop="id" width="50">
        </el-table-column>
        <el-table-column align="center" label="施工日志内容" prop="content">
        </el-table-column>
        <el-table-column align="center" label="施工时间" prop="constructionDate">
        </el-table-column>
        <el-table-column align="center" label="天气" prop="weather">
        </el-table-column>
        <el-table-column align="center" :label="$t('table.operation')" width="200">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleDelete({ id: scope.row.id })">{{$t('btn.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table> -->
      <!-- /table -->

      <div v-if="list && list.length > 0" class="log-list">
        <div class="log-wrapper hover-cursor flex" @click="handleTable(item)" v-for="(item, i) in list" :key="i">
          <div class="date-info flex-column-center">
            <span class="day">{{ item.day }}</span>
            <span class="month">{{ `${item.year}.${item.month + 1}` }}</span>
            <section class="week">{{ item.week | setWeekInfo }}</section>
            <section class="weather flex-row">
              <svg-icon :icon-class="`天气-${item.weather}`" size="18"></svg-icon>
              <div>{{ item.weather }}</div>
            </section>
          </div>
          <div class="logs">
            <div class="log-item" v-for="log in item.list" :key="log.id">
              <section class="content">{{ log.content }}</section>
              <section class="user-info">
                <span class="username">{{ log.createUserName }}</span>
                <span class="date">{{ `创建于${log.createUserName}` }}</span>
              </section>
            </div>
          </div>
        </div>
      </div>

      <empty-card v-else>暂无日志</empty-card>

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
        :title="actionStatus === 'add' ?  $t('btn.add') : $t('btn.edit')"
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="640px"
      >
        <el-form :rules="rules" ref="dialogForm" :model="log" label-position="right" label-width="120px" style='margin: 0 50px;'>
          <el-form-item label="施工日志内容" prop="content">
            <el-input type="textarea" v-model="log.content"></el-input>
          </el-form-item>
          <el-form-item label="天气" prop="weather">
            <el-select v-model="log.weather" placeholder="请选择">
              <el-option
                v-for="(item, i) in weatherList"
                :key="i"
                :label="item"
                :value="item">
                <span style="float: left">
                  <svg-icon :icon-class="`天气-${item}`" size="18"></svg-icon>
                </span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="施工时间" prop="constructionDate">
            <el-date-picker
              v-model="log.constructionDate"
              type="date"
              placeholder="选择日期"
              class="filter-item"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
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
        :visible.sync="dialogTableVisible"
        width="880px"
      >
        <div slot="title">
          <div class="log-title flex-row" v-if="logTable">
            <span>施工日志详情</span>
            <section class="date">{{ `${logTable.year}.${logTable.month + 1}.${logTable.day}` }}</section>
            <section class="week">{{ logTable.week | setWeekInfo }}</section>
            <section class="weather flex-row">
              <svg-icon :icon-class="`天气-${logTable.weather}`" size="18"></svg-icon>
              <div>{{ logTable.weather }}</div>
            </section>
          </div>
        </div>
        <!-- table -->
        <el-table
          v-if="logTable"
          :data="logTable.list"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column align="center" :label="$t('table.id')" prop="id" width="50">
          </el-table-column>
          <el-table-column align="center" label="施工日志内容" prop="content" width="360">
          </el-table-column>
          <el-table-column align="center" label="施工时间" prop="constructionDate" width="120">
          </el-table-column>
          <el-table-column align="center" label="天气" prop="weather">
          </el-table-column>
          <el-table-column align="center" :label="$t('table.operation')" width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{$t('btn.edit')}}</el-button>
              <el-button type="danger" size="mini" @click="handleDelete({ id: scope.row.id })">{{$t('btn.delete')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- /table -->
      </el-dialog>
      <!-- /dialog -->

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getConstructionLogList, deleteConstructionLog, addConstructionLog } from '@/api/log';
import { weatherList } from '@/filters';

export default {
  name: 'ConstructionLog',
  data() {
    const { params: { id } } = this.$route;
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        projectId: id,
      },
      log: {
        files: null,
        projectId: id,
        content: '',
        constructionDate: null,
        weather: '',
      },
      logTable: null,
      listLoading: false,
      list: null,
      // action status: add / edit
      actionStatus: 'add',
      // page
      totalNumber: 0,
      totalPage: 1,
      // dialog
      dialogFormVisible: false,
      dialogTableVisible: false,
      // file list
      fileList: [],
      // multi select
      multipleSelection: [],
      // weatherList
      weatherList,
      // rules
      rules: {
        content: [{ required: true, message: `施工日志内容${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        constructionDate: [{ required: true, message: `施工时间${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        weather: [{ required: true, message: `施工天气${this.$t('message.notEmpty')}`, trigger: 'blur' }],
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
  },
  methods: {
    handleSortList(list) {
      const dayList = [];
      const sortedList = [];
      list = list || [];

      list.forEach((item) => {
        const date = new Date(item.createDate);
        const day = date.getDate();
        const year = date.getFullYear();
        const week = date.getDay();
        const month = date.getMonth();

        if (dayList.findIndex(y => y === day) === -1) {
          dayList.push(day);
          sortedList.push({
            day,
            list: [],
          });
        }

        sortedList.forEach((sortedObj) => {
          sortedObj.year = year;
          sortedObj.week = week;
          sortedObj.month = month;
          sortedObj.weather = item.weather;

          if (sortedObj.day === day) {
            sortedObj.list.push(item);
          }
        });
      });

      return sortedList;
    },
    getList() {
      this.listLoading = true;

      getConstructionLogList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = this.handleSortList(data);
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
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
    handleAdd() {
      this.actionStatus = 'add';
      this.dialogFormVisible = true;
    },
    handleUpdate(log) {
      this.log = log;
      this.actionStatus = 'edit';
      this.dialogFormVisible = true;
    },
    handleDeleteTableItem(id) {
      const list = this.logTable.list || [];
      const newList = list.filter(log => log.id !== id);

      this.logTable.list = newList;
    },
    handleDelete(params) {
      this.$confirm(this.$t('message.deleteLog'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        deleteConstructionLog(params).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.deleteOk'),
          });

          this.getList();
          this.handleDeleteTableItem(params.id);
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

      this.log.files = files;
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          addConstructionLog(this.log).then(() => {
            this.dialogFormVisible = false;
            this.getList();
          });
        }
      });
    },
    handleTable(item) {
      this.logTable = item;
      this.dialogTableVisible = true;
      console.log('item', item);
    },
    resetForm() {
      const { params: { id } } = this.$route;
      this.log = {
        files: null,
        projectId: id,
        content: '',
        constructionDate: null,
        weather: '',
      };

      this.$refs.dialogForm.resetFields();
      this.$refs.dialogForm.$el.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.log-list {
  .log-wrapper {
    margin-top: 20px;
    border-bottom: 1px solid #EBEEF5;

    .date-info {
      .day {
        font-size: 36px;
      }

      .month {
        margin-top: 8px;
        font-size: 12px;
      }

      .week {
        margin-top: 8px;
        padding: 4px;
        font-size: 12px;
        color: #ffffff;
        text-align: center;
        background-color: #409EFF;
        border-radius: 2px;
      }

      .weather {
        margin-top: 8px;
        font-size: 14px;
        color: #888888;

        .svg-icon {
          margin-right: 4px;
        }
      }
    }

    .logs {
      flex: 1;
    }

    .log-item {
      margin-left: 32px;
      margin-bottom: 15px;

      .content {
        padding: 16px 20px;
        background-color: #F2F6FC;
      }

      .user-info {
        padding: 16px 20px;
        margin-top: 2px;
        font-size: 14px;
        color: #606266;
        background-color: #EBEEF5;

        .username {
          margin-right: 8px;
          color: #409EFF;
        }
      }
    }
  }
}

.log-title {
  .date, .week, .weather {
    font-size: 14px;
    margin-left: 15px;
  }
}
</style>
