<template>
  <el-breadcrumb class="app-breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index)  in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{generateTitle(item.meta.title)}}</span>
        <router-link v-else :to="item.redirect ||  `/${item.meta.basePath}/${projectId}/${item.meta.redirect}`">{{generateTitle(item.meta.title)}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { generateTitle } from '@/utils/i18n';

export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null,
    }
  },
  computed: {
    projectId() {
      const { params } = this.$route;
      const id = (params && params.id) ? params.id : null;

      return id;
    },
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      console.log('matched', matched);

      this.levelList = matched;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: flex;
    margin-left: 30px;
    margin-right: 30px;
    font-size: 14px;
    line-height: 50px;
    border-bottom: 1px solid #DCDFE6;

    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
