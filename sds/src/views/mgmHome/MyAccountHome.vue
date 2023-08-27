<template>
   <div>


      <v-dialog v-model="show_behaviors" max-width="1000px" origin="bottom center"
                content-class="agreement_class" :fullscreen="agreement_full">


         <!--:style="agreement_full ? 'height: 100vh; ': ''"-->
         <behavior-standards

             @join="on_join"

         />
      </v-dialog>





      <div class="page-title-app" id="account_top">
         Account Home
      </div>

      <div class="content-container-bg">

         <div class="page-title pb-4" style="display: flex; justify-content: center; font-size: 18pt">
            {{user.account_type === 'TRAINER'? "Pro ": ''}}
            Solutions for Service Dog {{heading_txt_completed}}s
         </div>

         <v-row>
            <v-col cols="12" :md="cols_md" style="display:flex; flex-direction: column; align-items: center" >


               <div class="account-status-container" :class="showBuyFirst? 'mt-4':''">
                  <!--           <div  v-if="!$auth.profile.acct_active || true">-->
                  <!--             <div style="font-size: 20pt; font-weight: 500; color: var(&#45;&#45;color-warning)">-->
                  <!--               Account Inactive-->
                  <!--             </div>-->
                  <!--             <div v-if="user.account_status && user.account_status.date_accepted != null">-->
                  <!--               Your Behavior Standards Agreement has expired.<br> <br>-->
                  <!--               Please review and accept the Behavior Standards Agreement again to re-activate your account-->
                  <!--             </div>-->
                  <!--             <div v-else>-->
                  <!--               Please accept our Training and Behavior Standards Agreement to activate your membership.-->

                  <!--             </div>-->

                  <!--             <div class="pa-4" style="display: flex; justify-content: center;">-->
                  <!--               <v-btn color="var(&#45;&#45;color-btn)" class="white&#45;&#45;text" @click="show_behaviors=true;" style="border-radius: 0px; width: 100%">-->
                  <!--                 Begin Now-->
                  <!--               </v-btn>-->
                  <!--             </div>-->
                  <!--           </div>-->



                  <div  v-if="!$auth.profile.acct_active">
                     <div style="display: flex; justify-content: center;" class="pt-5 pb-5">
                        <img src="../../assets/images/content/circle_check_not.png" width = "100px" style=" align-self: flex-start; ">
                     </div>


                     <div class="headings">
                        Activate Membership
                     </div>
                     <div style="text-align: center">
                        Please accept our Training and Behavior Standards Agreement to activate your membership.
                     </div>

                     <div class="pa-4" style="display: flex; justify-content: center;">
                        <v-btn color="var(--color-btn)" class="white--text" @click="click_behaviors()" style="border-radius: 0px; width: 100%">
                           Begin Now
                        </v-btn>
                     </div>
                  </div>


                  <div v-else>
                     <div style="display: flex; justify-content: center" class="pt-5 pb-5">
                        <img src="../../assets/images/content/circle_check_green.png" width = "100px" style="align-self: flex-start; ">
                     </div>


                     <div class="headings">
                        Membership Active
                     </div>
                     <div style="text-align: center">
                        Renew Your Service Dog Standards Training and Behavior Agreement before {{agreement_expiry}}.
                     </div>




                     <div class="pa-4" style="display: flex; justify-content: center;">
                        <v-btn
                            color="var(--color-btn)" class="white--text"
                            style="border-radius: 0px; width: 100%"
                            @click="show_behaviors=true;"
                        >
                           Renew Agreement
                        </v-btn>
                     </div>
                  </div>

               </div>





               <!--         <div class="account-status-container mt-4" v-if="$auth.profile.acct_active">-->
               <!--           <div>-->
               <!--             Here's how much time is left on your agreement before it needs to be renewed.-->
               <!--           </div>-->
               <!--           <div class="mt-4" style="display:flex; flex-direction: column; align-items: center">-->
               <!--             <v-progress-circular-->
               <!--                 :rotate="-90"-->
               <!--                 :size="180"-->
               <!--                 :width="20"-->
               <!--                 :value="percent_time_left < 0? 100 : percent_time_left"-->
               <!--                 :color="circle_color"-->
               <!--                 style="transform: scaleX(-1)"-->
               <!--             >-->
               <!--               <div style="transform: scaleX(-1); color: grey">-->
               <!--                 &lt;!&ndash;                  <div style="text-align: center">&ndash;&gt;-->
               <!--                 &lt;!&ndash;                     Time Remaining&ndash;&gt;-->
               <!--                 &lt;!&ndash;                  </div>&ndash;&gt;-->
               <!--                 <div style="text-align: center" v-if="time_left.years > 0">-->
               <!--                   {{time_left.years}} Year{{time_left.years===1?'':'s'}}-->
               <!--                 </div>-->
               <!--                 <div style="text-align: center" v-if="time_left.months > 0">-->
               <!--                   {{round(time_left.months, 0)}} Month{{time_left.months < 2?'':'s'}}-->
               <!--                 </div>-->

               <!--                 <div style="text-align: center" v-if="time_left.months < 2 && time_left.years <= 0">-->
               <!--                   {{round(time_left.days, 0)}} Day{{time_left.days < 1?'':'s'}}-->
               <!--                 </div>-->


               <!--               </div>-->


               <!--             </v-progress-circular>-->

               <!--             <div v-if="time_left.years < 1 && time_left.months < 6"-->
               <!--                  class="pa-4 mt-4" style="display: flex; justify-content: center;">-->
               <!--               <v-btn color="var(&#45;&#45;color-btn)" @click="show_behaviors=true;">-->
               <!--                 Renew Agreement-->
               <!--               </v-btn>-->
               <!--             </div>-->
               <!--           </div>-->

               <!--         </div>-->



               <div class="account-status-container mt-4" v-if="$auth.profile.acct_active" :style="{order: showBuyFirst? -1: 0}" >
                  <div style="display: flex; justify-content: center" class="pt-5 pb-5">
                     <img src="../../assets/images/content/cart.png" width = "100px" style="align-self: flex-start; ">
                  </div>


                  <div class="headings">
                     Order Kits
                  </div>
                  <div style="text-align: center">
                     Order Client Kits for Clients or Replacement Items
                  </div>
                  <div class="pa-4" style="display: flex; justify-content: center;">
                     <v-btn
                         color="var(--color-btn)" class="white--text"
                         style="border-radius: 0px; width: 100%"
                         to="/store"
                     >
                        Begin Now
                     </v-btn>
                  </div>
               </div>






               <div class="account-status-container mt-4" v-if="$auth.profile.acct_active && isTrainer">
                  <div style="display: flex; justify-content: center" class="pt-5 pb-5">
                     <img src="../../assets/images/icons/donate_heart.png" width = "100px" style="align-self: flex-start; ">
                  </div>


                  <div class="headings">
                     Donate
                  </div>

                  <div  style="text-align: center">
                     Please support Voluntary Service Dog Standards and help us keep our servers and coffee maker running.
                  </div>

                  <div class="pa-4" style="display: flex; justify-content: center;">
                     <v-btn
                         color="var(--color-btn)" class="white--text"
                         style="border-radius: 0px; width: 100%"
                         to="/donate"
                     >
                        Donate
                     </v-btn>
                  </div>
               </div>



            </v-col>






            <!------------------------------------ Column 2 ----------------------------------------------------------------->
            <v-col cols="12" md="6" style="display:flex; flex-direction: column; align-items: center">
               <!----------------------  ----------------------------------->
               <div class="account-status-container" v-if="$auth.profile.acct_active && isTrainer" >


                  <!--           :value="percent_time_left < 0? 100 : percent_time_left"-->
                  <div class="mt-8 " style="display:flex; flex-direction: column; align-items: center">
                     <v-progress-circular
                         :rotate="-90"
                         :size="100"
                         :width="7"
                         :value="percent_completed"
                         color="var(--color-btn)"
                     >
                        <div style="color: grey">
                           <div style="text-align: center; font-weight: 600; font-size: 16pt; padding-top: 2px" >
                              {{round(percent_completed, 0)}}%
                           </div>
                        </div>
                     </v-progress-circular>

                  </div>


                  <div class="pb-4 pt-4 headings" style="display: flex; flex-direction: column; align-items: center">
                     <div>
                        {{heading_txt_completed}} Profile
                     </div>
                     <div>{{percent_completed}}% Complete</div>
                  </div>

                  <div v-for="(item, ix) in profile_items.sections" :key="item.txt + ix"
                       style="display:flex; align-items: flex-start; padding: 5px 0px 5px 10px;"
                  >
                     <div style="padding-top: 3px">
                        <img v-if="item.done" src="../../assets/images/content/check-box-with-check-sign.png" height="20px" style="align-self: flex-start; ">
                        <img v-else src="../../assets/images/content/check-box.png" height="20px" style="align-self: flex-start; ">
                     </div>


                     <div class="ml-2">
                        {{item.txt}}
                     </div>

                     <div v-if="!item.done && item.section">
                        <v-tooltip bottom>
                           <template v-slot:activator="{ on, attrs }">
                              <v-btn icon x-small style="border-radius: 50%"
                                     @click="on_skip_section_click(item.section)">
                                 <v-icon
                                     x-small
                                     v-bind="attrs"
                                     v-on="on"
                                 >
                                    close
                                 </v-icon>
                              </v-btn>

                           </template>
                           <span>This item isn't applicable to me</span>
                        </v-tooltip>

                     </div>
                  </div>



                  <!--skipped sections-->
                  <div v-if="profile_items.skipped.length>0" style="margin-top: 10px; font-size: 10pt">
                     Skipped Sections
                     <v-btn icon @click="show_skipped = !show_skipped" style="border-radius: 50%">
                        <v-icon v-if="!show_skipped" small>visibility</v-icon>
                        <v-icon v-else small>visibility_off</v-icon>
                     </v-btn>
                     <template v-if="show_skipped">
                        <div v-for="(item, ix) in profile_items.skipped" :key="item.txt + ix"
                             style="display:flex; align-items: flex-start; padding: 5px 0px 5px 10px;"
                        >
                           <!--<div style="padding-top: 3px">-->
                           <!--   <img v-if="item.done" src="../../assets/images/content/check-box-with-check-sign.png" height="20px">-->
                           <!--   <img v-else src="../../assets/images/content/check-box.png" height="20px">-->
                           <!--</div>-->


                           <div class="ml-2">
                              {{item.txt}}
                           </div>

                           <div v-if="!item.done && item.section">
                              <v-tooltip bottom>
                                 <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon x-small style="border-radius: 50%"
                                           @click="on_skip_section_click(item.section)">
                                       <v-icon
                                           small
                                           v-bind="attrs"
                                           v-on="on"
                                       >
                                          add
                                       </v-icon>
                                    </v-btn>

                                 </template>
                                 <span>Reactivate this section</span>
                              </v-tooltip>

                           </div>
                        </div>
                     </template>

                  </div>

                  <div class="pa-4" style="display: flex; justify-content: center;">
                     <v-btn
                         color="var(--color-btn)" class="white--text"
                         style="border-radius: 0px; width: 100%"
                         to="/manageProfile"
                     >
                        Edit Profile
                     </v-btn>
                  </div>






               </div>

               <!--&lt;!&ndash;edit button&ndash;&gt;-->
               <!--<div style="width: 100%; display: flex; justify-content: flex-end; margin-top: -40px; margin-bottom: 12px; padding-right: 10px" >-->

               <!--   <v-btn text small color="blue" >-->
               <!--      Edit Profile-->
               <!--   </v-btn>-->
               <!--</div>-->







               <div class="account-status-container" v-if="$auth.profile.acct_active && !isTrainer">
                  <div style="display: flex; justify-content: center" class="pt-5 pb-5">
                     <img src="../../assets/images/icons/donate_heart.png" width = "100px" style="align-self: flex-start; ">
                  </div>


                  <div class="headings">
                     Donate
                  </div>

                  <div  style="text-align: center">
                     Please support Voluntary Service Dog Standards and help us keep our servers and coffee maker running.
                  </div>

                  <div class="pa-4" style="display: flex; justify-content: center;">
                     <v-btn
                         color="var(--color-btn)" class="white--text"
                         style="border-radius: 0px; width: 100%"
                         to="/donate"
                     >
                        Donate
                     </v-btn>
                  </div>
               </div>






               <div class="account-status-container mt-4 pb-8" v-if="$auth.profile.acct_active">
                  <div style="display: flex; justify-content: center" class="pt-5 pb-5">
                     <img src="../../assets/images/content/cloud-download.png" width = "100px" style="align-self: flex-start; ">
                  </div>


                  <div class="headings pb-1">
                     Downloadables
                  </div>

                  <!--<a href="/downloads/Service_Dog_Standards_Training_and_Behavior_Standards_SDSPAT-21.pdf"-->
                  <!--   target="_blank" style="text-decoration: none;">-->
                  <!--   <div style="display: flex; justify-content: center; align-items: center; background-color: var(&#45;&#45;color-bg)" class="ml-4 mr-4 pa-3">-->
                  <!--      <img src="../../assets/images/content/pdf_icon.png" width="50">-->
                  <!--      <div style="max-width: 250px; font-size: 11pt; color: var(&#45;&#45;color-subheading); font-weight: 500" class="pl-2">-->
                  <!--         Service Dogs Standards Training and Behavior Agreement-->
                  <!--      </div>-->
                  <!--   </div>-->
                  <!--</a>-->
                  <!--<div style="height: 10px"></div>-->
                  <!--<a href="/downloads/Service_Dog_Standards_Public_Access_Test_SDSPAT-A21.pdf" target="_blank" style="text-decoration: none; ">-->
                  <!--   <div style="display: flex; justify-content: center; align-items: center; background-color: var(&#45;&#45;color-bg)" class="ml-4 mr-4 pa-3">-->
                  <!--      <img src="../../assets/images/content/pdf_icon.png" width="50">-->
                  <!--      <div style="max-width: 250px; font-size: 11pt; color: var(&#45;&#45;color-subheading); font-weight: 500" class="pl-2">-->
                  <!--         Service Dog Standards Public Access Test-->
                  <!--      </div>-->
                  <!--   </div>-->
                  <!--</a>-->




                  <div style="background-color: var(--color-bg)" class="ml-4 mr-4 pa-3">
                     <div style="display: flex; justify-content: center; align-items: center; " >
                        <img src="../../assets/images/content/pdf_icon.png" width="50" style="align-self: flex-start; ">
                        <div style="max-width: 250px; font-size: 11pt; color: var(--color-subheading); font-weight: 500" class="pl-2">
                           Service Dogs Standards Training and Behavior Agreement
                        </div>
                     </div>


                     <div style="margin-left:60px" class="pt-2">
                        <!--<a href="/downloads/Service_Dog_Standards_Training_and_Behavior_Standards_SDSTBS-21.pdf"-->
                        <!--   target="_blank" style="text-decoration: none;">-->
                        <!--   Open in new window-->
                        <!--</a>-->
                        <!--<br>-->
                        <a href="/downloads/Service_Dog_Standards_Training_and_Behavior_Standards_SDSTBS-21.pdf"
                           style="text-decoration: none;" download>
                           Download
                        </a>
                     </div>
                  </div>

                  <div style="height: 10px"></div>

                  <div style="background-color: var(--color-bg)" class="ml-4 mr-4 pa-3">
                     <div style="display: flex; justify-content: center; align-items: center; " >
                        <img src="../../assets/images/content/pdf_icon.png" width="50" style="align-self: flex-start; ">
                        <div style="max-width: 250px; font-size: 11pt; color: var(--color-subheading); font-weight: 500" class="pl-2">
                           Service Dog Standards Public Access Test
                        </div>
                     </div>


                     <div style="margin-left:60px" class="pt-0">
                        <!--<a href="/downloads/Service_Dog_Standards_Public_Access_Test_SDSPAT-A21.pdf"-->
                        <!--   target="_blank" style="text-decoration: none;">-->
                        <!--   Open in new window-->
                        <!--</a>-->
                        <!--<br>-->
                        <a href="/downloads/Service_Dog_Standards_Public_Access_Test_SDSPAT-A21.pdf"
                           style="text-decoration: none;" download>
                           Download
                        </a>
                     </div>
                  </div>




                  <div style="height: 15px"></div>
               </div>









            </v-col>
         </v-row>



















      </div>

   </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import utilities from "@/mixins/utilities";
import behaviorStandards from "@/views/signup/behaviorStandards";

import {DateTime} from 'luxon';
import _ from 'lodash';
import StatusLabel from "@/components/StatusLabel";
export default {
   name: "AccountHome",
   components: {StatusLabel, behaviorStandards},
   mixins: [data_getters, utilities],
   data () {
      return {
         user: {social_profiles: {}},
         show_behaviors: false,

         show_skipped: false,
      }
   },

   computed:{

      isTrainer(){
         return this.$auth.profile.acct_type === 'TRAINER';
      },


      agreement_expiry(){

         let d = _.get(this.user, 'account_status.date_expiry', null)
         if (d != null){
            return DateTime.fromISO(d).toFormat('LLLL, d yyyy');
         }
         return '';
      },

      done_basic_info(){
         return true;
      },

      done_profile_pic(){
         return _.get(this.user, 'profile_image.Location', null) !== null;
      },

      done_banner_pic(){
         return _.get(this.user, 'trainer_info.banner_image.Location', null) !== null;
      },

      done_biz_info(){
         let ans = false;
         let b = _.get(this.user, 'trainer_info.business_name', null) !== null;
         // let b = _.get(this.user, 'trainer_info.business_name', null) !== null;
         return b;
      },

      done_about(){
         let tmp = _.get(this.user, 'trainer_info.about', '');

         if (tmp !== '' && tmp != null){
            return true;
         }

         return false;
      },



      /**
       * returns a list profile items and whether they've been filled in
       */
      profile_items(){
         let ans = [];
         let skipped = [];

         ans.push({txt: 'Add Basic Info', done: this.done_basic_info, link: ''});
         ans.push({txt: 'Uploaded Profile Picture', done: this.done_profile_pic, link: ''});
         ans.push({txt: 'Uploaded Banner', done: this.done_banner_pic, link: ''});
         ans.push({txt: 'Add Business Info', done: this.done_biz_info, link: ''});

         if (!_.get(this.user, 'trainer_info.section_skip_checks.about', false))
            ans.push({txt: 'Add About Info', done: this.done_about, link: '', section: 'about'});
         else
            skipped.push({txt: 'Add About Info', done: this.done_about, link: '', section: 'about'});

         if (!_.get(this.user, 'trainer_info.section_skip_checks.services', false))
            ans.push({txt: 'Add Training Services', done: this.added_item('services'), link: '', section: 'services'});
         else
            skipped.push({txt: 'Add Training Services', done: this.added_item('services'), link: '', section: 'services'});

         if (!_.get(this.user, 'trainer_info.section_skip_checks.certifications', false))
            ans.push({txt: 'Add Training and Certifications', done: this.added_item('certifications'), link: '', section: 'certifications'});
         else
            skipped.push({txt: 'Add Training and Certifications', done: this.added_item('certifications'), link: '', section: 'certifications'});

         if (!_.get(this.user, 'trainer_info.section_skip_checks.awards', false))
            ans.push({txt: 'Add Awards and Honors', done: this.added_item('awards'), link: '', section: 'awards'});
         else
            skipped.push({txt: 'Add Awards and Honors', done: this.added_item('awards'), link: '', section: 'awards'});

         // if (!_.get(this.user, 'trainer_info.section_skip_checks.breeds', false))
         //    ans.push({txt: 'Add Breeds you specialize in', done: this.added_item('breeds'), link: ''});

         if (!_.get(this.user, 'trainer_info.section_skip_checks.groups', false))
            ans.push({txt: "Add Organizations you're a part of", done: this.added_item('groups'), link: '', section: 'groups'});
         else
            skipped.push({txt: "Add Organizations you're a part of", done: this.added_item('groups'), link: '', section: 'groups'});

         if (!_.get(this.user, 'trainer_info.section_skip_checks.social', false))
            ans.push({txt: 'Add Social Media Profiles', done: this.added_item('social'), link: '', section: 'social'});
         else
            skipped.push({txt: 'Add Social Media Profiles', done: this.added_item('social'), link: '', section: 'social'});

         return {sections:ans, skipped};
      },


      /**
       * gives the percent it profile items that have been filled in
       */
      percent_completed(){
         let n = this.profile_items.sections.length;

         // n += 4
         let k=0;
         for (let i of this.profile_items.sections){
            if (i.done){
               k += 1;
            }
         }
         return this.round( k/n *100, 0);
      },


      /**
       * Gives the amount of time (as a percent of 4 years) that the registration is still good for.
       */
      percent_time_left(){
         if (this.$auth.profile.acct_active && this.user.account_status != undefined){
            console.log('debug')
            let start = DateTime.fromISO(this.user.account_status.date_accepted);
            let end = DateTime.fromISO(this.user.account_status.date_expiry);
            let now = DateTime.local();
            // return end.diff(now).as('days')/end.diff(start).as('days') *100;
            return end.diff(now).as('months')/48*100;
            // return -1;
         }

         return 0;
      },

      time_left(){
         if (this.$auth.profile.acct_active && this.user.account_status != undefined){
            let end = DateTime.fromISO(this.user.account_status.date_expiry);
            let now = DateTime.local();
            let t =end.diff(now)
            return t.shiftTo('years', 'months', 'days').toObject();
         }

         return {years: 0, months: 0, days: 0};
      },

      circle_color(){

         let t = this.percent_time_left;
         let ans = 'var(--color-good)';

         if (t < 6/48*100  ){
            ans = '#ee950e';
         }


         if (t < 3/48*100  ){
            ans = '#ff5900';
         }

         if (t < 0 ){
            ans = '#ff2f2f';
         }


         return ans;
      },




      heading_txt_completed(){
         let type = this.user.account_type;

         switch (type){
            case 'TRAINER':
               return 'Trainer';

            case 'HANDLER':
               return 'Handler';

            case 'AIDE':
               return 'Aide';

            default:
               return '';
         }
      },


      cols_md(){
         if (this.$auth.profile.acct_active){
            return 6;
         }
         else{
            return 12;
         }
      },

      agreement_class(){

         let ans = 'agreement-dialog';
         if (this.$vuetify.breakpoint.width<1000){
            ans =  'agreement-dialog-md';
         }


         if (this.agreement_full){
            ans = 'agreement-dialog-fullscreen';
         }


         if (this.$vuetify.breakpoint.width > 1000 & this.$vuetify.breakpoint.height > 1200){
            ans += ' agreement-dialog-tall'
         }


         ans = 'agreement-dialog';
         ans = ''

         return ans;
      },

      agreement_full(){
         if (this.$vuetify.breakpoint.width<700)
            return true;

         if (this.$vuetify.breakpoint.width<1000 && this.$vuetify.breakpoint.height<800)
            return true;

         return false
      },

      showBuyFirst(){
         return this.$vuetify.breakpoint.height<900;

      }




   }, //computed

   methods: {

      click_behaviors(){
         // this.$router.push('/behaviorStandardsViewer')
         if (this.$vuetify.breakpoint.width < 500){
            this.$router.push('/behaviorStandardsViewer')
         }
         else{
            this.show_behaviors=true;
         }




      },

      /**
       *
       * @param item str, name of property to check for in trainer_info
       * @returns {boolean}
       */
      added_item(item){
         let path = 'trainer_info.'+item;
         let tmp = _.get(this.user, path, []);
         return  (Array.isArray(tmp) && tmp.length>0)
      },


      async get_profile(){
         try{
            this.user = await this.make_request('/private/getMyProfile', {});
         }catch (e) {

            console.log(e)
         }

      },

      async on_join(){
         try {
            let payload = {email: this.$auth.profile.email, behaviors: 'USER_AGREED'};
            await this.make_request('/private/updateSetup', payload,);

            this.show_behaviors = false;
            window.location.reload();


         } catch (e) {
            console.log(e)
         }

      },


      //set's the "skip this section" check
      async on_skip_section_click(section){


         let key = 'trainer_info.section_skip_checks.'+section;

         let value = _.get(this.user, key, undefined);

         if (value == undefined){
            value = true
         }else{
            value = !value;
         }

         let payload = {
            user_id: this.user._id,
            nestedUpdate: {
               [key]: value,
            }

         }
         await this.make_request('/private/updateUserProfile', payload);

         await this.get_profile();
      },


   },

   created(){
     if (this.$route.query.reload == 'true'){
        this.$router.push({ path: '/accountHome', query: { reload: 'false' } , replace: true})
        setTimeout(()=>{
           window.location.reload(); //used when redirecting back to this page from the stand alone behavior standards viewer
        }, 0)

     }
   },
   mounted(){
      // console.log('debug')
      this.$store.commit("set_show_side_nav", true);

      this.get_profile();
   },

}
</script>


<style scoped src="../mgmProfile/mgm_common.css" />
<style scoped>

.headings{
    font-size: 18pt;
    font-weight: 600;
    color: var(--color-headline);
    text-align: center;
    /*margin-top: 5px;*/
    margin-bottom: 15px;

}

.full-height{
    min-height: calc(100vh - 350px);
    align-items: flex-start;
}


.account-status-container{
    background-color: white;
    padding: 50px;
    max-width: 450px;
    width: 100%;
}

.section-edit-icon{
    font-size:10pt;
    margin-right: 3px;
}

.profile-completion-container{
    background-color: white;
    padding: 10px;
    min-width: 400px;
}



div >>> .v-progress-circular__underlay{
    stroke: rgba(0, 0, 0, 0.05);
}


/*controls settings for agreement dialog*/
div >>> .agreement-dialog {

    max-height: 95vh;
    align-self: flex-end;
    /*margin-bottom: 30vh;*/
}
div >>> .agreement-dialog-md {

    max-height: 95vh;
    align-self: flex-end;
    /*margin-bottom: 10vh;*/
}
div >>> .agreement-dialog-tall {

    margin-bottom: calc(100vh - 950px);
}

div >>> .agreement-dialog-fullscreen {

    height: 100vh;
    width: 100vw;
}
</style>


<style>
/*.test-dialog{*/

/*    background-color: deeppink;*/
/*    align-self: flex-end;*/
/*    margin-bottom: 40vh;*/
/*}*/
</style>
