<template>
  <div>
    <breadcrumb>
      <el-breadcrumb separator-class="el-icon-minus">
        <el-date-picker
          v-model="listQuery.date"
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
      <!-- import dialog -->
      <el-dialog
        :visible.sync="dialogFormVisible"
        width="420px"
      >
        <div slot="title" style="font-weight: bolder">
          新增材料计划
        </div>
        <el-form :rules="rules" ref="dialogForm" :model="model" label-position="top">
          <el-form-item label="合约期限：" prop="date">
            <el-date-picker
              v-model="model.date"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="分项名称：" prop="name">
            <el-input v-model="model.name" placeholder="请输入分项名称"></el-input>
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
import { zeroFull } from '@/utils/utils';

export default {
  name: 'MaterialPlan',
  data() {
    const { params: { id } } = this.$route;
    const now = new Date();
    const date = `${now.getFullYear()}-${zeroFull(now.getMonth() + 1)}`;

    return {
      listQuery: {
        pageIndex: -1,
        projectId: id,
        date,
      },
      model: {
        date: '',
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
    getList() {},
    handleChangeDate() {
      // refresh days index
      this.selectDayIndex = 0;
      this.getList();
    },
    handleSave() {},
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
</style>
