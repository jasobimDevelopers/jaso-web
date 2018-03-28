<template>
  <div class="app-wrapper">
    <navbar></navbar>
    <app-main></app-main>
  </div>
</template>

<script>
import { Navbar, AppMain } from './components';

export default {
  name: 'Layout',
  components: {
    Navbar,
    AppMain,
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
</style>
