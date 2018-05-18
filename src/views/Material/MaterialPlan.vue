<template>
  <div class="material-plan">
    <breadcrumb>
      <el-breadcrumb separator-class="el-icon-minus">
        <el-date-picker
          v-model="listQuery.dates"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月"
          :clearable="false"
          @change="handleChangeDate"
        >
        </el-date-picker>

        <el-button type="text" style="margin-left: 32px;" @click="dialogFormVisible = true">新建计划</el-button>
      </el-breadcrumb>
    </breadcrumb>

    <div class="app-container">
      <!-- table -->
      <div class="table-header flex-sb">
        <span>材料名称</span>
        <span>型号规格</span>
        <span>质量标准</span>
        <span>单位</span>
        <span>数量</span>
        <span>供货时间</span>
        <span>卸货地点</span>
        <span>用料地点</span>
        <span></span>
      </div>

      <div class="table-body">
        <section class="table-cell flex-sb">
          <span><i class="el-icon-remove"></i>1 给排水材料及样板房用料</span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span>
            <el-dropdown>
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>插入子集栏目</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </section>

        <div class="group-wrapper">
          <section class="table-cell flex-sb">
            <span><i class="el-icon-remove"></i>1.1 镀锌钢管</span>
            <span>DN80</span>
            <span>国标</span>
            <span>米</span>
            <span>120</span>
            <span>5月15日前</span>
            <span>工地仓库</span>
            <span></span>
            <span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>新增一行</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </section>

          <section class="table-cell flex-sb">
            <span></span>
            <span>DN80</span>
            <span>国标</span>
            <span>米</span>
            <span>120</span>
            <span></span>
            <span></span>
            <span></span>
            <span>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </section>
        </div>

        <div class="table-cell edit-wrapper flex-sb">
          <span><el-input v-model="editInfo.name" placeholder="请输入材料名称" style="width: 150px"></el-input></span>
          <span><el-input v-model="editInfo.name" placeholder="型号规格" style="width: 78px"></el-input></span>
          <span><el-input v-model="editInfo.name" placeholder="质量标准" style="width: 78px"></el-input></span>
          <span><el-input v-model="editInfo.name" placeholder="单位" style="width: 58px"></el-input></span>
          <span><el-input v-model="editInfo.name" placeholder="数量" style="width: 58px"></el-input></span>
          <span>
            <el-date-picker
              v-model="editInfo.name"
              type="date"
              placeholder="日期"
              style="width: 78px"
            >
            </el-date-picker>
          </span>
          <span><el-input v-model="editInfo.name" placeholder="卸货地点" style="width: 78px"></el-input></span>
          <span><el-input v-model="editInfo.name" placeholder="用料地点" style="width: 78px"></el-input></span>
          <span style="font-size: 18px">
            <i class="el-icon-check hover-cursor"></i>
            <i class="el-icon-close hover-cursor"></i>
          </span>
        </div>
      </div>
      <!-- /table -->

      <!-- import dialog -->
      <el-dialog
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="420px"
      >
        <div slot="title" style="font-weight: bolder">
          新增材料计划
        </div>
        <el-form :rules="rules" ref="dialogForm" :model="plan" label-position="top">
          <el-form-item label="合约期限：" prop="date">
            <el-date-picker
              v-model="plan.date"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="分项名称：" prop="name">
            <el-input v-model="plan.name" placeholder="请输入分项名称"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>
      <!-- /import dialog -->
    </div>
  </div>
</template>

<script>
import { getMaterialPlanList, addMaterialPlan } from '@/api/material';
import { zeroFull } from '@/utils/utils';

export default {
  name: 'MaterialPlan',
  data() {
    const { params: { id } } = this.$route;
    const now = new Date();
    const dates = `${now.getFullYear()}-${zeroFull(now.getMonth() + 1)}`;

    return {
      listQuery: {
        pageIndex: -1,
        projectId: id,
        dates,
      },
      plan: {
        date: '',
        name: '',
      },
      editInfo: {
        name: '',
      },
      listLoading: false,
      list: null,
      dialogFormVisible: false,
      // download path
      downloadPath: '',
      // rules
      rules: {
        date: [{ required: true, message: `合约期限${this.$t('message.notEmpty')}`, trigger: 'change' }],
        name: [{ required: true, message: `分项名称${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getMaterialPlanList({
        ...this.listQuery,
        dates: `${this.listQuery.dates}-01`,
      }).then((res) => {
        console.log('res', res);
      });

      setTimeout(() => {
        this.list = [{
        }];
      }, 2e3);
    },
    handleChangeDate() {
      // refresh days index
      this.selectDayIndex = 0;
      this.getList();
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          const { date, name } = this.plan;

          addMaterialPlan({
            projectId: this.listQuery.projectId,
            name,
            startTime: date[0],
            endTime: date[1],
          }).then(() => {
            this.getList();

            this.dialogFormVisible = false;
          });
        }
      });
    },
    resetForm() {
      this.$refs.dialogForm.resetFields();
    },
  },
};
</script>

<style lang="scss">
  .material-plan .table-cell {
    .el-input__inner {
      padding-left: 10px;
      padding-right: 10px;
      border-style: dashed;
    }

    .el-date-editor .el-input__inner {
      padding-left: 30px;
    }
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .table-header, .table-cell {
    height: 48px;
    color: #909399;
    text-align: center;
    border-bottom: 1px solid #ebeef5;

    span {
      width: 80px;

      i {
        margin-right: 8px;
        color: #409EFF;

        &:hover {
          cursor: pointer;
        }
      }
    }

    span:nth-child(1) {
      width: 270px;
    }

    span:last-child {
      width: 88px;
    }
  }

  .table-header {
    font-weight: bolder;
  }

  .table-cell {
    color: #606266;

    .el-icon-more {
      transform: rotate(90deg);
      font-size: 24px;
    }
  }
</style>
