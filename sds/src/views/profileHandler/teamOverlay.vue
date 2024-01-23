<template>
  <div
    style="background-color: white"
    class="pa-3"
  >
    <div class="headline-txt">
      Terms of Access and Use
    </div>

    <p>
      Did you know that many Service Dogs perform tasks or work for individuals with disabilities which may or may not be
      apparent to you? Please don't ask about anyone's disability - it's against the law. The U.S. Department of Justice
      and the Americans with Disabilities Act (ADA) allows for Service Dog owners to be taken at their word. You are
      permitted to ask up to two questions — only if it isn't obvious that the animal is a Service Dog. Under federal
      law you may not demand proof of someones disability, Service Dog training, licencing, registration or certification.
    </p>


    <p>
      By clicking continue you are signaling that you understand the purpose of
      <router-link to="/faq">
        Service Dog Standards
      </router-link>
      and agree to our
      <router-link to="/terms-access-use">
        Terms of Access and Use
      </router-link>.
    </p>


    <div style="justify-content: center; display: flex">
      <v-btn>
        Continue
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
name: "TeamOverlay"
}
</script>

<style scoped>

</style>