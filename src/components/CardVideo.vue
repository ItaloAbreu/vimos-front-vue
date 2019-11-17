<template>
  <section class="card-video">
    <router-link :to="`/video/${id}`"
    :title="title">
      <img :src="urlThumbnail" alt="thumbnail" />
      <p>{{ tratedCreatedAt }}</p>
      <h1>{{ tratedTitle }}</h1>
    </router-link>
  </section>
</template>

<script>
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
  name: 'video-card',
  props: {
    id: String,
    thumbnail: String,
    createdAt: String,
    title: String,
    baseURL: String,
  },

  computed: {
    tratedTitle() {
      return this.mountTitle(this.title)
    },
    tratedCreatedAt() {
      return this.mountDate(this.createdAt)
    },
    urlThumbnail() {
      return `${this.baseURL}${this.thumbnail}`
    },
  },

  methods: {
    diffOfTimes(previousDate, currentDate, back='days') {
      const timeDiff = Math.abs(currentDate.getTime() - previousDate.getTime());
      let diffBack;

      if (back === 'days') {
        diffBack = Math.floor(timeDiff / (1000 * 3600 * 24)); 
      } else if (back === 'hours') {
        diffBack = Math.floor((timeDiff % 86400000) / 3600000); 
      } else if (back === 'minutes') {
        diffBack = Math.round(((timeDiff % 86400000) % 3600000) / 60000); 
      } else if (back === 'seconds') {
        diffBack = Math.round((((timeDiff % 86400000) % 3600000) % 60000) / 600); 
      }
      return diffBack;
    },

    mountDate(createdAt) {
      // createdAt tem esse formato: "2018-07-17 20:05:02.138Z"
      const previousDate = new Date(createdAt);
      const currentDate = new Date();

      const diffDays = this.diffOfTimes(previousDate, currentDate);
      const diffHours = this.diffOfTimes(previousDate, currentDate, 'hours');
      const diffMinutes = this.diffOfTimes(previousDate, currentDate, 'minutes');
      const diffSeconds = this.diffOfTimes(previousDate, currentDate, 'seconds');

      if (diffDays >= 364) {
        // quando o post tem um ano ou mais
        return `Em ${months[previousDate.getMonth()]} de ${previousDate.getFullYear()}`;

      } else if (diffDays >= 30) {
        // Quando foi postado há meses.
        const monthsAgo = Math.floor(diffDays / 30) || 1;
        return `Há ${numbers[monthsAgo - 1]} ${monthsAgo > 1 ? 'meses': 'mes'}`;

      } else if (diffDays >= 7) {
        // Semanas
        const weeksAgo = Math.floor(diffDays / 7) || 1;
        const dictionaryWeek = ['uma', 'duas']
        return `Há ${weeksAgo > 2 ? numbers[weeksAgo - 1]
            : dictionaryWeek[weeksAgo - 1]} ${weeksAgo > 1 ? 'semanas': 'semana'}`;
      } else if (diffDays >= 1) {
        // Dias
        return `Há ${numbers[diffDays - 1]} ${diffDays >= 2? 'dias': 'dia'}`;
      } else if (diffHours >= 1) {
        // Horas
        return `${diffHours} ${diffHours > 1? 'horas': 'hora'} atrás`;
      } else if (diffMinutes >= 1) {
        // Minutos
        return `${diffMinutes} ${diffMinutes > 1? 'minutos': 'minuto'} atrás`;
      }  else if (diffSeconds >= 1) {
        // Segundos
        return `${diffSeconds} ${diffSeconds > 1? 'segundos': 'segundo'} atrás`;
      } else {
        return 'Agora mesmo';
      }
    },

    mountTitle(title) {
      if(title.length >= 50) title = title.slice(0, 40) + '...';
      return title;
    }
  },
}
</script>

<style scoped>

.card-video {
  display: flex;
  flex-direction: column;
  background-color: #252525;
  color: #999;
  border: solid 1px #050505;

  border-radius: 10px;
  min-width: 220px;
  min-height: 240px;
  max-width: 220px;
  max-height: 240px;

  margin: 5px;

  cursor: pointer;
  overflow: hidden;
}
.card-video:hover {
  box-shadow: 0 0 10px #000d;
}

.card-video:active {
  background-color: #444;
}

a {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  min-height: 240px;
  max-width: 220px;
  max-height: 240px;
}

img {
  width: 220px;
  height: 130px;
  margin: 0;
}

p {
  color: #999;
  font-size: 10px;
  margin-top: 9px;
  margin-right: 9px;
  margin-left: auto;
}

h1 {
  color: #999;
  font-size: 18px;
  padding: 0 10px;
  margin: auto;
  text-align: center;
  text-align-last: center;
}
</style>