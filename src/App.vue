<template>
  <div id="app">
    <router-view/>
    <grid></grid>
  </div>
</template>

<script>
import Grid from '@/components/Grid';

export default {
  name: 'App',
  components: {
    Grid,
  },
};
</script>

<style>
#app {
  font-family: '微软雅黑', 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
