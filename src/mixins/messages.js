export default {
  
  data: function () {
    return {
      messageAlert: '',
      alert: '',
      showAlert: false 
    }
  },
  methods: {
    getConfirmation (type, message, time) {
      console.log(time)
      this.messageAlert = message
      this.alert = type
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
        this.alert = null
      }, time)
    }
  }

}