<template>
  <div>
    <div>
      Member center
    </div>
  </div>
</template>

<script>
export default {
   name: "MemberCenter",
   data () {
      return {

         right: null,
      }
   },

   created(){
      console.log('debug')
      this.$store.commit("set_show_side_nav", true);
   },

   // beforeDestroy() {
   //    this.$store.commit("set_show_side_nav", false);
   // }
}
</script>

<style scoped>


</style>
