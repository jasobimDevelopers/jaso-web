<template>
  <div>
    <breadcrumb>
      <div>
        <el-input placeholder="请输入内容" v-model="listQuery.originName" @keyup.enter.native="getList"  style="margin-right: 12px; width: 240px">
          <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
        </el-input>
        <el-button class="filter-item" type="text" v-if="!disableEdit" :disabled="disableEdit" @click="handleAdd">上传交底</el-button>
      </div>
    </breadcrumb>

    <div class="app-container">
      <el-tabs v-model="activeGrade" type="card" @tab-click="handleTabClick">
        <el-tab-pane label="公司级交底" name="0"></el-tab-pane>
        <el-tab-pane label="项目交底" name="1"></el-tab-pane>
        <el-tab-pane label="留底资料" name="2"></el-tab-pane>
        <el-tab-pane label="通用交底" name="3"></el-tab-pane>
      </el-tabs>
      <!-- table -->
      <el-table
        :data="list"
        v-loading="listLoading"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" :label="$t('table.id')" prop="id">
        </el-table-column>
        <el-table-column align="center" :label="$t('video.originName')" prop="originName">
        </el-table-column>
        <!-- <el-table-column align="center" :label="$t('video.buildingNum')" prop="buildingNum">
        </el-table-column> -->
        <el-table-column align="center" :label="$t('video.professionType')">
          <template slot-scope="scope">
            <span>{{teachTypeList[scope.row.professionType + 1]}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('table.operation')" width="200">
          <template slot-scope="scope">
            <div class="operation-btns">
              <a :href="scope.row.url | setFileRoot" target="_blank" :download="scope.row.originName">
                <i class="el-icon-download"></i>
              </a>
              <i class="el-icon-delete" v-if="!disableEdit" @click="handleDelete(scope.row.id, scope.row.fileId)"></i>
            </div>
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
        :title="$t('btn.upload')"
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="320px"
      >
        <el-form :rules="rules" ref="dialogForm" :model="video" label-position="top">
          <el-form-item :label="$t('video.videoGrade')" prop="videoGrade">
            <el-select
              v-model="video.videoGrade"
              :placeholder="$t('video.videoGrade')"
            >
              <el-option
                v-for="(item, i) in videoGradeList"
                :key="i"
                :label="item"
                :value="i">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('btn.file')" prop="file">
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getVideoList, deleteVideo, addVideo } from '@/api/video';
import { teachTypeList, videoTypes, videoGradeList } from '@/filters';

export default {
  name: 'Paper',
  data() {
    const { params: { id } } = this.$route;
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        projectId: id,
        videoGrade: 0,
        originName: '',
      },
      video: {
        videoGrade: null,
        file: null,
      },
      activeGrade: '0',
      listLoading: false,
      list: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      // filters
      teachTypeList,
      videoTypes,
      videoGradeList,
      // dialog
      dialogFormVisible: false,
      // file list
      fileList: [],
      // rules
      rules: {
        videoGrade: [{ required: true, message: `${this.$t('video.videoGrade')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        file: [{ required: true, message: `${this.$t('btn.file')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapGetters([
      'building',
    ]),
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
    handleTabClick(tab) {
      const { name } = tab;
      this.listQuery.videoGrade = name;
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
    handleAdd() {
      this.dialogFormVisible = true;
    },
    handleUpload(e) {
      const files = e.target.files;

      this.fileList = files;
      this.video.file = files;
    },
    handleSave() {
      const { params: { id } } = this.$route;
      const { videoGrade } = this.video;
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          addVideo({
            videoGrade,
            fileList: this.fileList,
            projectId: id,
          }).then(() => {
            this.dialogFormVisible = false;
            this.getList();
          });
        }
      });
    },
    resetForm() {
      this.$refs.dialogForm.resetFields();
      this.$refs.dialogForm.$el.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .app-container {
    padding-top: 24px;
  }
</style>
