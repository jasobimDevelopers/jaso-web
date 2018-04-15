<template>
  <div class="setting main-container">
    <side-bar class="sidebar-container" :activeTab="activeTab" @onTabChange="handleTabChange"></side-bar>
    <div class="app-main admin-container">
      <department v-if="activeTab === 0"></department>
      <position v-if="activeTab === 1"></position>
      <work-group v-if="activeTab === 2"></work-group>
    </div>
  </div>
</template>

<script>
import SideBar from './SideBar';
import Department from './Department';
import Position from './Position';
import WorkGroup from './WorkGroup';

export default {
  name: 'Setting',
  data() {
    return {
      activeTab: 0,
    };
  },
  components: {
    SideBar,
    Department,
    Position,
    WorkGroup,
  },
  methods: {
    handleTabChange(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .admin-container {
    padding: 15px 29px;
    font-size: 14px;

    .admin-header {
      border-bottom: 1px solid #DCDFE6;
    }

    .title {
      font-weight: bolder;
    }
  }

  // media
  @media (max-width: 1200px) {
    .admin-container {
      padding: 0 8px;
      width: 100%;
    }
  }
</style>
