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
        v-model="listQuery.projectPart"
        :placeholder="$t('log.projectPart')"
        @change="handleFilter"
        class="filter-item"
      >
        <el-option
          v-for="(item, i) in projectPartList"
          :key="i"
          :label="item"
          :value="i === 0 ? null : (i - 1)"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="listQuery.systemType"
        :placeholder="$t('log.systemType')"
        @change="handleFilter"
        class="filter-item"
      >
        <el-option
          v-for="(item, i) in phoneSystemList"
          :key="i"
          :label="item"
          :value="i === 0 ? null : (i - 1)"
        >
        </el-option>
      </el-select>
      <el-date-picker
        v-model="dateValue"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="filter-item"
        value-format="yyyy-MM-dd HH:mm:ss"
        @change="handleDateChange"
      >
      </el-date-picker>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('message.keyword')" v-model="listQuery.searchContent">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('btn.search')}}</el-button>
      <a v-if="exportLogLink" :href="exportLogLink | setFileRoot" target="_blank">
        <el-button class="filter-item" type="success" icon="el-icon-download">{{$t('btn.export')}}</el-button>
      </a>
    </div>
    <!-- /filter -->

    <el-tabs v-model="activeName" type="card" @tab-click="handleTabClick">
      <el-tab-pane :label="$t('table.list')" name="first">
        <!-- table -->
        <el-table
          :data="list"
          v-loading="listLoading"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column align="center" :label="$t('table.id')" prop="id" width="100">
          </el-table-column>
          <el-table-column align="center" :label="$t('log.userName')" prop="userName">
          </el-table-column>
          <el-table-column align="center" :label="$t('log.projectName')" prop="projectName">
          </el-table-column>
          <el-table-column align="center" :label="$t('log.projectPart')" prop="projectPart">
          </el-table-column>
          <el-table-column align="center" :label="$t('log.actionDate')" prop="actionDate">
          </el-table-column>
          <el-table-column align="center" :label="$t('log.systemType')" prop="systemType">
          </el-table-column>
          <el-table-column align="center" :label="$t('log.fileName')" prop="fileName">
          </el-table-column>
          <el-table-column align="center" :label="$t('log.version')" prop="version">
          </el-table-column>
          <el-table-column align="center" :label="$t('table.operation')" width="200">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleDelete({ userLogId: scope.row.id })">{{$t('btn.delete')}}</el-button>
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
      </el-tab-pane>
      <el-tab-pane :label="$t('table.data')" name="second">
        <div id="log-chart">
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DataSet from '@antv/data-set';
import { getUserLogList, deleteUserLog, exportUserLog, getUserLogCountSum } from '@/api/log';
import { getProjectList } from '@/api/projectManage';
import { projectPartList, phoneSystemList } from '@/filters';
import G2 from '@antv/g2';

export default {
  name: 'UserRecords',
  data() {
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        searchContent: '',
        projectId: '',
        projectPart: '',
        systemType: '',
        dateStart: null,
        dateFinished: null,
      },
      // date
      dateValue: '',
      activeName: 'first',
      listLoading: false,
      list: null,
      projectList: [],
      exportLogLink: '',
      // chart
      chartData: null,
      // filters
      projectPartList,
      phoneSystemList,
      // page
      totalNumber: 0,
      totalPage: 1,
    };
  },
  created() {
    getProjectList({
      // get all project list
      pageIndex: -1,
    }).then((res) => {
      this.projectList = [
        {
          id: null,
          name: '全部',
        },
        ...res.data,
      ];

      // get user list
      this.getList();
    });

    exportUserLog().then((res) => {
      const { data } = res;
      this.exportLogLink = data;
    }).catch(() => {
      this.exportLogLink = '';
    });
  },
  methods: {
    getList() {
      this.listLoading = true;

      getUserLogList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
      });

      this.refreshChart();
    },
    refreshChart() {
      const { searchContent, projectId, projectPart, systemType, dateStart, dateFinished } = this.listQuery;
      getUserLogCountSum({
        searchContent,
        projectId,
        projectPart,
        systemType,
        dateStart,
        dateFinished,
      }).then((res) => {
        const { data } = res;
        // type change
        data.map((item) => {
          item.projectPart = parseInt(item.projectPart, 10);
          return item;
        });

        this.chartData = data;
        this.drawChart();
      });
    },
    drawChart() {
      if (!this.chart) {
        const data = this.chartData || [];
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
          type: 'sort',
          callback(a, b) {
            const d1 = new Date(a.actionDate);
            const d2 = new Date(b.actionDate);
            return (d1.getTime() - d2.getTime());
          },
        });

        const chart = new G2.Chart({
          container: 'log-chart',
          forceFit: true,
          height: 560,
        });

        const defs = {
          projectPart: {
            type: 'cat',
            values: ['模型', '图纸', '登录', '交底', '预制化', '紧急事项', '通知', '产值', '班组信息', '施工任务单区域', '预付单区域', '在线预览区域', '模型构建信息区域'],
          },
        };
        chart.source(dv, defs);
        chart.tooltip({
          crosshairs: {
            type: 'line',
          },
        });

        chart.legend({
          title: null,
        });
        chart.line().position('date*num').color('projectPart');
        chart.point().position('date*num').color('projectPart')
          .size(4)
          .shape('circle')
          .style({
            stroke: '#fff',
            lineWidth: 1,
          });
        chart.render();

        this.chart = chart;
      } else {
        const data = this.chartData || [];
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
          type: 'sort',
          callback(a, b) {
            const d1 = new Date(a.month);
            const d2 = new Date(b.month);
            return (d1.getTime() - d2.getTime());
          },
        });
        this.chart.changeData(dv);
      }
    },
    handleTabClick() {
      this.$nextTick().then(() => {
        if (this.chart) {
          this.chart.forceFit();
        }
      });
    },
    handleFilter() {
      this.listQuery.pageIndex = 1;
      this.getList();
    },
    handleProjectChange(val) {
      exportUserLog({
        projectId: val,
      }).then((res) => {
        const { data } = res;
        this.exportDuctLink = data;

        this.handleFilter();
      }).catch(() => {
        this.exportDuctLink = '';
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
    handleDateChange(dateArr) {
      if (dateArr) {
        this.listQuery.dateStart = dateArr[0];
        this.listQuery.dateFinished = dateArr[1];
      } else {
        this.listQuery.dateStart = null;
        this.listQuery.dateFinished = null;
      }
      this.handleFilter();
    },
    handleDelete(params) {
      this.$confirm(this.$t('message.deleteLog'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        deleteUserLog(params).then(() => {
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
