<template>
  <div>
    <breadcrumb>
      <el-breadcrumb separator-class="el-icon-minus">
        <el-button type="text" v-if="!disableEdit" :disabled="disableEdit" @click="handleAdd">添加工人</el-button>
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
        <el-table-column align="center" label="姓名" prop="realName" width="100">
        </el-table-column>
        <el-table-column align="center" label="手机号" prop="tel">
        </el-table-column>
        <el-table-column align="center" label="工种" prop="workName">
        </el-table-column>
        <el-table-column align="center" label="日工资(元/工日)" prop="daySalary">
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

      <!-- dialog -->
      <el-dialog
        :visible.sync="dialogFormVisible"
        @close="resetForm"
        width="420px"
      >
        <div slot="title" style="font-weight: bolder">
          {{ this.actionStatus === 'add' ? '添加工人' : '编辑工人' }}
        </div>
        <el-form :rules="rules" ref="dialogForm" :model="mechanic" :disabled="disableEdit" label-position="top">
          <el-form-item label="姓名：" prop="realName">
            <el-input v-model="mechanic.realName" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="身份证号：" prop="idCard">
            <el-input v-model="mechanic.idCard" placeholder="请输入身份证号"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="tel">
            <el-input v-model="mechanic.tel" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="工种：" prop="workName">
            <el-input v-model="mechanic.workName" placeholder="请输入工种"></el-input>
          </el-form-item>
          <el-form-item label="日工资(元/工日)：" prop="daySalary">
            <el-input-number v-model="mechanic.daySalary" :min="1" label="请输入日工资"></el-input-number>
          </el-form-item>
          <el-form-item label="备注：" prop="remark">
            <el-input v-model="mechanic.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
          <el-form-item label="身份证：" prop="file">
            <div class="upload-file-wrapper" @click="handleFile">
              <div tabindex="0" class="el-upload el-upload--text">
                <div class="el-upload-dragger">
                  <div data-v-08fcefad="" class="el-upload__text flex-center">
                    <em data-v-08fcefad="">点击上传</em>
                  </div>
                </div>
                <input type="file" name="file" class="el-upload__input" ref="fileInput" accept="image/*" @change="handleFileChange">
                <img v-if="uploadFileSrc" class="upload-file" :src="uploadFileSrc" />
                <img v-else-if="mechanic.idCardImg" class="upload-file" :src="mechanic.idCardImg | setFileRoot" />
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer">
          <el-button @click="dialogFormVisible = false">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" :disabled="disableEdit" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-dialog>
      <!-- /dialog -->
    </div>
  </div>
</template>

<script>
import { getMechanicList, addMechanic, updateMechanic, deleteMechanic } from '@/api/mechanic';
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
      mechanic: {
        projectId: id,
        tel: '',
        workName: '',
        daySalary: '',
        remark: '',
        realName: '',
        idCard: '',
        file: null,
        idCardImg: null,
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
        realName: [{ required: true, message: `姓名${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        tel: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        idCard: [{ required: true, validator: checkIDCard, trigger: 'blur' }],
        workName: [{ required: true, message: `工种${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        daySalary: [{ required: true, message: `日工资${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getMechanicList(this.listQuery).then((res) => {
        this.list = res.data;
        this.listLoading = false;
      });
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
        self.mechanic.file = file;
      };
    },
    handleDelete(params) {
      this.$confirm('此操作将永久删除该工人, 是否继续?', this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        deleteMechanic(params).then(() => {
          this.getList();
        });
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
      this.mechanic = { ...item, createDate: null, createUser: null };
      this.dialogFormVisible = true;
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          const params = { ...this.mechanic, idCardImg: null };
          if (this.actionStatus === 'add') {
            addMechanic(params).then(() => {
              this.getList();
              this.dialogFormVisible = false;
            });
          } else {
            updateMechanic(params).then(() => {
              this.getList();
              this.dialogFormVisible = false;
            });
          }
        }
      });
    },
    resetForm() {
      const { params: { id } } = this.$route;
      this.mechanic = {
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
