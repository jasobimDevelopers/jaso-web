<template>
  <div id="app">
    <router-view/>
    <grid></grid>
    <gallery></gallery>
  </div>
</template>

<script>
import Grid from '@/components/Grid';
import Gallery from '@/components/Gallery';

export default {
  name: 'App',
  components: {
    Grid,
    Gallery,
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
