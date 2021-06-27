<template>
  <nav>
    <ul>
      <li v-for="(link, index) in links" :key="`${index}-${link}`">

        <a :href="link.url"  rel="noopener noreferrer">
         <font-awesome-icon :icon="link.icon" />
        {{
          link.title
        }}</a>
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
ul {
display: flex;
flex-wrap: wrap;
padding: 0 5%;
}

ul li{
margin-left: 8px;
padding: 20px;
color: #FFFEFA;
}
ul li a{
 text-decoration: none;
 color: #FFFEFA;
 margin-left: 8px;
}

ul li a:hover{
transition: .5s;
color: #32523f;

}

@media(max-width: 800px){
ul li{
margin-left: 8px;
padding: 10px;
color: #FFFEFA;
}
}


</style>
