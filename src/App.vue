<template>
  <div id="app">
    <Notication />
    <div
      class="modal"
      @click="handleCloseModal"
      :class="{ modalVisible: !modalVisible }"
    >
      <div v-if="details" class="details_container">
        <div class="header-modal">
          <h3 class="details_title"> 🍔 How to Make | {{ details.strMeal }}</h3>
          <button @click="closeModal" class="closeModal">X</button>
        </div>

        <div class="strInstructions">
          <img :src="details.strMealThumb" class="strMealThumb" />
          <div class="ingredients">
            <h4>ingredients</h4>
            <ul>
              <li
                v-for="ingredient in details.ingredientList"
                :key="ingredient.ingredientList"
              >
                {{ ingredient.ingredientList }} -
                {{ ingredient.strMeasureList }}
              </li>
            </ul>
          </div>
          <p class="strInstructions_details">
            {{ details.strInstructions }}
          </p>
          <div class="downloadContainer">
            <button
              type="button"
              class="download"
              @click="handleDownloadRecipe(details)"
            >
              Download Recipe
            </button>
          </div>
        </div>

        <p class="source">
          <a
            :href="details.strSource"
            target="_blank"
            rel="noopener noreferrer"
            class="details_src"
          >
            Source
          </a>
        </p>
      </div>

      <iframe
        v-else
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
        <h5 v-if="routeName !== 'favoritos'">
          Search Recipes from Around the World
        </h5>
        <h5 class="fav-title" v-else>Your Favorite Recipes</h5>
      </main>

      <InputSearch
        v-if="!routeName"
        placeHolder="Search a meal"
        v-on:getSearchValue="getSearchValues"
        class="inputSearchMain"
      />
    </div>
    <div v-if="info && !routeName" class="info">
      {{ info }}
    </div>
    <keep-alive>
      <ul v-if="!routeName" class="recipesContainer">
        <Loader :visible="isLoading" />
        <li v-for="meal in meals" v-bind:key="`${meal.idMeal}`">
          <FoodCard
            :meal="meal"
            @showModal="showModal"
            @showDetails="showDetails"
          />
        </li>
      </ul>
    </keep-alive>
    <router-view />
    <footer>
    <small> Made with 💚 {{ getFullYear }} </small> 
    </footer>
  </div>
</template>

<script>
import InputSearch from './components/InputSearch.vue';
import Header from './components/Header.vue';
import FoodCard from './components/FoodCard.vue';
import Loader from './components/Loader';
import modal from '../src/mixin/modal';
import Notication from '../src/components/Notification.vue';
import { mapState } from 'vuex';
import { axios } from './services/index';

import {mapMutations} from './vuex/nameSpaceNotification';

export default {
  name: 'App',
  components: {
    InputSearch,
    Header,
    FoodCard,
    Notication,
    Loader,
  },
  data() {
    return {
      meals: null,
      info: '',
      isLoading: false,
    };
  },
  mixins: [modal],
  methods: {
    ...mapMutations(['setNotificationsInfos']),
    getSearchValues: function(search) {
      if (search.length < 2) return;

      this.isLoading = true;
      if (!search.length) {
        this.meals = null;
        return;
      }

      axios
        .get(`search.php?s=${search}`)
        .then((response) => {
          this.meals = null;
          if (response.data.meals) {
            this.isLoading = false;
            this.meals = response.data.meals;
            this.info = '';
            return;
          }

          this.isLoading = false;
          this.info = 'Could not find recipe with this name 😔';
        })
        .catch(() => (this.info = 'Houve um erro inesperado'));
    },
    handleCloseModal() {
      !this.details ? this.closeModal() : () => {};
    },
    handleDownloadRecipe(obj) {
      const {
        strMeal,
        ingredientList,
        strYoutube,
        strSource,
        strMealThumb,
        strInstructions,
      } = obj;

      const recipe = `
      ${strMeal}  
      ____________________________________________________

      ${ingredientList.map((i) => {
        if (!i) return '';
        return `- ${i.ingredientList} - ${i.strMeasureList}`;
      })}
     
     ____________________________________________________

     ${strInstructions}

     ____________________________________________________

     picture : ${strMealThumb} 

     Youtube recipe : ${strYoutube}

     fonte  ${strSource}
      `;

      try {
        const blob = new Blob([recipe], { type: 'text/csv' });
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = `${strMeal}.txt`;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapState({
      links: (state) => state.links,
      modalVisible: (state) => state.modalVisible,
      selectMeal: (state) => state.selectMeal,
      details: (state) => state.details,
    }),
    routeName() {
      return this.$route.name;
    },
    getFullYear: () => new Date().getFullYear()
  },
};
</script>

<style>
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

@keyframes entranceTitle {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
     transform: translateY(0px);
  }
}

@keyframes gradient {
    0% {
        background-position-x:  0%;
    }
    50% {
        background-position-x: 75%;
    }
    100% {
        background-position-x: 100%;
    }
}

.container {
  position: relative;
  animation: gradient 10s cubic-bezier(.24,1.47,.85,.11) alternate infinite;
  background: linear-gradient(45deg, #2caa52, #3598a5, #26aa8d, #a947e2);
	background-size: 400% 400%;
  margin-bottom: 24px;
  padding: 4px 0 0 0;
  min-height: 250px;
  max-height: 500px;
}
.source{
text-align: center;
}

.header-modal {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.details_container {
  position: absolute;
  z-index: 99999;
  top: 0;
}
.strInstructions_details {
  margin: 16px 0;
  padding: 8px;
  max-height: 100%;
  overflow-y: scroll;
  background: #deebea;
  border-radius: 16px;
  color: #093128;
}
.details_container h4 {
  font-size: 25px;
  margin: 8px 0;
  text-decoration: underline;
}
.details_title {
  color: #ffffff;
  font-size: 40px;
  margin: 16px;
}
.details_src {
  color: #ffffff;
  font-size: 12px;
  margin: 16px;
}

.closeModal {
  border: #ffffff 2px solid;
  background: none;
  width: 80px;
  cursor: pointer;
  color: #ffffff;
  height: 48px;
  font-weight: bolder;
  transition: 0.5s;
  z-index: 999;
  margin: 18px;
}
.strInstructions {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-column-gap: 80px;
  grid-row-gap: 30px;
  place-items: center stretch;
  margin: 0 auto;
  line-height: 120%;
  max-width: 80%;
  max-height: 400px;
  color: #ffffff;
  padding: 4%;
  border-radius: 8px;
  background: #689f77;
}



.ingredients{
grid-row-start: 2;
grid-row-start: 3;
}

.downloadContainer{
grid-row-start: 2;
grid-row-start: 3;
grid-column-start: 2;
}

.strInstructions_details{
grid-column-start: 2;
grid-row-start: 1;
grid-row-end: 3;
}

.strMealThumb{
max-width: 200px;
border-radius: 8px;
}

.ingredients {
  padding: 8px;
  max-height: 200px;
  margin: 16px 0;
  overflow-y: scroll;

}

.download {
  border: #ffffff 2px solid;
  background: none;
  width: 100%;
  cursor: pointer;
  color: #ffffff;
  height: 48px;
  font-weight: bold;
  transition: 0.5s;
  z-index: 999;
}

.download:hover {
  background: #ffffff;
  color: #689f77;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputSearchMain {
  position: absolute;
  bottom: -40px;
  left: 0;
  right: 0;
}

.recipesContainer {
  display: flex;
  width: 80%;
  min-height: calc(100vh - 273px);
  margin: 48px auto;
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
.fav-title {
  padding-top: 80px;
}

h5 {
  animation: entranceTitle 1s ease-out forwards;
  color: #ffffff;
  text-shadow: 1px 1px 2px black;
  font-weight: bold;
  font-size: 42px;
  text-align: left;
  max-width: 500px;
  line-height: 50px;
}

footer{
  display: grid;
  place-items: center;
  text-align: center;
  height: 50px;
  background: #5f977096;
  color: #363535;
  margin-top: 8px;
}

@media (max-width: 800px) {
  .strMealThumb{
  display: none;
  }
  .details_title {
    font-size: 16px;
    padding: 0 8px;
    white-space: nowrap;
  }
  .closeModal{
   width: 30px;
   height: 30px;
  }
  .fav-title {
    padding-top: 50px;
    font-size: 35px;
    text-align: center;
  }
  h5 {
    max-width: 70%;
    font-size: 25px;
  }

  .logo {
    width: 120px;
  }

  .inputSearchMain {
    position: absolute;
    bottom: -50px;
    z-index: 2;
    left: 0;
    right: 0;
  }
  .container {
    margin-bottom: 50px;
  }
  .strInstructions{
  display: flex;
  flex-direction: column;
  max-height: 100%;
  }
  .strInstructions_details{
  max-height: 60px;
  border-radius: 0px;
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
  position: fixed;
  width: 100%;
  height: 100%;
  animation: entrance 0.5s ease-in;
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

@keyframes entrance{
  0%{
    opacity: 0;
    transform:translateY(20px) ;
  }
  100%{
    opacity: 1;
    transform:translateY(0px) ;
  }
}

.info {
  animation: entrance 1s;
  text-align: center;
  background-color: white;
  color: #689f77;
  max-width: 50%;
  font-weight: bold;
  margin: 90px auto;
  padding: 16px;
  border-radius: 50px;
  box-shadow: 3px 3px 3px;
}
</style>
