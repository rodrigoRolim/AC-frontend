<template>
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
    <div class="container">
      <div :class="validate.form.class" v-if="validate.form.show && validated">
        <i class="far fa-times-circle"></i><p>{{validate.form.msg}}</p>
      </div>
      <div class="header-form">
        <h3>Login de Estudante</h3>
      </div>
      <form @submit.prevent="login()" novalidate="true"
      v-checkform="{ fields: validate, msg: 'resolvam os campos abaixo', 
      field: 'form', class: 'required-fields', object: 'student' }">
        <div class="ra-div">
          <label for="ra">Registro acadêmico*</label>
          <input type="text" name="ra" id="ra" 
          v-model="student.ra"
          :class="validate.ra.class"
          v-required:keyup="{ field: 'ra', msg: 'campo obrigatório', class: 'danger' }"
          >
          <small style="color: red" v-if="validate.ra.show">{{validate.ra.msg}}</small>
        </div>
        <div class="password-div">
          <label for="password">senha*</label>
          <div class="password-toggle" :id="validate.password.class">
            <input :type="(password) ? 'password': 'text'" name="password" id="password" 
            v-model="student.password"
            v-required:keyup="{ field: 'password', msg: 'campo obrigatório', class: 'danger' }"
            >
           <i :class="(password) ? 'fas fa-eye': 'fas fa-eye-slash'" @click="password=!password" style="color: gray"></i>
          </div>
          <small style="color: red" v-if="validate.password.show">{{validate.password.msg}}</small>
        </div>
        <div class="buttons">
          <button type="submit">confirmar</button>
          <span><router-link to="/aluno/registrar">Cadastre-se</router-link></span>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AcNavbar from '../AcNavbar'
import router from '@/router/index'
import Student from '@/services/Student.js'

export default {
  name: 'StudentLogin',
  components: { AcNavbar},
  data () {
    return {
      validate: {
        ra: { field: 'ra', msg: 'campo obrigatório', class: '', show: false },
        password: { field: 'password', msg: 'mínimo de 8 caractéres', class: '', tam: 8, show: false },
        form: { field: 'form', msg: 'resolvam os campos abaixo', class: '', show: false}
      },
      student: {
        ra: null,
        password: null
      },
      password: true,
      eye: 'fas fa-eye'
    }
  },
  computed: {
    form () {
      return this.student
    },
    validated () {
      return this.student.ra === null || this.student.password == null
    }
  },

  methods: {
    login () {
     /*  this.showMask = true
      Student.login(this.student)
        .then(res => res.data)
        .then((students) => {
          this.removeSession()
          return students
        })
        .then((students) => this.createSession(students))
        .then(() => {
          setTimeout(() => {
          this.showMask = false
          this.$router.replace('/aluno/home')
          }, 2000)
        })
        .catch((err) => {
          this.showMask = false
          this.validatedUser = true
          setTimeout(() => {
            this.validatedUser = false
          }, 5000)
        }) */
    },
    createSession (response) {

      this.setUser(response.user)
      this.setToken(response.token)
    },
    removeSession () {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    setUser(user) {
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(token) {
      localStorage.setItem('token', JSON.stringify(token))
    },
    reset () {
      this.student.ra = null
      this.student.password = ''
    }
  }
}
</script>


<style scoped>
form{ display: flex; width: 100%;}
.container {
  display: flex;
  flex-direction: column;
  padding: calc(18vh/2) 0;
  align-items: center;
  border-top: 1px solid #d1d5da;
  width: 100%;
}
input {
  padding: 12px 0;
  text-indent: 8px;
  border-radius: 3px;
  border: 1px solid #d1d5da;
}
.title {
  margin: 0 auto;
  width: 40%;
}
i {
  margin-right: 20px;
  font-size: 1.5rem;
  color: white;
}
#mobile a, #desktop a {
  align-self: center;
  color:#c9dce6;
  padding: 0;
}
#desktop {
  display: flex;
  flex-direction: row;
}
#mobile {
  display: none;
}
.buttons {
  display: flex;
  flex-direction: row;
}
button[type="submit"] {
  background-color: rgb(1, 90, 255);
  border: 1px solid transparent;
  border-radius: 1px;
  margin-top: 50px;
  color: white;
  font-size: 1.0rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow:  inset 1px 2px 6px rgba(128, 125, 125, 0.288);
}
button[type="submit"]:active {
  background-color: rgba(105, 230, 105, 0.808);
}
button[type="submit"]:disabled {
  background-color: rgba(146, 146, 146, 0.527);
}
.buttons span {
  width: 30%;
  margin: 20px auto;
}
.danger {
  border: 1px solid red;
}
#danger {
  border: 1px solid red;
}
.required-fields, .error {
  border: 1px solid rgb(250, 142, 142);
  color: white;
  background-color: red;
  border-radius: 2px;
  font-size: 0.9rem;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  margin-bottom: 30px;
  justify-content: center;
}
.fa-eye {
  margin: 0 10px;
}
.fa-eye-slash {
  margin: 0 8px;
}
.password-toggle {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  padding: 0;
}
.password-toggle input {
  padding: 11px 0;
  border: 0;
  outline: none;
}
@media only screen and (max-width: 360px) {
   .required-fields, .error {
    display: flex;
    padding: 20px 0;
    width: 90%;
  }
  form {
    flex-direction: column;
    width: 100%;
  }
  [class*="-div"] input {
    margin-top: 3px;
    width: 100%;
  }
  [class*="-div"] {
    margin-top: 10px;
  }
  input {
    padding: 13px 0;
    font-size: 1.05rem;
  }
  #mobile {
    display: flex;
    flex-direction: row;
  }
  #desktop {
    display: none;
  }
  .buttons {
    flex-direction: column;
  }
  button[type="submit"] {
    padding: 15px 0;
  }
  .required-fields, .error {
    border: 1px solid rgb(250, 142, 142);
    color: white;
    background-color: red;
    border-radius: 2px;
    font-size: 0.9rem;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    margin-bottom: 30px;
    justify-content: center;
  }
}
@media only screen and (min-width: 360px) and (max-width: 500px) {
  .required-fields, .error {
    display: flex;
    padding: 20px 0;
    width: 90%;
  }
  form {
    flex-direction: column;
    width: 90%;
  }
  [class*="-div"] input, select {
    margin-top: 3px;
    width: 100%;
  }
  [class*="-div"] {
    margin-top: 10px;
  }
  input {
    padding: 13px 0;
    font-size: 1.05rem;
  }
  #mobile {
    display: flex;
    flex-direction: row;
  }
  #desktop {
    display: none;
  }
  .buttons {
    flex-direction: column;
  }
  button[type="submit"] {
    padding: 15px 0;
  }
}
</style>
