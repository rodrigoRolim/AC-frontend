<template>
  <div>
    <ac-navbar>
      <div id="student-nav">
        <router-link to="/aluno/home"><i class="fas fa-home"></i></router-link>
        <router-link to=""><i class="fas fa-user"></i></router-link>
        <router-link to="/aluno/documento/add"><i class="fas fa-file-upload"></i></router-link>
      </div>
    </ac-navbar>
    <student-progress ></student-progress>
    <ac-student-document></ac-student-document>
  </div>
</template>

<script>
import AcNavbar from '../AcNavbar'
import MaskLoad from '../MaskLoad'
import StudentDocuments from '../StudentDocuments'
import StudentProgress from '../StudentProgress'
import AcStudentDocument from '../AcStudentDocument'
import StudentService from '@/services/Student'
import DocumentService from '@/services/Document'
import GroupService from '@/services/Group'
import pdfjs from 'pdfjs-dist'

export default {
  name: 'StudentHome',
  components: { AcNavbar, MaskLoad, AcStudentDocument, StudentProgress },
  data () {
    return {
      message: '',
      typeAlert: 'error',
      showAlert: false,
      showMask: false,
      pdf: null,
      documents: [],
      situation: null
    }
  },
  created () {
    /* this.showMask = true
    this.initialize(JSON.parse(localStorage.getItem('user'))._id) */
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/aluno')
    },
    getSituation (idStudent) {
      StudentService.getSituation(idStudent)
        .then((res) => res.data.situation)
        .then((situation) => this.situation = situation)
        .catch((err) => this.getAlert('error', 'ocorreu um erro, tente mais uma vez'))
    },
    initialize (idStudent) {
      GroupService.readAll()
        .then((res) => res.data)
        .then((groups) => this.getDocuments(idStudent, groups))
        .then(() => this.getSituation(idStudent))
        .catch((err) => this.getAlert('error', 'ocorreu um erro, tente mais uma vez'))
    },
    getDocuments (idStudent, groups) {
       DocumentService.readAll(idStudent)
        .then((res) => res.data)
        .then((documents) => {
          if (documents.length > 0) {
            } else {
            this.documents = this.replaceIdForNames(groups, documents)
            this.documents = []
          }
          setTimeout(() => {
            this.showMask = false 
          }, 1000)
        })
        .catch((err) => {
          this.showMask = false
          this.getAlert('error', 'ocorreu um erro, tente mais uma vez')
        })
    },
    getNameGroup(groupId, groups) {
      const group = groups.filter((group) => group._id == groupId)
      return group
    },
    getNameItem (group, idItem) {
      const item = group[0].items.filter((item) => item._id == idItem)
      return item
    },
    replaceIdForNames (groups, documents) {

      const newdocuments = documents.map((document) => {
        const group = this.getNameGroup(document.group, groups)
        const item = this.getNameItem(group, document.item)
   
        document.group = group[0].name
        document.item = item[0].description
        return document
      })
  
      return newdocuments
    },
    getAlert (type, message) {
      this.typeAlert = type
      this.message = message
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 5000)
    }
  }
}
</script>

<style scoped>
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
</style>