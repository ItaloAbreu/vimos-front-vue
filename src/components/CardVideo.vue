<template>
  <section style="position: relative; margin: 12px;">

    <router-link class="clean-link" :to="`/video/${id}`" :title="title">
      <v-card class="card-video" width="240" height="250" shaped hover>
        <v-img :src="urlThumbnail" height="140px"></v-img>
        <v-card-subtitle class="py-1 text-right">{{ tratedCreatedAt }}</v-card-subtitle>
        <v-card-title class="pb-2 pt-1 text-center">{{ tratedTitle }}</v-card-title>
      </v-card>
    </router-link>

    <section v-if="description" class="container-info-icons">
      <v-dialog v-model="dialog" scrollable max-width="400px">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" class="mx-2" color="white"
            text icon>
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>{{ title }}</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="max-height: 300px; min-height: 120px;">{{ description }}</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false">ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </section>

  </section>
</template>

<script>
import { baseURL } from "../services/api";

const months = [
	'Janeiro', 'Fevereiro', 'Março', 'Abril',
	'Maio', 'Junho', 'Julho', 'Agosto',
	'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const numbers = [
	'um', 'dois', 'três', 'quatro', 'cinco',
	'seis', 'sete', 'oito', 'nove', 'dez',
	'onze', 'doze'
];

export default {
  name: "CardVideo",
  props: {
    id: String,
    thumbnail: String,
    createdAt: String,
    title: String,
    description: String
  },
  data() {
    return {
      dialog: false,
      baseURL
    };
  },
  computed: {
    tratedTitle() {
      return this.mountTitle(this.title);
    },
    tratedCreatedAt() {
      return this.mountDate(this.createdAt);
    },
    urlThumbnail() {
      return `${this.baseURL}${this.thumbnail}`;
    }
  },

  methods: {
    diffOfTimes(previousDate, currentDate, back = "days") {
      const timeDiff = Math.abs(currentDate.getTime() - previousDate.getTime());
      let diffBack;

      if (back === "days") {
        diffBack = Math.floor(timeDiff / (1000 * 3600 * 24));
      } else if (back === "hours") {
        diffBack = Math.floor((timeDiff % 86400000) / 3600000);
      } else if (back === "minutes") {
        diffBack = Math.round(((timeDiff % 86400000) % 3600000) / 60000);
      } else if (back === "seconds") {
        diffBack = Math.round(
          (((timeDiff % 86400000) % 3600000) % 60000) / 600
        );
      }
      return diffBack;
    },

    mountDate(createdAt) {
      // createdAt tem esse formato: "2018-07-17 20:05:02.138Z"
      const previousDate = new Date(createdAt);
      const currentDate = new Date();

      const diffDays = this.diffOfTimes(previousDate, currentDate);
      const diffHours = this.diffOfTimes(
        previousDate,
        currentDate,
        "hours"
      );
      const diffMinutes = this.diffOfTimes(
        previousDate,
        currentDate,
        "minutes"
      );
      const diffSeconds = this.diffOfTimes(
        previousDate,
        currentDate,
        "seconds"
      );

      if (diffDays >= 364) {
        // quando o post tem um ano ou mais
        return `Em ${
          months[previousDate.getMonth()]
        } de ${previousDate.getFullYear()}`;
      } else if (diffDays >= 30) {
        // Quando foi postado há meses.
        const monthsAgo = Math.floor(diffDays / 30) || 1;
        return `Há ${numbers[monthsAgo - 1]} ${
          monthsAgo > 1 ? "meses" : "mes"
        }`;
      } else if (diffDays >= 7) {
        // Semanas
        const weeksAgo = Math.floor(diffDays / 7) || 1;
        const dictionaryWeek = ["uma", "duas"];
        return `Há ${
          weeksAgo > 2 ? numbers[weeksAgo - 1] : dictionaryWeek[weeksAgo - 1]
        } ${weeksAgo > 1 ? "semanas" : "semana"}`;
      } else if (diffDays >= 1) {
        // Dias
        return `Há ${numbers[diffDays - 1]} ${diffDays >= 2 ? "dias" : "dia"}`;
      } else if (diffHours >= 1) {
        // Horas
        return `${diffHours} ${diffHours > 1 ? "horas" : "hora"} atrás`;
      } else if (diffMinutes >= 1) {
        // Minutos
        return `${diffMinutes} ${diffMinutes > 1 ? "minutos" : "minuto"} atrás`;
      } else if (diffSeconds >= 1) {
        // Segundos
        return `${diffSeconds} ${
          diffSeconds > 1 ? "segundos" : "segundo"
        } atrás`;
      } else {
        return "Agora mesmo";
      }
    },

    mountTitle(title) {
      if (title.length >= 50) title = title.slice(0, 40) + "...";
      return title;
    }
  }
};
</script>

<style scoped>
.card-video {
  overflow: hidden;
}
.container-info-icons {
  width: 34px;
  height: 140px;
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>