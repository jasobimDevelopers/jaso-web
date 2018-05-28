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
            <el-button type="text" @click="handleShowQrcode(scope.row.id, scope.row)" style="margin-left: 4px">
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
        :visible.sync="dialogQrcodeVisible"
        :show-close="false"
        width="640px"
      >
        <qrcode id="qrcode-id" v-show="false" ref="qrcode" :value="`${qrcodeLinkOrigin}/#/qrcodeItem?id=${qrcodeId}`" :options="{ size: drawInfo.qrcodeSize }"></qrcode>
        <canvas id="item-canvas" ref="itemCanvas" :width="drawInfo.width" :height="drawInfo.height"></canvas>
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
      drawInfo: {
        width: 600,
        height: 300,
        qrcodeSize: 200,
      },
      drawItem: null,
    };
  },
  computed: {
    ...mapGetters([
      'building',
      'project',
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
    handleShowQrcode(id, item) {
      this.qrcodeId = id;
      this.dialogQrcodeVisible = true;
      this.drawItem = item;

      this.$nextTick(() => {
        this.drawItemInfo();
      });
    },
    drawItemInfo() {
      const $qrcode = document.getElementById('qrcode-id');
      const canvas = document.getElementById('item-canvas');
      const ctx = canvas.getContext('2d');
      const { name } = this.project;
      const { width, height, qrcodeSize } = this.drawInfo;
      const midWidth = width / 2;
      let topRecord = 0;

      function drawLine() {
        ctx.beginPath();
        ctx.lineWidth = 0.4;
        ctx.moveTo(0, topRecord);
        ctx.lineTo(width, topRecord);
        ctx.stroke();
      }

      // background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
      topRecord += 8;

      // draw title
      ctx.fillStyle = '#000000';
      ctx.font = '20px 黑体';
      ctx.textBaseline = 'top';
      ctx.fillText(name, midWidth - ((name.length / 2) * 20), topRecord);
      topRecord += 30;

      // line
      drawLine();
      topRecord += 2;

      // qrcode
      ctx.drawImage($qrcode, 8, topRecord, qrcodeSize, qrcodeSize);
      const lastLineHeight = topRecord + qrcodeSize;

      // words
      const wrodsWidth = qrcodeSize + 15;
      const { id, name: itemName, bottomElevation, serviceType, size, familyAndType, length, material, typeName } = this.drawItem;

      ctx.font = '16px 黑体';
      topRecord += 8;
      ctx.fillText(`${this.$t('table.id')}: ${id}`, wrodsWidth, topRecord);
      topRecord += 20;
      ctx.fillText(`${this.$t('item.name')}: ${itemName}`, wrodsWidth, topRecord);
      topRecord += 20;
      ctx.fillText(`${this.$t('item.bottomElevation')}: ${bottomElevation}`, wrodsWidth, topRecord);
      topRecord += 20;
      ctx.fillText(`${this.$t('item.serviceType')}: ${serviceType}`, wrodsWidth, topRecord);
      topRecord += 20;
      ctx.fillText(`${this.$t('item.size')}: ${size}`, wrodsWidth, topRecord);
      topRecord += 20;
      ctx.fillText(`${this.$t('item.length')}: ${length}`, wrodsWidth, topRecord);
      topRecord += 20;
      ctx.fillText(`${this.$t('item.familyAndType')}: ${familyAndType}`, wrodsWidth, topRecord);
      topRecord += 20;
      ctx.fillText(`${this.$t('item.material')}: ${material}`, wrodsWidth, topRecord);
      topRecord += 20;
      ctx.fillText(`${this.$t('item.typeName')}: ${typeName}`, wrodsWidth, topRecord);

      // line
      topRecord = lastLineHeight;
      drawLine();
      topRecord += 8;

      // logo
      const logoWidth = width - 220;
      const $img = document.getElementById('jaso-logo');
      ctx.drawImage($img, logoWidth, topRecord, 30, 40);

      topRecord += 4;

      ctx.font = '20px 黑体';
      ctx.fillText('嘉实智慧安装', logoWidth + 40, topRecord);

      topRecord += 22;
      ctx.font = '12px 黑体';
      ctx.fillText('JASOBIM', logoWidth + 40, topRecord);
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
