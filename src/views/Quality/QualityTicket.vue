<template>
  <div>
    <breadcrumb>
      <el-button class="filter-item" type="text" icon="el-icon-plus" v-if="!disableEdit" :disabled="disableEdit" @click="handleAdd">新增罚款单</el-button>
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
        <el-table-column align="center" label="图片" prop="level">
          <template slot-scope="scope">
            <img
              class="question-img hover-cursor"
              v-if="scope.row.fileUrls && scope.row.fileUrls.length > 0" :src="scope.row.fileUrls[0] | setFileRoot"
              @click="handleView(scope.row.fileUrls, $event, 0)"
            />
          </template>
        </el-table-column>
        <el-table-column align="center" label="违章和隐患现象" prop="detail">
        </el-table-column>
        <el-table-column align="center" label="违章和隐患级别" prop="level">
          <template slot-scope="scope">
            <div :class="`question-level-${scope.row.level}`">{{ questionTicketTypeList[scope.row.level] }}</div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="罚款金额" prop="forfeit">
        </el-table-column>
        <el-table-column align="center" label="检查者" prop="userName">
        </el-table-column>
        <el-table-column align="center" label="检查日期" prop="checkDate">
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
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="360px"
      >
        <div slot="title" style="font-weight: bolder">
          新增罚款单
        </div>
        <el-form :rules="rules" ref="dialogForm" :model="question" :disabled="disableEdit" label-position="top">
          <el-form-item label="检查日期：" prop="checkDate">
            <el-date-picker
              placeholder="请选择日期"
              v-model="question.checkDate"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="违章和隐患现象：" prop="detail">
            <el-input type="textarea" v-model="question.detail" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="违章和隐患级别：" prop="level">
            <el-select
              v-model="question.level"
              placeholder="违章和隐患级别"
            >
              <el-option
                v-for="(item, i) in questionTicketTypeList"
                :key="i"
                :label="item"
                :value="i">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="扣款金额：" prop="forfeit">
            <el-input-number v-model="question.forfeit" :min="1" label="请输入金额"></el-input-number>
          </el-form-item>
          <el-form-item label="图片：" prop="fileList">
            <div class="upload-file-wrapper flex-column">
              <div class="flex-row">
                <el-button type="primary" style="margin-right: 15px;">
                <input type="file" ref="picInput" multiple accept="image/*" @change="handleFileChange" />
                  <span>点击上传</span>
                </el-button>
                <span>{{ question.fileList.length > 0 ? `${question.fileList.length}个文件` : '' }}</span>
              </div>
              <div style="font-size: 12px;">只能上传jpg/png文件，且不超过500kb</div>
            </div>
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
import { getQualityFineList, addQualityFine } from '@/api/quality';
import { questionTicketTypeList } from '@/filters';
import { showGallery } from '@/utils/utils';

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
      question: {
        checkDate: '',
        detail: '',
        forfeit: 0,
        projectId: id,
        level: null,
        fileList: [],
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
      rules: {
        checkDate: [{ required: true, message: `检查日期${this.$t('message.notEmpty')}`, trigger: 'change' }],
        detail: [{ required: true, message: `违章和隐患现象${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        level: [{ required: true, message: `违章和隐患级别${this.$t('message.notEmpty')}`, trigger: 'change' }],
        forfeit: [{ required: true, message: `扣款金额${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getQualityFineList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
      });
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
    handleFileChange(e) {
      const files = e.target.files;
      this.question.fileList = files;
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          addQualityFine(this.question).then(() => {
            this.dialogFormVisible = false;
            this.getList();
          });
        }
      });
    },
    resetForm() {
      this.$refs.dialogForm.resetFields();
    },
    handleView(pictures, e, i) {
      showGallery(pictures, e, i);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .question-level {
    &-0 {
      color: #67C23A;
    }

    &-1 {
      color: #E6A23C;
    }

    &-2 {
      color: #F56C6C;
    }
  }

  .question-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
</style>
