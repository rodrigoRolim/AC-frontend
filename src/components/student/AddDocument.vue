<template>
  <div>
    <ac-navbar>
      <div id="student-nav">
        <router-link to="/aluno/home"><i class="fas fa-home"></i></router-link>
        <router-link to=""><i class="fas fa-user"></i></router-link>
        <router-link to="/aluno/documento/add"><i class="fas fa-file-upload"></i></router-link>
      </div>
    </ac-navbar>
    <div class="container">
      <form>
        <div class="group-div">
          <label for="group">Grupo da atividade</label>
          <select name="group" id="group">
            <option value=""></option>
          </select>
        </div>
        <div class="item-div">
          <label for="item">Categoria da atividade</label>
          <select name="item" id="item">
            <option value=""></option>
          </select>
        </div>
        <div class="score-div">
          <label for="score">Quantos pontos vale a atividade</label>
          <input type="text" name="score" id="score">
        </div>
        <div class="document-div">
          <label>Selecione o documento</label>
            <span class="clipper">
              <label for="document" class="clip"><i class="fas fa-paperclip"></i></label>
              <input type="text" id="document-name" class="inputupload" readonly placeholder="clique no clip ao lado">
            </span>
            <input type="file" name="document" id="document" class="fileupload">
        </div>
        <div class="control-btns">
          <button type="submit">salvar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AcNavbar from '../AcNavbar'
import MaskLoad from '../MaskLoad'
import DocumentService from '@/services/Document.js'
import GroupService from '@/services/Group'
import StudentService from '@/services/Student'

export default {
  name: 'AddDocument',
  components: { AcNavbar, MaskLoad },
  data () {
    return {
      showMask: false,
      load: false,
      successUpload: false,
      messageAlert: '',
      alert: 'success',
      document: {
        name: null,
        score: null,
        path: null,
        group: null,
        item: null,
        //student: JSON.parse(localStorage.getItem('user'))._id
      },
      rules: {
        required: value => !!value || 'Required'
      },
      items: [],
      groups: [],
      groupsNames: [],
      situation: null,
      docName: '',
      docUrl: '',
      docFile: ''
    }
  },
  created () {
  /*   this.student = JSON.parse(localStorage.getItem('user'))._id
    this.showMask = true
    GroupService.readAll()
      .then((res) => res.data)
      .then((groups) => {
        this.groups = groups
        return groups
      })
      .then((groups) => this.namesGroups(groups))
      .then(() => this.getSituation(this.student))
      .then(() => setTimeout(() => { this.showMask = false }, 1000))
      .then(() => {
        if (this.$route.params.id) {
          this.getDocument(this.$route.params.id)
        }
      }) */
  },
  methods: {
    getDocument (id) {
      DocumentService.getById(id)
        .then((res) => res.data[0])
        .then((document) =>  this.getItemsWhenUpdate(document))
        .then((document) => {
          this.document = this.changeIdForNames(document)
        })
        .catch((err) => {

        })
    },
    getSituation (idStudent) {
      StudentService.getSituation(idStudent)
        .then((res) => res.data.situation)
        .then((situation) => this.situation = situation)
    },
    changeIdForNames (document) {
      
      const group = this.groups.filter((group) => group._id == document.group)[0]
      const item = group.items.filter((item) => item._id == document.item)[0]
      document.group = group.name
      document.item = item.name
      
      return document
    },
    getItemsWhenUpdate (document) {
      const group = this.groups.filter((group) => group._id === document.group)[0]
      group.items.map((item) => {
        this.items.push(item.description)
      })
      return document
    },
    namesGroups (groups) {
      groups.map((group) => {
        this.groupsNames.push(group.name)
      })
    },
    changeItem () {
      this.items = []
      const groups = this.groups.filter((group) => this.document.group == group.name)
      groups[0].items.map((item) => {
        this.items.push(item.description)
      })
      
    },
    getIdGroupItem (nameGroup, nameItem) {
      const group = this.groups.filter((group) => group.name == nameGroup)[0]
      const item = this.getIdItem(group.items, nameItem)
      return [group._id, item._id]
    },
    getIdItem (items, nameItem) {
      const item = items.filter((item) => item.description == nameItem)[0]
      return item
    },
    save () {

      const ids = this.getIdGroupItem(this.document.group, this.document.item)
      this.document.group = ids[0]
      this.document.item = ids[1]
   
      const formData = new FormData()
      if (this.situation == 'debting') {
        if (typeof this.$route.params.id == 'undefined') {
        
        formData.append('document', JSON.stringify(this.document))
        formData.append('file', this.docFile)
        DocumentService.save(formData)
          .then((res) => {
            this.getAlert('success', 'carregado com sucesso!')
          })
          .catch((err) => {
            this.getAlert('error', err.response.data.error)
          })
        } else {
          const idDoc = this.$route.params.id
          this.document.evaluation = 'none'
          this.document.sent = false
          formData.append('document', JSON.stringify(this.document))
          DocumentService.update(idDoc, JSON.parse(formData.get('document')))
            .then((res) => {
              this.getAlert('success', 'atualizado com sucesso!')
            })
        }
      } else {
        this.getAlert('info', 'você já está aprovado, não pode mais enviar documentos')
      }
     
    },
    getAlert (type, message) {
      this.reset()
      this.alert = type
      this.messageAlert = message
      this.successUpload = true
      setTimeout(() => {
        this.successUpload = false
      }, 5000)
    },
    reset () {
      this.$refs.form.reset()
    },
    pickFile () {
     
      this.successUpload = false
      this.$refs.doc.click()
      
    },
    onFilePicked (e) {
      const files = e.target.files
      if (typeof files[0] !== undefined) {
        
        this.docName = files[0].name

        if (this.docName.lastIndexOf('.') <= 0) {
          return 
        }
        const fr = new FileReader ()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          
          this.docUrl = fr.result
          this.docFile = files[0] //that can be sent to server

        })
      } else {
        this.docName = ''
        this.docUrl = ''
        this.docFile = ''
      }
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/aluno')
    },
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
#select {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  word-break: break-all;
}
#student-nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  
}
a { 
  color: white;
  font-size: 1.5rem;
  margin-right: 20px;
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
.inputupload {
  outline: none;
  border: none;
}
.clipper {
  margin-top: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ddd;
}
.fileupload {
  display: none;
}
.clip {
  border-right: 1px solid #ddd;
  padding: 10px 20px;
  background-color: rgba(230, 230, 233, 0.493);
  color: rgb(136, 135, 135);
  font-size: 1.0rem;
}
.control-btns {
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
@media only screen and (max-width: 360px) {
   form {
    flex-direction: column;
    width: 90%;
  }
  .control-btns {
    flex-direction: column;
  }
  button[type="submit"] {
    padding: 15px 0;
  }
  [class*="-div"] input, select {
    margin-top: 3px;
    width: 100%;
  }
  [class*="-div"] {
    margin-top: 10px;
  }
}
@media only screen and (max-width: 360px) and (max-width: 500px) {
  form {
    flex-direction: column;
    width: 90%;
  }
  .control-btns {
    flex-direction: column;
  }
  button[type="submit"] {
    padding: 15px 0;
  }
  [class*="-div"] input, select {
    margin-top: 3px;
    width: 100%;
  }
  [class*="-div"] {
    margin-top: 10px;
  }
}
</style>