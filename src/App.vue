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
    <div class="container">
        <Header :links="links" />
        <main>
          <h5>
          Search Recipes from Around the World 
         </h5>

        <img src="./assets/logo.svg" alt="logo" class="logo" />
      
        </main>
  
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
  position: relative;
  background: #689F77;
    margin-bottom: 24px;
}

main{
display: flex;
justify-content: center;
align-items: center;
}

.inputSearchMain{
  position: absolute;
  bottom: -30px;
  left: 0;
  right: 0;
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
  width: 250px;
}

h5 {
  color: #FFFFFF;
  font-weight: bold;
  font-size: 42px;
  text-align: left;
  max-width: 500px;
  line-height: 50px;
}

@media(max-width: 800px){
  h5 {
  font-size: 20px;
  text-align: left;
  line-height: 25px;
  margin: 8px;
}
}

.modal {
  position: relative;
  z-index: 999999;
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
  color: #689F77;
  max-width: 50%;
  font-weight: bold;
  margin: 90px auto;
  padding: 16px
}

</style>
