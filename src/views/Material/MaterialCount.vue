<template>
  <div>
    <breadcrumb>
      <el-breadcrumb separator-class="el-icon-minus">
        <el-breadcrumb-item>
          <el-button type="text" v-if="!disableEdit" :disabled="disableEdit" @click="dialogTypeManageVisible = true">分类管理</el-button>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="!disableEdit">
          <el-dropdown>
            <span class="el-dropdown-link">
              新建物资
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <div @click="handleAdd">手动新建分项</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="dialogImportMaterialVisible = true">从Excel文件导入</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </breadcrumb>

    <div class="app-container">
      <el-tabs v-model="activeName" type="card" style="margin-top: 15px;" @tab-click="handleTabClick">
        <el-tab-pane label="物资库存" name="first">
          <!-- filter -->
          <div class="type-filter flex-sb-start">
            <div class="left">
              选择分类
            </div>
            <div class="type-list">
              <div
                v-for="item in typeList"
                :key="item.id"
                :class="queryType && queryType.id === item.id ? 'filter-item active' : 'filter-item'"
                @click="handleFilter(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
          <!-- /filter -->

          <!-- table -->
          <el-table
            :data="list"
            v-loading="listLoading"
            fit
            highlight-current-row
            style="margin-top: 24px;width: 100%"
          >
            <el-table-column align="center" label="物资名称" prop="materialName" width="100">
            </el-table-column>
            <el-table-column align="center" label="规格型号" prop="size">
            </el-table-column>
            <el-table-column align="center" label="单位" prop="unit">
            </el-table-column>
            <el-table-column align="center" label="入库数量" prop="inNum">
              <template slot-scope="scope">
                <div class="cell-action-wrapper">
                  <div class="num">{{ scope.row.inNum }}</div>
                  <el-button type="text" :disabled="disableEdit" @click="handleAddLog({materialId: scope.row.id, materialName: scope.row.materialName, logType: 0})">新增入库</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="出库数量" prop="outNum">
              <template slot-scope="scope">
                <div class="cell-action-wrapper">
                  <div class="num">{{ scope.row.outNum }}</div>
                  <el-button type="text" :disabled="disableEdit" @click="handleAddLog({materialId: scope.row.id, materialName: scope.row.materialName, logType: 1})">新增出库</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="库存数量" prop="leaveNum">
            </el-table-column>
            <el-table-column align="center" :label="$t('table.operation')" width="100">
              <template slot-scope="scope">
                <div class="operation-btns">
                  <i class="el-icon-edit-outline" @click="handleEdit(scope.row)"></i>
                  <i class="el-icon-delete" v-if="!disableEdit" @click="handleDelete({ id: scope.row.id })"></i>
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
        </el-tab-pane>
        <el-tab-pane label="入库记录" name="second">
          <!-- table -->
          <el-table
            :data="inList"
            v-loading="listInLoading"
            fit
            highlight-current-row
            style="margin-top: 24px;width: 100%"
          >
            <el-table-column align="center" label="日期" prop="logDate">
            </el-table-column>
            <el-table-column align="center" label="记录人" prop="userName">
            </el-table-column>
            <el-table-column align="center" label="物资名称" prop="materialName">
            </el-table-column>
            <el-table-column align="center" label="单位" prop="materialName">
            </el-table-column>
            <el-table-column align="center" label="数量" prop="num">
            </el-table-column>
            <el-table-column align="center" v-if="!disableEdit" :label="$t('table.operation')">
              <template slot-scope="scope">
                <div class="operation-btns">
                  <i class="el-icon-delete" @click="handleDeleteLog({ id: scope.row.id, type: 'in' })"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- /table -->

          <!-- pagination -->
          <div class="pagination-container">
            <el-pagination
              @size-change="handleLogInSizeChange"
              @current-change="handleLogInCurrentChange"
              :current-page="listInQuery.pageIndex"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="listInQuery.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNumber">
            </el-pagination>
          </div>
          <!-- /pagination -->
        </el-tab-pane>
        <el-tab-pane label="出库记录" name="third">
          <!-- table -->
          <el-table
            :data="outList"
            v-loading="listOutLoading"
            fit
            highlight-current-row
            style="margin-top: 24px;width: 100%"
          >
            <el-table-column align="center" label="日期" prop="logDate">
            </el-table-column>
            <el-table-column align="center" label="记录人" prop="userName">
            </el-table-column>
            <el-table-column align="center" label="物资名称" prop="materialName">
            </el-table-column>
            <el-table-column align="center" label="单位" prop="materialName">
            </el-table-column>
            <el-table-column align="center" label="数量" prop="num">
            </el-table-column>
            <el-table-column align="center" v-if="!disableEdit" :label="$t('table.operation')">
              <template slot-scope="scope">
                <div class="operation-btns">
                  <i class="el-icon-delete" @click="handleDeleteLog({ id: scope.row.id, type: 'out' })"></i>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- /table -->

          <!-- pagination -->
          <div class="pagination-container">
            <el-pagination
              @size-change="handleLogOutSizeChange"
              @current-change="handleLogOutCurrentChange"
              :current-page="listOutQuery.pageIndex"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="listOutQuery.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalNumber">
            </el-pagination>
          </div>
          <!-- /pagination -->
        </el-tab-pane>
      </el-tabs>

      <!-- material dialog -->
      <el-dialog
        :visible.sync="dialogMaterialVisible"
        width="360px"
        @close="resetForm"
      >
        <div slot="title" style="font-weight: bolder">
          {{ this.actionStatus === 'add' ? '新增物资' : '编辑物资' }}
        </div>
        <el-form :rules="rules" ref="dialogForm" :model="material" :disabled="disableEdit" label-position="top">
          <el-form-item label="物资名称：" prop="materialName">
            <el-input v-model="material.materialName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="物资分类：" prop="materialType">
            <el-select
              v-model="material.materialType"
              placeholder="选择分类"
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格型号：" prop="size">
            <el-input v-model="material.size" placeholder="请输入型号"></el-input>
          </el-form-item>
          <el-form-item label="单位：" prop="unit">
            <el-input v-model="material.unit" placeholder="请输入单位"></el-input>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input v-model="material.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogMaterialVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" :disabled="disableEdit" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>
      <!-- /material dialog -->

      <!-- import material dialog -->
      <el-dialog
        :visible.sync="dialogImportMaterialVisible"
        width="480px"
      >
        <div slot="title" style="font-weight: bolder">
          从Excel文件导入
        </div>
        <div class="import-info">
          <section>提示：从Excel文件导入必须按照标准格式，点击<a :href="downloadPath | setFileRoot" target="_blank">下载标准格式文档</a>下载。或者
            <a class="file-wrapper" @click="handleImport">
              <span>从本地导入</span>
              <input type="file" accept=".xls,.xlsx,.csv" ref="importInput" @change="handleImportFile($event)" />
            </a>。
          </section>
        </div>
      </el-dialog>
      <!-- /import material dialog -->

      <!-- type dialog -->
      <el-dialog
        :visible.sync="dialogTypeManageVisible"
        width="360px"
        @close="resetTypeForm"
      >
        <div slot="title" class="flex-sb" style="padding-right: 24px">
          <div style="font-weight: bolder">分类管理</div>
          <el-button type="text" @click="handleAddType">新建</el-button>
        </div>
        <div class="type-list-wrapper">
          <header>名称</header>
          <div class="type-list">
            <edit-line
              v-for="item in typeList"
              :key="item.id"
              :editInfo="item"
              @onEdit="handleEditType"
              @onDelete="handleDeleteType"
            >
              <div class="type-item">
                <div class="name">{{ item.name }}</div>
              </div>
              <div v-if="editTypeInfo && editTypeInfo.id === item.id" class="type-edit-wrapper flex-sb">
                <el-input v-model="editTypeInfo.name" placeholder="请输入物资分类名称"></el-input>
                <div class="flex-row btns-wrapper">
                  <el-button type="text" icon="el-icon-close" @click="editTypeInfo = null">取消</el-button>
                  <el-button type="text" icon="el-icon-plus" @click="handleUpdateType">确定</el-button>
                </div>
              </div>
            </edit-line>
          </div>
        </div>

        <div v-if="addingType" class="type-edit-wrapper flex-sb" style="margin-top: 8px">
          <el-input v-model="editTypeInfo.name" placeholder="请输入物资分类名称"></el-input>
          <div class="flex-row btns-wrapper">
            <el-button type="text" icon="el-icon-close" @click="addingType = null">取消</el-button>
            <el-button type="text" icon="el-icon-plus" :disabled="disableEdit" @click="handleSaveType">确定</el-button>
          </div>
        </div>
      </el-dialog>
      <!-- /type dialog -->

      <!-- type dialog -->
      <el-dialog
        :visible.sync="dialogLogVisible"
        width="360px"
        @close="resetLogForm"
      >
        <div slot="title" style="font-weight: bolder">
          {{ `新增${logInfo.materialName}${logInfo.logType === 0 ? '入库' : '出库'}` }}
        </div>
        <el-form :rules="logRules" ref="logForm" :model="logInfo" :disabled="disableEdit" label-position="top">
          <el-form-item label="日期：" prop="date">
            <el-date-picker
              v-model="logInfo.date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="`${logInfo.logType === 0 ? '入库' : '出库'}数量：`" prop="num">
            <el-input-number v-model="logInfo.num" :min="1" label="请输入数量"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogLogVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" :disabled="disableEdit" @click="handleSaveLog">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>
      <!-- /type dialog -->
    </div>
  </div>
</template>

<script>
import { zeroFull } from '@/utils/utils';
import {
  getMaterialTypeList,
  deleteMaterialType,
  addMaterialType,
  updateMaterialType,
  getMaterialList,
  addMaterial,
  deleteMaterial,
  updateMaterial,
  getMaterialLogList,
  addMaterialLog,
  deleteMaterialLog,
  importMaterial,
} from '@/api/material';

export default {
  name: 'MaterialCount',
  data() {
    const { params: { id } } = this.$route;

    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
      },
      listInQuery: {
        pageIndex: 1,
        pageSize: 10,
      },
      listOutQuery: {
        pageIndex: 1,
        pageSize: 10,
      },
      material: {
        projectId: id,
        materialName: '',
        materialType: null,
        size: '',
        unit: '',
        remark: '',
      },
      activeName: 'first',
      actionStatus: 'add',
      // dialog
      dialogTypeManageVisible: false,
      dialogMaterialVisible: false,
      dialogImportMaterialVisible: false,
      dialogLogVisible: false,
      // if adding type
      addingType: false,
      // edit
      editTypeInfo: null,
      // log
      logInfo: {
        materialId: '',
        logType: 0,
        materialName: '',
        date: new Date(),
      },
      // list
      list: [],
      inList: [],
      outList: [],
      typeList: [],
      queryType: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      totalInNumber: 0,
      totalInPage: 1,
      totalOutNumber: 0,
      totalOutPage: 1,
      listLoading: false,
      listInLoading: false,
      listOutLoading: false,
      // download path
      downloadPath: 'fileUploads/model_file.xls',
      // rules
      rules: {
        materialName: [{ required: true, message: `物资名称${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        materialType: [{ required: true, message: `物资分类${this.$t('message.notEmpty')}`, trigger: 'change' }],
        size: [{ required: true, message: `规格型号${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        unit: [{ required: true, message: `单位${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
      logRules: {
        num: [{ required: true, message: `数量${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        date: [{ required: true, message: `日期${this.$t('message.notEmpty')}`, trigger: 'change' }],
      },
    };
  },
  created() {
    this.getTypeList();
    this.getMaterialList();
  },
  methods: {
    getTypeList() {
      const { params: { id } } = this.$route;

      getMaterialTypeList({
        pageIndex: -1,
        projectId: id,
      }).then((res) => {
        const { data } = res;
        this.typeList = data;
      });
    },
    getMaterialList() {
      const { params: { id } } = this.$route;
      const condition = {
        projectId: id,
        ...this.listQuery,
      };

      if (this.queryType) {
        condition.materialType = this.queryType.id;
      }

      this.listLoading = true;
      getMaterialList(condition).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
      });
    },
    getMaterialInLogs() {
      this.listInLoading = true;
      getMaterialLogList({
        logType: 0,
        ...this.listInQuery,
      }).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.inList = data;
        this.totalInNumber = totalNumber;
        this.totalInPage = totalPage;
        this.listInLoading = false;
      });
    },
    getMaterialOutLogs() {
      this.listOutLoading = true;
      getMaterialLogList({
        logType: 1,
        ...this.listOutQuery,
      }).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.outList = data;
        this.totalOutNumber = totalNumber;
        this.totalOutPage = totalPage;
        this.listOutLoading = false;
      });
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getMaterialList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getMaterialList();
    },
    handleLogInSizeChange(val) {
      this.listInQuery.pageSize = val;
      this.getMaterialInLogs();
    },
    handleLogInCurrentChange(val) {
      this.listInQuery.pageIndex = val;
      this.getMaterialInLogs();
    },
    handleLogOutSizeChange(val) {
      this.listOutQuery.pageSize = val;
      this.getMaterialOutLogs();
    },
    handleLogOutCurrentChange(val) {
      this.listOutQuery.pageIndex = val;
      this.getMaterialOutLogs();
    },
    handleTabClick(tab) {
      switch (tab.index) {
        case '0': {
          this.getMaterialList();
          break;
        }
        case '1': {
          this.getMaterialInLogs();
          break;
        }
        case '2': {
          this.getMaterialOutLogs();
          break;
        }
        default:
      }
    },
    handleFilter(item) {
      if (!this.queryType || (this.queryType && this.queryType.id !== item.id)) {
        this.queryType = item;
      } else {
        this.queryType = null;
      }

      this.getMaterialList();
    },
    handleAdd() {
      this.actionStatus = 'add';
      this.dialogMaterialVisible = true;
    },
    handleEdit(item) {
      this.actionStatus = 'edit';

      this.material = {
        ...this.material,
        id: item.id,
        materialType: item.materialTypeId,
        materialName: item.materialName,
        size: item.size,
        unit: item.unit,
        remark: item.remark,
      };

      this.dialogMaterialVisible = true;
    },
    handleDelete(params) {
      this.$confirm('此操作将永久删除该物资, 是否继续?', this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        deleteMaterial(params).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.deleteOk'),
          });

          this.getMaterialList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.deleteCancel'),
        });
      });
    },
    handleAddLog(log) {
      const now = new Date();
      const date = `${now.getFullYear()}-${zeroFull(now.getMonth() + 1)}-${zeroFull(now.getDate())}`;
      this.logInfo = {
        ...log,
        date,
      };

      this.dialogLogVisible = true;
    },
    handleSaveLog() {
      const { materialId, materialName, logType, num } = this.logInfo;
      this.$refs.logForm.validate((valid) => {
        if (valid) {
          addMaterialLog({
            materialId,
            intro: materialName,
            logType,
            num,
          }).then(() => {
            this.dialogLogVisible = false;
            this.getMaterialList();
          });
        }
      });
    },
    handleDeleteLog(params) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete
        const { id, type } = params;
        deleteMaterialLog({ id }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.deleteOk'),
          });

          if (type === 'in') {
            this.getMaterialInLogs();
          } else {
            this.getMaterialOutLogs();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.deleteCancel'),
        });
      });
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          if (this.actionStatus === 'add') {
            addMaterial(this.material).then(() => {
              this.dialogMaterialVisible = false;
              this.getMaterialList();
            });
          } else {
            updateMaterial(this.material).then(() => {
              this.dialogMaterialVisible = false;
              this.getMaterialList();
            });
          }
        }
      });
    },
    handleImport() {
      this.$refs.importInput.click();
    },
    handleImportFile(e) {
      const files = e.target.files;
      const file = files[0];
      const { params: { id } } = this.$route;

      importMaterial({
        file,
        projectId: id,
      }).then(() => {
        this.dialogImportMaterialVisible = false;
        this.getMaterialList();
      });
    },
    handleAddType() {
      this.editTypeInfo = {
        name: '',
      };
      this.addingType = true;
    },
    handleEditType(item) {
      this.addingType = false;
      this.editTypeInfo = { ...item };
    },
    handleDeleteType(item) {
      this.$confirm('此操作将永久删除该物资类别, 是否继续?', this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        deleteMaterialType({
          id: item.id,
        }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.deleteOk'),
          });

          this.getTypeList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.deleteCancel'),
        });
      });
    },
    handleUpdateType() {
      const { id, name } = this.editTypeInfo;
      const { params: { id: projectId } } = this.$route;

      if (name.trim() === '') {
        this.$message({
          type: 'info',
          message: '物资类别名称不能为空',
        });
        return;
      }

      updateMaterialType({
        id,
        name,
        projectId,
      }).then(() => {
        this.editTypeInfo = null;

        this.getTypeList();
      });
    },
    handleSaveType() {
      const { name } = this.editTypeInfo;
      const { params: { id } } = this.$route;

      if (name.trim() === '') {
        this.$message({
          type: 'info',
          message: '物资类别名称不能为空',
        });
        return;
      }

      addMaterialType({
        name,
        projectId: id,
      }).then(() => {
        this.addingType = false;
        this.editTypeInfo = null;

        this.getTypeList();
      });
    },
    resetTypeForm() {
      this.addingType = false;
      this.editTypeInfo = null;
    },
    resetForm() {
      const { params: { id } } = this.$route;
      this.material = {
        projectId: id,
        materialName: '',
        materialType: null,
        size: '',
        unit: '',
        remark: '',
      };

      this.$refs.dialogForm.resetFields();
    },
    resetLogForm() {
      this.logInfo = {
        materialId: '',
        logType: '0',
        materialName: '',
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .type-filter {
    .left {
      padding: 22px 0;
      flex: 0 0 90px;
      text-align: center;
      background-color: rgba($color: #409EFF, $alpha: 0.4);
    }

    .type-list {
      flex: 1;
      padding: 16px 24px;
      background-color: rgba($color: #409EFF, $alpha: 0.2);

      .filter-item {
        display: inline-block;
        margin-right: 35px;
        margin-bottom: 8px;
        padding-left: 14px;
        padding-right: 14px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #606266;

        &.active {
          color: #ffffff;
          background-color: #409EFF;
        }

        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .type-list-wrapper {
    header {
      padding-left: 8px;
      border-bottom: 1px solid #DCDFE6;
    }

    .edit-line {
      border-bottom: 1px solid #DCDFE6;
    }

    .type-edit-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .type-edit-wrapper {
    background-color: #ffffff;
    z-index: 10;

    .btns-wrapper {
      margin-left: 24px;
    }
  }

  .import-info {
    a {
      color: #409EFF;
      text-decoration: underline;
    }

    .file-wrapper {
      position: relative;

      span {
        position: relative;
        z-index: 10;
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
      }
    }
  }

  .cell-action-wrapper {
    height: 24px;
    width: 120px;

    button {
      display: none;
    }

    &:hover {
      .num {
        display: none;
      }

      button {
        display: inline-block;
      }
    }
  }
</style>
