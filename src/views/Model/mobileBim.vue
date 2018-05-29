<template>
  <div class="mobile-bim">
    <div id="model-id" style="width:100%; height:100%"></div>
  </div>
</template>

<script>
import { getModelViewToken } from '@/api/bim';

export default {
  name: 'mobileBim',
  data() {
    return {
      viewToken: '',
      buildingData: {},
    };
  },
  watch: {
    project(obj, oldObj) {
      if (oldObj && (obj.fileId !== oldObj.fileId)) {
        this.getBimInfo();
      }
    },
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      const { query: { fid } } = this.$route;

      if (fid && fid !== '') {
        getModelViewToken({
          fileId: fid,
        }).then((res) => {
          this.viewToken = res;

          this.initBimface();
        });
      }
    },
    initBimface() {
      const options = new BimfaceSDKLoaderConfig();
      options.configuration = 'Debug';
      options.staticHost = 'http://static.bimface.com';
      options.viewToken = this.viewToken;
      BimfaceSDKLoader.load(options, this.onSDKLoadSucceeded, this.onSDKLoadFailed);
    },
    onSDKLoadSucceeded(viewMetaData) {
      const view = document.getElementById('model-id');
      const WebAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
      WebAppConfig.domElement = view;

      const appEvents = Glodon.Bimface.Application.WebApplication3DEvent;
      const app = new Glodon.Bimface.Application.WebApplication3D(WebAppConfig);
      this.viewer = app.getViewer();
      this.app = app;
      app.addView(viewMetaData.viewToken);

      app.addEventListener(appEvents.ViewAdded, this.onAdded);
    },
    onSDKLoadFailed() {},
    onAdded() {
      this.app.render();
      /* 获取主视图（相机定位）
      1 view
      2 view.getCameraStatus()
      3 JSON.stringify(view.getCameraStatus()) */
      // this.viewer.setCameraStatus({
      //   position: { x: 5394.0851818932915, y: 612.4004009486468, z: 339.27006625707565 },
      //   target: { x: 6598.082774755444, y: 25239.75159347191, z: 1128.6465131357606 },
      //   up: { x: 0, y: -0.0000036732052144291623, z: 0.9999999999932538 },
      //   version: 1,
      // });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .mobile-bim {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
