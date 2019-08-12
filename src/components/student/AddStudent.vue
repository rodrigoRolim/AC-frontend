<template>
  <div>
    <ac-navbar>
      <div class="list-nav">
        <a to="/professor">professor</a>
        <a to="/aluno">aluno</a>
      </div>
    </ac-navbar>
    <div class="container-add-student">
      <div :class="validate.form.class" v-if="validate.form.show && validated">
        <i class="far fa-times-circle"></i><p>{{validate.form.msg}}</p>
      </div>
      <form @submit.prevent="saveNewStudent()" ref="form" novalidate="true" 
      v-checkform="{ fields: validate, msg: 'resolvam os campos abaixo', 
      field: 'form', class: 'required-fields', object: 'student' }">
        <div class="name-div">
          <label for="name">Nome completo*</label>
          <input type="text" name="name" id="name"
          v-model="student.name"
          ref="name"
          :class="validate.name.class"
          v-required:keyup="{ field: 'name', msg: 'campo obrigatório', class: 'danger'}"
         >
         <small style="color: red" v-if="validate.name.show">{{validate.name.msg}}</small>
        </div>
        <div class="email-div">
          <label for="email">Email institucional*</label> 
          <input type="email" name="email" id="email"
          v-model="student.email"
          ref="email"
          placeholder="digite o seu email da utfpr"
          :class="validate.email.class"
          v-email:keyup="{ field: 'email', msg: 'email inválido', class: 'danger' }"
          >
           <small style="color: red" v-if="validate.email.show">{{validate.email.msg}}</small>
        </div>
        <div class="ra-div">
          <label for="ra">Registro Acadêmico (RA)*</label>
          <input type="text" name="ra" id="ra"  placeholder="ex: a123457"
          v-model="student.ra"
          ref="ra"
          :class="validate.ra.class"
          v-required:keyup="{ field: 'ra', msg: 'campo obrigatório', class: 'danger' }"
          >
          <small style="color: red" v-if="validate.ra.show">{{validate.ra.msg}}</small>
        </div>
        <div class="graduation-div">
          <label for="graduation">Curso de graduação*</label>
          <select name="graduation" id="graduation" placeholder="selecion o seu curso"
          v-model="student.graduation"
          ref="graduation"
          :class="validate.graduation.class"
          v-required:change="{ field: 'graduation', msg: 'campo obrigatório', class: 'danger' }"
          >
            <option value disabled selected hidden></option>
            <option value="aasd">option 2</option>
          </select>
          <small style="color: red" v-if="validate.graduation.show">{{validate.graduation.msg}}</small>
        </div>
        <div class="password-div">
          <label for="password">Crie uma senha*</label>
          <input type="password" name="password" id="password"
          v-model="student.password" 
          ref="password"
          placeholder="crie um senha"
          :class="validate.password.class"
          v-min:keyup="{ field: 'password', msg: 'mínimo de 8 caractéres', tam: 8, class: 'danger' }"
          >
          <small style="color: red" v-if="validate.password.show">{{validate.password.msg}}</small>
        </div>
        <div class="confirm-password-div">
          <label for="confirm-password">Confirme a senha*</label>
          <input type="password" name="confirm-password" id="confirm-password"
          v-model="student.confirm"
          ref="confirm"
          :class="validate.confirm.class"
          v-equal:keyup="{ field: 'confirm', msg: 'a senha não combina',
          equalto: 'password', class: 'danger', object: 'student'}"
          >
          <small style="color: red" v-if="validate.confirm.show">{{validate.confirm.msg}}</small>
        </div>
        <div class="control-btns">
          <button type="submit" >cadastrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AcNavbar from '../AcNavbar'
import router from '@/router/index'
import Student from '@/services/Student.js'
import GraduationService from '@/services/Graduation.js'
import { setTimeout } from 'timers';
import message from '../../mixins/messages'

export default {
  name: 'AddStudent',
  components: { AcNavbar },
  mixins: [message],
  data () {
    return {
      validate: {
        name: { msg: 'campo obrigatório', class: '', show: false },
        ra: { msg: 'campo obrigatório', class: '', show: false },
        email: { msg: 'email inválido', class: '', show: false, email: true },
        graduation: { msg: 'campo obrigatório', class: '', show: false },
        password: { msg: 'mínimo de 8 caractéres', class: '', tam: 8, show: false },
        confirm: { msg: 'a senha não combina com anterior', class: '', equalto: 'password', show: false },
        form: { msg: 'resolvam os campos abaixo', class: '', show: false}
      },
      student: {
        ra: null,
        name: null,
        email: null,
        graduation: null,
        password: null,
        confirm: null
      },
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
  },
  created () {
  // console.log(this.getConfirmation('error', 'asdasd'))
/* 
    GraduationService.readAll()
      .then((resp) => {
        this.graduations = resp.data
        resp.data.map(graduation => {
          this.graduationsNames.push(graduation.name)
        })
      })
      .catch((err) => this.getConfirmation('error', 'Ocorreu um erro, tente mais uma vez')) */
  },
  computed: {

    validated () {
      return this.student.name == null || this.student.name == '' || 
               this.student.email == null || 
               !this.pattern.test(this.student.email) || 
               this.student.ra == null ||
               this.student.graduation == null ||
               this.student.password == null || 
               this.student.password.length <= 0 ||
               this.student.confirm == null || 
               this.student.confirm !== this.student.password
    }
  },
  methods: {

    saveNewStudent () {
 
      if (!this.validated) {
        console.log("achivied request")
        return
      }
    },
    createStudent () {
      this.student.department = this.catchIdDepartment()
      Student.create(this.student).then(response => {
        if (response.status == 201) {
          this.getConfirmation('success','cadastrados com sucesso!')
        }
      })
      .catch((err) => {
        this.getConfirmation('error', 'Não foi possível efetuar o cadastro')
      })
    },
    getConfirmation (type, message) {
      this.messageAlert = message
      this.alert = type
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
        this.alert = null
      }, 3000)
    },
    catchIdDepartment () {
      const graduation = this.graduations.filter(grad => 
            grad.name == this.student.graduation)
      const id = graduation[0].deps[0]._id
      return id
    },
  }
}
</script>

<style scoped>
form {
  display: flex;
}
.container-add-student {
  display: flex;
  flex-direction: column;
  padding: calc(18vh/2) 0;
  align-items: center;
  width: 100%;
}
input {
  padding: 10px 0;
  text-indent: 8px;
}
input, select {
  border-radius: 3px;
  border: 1px solid #d1d5da;
}
option[disabled] {
  color: #d1d5da
}
select {
  background-color: white;
  padding: 9px 0;
  text-indent: 6px;
}
.control-btns {
  display: flex;
  flex-direction: row;
}
button[type="submit"] {
  background-color: rgba(73, 161, 73, 0.8);
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
.danger {
  border: 1px solid red;
}
.ok {
  border: 1px solid #d1d5da;
}
.required-fields {
  border: 1px solid rgb(250, 142, 142);
  color: white;
  background-color: red;
  border-radius: 2px;
  font-size: 1.0rem;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  margin-bottom: 30px;
  justify-content: center;
}
i {
  margin-right: 20px;
  font-size: 1.5rem;
}
::-webkit-input-placeholder {text-indent:8px!important; font-size: 1.0rem}
:-moz-placeholder { text-indent:8px!important; font-size: 1.0rem}
::-moz-placeholder {text-indent:8px!important; font-size: 1.0rem}
::-ms-input-placeholder {text-indent:8px!important; font-size: 1.0rem} 
@media only screen and (max-width: 360px) {
  .required-fields {
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
  .control-btns {
    flex-direction: column;
  }
  button[type="submit"] {
    padding: 15px 0;
  }
}
@media only screen and (min-width: 360px) and (max-width: 500px) {
  .required-fields {
    width: 90%
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
  input, select {
    padding: 13px 0;
    font-size: 1.05rem;
  }
  button[type="submit"] {
    padding: 18px 0;
    font-size: 1.1rem;
  }
  .control-btns {
    flex-direction: column;
  }
}

</style>
