<template>
  <div>
    <check-address
      ref="addrCheck"
      :address-new="user.private_info.address"

      :address-old="private_info_address_old"
      @checked-address="save_profile({checked_addr: $event})"
      @close="saving_data = false"
    />

    <upload-user-image
      v-if="show_upload_image"
      file-type="profile"
      :show.sync="show_upload_image"
      :user_id="user._id"
      @uploaded="on_image_upload"
    />

    <change-email v-model="show_change_email" />



    <div
      class="centered-flex-column white-bg"
      style="padding-top: 50px"
    >
      <!-- row for profile image-->
      <div style="display:flex; padding-bottom: 25px;">
        <div
          class="profile-image-container mr-4"
          style="cursor: pointer;"
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
          <!--<div v-if="isAdmin"-->
          <!--     style=" margin-top:15px" >-->
          <!--   <div style="color: var(&#45;&#45;color-subheading); font-size: medium">-->
          <!--      (Admin) Deactivation-->
          <!--   </div>-->

          <!--   <status-->
          <!--       style="width: 150px;"-->
          <!--       v-model="user.deactivated"-->
          <!--       :list="[{txt: 'Deactivate', val: true}, {txt: 'Reactivate', val: false},]"-->
          <!--       item-text="txt"-->
          <!--       item-value="val"-->
          <!--       :color-map="{'true': '#bf1e2e', 'false': '#8dc63f' }"-->
          <!--   ></status>-->

          <!--</div>-->


          <div style="width: 150px; margin-top:10px">
            <div style="color: var(--color-subheading); font-size: medium">
              Account Type
            </div>

            <div>
              {{ user.account_type }}
            </div>
          </div>


          <!--<div style="width: 150px; margin-top:15px" >-->
          <!--   <div style="color: var(&#45;&#45;color-subheading); font-size: medium">-->
          <!--      Profile Status-->
          <!--   </div>-->

          <!--   <status-->
          <!--       v-model="user.account_visibility"-->
          <!--       list-type="user"-->
          <!--   ></status>-->
          <!--</div>-->


          <div style="width: 150px; margin-top:15px">
            <div style="color: var(--color-subheading); font-size: medium; display: flex">
              Email
              <!--<v-btn-->
              <!--    small text style="padding: 0px; margin-left: 5px; margin-top: -2px;"-->
              <!--    @click="show_change_email=true"-->
              <!--&gt;-->
              <!--   (Change)-->
              <!--</v-btn>-->
            </div>

            <div style="display: flex">
              {{ user.email }}
            </div>

            <div
              v-if="user.email_change"
              style="color: red; font-size: 10pt; text-align: left; white-space: nowrap"
              class="pt-1"
            >
              Waiting on confirmation for {{ user.email_change.new_email }}
            </div>
          </div>
        </div>
      </div>
    </div>

















    <my-form ref="form">
      <v-container style="max-width: 700px;">
        <div class="mgm-subtitle">
          Personal Info
        </div>


        <v-row dense>
          <v-col>
            <sds-input
              v-model="user.name_first"
              label="First Name*"
              :rules="isAdmin? []: [x => isRequired(x, 'First Name')]"
            />
          </v-col>

          <v-col>
            <sds-input
              v-model="user.name_last"
              label="Last Name*"
              :rules="isAdmin? []: [x => isRequired(x, 'Last Name')]"
            />
          </v-col>
        </v-row>


        <v-row dense>
          <v-col>
            <sds-input
              v-model="user.private_info.address.street1"
              label="Address*"
              :rules="isAdmin? []: [x => isRequired(x, 'Address')]"
            />
          </v-col>
        </v-row>


        <v-row dense>
          <v-col cols="5">
            <sds-input
              v-model="user.private_info.address.city"
              label="City*"
              :rules="isAdmin? []: [x => isRequired(x, 'City')]"
            />
          </v-col>

          <v-col cols="3">
            <!--                     <sds-input-->
            <!--                         label="State*"-->
            <!--                         v-model="user.address.state"-->
            <!--                         :rules="[x => isRequired(x, 'State')]"-->
            <!--                     ></sds-input>-->

            <!--<my-drop-down-->
            <!--    label="State*"-->
            <!--    v-model="user.private_info.address.state"-->
            <!--    :list="states"-->
            <!--    item-value="abbr"-->
            <!--    item-text="txt"-->
            <!--    show-value-->
            <!--    :rules="isAdmin? []: [isRequired]"-->
            <!--/>-->

            <sds-input
              v-model="user.private_info.address.state"
              label="State*"
              :rules="isAdmin? []: [x => isRequired(x, 'State')]"
            />
          </v-col>

          <v-col cols="4">
            <sds-input
              v-model="user.private_info.address.zip"
              label="Zip*"
              :rules="isAdmin? []: [x => isRequired(x, 'Zip')]"
            />
          </v-col>
        </v-row>



        <v-row dense>
          <v-col cols="5">
            <sds-input
              v-model="user.private_info.phone"
              label="Phone"
              :rules="isAdmin? []: [x => isPhone(x, )]"
            />
          </v-col>
        </v-row>
      </v-container>
    </my-form>

    <v-row
      class="ma-0 pt-4"
      style="width: 100%"
    >
      <v-spacer />
      <v-btn
        color="var(--color-primary)"
        :loading="saving_data"
        large
        @click="save_profile"
      >
        Save Changes
      </v-btn>
      <v-spacer />
    </v-row>


    <div style="height: 40px;" />
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

import HandlerInfo from "@/views/mgmProfile/EditHandlerInfo";
import CheckAddress from "@/components/CheckAddress";

let defaultUser = {}

export default {
   name: "ManageProfile",
   components: {MyDropDown, sdsInput, myForm , UploadUserImage, status, ChangeEmail, changeTrainerUrl, CheckAddress },
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

         user: { private_info: {address:{}}},
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

         private_info_address_old: {},

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


            if (user.private_info == null){
               user.private_info = {address:{}};
            }


            this.user = user;

            this.private_info_address_old = _.cloneDeep(user.private_info.address);


         }catch (e) {
            console.log(e)
         }

      },

      on_image_upload(event){

         this.show_upload_image = false;

         // console.log({event})
         this.user.profile_image = event;

         this.$emit('update-image', event);
      },





      async save_profile({checked_addr}={}){

         if (!this.$refs.form.validate()){
            console.log('validation failed')
            return;
         }

         this.saving_data = true;

         console.log('debug, save')

         try{


            //check the address using the CheckAddress component
            if (checked_addr === undefined){
               await this.$refs.addrCheck.check_address();
               // this.saving_data = false;
               // this.private_info_address_old = _.cloneDeep(this.user.private_info.address);
               return;
            }
            else{
               //value returned from CheckAddress component's event (see component in template)
               this.user.private_info.address = checked_addr;
            }


            let update = _.cloneDeep(this.user);

            if (this.$auth.profile.acct_type==='SDS-ADMIN'){

               let payload = {user: update};
               let res = await this.make_request('/admin/updateUserProfile', payload);
               this.$emit('user_updated', update);
            }



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

