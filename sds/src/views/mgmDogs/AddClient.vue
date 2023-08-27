<template>

   <div>
      <v-card>

         <v-card-title>
            <span v-if="areEditing">
            Edit Access Level
            </span>
            <span v-else>
                  <!--Invite {{header_text}}-->
               Add Client
            </span>

         </v-card-title>





         <v-container class="pa-6 pt-0">
            <div v-if="!areEditing">Enter email address of the handler you want to add as a client.</div>


            <div  style="display: flex; " v-if="$vuetify.breakpoint.width>100">
               <my-form ref="form">

                  <text-input
                      :label="label_text"
                      v-model="email"
                      @keyup-enter="click_search"
                      :rules="[isRequired, checkEmail]"
                      :disabled="searched"
                  />
               </my-form>



               <v-btn
                   @click="find_user"
                   color="var(--color-primary)"
                   class="ml-2 mt-5"
                   ref="searchbtn"
                   :disabled="searched"
               >
                  Search
               </v-btn>
            </div>

            <div v-else>
               <my-form ref="form">

                  <text-input
                      :label="label_text"
                      v-model="email"
                      @keyup-enter="click_search"
                      :rules="[isRequired, checkEmail]"
                      :disabled="searched"
                  />
               </my-form>


               <div style="display: flex">
                  <v-spacer></v-spacer>
                  <v-btn
                      @click="find_user"
                      color="var(--color-primary)"
                      class="mt-1"
                      ref="searchbtn"
                      :disabled="searched"
                  >
                     Search
                  </v-btn>
               </div>

            </div>




            <!-- area to show response about searched user -->
            <div v-if="searched" class="mt-5 pa-2" style="background-color: var(--color-bg)">

               <div v-if="searched_user !== null" >


                  User Found.
                  <div style="display: flex; margin-top: 10px; align-items: flex-start; margin-left: 0px">
                     <avatar :image="searched_user.profile_image" size="70" ></avatar>
                     <div class="ml-2">
                        Name:
                        <span class="radio-name">
                           {{searched_user.name_first}} {{searched_user.name_last}}
                        </span> <br>
                        Email:
                        <span class="radio-name">
                       {{searched_user.email}}
                    </span>
                     </div>
                  </div>


                  <!--<div class="mt-5" style="text-align: center">-->

                  <!--   <span class="radio-name">-->
                  <!--     {{searched_user.name_first}} {{searched_user.name_last}}-->
                  <!--  </span>-->


                  <!--</div>-->
               </div> <!--end of if searched_user-->




               <div v-else>
                  <p>
                     No user with email <span style="font-style: italic;">{{email}}</span> was found.
                  </p>


                  <p>
                     Please type in their name and and invite them to join  Service Dog Standards.
                  </p>

                  <my-form ref="form2">
                     <v-row dense style="margin-top: -15px">
                        <v-col>
                           <text-input
                               label="First Name"
                               v-model="name_first"
                               :rules="[isRequired]"
                           />
                        </v-col>

                        <v-col>
                           <text-input
                               label="Last Name"
                               v-model="name_last"
                               :rules="[isRequired]"
                           />
                        </v-col>

                     </v-row>
                  </my-form>
               </div>

               <div style="width: 100%; display: flex; justify-content: flex-end">
                  <v-btn text small color="var(--color-btn)" style="padding:0" @click="searched=false">
                     Clear Search
                  </v-btn>
               </div>

            </div>






            <v-row justify="end" class="ma-0 pt-9">
               <v-btn @click="$emit('close')" color="var(--btn-grey)">Cancel</v-btn>
               <v-spacer></v-spacer>

               <v-btn @click="add_client" color="var(--color-primary)" :disabled="!searched" :loading="loading_invite"
               >
                  <span v-if="searched_user!=null">Add</span>
                  <span v-else>Invite</span>

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
   name: "AddUser",
   mixins: [data_getters, validation],
   components: {MyForm, TextInput, avatar,},
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

   computed: {
     btn_txt(){
        if (this.dog === null){
           return 'Add Dog'
        }
        else{
           return 'Save'
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
               email: this.email,
               access_type: this.type,

               name_last: this.name_last,
               name_first: this.name_first,

            }
            await this.make_request('/private/inviteTrainerHandler', payload);
            this.loading_invite = false;
            this.$emit('added');
            this.$emit('close');

         } catch (e) {

            throw e;
         }
      },


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
