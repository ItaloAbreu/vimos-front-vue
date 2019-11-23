<template>
  <v-container class="container-content">
    <h1>{{ title }}</h1>
  <v-container>
    <v-row class="justify-content">
      <CardVideo
        v-for="video in videosList"
        :key="video.key"
        :id="video.id"
        :thumbnail="video.thumbnail"
        :createdAt="video.createdAt"
        :title="video.title"
        :description="video.description"
      ></CardVideo>
    </v-row>
  </v-container>
  </v-container>
</template>

<script>
import CardVideo from "../components/CardVideo";
import api from "../services/api";

export default {
  name: "container-home",
  components: {
    CardVideo,
  },
  data() {
    return {
      title: 'Animes Da Hora!',
      videosList: [],
    }
  },
  async mounted() {
    const response = await this.getVideosList();
    this.videosList = response.reverse();
  },
  methods: {
    async getVideosList() {
      const response = await api.get("/list");

      return response.data.map(video => (
        {
          key: video._id,
          id: video._id,
          thumbnail: video.thumbnail,
          createdAt: video.createdAt,
          title: video.title,
          description: video.description,
        }
      ));
    },
  }
};
</script>

<style scoped>
</style>
