<template>
  <div class="app-wrapper">
    <navbar></navbar>
    <section class="common-app-main">
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>

<script>
import { Navbar } from './components';

export default {
  name: 'Layout',
  components: {
    Navbar,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

  .common-app-main {
    width: 1200px;
    margin: 0 auto;
  }

  @media (max-width: 1200px) {
    .common-app-main {
      padding: 0 8px;
      width: 100%;
    }
  }
</style>
