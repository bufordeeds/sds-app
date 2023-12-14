<template>
  <div>
    <div class="content-container-bg">
      <div class="profile-container">
        <!---------------------- top header box ------------------------------------------------------------------->
        <div class="header-container">
          <div class="edit-box">
            <v-btn
              v-if="edit_mode"
              color="var(--color-headline)"
              text
              @click="$emit('edit-basic')"
            >
              <i class="material-icons ">create</i>
              Edit
            </v-btn>
          </div>
          <div class="profile-image">
            <v-avatar size="100">
              <img
                v-if="!user.profile_image"
                src="../../assets/images/content/user-no-image.png"
                width="75px"
              >
              <img
                v-else
                :src="user.profile_image.Location"
                width="75px"
              >
            </v-avatar>



            <div
              v-if="edit_mode"
              style="text-align: center; color: var(--color-subheading); font-size: 10pt"
              class="mt-1"
              @click="$emit('edit-profile-pic')"
            >
              <v-btn
                v-if="edit_mode"
                text
                small
                color="var(--color-subheading)"
                style="margin-top: -10px"
              >
                <i class="material-icons section-edit-icon">create</i>
                Edit
              </v-btn>
            </div>
          </div>

          <div class="trainer-info">
            <div v-if="isTrainer">
              <span
                style="color: var(--color-headline); font-size: 14pt; font-weight: 500;"
                class="mb-1"
              >
                {{ user.name_first }} {{ user.name_last }}
              </span>   Trainer (Individual)
            </div>

            <div v-else>
              <div
                style="color: var(--color-headline); font-size: 14pt; font-weight: 500;"
                class="mb-1"
              >
                {{ user.name_first }} {{ user.name_last }}
              </div>
              <div
                style="color: var(--color-headline); font-size: 12pt; font-weight: 400;"
                class="mb-1"
              >
                <span v-if="isHandler">
                  Handler
                </span>

                <span v-if="isAide">
                  Aide
                </span>
              </div>
            </div>


            <div style="font-size:20pt; color: var(--color-headline); font-weight: 700; ">
              {{ public_info.business_name }}
            </div>
            <div style="font-size:14pt; color: var(--color-headline); font-weight: 600; ">
              {{ public_info.tagline }}
            </div>
          </div>

          <v-spacer />
          <div class="city-state">
            {{ address.city }}, {{ address.state }}
          </div>
        </div>



        <!---------------------- banner photo ------------------------------------------------------------------->

        <div
          class="banner-photo"
          :style="banner_style"
        >
          <div
            v-if="edit_mode"
            class="banner-photo-controls"
          >
            <v-btn
              text
              class="white--text mr-4"
              @click="$emit('upload-banner', user.account_type)"
            >
              <img
                src="../../assets/images/icons/camera-white.png"
                height="20px"
                class="pr-1"
              >
              Customize Photo
            </v-btn>
          </div>

          <img
            v-if="banner_src"
            :src="banner_src"
            width="100%"
            style="max-height: 400px; display:block;"
          >
        </div>





        <!---------------------- box containing basic contact info ------------------------------------------------>
        <div
          v-if="isTrainer"
          class="contact-container"
        >
          <div class="contact-column">
            <div class="contact-header">
              Location
            </div>

            <div style="font-weight: 500;">
              <a
                :href="google_link"
                target="_blank"
              >
                {{ address.street1 }} <br>
                {{ address.city }}, {{ address.state }}, {{ address.zip }}
              </a>
            </div>


            <div class="mt-1">
              Hours: {{ public_info.hours_str }}
            </div>
          </div>

          <div class="contact-column">
            <div class="contact-header">
              Contact
            </div>


            <div class="mt-1">
              <button class="click-to-call">
                Phone: <span class="contact-value"> {{ user.phone }}</span>
              </button>
            </div>

            <div class="mt-2">
              Email: <span class="contact-value"> {{ user.email }}</span> <br>
            </div>

            <div class="mt-1">
              Web:
              <a
                :href="public_info.website"
                target="_blank"
              >
                <span class="contact-value">{{ public_info.website }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>




      <div class="pt-3" />

      <!----------------------------two column layout for sub sections---------------------------------------------->
      <div class="profile-container-sections">
        <!--  two column layout-->



        <!----------------------------column one------------------------------------->
        <div class="column">
          <!------------ About section --------------->
          <info-section
            class="mt-3"
            :user="user"
            color="#8dc63f"
          >
            <template #icon>
              <img
                src="../../assets/images/icons/information-button.svg"
                width="40%"
              >
              About
            </template>

            <template #content>
              <div style="white-space: pre-line;">
                {{ public_info.about }}
              </div>
            </template>
          </info-section>

          <div
            v-if="edit_mode"
            class="section-edit-container"
          >
            <v-spacer />
            <v-btn
              text
              small
              color="blue"
              @click="$emit('edit-section', 'about')"
            >
              <i class="material-icons section-edit-icon">create</i>
              Edit
            </v-btn>
            <!--                  <v-btn text small color="blue">delete</v-btn>-->
          </div>



          <!------------ training services section --------------->
          <div v-if="isTrainer">
            <info-section
              class="mt-3"
              :user="user"
              color="#bf1e2e"
              :items="list_services"
            >
              <template #icon>
                <img
                  src="../../assets/images/icons/cross_white.png"
                  width="50%"
                >
                Training<br>Offered
              </template>

              <template #content>
                <div class="section-header">
                  Types of Service Dogs we Train
                </div>
              </template>
            </info-section>

            <div
              v-if="edit_mode"
              class="section-edit-container"
            >
              <v-spacer />
              <v-btn
                text
                small
                color="blue"
                @click="$emit('edit-section', 'services')"
              >
                <i class="material-icons section-edit-icon">create</i>
                Edit
              </v-btn>
            </div>
          </div>


          <!------------ Certifications section --------------->
          <div v-if="isTrainer">
            <info-section
              class="mt-3"
              :user="user"
              :items="list_certs"
              color="#5fafe1"
            >
              <template #icon>
                <img
                  src="../../assets/images/icons/star.png"
                  width="50%"
                >
                Training and<br>Certifications
              </template>
            </info-section>

            <div
              v-if="edit_mode"
              class="section-edit-container"
            >
              <v-spacer />
              <v-btn
                text
                small
                color="blue"
                @click="$emit('edit-section', 'certifications')"
              >
                <i class="material-icons section-edit-icon">create</i>
                Edit
              </v-btn>
            </div>
          </div>




          <!------------ Awards section --------------->
          <div v-if="isTrainer">
            <info-section
              class="mt-3"
              :user="user"
              :items="list_awards"
              color="#fcb040"
            >
              <template #icon>
                <img
                  src="../../assets/images/icons/trophy.png"
                  width="50%"
                >
                Awards and<br>Honors
              </template>
            </info-section>

            <div
              v-if="edit_mode"
              class="section-edit-container"
            >
              <v-spacer />
              <v-btn
                text
                small
                color="blue"
                @click="$emit('edit-section', 'awards')"
              >
                <i class="material-icons section-edit-icon">create</i>
                Edit
              </v-btn>
            </div>
          </div>



          <!------------ Breeds section --------------->
          <div v-if="isTrainer">
            <info-section
              class="mt-3"
              :user="user"
              :items="list_breeds"
              color="#9c867a"
            >
              <template #icon>
                <img
                  src="../../assets/images/icons/paw.png"
                  width="50%"
                >
                Breeds
              </template>

              <template #content>
                <div class="section-header">
                  We specialize in
                </div>
              </template>
            </info-section>

            <div
              v-if="edit_mode"
              class="section-edit-container"
            >
              <v-spacer />
              <v-btn
                text
                small
                color="blue"
                @click="$emit('edit-section', 'breeds')"
              >
                <i class="material-icons section-edit-icon">create</i>
                Edit
              </v-btn>
            </div>
          </div>
        </div>


        <!-- spacer between cols-->
        <div class="pl-5" />


        <!----------------------------column two----------------------------------->
        <div class="column">
          <!--               <groups :user="user"></groups>-->


          <!------------gallery section ---------------->
          <gallery
            class="mt-3"
            :user_id="user._id"
            :edit_mode="edit_mode"
          />


          <div
            v-if="edit_mode"
            class="section-edit-container"
          >
            <v-spacer />
            <v-btn
              text
              small
              color="blue"
              @click="$emit('edit-gallery', )"
            >
              <i class="material-icons section-edit-icon">create</i>
              Add Images
            </v-btn>
          </div>


          <!------------ Groups section --------------->
          <div v-if="isTrainer">
            <info-section
              class="mt-3"
              :user="user"
              :items="list_groups"
              color="#f05fa3"
            >
              <template #icon>
                <img
                  src="../../assets/images/icons/globe.png"
                  width="50%"
                >
                Groups and<br>Associations
              </template>
            </info-section>

            <div
              v-if="edit_mode"
              class="section-edit-container"
            >
              <v-spacer />
              <v-btn
                text
                small
                color="blue"
                @click="$emit('edit-section', 'groups')"
              >
                <i class="material-icons section-edit-icon">create</i>
                Edit
              </v-btn>
            </div>
          </div>



          <!------------ social section --------------->
          <info-section
            class="mt-3"
            :user="user"
            :items="list_social"
            color="#662d91"
          >
            <template #icon>
              <img
                src="../../assets/images/icons/group.png"
                width="50%"
              >
              Social Center
            </template>

            <template #content>
              <div class="section-header">
                Friend, find, or follow us!
              </div>
            </template>
          </info-section>

          <div
            v-if="edit_mode"
            class="section-edit-container"
          >
            <v-spacer />
            <v-btn
              text
              small
              color="blue"
              @click="$emit('edit-section', 'social')"
            >
              <i class="material-icons section-edit-icon">create</i>
              Edit
            </v-btn>
          </div>


          <!--               <social :user="user"></social>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";


import infoSection from "@/views/profileTrainer/infoSection";
// import trainingOffered from "@/views/profileTrainer/secServices";
// import awards from "@/views/profileTrainer/secAwards";
// import breeds from "@/views/profileTrainer/secBreeds";
// import certificates from "@/views/profileTrainer/secCertificates";
// import groups from "@/views/profileTrainer/secGroups";
// import social from "@/views/profileTrainer/social";
import Gallery from "@/components/images/Gallery";

import _ from 'lodash';

export default {
   name: "UserProfile",
   components: {infoSection, Gallery,
      // about, trainingOffered, awards, breeds, certificates, groups, social
   },
   mixins: [data_getters],
   props: {
      user_id: String,
      user_obj: {type: Object, default: ()=> {return {address:{}, public_info:{address:{}}} }  },
   },
   data(){
      return {
         user: this.user_obj,
         dogs: [],
      }
   },

   computed:{

      isTrainer(){
         return _.get(this.user, 'account_type', null) === 'TRAINER';
      },

      isHandler(){
         return _.get(this.user, 'account_type', null) === 'HANDLER';
      },

      isAide(){
         return _.get(this.user, 'account_type', null) === 'AIDE';
      },

      public_info(){

         if (this.isTrainer){
            return _.get(this.user, 'trainer_info', null);
         }

         if (this.isHandler){
            return _.get(this.user, 'handler_info', null);
         }

         if (this.isAide){
            return _.get(this.user, 'aide_info', null);
         }



         return {};
      },

      address(){

         console.log('debug')

         if (_.get(this.public_info, 'address', undefined) !== undefined){
            return this.public_info.address;
         }

         return {};
      },

      google_link(){
         let link =  'https://www.google.com/maps/place/';

         let addr = `${this.address.street1}, ${this.address.city}, ${this.address.state} ${this.address.zip}`;
         addr = addr.replace(/ /g, '+');
         return link + addr;
      },



      list_services(){
         return _.get(this.public_info, 'services', []);
      },

      list_certs(){
         return _.get(this.public_info, 'certifications', []);
      },


      list_awards(){
         return _.get(this.public_info, 'awards', []);
      },

      list_breeds(){
         return _.get(this.public_info, 'breeds', []);
      },

      list_groups(){
         return _.get(this.public_info, 'groups', []);
      },

      list_social(){
         return _.get(this.public_info, 'social', []);

      },


      edit_mode(){
         let ans = false;

         if (this.$auth.isAuthenticated() && this.$auth.profile.user_id === this.user._id && this.$route.name === 'ManageProfile'){
            ans = true;
         }

         return ans;
      },

      banner_src(){

         let ans = null;
         if (this.user){
            let source = _.get(this.public_info, 'banner_image.Location', null);
            if (source){
               // ans = 'background-image:'+ `url(${source})`
               ans = source;
            }
         }
         return ans;
      },

      banner_style(){
         let ans = 'height: 400px';
         if (this.user){
            let source = _.get(this.public_info, 'banner_image.Location', null);
            if (source){
               ans = `height: 100%`;

            }
         }
         return ans;
      }
   },

   watch:{
      user_id(newVal, oldVal){

         if (newVal !== oldVal && newVal != null){
            this.get_profile();
         }

      }
   },
   created(){

      this.get_profile();
   },

   methods: {
      async get_profile(){
         try{
            let user_id;

            console.log('debug')
            if (this.$route.params.user_id){
               user_id = this.$route.params.user_id;
            }
            else{
               user_id = this.user_id;
            }

            if (user_id == null){
               return ;
            }

            let res = await this.make_request('/public/getUserProfile', {user_id});
            this.user = res.user;
            this.dogs = res.dogs;
            console.log(user_id)
         }catch (e) {
            throw e;
         }
      },
   }
}
</script>

<style scoped>
@import url('./profile_common.css');


/*main container*/

.profile-container{
   background-color: white;
   width: 1000px;
}




/********** user header box ********************/
.header-container{
   display: flex;
   padding: 30px 20px 20px 20px;
   flex-wrap: wrap;

}

.trainer-info{
   margin-left: 10px;
   display: flex;
   flex-direction: column;
   justify-content: center
}

.city-state{
   margin-left: 30px;
   font-size:12pt;
   color: var(--color-headline);
   font-weight: 500;

   display: flex;
   align-items: center;

}



/*edit button container*/
.edit-box{
   width: 100%; text-align: right;
}


/* ************* banner photo **********************/
.banner-photo{

   position: relative;
   height: 100%;
   background-image: linear-gradient(to top right, #71be47, #60b0df);

   background-size: contain;
   /*background-position: center;*/

   min-height: 100px;
}

.banner-photo-controls{
   color: white;
   width: 100%;
   padding: 15px;
   position: absolute;

   display: flex;
   justify-content: flex-end;
   align-items: center;
}

/* ************* contact info box **********************/
.contact-container{
   display: flex;
   padding: 20px 20px 20px 20px;
   justify-content-content: stretch;
   flex-wrap: wrap;

}

.contact-column{
   flex-grow: 1;
}

.contact-header{
   color: var(--color-heading-grey);
   font-size: 14pt;
   font-weight: 500;
}
.contact-value{
   color: var(--color-headline);
   font-weight: 500;
}

.click-to-call{
   padding: 5px 10px 5px 10px;
   border: solid 1px #b3b3b3;
   border-radius: 5px !important;
}


/* **********************two column section *******************/


/*  related to edit row below sections*/
.section-edit-container{
   margin-top: -30px;
   margin-bottom: 10px;
   display: flex;
   justify-content: flex-end;
}

.section-edit-icon{
   font-size:10pt;
   margin-right: 3px;
}



/* column container stuff*/
.profile-container-sections{
   width: 1000px;
   display: flex;

}

.column{
   display:flex;
   flex-direction: column;

   width: 50%;
}


/*related to individual sections*/

.section-header{
   font-size: 14pt;
   font-weight: 600;
   padding-bottom: 10px;
}
</style>
