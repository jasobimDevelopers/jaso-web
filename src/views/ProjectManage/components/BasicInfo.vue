<template>
  <div>
    <el-form :rules="rules" ref="projectForm" :model="project" label-position="right" label-width="120px" style='width: 400px; margin-left:50px;'>
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
          <div style="marginLeft: 8px;">{{project.modelFileName}}</div>
        </div>
      </el-form-item>
      <el-form-item :label="$t('project.picFile')" prop="picFile">
        <div class="upload-file-wrapper flex-column">
          <el-button type="primary" style="width: 100px">
            <input type="file" ref="picInput" @change="handlePicChange" />
            <span>上传</span>
          </el-button>
          <img v-if="uploadFileSrc" class="file" :src="uploadFileSrc" />
        </div>
      </el-form-item>

      <div class="action-wrapper">
        <el-button @click="handleBack">{{$t('btn.cancel')}}</el-button>
        <el-button type="primary" @click="handleSave">{{$t('btn.comfirm')}}</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { updateProject } from '@/api/projectManage';
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
        modelFileName: '',
        picFile: '',
      },
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
      },
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const { params: { id } } = this.$route;
      this.$store.dispatch('getBuildingInfo', { id });
      this.$store.dispatch('getProject', { id }).then((res) => {
        res.modelPart = res.modelPart.join(',');
        res.teamList = res.teamList.join(',');
        this.project = { ...this.project, ...res };
      });
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
    handleSave() {
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          updateProject(this.project).then(() => {
            this.$message({
              type: 'success',
              message: this.$t('message.operationSuccess'),
            });
          });
        }
      });
    },
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.action-wrapper {
  padding: 24px 0;
  display: flex;
  justify-content: flex-end;
}
</style>
