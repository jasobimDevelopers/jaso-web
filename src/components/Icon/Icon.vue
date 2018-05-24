<template>
  <svg :width="width ? width : size" :height="height ? height : size" :class="className">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'svg-icon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: '24px',
    },
    className: {
      type: String,
      default: 'svg-icon',
    },
    width: Number,
    height: Number,
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
  },
};
</script>

<style scoped>
.svg-icon {
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
