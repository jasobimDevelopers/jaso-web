<template>
  <div class="menu-wrapper">
    <router-link to="/projectList/index" v-if="project" class="project-name" style="width: 100%; margin-bottom: 0">
      <i class="el-icon-sort"></i>
      <span>{{ project.name | spliteWords(6) }}</span>
    </router-link>
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <div class="menu-block" :key="item.name">
        <header class="menu-header flex-row">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon" size="18px"></svg-icon>
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
import { mapGetters } from 'vuex';
import { generateTitle } from '@/utils/i18n';

export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array,
    },
  },
  computed: {
    ...mapGetters([
      'project',
    ]),
    projectId() {
      const { params } = this.$route;
      const id = (params && params.id) ? params.id : null;

      return id;
    },
  },
  methods: {
    generateTitle,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .project-name {
    height: 48px;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    line-height: 48px;
    background: #409EFF;

    .el-icon-sort {
      transform: rotate(90deg);
    }
  }
</style>
