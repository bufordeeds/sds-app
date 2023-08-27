<template>
   <div class="content-container-bg bg-full-height" style=" padding-top: 50px ">

      <template v-if="page===1">
         <div class="blue-heading">
            Reset Password
         </div>

         <my-form style="max-width: 300px">
            <my-text-input
                label="Email"
                v-model="email"
            />

            <div style="text-align: center; font-size: 11pt">
               A reset link will be sent to this email.
            </div>


            <v-btn width="100%" class="mt-5" @click="reset_pw">
               Reset Password
            </v-btn>

         </my-form>

      </template>

      <div v-if="page===2" style="max-width: 500px">

         <div style="text-align: center;">
            Thank you.
         </div>

         <br>
         If an account with email {{email}} was found, a reset link has been sent.  Please check your
         spam folder if you do not receive an email within a few minutes.
      </div>



   </div>

</template>

<script>


import data_getters from "@/mixins/data_getters";

export default {
   name: "requestPassReset",
   mixins: [data_getters],

   data(){
      return{
         email:null,
         page: 1,
      }
   },
   methods:{
      reset_pw(){
         try{

            let payload = {
               api_key: process.env.VUE_APP_API_KEY,
               email: this.email,
            }
            this.make_request('/public/requestPassReset', payload)
            this.page = 2;
         }catch (e) {

            console.error(e);
         }
      }
   }
}
</script>

<style scoped>

</style>