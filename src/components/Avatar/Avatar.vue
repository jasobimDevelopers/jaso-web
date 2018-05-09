<template>
  <div :class="`jaso-avatar ${shape}`">
    <img class="avatar" :src="avatar" :style="avatarStyle" :alt="alt" />
  </div>
</template>

<script>
export default {
  name: 'jaso-avatar',
  props: {
    avatar: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      default: 40,
    },
    shape: {
      type: String,
      default: 'circle',
    },
    alt: {
      type: String,
      default: '',
    },
  },
  computed: {
    avatarStyle() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
  .jaso-avatar {
    display: inline-block;
    position: relative;

    .avatar {
      display: block;
      width: 40px;
      height: 40px;
      object-fit: cover;
      background: #E5E5E5;
    }

    &.circle {
      border-radius: 50%;

      .avatar {
        border-radius: 50%;
      }
    }
  }
</style>
