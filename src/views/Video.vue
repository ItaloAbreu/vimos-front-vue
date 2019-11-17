<template>
  <section class="justify-content direction-column">
    <video-player
      v-if="videoOptions"
      :options="videoOptions"
      class="video-player"
    />
    <h5>{{ createdAt }}</h5>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </section>
</template>

<script>
import VideoPlayer from "@/components/VideoPlayer";
import api, { baseURL } from "../services/api";

export default {
  name: "Video",
  components: {
    VideoPlayer
  },
  data() {
    return {
      createdAt: '',
      title: '',
      description: '',
      videoOptions: null,
    };
  },
  async mounted() {
    const videoID = this.$route.params.id;
    const response = await api.get(`/video/${videoID}`);

    this.createdAt = this.mountCreatedDate(response.data.createdAt);
    this.title = response.data.title;
    this.description = response.data.description;

    this.videoOptions = {
      language: 'pt',
      poster: baseURL + response.data.thumbnail,
      autoplay: false,
      controls: true,
      fluid: true,
      sources: [{
        src: baseURL + response.data.url,
      }],
    }
  },
  methods: {
    mountCreatedDate(createdAt) {
      const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril',
        'Maio', 'Junho', 'Julho', 'Agosto',
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'
      ];
      let date = createdAt.slice(0, 10).split('-');
      date[1] = months[parseInt(date[1]) - 1];
      return `Upload em ${date[2]} de ${date[1]} de ${date[0]}`;
    }
  }
};
</script>

<style scoped>
.video-player {
  margin: 20px auto 10px;

  width: 100%;
  max-width: 700px;
  min-width: 260px;  
}
</style>