<template>
  <div class="app-container">
    <!-- filter -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.name')" v-model="listQuery.name">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.num')" v-model="listQuery.num">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.constructionUnit')" v-model="listQuery.constructionUnit">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.leader')" v-model="listQuery.leader">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.buildingUnit')" v-model="listQuery.buildingUnit">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.place')" v-model="listQuery.place">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.designUnit')" v-model="listQuery.designUnit">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.version')" v-model="listQuery.version">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.startDate')" v-model="listQuery.startDate">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('project.phase')" v-model="listQuery.phase">
      </el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{$t('btn.search')}}</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-plus" @click="handleAddProject">{{$t('btn.add')}}</el-button>
    </div>
    <!-- /filter -->

    <!-- table -->
    <el-table
      :data="list"
      v-loading="listLoading"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" :label="$t('table.id')" prop="id">
      </el-table-column>
      <el-table-column align="center" :label="$t('project.name')" prop="name">
      </el-table-column>
      <el-table-column align="center" :label="$t('project.constructionUnit')" prop="constructionUnit">
      </el-table-column>
      <el-table-column align="center" :label="$t('project.leader')" prop="leader">
      </el-table-column>
      <el-table-column align="center" :label="$t('project.buildingUnit')" prop="buildingUnit">
      </el-table-column>
      <el-table-column align="center" :label="$t('project.version')" prop="version">
      </el-table-column>
      <el-table-column align="center" :label="$t('project.startDate')" prop="startDate">
      </el-table-column>
      <el-table-column align="center" :label="$t('project.phase')" prop="phase">
      </el-table-column>
      <el-table-column align="center" :label="$t('table.operation')" width="200">
        <template slot-scope="scope">
          <router-link :to="`project/${scope.row.id}`">
            <el-button type="primary" size="mini">{{$t('btn.edit')}}</el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">{{$t('btn.delete')}}</el-button>
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
      :title="$t('project.addProject')"
      :visible.sync="dialogFormVisible"
      @close="resetForm"
      width="640px"
    >
      <el-form :rules="rules" ref="projectForm" :model="project" label-position="left" label-width="120px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('project.name')" prop="name">
          <el-input v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.num')" prop="num">
          <el-input v-model="project.num"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.constructionUnit')" prop="constructionUnit">
          <el-input v-model="project.constructionUnit"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.leader')" prop="leader">
          <el-input v-model="project.leader"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.place')" prop="place">
          <el-input v-model="project.place"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.buildingUnit')" prop="buildingUnit">
          <el-input v-model="project.buildingUnit"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.designUnit')" prop="designUnit">
          <el-input v-model="project.designUnit"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.startDate')" prop="startDate">
          <el-input v-model="project.startDate"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.phase')" prop="phase">
          <el-input v-model="project.phase"></el-input>
        </el-form-item>
        <el-form-item :label="$t('user.teamInformation')" prop="teamInformation">
          <el-input v-model="project.teamInformation"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.modelPart')" prop="modelPart">
          <el-input v-model="project.modelPart"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.version')" prop="version">
          <el-input v-model="project.version"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.state')" prop="state">
          <el-select v-model="project.state" :placeholder="$t('project.state')">
            <el-option
              v-for="(item, i) in projectStateList"
              :key="i"
              :label="item"
              :value="i">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('project.description')" prop="description">
          <el-input v-model="project.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.modelFile')" prop="modelFile">
          <div class="file-wrapper flex-row">
            <el-button type="primary" style="width: 100px">
              <input type="file" ref="modelInput" @change="handleModelChange" />
              <span>上传</span>
            </el-button>
            <div style="marginLeft: 8px;">{{project.modelFileName}}</div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('project.picFile')" prop="picFile">
          <div class="file-wrapper flex-column">
            <el-button type="primary" style="width: 100px">
              <input type="file" ref="picInput" @change="handlePicChange" />
              <span>上传</span>
            </el-button>
            <img v-if="uploadFileSrc" class="file" :src="uploadFileSrc" />
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
</template>

<script>
import { getProjectList, addProject, deleteProject } from '@/api/projectManage';
import { projectStateList } from '@/filters';

export default {
  name: 'ProjectManage',
  data() {
    return {
      listQuery: {
        pageIndex: 1,
        pageSize: 10,
        name: '',
        num: '',
        constructionUnit: '',
        leader: '',
        buildingUnit: '',
        designUnit: '',
        version: '',
        startDate: '',
        phase: '',
      },
      project: {
        id: null,
        name: '',
        num: '',
        constructionUnit: '',
        leader: '',
        place: '',
        buildingUnit: '',
        designUnit: '',
        startDate: '',
        phase: '',
        teamInformation: '',
        modelPart: '',
        version: '',
        state: '',
        description: '',
        modelFile: '',
        modelFileName: '',
        picFile: '',
      },
      listLoading: false,
      list: null,
      // page
      totalNumber: 0,
      totalPage: 1,
      // dialog
      dialogFormVisible: false,
      // dialog status
      dialogStatus: '',
      // projectStateList
      projectStateList,
      uploadFileSrc: null,
      rules: {
        name: [{ required: true, message: `${this.$t('project.name')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        num: [{ required: true, message: `${this.$t('project.num')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        constructionUnit: [{ required: true, message: `${this.$t('project.constructionUnit')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        leader: [{ required: true, message: `${this.$t('project.leader')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        place: [{ required: true, message: `${this.$t('project.place')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        buildingUnit: [{ required: true, message: `${this.$t('project.buildingUnit')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        designUnit: [{ required: true, message: `${this.$t('project.designUnit')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        startDate: [{ required: true, message: `${this.$t('project.startDate')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        phase: [{ required: true, message: `${this.$t('project.phase')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        modelPart: [{ required: true, message: `${this.$t('project.modelPart')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        version: [{ required: true, message: `${this.$t('project.version')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        state: [{ required: true, message: `${this.$t('project.state')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        description: [{ required: true, message: `${this.$t('project.description')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    // get project list
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;

      getProjectList(this.listQuery).then((res) => {
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
    handleAddProject() {
      this.dialogStatus = 'add';
      this.dialogFormVisible = true;
      console.log('do add');
    },
    handleSizeChange(val) {
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageIndex = val;
      this.getList();
    },
    handleModelChange(e) {
      const file = e.target.files[0];
      this.project.modelFile = file;
      this.project.modelFileName = file.name;
    },
    handlePicChange(e) {
      const files = e.target.files;
      const file = files[0];
      const self = this;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        self.uploadFileSrc = this.result;
        self.project.picFile = file;
      };
    },
    handleDelete(projectId) {
      this.$confirm(this.$t('message.deleteProject'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete
        deleteProject({
          projectId,
        }).then(() => {
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
      console.log('project', this.project);
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          addProject(this.project).then(() => {
            this.dialogFormVisible = false;
            this.getList();
          });
        }
      });
    },
    resetForm() {
      this.project = {
        id: null,
        name: '',
        num: '',
        constructionUnit: '',
        leader: '',
        place: '',
        buildingUnit: '',
        designUnit: '',
        startDate: '',
        phase: '',
        teamInformation: '',
        modelPart: '',
        version: '',
        state: '',
        description: '',
        modelFile: '',
        modelFileName: '',
        picFile: '',
      };
      // reset file src
      this.$refs.modelInput.value = null;
      this.$refs.picInput.value = null;

      console.log('reset...');
      this.$refs.projectForm.resetFields();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.file-wrapper {
  input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
  }
  .file {
    margin-top: 8px;
    height: 120px;
    width: 120px;
    object-fit: cover;
  }
}
</style>
