<template>
  <div>
    <upload-user-image
      v-if="show_upload_image"
      file-type="profile"
      :show.sync="show_upload_image"
      :user_id="user._id"
      @uploaded="updated_image"
    />

    <change-email v-model="show_change_email" />



    <div class="content-container-bg">
      <!-- row for profile image-->
      <div style="display:flex; padding-bottom: 25px;">
        <div
          class="profile-image-container"
          @click="show_upload_image=true;"
        >
          <img
            :src="user_image"
            style="max-height: 200px; max-width: 200px"
          >
          <div style="font-size: 11pt; color: blue; padding-top: 5px; ">
            Change Profile Image
          </div>
        </div>


        <div class="account-settings-container">
          <div
            v-if="isAdmin"
            style=" margin-top:15px"
          >
            <div style="color: var(--color-subheading); font-size: medium">
              (Admin) Deactivation
            </div>

            <status
              v-model="user.deactivated"
              style="width: 150px;"
              :list="[{txt: 'Deactivate', val: true}, {txt: 'Reactivate', val: false},]"
              item-text="txt"
              item-value="val"
              :color-map="{'true': '#bf1e2e', 'false': '#8dc63f' }"
            />

            <!--<v-btn v-if="user.deactivated == null"-->
            <!--    -->
            <!--    color="red" @click="$emit('deactivate-account')">-->
            <!--   Deactivate Account-->
            <!--</v-btn>-->
          </div>


          <div style="width: 150px; margin-top:10px">
            <div style="color: var(--color-subheading); font-size: medium">
              Account Type
            </div>

            <div>
              {{ user.account_type }}
            </div>
          </div>


          <div style="width: 150px; margin-top:15px">
            <div style="color: var(--color-subheading); font-size: medium">
              Profile Status
            </div>

            <status
              v-model="user.account_visibility"
              list-type="user"
            />
          </div>


          <div style="width: 150px; margin-top:15px">
            <div style="color: var(--color-subheading); font-size: medium; display: flex">
              Email
              <v-btn
                v-if="!isAdmin"
                small
                text
                style="padding: 0px; margin-left: 5px; margin-top: -2px;"
                @click="show_change_email=true"
              >
                (Change)
              </v-btn>
            </div>


            <div
              v-if="user.email_change"
              style="color: red; font-size: 10pt; text-align: center"
              class="pt-1"
            >
              Waiting on confirmation for {{ user.email_change.new_email }}
            </div>


            <div style="display: flex">
              {{ user.email }}
            </div>
          </div>
        </div>
      </div>






      <!------------------- main form to edit user's info ---------------------------------------------------------->

      <trainer-info
        v-if="isTrainer"
        @update="$emit('update', $event)"
      />

      <div
        v-if="isHandler"
        class="content-container-sm"
      >
        <handler-info />
      </div>





      <!--<v-row class="ma-0 pt-4" style="width: 100%">-->
      <!--   <v-spacer></v-spacer>-->
      <!--   <v-btn-->
      <!--       @click="save_profile"-->
      <!--       color="var(&#45;&#45;color-primary)"-->
      <!--       :loading="saving_data"-->
      <!--   >-->

      <!--      Save-->
      <!--   </v-btn>-->
      <!--</v-row>-->
    </div>
  </div>
</template>

<script>

// import addDog from '../mgmDogs/EditDogDialog';
import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";

// import userReg  from '../mgmDogs/SingleUsersRegistration';
import sdsInput from "@/components/inputs/TextInput";
import myForm from "@/components/inputs/MyForm";
import status from '@/components/inputs/StatusDropDown';
import ChangeEmail from "@/components/ChangeEmail";
import changeTrainerUrl from "@/views/mgmProfile/changeTrainerUrl";

import states from "@/data/states";
import _ from 'lodash';
import UploadUserImage from "@/components/FileUploads/UploadUserImage";
import MyDropDown from "@/components/inputs/MyDropDown";

import TrainerInfo from "@/views/mgmProfile/EditTrainerInfo";

import HandlerInfo from "@/views/mgmProfile/EditHandlerInfo";

let defaultUser = {}

export default {
   name: "ManageProfile",
   components: {HandlerInfo, TrainerInfo, status,ChangeEmail, UploadUserImage },
   mixins: [data_getters, validation],
   props: {
      user_id: {type: String, default: null},

      trainer_url_prop: {type: String, default: null}

      },
   data () {
      return {
         states,
         show_upload_image: false, //controls if add dog modal is shown
         show_change_email: false, //controls the change email dialog
         show_change_url: false,

         user: { address: {}},
         public_info: {address: {}}, //maps to trainer_info, handler_info, or aid_info


         saving_data: false,

         // my_dogs: [],

         // edit_dog_user_id: null,
         // edit_dog: null,


         //used to map user types to their public info property
         type_map: {
            'TRAINER': 'trainer_info',
            'HANDLER': 'handler_info',
            'AIDE': 'aide_info',
         },

      }
   },

   computed: {
      isTrainer(){
         return _.get(this.user, 'account_type', null) === 'TRAINER';
      },

      isHandler(){
         return _.get(this.user, 'account_type', null) === 'HANDLER';
      },

      isAide(){
         return _.get(this.user, 'account_type', null) === 'AIDE';
      },

      isAdmin(){
         return this.$auth.profile.acct_type === 'SDS-ADMIN';
      },

     user_image: {
        get: function(){
        if (this.user.profile_image){
           return this.user.profile_image.Location;
        }
        else{
           return require('../../assets/images/content/user-no-image.png');
        }
     },
        set: function (newVal){
        }
     },



      trainer_url(){

         let url = this.public_info.custom_trainer_url;

         // if (url != null && url !== ''){
         //    return 'https://servicedogstandards.org/trainer/' + url;
         // }
         // else{
         //    return 'https://servicedogstandards.org/trainer/' + this.user._id;
         // }

         if (this.trainer_url_prop != null){
            return this.trainer_url_prop;
         }
         else{
            return url;
         }

      }




   },

   watch:{
      user_id(){
         this.get_profile();
      }
   },


   mounted(){
      console.log('debug')
      this.$store.commit("set_show_side_nav", true);

      this.get_profile();
   },

   beforeDestroy() {
      // this.$store.commit("set_show_side_nav", false);
   },

   methods:{

      // add_dog(user, dog){
      //    this.add_dog_user_id = user._id;
      //    this.edit_dog = dog;
      //    this.show_add_dog = true;
      // },
      //
      // //updates dogs after a user edits/adds a dog
      // update_dogs(){
      //    this.get_my_dogs();
      //    this.show_add_dog = false;
      // },


      on_trainer_url_change(new_url){
         this.show_change_url = false;
         this.public_info.custom_trainer_url = new_url;
      },

      async updated_image(){
         this.user.profile_image = null;
         this.show_upload_image=false;
         await this.get_profile();
         this.$emit('update-image', this.user)
      },

      async get_profile(){

         try{
            let user;
            if (this.user_id !== null){
               //note this will only work if called by an admin user
               user = await this.make_request('/admin/getUser', {user_id: this.user_id});
            }
            else{
               user = await this.make_request('/private/getMyProfile', {});


            }

            let info_type = this.type_map[user.account_type];
            this.public_info = user[info_type];
            this.user = user;

         }catch (e) {
            console.log(e)
         }

      },






      async save_profile(){

         if (!this.$refs.form.validate()){
            console.log('validation failed')
            return;
         }

         this.saving_data = true;

         console.log('debug, save')

         try{
            let info_type = this.type_map[this.user.account_type];




            let update = _.cloneDeep(this.user);
            update[info_type] = _.cloneDeep(this.public_info);



            if (this.$auth.profile.acct_type==='SDS-ADMIN'){

               let payload = {user: update};
               let res = await this.make_request('/admin/updateUserProfile', payload);

            }
            else{
               delete update.email;
               let payload = {
                  user_id: this.$auth.profile.user_id,
                  update,
               }
               let res = await this.make_request('/private/updateUserProfile', payload);
            }


            // this.user = {social_profiles: {}};
            this.$emit('update', update);
            // await this.get_profile();
            this.saving_data = false;

         }catch (e) {

            console.log(e)
         }
      },

      async get_delegated_users(){
         try{

         }catch (e) {
            console.log(e)
         }

      },

   }
}
</script>

<style scoped>
@import url('./mgm_common.css');

/*.registration-container{*/
/*   background-color: white;*/
/*   width: 100%;*/
/*   max-width: 700px;*/

/*}*/

/*.reg-header{*/
/*   display: flex;*/
/*   justify-content: flex-start;*/
/*   align-items: center;*/
/*   padding:6px;*/

/*   !*height: 30px;*!*/
/*   !*border: solid 2px red;*!*/
/*}*/

/*.reg-body{*/

/*}*/


/*settings for first row*/
.profile-image-container{
   display:flex;
   align-items: center;
   flex-direction: column;
   cursor: pointer;
}


.account-settings-container{

   display: flex;
   flex-direction: column;
   justify-content: flex-start;
   padding-left: 20px;
   padding-bottom: 20px;
}


/*settings for registration table*/
th, td{
   text-align: left;
   padding: 10px;
}

tr:nth-child(odd) {background-color: #e7f3fb;}
tr:nth-child(even) {background-color: #f7fbfd;}

.col-service-dog{
   font-size: 12pt;
   font-weight: 500;
}

.col-service-do-reg{
   font-size: 12pt;
   font-weight: 500;
   color: var(--color-subheading)
}

</style>

