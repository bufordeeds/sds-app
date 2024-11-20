<template>
  <div>

    <!-- Angle BG -->
    <canvas class="hero-section-bg default" data-transition-in></canvas>

    <div
      class="content-container-bg bg-full-height"
      style="background-color:transparent;padding:16px;"
    >
      <login-modal
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
@media (min-width: 960px) {
  .content-container-bg.bg-full-height {
    padding-top: 48px;
  }
}
</style>
