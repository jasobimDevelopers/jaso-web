<template>
  <div>
    <!-- filter -->
    <div class="filter-container">
      <div class="filter-wrapper">
        <el-form ref="filterForm" label-position="left" label-width="100px">
          <el-form-item :label="$t('video.professionType')">
            <el-radio
              v-model="listQuery.professionType"
              v-for="(item, i) in teachTypeList"
              :key="i"
              :label="i === 0 ? null : (i - 1)"
              @change="handleFilter"
            >{{item}}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('item.buildingNum')">
            <el-radio
              v-model="listQuery.buildingNum"
              :label="null"
              @change="handleFilter"
            >{{$t('table.all')}}</el-radio>
            <el-select
              v-model="listQuery.buildingNum"
              v-if="building"
              :placeholder="$t('item.buildingNum')"
              @change="handleFilter"
            >
              <el-option
                v-for="(item, i) in building.buildingList"
                :key="i"
                :label="`#${item}`"
                :value="item">
              </el-option>
            </el-select>
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
        <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">{{$t('btn.add')}}</el-button>
      </div>
    </div>
    <!-- /pagination -->

    <!-- dialog -->
    <el-dialog
      :title="$t('btn.upload')"
      :visible.sync="dialogFormVisible"
      @close="resetForm"
      width="640px"
    >
      <el-form :rules="rules" ref="dialogForm" :model="video" label-position="left" label-width="120px" style='margin: 0 50px;'>
        <el-form-item :label="$t('video.professionType')" prop="professionType">
          <el-select
            v-model="video.professionType"
            :placeholder="$t('video.professionType')"
          >
            <el-option
              v-for="(item, i) in teachTypeList"
              v-if="i !== 0"
              :key="i"
              :label="item"
              :value="i - 1">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('video.videoGrade')" prop="videoGrade">
          <el-select
            v-model="video.videoGrade"
            :placeholder="$t('video.videoGrade')"
          >
            <el-option
              v-for="(item, i) in videoGradeList"
              v-if="i !== 0"
              :key="i"
              :label="item"
              :value="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('video.videoType')" prop="videoType">
          <el-select
            v-model="video.videoType"
            :placeholder="$t('video.videoType')"
          >
            <el-option
              v-for="(item, i) in videoTypes"
              :key="i"
              :label="item"
              :value="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('btn.file')" prop="file">
          <input type="file" @change="handleUpload" multiple :accept="video.videoType === 0 ? '.mp4,.avi' : (video.videoType === 1 ? '.pdf' : '.doc,.docx')" />
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
import { mapGetters } from 'vuex';
import { getItemByBuidlingInfo } from '@/api/item';
import { getVideoList, deleteVideo, addVideo } from '@/api/video';
import { teachTypeList, videoTypes, videoGradeList, parseBuildingArr } from '@/filters';

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
        buildingNum: null,
      },
      video: {
        videoGrade: null,
        professionType: null,
        videoType: null,
        file: null,
      },
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
        professionType: [{ required: true, message: `${this.$t('video.professionType')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        videoGrade: [{ required: true, message: `${this.$t('video.videoGrade')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        videoType: [{ required: true, message: `${this.$t('video.videoType')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
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
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          addVideo({
            ...this.video,
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
</style>
