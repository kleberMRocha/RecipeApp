<template>
  <nav>
    <img src="../assets/logo.png" alt="logo" />
    <ul>
      <li v-for="(link, index) in links" :key="`${index}-${link}`">
        <font-awesome-icon :icon="link.icon" />
        <a :href="link.url" target="_blank" rel="noopener noreferrer" >{{ link.title }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: {
    links: Array,
  },
};
</script>

<style scoped>
nav {
  display: flex;
  width: 100%;
  background: #f0a500;
  height: 50px;
  border-bottom: 2px solid #e45826;
  font-weight: bold;
}
nav img {
  width: 50px;
  margin-left: 15px;
}
nav a {
  color: #4a3933;
  text-decoration: none;
  font-size: 15px;
}

nav ul li svg {
  color: #4a3933;
  margin-right: 5px ;
}


nav ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  padding: 0 5%;
  list-style: none;
}
nav ul li {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
  background: #ffffff;
  height: 35px;
  width: 120px;
  border-radius: 15px;
}

nav ul li:hover {
  background: #d1cfcf;
  transition: 0.5s background;
}

h3 {
  margin: 40px 0 0;
}
</style>
