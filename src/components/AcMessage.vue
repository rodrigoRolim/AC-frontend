<template>
   <div :class="confirmation.alert">
      <p v-if="confirmation.show">{{confirmation.message}}</p>
   </div>
</template>

<script>
export default {
  props: {
    confirmation: {
      type: Object,
      default: () => {}
    },
  }
}
</script>

<style scoped>

</style>