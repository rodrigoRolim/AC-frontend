<template>
  <v-app>
    <div>
      <ac-navbar>
        <div id="desktop">
          <router-link to="/professor">professor</router-link>
          <router-link to="/aluno">aluno</router-link>
        </div>
        <div id="mobile">
          <router-link to="/professor"><i to="/professor" class="fas fa-chalkboard-teacher"></i></router-link>
          <router-link to="/aluno"><i class="fas fa-user-graduate"></i></router-link>
        </div>
      </ac-navbar>
      <div class="home-img">
        <img src="../assets/horas-atividades-complementares.png">
      </div> 
    </div>
  </v-app>
</template>

<script>
import AcNavbar from './AcNavbar'
export default {
  name: 'Home',
  components: { AcNavbar },
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
    if (typeof this.user != undefined && this.user != null) {
      switch(this.user.type_user) {
        case 'aluno':
          this.$router.replace('/aluno/home')
          break;
        case 'professor':
          this.$router.replace('/professor/home')
          break;
      }
    }
    
  }
}
</script>

<style  scoped>
.home-img {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 95px 0;
  transform: scale(1.5);
}
i {
  margin-right: 20px;
  font-size: 1.5rem;
  color: white;
}
#mobile a, #desktop a {
  align-self: center;
  color:#878c92;
  padding: 0;
}
#desktop {
  display: flex;
  flex-direction: row;
}
#mobile {
  display: none;
}
@media only screen and (max-width: 360px) {
  #mobile {
    display: flex;
    flex-direction: row;
  }
  #desktop {
    display: none;
  }
}
@media only screen and (min-width: 360px) and (max-width: 500px) {
  #mobile {
    display: flex;
    flex-direction: row;
  }
  #desktop {
    display: none;
  }
}
</style>