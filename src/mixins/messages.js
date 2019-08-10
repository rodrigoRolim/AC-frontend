export default {
  
  data: function () {
    return {
      messageAlert: '',
      alert: '',
      showAlert: false 
    }
  },
  methods: {
    getConfirmation (type, message) {
      this.messageAlert = message
      this.alert = type
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
        this.alert = null
      }, 3000)
    }
  }

}