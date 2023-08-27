<template>
   <div>

      <check-address
          :address-new="user.private_info.address"
          :address-old="private_info_address_old"
          @checked-address="on_save({checked_addr: $event})"
          ref="addrCheck"
      />





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
                   v-model="user.private_info.address.street1"
                   :rules="[isRequired]"
               ></my-text-input>
            </v-col>
         </v-row>


         <v-row dense>
            <v-col cols="6">
               <my-text-input
                   label="City*"
                   v-model="user.private_info.address.city"
                   :rules="[isRequired]"
               ></my-text-input>
            </v-col>

            <v-col cols="3">
               <my-text-input
                   label="State*"
                   v-model="user.private_info.address.state"
                   :rules="[isRequired]"
               ></my-text-input>

               <!--<my-drop-down-->
               <!--    label="State*"-->
               <!--    v-model="user.address.state"-->
               <!--    :list="states"-->
               <!--    item-value="abbr"-->
               <!--    item-text="txt"-->
               <!--    show-value-->
               <!--    :rules="[isRequired]"-->
               <!--/>-->

            </v-col>

            <v-col cols="3">
               <my-text-input
                   label="Zip*"
                   v-model="user.private_info.address.zip"
                   :rules="[isRequired, isZip]"
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
                   v-model="user.private_info.phone"
                   @change="user.private_info.phone = fmtPhone(user.private_info.phone)"
                   :rules="[isRequired, isPhone]"
               ></my-text-input>

            </v-col>
         </v-row>
      </my-form>

      <v-row>
         <v-spacer></v-spacer>
         <v-btn
             color="var(--color-primary)"
             @click="on_save"
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
import CheckAddress from "@/components/CheckAddress";

export default {
   name: "userInfo",
   components: {MyDropDown, CheckAddress},
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
            private_info:{
               address: {
                  street1: null,
                  street2: null,
                  city: null,
                  state: null,
                  zip: null,
               },
               phone: null
            },

         },

         show_address_confirm: false,
         address_suggestion: null,
         address_err: null,



         private_info_address_old: {},
      }
   },

   methods: {



      // async check_address(){
      //    try{
      //
      //       if (!this.$refs.form.validate()){
      //          return;
      //       }
      //
      //
      //       // this.loading_save = true;
      //
      //
      //       let verify = await this.verify_address(this.user.address);
      //       console.log({verify})
      //
      //       this.address_suggestion = null;
      //
      //       if (verify.success){
      //
      //          this.address_suggestion = verify.suggestion;
      //       }
      //       else{
      //          this.address_err = verify.error_msg;
      //       }
      //       this.show_address_confirm = true;
      //
      //       this.loading_save = false;
      //
      //    }catch (e) {
      //
      //       throw e;
      //    }
      // },


      async on_save({checked_addr}={}){

         try{

            if (!this.$refs.form.validate()){
               return;
            }


            this.loading_save = true;

            if (checked_addr === undefined){
               await this.$refs.addrCheck.check_address();
               this.loading_save = false;
               // this.private_info_address_old = _.cloneDeep(this.user.private_info.address);
               return;
            }
            else{
               //value returned from CheckAddress component's event (see component in template)
               this.user.private_info.address = checked_addr;
            }





            this.loading_save = true;
            let update = _.cloneDeep(this.user);

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
