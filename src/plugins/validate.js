const validate = {}
validate.install = (Vue, options) => {
  let className_msg = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
 
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
          
      el.addEventListener('submit', e => {
        let empties = false
        binding.value.fields.forEach(input => {
          
          vnode.context.validate[input].class = vnode.context.$refs[input].value == '' ? 'danger' : ''
          empties =  vnode.context.$refs[input].value == ''
        });
        if (empties) {
          vnode.context.validate[binding.value.field].msg = binding.value.msg
          vnode.context.validate[binding.value.field].show = empties
        }
      })
    }
  })
  Vue.directive('equal', {
    inserted: (el, binding, vnode) => {

      vnode.context.validate[binding.value.field].msg = binding.value.msg

      el.addEventListener(binding.arg, e => {
        vnode.context.validate[binding.value.field].class = (e.target.value !== vnode.context.student[binding.value.equalto]) ? binding.value.class : ''
        vnode.context.validate[binding.value.field].show = e.target.value !== vnode.context.student[binding.value.equalto]
      })
    }
  })
}
export default validate