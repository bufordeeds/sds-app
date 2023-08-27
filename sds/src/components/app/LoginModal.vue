<template>
   <div style="max-width:400px"  >

      <v-card-title v-if="isModal">Sign in</v-card-title>
      <my-form ref="form">
         <v-container>
            <v-row dense v-if="error_msg" class="ma-0 pl-2" style="color: var(--color-input-error); ">
               {{error_msg}}
            </v-row>
            <v-row>
               <v-col>



                  <my-text-input
                      label="Email Address"
                      v-model="email"
                      :rules="[isRequired, checkEmail]"
                  />


               </v-col>
            </v-row>


            <v-row dense>
               <v-col>

                  <my-text-input
                      label="Password"
                      v-model="password"
                      hint="Enter your password"
                      :rules="[isRequired]"
                      :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="showPass = !showPass"
                      :is-password="!showPass"
                      @keyup-enter="login"
                  />

               </v-col>
            </v-row>

            <div>
               <router-link to="/requestResetPassword" style="font-size: 10pt">
                  Reset Password
               </router-link>

            </div>

            <v-row class="pt-4 pl-3 pr-3">

               <v-btn color="var(--color-primary)" dark @click="login" width="100%"
               >Sign in</v-btn>
            </v-row>

            <v-row style="justify-content: center" class="mt-1">
               <router-link to="/signup" style="font-size: 10pt">
                  Create an account
               </router-link>
            </v-row>
         </v-container>

      </my-form>






   </div>
</template>

<script>
import axios from 'axios';

import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";


export default {
   name: "LoginModal",
   mixins: [data_getters, validation],
   props:{
      emailFill: {type: String, default: null},
      redirectOnLogin: {type: Boolean, default: false},
      isModal: {type: Boolean, default: true}, //
   },


   data(){
      return {
         email: this.emailFill,
         password: null,

         showPass: false,

         error_msg: null,
      }
   },

   methods:{
      async login(){
         this.error_msg = null;
         if (!this.$refs.form.validate()){
            return;
         }

         try{
            let loggedin = await this.$auth.login(this.email, this.password);

            console.log('i ran', this.$auth.isAuthenticated());

            this.$emit('logged-in', loggedin);
            if (this.$route.path === '/' || this.$route.path === '/login'){
               if (this.$auth.profile.acct_type === 'SDS-ADMIN'){
                  await this.$router.push('/admin/orders');
               }else{
                  await this.$router.push('/accountHome');
               }

            }
         }
         catch (e) {

            this.error_msg = 'Please Check Credentials'
         }
      }

   }//methods
}
</script>

<style scoped>

</style>
