<template>
  <header>
    <div>
      <button class="menuMobile" @click="isVisible = !isVisible">
        Mais Opções ...
      </button>
    </div>
    <nav :class="!isVisible ? 'headerMain' : 'hidden'">
      <ul>
        <li v-for="(link, index) in links" :key="`${index}-${link}`">
          <a :href="link.url" rel="noopener noreferrer">
            <font-awesome-icon :icon="link.icon" />
            {{ link.title }}</a
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      isVisible: true,
    };
  },
  props: {
    links: Array,
  },
};
</script>

<style scoped>
.menuMobile {
  display: none;
}
ul {
  display: flex;
  flex-wrap: wrap;
  padding: 0 5%;
}

ul li {
  margin-left: 8px;
  padding: 20px;
  color: #fffefa;
}
ul li a {
  text-decoration: none;
  color: #fffefa;
  margin-left: 8px;
}

ul li a:hover {
  transition: 0.5s;
  color: #32523f;
}

@media (max-width: 800px) {
  .menuMobile {
    display: block;
    border: none;
    margin: 4px;
    border: 2px solid #fffefa;
    background: transparent;
    padding: 8px;
    font: bold;
    font-weight: bold;
    color: #fffefa;
  }

  @keyframes scale {
    from {
      transform: scale(0.9);
    }

    to {
      transform: scale(1);
    }
  }

  .headerMain {
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    background: #32523fe1;
    z-index: 9999;
    border-radius: 8px;
    animation: scale 0.3s ease-in-out;
  }
  .hidden {
    display: none;
  }
  ul {
    max-width: 250px;
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    padding: 10px;
    color: #fffefa;
  }
}
</style>
