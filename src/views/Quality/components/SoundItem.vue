<template>
  <div class="sound-item flex-row">
    <div class="shape" @click="handlePlay" :style="`width: ${loading ? 'auto' : width + 'px'}`">
      <audio :src="url" ref="audio" @canplay="handleLoad" @ended="handleEnded" />
      <div v-if="loading" class="loading">Loading..</div>
      <div v-else>
        <img v-if="status === 'paused'" src="@/assets/images/sound.png" />
        <img v-else src="@/assets/images/sound.gif" />
      </div>
    </div>
    <div class="time">{{ `${time}s` }}</div>
  </div>
</template>

<script>

const MIN_SOUND_WIDTH = 32;
const MAX_SOUND_WIDTH = 360;

// record index for audio
let audioIndex = 0;
let currentAudioIndex = 0;
export default {
  name: 'SoundItem',
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  data() {
    audioIndex += 1;

    return {
      isAudio: true,
      index: audioIndex,
      time: 0,
      status: 'paused',
      timer: null,
      width: MIN_SOUND_WIDTH,
      loading: true,
    };
  },
  methods: {
    handlePlay() {
      if (this.loading) {
        return;
      }

      const audio = this.$refs.audio;
      // set index for current audio
      currentAudioIndex = this.index;

      if (audio.paused) {
        // if there have audio list in parent comp, reset all audio frist
        this.$emit('resetAudioList');

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
    resetWidthInfo() {
      const audio = this.$refs.audio;
      this.time = Math.round(audio.duration);

      // set width info
      if (this.time > MAX_SOUND_WIDTH) {
        this.width = MAX_SOUND_WIDTH;
      } else if (this.time > MIN_SOUND_WIDTH) {
        this.width = this.time;
      }
    },
    handleLoad() {
      this.resetWidthInfo();
      this.loading = false;
    },
    handleEnded() {
      const audio = this.$refs.audio;
      this.time = Math.round(audio.duration);
      this.status = 'paused';
      clearInterval(this.timer);
    },
    resetAudio() {
      const audio = this.$refs.audio;

      if (currentAudioIndex !== this.index) {
        audio.currentTime = 0;
        audio.pause();
        this.status = 'paused';

        if (this.timer) {
          clearInterval(this.timer);
        }
        this.resetWidthInfo();
      }
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
      font-size: 12px;
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
    }
  }
</style>
