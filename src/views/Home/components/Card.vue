<template>
  <div :class="`card ${direction}`">
    <svg-icon :icon-class="iconClass" :size="iconSize"></svg-icon>
    <template v-if="direction === 'vertical'">
      <div class="title">{{ title }}</div>
      <div class="content">{{ content }}</div>
    </template>
    <div class="wrapper" :style="contentStyle" v-else>
      <div class="title">{{ title }}</div>
      <div class="content">{{ content }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    direction: {
      type: String,
      default: 'vertical',
    },
    iconClass: {
      type: String,
      default: null,
    },
    iconSize: {
      type: String,
      default: '54',
    },
    title: String,
    content: String,
    contentStyle: Object,
  },
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .card {
    padding: 32px 36px;
    background: #FFFFFF;
    box-shadow: 0 0 9px 0 #E1E8F7;
    border-radius: 2px;

    .title {
      font-size: 20px;
      color: #303133;
      line-height: 28px;
    }

    .content {
      margin-top: 10px;
      font-size: 16px;
      color: #909399;
      line-height: 22px;
    }

    &.vertical {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      .title {
        margin-top: 27px;
      }
    }

    &.line {
      padding-left: 40px;
      padding-right: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .wrapper {
        margin-left: 15px;
      }
    }
  }
</style>
