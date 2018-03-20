<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-select
        v-model="listQuery.projectId"
        :placeholder="$t('project.name')"
        @change="handleProjectChange"
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
        v-model="listQuery.name"
        :placeholder="$t('item.typeName')"
        @change="handleFilter"
        class="filter-item"
      >
        <el-option
          v-for="(item, i) in ductTypeList"
          :key="i"
          :label="item"
          :value="i === 0 ? null : item"
        >
        </el-option>
      </el-select>
      <el-select
        v-model="listQuery.state"
        :placeholder="$t('item.state')"
        @change="handleFilter"
        class="filter-item"
      >
        <el-option
          v-for="(item, i) in ductStateList"
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
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('message.keyword')" v-model="listQuery.content">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('btn.search')}}</el-button>
      <a v-if="expotDuctLink" :href="expotDuctLink" target="_blank">
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
          <el-table-column align="center" :label="$t('item.state')" width="120">
            <template slot-scope="scope">
              <el-tag>{{ scope.row.state }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('item.name')" prop="name">
          </el-table-column>
          <el-table-column align="center" :label="$t('item.date')" prop="date">
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
        <div id="g2-chart">
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DataSet from '@antv/data-set';
import { getDuctStatusSum, getDuctList, expotDuct } from '@/api/item';
import { getProjectList } from '@/api/projectManage';
import { ductTypeList, ductStateList } from '@/filters';
import G2 from '@antv/g2';

export default {
  name: 'PrefabricationManage',
  data() {
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        content: '',
        name: '',
        state: '',
        dateStart: null,
        dateFinished: null,
      },
      // date
      dateValue: '',
      activeName: 'first',
      listLoading: false,
      list: null,
      projectList: [],
      expotDuctLink: '',
      // chart
      chartData: null,
      // filters
      ductTypeList,
      ductStateList,
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
  },
  mounted() {
    this.refreshChart();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getDuctList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
      });
    },
    refreshChart() {
      getDuctStatusSum().then((res) => {
        const { data } = res;
        this.chartData = data;
        this.drawChart();
      });
    },
    drawChart() {
      // const data = this.chartData || [];
      // const result = {};
      // // filter data
      // data.forEach((item) => {
      //   if (!result[item.month]) {
      //     result[item.month] = [];
      //   }

      //   result[item.month].push(item);
      // });

      // const resultList = [];
      // Object.keys(result).forEach((key) => {
      //   const list = result[key];
      //   let count = 0;

      //   list.forEach((item) => {
      //     count += item.sumDate;
      //   });

      //   resultList.push({
      //     month: key,
      //     count,
      //     list,
      //   });
      // });
      if (!this.chart) {
        const data = this.chartData || [];
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
          type: 'sort',
          callback(a, b) {
            const d1 = new Date(a.month);
            const d2 = new Date(b.month);
            return (d1.getTime() - d2.getTime());
          }
        }).transform({
          type: 'aggregate',
          fields: [ 'sumDate' ],
          operations: ['sum'],
          groupBy: ['month'],
          as: ['count'],
        });

        const chart = new G2.Chart({
          container: 'g2-chart',
          forceFit: true,
          height: 560,
        });
        chart.source(dv);
        chart.tooltip({
          crosshairs: {
            type: 'line',
          }
        });
        chart.legend('部门', {
        selectedMode: 'single',
        position: 'right',
        hoverable: false
      });
        console.log('data', data);
        console.log('dv.rows', dv.rows);
        // chart.axis('temperature', {
        //   label: {
        //     formatter: val => {
        //       return val + '°C';
        //     }
        //   }
        // });
        chart.line().position('month*count').color('count');
        chart.point().position('month*count').color('count').size(4).shape('circle').style({
          stroke: '#fff',
          lineWidth: 1
        });

        this.chart = chart;
      }
    },
    handleTabClick(tab, event) {
      this.$nextTick().then(() => {
        if (this.chart) {
          this.chart.forceFit();
        }
      })
    },
    handleFilter() {
      this.listQuery.pageIndex = 1;
      this.getList();
    },
    handleProjectChange(val) {
      expotDuct({
        projectId: val,
      }).then((res) => {
        const { data } = res;
        this.expotDuctLink = data;

        this.handleFilter();
      }).catch(() => {
        this.expotDuctLink = '';
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
      this.listQuery.dateStart = dateArr[0];
      this.listQuery.dateFinished = dateArr[1];
      this.handleFilter();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.g2-chart {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
