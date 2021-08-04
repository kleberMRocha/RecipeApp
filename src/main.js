import Vue from 'vue';
import App from './App.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faSearch,
  faLink,
  faPlayCircle,
  faHeart,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import store from './vuex/store';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import router from '../routes/router';

Vue.use(Vuex);
Vue.use(VueRouter);

library.add(faSearch, faLink, faPlayCircle, faHeart, faHome, faUser);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
