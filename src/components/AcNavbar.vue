<template>
  <div class="toolbar">
    <router-link id="logo" icon to="/"><v-icon x-large>access_time</v-icon></router-link>
    <a id="arrow-back" icon @click="$router.go(-1)"><v-icon>arrow_back</v-icon></a>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AcNavbar',
  props: {
    back: {
      type: String,
      default: "/"
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid transparent;
  justify-content: space-between;
  background-color: rgb(255, 255, 0);
}
#arrow-back {
  display: none;
}
.v-icon {
  font-size: 2.2rem;
  margin-left: 10px;
  color: white;
}


@media only screen and (min-width: 360px) and (max-width: 500px) {
  #arrow-back {
    display: flex;
    text-decoration: none;
  }
  #logo {
    display: none;
  }
  .toolbar {
    padding: 15px 0;
  }
  
}
@media only screen and (max-width: 360px) { 
  #arrow-back {
    display: flex;
    text-decoration-style: none;
  }
  #logo {
    display: none;
  }
}
</style>
