<template>
  <div class="message-item flex-sb">
    <div class="flex">
      <jaso-avatar :avatar="message.userIconUrl | setFileRoot"></jaso-avatar>
      <div class="user-info flex-column">
        <span class="username">{{ message.userName }}</span>
        <span class="date">{{ message.messageDate }}</span>
        <div class="content" v-html="message.content"></div>
      </div>
    </div>
    <div class="action-wrapper" v-if="roles.indexOf('admin') > -1">
      <div class="flex-row">
        <!-- <el-button type="primary" size="mini" @click="handleUpdate">{{$t('btn.edit')}}</el-button> -->
        <el-button type="danger" size="mini" @click="handleDelete">{{$t('btn.delete')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'MessageItem',
  props: {
    // from: which comp to call it
    message: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'roles',
    ]),
  },
  methods: {
    handleUpdate() {
      this.$emit('update', this.message);
    },
    handleDelete() {
      this.$emit('delete', this.message.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.message-item {
  margin-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ebeef5;

  .user-info {
    margin-left: 15px;

    .date {
      margin-top: 4px;
      font-size: 12px;
    }
    .content {
      margin-top: 4px;
    }
  }
}
</style>
