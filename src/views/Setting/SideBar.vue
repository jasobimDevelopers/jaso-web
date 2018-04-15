<template>
  <div class="setting-side-bar">
    <div
      :class="activeTab === i ? 'side-item active' : 'side-item'"
      v-for="(item, i) in list"
      :key="i"
      @click="handleTab(i)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      list: ['组织架构', '职务权限', '班组管理'],
    };
  },
  methods: {
    handleTab(i) {
      this.$emit('onTabChange', i);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .setting-side-bar {
    padding-top: 18px;
    padding-left: 40px;
    font-size: 14px;

    .side-item {
      margin-bottom: 18px;

      &.active {
        color: #409EFF;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
