<template>
  <div class="message-tool">
    <div class=" flex-row">
      <jaso-avatar :avatar="userInfo.userIconUrl | setFileRoot" :size="32" shape="square"></jaso-avatar>
      <el-input placeholder="请输入内容" v-model="message">
      </el-input>
      <div class="upload-item" @click="handleFile">
        <i class="el-icon-picture"></i>
        <input type="file" ref="file" accept="image/*" @change="handleChange($event)" />
      </div>
      <el-button type="primary" @click="handleSendMassage">评论</el-button>
    </div>
    <div class="upload-files">
      <div
        class="file-item"
        v-for="(item, i) in fileList"
        :key="i"
      >
        <img :src="item.uploadSrc" :alt="item.file.name" />
        <i class="el-icon-error" @click="handleRemoveFile(i)"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

const MAX_UPLOAD_COUNT = 9;
export default {
  name: 'MessageTool',
  computed: {
    ...mapGetters([
      'userInfo',
    ]),
  },
  data() {
    return {
      message: '',
      fileList: [],
    };
  },
  methods: {
    handleFile() {
      if (this.fileList.length >= MAX_UPLOAD_COUNT) {
        this.$message({
          type: 'info',
          message: `最多可上传${MAX_UPLOAD_COUNT}张图片`,
        });
        return;
      }

      this.$refs.file.click();
    },
    handleChange(e) {
      const files = e.target.files;
      const file = files[0];
      const self = this;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        self.fileList.push({
          file,
          uploadSrc: this.result,
        });

        self.$refs.file.value = null;
      };
    },
    handleRemoveFile(index) {
      this.fileList.splice(index, 1);
    },
    clearMessage() {
      this.message = '';
      this.fileList = [];
    },
    handleSendMassage() {
      const { message, fileList } = this;

      if (message.trim() === '') {
        this.$message({
          type: 'info',
          message: '请输入内容',
        });
        return;
      }

      const fileArray = fileList.map(item => item.file);

      this.$emit('sendMessage', { message, fileArray });
    },
  },
};
</script>

<style lang="scss">
  .message-tool {
    .el-input--medium .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .message-tool {
    .el-input {
      margin-left: 12px;
    }

    .upload-item {
      position: relative;
      margin-left: 20px;
      margin-right: 28px;
      font-size: 28px;

      &:hover {
        cursor: pointer;
      }

      input {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -10;
      }
    }

    .upload-files {
      margin-top: 8px;

      .file-item {
        position: relative;
        display: inline-block;
        margin-right: 8px;
        width: 96px;
        height: 96px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        i {
          position: absolute;
          top: 8px;
          right: 8px;
          color: #f56c6c;

          &:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
