<template>
  <div>
    <v-card>
      <v-card-title>
        <span v-if="areEditing">
          Edit Access Level
        </span>
        <span v-else>
          <!--Invite {{header_text}}-->
          Transfer Service Dog
        </span>
      </v-card-title>





      <v-container class="pa-6 pt-0">
        <div v-if="!areEditing">
          Enter email address of the user you want to transfer
          <span style="font-weight: 500; font-style: italic">{{ dog.name }}</span> to.
        </div>


        <div style="display: flex; ">
          <my-form ref="form">
            <text-input
              v-model="email"
              label="User's Email"
              :rules="[isRequired, checkEmail]"
              :disabled="searched"
              @keyup-enter="click_search"
            />
          </my-form>



          <v-btn
            ref="searchbtn"
            color="var(--color-primary)"
            class="ml-2 mt-5"
            :disabled="searched"
            @click="find_user"
          >
            Search
          </v-btn>
        </div>



        <!-- area to show response about searched user -->
        <div
          v-if="searched"
          class="mt-5 pa-2"
          style="background-color: var(--color-bg)"
        >
          <div v-if="searched_user !== null">
            User Found
            <div style="display: flex; margin-top: 10px; align-items: flex-start; margin-left: 0px">
              <avatar
                :image="searched_user.profile_image"
                size="70"
              />
              <div class="ml-2">
                Name:
                <span class="radio-name">
                  {{ searched_user.name_first }} {{ searched_user.name_last }}
                </span> <br>
                Email:
                <span class="radio-name">
                  {{ searched_user.email }}
                </span>
              </div>
            </div>


            <template v-if="user_active">
              <p class="pt-3">
                Clicking Transfer will make  {{ searched_user.name_first }} {{ searched_user.name_last }} the handler
                for {{ dog.name }}.
              </p>

              <p>
                <template v-if="acct_type==='TRAINER'">
                  You will still have access to this dog via "My Clients".
                </template>

                <template v-if="acct_type==='HANDLER'">
                  <span style="font-weight: 500">
                    Warning: You will no longer have access to this dog once you click "Transfer".
                  </span>
                </template>
              </p>
            </template>
            <template v-else>
              <p class="pt-3">
                User was invited but has not registered or accepted the Service Dog Standards
                Agreement.
              </p>

              <p class="pt-3">
                You can only transfer a dog to a user with an active active account.  Please contact the user
                and ask that they complete their registration and accept the SDS Agreement.
              </p>
            </template>


            <!--<div class="mt-5" style="text-align: center">-->

            <!--   <span class="radio-name">-->
            <!--     {{searched_user.name_first}} {{searched_user.name_last}}-->
            <!--  </span>-->


            <!--</div>-->
          </div> <!--end of if searched_user-->




          <div v-else>
            <p>
              No user with email <span style="font-style: italic;">{{ email }}</span> was found.
            </p>


            <!--<p>-->
            <!--   Please type in their name and and invite them to join  Service Dog Standards.-->
            <!--</p>-->

            <!--<my-form ref="form2">-->
            <!--   <v-row dense style="margin-top: -15px">-->
            <!--      <v-col>-->
            <!--         <text-input-->
            <!--             label="First Name"-->
            <!--             v-model="name_first"-->
            <!--             :rules="[isRequired]"-->
            <!--         />-->
            <!--      </v-col>-->

            <!--      <v-col>-->
            <!--         <text-input-->
            <!--             label="Last Name"-->
            <!--             v-model="name_last"-->
            <!--             :rules="[isRequired]"-->
            <!--         />-->
            <!--      </v-col>-->

            <!--   </v-row>-->
            <!--</my-form>-->
          </div>

          <div style="width: 100%; display: flex; justify-content: flex-end">
            <v-btn
              text
              small
              color="var(--color-btn)"
              style="padding:0"
              @click="searched=false"
            >
              Clear Search
            </v-btn>
          </div>
        </div>






        <v-row
          justify="end"
          class="ma-0 pt-9"
        >
          <v-btn
            color="var(--btn-grey)"
            @click="$emit('close')"
          >
            Cancel
          </v-btn>
          <v-spacer />

          <!--v-if="searched_user!=null"-->
          <v-btn
            color="var(--color-primary)"
            :disabled="!user_active"
            :loading="loading_invite"
            @click="invite_user"
          >
            <span>Transfer</span>
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
// import status from '@/views/mgmProfile/StatusDropDown';
import validation from "@/mixins/validation";
import data_getters from "@/mixins/data_getters";

import MyForm from "@/components/inputs/MyForm";
import TextInput from "@/components/inputs/TextInput";
import avatar from "@/components/app/avatar";

import _ from 'lodash';

/**
 * Based on AddUser component. Basically creating a copy designed around the add client flow.
 */

export default {
   name: "TransferDog",
   components: {MyForm, TextInput, avatar,},
   mixins: [data_getters, validation],
   props: {
      // user_id: {type: String, default: null},
      // delegate: {type: Object, default: null},
      dog: Object,
      type: String, // HANDLER | TRAINER

   },
   data(){
      return {
         // show_invite_delegate: false,

         searched_user: null,
         access_level: null,
         search_error_msg: null,
         // name: null,
         email: null,
         name_first: null,
         name_last: null,

         loading_invite: false,

         searched: false,//used to track state before/after user clicks search

         value: _.cloneDeep(this.dog),

         // //note: need to keep this in sync with the options in the StatusDropDown component's options
         // list: [
         //    {txt: 'In Training', val: 'InTraining'},
         //    {txt: 'Fully Trained', val: 'FullyTrained'},
         //    {txt: 'Retired', val: 'Retired'},
         //    {txt: 'In Memoriam', val: 'InMemoriam'},
         //    {txt: 'Washout', val: 'Washout'},
         //    {txt: 'Hidden/Private', val: 'Private'},
         // ]

      }
   },

   computed: {
      btn_txt(){
         if (this.dog === null){
            return 'Add Dog'
         }
         else{
            return 'Save'
         }
      },


      user_active(){
         let expiry = _.get(this.searched_user, 'account_status.date_expiry', null);

         if (expiry != null){
            return Date.parse(expiry) > Date.now();
         }
         else{
            return false
         }
      },

      title_txt(){
         if (this.dog === null){
            return 'Add New Service Dog'
         }
         else{
            return 'Edit Service Dog Profile'
         }
      },

      areEditing(){
         return this.delegate != null;
      },

      label_text(){
         if (this.type==='TRAINER'){
            return "Trainer's Email";
         }
         return "Handler's Email";
      },

      header_text(){
         if (this.type==='TRAINER'){
            return "Trainer";
         }
         return "Handler";
      },

      acct_type(){
         return this.$auth.profile.acct_type;
      }
   },
   watch:{

      // delegate(newVal){
      //    if (newVal != null){
      //       this.access_level = this.delegate.access_level;
      //       this.name = this.delegate.user.name_first;
      //       this.email = this.delegate.user.email;
      //
      //    }
      // }
   },

   created(){
      if (this.dog === null){
         this.value = {}
      }


      // if (this.delegate != null){
      //    this.access_level = this.delegate.access_level;
      //    this.name = this.delegate.user.name_first;
      //    this.email = this.delegate.user.email;
      //
      // }
   },

   methods:{
      // updateValue(key, value) {
      //    let ans = _.cloneDeep(this.value);
      //    ans[key] = value;
      //    this.$emit("input", ans);
      // }

      click_search(){
         let tmp = this.$refs.searchbtn.$el.click();
         console.log('debug', tmp)

      },

      async find_user(){
         this.search_error_msg = null;


         if (!this.$refs.form.validate()){
            return;
         }


         try{

            this.searched_user = await this.make_request('/private/getUserBySearch', {email: this.email});
            this.searched = true;

            if (this.searched_user=== null){
               this.search_error_msg = 'No user found.'
            }
         }catch (e) {
            throw e;
         }
      },



      async add_client(){



         this.loading_invite = true;

         if (!this.$refs.form.validate()){
            this.error_msg = 'Please check fields'
            return ;
         }





         try{

            let payload = {
               email: this.email,
               name_last: this.name_last,
               name_first: this.name_first,

            }
            await this.make_request('/private/addClient', payload);
            this.loading_invite = false;
            this.$emit('added');
            this.$emit('close');

         } catch (e) {

            throw e;
         }
      },


      async invite_user(){

         if (this.$refs.form2 && !this.$refs.form2.validate()){
            return;
         }

         this.loading_invite = true;

         if (!this.$refs.form.validate()){
            this.error_msg = 'Please check fields'
            return ;
         }

         let types = ['HANDLER', 'TRAINER'];
         if (!types.includes(this.type)){
            throw Error('type prop must be one of ' + types.toString());

         }


         try{

            let payload = {
               dog_id: this.dog._id,
               user_id: this.searched_user._id,


            }
            await this.make_request('/private/transferDog', payload);
            this.loading_invite = false;
            this.$emit('added');
            this.$emit('close');

         } catch (e) {

            throw e;
         }
      },


   }
}
</script>

<style scoped>
.profile-image-container{
    display: flex;
    flex-direction: row;
    cursor: pointer;
}



.access-settings-container{
    padding: 0px 20px 20px 20px;
    font-weight: 500;
    font-size: 14pt;
}




.my-radio-label{
    color:black;
    font-weight: 500;
    font-size: 14pt;
}

.radio-name{
    font-weight: 600;
    font-style: italic;
}

/*get radio button to align at top label content*/
div >>> .v-radio{
    align-items: flex-start;
}
</style>
