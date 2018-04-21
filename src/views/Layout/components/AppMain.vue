<template>
  <section class="app-main">
    <!-- <breadcrumb class="breadcrumb-container"></breadcrumb> -->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>

export default {
  name: 'AppMain',
  created() {
    this.getProjectInfo();
  },
  methods: {
    getProjectInfo() {
      const { params: { id } } = this.$route;

      // if no project info, should fetch it first
      if (!this.$store.getters.project && this.$route.name !== 'project_detail_info') {
        this.$store.dispatch('getProject', { id }).then((res) => {
          res.modelPart = res.modelPart ? res.modelPart.join(',') : null;
          res.teamList = res.teamList ? res.teamList.join(',') : null;
          this.project = { ...this.project, ...res };
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
