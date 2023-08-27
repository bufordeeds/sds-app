<template>
   <div>

      <v-dialog v-model="show_address_confirm" max-width="500px">
         <v-card class="pa-3">
            <div class="dialog-heading mb-3" style="color: var(--color-headline); font-weight: 600;">
               Address Verification
               <v-divider/>
            </div>



            <template v-if="address_suggestion!== null">
               <div style="display: flex; justify-content: space-between" >

                  <div>
                     <div style="font-weight: 600; color: grey">
                        Entered Address
                     </div>
                     {{user.address.street1}} <br>
                     {{user.address.street2}} <br v-if="address_suggestion.street2 != null">
                     {{user.address.city}}, {{user.address.state}} {{user.address.zip}}


                  </div>

                  <div>
                     <div style="font-weight: 600; color: grey">
                        Suggestion
                     </div>
                     {{address_suggestion.street1}} <br>
                     {{address_suggestion.street2}} <br v-if="address_suggestion.street2 != null">
                     {{address_suggestion.city}}, {{address_suggestion.state}} {{address_suggestion.zip}}
                  </div>
               </div>


               <div style="display: flex; justify-content: space-between">
                  <div style="display: flex; justify-content: center" class="mt-3">
                     <v-btn small
                            @click="on_save()"
                     >Use Entered</v-btn>
                  </div>


                  <div style="display: flex; justify-content: center" class="mt-3">
                     <v-btn  small @click="show_address_confirm=false">Edit Address</v-btn>
                  </div>

                  <div style="display: flex; justify-content: center" class="mt-3">
                     <v-btn  small @click="on_save('USE_SUGGESTION')"
                     >Use Suggestion</v-btn>
                  </div>
               </div>
            </template>


            <div v-else>
               <div style="color: var(--color-input-error)">
                  {{address_err}}
               </div>


               <div style="display: flex; justify-content: flex-end">
                  <v-btn @click="show_address_confirm=false">Close</v-btn>
               </div>
            </div>

         </v-card>
      </v-dialog>
















      <my-form ref="form">

<!--         <v-row dense>-->
<!--            <v-col cols="5">-->

<!--               <my-drop-down-->
<!--                   label="Account Type"-->
<!--                   v-model="user.account_type"-->
<!--                   :list="[{txt: 'Trainer', val: 'TRAINER'}, {txt: 'Handler', val: 'HANDLER'}, {txt: 'Aide', val: 'AIDE'}]"-->
<!--                   item-value="val"-->
<!--                   item-text="txt"-->
<!--                   :rules="[isRequired]"-->
<!--               />-->

<!--            </v-col>-->
<!--         </v-row>-->


         <v-row dense>
            <v-col >
               <my-text-input
                   label="First Name*"
                   v-model="user.name_first"
                   :rules="[isRequired]"
               ></my-text-input>
            </v-col>

            <v-col>
<!--               <v-text-field-->
<!--                   label="Last Name*"-->
<!--                   v-model="user.name_last"-->
<!--                   outlined-->
<!--                   dense-->
<!--                   :hide-details="hide_details"-->
<!--                   :rules="[isRequired]"-->
<!--               ></v-text-field>-->

               <my-text-input
                   label="Last Name*"
                   v-model="user.name_last"
                   :rules="[isRequired]"
               ></my-text-input>
            </v-col>
         </v-row>

         <v-row dense>
            <v-col >
<!--               <v-text-field-->
<!--                   label="Address*"-->
<!--                   v-model="user.address1"-->
<!--                   outlined-->
<!--                   dense-->
<!--                   :hide-details="hide_details"-->
<!--                   :rules="[isRequired]"-->
<!--               ></v-text-field>-->

               <my-text-input
                   label="Address*"
                   v-model="user.address.street1"
                   :rules="[isRequired]"
               ></my-text-input>
            </v-col>
         </v-row>


         <v-row dense>
            <v-col cols="6">
               <my-text-input
                   label="City*"
                   v-model="user.address.city"
                   :rules="[isRequired]"
               ></my-text-input>
            </v-col>

            <v-col cols="3">
<!--               <my-text-input-->
<!--                   label="State*"-->
<!--                   v-model="user.state"-->
<!--                   :rules="[isRequired]"-->
<!--               ></my-text-input>-->

               <my-drop-down
                   label="State*"
                   v-model="user.address.state"
                   :list="states"
                   item-value="abbr"
                   item-text="txt"
                   show-value
                   :rules="[isRequired]"
               />

            </v-col>

            <v-col cols="3">
               <my-text-input
                   label="Zip*"
                   v-model="user.address.zip"
                   :rules="[isRequired, isPhone, x =>checkLength(x, 5)]"
               ></my-text-input>

            </v-col>
         </v-row>

         <v-row dense>
            <!--<v-col >-->
            <!--   <my-text-input-->
            <!--       label="Email*"-->
            <!--       v-model="email"-->
            <!--       :rules="[isRequired]"-->
            <!--       disabled-->
            <!--   ></my-text-input>-->
            <!--</v-col>-->

            <v-col>
               <my-text-input
                   label="Phone*"
                   v-model="user.phone"
                   :rules="[isPhone]"
               ></my-text-input>

            </v-col>
         </v-row>
      </my-form>

      <v-row>
         <v-spacer></v-spacer>
         <v-btn
             color="var(--color-primary)"
             @click="check_address"
             :loading="loading_save"
         >Save</v-btn>

         <v-spacer></v-spacer>
      </v-row>
   </div>
</template>

<script>
import validation from "@/mixins/validation";
import data_getters from "@/mixins/data_getters";
import MyDropDown from "@/components/inputs/MyDropDown";
import states from "@/data/states";
import _ from 'lodash';

export default {
   name: "userInfo",
   components: {MyDropDown},
   mixins: [validation, data_getters],
   data(){
      return{
         hide_details: true,
         loading_save: false,

         email: this.$auth.profile.email,
         states: states,

         user: {
            account_type: null,
            name_first: null,
            name_last: null,
            address: {
               street1: null,
               street2: null,
               city: null,
               state: null,
               zip: null,
            },
            phone: null
         },

         show_address_confirm: false,
         address_suggestion: null,
         address_err: null,

      }
   },

   methods: {



      async check_address(){
         try{

            if (!this.$refs.form.validate()){
               return;
            }


            this.loading_save = true;
            let verify = await this.verify_address(this.user.address);
            console.log({verify})

            this.address_suggestion = null;

            if (verify.success){

               this.address_suggestion = verify.suggestion;
            }
            else{
               this.address_err = verify.error_msg;
            }
            this.show_address_confirm = true;

            this.loading_save = false;

         }catch (e) {

            throw e;
         }
      },


      async on_save(pick_addr){

         try{

            if (!this.$refs.form.validate()){
               return;
            }

            // let verify = await this.verify_address(this.user.address);
            // // let verify = await this.make_request('/store/verifyAddress', {address: this.user.address});
            // console.log({verify})
            //
            //
            // if (verify.success){
            //
            //    this.address_suggestion = verify.suggestion;
            // }
            // else{
            //    this.address_err = verify.error_msg;
            // }
            // this.show_address_confirm = true;




            this.loading_save = true;
            let update = _.cloneDeep(this.user);
            if (pick_addr === 'USE_SUGGESTION'){
               update.address = this.address_suggestion;
            }



            if (update.account_type === 'TRAINER'){
               update.trainer_info = {};
            }

            if (update.account_type === 'HANDLER'){
               update.handler_info = {};
            }

            if (update.account_type === 'AIDE'){
               update.aide_info = {};
            }

            let payload = {
               user_id: this.$auth.profile.user_id,
               update,
            }
            let res = await this.make_request('/private/updateUserProfile', payload);

            this.$emit('user_updated')
            //
            this.loading_save = false;
            this.show_address_confirm = false;
         }catch (e) {

            throw e;
         }

      }
   }, //methods


   async created(){
      try{
         let user = await this.make_request('/private/getMyProfile', {});
         this.user.account_type = user.account_type;
         this.user.name_first = user.name_first;
         this.user.name_last = user.name_last;

         console.log(user)

      }catch (e) {
         console.log(e);
      }
   }


}
</script>

<style scoped>
div >>> .row{
   padding: 5px;
}

</style>
