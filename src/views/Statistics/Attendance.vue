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
        <el-table-column align="center" label="出勤天数" prop="workDays">
        </el-table-column>
        <el-table-column align="center" label="迟到" prop="lateNum">
        </el-table-column>
        <el-table-column align="center" label="早退" prop="leaveEarlyNum">
        </el-table-column>
        <el-table-column align="center" label="忘打卡" prop="forgetClockNum">
        </el-table-column>
        <el-table-column align="center" label="缺勤" prop="notWorkNum">
        </el-table-column>
      </el-table>
      <!-- /table -->
    </div>
  </div>
</template>

<script>
import { zeroFull } from '@/utils/utils';
import { getAttenceLogList } from '@/api/attendance';

export default {
  name: 'Attendance',
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
      const { projectId, date } = this.listQuery;
      const dateArr = date.split('-');

      getAttenceLogList({
        projectId,
        year: dateArr[0],
        month: dateArr[1],
      }).then((res) => {
        const { data } = res;
        this.list = data;
        this.listLoading = false;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
