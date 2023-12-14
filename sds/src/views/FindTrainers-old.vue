<template>
  <div>
    <v-dialog
      v-model="show_profile"
      content-class="find-trainer-dialog"
      :fullscreen="$vuetify.breakpoint.smAndDown"
    >
      <v-card>
        <div style="display: flex; background-color: var(--color-bg)">
          <v-spacer />
          <v-btn
            icon
            class="mr-1 "
            @click="show_profile=false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>

        <trainer-profile
          v-if="show_profile"
          :user_id="show_trainer_id"
        />
      </v-card>
    </v-dialog>





    <div class="page-title">
      Find a Trainer
    </div>


    <!-------------------- search box ------------------------------------------------------------------------->
    <div
      v-if="$vuetify.breakpoint.width>=700"
      class="content-container-bg"
      style=" min-height: 0;"
    >
      <div class="content-container">
        <my-form ref="form">
          <div
            class="mb-3"
            style="display: flex;"
          >
            <div style="width:100%">
              <text-input
                v-model="address"
                label="Use current location or type address"
                @keyup-enter="search"
              />
            </div>


            <text-input
              v-model="miles"
              class="ml-2"
              style="width: 250px"
              label="Distance (Miles)"
              :rules="[isNumber]"
              @keyup-enter="search"
            />




            <v-btn
              class="ml-3 mt-5 white--text"
              color="var(--color-btn)"
              @click="search"
            >
              Search
            </v-btn>
          </div>

          <!--               {{ location }}-->


          <div style="margin-top: -10px">
            <v-checkbox
              v-model="have_facility"
              label="Trainer must have facility"
              dense
              hide-details
            />
          </div>

          <div style="margin-top: -10px">
            <v-checkbox
              v-model="will_travel"
              label="Trainer must be willing to travel to me"
              dense
              hide-details
            />
          </div>

          <div style="margin-top: -10px">
            <v-checkbox
              v-model="will_transport"
              label="Trainer will help transport dogs"
              dense
              hide-details
            />
          </div>
        </my-form>
      </div>
    </div>




    <!----mobile version------------>
    <div
      v-else
      class="content-container-bg"
      style=" min-height: 0;"
    >
      <div class="content-container">
        <my-form ref="form">
          <div class="mb-3">
            <text-input
              v-model="address"
              style="width:100%"
              label="Address"
              @keyup-enter="search"
            />
            <!--                  {{ location }}-->
          </div>

          <div
            class="mb-3"
            style="display: flex; justify-content: flex-end"
          >
            <text-input
              v-model="miles"
              class="ml-0"
              style="width: 100%"
              label="Distance (Miles)"
              :rules="[isNumber]"
              @keyup-enter="search"
            />


            <v-btn
              class="ml-3 mt-5 white--text"
              color="var(--color-btn)"
              @click="search"
            >
              Search
            </v-btn>
          </div>

          <div style="margin-top: 0px">
            <v-checkbox
              label="Find trainers willing to travel"
              dense
              hide-details
            />
          </div>
        </my-form>
      </div>
    </div>















    <!--      <div class="content-container-bg" style=" min-height: 0;">-->
    <!--         <div class="content-container" >-->
    <!--            <my-form ref="form">-->
    <!--               <div class="mb-3" style="display: flex;" >-->

    <!--                  <div style="width:100%">-->
    <!--                     <text-input-->
    <!--                         label="Use current location or type address"-->
    <!--                         v-model="address"-->
    <!--                         @keyup-enter="search"-->
    <!--                     ></text-input>-->
    <!--                     {{ location }}-->
    <!--                  </div>-->


    <!--                  <text-input-->
    <!--                      class="ml-2"-->
    <!--                      style="width: 250px"-->
    <!--                      label="Distance (Miles)"-->
    <!--                      v-model="miles"-->
    <!--                      :rules="[isNumber]"-->
    <!--                      @keyup-enter="search"-->
    <!--                  ></text-input>-->


    <!--                  <v-btn class="ml-3 mt-5 white&#45;&#45;text" color="var(&#45;&#45;color-btn)"  @click="search"  >-->
    <!--                     Search</v-btn>-->
    <!--               </div>-->
    <!--&lt;!&ndash;               <v-btn class="white&#45;&#45;text" color="var(&#45;&#45;color-btn)" @click="request_position" small>Use Current Location</v-btn>&ndash;&gt;-->



    <!--               <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">-->

    <!--               </div>-->
    <!--            </my-form>-->
    <!--         </div>-->
    <!--      </div>-->


    <div
      v-if="trainers!=null"
      class="content-container-bg  "
    >
      <v-divider style="width: 100%; margin-top: -20px" />


      <div
        v-if="trainers.length === 0"
        style="text-align: center; margin-top: 30px"
      >
        <!--<div>-->
        <!--   No results found in this area.-->
        <!--</div>-->

        <div>
          Please widen your search or

          <router-link to="/faq/how_do_i_find_trainer">
            search another way
          </router-link>


          <span style="text-decoration: underline" />
        </div>
      </div>


      <!------------full screen version ----------------------------------------->
      <div
        v-if="$vuetify.breakpoint.width>600"
        class="content-container mt-5"
      >
        <div
          v-for="item in trainers"
          :key="item.user._id"
          class="trainer-box"

          @click="show_trainer(item.user._id)"
        >
          <div class="profile-image">
            <v-avatar size="100">
              <img
                v-if="!item.user.profile_image"
                src="../assets/images/content/user-no-image.png"
                width="75px"
              >
              <img
                v-else
                :src="item.user.profile_image.Location"
                width="75px"
              >
            </v-avatar>
          </div>


          <div class="trainer-info-container">
            <div style="color: var(--color-headline); font-size: 13pt; font-weight: 500;">
              {{ item.user.trainer_info.business_name }}
            </div>

            <div style="color: var(--color-subheading); font-size: 11pt; font-weight: 400;">
              {{ item.user.trainer_info.tagline }}
            </div>

            <div class="mt-1">
              Trainer: {{ item.user.name_first }} {{ item.user.name_last }}
            </div>
            <!--<div>-->
            <!--   Email: {{ item.user.email }}-->
            <!--</div>-->




            <!--style="display: flex; flex-wrap: wrap; justify-content: space-between; width: 100%"-->
            <div
              v-if="item.user.trainer_info.will_travel || item.user.trainer_info.will_transport || item.user.trainer_info.have_facility"
              class="mt-1 "
            >
              <div v-if="item.user.trainer_info.have_facility">
                <img
                  src="../assets/images/icons/checked_box.svg"
                  height="16"
                >
                Has a training facility
              </div>

              <div v-if="item.user.trainer_info.will_travel">
                <img
                  src="../assets/images/icons/checked_box.svg"
                  height="16"
                >
                Will travel to you
                <template v-if="isFinite(item.user.trainer_info.max_travel_miles)">
                  ({{ Math.round(item.user.trainer_info.max_travel_miles) }} miles)
                </template>
              </div>

              <div v-if="item.user.trainer_info.will_transport">
                <img
                  src="../assets/images/icons/checked_box.svg"
                  height="16"
                >
                Will transport dogs
              </div>
            </div>
          </div>


          <v-spacer />
          <div style="display:flex; flex-direction: column; justify-content: flex-start">
            <div>
              Distance {{ round(item.distance, 1) }} miles
            </div>
            <div>
              <a
                :href="'/trainer/'+get_trainer_url(item.user)"
                target="_blank"
                @click.stop
              >
                Open in new tab
              </a>
            </div>
          </div>
        </div>
      </div>



      <!------------mobile version ----------------------------------------->
      <div
        v-else
        class="content-container mt-5"
      >
        <div
          v-for="item in trainers"
          :key="item.user._id"
          class="trainer-box"
          style="flex-direction: column"

          @click="show_trainer(item.user._id)"
        >
          <div style="display: flex">
            <div class="profile-image">
              <v-avatar size="100">
                <img
                  v-if="!item.user.profile_image"
                  src="../assets/images/content/user-no-image.png"
                  width="75px"
                >
                <img
                  v-else
                  :src="item.user.profile_image.Location"
                  width="75px"
                >
              </v-avatar>
            </div>


            <div class="trainer-info-container">
              <div style="color: var(--color-headline); font-size: 13pt; font-weight: 500;">
                {{ item.user.trainer_info.business_name }}
              </div>

              <div style="color: var(--color-subheading); font-size: 11pt; font-weight: 400;">
                {{ item.user.trainer_info.tagline }}
              </div>

              <div class="mt-1">
                Trainer: {{ item.user.name_first }} {{ item.user.name_last }}
              </div>
              <div>
                Email: {{ item.user.email }}
              </div>
            </div>
          </div>


          <div style="display: flex; justify-content: flex-start">
            <div
              style="display:flex; flex-direction: column; justify-content: flex-start"
              class="mt-3"
            >
              <div>
                Distance {{ round(item.distance, 1) }} miles
              </div>
              <div>
                <a
                  :href="'/trainer/'+item.user._id"
                  target="_blank"
                  @click.stop
                >
                  Open in new tab
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import utilities from "@/mixins/utilities";
import validation from "@/mixins/validation";

import TrainerProfile from "@/views/profileTrainer/TrainerProfile";
// import UserProfile from "@/views/profileTrainer/UserProfile";
import TextInput from "@/components/inputs/TextInput";
import MyForm from "@/components/inputs/MyForm";

import _ from 'lodash';

export default {
   name: "FindTrainers",
   components: {TrainerProfile, TextInput, MyForm},
   mixins: [data_getters, utilities, validation],
   data(){
      return {
         show_profile: false,
         show_trainer_id: null,


         address: null,
         city: null,
         state: null,
         zip: null,

         miles: '25',


         test: '',
         location: null,

         trainers: null,

         will_travel: false,
         have_facility: false,
         will_transport: false,

      }
   },

   created(){
      this.$store.commit("set_show_side_nav", false);
   },

   methods: {

      get_trainer_url(user){

         console.log({user})
         return _.get(user, 'trainer_info.custom_trainer_url', user._id);
      },

      //*****request position from browser/user*****************************

      /**
       * callback function to be passed to the browser's geolocation fn.  Note that this calls get_users()
       * @param position
       */
      set_position(position){
         this.location = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
         }
         console.log('position', position)
         this.get_users({location: this.location});
      },

      request_position(){

         function error() {
            console.log('Unable to retrieve your location');
         }
         if(!navigator.geolocation) {
            this.test = 'Geolocation is not supported by your browser';
         } else {
            navigator.geolocation.getCurrentPosition(this.set_position, error);
         }
      },


      //search for a user

      search(){

         this.location = null;
         if (!this.$refs.form.validate()){
            return;
         }


         if (this.address == null  || this.address === ''){
            this.request_position();
         }
         else{
            this.get_users();
         }
      },




      async get_users({location}={}){

         let payload ={
            miles: Number(this.miles),
         }

         if (location){
            payload.location = location;
         }else {
            payload.address = this.address;
         }

         if (this.will_travel){
            payload.will_travel = true;
         }

         if (this.will_transport){
            payload.will_transport = true;
         }

         if (this.have_facility){
            payload.have_facility = true;
         }


         // payload.will_transport = this.will_transport;
         // payload.will_travel = this.will_travel;
         // payload.has_facility = this.has_facility;

         try{

            let data = await this.make_request('/public/getUsersByDistance', payload);

            this.trainers = data;
         }catch (e) {
            throw e;
         }
      },

      show_trainer(user_id){
         this.show_trainer_id = user_id;
         this.show_profile = true;
      }
   },

}
</script>

<style>
.v-dialog.find-trainer-dialog{
   max-height: 95%;
}

</style>

<style scoped>
@import url('profileTrainer/profile_common.css');













.content-container{
   display: flex;
   flex-direction: column;

   width: 100%;
   max-width: 700px;
}

.trainer-box{
   background-color: white;
   padding: 10px;
   margin-top: 10px;
   display: flex;
   cursor: pointer;
}

.trainer-info-container{

   padding-left: 10px;


}
</style>
