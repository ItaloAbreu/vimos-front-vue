<template>
  <div>
    <video ref="videoPlayer" class="video-js vjs-big-play-centered"></video>
  </div>
</template>

<script>
import videojs from "video.js";
import 'video.js/dist/video-js.css';

export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      player: null
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
};
</script>