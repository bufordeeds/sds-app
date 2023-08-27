<template>
   <div style="max-width:800px"  >


      <template v-if="!showConfirmed2">

         <div class="subheading-txt" style="">

            <span v-if="err_msg == null">
            Before we begin, let's verify your email
            </span>

            <div v-else>
               Oops, it looks like you already have an account. <br>

               <router-link to="/login">Log In</router-link>
            </div>
         </div>




         <my-form ref="form"  class="flex-centered-content-col" >

            <v-row dense style="max-width: 300px; width: 100%">
               <v-col cols="12">
                  <!--<v-text-field-->
                  <!--    label="Email Address"-->
                  <!--    v-model="email"-->
                  <!--    hint="Email you want your account confirmation sent to"-->
                  <!--    :rules="[x => isRequired(x, 'Email'), checkEmail]"-->
                  <!--    outlined-->
                  <!--    dense-->
                  <!--&gt;</v-text-field>-->

                  <my-text-input
                      label="Email Address"
                      v-model="email"
                      :rules="[isRequired, checkEmail]"
                  />

               </v-col>

               <!--<v-col cols="12">-->
               <!--   <my-text-input-->
               <!--       label="Password"-->
               <!--       v-model="password"-->
               <!--       hint="Enter your password"-->
               <!--       :rules="[isRequired, x => checkLength(x, 8)]"-->
               <!--       :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"-->
               <!--       @click:append="showPass = !showPass"-->
               <!--       :is-password="!showPass"-->
               <!--   />-->
               <!--   -->
               <!--</v-col>-->
            </v-row>

            <v-row>

            </v-row>

            <v-row>
               <!--               <v-checkbox-->
               <!--                   label="I Accept"-->
               <!--               ></v-checkbox>-->


            </v-row>





            <div class="flex-centered-content-col mt-6"  style="width: 100%; max-width: 280px;">

               <v-btn color="var(--color-primary)" dark @click="signup" :loading="loading_signup" width="100%"
                      style="text-transform: none !important;"
               >Verify Email</v-btn>

               <div>
                  Already have an <router-link to="/login">account</router-link>?
               </div>

            </div>

         </my-form>



      </template>


      <!----------------------------show after successful account creation--------------------------------------->
      <div v-else>
         <div style="padding: 60px 20px 60px 20px; text-align: left; ">

            <div class="subheading-txt" style="text-align: center; ">
               Please check your email
            </div>

            <p class="pt-6" style="text-align: center">
               A verification email has been sent to {{email}}.
            </p>

            <p>
               If you did not receive an email, please check your mail filter or use a
               <a @click="showConfirm=false; email=null">different email</a>.
               <!--(Link “different email” goes back to the first screen where they enter their address)-->
            </p>







         </div>

      </div>






   </div>
</template>

<script>
import axios from 'axios';

import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";

export default {
   name: "SignUpModal",
   mixins: [data_getters, validation],

   props:{
     showEmailConfirm: {type: Boolean, default: false},// used to bypass showing the account creation page
      acctType: {type: String, default: null}, // HANDLER, TRAINER, AIDE
   },

   data(){
      return {
         email: null,
         password: null,
         err_msg: null,

         showPass: false, // controls if password/text mode
         showConfirm: false, //shows confirmation page after account is created


         code: null, //verification code
         code_err_msg: [],
         code_confirmed: false,

         loading_signup: false,
      }
   },

   computed: {
      showConfirmed2(){

         if (this.showEmailConfirm || this.showConfirm ){
            return true;
         }

         return false;
      }
   },

   methods:{
      async signup(){

         //reset validation
         // this.$refs.form.resetValidation();
         // this.err_msg = null;
         // don't know why the fuck this is doing this, but if this code get's called, then error states don't show up
         // you call validate() below.




         let valid = this.$refs.form.validate();
         if (!valid){
            return null;
         }

         let payload = {
            email: this.email,
            // password: this.password,
            account_type: this.acctType,
         }


         console.log('test')
         try{
            this.loading_signup = true;

            let res = await this.make_request('/auth/createUser', payload, {throwHTTPError: true});


            // await this.$auth.save_session_token(res.token);
            // await this.$auth.check_is_logged_in();
            this.showConfirm = true;

            // this.$emit('sign-up-success')


            this.loading_signup = false;
         }
         catch(e){
            console.error(e)

            if (e.status === 400 && e.response && e.response.data.includes('email already exists')){
               this.err_msg = "Oops, it looks like you already have an account"
               this.loading_signup = false;
            }
         }



         // this.$router.push({path: url});
      },


      //verify the email with code
      async verify(){

         let email;



         if (this.showEmailConfirm){
            //assuming that we're logged in if showEmailConfirm prop is true
            email = this.$auth.profile.email;
         }else{
            email = this.email;
         }

         let payload = {
            email,
            code:  this.code,
         }

         try{
            let res = await this.make_request('/auth/confirmEmail', payload);
            this.code_confirmed = true;
            this.code_err_msg = [];
            this.$emit('email-verified')
         }
         catch(e){
            this.code_err_msg = [`Couldn't verify code`];
         }




      }


   }//methods
}
</script>

<style scoped>

</style>
