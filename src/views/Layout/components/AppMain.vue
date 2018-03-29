<template>
  <section class="app-main">
    <breadcrumb class="breadcrumb-container"></breadcrumb>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb';

export default {
  name: 'AppMain',
  components: {
    Breadcrumb,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
