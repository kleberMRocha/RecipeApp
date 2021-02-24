<template>
  <div class="search" :class="{ 'focused': focused }">
    <font-awesome-icon icon="search" 
     :class="{ 'focusedIcon': focused || filled  }  " 
     
     />
    <input
      type="search"
      @focus="focused = true"
      @blur="focused = false"
      @keypress="$emit('getSearchValue', searchValue)"
      @input="searchValue = $event.target.value"
      :value="searchValue"
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
      searchValue: '',
    };
  },
  computed:{
  filled: function(){
    return !!this.searchValue.length
  },
  },
  props: {
    placeHolder: String,
  },
};
</script>

<style scoped>
input {
  width: 80%;
  margin:0 auto;
  height: 50px;
  border: none;
  background: none;
  outline: none;
  color: #e45826;
}
.search {
  background: #ffffff;
  border-radius: 15px;
  width: 70.5%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px auto;
  box-shadow: 2px 5px 3px -5px black;
  border-bottom: 2px solid #ffffff;
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
