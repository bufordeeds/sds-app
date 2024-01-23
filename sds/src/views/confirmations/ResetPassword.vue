<template>
  <div
    class="content-container-bg"
    style="min-height: calc(100vh - 284px)"
  >
    <!--<div v-if="error">-->
    <!--   There was an issue confirming your email.-->

    <!--   &lt;!&ndash;         Please generate a new confirmation code for {{$route.query.email}} by click here.&ndash;&gt;-->

    <!--</div>-->

    <!--<div v-else-->
    <!--     style="display: flex; justify-content: center; align-items: center; flex-direction: column;"-->
    <!--&gt;-->

    <!--   <div style="font-size: 18pt; padding: 30px 0 20px 0;" >-->
    <!--      {{confirmed_msg }}-->
    <!--   </div>-->

    <!--   <password-reset-->
    <!--       :email-fill="email"-->
    <!--       type="Change"-->
    <!--       @pass-updated=""-->
    <!--   />-->
    <!--</div>-->



    <password-reset
      v-if="confirmed===false"
      :email-fill="email"
      type="Change"
      @pass-updated="confirmed=true"
    />


    <div v-else>
      Thank you.  Your password has been changed.

      <!--<login-modal/>-->
    </div>
  </div>
</template>

<script>

import data_getters from "@/mixins/data_getters";
import LoginModal from '@/components/app/LoginModal.vue';
import PasswordReset from "@/components/app/PasswordReset";

export default {
   name: "ResetPassword",
   components: {PasswordReset, LoginModal },
   mixins: [data_getters],
   data(){
      return {
         confirmed: false,
         confirmed_msg: '',

         email: null,
         error: null,

         reset_email: false,



      }
   },

   async created(){




   }

}
</script>

<style scoped>

</style>
