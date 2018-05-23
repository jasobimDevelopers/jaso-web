const readMixin = {
  computed: {
    disableEdit() {
      const { userInfo } = this.$store.getters;
      return !userInfo || (userInfo && userInfo.readState !== 1);
    },
  },
};

export default readMixin;
