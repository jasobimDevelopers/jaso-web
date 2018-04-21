<template>
  <div>
    <!-- filter -->
    <div class="filter-container">
      <div class="filter-wrapper">
        <el-form ref="filterForm" label-position="right" label-width="100px">
          <el-form-item :label="$t('item.professionType')">
            <el-radio
              v-model="listQuery.professionType"
              v-for="(item, i) in itemProfessionTypeList"
              :key="i"
              :label="(i - 1)"
              @change="handleFilter"
            >{{item}}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('item.householdNum')">
            <el-radio
              v-model="listQuery.householdNum"
              v-for="(item, i) in householdNumList"
              :key="i"
              :label="(i - 1)"
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
      <el-table-column align="center" :label="$t('item.name')" prop="name">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.bottomElevation')" prop="bottomElevation">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.size')" prop="size">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.length')" prop="length">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.serviceType')" prop="serviceType">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.familyAndType')" prop="familyAndType">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.level')" prop="level">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.offset')" prop="offset">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.area')" prop="area">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.material')" prop="material">
      </el-table-column>
      <el-table-column align="center" :label="$t('item.typeName')" prop="typeName">
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
      <el-form :rules="rules" ref="dialogForm" label-position="right" label-width="120px" style='margin: 0 50px;'>
        <fieldset>
          <legend>{{`${itemProfessionTypeList[1]}${$t('item.professionType')}`}}</legend>
          <el-form-item :label="$t('item.cableTray')">
            <input type="file" @change="handleUpload(0, $event)" :accept="acceptFile" />
          </el-form-item>
          <el-form-item :label="$t('item.cableBridgeFittings')">
            <input type="file" @change="handleUpload(1, $event)" :accept="acceptFile" />
          </el-form-item>
          <el-form-item :label="$t('item.electricalEquipment')">
            <input type="file" @change="handleUpload(2, $event)" :accept="acceptFile" />
          </el-form-item>
        </fieldset>
        <fieldset>
          <legend>{{`${itemProfessionTypeList[2]}${$t('item.professionType')}`}}</legend>
          <el-form-item :label="$t('item.windPipe')">
            <input type="file" @change="handleUpload(3, $event)" :accept="acceptFile" />
          </el-form-item>
          <el-form-item :label="$t('item.windPipeFittings')">
            <input type="file" @change="handleUpload(4, $event)" :accept="acceptFile" />
          </el-form-item>
          <el-form-item :label="$t('item.windPipeAccessories')">
            <input type="file" @change="handleUpload(5, $event)" :accept="acceptFile" />
          </el-form-item>
          <el-form-item :label="$t('item.endOfWindPipe')">
            <input type="file" @change="handleUpload(6, $event)" :accept="acceptFile" />
          </el-form-item>
          <el-form-item :label="$t('item.mechanicalEquipment')">
            <input type="file" @change="handleUpload(7, $event)" :accept="acceptFile" />
          </el-form-item>
        </fieldset>
        <fieldset>
          <legend>{{`${itemProfessionTypeList[3]}${$t('item.professionType')}`}}</legend>
          <el-form-item :label="$t('item.pipe')">
            <input type="file" @change="handleUpload(8, $event)" :accept="acceptFile" />
          </el-form-item>
          <el-form-item :label="$t('item.pipeFitting')">
            <input type="file" @change="handleUpload(9, $event)" :accept="acceptFile" />
          </el-form-item>
          <el-form-item :label="$t('item.pipeAccessories')">
            <input type="file" @change="handleUpload(10, $event)" :accept="acceptFile" />
          </el-form-item>
          <el-form-item :label="$t('item.bathroomEquipment')">
            <input type="file" @change="handleUpload(11, $event)" :accept="acceptFile" />
          </el-form-item>
        </fieldset>
        <fieldset>
          <legend>{{`${itemProfessionTypeList[4]}${$t('item.professionType')}`}}</legend>
          <el-form-item :label="$t('item.fireHydrant')">
            <input type="file" @change="handleUpload(12, $event)" :accept="acceptFile" />
          </el-form-item>
          <el-form-item :label="$t('item.spray')">
            <input type="file" @change="handleUpload(13, $event)" :accept="acceptFile" />
          </el-form-item>
        </fieldset>
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
import { getItemList, addItem, getItemByBuidlingInfo } from '@/api/item';
import { itemProfessionTypeList, householdNumList, parseBuildingArr } from '@/filters';

export default {
  name: 'ConstructionInfo',
  data() {
    const { params: { id } } = this.$route;
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        projectId: id,
        professionType: -1,
        buildingNum: null,
        floorNum: null,
        householdNum: -1,
      },
      floorNumArr: [],
      listLoading: false,
      list: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      // filters
      itemProfessionTypeList,
      householdNumList,
      // dialog
      dialogFormVisible: false,
      // file list
      fileList: new Array(14),
      acceptFile: '.xls,.xlsx,.csv',
      // rules
      rules: {
        fileList: [{ required: true, message: `${this.$t('message.notEmpty')}`, trigger: 'blur' }],
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

      getItemList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
      });
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
    handleAdd() {
      this.dialogFormVisible = true;
    },
    handleUpload(index, e) {
      const file = e.target.files[0];
      this.fileList.splice(index, 1, file);
    },
    handleSave() {
      const { params: { id } } = this.$route;
      addItem({
        fileList: this.fileList,
        projectId: id,
      }).then(() => {
        this.dialogFormVisible = false;
        this.getList();
      });
    },
    resetForm() {
      this.$refs.dialogForm.$el.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
