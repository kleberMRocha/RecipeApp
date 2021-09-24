<template>
  <header class="main_header">
    <div>
      <button
        class="menuMobile"
        ref="MainMenuMobile"
        @click="isVisible = !isVisible"
      >
        <font-awesome-icon icon="bars" />
      </button>
    </div>
    <nav :class="!isVisible ? 'headerMain' : 'hidden'">
      <ul>
        <li
          class="menuLink"
          v-for="(link, index) in links"
          :key="`${index}-${link}`"
        >
          <a
            :href="link.url"
            :target="link.blank ? '_blank' : '_self'"
            rel="noopener noreferrer"
          >
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
@keyframes antrance{
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
.main_header {
  margin-top: 4px;
  animation: antrance 1s ease-in;
}
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
  ul li:hover {
    background: #d5ffe63f;
  }

  .menuMobile {
    display: block;
    margin: 0 8px;
    border: none;
    border: 1px solid #fffefa;
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
    background: transparent;
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
