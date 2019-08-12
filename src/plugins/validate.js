const validate = {}
validate.install = (Vue, options) => {
 
  Vue.directive('required', {
   
    inserted: (el, binding, vnode) => {
   
      vnode.context.validate[binding.value.field].msg = binding.value.msg
      
      el.addEventListener(binding.arg, e => {

        vnode.context.validate[binding.value.field].class = (!e.target.value) ? binding.value.class : ''
        vnode.context.validate[binding.value.field].show = !e.target.value
      })
    }
  })
  Vue.directive('email', {
    inserted: (el, binding, vnode) => {
        
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      vnode.context.validate[binding.value.field].msg = binding.value.msg
      
      el.addEventListener(binding.arg, e => {

        vnode.context.validate[binding.value.field].class = (!pattern.test(e.target.value)) ? binding.value.class : ''
        vnode.context.validate[binding.value.field].show = !pattern.test(e.target.value)
      })
    }
  })
  Vue.directive('min', {
    inserted: (el, binding, vnode) => {

      vnode.context.validate[binding.value.field].msg = binding.value.msg

      el.addEventListener(binding.arg, e => {

        vnode.context.validate[binding.value.field].class = (e.target.value.length < binding.value.tam ) ? binding.value.class : ''
        vnode.context.validate[binding.value.field].show = e.target.value.length < binding.value.tam
      })
    }
  })
  Vue.directive('checkform', {
    inserted: (el, binding, vnode) => {

      const object = binding.value.object
      let trueList = []
      const validate = binding.value.fields
      
      el.addEventListener('submit', e => {

        Object.keys(validate).forEach(input => {
          
          vnode.context.validate[input].class = vnode.context.$refs[input].value == '' ? 'danger' : ''
          vnode.context.validate[input].show = vnode.context.$refs[input].value == ''
          trueList.push(vnode.context.$refs[input].value == '')
          
          if (validate[input].tam) {

            const condition = (!vnode.context[object][input] || vnode.context[object][input].length < validate[input].tam)
            vnode.context.validate[input].class = condition ? 'danger' : ''
            vnode.context.validate[input].show = condition
            trueList.push(condition)
          }
          if (validate[input].equalto) {

            const differents = vnode.context[object][input] !== vnode.context[object][validate[input].equalto]
            vnode.context.validate[input].class = (differents || !vnode.context[object][input]) ? 'danger' :  ''
            vnode.context.validate[input].show = (differents || !vnode.context[object][input])
            trueList.push(differents || !vnode.context[object][input])
          }
          if (validate[input].email) {
       
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            vnode.context.validate[input].class = (!pattern.test(vnode.context[object][input])) ? 'danger' : ''
            vnode.context.validate[input].show = (!pattern.test(vnode.context[object][input]))
            trueList.push((!pattern.test(vnode.context[object][input])))
          }
          

        });

        vnode.context.validate[binding.value.field].class = binding.value.class
        vnode.context.validate[binding.value.field].show = !trueList.every(el => !el)
        if (trueList.every(el => !el)) {
          vnode.context.$refs.form.reset()
        }
      })
    }
  })
  Vue.directive('equal', {
    inserted: (el, binding, vnode) => {

      const object = binding.value.object
      vnode.context.validate[binding.value.field].msg = binding.value.msg

      el.addEventListener(binding.arg, e => {

        vnode.context.validate[binding.value.field].class = (e.target.value !== vnode.context[object][binding.value.equalto]) ? binding.value.class : ''
        vnode.context.validate[binding.value.field].show = e.target.value !== vnode.context[object][binding.value.equalto]
      })
    }
  })
}
export default validate