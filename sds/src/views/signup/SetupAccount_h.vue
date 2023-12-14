<template>
  <div class="">
    <div class="page-title">
      Sign Up
    </div>

    <div
      class="content-container-bg "
      style="position: relative; padding-top: 40px"
    >
      <!-------- stepper header ------------------------------------------------------------------------------------>
      <div class="row-container">
        <stepper :step="step" />
      </div>



      <!-------- stepper container --------------------------------------------------------------------------------->
      <div class="stepper-container">
        <!-------- step 1 container --------------------------------------------------------->
        <div
          v-if="step===1"
          style="display: flex; justify-content: center; align-items: center; "
        >
          <select-acct-type
            @user-type-selected="acct_type=$event; step += 1"
          />
        </div>


        <!-------- step 2 container --------------------------------------------------------->
        <div
          v-if="step===2"
          style="display: flex; justify-content: center; align-items: center; "
        >
          <signup
            v-if="verified_email == null"
            :show-email-confirm="accountCreated"
            :acct-type="acct_type"
            @email-verified="on_email_confirmed"
          />


          <div v-else>
            <password-reset
              :email-fill="verified_email"
              heading="Email verified.  Please create password"
              pw-reset
              @pass-updated="step=3"
            >
              <template #heading>
                <div style="text-align: center; font-size: 18pt">
                  Welcome Back!   <br>
                  Please choose a password.
                </div>
              </template>

              <template #button-text>
                Continue
              </template>
            </password-reset>
          </div>
        </div>






        <!-------- step 3 container --------------------------------------------------------->
        <div v-if="step===3">
          <v-row>
            <v-col align="center">
              <div class="my-stepper-container">
                <terms :agreed.sync="tc_agreed" />
              </div>
            </v-col>
          </v-row>

          <v-row
            class="ma-0"
            style="justify-content: center"
          >
            <v-btn
              color="var(--color-primary)"
              :disabled="!tc_agreed"
              @click="on_terms_agreed"
            >
              Continue
            </v-btn>
          </v-row>
        </div>



        <!-------- step 3 container --------------------------------------------------------->
        <div v-if="step===4">
          <v-row>
            <v-col align="center">
              <div class="my-stepper-container">
                <handler-info
                  v-if="isHandler"
                  :setup-mode="true"
                  @user_updated="on_basic_info"
                />

                <user-info
                  v-else
                  @user_updated="on_basic_info"
                />
              </div>
            </v-col>
          </v-row>
        </div>


        <!-------- step 3 container --------------------------------------------------------->
        <div v-if="step===5">
          <v-row>
            <v-col
              align="center"
              style="margin-top: 50px"
            >
              <div>
                <img
                  v-if="step===5"
                  src="../../assets/images/content/checkmark.gif"
                  width="200px"
                >
              </div>
              <div class="pt-5">
                Congratulations on Joining Service Dog Standards!
              </div>

              <div class="mt-8">
                <v-btn @click="nav_to_account">
                  Go to my account
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import selectAcctType from "@/views/signup/selectAcctType";
import signup from './SignupModal';
import terms from './termsAndConditions';
import userInfo from './userInfo';
import PasswordReset from "@/components/app/PasswordReset";

import handlerInfo from "@/views/mgmProfile/EditHandlerInfo";


// import uploadImage from "@/components/FileUploads/UploadUserImage";
// import social from '@/views/signup_old/social';
// import census from '@/views/signup_old/censusInfo';
//
// import behaviors from '@/views/signup_old/behaviorStandards';

import data_getters from "@/mixins/data_getters";

import Stepper from "@/views/signup/Stepper";



export default {
   name: "SetupAccount",
   components: {Stepper, signup, terms, userInfo, selectAcctType,PasswordReset, handlerInfo
      // uploadImage, social, census, behaviors
   },
   mixins: [data_getters],
   data() {
      return {
         step: 1,
         verified_email: null,

         tc_agreed: false,

         acct_type: null,

         //additional info
         image_uploaded: false,
         social_info: null,
         panel_ix: null, // used to keep track of which panel is open

         census_info: null,
      }
   }, //methods


   computed: {


      accountCreated() {
         console.log(this.$auth.authenticated)
         if (this.$auth.authenticated) {
            return true
         } else {
            return false;
         }
      },

      isHandler(){
         if (!this.$auth.authenticated){
            return null
         }
         else{
            return this.$auth.profile.acct_type === 'HANDLER';
         }
      },




   },
   created() {

      if (this.$auth.isAuthenticated() && this.$auth.profile.acct_confirmed){
         console.log('debug')
         this.$router.push('/accountHome');

      }

      if (this.$auth.isAuthenticated() && !this.$auth.profile.acct_confirmed) {
         let setup = this.$auth.profile.setup;
         if (setup.confirmed_email) {
            this.step = 3;
         }
         if (setup.confirmed_tc) {
            this.step = 4;
         }


         if (setup.basic_info) {
            this.step =5;
         }

         // if (setup.additional_info) {
         //    this.step = 6;
         // }

         // if (setup.confirmed_bs) {
         //    this.step =7;
         // }

      }

      else{
         if (this.$route.query.verified_email !=null){
            this.step = 2;
            this.verified_email = this.$route.query.verified_email;

         }
      }

   },



   methods: {
      test(e) {
         console.log('test', e);
      },




      async on_email_confirmed() {

         await this.$auth.check_is_logged_in();
         setTimeout(() => {
            this.step = 3;
         }, 500);

      },

      async on_terms_agreed() {
         try {
            let payload = {email: this.$auth.profile.email, terms: 'USER_AGREED'};
            await this.make_request('/private/updateSetup', payload, {authenticate: true});
            this.step = 4;
         } catch (e) {
            console.log(e)
         }
      },




      //handler to save basic (trainer) info
      async on_basic_info() {
         try {
            let payload = {email: this.$auth.profile.email, basic_info: 'USER_UPDATED'};
            await this.make_request('/private/updateSetup', payload,);
            this.step = 5;



            // setTimeout(()=>{
            //    window.location.replace(process.env.VUE_APP_BASE +'/accountHome')
            // }, 1000);


            //

            // await this.$router.push('/memberCenter')

            console.log('i ran')

         } catch (e) {
            console.log(e)
         }
      },

      nav_to_account(){
         window.location.replace(process.env.VUE_APP_BASE +'/accountHome')
      },


      // //handler to save handler info
      // async on_handler_info(){
      //    try {
      //       let payload = {email: this.$auth.profile.email, basic_info: 'USER_UPDATED'};
      //       await this.make_request('/private/updateSetup', payload,);
      //       this.step = 5;
      //
      //
      //
      //       setTimeout(()=>{
      //          window.location.replace(process.env.VUE_APP_BASE +'/accountHome')
      //       }, 1000);
      //       //
      //
      //       // await this.$router.push('/memberCenter')
      //
      //       console.log('i ran')
      //
      //    } catch (e) {
      //       console.log(e)
      //    }
      //
      // },



      async on_social_saved(event){
         this.social_info=event;

         let payload = {
            user_id: this.$auth.profile.user_id,
            update: {
               social_profiles: event,
            },
         }
         let res = await this.make_request('/private/updateUserProfile', payload);

         this.panel_ix=null;
      },

      async on_census_ans(event){
         this.census_info=event;

         let payload = {
            user_id: this.$auth.profile.user_id,
            update: {
               census_info: event,
            },
         }
         let res = await this.make_request('/private/updateUserProfile', payload);

         this.panel_ix=null;
      },

      async on_additional_info(){
         try {
            let payload = {email: this.$auth.profile.email, additional_info: 'USER_SAW'};
            await this.make_request('/private/updateSetup', payload,);
            this.step = 6;
         } catch (e) {
            console.log(e)
         }

      },

      async on_join(){
         try {
            let payload = {email: this.$auth.profile.email, behaviors: 'USER_AGREED'};
            await this.make_request('/private/updateSetup', payload,);



         } catch (e) {
            console.log(e)
         }

      },


   }


}
</script>

<style scoped>

.stepper-container{
   padding-top: 30px;
   height: 100%;
}

.my-stepper-container{
   max-width: 700px;
   width: 100%;
   text-align: left;



}


.content-bg{
   background-color: var(--color-bg);
   min-height: calc(100vh - 310px);
   padding: 20px;
}

.row-container{
   display: flex;
   justify-content: center;
   width: 100%;
}




</style>
