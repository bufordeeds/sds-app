<template>
   <div >
      <change-trainer-url
          v-model="show_change_url"
          :trainer_url.sync="public_info.custom_trainer_url"
          @update:trainer_url="show_change_url=false"
      />

      <check-address
          :address-new="user.private_info.address"
          :address-old="private_info_address_old"

          @checked-address="save_profile({checked_addr: $event})"
          @close="saving_data = false"
          ref="addrCheck"
      />

      <change-email v-model="show_change_email"></change-email>


      <upload-user-image
          file-type="profile"
          :show.sync="show_upload_image"
          v-if="show_upload_image"
          @uploaded="update_profile_image"
          :user_id="user_id"
      ></upload-user-image>



      <!-- dialog for warning about business address -->
      <v-dialog v-model="show_addr_warning" max-width="400px">

         <v-card class="pt-5">
            <div class="pl-5 pr-5">
               Oops, if you don’t enter an address or location your company won’t be searchable.
               You can enter your address or just city, state, or even just zip code.
            </div>
            <v-card-actions class="mt-3" v-if="$vuetify.breakpoint.width>400">
               <v-btn @click="show_addr_warning=false">Update Address</v-btn>
               <v-spacer/>
               <v-btn @click="save_profile();show_addr_warning=false"
               >Ignore and Save</v-btn>
            </v-card-actions>

            <div v-else class="centered-flex-column pt-3 pb-3">
               <v-btn @click="show_addr_warning=false">Update Address</v-btn>
               <div class="pt-3"/>
               <v-btn @click="save_profile();show_addr_warning=false"
               >Ignore and Save</v-btn>
            </div>
         </v-card>
      </v-dialog>



      <div class="centered-flex-column" style="padding-top: 50px">

         <!-- row for profile image-->
         <div style="display:flex; padding-bottom: 25px;">
            <div class="profile-image-container" @click="show_upload_image=true;">
               <img :src="user_image" style="max-height: 200px; max-width: 200px">
               <div style="font-size: 11pt; color: blue; padding-top: 5px; ">
                  Change Profile Image
               </div>
            </div>


            <div class="account-settings-container">

               <div v-if="isAdmin"
                    style=" margin-top:15px" >
                  <div style="color: var(--color-subheading); font-size: medium">
                     (Admin) Deactivation
                  </div>

                  <status
                      style="width: 150px;"
                      v-model="user.deactivated"
                      :list="[{txt: 'Deactivated', val: true}, {txt: 'Active', val: false}]"
                      item-text="txt"
                      item-value="val"
                      :color-map="{'true': '#bf1e2e', 'false': '#8dc63f' }"
                  ></status>

                  <!--<v-btn v-if="user.deactivated == null"-->
                  <!--    -->
                  <!--    color="red" @click="$emit('deactivate-account')">-->
                  <!--   Deactivate Account-->
                  <!--</v-btn>-->

               </div>


               <div style="width: 150px; margin-top:10px" >
                  <div style="color: var(--color-subheading); font-size: medium">
                     Account Type
                  </div>

                  <div>
                     {{user.account_type}}
                  </div>
               </div>


               <div style="width: 150px; margin-top:15px" >
                  <div style="color: var(--color-subheading); font-size: medium">
                     Profile Status
                  </div>

                  <status
                      v-model="user.account_visibility"
                      list-type="user"
                  ></status>
               </div>


               <div style="width: 150px; margin-top:15px" >
                  <div style="color: var(--color-subheading); font-size: medium; display: flex">
                     Email
                     <v-btn
                         v-if="!isAdmin" small text style="padding: 0px; margin-left: 5px; margin-top: -2px;"
                         @click="show_change_email=true"
                     >
                        (Change)
                     </v-btn>
                  </div>

                  <div style="display: flex">
                     {{user.email}}
                  </div>

                  <div v-if="user.email_change" style="color: red; font-size: 10pt; text-align: left; white-space: nowrap" class="pt-1">
                     Waiting on confirmation for {{user.email_change.new_email}}
                  </div>
               </div>
            </div>
         </div>

      </div>

















      <my-form ref="form">
         <v-container style="max-width: 700px;">

            <!--&lt;!&ndash; row for profile image&ndash;&gt;-->
            <!--<div style="display:flex; padding-bottom: 25px;">-->
            <!--   <div class="profile-image-container" @click="show_upload_image=true;">-->
            <!--      <img :src="user_image" style="max-height: 200px; max-width: 200px">-->
            <!--      <div style="font-size: 11pt; color: blue; padding-top: 5px; ">-->
            <!--         Change Profile Image-->
            <!--      </div>-->

            <!--   </div>-->


            <!--   <div class="account-settings-container">-->

            <!--      <div v-if="isAdmin"-->
            <!--           style=" margin-top:15px" >-->
            <!--         <div style="color: var(&#45;&#45;color-subheading); font-size: medium">-->
            <!--            (Admin) Deactivation-->
            <!--         </div>-->

            <!--         <status-->
            <!--             style="width: 150px;"-->
            <!--             v-model="user.deactivated"-->
            <!--             :list="[{txt: 'Deactivate', val: true}, {txt: 'Reactivate', val: false},]"-->
            <!--             item-text="txt"-->
            <!--             item-value="val"-->
            <!--             :color-map="{'true': '#bf1e2e', 'false': '#8dc63f' }"-->
            <!--         ></status>-->

            <!--         &lt;!&ndash;<v-btn v-if="user.deactivated == null"&ndash;&gt;-->
            <!--         &lt;!&ndash;    &ndash;&gt;-->
            <!--         &lt;!&ndash;    color="red" @click="$emit('deactivate-account')">&ndash;&gt;-->
            <!--         &lt;!&ndash;   Deactivate Account&ndash;&gt;-->
            <!--         &lt;!&ndash;</v-btn>&ndash;&gt;-->

            <!--      </div>-->


            <!--      <div style="width: 150px; margin-top:10px" >-->
            <!--         <div style="color: var(&#45;&#45;color-subheading); font-size: medium">-->
            <!--            Account Type-->
            <!--         </div>-->

            <!--         <div>-->
            <!--            {{user.account_type}}-->
            <!--         </div>-->
            <!--      </div>-->


            <!--      <div style="width: 150px; margin-top:15px" >-->
            <!--         <div style="color: var(&#45;&#45;color-subheading); font-size: medium">-->
            <!--            Profile Status-->
            <!--         </div>-->

            <!--         <status-->
            <!--             v-model="user.account_visibility"-->
            <!--             list-type="user"-->
            <!--         ></status>-->
            <!--      </div>-->
            <!--   </div>-->
            <!--</div>-->

            <div class="mgm-subtitle">
               Personal Info
            </div>


            <v-row dense>
               <v-col>
                  <sds-input
                      label="First Name*"
                      v-model="user.name_first"
                      :rules="isAdmin? []: [x => isRequired(x, 'First Name')]"
                  ></sds-input>
               </v-col>

               <v-col cols="12" sm="4">
                  <my-text-input
                      label="Middle Name"
                      v-model="user.name_middle"
                  />
               </v-col>

               <v-col>
                  <sds-input
                      label="Last Name*"
                      v-model="user.name_last"
                      :rules="isAdmin? []: [x => isRequired(x, 'Last Name')]"
                  ></sds-input>
               </v-col>
            </v-row>


            <v-row dense>
               <v-col>
                  <sds-input
                      label="Address*"
                      v-model="user.private_info.address.street1"
                      :rules="isAdmin? []: [x => isRequired(x, 'Address')]"
                  ></sds-input>
               </v-col>

            </v-row>


            <v-row dense>
               <v-col cols="5">
                  <sds-input
                      label="City*"
                      v-model="user.private_info.address.city"
                      :rules="isAdmin? []: [x => isRequired(x, 'City')]"
                  ></sds-input>
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
                      label="State*"
                      v-model="user.private_info.address.state"
                      :rules="isAdmin? []: [x => isRequired(x, 'State')]"
                  ></sds-input>
               </v-col>

               <v-col cols="4">
                  <sds-input
                      label="Zip*"
                      v-model="user.private_info.address.zip"
                      :rules="isAdmin? []: [x => isRequired(x, 'Zip')]"
                  ></sds-input>
               </v-col>
            </v-row>



            <v-row dense>
               <v-col cols="5">
                  <sds-input
                      label="Phone"
                      v-model="user.private_info.phone"
                      :rules="isAdmin? []: [x => isPhone(x, )]"
                  ></sds-input>
               </v-col>

               <!--                  <v-col style="padding-top: 30px;">-->
               <!--                     {{user.email}}-->
               <!--                  </v-col>-->

               <!--<v-col>-->
               <!--   <div style="display: flex; align-items: flex-end">-->
               <!--      <sds-input-->
               <!--          label="Email*"-->
               <!--          v-model="user.email"-->
               <!--          :disabled="!isAdmin"-->
               <!--      ></sds-input>-->
               <!--      <v-btn small class="ml-2 mt-6" @click="show_change_email=true" v-if="!isAdmin">-->
               <!--         Change-->
               <!--      </v-btn>-->
               <!--   </div>-->
               <!--   <div v-if="user.email_change" style="color: red; font-size: 10pt; text-align: center" class="pt-1">-->
               <!--      Waiting on confirmation for {{user.email_change.new_email}}-->
               <!--   </div>-->

               <!--</v-col>-->

            </v-row>






            <!--------------------trainer info---------------------------------------------------------------------->
            <div v-if="isTrainer">
               <div class="mgm-subtitle" v-if="isTrainer">
                  Public Info
               </div>



               <!---------------custom url----------------------->
               <div >
                  <div style="display: flex" @click="show_change_url=true">
                     <my-text-input
                         label="Your custom trainer URL"
                         v-model="public_info.custom_trainer_url"
                         disabled

                     />

                     <v-btn small class="mt-7 ml-2" @click="show_change_url=true">
                        Change
                     </v-btn>
                  </div>


                  <v-tooltip bottom>
                     <template v-slot:activator="{ on, attrs }">
                              <span style="font-size: 9pt; margin-left: 7px;" v-bind="attrs" v-on="on">
                                 What is this
                                 <v-icon  small>
                                    help_outline
                                 </v-icon>
                              </span>
                     </template>
                     Your public profile has a permanent URL of the form: <br>
                     ServiceDogStandards.org/trainer/TRAINER_URL. <br>
                     If you leave this blank, a random TRAINER_URL will be used.
                  </v-tooltip>

               </div>




               <v-row dense v-if="isTrainer">
                  <v-col >
                     <sds-input
                         label="Business Name"
                         v-model="public_info.business_name"
                     ></sds-input>
                  </v-col>

               </v-row>

               <v-row dense v-if="isTrainer">
                  <v-col >
                     <sds-input
                         label="Business Tagline"
                         v-model="public_info.tagline"
                     ></sds-input>
                  </v-col>
               </v-row>


               <v-row dense >
                  <v-col>
                     <sds-input
                         label="Public Phone"
                         v-model="public_info.phone"
                         :rules="[isPhone]"
                     ></sds-input>
                  </v-col>

                  <v-col>
                     <sds-input
                         label="Website"
                         v-model="public_info.website"
                     ></sds-input>
                  </v-col>
               </v-row>

               <v-row dense>
                  <v-col v-if="isTrainer">
                     <sds-input
                         label="Hours, e.g. 9-5pm Mon - Fri"
                         v-model="public_info.hours_str"
                     ></sds-input>
                  </v-col>

               </v-row>


               <v-row dense class="ma-0">

                  <v-checkbox
                      class="mr-5"
                      label="Clients visit Me.  I have a training facility, area or space."
                      hide-details
                      v-model="public_info.have_facility"
                  />
                  <v-checkbox

                      label="I visit clients.  I make house calls or arrange a location where I meet clients"
                      hide-details
                      v-model="public_info.will_travel"
                  />

                  <div v-if="public_info.will_travel" style="width: 100%; padding-left: 30px; margin-top: -15px; padding-bottom: 10px" >
                     <sds-input
                         label="Max Distance (miles)"
                         v-model="public_info.max_travel_miles"
                         :rules="[isNumber, isRequired]"
                         style="max-width: 170px; "
                         label-on-bottom
                         label-style="font-size: 10pt"
                     ></sds-input>

                  </div>

                  <v-checkbox
                      label="I can help transport dogs"
                      hide-details
                      v-model="public_info.will_transport"
                  />
               </v-row>


               <v-tooltip top left nudge-bottom="20" content-class="my-tooltip-class">
                  <template v-slot:activator="{ on }">
                     <div v-on="on">
                        <v-row dense >
                           <v-col>
                              <sds-input
                                  :label="public_info.have_facility?'Address*':'Address'"
                                  v-model="public_info.address.street1"
                                  :rules="public_info.have_facility?[isRequired]: []"
                              ></sds-input>
                           </v-col>

                        </v-row>

                        <v-row dense>
                           <v-col>
                              <sds-input
                                  :label="public_info.have_facility?'City*':'City'"
                                  Address
                                  v-model="public_info.address.city"
                                  :rules="public_info.have_facility?[isRequired]: []"
                              ></sds-input>
                           </v-col>

                           <v-col>
                              <sds-input
                                  :label="public_info.have_facility?'State*':'State'"
                                  v-model="public_info.address.state"
                                  :rules="public_info.have_facility?[isRequired]: []"
                              ></sds-input>
                           </v-col>

                           <v-col>
                              <sds-input
                                  label="Zip*"
                                  v-model="public_info.address.zip"
                                  :rules="[isZip, isRequired]"
                              ></sds-input>
                           </v-col>
                        </v-row>
                     </div>

                  </template>
                  <div style="max-width: 500px">
                     This address is used when users are looking for trainers by
                     distance on the Find Trainer page. If no valid address is entered, your profile won't
                     show in search results.
                  </div>
               </v-tooltip>


               <!--<v-row dense>-->
               <!--   <v-col>-->
               <!--      <sds-input-->
               <!--          label="Address"-->
               <!--          v-model="public_info.address.street1"-->
               <!--      ></sds-input>-->
               <!--   </v-col>-->

               <!--</v-row>-->




               <!--<v-row dense>-->
               <!--   <v-col>-->
               <!--      <sds-input-->
               <!--          label="City"-->
               <!--          v-model="public_info.address.city"-->
               <!--      ></sds-input>-->
               <!--   </v-col>-->

               <!--   <v-col>-->
               <!--      <sds-input-->
               <!--          label="State"-->
               <!--          v-model="public_info.address.state"-->
               <!--      ></sds-input>-->
               <!--   </v-col>-->

               <!--   <v-col>-->
               <!--      <sds-input-->
               <!--          label="Zip"-->
               <!--          v-model="public_info.address.zip"-->
               <!--          :rules="[isZip]"-->
               <!--      ></sds-input>-->
               <!--   </v-col>-->
               <!--</v-row>-->


               <!--<v-row dense class="ma-0">-->

               <!--   <v-checkbox-->
               <!--       class="mr-5"-->
               <!--       label="I'm willing to travel to help train teams"-->
               <!--       hide-details-->
               <!--       v-model="public_info.will_travel"-->
               <!--   />-->
               <!--   <v-checkbox-->

               <!--       label="I can help transport dogs"-->
               <!--       hide-details-->
               <!--       v-model="public_info.will_transport"-->
               <!--   />-->
               <!--</v-row>-->

            </div>


         </v-container>
      </my-form>

      <v-row class="ma-0 pt-4" style="width: 100%">
         <v-spacer></v-spacer>
         <v-btn
             @click="save_profile({ignore:false})"
             color="var(--color-primary)"
             :loading="saving_data"
             large
         >

            Save Changes
         </v-btn>
         <v-spacer></v-spacer>
      </v-row>


      <div style="height: 40px;"/>

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
   name: "EditTrainerInfo",
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
         show_addr_warning: false,

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
               user.deactivated = user.deactivated === true;
            }
            else{
               user = await this.make_request('/private/getMyProfile', {});


            }

            let info_type = this.type_map[user.account_type];
            this.public_info = user[info_type];
            this.user = user;

            this.private_info_address_old = _.cloneDeep(user.private_info.address);


         }catch (e) {
            console.log(e)
         }

      },






      async save_profile({checked_addr, ignore=true}={}){

         if (!this.$refs.form.validate()){
            console.log('validation failed')
            return;
         }


         //check if business address was entered
         if (!ignore){
            let no_biz_addr = true;
            let city = this.public_info.address.city;
            let state = this.public_info.address.state;
            let zip = this.public_info.address.zip;

            if (city != null && city !== ''){
               no_biz_addr = false
            }

            if (state != null && state !== ''){
               no_biz_addr = false
            }


            if (zip != null && zip !== ''){
               no_biz_addr = false
            }



            //check for state is set but city is not
            if (state != null && state !== '' && (city == null || city === '') && (zip == null || zip === '')  ){
               no_biz_addr = true
            }


            if (no_biz_addr === true){
               this.show_addr_warning = true;
               return;
            }
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
               let res = await this.make_request('/private/updateUserProfile', payload, {getRawResponse:true});

               console.log({res});
            }




            // this.user = {social_profiles: {}};
            this.$emit('user_updated', update);
            // await this.get_profile();


            this.saving_data = false;

         }catch (e) {

            console.log(e)
         }
      },

      // async get_delegated_users(){
      //    try{
      //
      //    }catch (e) {
      //       console.log(e)
      //    }
      //
      // },


      async update_profile_image(img){
         console.log({img})


         this.user.profile_image = img;

         this.show_upload_image = false;
         // this.$emit('user_updated');
         this.$emit('photo_updated', img);
      }

   },


   mounted(){
      console.log('debug')
      this.$store.commit("set_show_side_nav", true);

      this.get_profile();
   },

   beforeDestroy() {
      // this.$store.commit("set_show_side_nav", false);
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


.my-tooltip-class{
    background-color: #4e4e4e;
    color: #ffffff;
    opacity: 1 !important;
}
</style>

