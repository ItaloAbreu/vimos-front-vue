import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: '#a87bf3',
        secondary: '#46327a',
        accent: '#c8abee',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        grey: '#333333',
      },
    },
    options: {
      customProperties: true,
    },
  },
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
});
