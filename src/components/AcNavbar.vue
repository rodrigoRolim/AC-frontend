<template>
  <div class="toolbar">
    <a  icon to="/"><v-icon class="icon" x-large>access_time</v-icon> </a> 
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AcNavbar',
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.toolbar {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid
}
</style>
