<template>
  <div class="search" :class="{ 'focused': focused }">
    <font-awesome-icon icon="search"  :class="{ 'focusedIcon': focused }" />

    <input
      type="search"
      @focus="focused = true"
      @blur="focused = false"
      :placeholder="placeHolder"
    />
  </div>
</template>

<script>
export default {
  name: 'InputSearch',
  data() {
    return {
      focused: false,
    };
  },
  props: {
    placeHolder: String,
  },
};
</script>

<style scoped>
input {
  width: 95%;
  height: 50px;
  border: none;
  background: none;
  outline: none;
}
.search {
  background: #ffffff;
  border-radius: 15px;
  width: 70.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px auto;
  box-shadow: 2px 5px 3px -5px black;
}
.focused {
  border-bottom: 2px solid #e45826;
}
.focusedIcon {
  color: #e45826;
}
.search svg {
  margin-right: auto;
  margin-left: 15px;
}
</style>
