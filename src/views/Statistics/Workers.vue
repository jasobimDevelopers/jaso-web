<template>
  <div>
    <breadcrumb>
      <el-date-picker
        v-model="listQuery.date"
        type="month"
        value-format="yyyy-MM"
        placeholder="选择月"
        :clearable="false"
        @change="getList"
      >
      </el-date-picker>
    </breadcrumb>

    <div class="app-container">
      <!-- table -->
      <el-table
        :data="list"
        v-loading="listLoading"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="姓名" prop="userName" width="100">
        </el-table-column>
        <el-table-column align="center" label="工种" prop="workName">
        </el-table-column>
        <el-table-column align="center" label="工时" prop="hourNum">
        </el-table-column>
        <el-table-column align="center" label="工日" prop="dayNum">
        </el-table-column>
        <el-table-column align="center" label="日工资" prop="daySalary">
        </el-table-column>
        <el-table-column align="center" label="工资" prop="salaryNum">
        </el-table-column>
      </el-table>
      <!-- /table -->

      <el-button type="text" icon="el-icon-download" style="margin-top: 8px" @click="handleExport">导出用工统计表</el-button>
    </div>
  </div>
</template>

<script>
import { zeroFull } from '@/utils/utils';
import { setFileRoot } from '@/filters';
import { getMechanicPriceNum, exportMechanicNum } from '@/api/mechanic';

export default {
  name: 'Workers',
  data() {
    const { params: { id } } = this.$route;
    const now = new Date();
    const date = `${now.getFullYear()}-${zeroFull(now.getMonth() + 1)}`;

    return {
      listQuery: {
        pageIndex: -1,
        projectId: id,
        date,
      },
      listLoading: false,
      list: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      const params = {
        ...this.listQuery,
        date: `${this.listQuery.date}-01`,
      };

      getMechanicPriceNum(params).then((res) => {
        const { data } = res;
        this.list = data;
        this.listLoading = false;
      });
    },
    handleExport() {
      const { projectId, date } = this.listQuery;
      const dateStr = `${date}-01`;
      exportMechanicNum({
        projectId,
        date: dateStr,
      }).then((res) => {
        const { data } = res;
        const url = setFileRoot(data);
        window.open(url, '_blank');
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
