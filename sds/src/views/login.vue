<template>
  <div>
    <div class="page-title">
      Sign in
    </div>



    <div
      class="content-container-bg bg-full-height"
      style=" padding-top: 50px "
    >
      <login-modal
        style="width: 300px"
        :is-modal="false"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginModal from '@/components/app/LoginModal.vue';


export default {
   name: "Login",
   components: {LoginModal }
}
</script>

<style scoped>


</style>
