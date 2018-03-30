<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">{{$t('btn.add')}}</el-button>
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
      <el-form :rules="rules" ref="dialogForm" :model="log" label-position="left" label-width="120px" style='margin: 0 50px;'>
        <el-form-item label="施工日志内容" prop="content">
          <el-input v-model="log.content"></el-input>
        </el-form-item>
        <el-form-item label="天气" prop="weather">
          <el-input v-model="log.weather"></el-input>
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
    <!-- /dialog -->

  </div>
</template>

<script>
import { getConstructionLogList, deleteConstructionLog, addConstructionLog } from '@/api/log';

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
      listLoading: false,
      list: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      // dialog
      dialogFormVisible: false,
      // file list
      fileList: [],
      // multi select
      multipleSelection: [],
      // rules
      rules: {
        content: [{ required: true, message: `施工日志内容${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        constructionDate: [{ required: true, message: `施工时间${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        weather: [{ required: true, message: `施工天气${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getConstructionLogList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
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
      this.dialogFormVisible = true;
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
</style>
