<template>
  <div>
    <breadcrumb>
      <el-button class="filter-item" type="text" icon="el-icon-plus" @click="handleAdd">新增罚款单</el-button>
    </breadcrumb>

    <div class="app-container">
      <!-- table -->
      <el-table
        :data="list"
        v-loading="listLoading"
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column align="center" label="序号" prop="id" width="100">
        </el-table-column>
        <el-table-column align="center" label="违章和隐患现象" prop="name">
        </el-table-column>
        <el-table-column align="center" label="违章和隐患级别" prop="priority">
          <template slot-scope="scope">
            <div>{{ scope.row.priority }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="罚款金额" prop="money">
        </el-table-column>
        <el-table-column align="center" label="检查者" prop="user">
        </el-table-column>
        <el-table-column align="center" label="检查日期" prop="date">
        </el-table-column>
      </el-table>
      <!-- /table -->

      <!-- dialog -->
      <el-dialog
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="360px"
      >
        <div slot="title" style="font-weight: bolder">
          新增罚款单
        </div>
        <el-form :rules="rules" ref="dialogForm" :model="output" label-position="top">
          <el-form-item label="检查日期：" prop="date">
            <el-date-picker
              type="month"
              placeholder="请选择月份"
              v-model="output.date"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="违章和隐患现象：" prop="content">
            <el-input type="textarea" v-model="output.intro" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="违章和隐患级别：" prop="priority">
            <el-select
              v-model="output.priority"
              :placeholder="$t('question.priority')"
            >
              <el-option
                v-for="(item, i) in questionTicketTypeList"
                v-if="i !== 0"
                :key="i"
                :label="item"
                :value="i - 1">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扣款金额：：" prop="money">
            <el-input-number v-model="output.money" :min="1" label="请输入金额"></el-input-number>
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
import { questionTicketTypeList } from '@/filters';

export default {
  name: 'QualityTicket',
  data() {
    const { params: { id } } = this.$route;

    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 5,
        projectId: id,
      },
      output: {
        date: '',
        content: '',
        priority: 0,
        money: null,
      },
      questionTicketTypeList,
      listLoading: false,
      // dialog
      dialogFormVisible: false,
      // page
      totalNumber: 0,
      totalPage: 1,
      // list
      list: [],
      // rules
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      setTimeout(() => {
        this.list = [{
          id: 1,
          name: '空洞大小',
          priority: 0,
          money: 200,
          user: '阮华良',
          date: '2018.05.08',
        }];

        this.listLoading = false;
      }, 2e3);
    },
    handleAdd() {
      this.dialogFormVisible = true;
    },
    handleSave() {},
    resetForm() {
      this.$refs.dialogForm.resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
