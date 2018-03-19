<template>
  <div>
    <!-- filter -->
    <div class="filter-container">
      <div class="filter-wrapper">
        <el-form ref="filterForm" label-position="left" label-width="100px">
          <el-form-item :label="$t('quantity.professionType')">
            <el-radio
              v-model="listQuery.professionType"
              v-for="(item, i) in itemProfessionTypeList"
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
      <el-table-column align="center" :label="$t('quantity.name')" prop="name">
      </el-table-column>
      <el-table-column align="center" :label="$t('quantity.systemType')" prop="systemType">
      </el-table-column>
      <el-table-column align="center" :label="$t('quantity.value')" prop="value">
      </el-table-column>
      <el-table-column align="center" :label="$t('quantity.unit')" prop="unit">
      </el-table-column>
      <el-table-column align="center" :label="$t('quantity.familyAndType')" prop="familyAndType">
      </el-table-column>
      <el-table-column align="center" :label="$t('quantity.serviceType')" prop="serviceType">
      </el-table-column>
      <el-table-column align="center" :label="$t('quantity.size')" prop="size">
      </el-table-column>
      <el-table-column align="center" :label="$t('quantity.typeName')" prop="typeName">
      </el-table-column>
      <el-table-column align="center" :label="$t('quantity.material')" prop="material">
      </el-table-column>
      <el-table-column align="center" :label="$t('quantity.quantityType')">
        <template slot-scope="scope">
          <span>{{quantityTypeList[scope.row.quantityType]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('quantity.professionType')">
        <template slot-scope="scope">
          <span>{{itemProfessionTypeList[scope.row.professionType + 1]}}</span>
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
        <div>
          <a :href="exportLink | setFileRoot" target="_blank">
            <el-button class="filter-item" type="primary" icon="el-icon-download">{{$t('btn.download')}}</el-button>
          </a>
          <a :href="tempLink | setFileRoot" target="_blank">
            <el-button class="filter-item" type="info" icon="el-icon-download">{{$t('btn.template')}}</el-button>
          </a>
          <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">{{$t('btn.add')}}</el-button>
        </div>
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
      <el-form :rules="rules" ref="dialogForm" :model="quantity" label-position="left" label-width="120px" style='margin: 0 50px;'>
        <el-form-item :label="$t('btn.file')" prop="file">
          <input type="file" @change="handleUpload" multiple accept=".xls,.xlsx,.csv" />
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
import { getQuantityList, exportQuantity, addQuantity } from '@/api/quantity';
import { itemProfessionTypeList, quantityTypeList, parseBuildingArr } from '@/filters';

export default {
  name: 'QuantitiesInfo',
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
      quantity: {
        file: null,
      },
      floorNumArr: [],
      exportLink: '',
      tempLink: 'fileupload/quantitys/quantityModel.xls',
      listLoading: false,
      list: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      // filters
      itemProfessionTypeList,
      quantityTypeList,
      // dialog
      dialogFormVisible: false,
      // file list
      fileList: [],
      // rules
      rules: {
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
    const { params: { id } } = this.$route;

    this.getList();
    exportQuantity({
      projectId: id,
    }).then((res) => {
      const { data } = res;
      this.exportLink = data;
    });
  },
  methods: {
    getList() {
      this.listLoading = true;

      getQuantityList(this.listQuery).then((res) => {
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
    handleAdd() {
      this.dialogFormVisible = true;
    },
    handleUpload(e) {
      const files = e.target.files;

      this.fileList = files;
      this.quantity.file = files;
    },
    handleSave() {
      const { params: { id } } = this.$route;
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          addQuantity({
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
