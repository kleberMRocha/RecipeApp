<template>
  <div id="app">
    <Header :links="links" />
    <BackgroundImg>
          <img src="./assets/logo.png" alt="logo" />
          <InputSearch placeHolder="Search a meal" />
    </BackgroundImg>
  </div>
</template>

<script>
import InputSearch from './components/InputSearch.vue';
import Header from './components/Header.vue';
import BackgroundImg from './components/BackgroundImg.vue';

export default {
  name: 'App',
  components: {
    InputSearch,
    Header,
    BackgroundImg
  },
  data() {
    return {
      links: [
        {
          title: 'Recipes Api',
          url: 'https://www.themealdb.com/api.php',
          icon:'link'
        },
        {
          title: 'GitHub',
          url: 'https://github.com/kleberMRocha',
          icon:'link'
        },
      ],
    };
  },

};
</script>

<style>
@import url("./global/reset.css");

</style>
