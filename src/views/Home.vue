<template>
  <section>
    <h1 class="title">{{ title }}</h1>
  <v-container>
    <v-row class="justify-content">
      <CardVideo
        v-for="video in videosList"
        :key="video.key"
        :id="video.id"
        :thumbnail="video.thumbnail"
        :createdAt="video.createdAt"
        :title="video.title"
        :baseURL="baseURL"
      ></CardVideo>
    </v-row>
  </v-container>
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

<style scoped>
.title {
  margin: 25px 0 5px;
}

</style>
