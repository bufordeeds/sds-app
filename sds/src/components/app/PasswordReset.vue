<template>
  <div
    max-width="400"
    min-width="350px"
  >
    <div
      class=""
      style="color: var(--color-headline); text-align: center; font-weight: 500; font-size: 14pt"
    >
      <slot name="heading">
        <span v-if="heading != null">
          {{ heading }}
        </span>
      </slot>




      <!--<slot>-->


      <!--      <span v-else>-->
      <!--   {{type}} Password-->
      <!--   </span>-->
      <!--</slot>-->
    </div>


    <my-form
      ref="form"
      class="flex-centered-content-col"
    >
      <v-row
        v-if="error_msg"
        dense
        class="ma-0 pl-2"
        style="color: var(--color-input-error); "
      >
        {{ error_msg }}
      </v-row>

      <v-row dense>
        <v-col>
          <my-text-input
            v-model="password"
            label="Password"
            hint="Enter your password"
            :rules="[isRequired, x =>checkLength(x, 8)]"
            :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
            :is-password="!showPass"
            @click:append="showPass = !showPass"
          />


          <div class="mt-3">
            <slot name="pass-two-txt">
              <div style="color: var(--color-headline); text-align: center; font-weight: 500; font-size: 14pt">
                Please re-enter password
              </div>
            </slot>
          </div>


          <my-text-input
            v-model="password2"
            label="Password 2nd"
            hint="Enter your password"
            :rules="[isRequired, ]"
            :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
            :is-password="!showPass"
            @click:append="showPass = !showPass"
          />
        </v-col>
      </v-row>


      <div style="color:var(--color-input-error)">
        {{ pass_msg }}
      </div>


      <div
        class="pa-3 mt-5"
        style="width: 100%"
      >
        <v-btn
          color="var(--color-primary)"
          width="100%"
          :disabled="btn_disabled"
          :loading="loading"
          @click="reset_pw"
        >
          <slot name="button-text">
            {{ type }} Password
          </slot>
        </v-btn>
      </div>
    </my-form>
  </div>
</template>

<script>
import axios from 'axios';

import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";


export default {
   name: "PasswordReset",
   mixins: [data_getters, validation],
   props:{
      emailFill: {type: String, default: null}, //used to prefill the email field
      redirectOnLogin: {type: Boolean, default: false},

      type: {type: String, default: 'Create'}, //create | Reset
      pw_reset_code: {type: String, default: null}, //the password reset code

      heading:  {type: String, default: null},



   },

   data(){
      return {
         // email: this.emailFill,
         password: null,
         password2: null,

         showPass: false,

         error_msg: null,


         loading: false,

      }
   },


   computed:{
      btn_disabled(){
         return (this.password !== this.password2 || this.password == null || this.password2 == null || this.password === '' || this.password2 === '');


      },

      pass_msg(){
         if  (this.password !== this.password2){
            return `Passwords don't match`;
         }
         return ''
      }
   },


   methods:{
      async reset_pw(){
         this.error_msg = null;
         if (!this.$refs.form.validate()){
            return;
         }


         let code = this.pw_reset_code;
         if (code ==null){
            code = this.$route.query.pw_reset_code;
         }

         if (code == null){
            throw new Error('pw_reset code must be provided')
         }


         let email = this.emailFill;

         if (email ==null){
            email = this.$route.query.email;
         }

         if (email == null){
            throw new Error('email code must be provided')
         }


         try{

            this.loading = true;

            let payload = {
               email,
               code,
               pass: this.password,

            }
            let res = await this.make_request('/auth/updatePassword', payload);


            this.loading = false;
         }
         catch (e) {

            this.error_msg = 'There was an issue updating your password'
         }
         await this.$auth.login(email, this.password);
         this.$emit('pass-updated');


      }

   }//methods
}
</script>

<style scoped>
div >>> .v-input__slot{
    background-color: white !important;
}
</style>
