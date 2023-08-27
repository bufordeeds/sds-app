<template>
   <div>

      <div class="pa-9" style="height: 100%; background-color: #add5f5">
         <signup-modal></signup-modal>

      </div>


   </div>
</template>

<script>
import SignupModal from '@/views/signup/SignupModal';

export default {
   name: "Signup",
   components: {SignupModal},

  created(){

  }


}
</script>

<style scoped>

</style>
