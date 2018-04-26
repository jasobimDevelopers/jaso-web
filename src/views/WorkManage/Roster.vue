<template>
  <div>
    <breadcrumb>
      <el-breadcrumb separator-class="el-icon-minus">
        <el-button type="text" @click="handleAdd">添加工人</el-button>
      </el-breadcrumb>
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
        <el-table-column align="center" label="姓名" prop="username" width="100">
        </el-table-column>
        <el-table-column align="center" label="手机号" prop="mobile">
        </el-table-column>
        <el-table-column align="center" label="工种" prop="type">
        </el-table-column>
        <el-table-column align="center" label="日工资(元/工日)" prop="money">
        </el-table-column>
        <el-table-column align="center" :label="$t('table.operation')" width="100">
          <template slot-scope="scope">
            <div class="operation-btns">
              <i class="el-icon-edit-outline" @click="handleEdit(scope.row)"></i>
              <i class="el-icon-delete" @click="handleDelete({ idList: scope.row.id })"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- /table -->

      <!-- dialog -->
      <el-dialog
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="420px"
      >
        <div slot="title" style="font-weight: bolder">
          {{ this.actionStatus === 'add' ? '添加工人' : '编辑工人' }}
        </div>
        <el-form :rules="rules" ref="dialogForm" :model="output" label-position="top">
          <el-form-item label="姓名：" prop="username">
            <el-input v-model="output.username" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idCard">
            <el-input v-model="output.idCard" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="output.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="工种：" prop="type">
            <el-input v-model="output.type" placeholder="请输入工种"></el-input>
          </el-form-item>
          <el-form-item label="日工资(元/工日)：" prop="money">
            <el-input-number v-model="output.money" :min="1" label="请输入日工资"></el-input-number>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input v-model="output.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="身份证：" prop="idCardFile">
            <div class="upload-file-wrapper" @click="handleFile">
              <div tabindex="0" class="el-upload el-upload--text">
                <div class="el-upload-dragger">
                  <div data-v-08fcefad="" class="el-upload__text flex-center">
                    <em data-v-08fcefad="">点击上传</em>
                  </div>
                </div>
                <input type="file" name="file" class="el-upload__input" ref="fileInput" accept="image/*" @change="handleFileChange">
                <img v-if="uploadFileSrc" class="upload-file" :src="uploadFileSrc" />
              </div>
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
import { validateIDCard, validatePhone } from '@/utils/validate';

export default {
  name: 'Roster',
  data() {
    const { params: { id } } = this.$route;

    const checkPhone = (rule, value, callback) => {
      if (!validatePhone(value)) {
        callback(new Error(`${this.$t('user.tel')}${this.$t('message.notCorrect')}`));
      } else {
        callback();
      }
    };

    const checkIDCard = (rule, value, callback) => {
      if (!validateIDCard(value)) {
        callback(new Error(`身份证${this.$t('message.notCorrect')}`));
      } else {
        callback();
      }
    };

    return {
      listQuery: {
        pageIndex: -1,
        projectId: id,
      },
      output: {
        username: '',
        idCard: '',
        mobile: '',
        type: '',
        money: '',
        remark: '',
        idCardFile: null,
        file: null,
      },
      listLoading: false,
      list: null,
      // upload file
      uploadFileSrc: null,
      // action status
      actionStatus: 'add',
      // dialog
      dialogFormVisible: false,
      // rules
      rules: {
        username: [{ required: true, message: `姓名${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        mobile: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        idCard: [{ required: true, validator: checkIDCard, trigger: 'blur' }],
        type: [{ required: true, message: `工种${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        money: [{ required: true, message: `日工资${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      setTimeout(() => {
        this.list = [
          {
            username: '张三',
            mobile: '13111111111',
            type: '工种',
            money: '200',
          },
        ];
        this.listLoading = false;
      }, 3e3);
    },
    handleFile() {
      this.$refs.fileInput.click();
    },
    handleFileChange(e) {
      const files = e.target.files;
      const file = files[0];
      const self = this;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        self.uploadFileSrc = this.result;
        self.output.file = file;
      };
    },
    handleDelete(params) {
      console.log('params', params);
      this.$confirm('此操作将永久删除该工人, 是否继续?', this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        // TODO: delete user
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.deleteCancel'),
        });
      });
    },
    handleAdd() {
      this.actionStatus = 'add';
      this.dialogFormVisible = true;
    },
    handleEdit(item) {
      this.actionStatus = 'edit';
      this.output = item;
      this.dialogFormVisible = true;
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          if (this.actionStatus === 'add') {
            // TODO: add
          } else {
            // TODO: update
          }
        }
      });
    },
    resetForm() {
      const { params: { id } } = this.$route;
      this.output = {
        projectId: id,
        year: null,
        month: null,
        finished: 0,
      };
      // reset file src
      this.uploadFileSrc = null;
      this.$refs.fileInput.value = null;

      this.$refs.dialogForm.resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
