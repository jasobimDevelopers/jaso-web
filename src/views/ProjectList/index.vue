<template>
  <div class="project-list">
    <div class="filter-wrapper">
      <el-input placeholder="请输入内容" v-model="keyword">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>

    <div class="list-wrapper">
      <router-link
        :to="`/project/${item.id}/project_detail_info`"
        class="item"
        v-for="item in list"
        v-if="keyword.trim() === '' || item.name.indexOf(keyword) > -1"
        :key="item.id"
      >
        <img v-if="item.picUrl !== ''" :src="item.picUrl | setFileRoot" />
        <img v-else src="@/assets/images/project-bg.png" />
        <div class="name">{{ item.name }}</div>
        <div class="user-info">负责人：{{ item.leader }}</div>
      </router-link>
      <div class="item add-item hover-cursor" @click="addProject">
        <svg-icon icon-class="eye"></svg-icon>
        <div class="action-name">创建新项目</div>
      </div>
    </div>

    <!-- dialog -->
    <el-dialog
      title="创建项目"
      :visible.sync="dialogFormVisible"
      @close="resetForm"
      width="540px"
    >
      <el-form :rules="rules" ref="dialogForm" :model="project" label-position="left" label-width="80px" style='width: 440px; margin-left:30px;'>
        <el-form-item :label="$t('project.name')" prop="name">
          <el-input v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.leader')" prop="leader">
          <el-input v-model="project.leader"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.place')" prop="place">
          <el-input v-model="project.place"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.startDate')" prop="startDate">
          <el-date-picker
            v-model="project.dateValue"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="filter-item"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="handleDateChange"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('project.description')" prop="description">
          <el-input type="textarea" v-model="project.description"></el-input>
        </el-form-item>
        <el-form-item :label="$t('project.picFile')" prop="picFile">
          <div class="upload-file-wrapper flex-column">
            <el-button type="primary" style="width: 100px">
              <input type="file" ref="picInput" accept="image/*" @change="handlePicChange" />
              <span>上传</span>
            </el-button>
            <div style="font-size: 14px;">只能上传jpg/png文件，且不超过500kb</div>
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
import { getProjectList, addProject } from '@/api/projectManage';

export default {
  name: 'ProjectList',
  data() {
    return {
      keyword: '',
      list: [],
      project: {
        name: '',
        leader: '',
        place: '',
        startDate: null,
        finishedDate: null,
        picFile: '',
      },
      // date
      dateValue: '',
      // dialog
      dialogFormVisible: false,
      // rules
      rules: {
        name: [{ required: true, message: `${this.$t('project.name')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        leader: [{ required: true, message: `${this.$t('project.leader')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        place: [{ required: true, message: `${this.$t('project.place')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        startDate: [{ required: true, message: `${this.$t('project.startDate')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        description: [{ required: true, message: `${this.$t('project.description')}${this.$t('message.notEmpty')}`, trigger: 'blur' }],
        picFile: [{ required: true, message: `${this.$t('project.picFile')}${this.$t('message.notEmpty')}`, trigger: 'change' }],
      },
      uploadFileSrc: null,
      loading: false,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      getProjectList({ pageIndex: -1 }).then((res) => {
        const { data } = res;
        this.list = data;
      });
    },
    addProject() {
      this.dialogFormVisible = true;
    },
    handleSave() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          addProject(this.project).then(() => {
            this.dialogFormVisible = false;
            this.getList();
          });
        }
      });
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
    handleDateChange(dateArr) {
      if (dateArr) {
        this.project.startDate = dateArr[0];
        this.project.finishedDate = dateArr[1];
      } else {
        this.project.startDate = null;
        this.project.finishedDate = null;
      }
    },
    resetForm() {
      // reset file src
      this.uploadFileSrc = null;
      this.$refs.picInput.value = null;
      this.$refs.dialogForm.resetFields();
      this.$refs.dialogForm.$el.reset();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .filter-wrapper {
    margin: 24px 0;
    width: 490px;
  }

  .list-wrapper {
    display: flex;
    flex-wrap: wrap;

    .item {
      position: relative;
      margin-right: 20px;
      margin-bottom: 20px;
      width: 280px;
      height: 180px;
      color: #ffffff;
      background-color: #EBEEF5;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .name {
        position: absolute;
        left: 28px;
        bottom: 42px;
      }

      .user-info {
        position: absolute;
        left: 28px;
        bottom: 20px;
        font-size: 14px;
      }
    }

    .add-item {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      color: #409EFF;

      .action-name {
        margin-top: 15px;
      }
    }
  }

  // media
  @media (max-width: 768px) {
    .filter-wrapper {
      width: 100%;
    }
  }
</style>
