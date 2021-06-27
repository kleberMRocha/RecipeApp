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
  z-index: 999;
  width: 80%;
  margin:0 auto;
  height: 50px;
  border: none;
  background: none;
  outline: none;
  color: #E36153;
}
.search {
  background: #ffffff;
  border-radius: 15px;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px auto;
  box-shadow: 2px 5px 3px -5px black;
  border: 2px solid #D0C4C2;
}
.focused {
  border: 2px solid #E36153;
}
.search svg {
  margin-right: auto;
  margin-left: 15px;
}
.focusedIcon {
  color: #E36153;
}
</style>
