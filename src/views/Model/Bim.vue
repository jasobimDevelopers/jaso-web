<template>
  <div>
    <breadcrumb>
    </breadcrumb>

    <div class="app-container">
      <div v-show="project && project.fileId !== '' && viewToken !== ''" id="model-id" style="width:100%; height:750px"></div>
      <empty-card v-show="project && project.fileId === '' && viewToken === ''" message="该项目暂无模型"></empty-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getModelViewToken } from '@/api/bim';

export default {
  name: 'Bim',
  data() {
    return {
      viewToken: '',
      buildingData: {},
    };
  },
  computed: {
    ...mapGetters([
      'project',
    ]),
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
      const { params: { id } } = this.$route;
      // this.$store.dispatch('getBuildingInfo', { id });
      this.$store.dispatch('getProject', { id }).then(() => {
        this.getBimInfo();
      });
    },
    getBimInfo() {
      const { fileId } = this.project;

      if (fileId && fileId !== '') {
        getModelViewToken({
          fileId,
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
</style>
