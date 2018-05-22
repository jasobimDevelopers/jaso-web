<template>
  <div class="app-container user-manage">
    <!-- filter -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('user.userName')" v-model="listQuery.userName">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('user.realName')" v-model="listQuery.realName">
      </el-input>
      <!-- <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('user.email')" v-model="listQuery.email">
      </el-input> -->
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('user.tel')" v-model="listQuery.tel">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('btn.search')}}</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAddUser">{{$t('btn.add')}}</el-button>
      <el-button class="filter-item" type="danger" icon="el-icon-delete" :disabled="multipleSelection.length === 0" @click="handleDeleteSelects">{{$t('btn.delete')}}</el-button>
    </div>
    <!-- /filter -->

    <!-- table -->
    <el-table
      :data="list"
      v-loading="listLoading"
      fit
      highlight-current-row
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column align="center" :label="$t('table.id')" prop="id">
      </el-table-column>
      <el-table-column align="center" :label="$t('user.userName')" prop="userName">
      </el-table-column>
      <el-table-column align="center" :label="$t('user.realName')" prop="realName">
      </el-table-column>
      <el-table-column align="center" :label="$t('user.file')" width="100">
        <template slot-scope="scope">
          <zooming-img :src="scope.row.userIconUrl | setFileRoot" width="80px" height="80px" />
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.userType')">
        <template slot-scope="scope">
          <span>{{scope.row.userType | setUserRole}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('user.email')" prop="email">
      </el-table-column>
      <el-table-column align="center" :label="$t('user.tel')" prop="tel">
      </el-table-column>
      <el-table-column align="center" :label="$t('user.registerDate')" prop="registerDate">
      </el-table-column>
      <el-table-column align="center" :label="$t('table.operation')" width="200">
        <template slot-scope="scope">
          <div class="operation-btns">
            <i class="el-icon-edit-outline" @click="handleUpdate(scope.row)"></i>
            <i class="el-icon-delete" @click="handleDelete({ userId: scope.row.id })"></i>
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

    <!-- user dialog -->
    <el-dialog
      :title="this.dialogStatus === 'add' ? $t('user.addUser') : $t('user.updateUser')"
      :visible.sync="dialogFormVisible"
      @close="resetForm"
      width="640px"
    >
      <el-form :rules="rules" ref="userForm" :model="user" label-position="right" label-width="80px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('user.userName')" prop="userName">
          <el-input v-model="user.userName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.password')" prop="password">
          <el-input v-model="user.password" type="password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.comfirmPassword')" prop="comfirmPassword">
          <el-input v-model="user.comfirmPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.realName')" prop="realName">
          <el-input v-model="user.realName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.email')" prop="email">
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.tel')" prop="tel">
          <el-input v-model="user.tel"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.projectList')" prop="projectList">
          <el-select v-model="user.projectList" multiple :placeholder="$t('user.projectList')">
            <el-option
              v-for="item in projectList"
              :key="item.id"
              :label="item.name"
              :value="`${item.id}`">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('user.userType')" prop="userType">
          <el-select v-model="user.userType" :placeholder="$t('user.userType')">
             <el-option
              v-for="(item, i) in userTypeList"
              :key="i"
              :label="item"
              :value="i">
             </el-option>
           </el-select>
         </el-form-item>
        <el-form-item label="组织架构" prop="departmentId">
          <el-select v-model="user.departmentId" placeholder="组织架构">
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.name"
              :value="`${item.id}`">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务权限" prop="roleId">
          <el-select v-model="user.roleId" placeholder="职务权限">
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.name"
              :value="`${item.id}`">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班组信息" prop="teamId">
          <el-select v-model="user.teamId" placeholder="班组信息">
            <el-option
              v-for="item in teamList"
              :key="item.id"
              :label="item.name"
              :value="`${item.id}`">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('user.file')" prop="file">
          <div class="upload-file-wrapper flex-column">
            <el-button type="primary" style="width: 100px">
              <input type="file" ref="fileInput" accept="image/*" @change="handleFileChange" />
              <span>上传</span>
            </el-button>
            <img v-if="uploadFileSrc" class="file" :src="uploadFileSrc" />
            <img v-else-if="user.userIconUrl" class="file" :src="user.userIconUrl | setFileRoot" />
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
      </div>
    </el-dialog>
    <!-- /user dialog -->
  </div>
</template>

<script>
import { getProjectList } from '@/api/projectManage';
import { getDepartmentList } from '@/api/department';
import { getRoleList } from '@/api/role';
import { getUserTeamList } from '@/api/team';
import { roleList as userTypeList } from '@/filters';
import {
  getUserList,
  addUser,
  updateUser,
  deleteUser,
} from '@/api/userManage';
import { validateEmail, validatePhone } from '@/utils/validate';

export default {
  name: 'UserManage',
  data() {
    // validtors for user
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(`${this.$t('user.password')}${this.$t('message.notEmpty')}`));
      } else {
        if (this.user.comfirmPassword !== '') {
          this.$refs.userForm.validateField('comfirmPassword');
        }
        callback();
      }
    };

    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(`${this.$t('user.comfirmPassword')}${this.$t('message.notEmpty')}`));
      } else if (value !== this.user.password) {
        callback(new Error(this.$t('user.passwordNotSame')));
      } else {
        callback();
      }
    };

    const checkEmail = (rule, value, callback) => {
      if (!validateEmail(value)) {
        callback(new Error(`${this.$t('user.email')}${this.$t('message.notCorrect')}`));
      } else {
        callback();
      }
    };

    const checkPhone = (rule, value, callback) => {
      if (!validatePhone(value)) {
        callback(new Error(`${this.$t('user.tel')}${this.$t('message.notCorrect')}`));
      } else {
        callback();
      }
    };

    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        userName: '',
        realName: '',
        email: '',
        tel: '',
      },
      user: {
        id: null,
        userName: '',
        password: '',
        comfirmPassword: '',
        realName: '',
        email: '',
        tel: '',
        projectList: [],
        userIconUrl: '',
        departmentId: '',
        roleId: '',
        teamId: '',
        file: null,
        userType: '',
      },
      // upload file
      uploadFileSrc: null,
      // list
      list: null,
      listLoading: false,
      projectList: [],
      departmentList: [],
      roleList: [],
      teamList: [],
      userTypeList,
      // page
      totalNumber: 0,
      totalPage: 1,
      // multi select
      multipleSelection: [],
      // dialog
      dialogFormVisible: false,
      // dialog status
      dialogStatus: '',
      // rules
      rules: {
        userName: [{ required: true, message: `${this.$t('user.userName')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        password: [{ required: true, validator: validatePass, trigger: 'blur' }],
        comfirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        realName: [{ required: true, message: `${this.$t('user.realName')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        tel: [{ required: true, type: 'number', validator: checkPhone, trigger: 'blur' }],
        projectList: [{ required: true, message: `${this.$t('user.projectList')}${this.$t('message.notEmpty')}`, trigger: 'change' }],
        departmentId: [{ required: true, message: `组织架构${this.$t('message.notEmpty')}`, trigger: 'change' }],
        roleId: [{ required: true, message: `权限管理${this.$t('message.notEmpty')}`, trigger: 'change' }],
        teamId: [{ required: true, message: `班组信息${this.$t('message.notEmpty')}`, trigger: 'change' }],
        file: [{ required: true, message: `${this.$t('user.file')}${this.$t('message.notEmpty')}`, trigger: 'change' }],
        userType: [{ required: true, message: `${this.$t('user.userType')}${this.$t('message.notEmpty')}`, trigger: 'change' }],
      },
    };
  },
  created() {
    getProjectList({
      // get all project list
      pageIndex: -1,
    }).then((res) => {
      const { data } = res;
      this.projectList = data;

      // get user list
      this.getList();
    });

    getDepartmentList().then((res) => {
      const { data } = res;
      this.departmentList = data;
    });

    getRoleList().then((res) => {
      const { data } = res;
      this.roleList = data;
    });

    getUserTeamList().then((res) => {
      const { data } = res;
      this.teamList = data;
    });
  },
  methods: {
    getList() {
      this.listLoading = true;

      getUserList(this.listQuery).then((res) => {
        const { data, totalNumber, totalPage } = res;
        this.list = data;
        this.totalNumber = totalNumber;
        this.totalPage = totalPage;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.pageIndex = 1;
      this.getList();
    },
    handleAddUser() {
      this.dialogStatus = 'add';
      this.dialogFormVisible = true;
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },
    handleFileChange(e) {
      const files = e.target.files;
      const file = files[0];
      const self = this;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        self.uploadFileSrc = this.result;
        self.user.file = file;
      };
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDeleteSelects() {
      const list = [];
      this.multipleSelection.forEach((user) => {
        list.push(user.id);
      });

      this.handleDelete({
        userIdList: list.join(','),
      });
    },
    handleUpdate(user) {
      const {
        id,
        userName,
        password,
        realName,
        email,
        tel,
        projectList,
        userType,
        systemType,
        teamInformation,
        workName,
        userIconUrl,
      } = user;

      this.user = {
        id,
        userName,
        password,
        realName,
        email,
        tel,
        userType,
        systemType,
        teamInformation,
        workName,
        userIconUrl,
        file: userIconUrl,
        comfirmPassword: user.password,
        projectList: projectList ? projectList.split(',') : [],
      };
      this.dialogStatus = 'edit';
      this.dialogFormVisible = true;
    },
    handleDelete(params) {
      this.$confirm(this.$t('message.deleteUser'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete user
        deleteUser(params).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.deleteOk'),
          });

          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.deleteCancel'),
        });
      });
    },
    handleSave() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          const files = this.$refs.fileInput.files;
          const params = { ...this.user };
          if (files.length > 0) {
            params.file = files[0];
          }

          params.projectList = params.projectList.join(',');

          if (this.dialogStatus === 'add') {
            addUser(params).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          } else {
            updateUser(params).then(() => {
              this.dialogFormVisible = false;
              this.getList();
            });
          }
        }
      });
    },
    resetForm() {
      this.user = {
        id: null,
        userName: '',
        password: '',
        comfirmPassword: '',
        realName: '',
        email: '',
        tel: '',
        projectList: [],
        userType: '',
        systemType: '',
        teamInformation: '',
        workName: '',
        userIconUrl: '',
        file: null,
      };
      // reset file src
      this.uploadFileSrc = null;
      this.$refs.fileInput.value = null;

      this.$refs.userForm.resetFields();
    },
  },
};
</script>

<style lang="scss">
  .user-manage {
    .el-table .cell {
      overflow: visible;

      img {
        object-fit: cover;
      }
    }
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app-container {
  margin: 24px 0;
  padding-top: 32px;
}

.filter-item {
  margin-right: 15px;
}
</style>
