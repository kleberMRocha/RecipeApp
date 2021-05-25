<template>
  <div id="app">
    <div
      class="modal"
      :class="{ modalVisible: !modalVisible }"
      @click="closeModal"
    >
      <iframe
        id="ytplayer"
        type="text/html"
        width="640"
        height="360"
        :src="`https://www.youtube.com/embed/${selectMeal}`"
        frameborder="0"
      ></iframe>
      
    </div>
    <Header :links="links" />
    <div class="container">
      <img src="./assets/logo.png" alt="logo" class="logo" />
      <h5>
        Search Recipes from Around the World 
      </h5>
      <InputSearch
        placeHolder="Search a meal"
        v-on:getSearchValue="getSearchValues"
        class="inputSearchMain"
      />
    </div>
    <div v-if="info" class="info">
      {{ info }}
    </div>
    <ul class="recipesContainer">
    <Loader :visible="isLoading" />
       <router-view></router-view>

      <li v-for="meal in meals" v-bind:key="`${meal.idMeal}`">
        <FoodCard :meal="meal" v-on:showModal="showModal" />
      </li>

    </ul>
  </div>
</template>

<script>
import InputSearch from './components/InputSearch.vue';
import Header from './components/Header.vue';
import FoodCard from './components/FoodCard.vue';
import Loader from './components/Loader';
import modal from '../src/mixin/modal';
import { mapState } from 'vuex';
import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1/',
});

export default {
  name: 'App',
  components: {
    InputSearch,
    Header,
    FoodCard,
    Loader
  },
  data() {
    return {
      meals: null,
      info: '',
      isLoading: false,
    };
  },
  mixins:[modal],
  methods: {
    getSearchValues: function(search) {
      if(search.length < 2) return

      this.isLoading = true;
      if (!search.length) {
        this.meals = null;
        return;
      }

      axios.get(`search.php?s=${search}`)
      .then((response) => {
        this.meals = null;
        if(response.data.meals){
          this.isLoading = false;
          this.meals = response.data.meals;
          this.info = '';
          return;
        }

        this.isLoading = false 
        this.info = 'Could not find recipe with this name'

      }).catch(() => this.info = 'Houve um erro inesperado')
      
    },
  },
  computed:{
    ...mapState({
      links: (state) => state.links,
      modalVisible:(state) => state.modalVisible,
      selectMeal: (state) => state.selectMeal,
    })
  }
};
</script>

<style >
@import url('./global/reset.css');

@keyframes showScale {
  from {
    transform: rotate(50dg);
  }

  to {
    transform: rotate(5dg);
  }
}

@keyframes entrance {
  from {
    opacity: 0;
  }

  to {
     opacity: 1;
  }
}

.container {
  background: #f0f0f063;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  border-radius: 15px;
  border-bottom: 2px solid #e45826;
  margin: 25px auto;
  position: relative;
}

.recipesContainer{
  display: flex;
  width: 80%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.recipesContainer li {
  margin: 2px;
}

.logo {
  width: 220px;
}

h5 {
  border-bottom: 2px solid #e45826;
  color: #7a280a;
  font-size: 18px;
  margin-bottom: 40px;
  text-align: center;
}

.modal {
  position: relative;
  background-color: #000000a4;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 15px;
  position: fixed;
  width: 100%;
  height: 100%;
  animation: entrance .5s ease-in;
  z-index: 9999;
}

.modalVisible {
  display: none;
}

.closeButton {
  position: absolute;
  z-index: 99999;
  border-radius: 30%;
  font-size: 20px;
  right: 300px;
}

.info{
  text-align: center;
  background-color: white;
  color: tomato;
  padding: 2px;
  max-width: 50%;
  margin: 0 auto;
  font-weight: bold;
}
.inputSearchMain{
  position: absolute;
  bottom: -30px;
}
</style>
