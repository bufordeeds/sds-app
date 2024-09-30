<template>
  <v-card max-width="400" min-width="350px">
    <v-card-title>{{ type }} Password</v-card-title>
    <my-form ref="form">
      <v-container>
        <v-row v-if="error_msg" dense class="ma-0 pl-2" style="color: var(--color-input-error); ">
          {{ error_msg }}
        </v-row>
        <v-row>
          <v-col>
            <!--                  <v-text-field-->
            <!--                      label="Email Address"-->
            <!--                      v-model="email"-->
            <!--                      hint="Please enter you email address"-->
            <!--                      :rules="[isRequired, checkEmail]"-->
            <!--                      outlined-->
            <!--                      dense-->
            <!--                  ></v-text-field>-->


            <my-text-input v-model="email" label="Email Address" :rules="[isRequired, checkEmail]" disabled />
          </v-col>
        </v-row>


        <v-row dense>
          <v-col>
            <my-text-input v-model="password" label="Password" hint="Enter your password" :rules="[isRequired]"
              :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'" :is-password="!showPass"
              @click:append="showPass = !showPass" />


            <!--                  <v-text-field-->
            <!--                      label="Password"-->
            <!--                      v-model="password"-->
            <!--                      hint="Enter your password"-->
            <!--                      :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"-->
            <!--                      @click:append="showPass = !showPass"-->
            <!--                      :type="showPass ? 'text' : 'password'"-->
            <!--                      :rules="[isRequired]"-->
            <!--                      @keyup.enter="login"-->
            <!--                      outlined-->
            <!--                      dense-->
            <!--                  ></v-text-field>-->
          </v-col>
        </v-row>

        <v-row class="pt-4">
          <v-spacer />
          <div class="pr-3">
            <v-btn color="var(--color-primary)" dark @click="reset_pw">
              {{ type }} Password
            </v-btn>
          </div>
        </v-row>
      </v-container>
    </my-form>
  </v-card>
</template>

<script>
import axios from 'axios';

import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";


export default {
  name: "LoginModal",
  mixins: [data_getters, validation],
  props: {
    emailFill: { type: String, default: null }, //used to prefill the email field
    redirectOnLogin: { type: Boolean, default: false },

    type: { type: String, default: 'Create' }, //create | Reset


  },


  data() {
    return {
      email: this.emailFill,
      password: null,

      showPass: false,

      error_msg: null,
    }
  },

  methods: {
    async reset_pw() {
      this.error_msg = null;
      if (!this.$refs.form.validate()) {
        return;
      }

      try {

        let payload = {
          email: this.$route.query.email,
          code: this.$route.query.pw_reset,
          pass: this.password,

        }
        let res = await this.make_request('/auth/updatePassword', payload);
        let loggedin = await this.$auth.login(this.email, this.password);
      }
      catch (e) {

        this.error_msg = 'Please Check Credentials'
      }
    }

  }//methods
}
</script>

<style scoped></style>
