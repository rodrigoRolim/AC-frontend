<template>
  <v-app>
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
    <div class="container">
    
    <v-layout justify-center class="container">
      <v-flex xs12 sm10 md8 lg6>
        <v-alert
        :value="validatedUser"
        type="error"
        >
        Usuário inválido.
        </v-alert>
        <v-card> 
          <v-toolbar
            card
            color="#43A047"
            dark
            >
            <v-toolbar-title>Login de Professor</v-toolbar-title>
          <v-spacer></v-spacer>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-form ref="form">
             <v-card-text>
              <v-text-field
                ref="professor.name"
                v-model="professor.name"
                :rules="[() => !!professor.name || 'This field is required']"
                label="Nome *"
                placeholder="john Doe"
                required
              ></v-text-field>    
              <v-text-field
                ref="professor.password"
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :rules="[rules.required]"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                label="Senha"
                hint="deve ter pelo menos 8 caracteres"
                v-model="professor.password"
                class="input-group--focused"
                @click:append="show = !show"
                required
              ></v-text-field>
            </v-card-text>
            <v-divider class="mt-5"></v-divider>
            <v-card-actions class="justify-end">
              <v-btn color="secondary" dark depressed @click="reset">Resetar</v-btn>
              <v-btn color="primary" depressed @click="login" :disabled="validated">Submit</v-btn>
            </v-card-actions>
          </v-form>
      </v-card>
    </v-flex>
  </v-layout>
    </div>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import ProfessorService from '@/services/Professor.js'
import router from '@/router/index'
export default {
  name: 'ProfessorLogin',
  components: { AcNavbar },
  data () {
    return {
      show: false,
      validatedUser: false,
      errorMessages: '',
      professor: {
        name: null,
        password: null
      },
      rules: {
        required: value => !!value || 'Required',
      }
    }
  },
  methods: {
    login () {
      ProfessorService.login(this.professor).then(response => {
        this.removeSession()
        if (response.status == 201) {
          this.createSession(response.data)
          this.$router.replace('/professor/home')
        }
      })
      .catch((err) => {
        this.validatedUser = true
        setTimeout(() => {
          this.validatedUser = false
        }, 10000)
      })
    },
    createSession (response) {
      this.setUser(response.user)
      this.setToken(response.token)
    },
    removeSession () {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    setUser (user) {
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken (token) {
      localStorage.setItem('token', JSON.stringify(token))
    },
    reset () {
      this.$refs.form.reset()
      // this.professor.name = ''
    }
  },
  computed: {
    form () {
      return this.professor
    },
    validated () {
      return this.professor.name == null || this.professor.password == null
    }
  }
}
</script>

<style scoped>
.container {
  padding: calc(18vh/2) 0;
}
.title {
  margin: 0 auto;
  width: 40%;
}
i {
  margin-right: 20px;
  font-size: 1.5rem;
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
