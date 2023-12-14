import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
   theme: {
      dark: false,
      light: true,
      themes: {
         light: {
            primary: '#f1f',
            secondary: '#000000',
            accent: '#7fff57',
            error: '#ff0e1d',
         },

         dark: {
            primary: '#00a3fc',
            secondary: '#b0bec5',
            accent: '#8c9eff',
            error: '#ff1a06',
         },
      },
   },
})


