<template>
  <div class="moment">
    <header class="flex-sb">
      <div class="user-info flex-row">
        <jaso-avatar :avatar="moment.createUserIcon | setFileRoot" :size="48"></jaso-avatar>
        <div class="sub-info flex-column">
          <div class="username">{{ moment.userId }}</div>
          <div class="date">{{ moment.questionDate }}</div>
        </div>
      </div>

      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>完成</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Moment',
  props: {
    moment: Object,
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .moment {
    padding: 20px 0;

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
  }
</style>
