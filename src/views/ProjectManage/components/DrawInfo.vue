<template>
  <div>
    <!-- filter -->
    <div class="filter-container">
      <div class="filter-wrapper">
        <el-form ref="filterForm" label-position="right" label-width="100px">
          <el-form-item :label="$t('paper.professionType')">
            <el-radio
              v-model="listQuery.professionType"
              v-for="(item, i) in paperProfessionTypeList"
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
              @change="handleBuilding"
            >
              <el-option
                v-for="(item, i) in building.buildingList"
                :key="i"
                :label="`#${item}`"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('item.floorNum')">
            <el-radio
              v-model="listQuery.floorNum"
              :label="null"
              @change="handleFilter"
            >{{$t('table.all')}}</el-radio>
            <el-select
              v-if="building"
              v-for="(floorList, index) in floorNumArr"
              :value="floorList.indexOf(listQuery.floorNum) > -1 ? listQuery.floorNum : null"
              :key="index"
              :placeholder="$t('item.floorNum')"
              @change="handleFloor"
            >
              <el-option
                v-for="(item, i) in floorNumArr[index]"
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
      <el-table-column align="center" :label="$t('paper.originName')" prop="originName">
      </el-table-column>
      <el-table-column align="center" :label="$t('paper.buildingNum')" prop="buildingNum">
      </el-table-column>
      <el-table-column align="center" :label="$t('paper.floorNum')" prop="floorNum">
      </el-table-column>
      <el-table-column align="center" :label="$t('paper.professionType')" prop="professionName">
        <!-- <template slot-scope="scope">
          <span>{{paperProfessionTypeList[scope.row.professionType + 1]}}</span>
        </template> -->
      </el-table-column>
      <el-table-column align="center" :label="$t('table.operation')" width="200">
        <template slot-scope="scope">
          <a :href="scope.row.url | setFileRoot" target="_blank" :download="scope.row.originName">
            <el-button type="primary" size="mini" icon="el-icon-download">{{$t('btn.download')}}</el-button>
          </a>
          <el-button type="danger" size="mini"  @click="handleDelete(scope.row.id)">{{$t('btn.delete')}}</el-button>
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
      <el-form :rules="rules" ref="dialogForm" :model="paper" label-position="right" label-width="120px" style='margin: 0 50px;'>
        <el-form-item :label="$t('paper.professionType')" prop="diyProfessionType">
          <el-select
            v-model="paper.diyProfessionType"
            filterable
            allow-create
            :placeholder="$t('paper.professionType')"
          >
            <el-option
              v-for="(item, i) in itemProfessionTypeList"
              v-if="i !== 0"
              :key="i"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('paper.buildingNum')" prop="buildingNum">
          <el-input-number v-model="paper.buildingNum" :min="1" :label="$t('paper.buildingNum')"></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('paper.floorNum')" prop="floorNum">
          <el-input-number v-model="paper.floorNum" :min="1" :label="$t('paper.floorNum')"></el-input-number>
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
</template>

<script>
import { mapGetters } from 'vuex';
import { getItemByBuidlingInfo } from '@/api/item';
import { getPaperList, deletePaper, addPaper } from '@/api/paper';
import {
  itemProfessionTypeList,
  paperProfessionTypeList,
  parseBuildingArr,
} from '@/filters';

export default {
  name: 'DrawInfo',
  data() {
    const { params: { id } } = this.$route;
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        projectId: id,
        professionType: null,
        buildingNum: null,
        floorNum: null,
      },
      paper: {
        buildingNum: null,
        floorNum: null,
        diyProfessionType: null,
        file: null,
      },
      floorNumArr: [],
      listLoading: false,
      list: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      // filters
      paperProfessionTypeList,
      itemProfessionTypeList,
      // dialog
      dialogFormVisible: false,
      // file list
      fileList: [],
      // rules
      rules: {
        buildingNum: [{ required: true, message: `${this.$t('paper.buildingNum')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        floorNum: [{ required: true, message: `${this.$t('paper.floorNum')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        diyProfessionType: [{ required: true, message: `${this.$t('paper.professionType')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
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

      getPaperList(this.listQuery).then((res) => {
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
    handleBuilding(val) {
      const { projectId } = this.listQuery;
      this.handleFilter();
      // reset floor num
      this.listQuery.floorNum = null;
      getItemByBuidlingInfo({
        projectId,
        buildingId: val,
      }).then((res) => {
        const { buildingNum, buildingNumBase } = res;

        const floorNumArr = parseBuildingArr(buildingNum, buildingNumBase);

        this.floorNumArr = floorNumArr;
      });
    },
    handleFloor(val) {
      this.listQuery.floorNum = val;
      this.handleFilter();
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },
    handleDelete(id) {
      this.$confirm(this.$t('message.deletePaper'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete
        deletePaper({
          id,
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
      this.paper.file = files;
    },
    handleSave() {
      const { params: { id } } = this.$route;
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          addPaper({
            ...this.paper,
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
