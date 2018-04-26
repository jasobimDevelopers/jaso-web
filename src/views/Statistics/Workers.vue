<template>
  <div>
    <breadcrumb>
      <el-date-picker
        type="month"
        placeholder="选择月">
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
        <el-table-column align="center" label="姓名" prop="username" width="100">
        </el-table-column>
        <el-table-column align="center" label="工种" prop="type">
        </el-table-column>
        <el-table-column align="center" label="工时" prop="hours">
        </el-table-column>
        <el-table-column align="center" label="工日" prop="days">
        </el-table-column>
        <el-table-column align="center" label="日工资" prop="money">
        </el-table-column>
        <el-table-column align="center" label="工资" prop="totalMoney">
        </el-table-column>
      </el-table>
      <!-- /table -->

      <el-button type="text" icon="el-icon-download" style="margin-top: 8px">导出用工统计表</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Workers',
  data() {
    const { params: { id } } = this.$route;

    return {
      listQuery: {
        pageIndex: -1,
        projectId: id,
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

      setTimeout(() => {
        this.list = [
          {
            username: '张三',
            type: '工种',
            hours: 300,
            days: 20,
            money: 200,
            totalMoney: 6000,
          },
        ];
        this.listLoading = false;
      }, 3e3);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
