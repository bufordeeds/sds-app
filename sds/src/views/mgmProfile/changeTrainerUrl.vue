<template>
   <v-dialog v-model="show_dialog" max-width="400px" persistent>
      <v-card>
         <div class="dialog-heading pa-2" style="display: flex">
            Change Custom Trainer URL
            <v-spacer/>
            <v-btn icon @click="show_dialog=false">
               <v-icon>close</v-icon>
            </v-btn>

         </div>

         <my-form ref="form" class="pl-5 pr-5 pb-6" v-if="!changed">
            <v-row dense>
               <v-col>

               </v-col>
            </v-row>


            <my-text-input
                label="Your custom trainer URL"
                v-model="trainer_url2"
                :rules="[isTrainerURL, isRequired]"
            />
            <div style="font-size: 10pt">
               Note: Only letters, numbers, and "_" are allowed.  All letters will be converted to lowercase.
            </div>



            <div class="pt-4">
               <div v-if="err_msg" class="pb-2" style="color: var(--color-input-error); text-align: center">
                  {{err_msg}}
               </div>
               <v-row class="ma-0">
                  <v-spacer/>
                  <v-btn @click="save_changes">Update
                  </v-btn>
               </v-row>
            </div>

         </my-form>



      </v-card>

   </v-dialog>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";

import _ from 'lodash';

export default {
   name: "ChangeTrainerUrl",
   mixins: [data_getters, validation],
   props: {
      value: {type: Boolean, default: false},
      trainer_url: String,
   },
   data(){
      return {
         show_dialog: this.value,
         trainer_url2: this.trainer_url,


         new_email: null,
         pass: null,

         err_msg: null,

         isPassword: true,

         changed: false,
      }
   },

   computed:{

      // trainer_url2:{
      //    get(){
      //       return this.trainer_url;
      //    },
      //    set(newVal){
      //       this.$emit('update:trainer_url', newVal);
      //    }
      // },

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



      trainer_url(newVal){
         if (newVal !== this.trainer_url2){
            this.trainer_url2 = newVal;
         }
      },

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

         console.log('debug')

         try{
            if (!this.$refs.form.validate()){
               return;
            }

            let payload = {trainer_url: this.trainer_url2};
            let res = await this.make_request('/private/changeTrainerUrl', payload,  {throwHTTPError:true});

            this.trainer_url2  = res;

            this.$emit('update:trainer_url', this.trainer_url2);



         }
         catch (e) {
            console.log(e);

            if (e instanceof this.RequestError){

               let res = _.get(e, 'response.data', null);
               if (res === 'already_taken'){
                  this.err_msg = `URL already taken`;
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