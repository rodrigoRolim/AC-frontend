<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
#app {
  font-family: Arial, Helvetica, sans-serif;
  letter-spacing: 0.3px;
  font-size: 0.9rem;
  color:rgb(53, 52, 52)
}

::-webkit-input-placeholder {text-indent:8px!important; font-size: 1.0rem}
:-moz-placeholder { text-indent:8px!important; font-size: 1.0rem}
::-moz-placeholder {text-indent:8px!important; font-size: 1.0rem}
::-ms-input-placeholder {text-indent:8px!important; font-size: 1.0rem} 
@media only screen and (min-width: 361px) and (max-width: 500px) {
  #app {
    font-size: 1.05rem;
  } 
}
</style>
