<template>
  <div class="toolbar">
    <router-link id="des-logo" icon to="/"><v-icon x-large>access_time</v-icon></router-link>
    <router-link id="arrow-back" icon to="/"><v-icon>arrow_back</v-icon></router-link>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AcNavbar',
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
  #des-logo {
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
  #des-logo {
    display: none;
  }
}
</style>
