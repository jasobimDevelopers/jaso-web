<template>
  <div>
    <router-link to="/login">
      <el-button type="primary">{{$t('login.logIn')}}</el-button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
