import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        links:[
            {
              title: 'Recipes Api',
              url: 'https://www.themealdb.com/api.php',
              icon: 'link',
              blank: true
            },
            {
              title: 'GitHub',
              url: 'https://github.com/kleberMRocha',
              icon: 'link',
              blank: true
            },
            {
                title: 'Your Favorite Recipes',
                url: '/#/favorites',
                icon: 'heart',
                blank: false
            },
          ],
        favMeals: JSON.parse(localStorage.getItem('@RecipesApp')),
        modalVisible: false,
        selectMeal: 'VVnZd8A84z4',
    },
    mutations:{
      updateFavMeals(state, value){
        state.favMeals = (value);
      },
      showModal(state,youtubeId) {
        state.selectMeal = youtubeId;
        state.modalVisible = true;
      },
      closeModal(state) {
        state.modalVisible = false;
        state.selectMeal  = '';
      },
    }
  
  });
  
export default store;