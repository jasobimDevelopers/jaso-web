<template>
  <div class="sound-item flex-row">
    <div class="shape" @click="handlePlay" :style="`width: ${width}px`">
      <audio :src="url" ref="audio" @canplay="handleLoad" @ended="handleEnded" />
      <img v-if="status === 'paused'" src="@/assets/images/sound.png" />
      <img v-else src="@/assets/images/sound.gif" />
    </div>
    <div class="time">{{ `${time}s` }}</div>
  </div>
</template>

<script>

const MIN_SOUND_WIDTH = 32;
const MAX_SOUND_WIDTH = 360;
export default {
  name: 'SoundItem',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      time: 0,
      status: 'paused',
      timer: null,
      width: MIN_SOUND_WIDTH,
    };
  },
  methods: {
    handlePlay() {
      const audio = this.$refs.audio;

      if (audio.paused) {
        audio.play();
        this.status = 'playing';

        this.timer = setInterval(() => {
          this.time -= 1;
        }, 1e3);
      } else {
        audio.pause();
        this.status = 'paused';

        clearInterval(this.timer);
      }
    },
    handleLoad() {
      const audio = this.$refs.audio;
      this.time = Math.round(audio.duration);
      console.log('this.time', this.time);

      // set width info
      if (this.time > MAX_SOUND_WIDTH) {
        this.width = MAX_SOUND_WIDTH;
      } else if (this.time > MIN_SOUND_WIDTH) {
        this.width = this.time;
      }
    },
    handleEnded() {
      const audio = this.$refs.audio;
      this.time = Math.round(audio.duration);
      this.status = 'paused';
      clearInterval(this.timer);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .sound-item {
    .shape {
      padding: 4px 8px;
      min-width: 32px;
      max-width: 360px;
      background-color: #b2e281;
      border-radius: 4px;

      img {
        height: 16px;
        width: auto;
      }

      &:hover {
        cursor: pointer;
      }
    }

    .time {
      margin-left: 8px;
      font-size: 12px;
    }
  }
</style>
