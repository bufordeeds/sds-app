<template>
   <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">

      <div v-if="error" style="font-size: 18pt; padding: 30px 0 20px 0;">
         There was an issue confirming your new email.  Did you already confirm it?

<!--         Please generate a new confirmation code for {{$route.query.email}} by click here.-->

      </div>

     <div v-else

     >

       <div style="font-size: 18pt; padding: 30px 0 20px 0;" >
         {{confirmed_msg }}
       </div>

<!--       <login-modal :email-fill="email"/>-->
     </div>

   </div>
</template>

<script>

import data_getters from "@/mixins/data_getters";
import LoginModal from '@/components/app/LoginModal.vue';

export default {
   name: "ConfirmEmailChange",
   mixins: [data_getters],
   components: {LoginModal },
   data(){
      return {
         confirmed: null,
        confirmed_msg: '',

         email: null,
         error: null
      }
   },

   async created(){
      console.log(this.$route.query)
      this.email = this.$route.query.email;
      let payload = {
         user_id: this.$route.query.user_id,
         code:  this.$route.query.code,
      }
      try{

         // this.$auth.cache_url('/accountHome');
         let res = await this.make_request('/auth/confirmEmailChange', payload);


         if(res === 'Email Confirmed'){
          this.confirmed_msg = `Confirmed.  You email has been changed to ${this.$route.query.email}.  Please Log in `;
        }

         this.$auth.logout({emit: false});

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
