<template>
  <div>
    <breadcrumb>
    </breadcrumb>

    <div class="app-container">
      <div class="list-wrapper">
        <moment
          v-for="item in list"
          :key="item.id"
          :moment="item"
          :type="0"
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
    </div>
  </div>
</template>

<script>
import { getQualityList } from '@/api/quality';
import Moment from './components/Moment';

export default {
  name: 'QualityList',
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
      },
      // page
      totalNumber: 0,
      totalPage: 1,
      // list
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getQualityList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
