<template>
  <div
    class="content-container-bg"
    style="min-height: calc(100vh - 284px)"
  >
    <div v-if="error">
      There was an issue confirming your email.

      <!--         Please generate a new confirmation code for {{$route.query.email}} by click here.-->
    </div>

    <div
      v-else
      style="display: flex; justify-content: center; align-items: center; flex-direction: column;"
    >
      <div style="font-size: 18pt; padding: 30px 0 20px 0;">
        {{ confirmed_msg }}
      </div>

      <login-modal
        v-if="!reset_email"
        :email-fill="email"
      />

      <password-reset
        v-else
        :email-fill="email"
        pw-reset
      />
    </div>
  </div>
</template>

<script>

import data_getters from "@/mixins/data_getters";
import LoginModal from '@/components/app/LoginModal.vue';
import PasswordReset from "@/components/app/PasswordReset";

export default {
   name: "ConfirmEmail",
   components: {PasswordReset, LoginModal },
   mixins: [data_getters],
   data(){
      return {
         confirmed: null,
         confirmed_msg: '',

         email: null,
         error: null,

         reset_email: false,
      }
   },

   async created(){
      console.log(this.$route.query)
      this.email = this.$route.query.email;
      let payload = {
         email: this.$route.query.email,
         code:  this.$route.query.email_code,
      }
      try{

         this.$auth.cache_url('/signup');
         if (this.$auth.isAuthenticated()){
            await this.$auth.logout();
         }

         let res = await this.make_request('/auth/confirmEmail', payload);
         console.log('res')


         if (['AlreadyValidated', 'EmailConfirmed'].includes(res.msg) && this.$route.query.new_acct === 'yes'){
            await this.$router.push(`/signup?verified_email=${this.email}&passwordResetCode=${this.$route.query.passwordResetCode}`);
            return;
         }


         if (res.msg === 'AlreadyValidated'){
            this.confirmed_msg = `Email address ${this.$route.query.email} has already been confirmed.  Please log in.`
         }

         else if(res.msg === 'EmailConfirmed'){


            if (res.reset_pw === 'CreatePassword'){
               this.confirmed_msg = `Email  ${this.$route.query.email}  confirmed!  Please create a password.`
               this.reset_email= true;
            }

            else{
               this.confirmed_msg = `Email  ${this.$route.query.email}  confirmed!  Please wait while you're logged in...`
            }


         }


         //log in if session is provided
         if (res.jwt_token){
            let saved = await this.$auth.save_session_token(res.jwt_token);
            await this.$auth.check_is_logged_in();
         }


         console.log(res)
         // this.$router.push('/signup_old')
      }
      catch(e){
         this.error = true;
      }




   }

}
</script>

<style scoped>

</style>
