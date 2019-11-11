<template>
  <section>
    <h1>{{ title }}</h1>
    <CardVideo
      v-for="video in videosList"
      :key="video.key"
      :id="video.id"
      :thumbnail="video.thumbnail"
      :createdAt="video.createdAt"
      :title="video.title"
      :baseURL="baseURL"
    ></CardVideo>
  </section>
</template>

<script>
import CardVideo from "../components/CardVideo";
import api from "../services/api";
import { baseURL } from "../services/api"

export default {
  name: "home",
  components: {
    CardVideo
  },
  data() {
    return {
      title: 'Animes Da Hora!',
      videosList: [],
      baseURL,
    }
  },
  async mounted() {
    this.videosList = await this.getVideosList();
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
        }
      ));
    },
  }
};
</script>
