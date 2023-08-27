<template>
  <div>


  </div>
</template>

<script>
export default {
  name: "AdminHome",

  created(){
    this.$store.commit("set_show_side_nav", true);
  }
}
</script>

<style scoped src="./admin.css" />

<style scoped>

</style>