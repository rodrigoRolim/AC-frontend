import { http } from './config'

export default {
  create: (student) => {

    return http.post('/student/add', student)
  },
  login: (userStudent) => {

    return http.post('/student/login', userStudent)
  },
  update (idStudent, student) {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.put(`/student/update/${idStudent}`, student)
  },
  readAll: (idDepartment) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.get(`/student/all/department/${idDepartment}`)
  },
  setSituation: (idStudent, newSituation) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.put(`/student/update/situation/${idStudent}`, { situation: newSituation })
  },
  getSituation: (idStudent) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.get(`/student/situation/${idStudent}`)
  },
  getById (idStudent) {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.get(`/student/${idStudent}`)
  }, 
  launchAll: (ras) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.post('/student/launch/all', { ras })
  },
  remove: (idStudent) => {
    let token = JSON.parse(localStorage.getItem('token'))
    http.defaults.headers.common['Authorization'] = `${token}`
    return http.delete(`/student/delete/${idStudent}`)
  }
}