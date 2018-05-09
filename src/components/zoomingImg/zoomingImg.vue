<template>
  <img ref="img" :src="src" />
</template>

<script>
// zooming
import Zooming from 'zooming';

export default {
  name: 'ZoomingImg',
  props: {
    src: String,
  },
  mounted() {
    const zooming = new Zooming();
    this.$nextTick(() => {
      zooming.listen(this.$refs.img);
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
