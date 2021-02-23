<template>
  <div id="app">
    <div class="modal" 
    :class="{ 'modalVisible': !modalVisible }"
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
      />
    </div>

    <ul>
      <li v-for="meal in meals" v-bind:key="`${meal.idMeal}`">
        <FoodCard :meal="meal"
         v-on:showModal="showModal"
         />
      </li>
    </ul>
  </div>
</template>

<script>
import InputSearch from './components/InputSearch.vue';
import Header from './components/Header.vue';
import FoodCard from './components/FoodCard.vue';
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
  },
  data() {
    return {
      meals: null,
      modalVisible:false,
      selectMeal:'VVnZd8A84z4',
      links: [
        {
          title: 'Recipes Api',
          url: 'https://www.themealdb.com/api.php',
          icon: 'link',
        },
        {
          title: 'GitHub',
          url: 'https://github.com/kleberMRocha',
          icon: 'link',
        },
      ],
    };
  },
  methods: {
    getSearchValues: function(search) {
      axios.get(`search.php?s=${search}`).then((response) => {
        this.meals = response.data.meals;
      });
    },
      showModal: function(youtubeId) {
      this.selectMeal = youtubeId;
      this.modalVisible = true;
    },
    closeModal: function(){
      this.modalVisible = false;
      this.selectMeal = '';
    }
  },
};
</script>

<style>
@import url('./global/reset.css');

@keyframes showScale {
  from {
    transform: rotate(50dg)
  }

  to {
   transform: rotate(5dg)
  }
}

.container {
  background: #96969657;
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
.container::after {
  content: '';
  background: inherit;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  box-shadow: inset 0 0 0 3000px #c9c9c918;
  filter: blur(10px);
  z-index: -99999;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

ul li {
  margin: 2px;
}

.logo {
  width: 220px;
}

h5 {
  border-bottom: 2px solid #e45826;
  color: #7a280a;
  font-size: 18px;
  text-align: center;
}

.modal{
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
  animation: showScale 1s infinite;
  z-index: 9999;
}
  .modalVisible{
     display: none;
  }

.closeButton{
  position: absolute;
  z-index: 99999;
  border-radius: 30%;
  font-size: 20px;
  right:300px;


}
</style>
