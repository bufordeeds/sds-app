<template>
  <div>
    <v-card>
      <v-card-title>
        <span v-if="areEditing">
          Edit Access Level
        </span>
        <span v-else>
          Give Account Access
        </span>
      </v-card-title>
      <div
        v-if="!areEditing"
        class="pl-8 pr-5"
      >
        Enter the email address of the user you want to give access to your account.
      </div>



      <v-form
        ref="form"
        @submit.prevent
      >
        <v-container>
          <!--------------- container for adding a user once the user has been verified ---------------->
          <div class="access-settings-container">
            <!--<v-text-field-->
            <!--    label="Email"-->
            <!--    outlined-->
            <!--    v-model="email"-->
            <!--    :rules="[x=>isRequired(x, 'Email')]"-->
            <!--    :disabled="areEditing"-->
            <!--&gt;</v-text-field>-->


            <!--<v-text-field-->
            <!--    label="Name"-->
            <!--    outlined-->
            <!--    v-model="name"-->
            <!--    :rules="[x=>isRequired(x, 'Name')]"-->
            <!--    :disabled="areEditing"-->
            <!--&gt;</v-text-field>-->







            <div style="display: flex; ">
              <my-form ref="form">
                <text-input
                  v-model="email"
                  label="User's Email"
                  :rules="[isRequired, checkEmail]"
                  :disabled="areEditing"
                  @keyup-enter="click_search"
                />
              </my-form>



              <v-btn
                v-if="!areEditing"
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
                    Name: <span class="radio-name">{{ searched_user.name_first }} {{ searched_user.name_last }}</span> <br>
                    Email:  <span class="radio-name">{{ searched_user.email }}</span> <br>
                    Account:  <span class="radio-name">{{ searched_user.account_type }}</span>
                  </div>
                </div>


                <template v-if="user_active" />

                <template v-else>
                  <p class="pt-3">
                    User has not accepted the Service Dog Standards Agreement.
                  </p>

                  <p class="pt-3">
                    You can only transfer a dog to a user with an active active account.  Please contact the user
                    and ask that they complete their registration and accept the SDS Agreement.
                  </p>
                </template>
              </div> <!--end of if searched_user-->




              <div v-else>
                <p>
                  No user with email <span style="font-style: italic;">{{ email }}</span> was found.
                </p>
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












            <v-radio-group
              v-if="(user_active && searched) || areEditing"
              v-model="access_level"
              style="margin-top: 0px;"
              hide-details
              :rules="[x=>isRequired(x, 'Access')]"
              class="mt-4"
            >
              <template slot="label">
                <div style="font-weight: 600; font-size: 16pt; margin-bottom: 10px;">
                  Access Level
                </div>
              </template>

              <v-radio
                value="ManageAccount"
                style="margin-top: 10px;"
              >
                <template slot="label">
                  <div>
                    <div class="my-radio-label">
                      Manage Account
                    </div>
                    <div>
                      This gives full control of your account.
                      In particular, they can make changes to your profile and any service dogs you may have.
                      <!--add/remove service dogs, and order items for you.-->
                    </div>
                  </div>
                </template>
              </v-radio>

              <!--<v-radio-->
              <!--    value="ManageDogs"-->
              <!--&gt;-->
              <!--   <template slot="label">-->
              <!--      <div>-->
              <!--         <div class="my-radio-label">-->
              <!--            Manage Dogs-->
              <!--         </div>-->
              <!--         <div >-->
              <!--            This allows-->
              <!--            them to-->
              <!--            manage your Service Dogs, order replacement items, and view your profile-->
              <!--            but they cannot make changes to your profile info.-->
              <!--         </div>-->
              <!--      </div>-->

              <!--   </template>-->
              <!--</v-radio>-->
            </v-radio-group>


            <v-row class="ma-0">
              <v-col />
            </v-row>
          </div>





          <!--               <div v-if="searched_user !== null">-->
          <!--                    <span class="radio-name">-->
          <!--                       {{searched_user.name_first}} {{searched_user.name_last}}-->
          <!--                    </span>-->
          <!--                  will be given access immediately and will be notified that you've given them access.-->
          <!--               </div>-->

          <!--               <div v-else>-->
          <!--                  We'll email  <span class="radio-name">-->
          <!--                       {{email}}-->
          <!--                    </span>-->
          <!--                  and invite them to join.  Once they do, they'll have access to your account.-->
          <!--               </div>-->




          <!--<v-row justify="end" class="ma-0">-->

          <!--   <v-btn @click="update_access" color="var(&#45;&#45;color-primary)" v-if="areEditing">Update</v-btn>-->
          <!--   <v-btn @click="update_access" color="var(&#45;&#45;color-primary)" v-else>Invite</v-btn>-->
          <!--   <v-spacer></v-spacer>-->
          <!--   <v-btn @click="$emit('close')">Cancel</v-btn>-->
          <!--</v-row>-->


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
            <!--:loading="loading_invite"-->
            <v-btn
              v-if="areEditing"
              color="var(--color-primary)"
              @click="update_access"
            >
              Update
            </v-btn>
            <v-btn
              v-else
              color="var(--color-primary)"
              :disabled="!user_active"
              @click="update_access"
            >
              Give Access
            </v-btn>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </div>
</template>

<script>
// import status from '@/views/mgmProfile/StatusDropDown';
import validation from "@/mixins/validation";

import _ from 'lodash';
import data_getters from "@/mixins/data_getters";
import MyForm from "@/components/inputs/MyForm";
import TextInput from "@/components/inputs/TextInput";
import avatar from "@/components/app/avatar";

export default {
   name: "AddDelegatedUser",
   components: {MyForm, TextInput, avatar,},
   mixins: [data_getters, validation],
   props: {
      // user_id: {type: String, default: null},
      delegate: {type: Object, default: null},
   },
   data(){
      return {
         // show_invite_delegate: false,

         // delegate: {},

         searched_user: null,
         access_level: null,
         search_error_msg: null,
         name: null,
         email: null,


         searched: false,//used to track state before/after user clicks search
         // value: _.cloneDeep(this.dog),
         //
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
      user_active(){

         return this.searched_user != null; // allow user to give anyone access regardless of their account status

         let expiry = _.get(this.searched_user, 'account_status.date_expiry', null);

         if (expiry != null){
            return Date.parse(expiry) > Date.now();
         }
         else{
            return false
         }
      },
   },
   watch:{

      delegate(newVal){
         if (newVal != null){
            this.access_level = this.delegate.access_level;
            this.name = this.delegate.user.name_first;
            this.email = this.delegate.user.email;

         }
      }
   },

   created(){



      if (this.delegate != null){
         this.access_level = this.delegate.access_level;
         this.name = this.delegate.user.name_first;
         this.email = this.delegate.user.email;

      }
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

      // async find_user(){
      //    this.search_error_msg = null;
      //    try{
      //       this.searched_user = await this.make_request('/private/getUserBySearch', {email: this.email});
      //
      //       if (this.searched_user=== null){
      //          this.search_error_msg = 'No user found.'
      //       }
      //    }catch (e) {
      //       throw e;
      //    }
      // },

      async find_user(){
         this.search_error_msg = null;


         // if (!this.$refs.form.validate()){
         //    return;
         // }


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




      async update_access(){

         if (!this.$refs.form.validate()){
            this.error_msg = 'Please check fields'
            return ;
         }


         try{

            let payload = {
               user_id: this.$auth.profile.user_id,
               access_level: this.access_level,
               delegate:{
                  email: this.email,
                  name: this.name,
               }
            }
            this.searched_user = await this.make_request('/private/updateDelegatedUser', payload);
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
    /*font-weight: 500;*/
    /*font-size: 14pt;*/
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
