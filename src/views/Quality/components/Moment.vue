<template>
  <div class="moment">
    <header class="flex-sb-start">
      <div class="user-info flex-row">
        <jaso-avatar :avatar="moment.createUserIcon | setFileRoot" :size="48"></jaso-avatar>
        <div class="sub-info flex-column">
          <div class="username">{{ moment.userId }}</div>
          <div class="date">{{ moment.questionDate }}</div>
        </div>
      </div>

      <div>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>完成</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>

    <div class="content">
      <div class="flex item">
        <div class="label">问题名称：</div>
        <div>{{ moment.name }}</div>
      </div>
      <div class="flex item">
        <div class="label">问题详情：</div>
        <div>{{ moment.intro }}</div>
      </div>
      <div class="flex item">
        <div class="label">指定人员：</div>
        <div>{{ moment.userNameLists && moment.userNameLists.join('、') }}</div>
      </div>

      <div class="files-wrapper">
        <div class="images-wrapper">
          <zooming-img
            v-for="(item, i) in imgList"
            :key="i"
            :src="item | setFileRoot"
            class="img-item"
          ></zooming-img>
        </div>

        <div class="sounds-wrapper">
          <sound-item
            v-for="(item, i) in soundList"
            :key="i"
            :url="item"
          ></sound-item>
        </div>
      </div>
    </div>

    <div class="message-wrapper">
      <message-tool @sendMessage="handleSendMassage" ref="messageTool"></message-tool>
      <div class="message-list">
        <div class="message-item flex-row">
          <jaso-avatar :avatar="`http://jasobim.com:8080/files/userIcons/28212b41427b93c6eb6973aa2dea22de.jpg`" :size="32" shape="square"></jaso-avatar>
          <div class="info">
            <section>李洋：问题已整改完成</section>
            <section class="date">10s前</section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addMessage, getMessageListByQualityId, getMessageListByQuestionId } from '@/api/message';
import { validateImageFile } from '@/utils/validate';
import MessageTool from './MessageTool';
import SoundItem from './SoundItem';

export default {
  name: 'Moment',
  components: {
    MessageTool,
    SoundItem,
  },
  props: {
    moment: Object,
    type: {
      type: Number,
      required: true,
      default: 0, // 0: 质量, 1: 安全
    },
  },
  computed: {
    imgList() {
      const { fileList } = this.moment;
      let imgList = [];

      if (fileList) {
        imgList = fileList.filter((file) => {
          const tempArr = file.split('.');
          return validateImageFile(tempArr[tempArr.length - 1]);
        });
      }

      return imgList;
    },
    soundList() {
      return ['https://onehower.oss-cn-shenzhen.aliyuncs.com/audio/1/%E5%91%A8%E4%BA%8C%E7%8F%82%20-%20%E5%91%8A%E7%99%BD%E6%B0%94%E7%90%83.mp3'];
    },
  },
  data() {
    return {
    };
  },
  methods: {
    getMessageList() {
      if (this.type === 0) {
        getMessageListByQualityId({
          qualityId: this.moment.id,
        }).then((res) => {
          console.log('res', res);
        });
      } else {
        getMessageListByQuestionId({
          questionId: this.moment.id,
        }).then((res) => {
          console.log('res', res);
        });
      }
    },
    handleSendMassage(payload) {
      const { params: { id } } = this.$route;
      const { fileArray, message } = payload;

      addMessage({
        projectId: id,
        file: fileArray,
        content: message,
        aboutId: this.moment.id,
        questionType: this.type,
      }).then(() => {
        this.$refs.messageTool.clearMessage();
        this.getMessageList();
      });
    },
  },
};
</script>

<style lang="scss">
  .moment {
    .el-dropdown-link {
      color: #000000;
    }
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .moment {
    padding: 20px 0;
    border-bottom: 1px solid #f6f6f6;

    .user-info {
      .sub-info {
        margin-left: 8px;

        .username {
          font-weight: bolder;
        }

        .date {
          margin-top: 8px;
          color: 606266;
          font-size: 12px;
        }
      }
    }

    .content {
      padding-left: 56px;

      .label {
        width: 72px;
      }

      .item {
        margin-bottom: 4px;
      }
    }

    .files-wrapper {
      .images-wrapper {
        margin-top: 8px;

        .img-item {
          margin-right: 4px;
          width: 100px;
          height: 100px;
          object-fit: cover;
        }
      }
    }

    .message-wrapper {
      margin-top: 30px;
      padding-left: 56px;

      .message-list {
        margin-top: 24px;

        .message-item {
          font-size: 12px;

          .info {
            margin-left: 8px;

            .date {
              margin-top: 8px;
            }
          }
        }
      }
    }

    .sound-item {
      margin-top: 4px;
    }
  }
</style>
