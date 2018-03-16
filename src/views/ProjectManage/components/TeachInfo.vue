<template>
  <div>
    <!-- filter -->
    <div class="filter-container">
      <div class="filter-wrapper">
        <el-form ref="filterForm" label-position="left" label-width="100px">
          <el-form-item :label="$t('vedio.professionType')">
            <el-radio
              v-model="listQuery.professionType"
              v-for="(item, i) in teachTypeList"
              :key="i"
              :label="i === 0 ? null : (i - 1)"
              @change="handleFilter"
            >{{item}}</el-radio>
          </el-form-item>
        </el-form>
      </div>
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
    >
      <el-table-column align="center" :label="$t('table.id')" prop="id">
      </el-table-column>
      <el-table-column align="center" :label="$t('vedio.originName')" prop="originName">
      </el-table-column>
      <el-table-column align="center" :label="$t('vedio.buildingNum')" prop="buildingNum">
      </el-table-column>
      <el-table-column align="center" :label="$t('vedio.professionType')">
        <template slot-scope="scope">
          <span>{{teachTypeList[scope.row.professionType]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.operation')" width="200">
        <template slot-scope="scope">
          <a :href="scope.row.url" target="_blank" :download="scope.row.originName">
            <el-button type="primary" size="mini" icon="el-icon-download">{{$t('btn.download')}}</el-button>
          </a>
          <el-button type="danger" size="mini">{{$t('btn.delete')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /table -->

    <!-- pagination -->
    <div class="pagination-container">
      <div class="flex-sb">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listQuery.pageIndex"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="listQuery.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNumber">
        </el-pagination>
        <el-button class="filter-item" type="primary" icon="el-icon-plus">{{$t('btn.add')}}</el-button>
      </div>
    </div>
    <!-- /pagination -->
  </div>
</template>

<script>
import { getVideoList, deleteVideo } from '@/api/video';
import { teachTypeList } from '@/filters';

export default {
  name: 'TechInfo',
  data() {
    const { params: { id } } = this.$route;
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        projectId: id,
        professionType: null,
      },
      listLoading: false,
      list: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      // filters
      teachTypeList,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getVideoList(this.listQuery).then((res) => {
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
    handleDelete(id, fileId) {
      this.$confirm(this.$t('message.deleteQuestion'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete
        deleteVideo({
          id,
          fileid: fileId,
        }).then(() => {
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
