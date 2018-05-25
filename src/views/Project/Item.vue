<template>
  <div>
    <breadcrumb>
      <el-button type="text" icon="el-icon-plus" v-if="!disableEdit" :disabled="disableEdit" @click="handleAdd">{{$t('btn.add')}}</el-button>
    </breadcrumb>
    <div class="app-container">
      <!-- filter -->
      <div class="filter-container">
        <div class="filter-wrapper">
          <el-form ref="filterForm" label-position="right" label-width="100px" style="display: flex;">
            <el-form-item label="选择专业">
              <el-select v-model="listQuery.professionType" placeholder="请选择" @change="handleFilter">
                <el-option
                  v-for="(item, i) in itemProfessionTypeList"
                  :key="i"
                  :label="item"
                  :value="i - 1">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择户型">
              <el-select v-model="listQuery.householdNum" placeholder="请选择" @change="handleFilter">
                <el-option
                  v-for="(item, i) in householdNumList"
                  :key="i"
                  :label="item"
                  :value="i - 1">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择栋号">
              <el-select v-model="listQuery.buildingNum" v-if="building" placeholder="请选择" @change="handleBuilding">
                <el-option
                  label="全部"
                  :value="null">
                </el-option>
                <el-option
                  v-for="(item, i) in building.buildingList"
                  :key="i"
                  :label="`#${item}`"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择楼层">
              <el-select v-model="listQuery.floorNum" v-if="building" placeholder="请选择" @change="handleFilter">
                <el-option
                  label="全部"
                  :value="null">
                </el-option>
                <el-option
                  v-for="(item, i) in floorNumArr"
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
        <el-table-column align="center" :label="$t('item.serviceType')" prop="serviceType">
        </el-table-column>
        <el-table-column align="center" :label="$t('item.size')" prop="size">
        </el-table-column>
        <el-table-column align="center" :label="$t('item.familyAndType')" prop="familyAndType">
        </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-popover
              placement="bottom-end"
              title="构件信息"
              width="400"
              trigger="hover"
            >
              <section>{{ `${$t('item.name')}: ${scope.row.name}` }}</section>
              <section>{{ `${$t('item.bottomElevation')}: ${scope.row.bottomElevation}` }}</section>
              <section>{{ `${$t('item.serviceType')}: ${scope.row.size}` }}</section>
              <section>{{ `${$t('item.size')}: ${scope.row.serviceType}` }}</section>
              <section>{{ `${$t('item.length')}: ${scope.row.length}` }}</section>
              <section>{{ `${$t('item.familyAndType')}: ${scope.row.familyAndType}` }}</section>
              <section>{{ `${$t('item.level')}: ${scope.row.level}` }}</section>
              <section>{{ `${$t('item.offset')}: ${scope.row.offset}` }}</section>
              <section>{{ `${$t('item.area')}: ${scope.row.area}` }}</section>
              <section>{{ `${$t('item.material')}: ${scope.row.material}` }}</section>
              <section>{{ `${$t('item.typeName')}: ${scope.row.typeName}` }}</section>
              <el-button type="text" slot="reference">更多</el-button>
            </el-popover>
            <el-button type="text" @click="handleShowQrcode(scope.row.id)" style="margin-left: 4px">
              <svg-icon icon-class="二维码" size="20" color="#409EFF"></svg-icon>
            </el-button>
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

      <el-dialog
        title="二维码"
        :visible.sync="dialogQrcodeVisible"
        :show-close="false"
        width="320px"
      >
        <qrcode :value="`${qrcodeLinkOrigin}/#/qrcodeItem?id=${qrcodeId}`" :options="{ size: 280 }"></qrcode>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getItemList, addItem, getItemByBuidlingInfo } from '@/api/item';
import { itemProfessionTypeList, householdNumList, parseBuildingArr } from '@/filters';
import Qrcode from '@xkeshi/vue-qrcode';

export default {
  name: 'Item',
  components: {
    Qrcode,
  },
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
      dialogQrcodeVisible: false,
      qrcodeId: '',
      qrcodeLinkOrigin: window.location.origin,
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
    const { params: { id } } = this.$route;
    this.$store.dispatch('getBuildingInfo', { id });
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

      if (val) {
        getItemByBuidlingInfo({
          projectId,
          buildingId: val,
        }).then((res) => {
          const { buildingNum, buildingNumBase } = res;

          const floorNumArr = parseBuildingArr(buildingNum, buildingNumBase);

          this.floorNumArr = floorNumArr;
        });
      }
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
    handleShowQrcode(id) {
      this.qrcodeId = id;
      this.dialogQrcodeVisible = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .app-container {
    padding-top: 32px;
  }
</style>
