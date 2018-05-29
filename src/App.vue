<template>
  <div id="app">
    <router-view/>
    <gallery></gallery>
  </div>
</template>

<script>
import Gallery from '@/components/Gallery';

export default {
  name: 'App',
  components: {
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
