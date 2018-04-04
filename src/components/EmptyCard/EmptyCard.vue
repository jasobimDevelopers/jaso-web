<template>
  <div class="empty-card flex-center">
    <div>{{ message }}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'empty-card',
  props: {
    message: String,
  },
};
</script>

<style lang="scss" scoped>
  .empty-card {
    color: #409EFF;
    line-height: 200px;
  }
</style>
