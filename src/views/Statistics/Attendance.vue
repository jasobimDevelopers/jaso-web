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
        <el-table-column align="center" label="出勤天数" prop="p1">
        </el-table-column>
        <el-table-column align="center" label="迟到" prop="p2">
        </el-table-column>
        <el-table-column align="center" label="早退" prop="p3">
        </el-table-column>
        <el-table-column align="center" label="忘打卡" prop="p4">
        </el-table-column>
        <el-table-column align="center" label="缺勤" prop="p5">
        </el-table-column>
      </el-table>
      <!-- /table -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Attendance',
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
            username: '王莉莉',
            p1: 25,
            p2: 1,
            p3: 2,
            p4: 1,
            p5: 1,
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
