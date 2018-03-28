<template>
  <div class="app-sidebar">
    <sidebar-item :routes="permission_routers"></sidebar-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ScrollBar from '@/components/ScrollBar';
import SidebarItem from './SidebarItem';

export default {
  name: 'Sidebar',
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar',
    ]),
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
