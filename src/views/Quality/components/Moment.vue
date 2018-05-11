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

      <div v-if="userInfo.id === moment.userid && moment.state !== 1">
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="handleUpdateState">完成</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>

    <div v-if="moment.state === 1" class="state-wrapper">
      <svg-icon icon-class="已完成" size="120"></svg-icon>
    </div>

    <div class="content">
      <div class="flex item">
        <div class="label">检查部位：</div>
        <div>{{ moment.name }}</div>
      </div>
      <div class="flex item">
        <div class="label">存在隐患：</div>
        <div>{{ moment.intro }}</div>
      </div>
      <div class="flex item">
        <div class="label">整改措施：</div>
        <div>{{ moment.trades }}</div>
      </div>
      <div class="flex item">
        <div class="label">问题程度：</div>
        <div>{{ questionOfPriorityList[moment.priority + 1] }}</div>
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
            :url="item | setFileRoot"
            @resetAudioList="handleResetAudioList"
          ></sound-item>
        </div>
      </div>
    </div>

    <div class="flex-end">
      <div :class="['expand-message hover-cursor', { expand }]" @click="handleExpand">
        {{ expand ? `收起回复(${moment.messageNum})` : `展开回复(${moment.messageNum})` }}
      </div>
    </div>
    <div v-if="expand" class="message-wrapper">
      <message-tool @sendMessage="handleSendMassage" ref="messageTool"></message-tool>
      <div class="message-list">
        <div class="message-item flex" v-for="item in messageList" :key="item.id">
          <jaso-avatar :avatar="item.userIconUrl | setFileRoot" :size="32" shape="square"></jaso-avatar>
          <div class="info">
            <section>{{ `${item.realName}：${item.content}` }}</section>
            <template v-for="(file, i) in item.fileList">
              <section v-if="validateImageFile(file)" class="images-wrapper" :key="i">
                <section class="images-wrapper">
                  <zooming-img
                    :src="file | setFileRoot"
                    class="img-item"
                  ></zooming-img>
                </section>
              </section>

              <section v-if="validateAudioFile(file)" class="sounds-wrapper" :key="i">
                <sound-item
                  v-for="(item, i) in soundList"
                  :key="i"
                  :url="item | setFileRoot"
                  @resetAudioList="handleResetAudioList"
                ></sound-item>
              </section>
            </template>
            <section class="date">{{ item.messageDate }}</section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { addMessage, getMessageListByQualityId, getMessageListByQuestionId } from '@/api/message';
import { updateQuestionState } from '@/api/security';
import { updateQualityState } from '@/api/quality';
import { validateImageFile, validateAudioFile } from '@/utils/validate';
import { questionOfPriorityList } from '@/filters';
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
    ...mapGetters([
      'userInfo',
    ]),
    imgList() {
      const { fileList } = this.moment;
      let imgList = [];

      if (fileList) {
        imgList = fileList.filter(file => validateImageFile(file));
      }

      return imgList;
    },
    soundList() {
      const { fileList } = this.moment;
      let soundList = [];

      if (fileList) {
        soundList = fileList.filter(file => validateAudioFile(file));
      }

      return soundList;
    },
  },
  data() {
    return {
      expand: false,
      messageList: [],
      questionOfPriorityList,
    };
  },
  methods: {
    validateImageFile,
    validateAudioFile,
    getMessageList() {
      if (this.type === 0) {
        getMessageListByQualityId({
          qualityId: this.moment.id,
          pageIndex: -1,
        }).then((res) => {
          const { data } = res;
          this.messageList = data;
        });
      } else {
        getMessageListByQuestionId({
          questionId: this.moment.id,
          pageIndex: -1,
        }).then((res) => {
          const { data } = res;
          this.messageList = data;
        });
      }
    },
    handleExpand() {
      this.expand = !this.expand;

      if (this.expand) {
        this.getMessageList();
      }
    },
    handleUpdateState() {
      this.$confirm('确定更改整改单状态？', this.$t('message.prompt'), {
        confirmButtonText: this.$t('btn.comfirm'),
        cancelButtonText: this.$t('btn.cancel'),
        type: 'warning',
      }).then(() => {
        if (this.type === 0) {
          updateQualityState({
            qualityId: this.moment.id,
            state: 1,
          }).then(() => {
            this.$emit('refreshList');
          });
        } else {
          updateQuestionState({
            questionId: this.moment.id,
            state: 1,
          }).then(() => {
            this.$emit('refreshList');
          });
        }
      }).catch(() => {});
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
        this.moment.messageNum += 1;
        this.$refs.messageTool.clearMessage();
        this.getMessageList();
      });
    },
    handleResetAudioList() {
      this.$emit('resetAudioList');
    },
    resetAudioList() {
      // TODO: maybe it's not the best way to control audio list
      this.$children.forEach((comp) => {
        if (comp.isAudio) {
          comp.resetAudio();
        }
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
    position: relative;
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

    .state-wrapper {
      position: absolute;
      top: 16px;
      right: 16px;
      transform: rotate(45deg);
      opacity: 0.6;
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
      padding: 32px 16px 24px 56px;
      border: 1px solid #ececec;
      background-color: #f8f9fa;

      .message-list {
        margin-top: 24px;

        .message-item {
          margin-bottom: 15px;
          font-size: 12px;

          .images-wrapper {
            margin-top: 8px;

            .img-item {
              margin-right: 4px;
              width: 64px;
              height: 64px;
              object-fit: cover;
            }
          }

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

    .expand-message {
      margin-top: 16px;
      padding: 8px;
      color: #409EFF;
      font-size: 12px;
      border: 1px solid transparent;

      &.expand {
        border-color: #ececec;
        border-bottom: transparent;
        background-color: #f8f9fa;
      }
    }
  }
</style>
