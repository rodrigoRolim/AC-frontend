<template>
  <div class="container-progress">
    <h2>Progresso na disciplina</h2>
    <div class="progress-bar">
       <radial-progress-bar :diameter="110"
                        :completed-steps="10"
                        :total-steps="20"
                        startColor="red"
                        stopColor="red"
                        innerStrokeColor="#F6F6F6">
      <small style="color: red">Grupo: 1</small>
      <small style="color: red">Pontos: 10</small>
      </radial-progress-bar>
      <radial-progress-bar :diameter="110"
                          :completed-steps="15"
                          :total-steps="30"
                          startColor="green"
                          stopColor="green"
                          innerStrokeColor="#F6F6F6">
        <small style="color: green">Grupo: 2</small>
        <small style="color: green">Pontos: 15</small>
      </radial-progress-bar>
      <radial-progress-bar :diameter="110"
                          :completed-steps="20"
                          :total-steps="30"
                          startColor="#ECE502"
                          stopColor="#ECE502"
                          innerStrokeColor="#F6F6F6">
        <small style="color: #ECE502">Grupo: 3</small>
        <small style="color: #ECE502">Pontos: 20</small>
      </radial-progress-bar>
    </div>
   
  </div>
</template>

<script>
import GroupService from '@/services/Group'
import RadialProgressBar from 'vue-radial-progress'
export default {
  name: 'StudentProgress',
  props: ['documents', 'situation'],
  components: { RadialProgressBar },
  data () {
    return {
      interval: {},
      scoreboard: [],
      approved: false,
      total: 0,
      value: 0,
      groups: null,
      pointed_color: 0,
      colors: ['teal', 'primary', 'red'],
      pontos: 10,
      grupo: 3
    }
  },
  created () {
    /* console.log(this.$store.getters.getBoard)
    const student = JSON.parse(localStorage.getItem('user'))
    GroupService.readAll()
      .then((res) => res.data)
      .then((groups) => {
        this.groups = groups
        return
      })
      .then(() => this.setScoreboard())
      .catch((err) => console.log(err)) */
  },
  updated() {
    this.aprobation(this.$store.getters.getBoard)
  },
  methods: {
    getColor (count) {
      return this.colors[count%3]
    },
    setScoreboard () {

      const scores = this.groups.map((group) => {
        const scores_valides = this.documents.filter(doc => {
            return (doc.evaluation !== 'reproved') && doc.group == group.name
          })

        const score = scores_valides.reduce((acc, doc_ap) => {
            return acc + doc_ap.score
          }, 0)

        return { group: group.name, percent: score*100/group.scoreMin, raw: score, min: group.scoreMin }
      })
 
      this.scoreboard = scores
      this.$store.dispatch('set', scores)
      //return scores
    },
    aprobation (scoreboard) {
      this.scoreboard = scoreboard
      const total = this.scoreboard.reduce((acc, groupScore) => {
        return acc + groupScore.raw
      }, 0)

      const aproveds_groups = this.scoreboard.filter((item) => item.raw >= item.min)

      if (total >= 70 && aproveds_groups.length == this.groups.length) {
        this.total = total
        this.approved = true
      } else {
        this.total = total
        this.approved = false
      }
     
    },
  }
}
</script>

<style scoped>

.container-progress {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 8px;
  border: 1px solid #ddd;
}
h2 { text-align: center;}
.progress-bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.radial-progress-bar {
  display: flex;
  flex-direction: row;
}
strong {
  font-size: 1.15rem
}
</style>