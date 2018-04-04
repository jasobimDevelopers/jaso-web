<template>
  <div class="info-container">
    <div v-if="actionStatus === 'view'" class="view-info">
      <div class="header flex-sb-start">
        <div class="info-wrapper">
          <zooming-img v-if="project.picUrl !== ''" :src="project.picUrl | setFileRoot" />
        </div>
        <div class="info-wrapper basic-info">
          <div class="flex-end">
            <el-button type="primary" @click="actionStatus = 'edit'">{{$t('btn.edit')}}</el-button>
          </div>
          <div class="name">{{ project.name }}</div>
          <div class="desc">{{ project.description }}</div>
        </div>
      </div>
      <div class="info-list">
        <div class="info-item info-wrapper">
          <span class="label">项目简称：</span>
          <span class="value">无锡万科</span>
        </div>
        <div class="info-item info-wrapper">
          <span class="label">施工时间：</span>
          <span class="value">{{ project.startDate }}</span>
        </div>
        <div class="info-item info-wrapper">
          <span class="label">项目名称：</span>
          <span class="value">{{ project.name }}</span>
        </div>
        <div class="info-item info-wrapper">
          <span class="label">施工周期：</span>
          <span class="value">{{ project.phase }}</span>
        </div>
        <div class="info-item info-wrapper">
          <span class="label">施工地点：</span>
          <span class="value">{{ project.place }}</span>
        </div>
        <div class="info-item info-wrapper">
          <span class="label">项目负责人：</span>
          <span class="value">{{ project.leader }}</span>
        </div>
        <div class="info-wrapper">
          <div class="info-item">
            <span class="label">建设单位：</span>
            <span class="value">{{ project.buildingUnit }}</span>
          </div>
          <div class="info-item sub-info">
            <span class="label">联系人：</span>
            <span class="value">{{ project.buildingUnitUser }}</span>
          </div>
        </div>
        <div class="info-item info-wrapper">
          <div class="info-item">
            <span class="label">施工单位：</span>
            <span class="value">{{ project.constructionUnit }}</span>
          </div>
          <div class="info-item sub-info">
            <span class="label">联系人：</span>
            <span class="value">{{ project.constructionUnitUser }}</span>
          </div>
        </div>
        <div class="info-wrapper">
          <div class="info-item">
            <span class="label">设计单位：</span>
            <span class="value">{{ project.designUnit }}</span>
          </div>
          <div class="info-item sub-info">
            <span class="label">联系人：</span>
            <span class="value">{{ project.designUnitUser }}</span>
          </div>
        </div>
        <div class="info-wrapper">
          <div class="info-item">
            <span class="label">监理单位：</span>
            <span class="value">{{ project.constructionControlUnit }}</span>
          </div>
          <div class="info-item sub-info">
            <span class="label">联系人：</span>
            <span class="value">{{ project.constructionControlUser }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="flex-end">
        <el-button type="danger" @click="handleDelete">{{$t('btn.delete')}}</el-button>
      </div>
      <el-form :rules="rules" ref="projectForm" :model="project" label-position="left" label-width="120px" style='width: 400px; margin-left:50px;'>
        <el-form-item :label="$t('project.name')" prop="name">
          <el-input v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.num')" prop="num">
          <el-input v-model="project.num"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.leader')" prop="leader">
          <el-input v-model="project.leader"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.place')" prop="place">
          <el-input v-model="project.place"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.constructionUnit')" prop="constructionUnit">
          <el-input v-model="project.constructionUnit"></el-input>
        </el-form-item>
        <el-form-item :label="`${$t('project.constructionUnit')}${$t('project.contact')}`" prop="constructionUnitUser">
          <el-input v-model="project.constructionUnitUser"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.buildingUnit')" prop="buildingUnit">
          <el-input v-model="project.buildingUnit"></el-input>
        </el-form-item>
        <el-form-item :label="`${$t('project.buildingUnit')}${$t('project.contact')}`" prop="buildingUnitUser">
          <el-input v-model="project.buildingUnitUser"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.constructionControlUnit')" prop="constructionControlUnit">
          <el-input v-model="project.constructionControlUnit"></el-input>
        </el-form-item>
        <el-form-item :label="`${$t('project.constructionControlUnit')}${$t('project.contact')}`" prop="constructionControlUser">
          <el-input v-model="project.constructionControlUser"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.designUnit')" prop="designUnit">
          <el-input v-model="project.designUnit"></el-input>
        </el-form-item>
        <el-form-item :label="`${$t('project.designUnit')}${$t('project.contact')}`" prop="designUnitUser">
          <el-input v-model="project.designUnitUser"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.startDate')" prop="startDate">
          <el-input v-model="project.startDate"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.phase')" prop="phase">
          <el-input v-model="project.phase"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.teamList')" prop="teamList">
          <el-input v-model="project.teamList"></el-input>
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
          <div class="upload-file-wrapper flex-row">
            <el-button type="primary" style="width: 100px">
              <input type="file" ref="modelInput" @change="handleModelChange" />
              <span>上传</span>
            </el-button>
            <div style="marginLeft: 8px;">{{project.modelName}}</div>
          </div>
        </el-form-item>
        <el-form-item :label="$t('project.picFile')" prop="picFile">
          <div class="upload-file-wrapper flex-column">
            <el-button type="primary" style="width: 100px">
              <input type="file" ref="picInput" @change="handlePicChange" />
              <span>上传</span>
            </el-button>
            <img v-if="uploadFileSrc" class="file" :src="uploadFileSrc" />
            <img v-else-if="project.picUrl" class="file" :src="project.picUrl | setFileRoot" />
          </div>
        </el-form-item>

        <div class="action-wrapper">
          <el-button @click="actionStatus = 'view'">{{$t('btn.cancel')}}</el-button>
          <el-button type="primary" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updateProject, deleteProject } from '@/api/projectManage';
import { projectStateList } from '@/filters';

export default {
  name: 'BasicInfo',
  data() {
    return {
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
        teamList: '',
        modelPart: '',
        version: '',
        state: '',
        description: '',
        modelFile: '',
        modelName: '',
        picFile: '',
        picUrl: '',
        constructionControlUnit: '',
        constructionUnitUser: '',
        buildingUnitUser: '',
        constructionControlUser: '',
        designUnitUser: '',
      },
      // status
      actionStatus: 'view',
      // filters
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
        constructionControlUnit: [{ required: true, message: `${this.$t('project.constructionControlUnit')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const { params: { id } } = this.$route;
      // this.$store.dispatch('getBuildingInfo', { id });
      this.$store.dispatch('getProject', { id }).then((res) => {
        res.modelPart = res.modelPart ? res.modelPart.join(',') : null;
        res.teamList = res.teamList ? res.teamList.join(',') : null;
        this.project = { ...this.project, ...res };
      });
    },
    handleModelChange(e) {
      const file = e.target.files[0];
      this.project.modelFile = file;
      this.project.modelName = file.name;
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
    handleDelete() {
      const { params: { id } } = this.$route;
      this.$confirm(this.$t('message.deleteProject'), this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        // delete
        deleteProject({
          projectId: id,
        }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('message.deleteOk'),
          });

          this.$router.replace('/projectList');
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.deleteCancel'),
        });
      });
    },
    handleSave() {
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          updateProject(this.project).then(() => {
            this.$message({
              type: 'success',
              message: this.$t('message.operationSuccess'),
            });

            this.actionStatus = 'view';
            this.getInfo();
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.info-container {
  padding: 30px;

  .info-wrapper {
    width: 50%;
  }

  .info-list {
    display: flex;
    flex-wrap: wrap;
    .info-wrapper {
      margin-top: 44px;
    }

    .info-item {
      font-size: 14px;

      .value {
        color: #909399;
      }
    }

    .sub-info {
      margin-top: 14px;
    }
  }
}

.header {
  img {
    width: 400px;
    height: 280px;
    object-fit: cover;
  }

  .basic-info {
    flex: 1;
    font-size: 14px;
    color: #909399;
    line-height: 36px;

    .name {
      margin-top: 20px;
      font-size: 30px;
      color: #303133;
    }
  }
}

.action-wrapper {
  padding: 24px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
