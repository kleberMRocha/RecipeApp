<template>
  <div class="containerFood">
    <div class="options">
      <button class="alternativeName">
        {{ meal.strMeal }}
      </button>
      <button class="favButton" >
        <font-awesome-icon icon="heart"/>
      </button>
      <button class="playVideo" @click="$emit('showModal', youtubeId)">
        <font-awesome-icon icon="play-circle" />
      </button>
    </div>
    <img :src="meal.strMealThumb" :alt="meal.strMeal" />
    <h3>{{ meal.strMeal }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    meal: Object,
  },
  computed: {
    youtubeId: function() {
      const splitedUrl = this.meal.strYoutube.split('watch');
      return splitedUrl[1].replace('?v=', '');
    },
  },
};
</script>

<style scoped>
@keyframes slidein {
  from {
    transform: scale(0);
    opacity: 0;
  }

  to {
    transform: scale(1);
  }
}

.containerFood {
  border-radius: 15px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #31313181;
  width: 150px;
  height: 100%;
  overflow: hidden;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  position: relative;
  animation: slidein ease-in-out 1s;
  max-height: 185px;
}

.containerFood:hover {
  background-color: #313131;
  transition: background-color 0.5s;
}

.containerFood img {
  max-width: 100%;
  height: 100%;
  object-fit: fill;
}

.options {
  position: absolute;
  background-color: #00000098;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  opacity: 0;
}

.options:hover {
  opacity: 1;
  transition: 0.9s opacity;
}

h3 {
  margin: 8px;
}
.playVideo {
  outline: none;
  background: none;
  border: none;
  color: #aaaaaa;
  font-size: 85px;
  cursor: pointer;
}
.playVideo:hover{
  transition: color .5s;
  color: #ffffff;
}

.favButton {
  margin-top: 2px;
  font-size: 20px;
  color: #ffffff;
  border: none;
  background: none;
  outline: none;
  position: absolute;
  left: 0;
  cursor: pointer;

}
.favButton:hover{
  color: tomato;
  transition: .5s;
}

.alternativeName {
  margin-top: 25px;
  font-weight: bold;
  outline: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;
}
</style>
