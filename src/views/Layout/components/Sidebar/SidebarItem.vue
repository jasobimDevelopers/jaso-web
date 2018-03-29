<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <div class="menu-block" :key="item.name">
        <header class="menu-header flex-row">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <div>{{ item.meta.title }}</div>
        </header>
        <div class="menu-list" v-if="item.children.length > 0">
          <router-link :to="`/${item.meta.basePath}/${projectId}/${menu.path}`" v-for="menu in item.children" :key="menu.name">
            <span>{{ menu.meta.title }}</span>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n';

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array,
    },
  },
  computed: {
    projectId() {
      const { params } = this.$route;
      const id = (params && params.id) ? params.id : null;

      return id;
    },
  },
  methods: {
    generateTitle,
  },
  mounted() {
    console.log('this.$route', this.$route);
    console.log(this.routes);
  },
};
</script>
