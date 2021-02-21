<template>
  <div class="backgroundImg">
      <slot>

      </slot>
  </div>
</template>

<script>

export default {
  created(){
      console.log(this.url);
  },
  name: 'BackgroundImg',
};

</script>

<style scoped>
.backgroundImg {
  background:#e6d5b8;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  height:calc(100vh - 55px);
  width: 100%;
}
.backgroundImg img{
    width: 220px;
}
</style>
