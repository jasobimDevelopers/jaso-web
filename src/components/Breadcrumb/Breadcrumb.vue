<template>
  <div class="app-breadcrumb flex-sb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index)  in levelList" :key="item.path" v-if='item.meta.title'>
          <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{generateTitle(item.meta.title)}}</span>
          <router-link v-else :to="backUrl">{{generateTitle(item.meta.title)}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>

    <slot></slot>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n';

export default {
  name: 'breadcrumb',
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null,
      backUrl: '/',
    };
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
    },
  },
  methods: {
    generateTitle,
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.name);

      this.levelList = matched;
      this.getBackUrl();
    },
    getBackUrl() {
      const routers = this.$store.getters.permission_routers;
      const rootPath = this.levelList[0].name;

      routers.forEach((router) => {
        if (router.children && router.children.length > 0 && router.name === rootPath) {
          this.backUrl = `/${router.name}/${this.projectId}/${router.children[0].name}`;
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb {
    margin-left: 30px;
    margin-right: 30px;
    border-bottom: 1px solid #DCDFE6;

    .el-breadcrumb {
      display: flex;
      font-size: 14px;
      line-height: 48px;

      .no-redirect {
        cursor: text;
      }
    }
  }
</style>
