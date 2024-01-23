<template>
  <v-dialog
    v-model="show_dialog"
    max-width="400px"
    persistent
  >
    <v-card>
      <div
        class="dialog-heading pa-2"
        style="display: flex"
      >
        Change Email
        <v-spacer />
        <v-btn
          icon
          @click="show_dialog=false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </div>

      <my-form
        v-if="!changed"
        ref="form"
        class="pl-5 pr-5 pb-6"
      >
        <v-row dense>
          <v-col />
        </v-row>


        <my-text-input
          v-model="new_email"
          label="New Email"
          :rules="[x=>isRequired(x, 'Email'), checkEmail]"
        />

        <my-text-input
          v-model="pass"
          label="Enter Password"
          :rules="[x=>isRequired(x, 'Password')]"
          :is-password="isPassword"
          :append-icon="pass_icon"
          @click:append="isPassword = !isPassword"
        />

        <div class="pt-4">
          <div
            v-if="err_msg"
            class="pb-2"
            style="color: var(--color-input-error); text-align: center"
          >
            {{ err_msg }}
          </div>
          <v-row class="ma-0">
            <v-spacer />
            <v-btn
              :loading="loading"
              @click="save_changes"
            >
              Change Email
            </v-btn>
          </v-row>
        </div>
      </my-form>

      <div
        v-else
        class="pa-2"
      >
        <p>
          Email updated.
        </p>
        Please check your inbox at <span style="font-weight: 500">{{ current_email }}</span>
        for a confirmation email.  Your new email address will not be
        active till you confirm this change.

        <v-row class="ma-0 pt-2">
          <v-spacer />
          <v-btn @click="show_dialog=false">
            Close
          </v-btn>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";

import _ from 'lodash';

export default {
   name: "ChangeEmail",
   mixins: [data_getters, validation],
   props: {
      value: {type: Boolean, default: false},
   },
   data(){
      return {
         show_dialog: this.value,

         new_email: null,
         pass: null,

         err_msg: null,

         isPassword: true,

         changed: false,

         loading: false,
      }
   },

   computed:{
     pass_icon(){
        if (this.isPassword){
           return 'visibility_off';
        }
        else{
           return 'visibility';
        }
     },

      current_email(){
        return this.$auth.profile.email;
      }
   },

   watch: {
      value(newVal){
         if (newVal !== this.show_dialog){
            this.show_dialog = newVal;
         }
      },

      show_dialog(newVal){
         this.$emit('input', newVal);
      },
   },

   methods:{
      async save_changes(){

         this.err_msg = null;

         try{
            if (!this.$refs.form.validate()){
               return;
            }


            this.loading = true;
            let payload = {new_email: this.new_email, password: this.pass};
            let res = await this.make_request('/private/changeEmail', payload,  {throwHTTPError:true});

            this.changed = true;

            this.loading = false;

         }
         catch (e) {
            console.log(e);

            if (e instanceof this.RequestError){

               let res = _.get(e, 'response.data.response', null);
               if (res === 'password_invalid'){
                  this.err_msg = `Password invalid`;
               }
               else if(res === 'email_exists'){
                  this.err_msg = `An account with that email already exists`;
               }
               else{
                  this.err_msg = e.message;
               }

            }else{
               console.log(e);
            }
         }
      }, //save_changes()


   }, //methods
}
</script>

<style scoped>

</style>