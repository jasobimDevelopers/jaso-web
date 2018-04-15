<template>
  <div class="edit-line flex-row">
    <slot></slot>
    <div class="action-wrapper flex-sb">
      <i class="el-icon-edit-outline hover-cursor" @click="handleEdit()"></i>
      <i class="el-icon-delete hover-cursor"  @click="handleDelete()"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'edit-line',
  props: {
    editInfo: Object,
  },
  methods: {
    handleEdit() {
      this.$emit('onEdit', this.editInfo);
    },
    handleDelete() {
      this.$emit('onDelete', this.editInfo);
    },
  },
};
</script>

<style lang="scss" scoped>
  .edit-line {
    position: relative;
    min-height: 48px;

    .action-wrapper {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: 80px;
      padding: 15px;
      font-size: 16px;
    }

    &:hover {
      .action-wrapper {
        display: flex;
      }
    }
  }
</style>
