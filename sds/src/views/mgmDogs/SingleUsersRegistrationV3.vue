<template>
  <div
    class="registration-container"
    :style="container_style"
  >
    <div class="reg-header">
      <!-- green plus icon-->
      <div
        style="width:20px; height: 20px; display: flex; justify-content: center; align-items: center; cursor: pointer"
        :style="{'background-color': expanded_loc?'var(--color-btn)':'var(--color-active)'}"
        @click="expanded_loc = !expanded_loc"
      >
        <!--                  <img src="../../assets/images/icons/add.svg" style="width: 70%">-->
        <v-icon
          v-if="expanded_loc"
          color="white"
        >
          remove
        </v-icon>
        <v-icon
          v-else
          color="white"
        >
          add
        </v-icon>
      </div>


      <!-- name    ------>

      <div style="padding-left: 10px; color: var(--color-subheading); font-size: 12pt; font-weight: 500">
        {{ user.name_first }} {{ user.name_last }}
      </div>
      <v-spacer />
    </div>





    <div
      v-if="expanded_loc"
      class="reg-body"
    >
      <!--------full sized table-------------------------------------------------------------------------->
      <table
        v-if="!isMobile"
        style="width: 100%"
      >
        <tbody>
          <tr style="background-color: #b7dbf1">
            <th>Service Dog Team</th>
            <th>Membership</th>
            <th>Trainer</th>
            <th>Status</th>
          </tr>

          <tr
            v-for="(item, ix) in dogs"
            :key="item._id + ix"
          >
            <!--------- service dog team col ---------------->
            <td
              class="col-service-dog"
              style="display: flex; justify-content: center;"
            >
              <!-- container for dog/handler -->
              <div style="display: flex; justify-content: space-evenly; width: 100%">
                <!--container for dog -->
                <div
                  style="display: flex; flex-direction: column; align-items: center; cursor: pointer;"
                  @click="$emit('show-edit-dog', {user:user, dog:item})"
                >
                  <avatar
                    :image="item.profile_image"
                    size="50"
                    profile-type="dog"
                    :rounded="true"
                  />

                  <div style="font-weight: 600; font-size: 13pt">
                    {{ item.name }}
                  </div>

                  <v-btn
                    text
                    x-small
                    style="padding-top: 0px"
                  >
                    <div style="font-size: 9pt; cursor: pointer;">
                      Edit
                    </div>
                  </v-btn>
                </div>



                <!--container for handler -->
                <div style="height: 100%">
                  <!-- if dog has no handler -->
                  <div
                    v-if="item.handler_id_FR==null"
                    style="height: 100%; display:flex; flex-direction: column; justify-content: center; align-items: center"
                  >
                    <div class="pb-3">
                      No Handler
                    </div>
                    <v-btn
                      small
                      @click="$emit('show-add-handler', { dog:item})"
                    >
                      Invite Handler
                    </v-btn>
                  </div>

                  <!--  handler's info -->
                  <div
                    v-else
                    style="display: flex; flex-direction: column; align-items: center"
                  >
                    <avatar
                      :image="item.handler_id_FR.profile_image"
                      :rounded="true"
                      size="50"
                    />

                    <div>
                      {{ get_name_user(item.handler_id_FR, {nullVal: '- -'}) }}
                    </div>


                    <!--<div v-if="myDogs">-->
                    <!--   <v-btn  x-small >-->
                    <!--      Edit-->
                    <!--   </v-btn>-->
                    <!--</div>-->

                    <v-btn
                      v-if="myDogs && isHandler"
                      text
                      x-small
                      style="padding-top: 0px"
                      to="/manageProfile"
                    >
                      <div style="font-size: 9pt; cursor: pointer;">
                        Edit
                      </div>
                    </v-btn>
                    <div
                      v-else
                      style="font-size: 9pt; "
                    >
                      {{ item.handler_id_FR.email }}
                    </div>

                    <div
                      v-if="item.confirmed_handler === false"
                      style="font-size: 9pt; "
                    >
                      Waiting on handler to accept
                    </div>
                  </div>
                </div>
              </div>
            </td>

            <!-------------- membership column ---------------------------------->
            <td style=" padding-left: 10px; ">
              <div>
                <router-link
                  v-if="isHandler"
                  :to="'/team/'+item.dog_num"
                >
                  <span
                    class="dog-row-header2"
                    style="font-size: 13pt"
                  >SDS-{{ item.dog_num }}</span>
                </router-link>

                <span
                  v-else
                  class="dog-row-header2"
                  style="font-size: 13pt"
                >SDS-{{ item.dog_num }}</span>
              </div>



              <div v-if="item.registration_kit == null">
                <div v-if="item.handler_id_FR">
                  <span style="font-size: 12pt; font-weight: 600; color: gray">
                    Exp. {{ fmt_date(item.handler_id_FR.account_status.date_expiry) }}
                  </span>
                </div>


                <div style="display: flex; justify-content: center; padding-top: 10px;">
                  <v-btn
                    v-if="item.handler_id!=null && item.confirmed_handler !== false"
                    small
                    color="var(--color-btn)"
                    class="white--text"
                    @click="$emit('show-add-dog-cart', {dog: item})"
                  >
                    Order Kit
                  </v-btn>
                </div>
              </div>
              <div v-else>
                <span style="font-size: 12pt; font-weight: 600; color: gray">
                  Exp. {{ fmt_date(item.registration_kit.kit_info.details.expiration) }}
                </span>


                <div style="display: flex; justify-content: center; padding-top: 10px;">
                  <v-btn
                    small
                    color="var(--color-btn)"
                    class="white--text"
                    @click="$emit('show-add-dog-cart', {dog: item})"
                  >
                    Reorder Items
                  </v-btn>
                </div>
              </div>
            </td>

            <!--               <td class="col-service-dog-status" style="max-width: 200px">-->
            <!--                  <div style="max-width: 150px; margin-left: 10px">-->
            <!--                     <status v-model="item.status" @input="save_dog_status(item._id, $event)"></status>-->
            <!--                  </div>-->
            <!--               </td>-->






            <!-------------- trainer column ---------------------------------->
            <td class="col-service-do-reg">
              <!-- if dog has no trainer -->
              <div style="display: flex; justify-content: center">
                <div v-if="item.trainer_id_FR==null">
                  <v-btn
                    small
                    @click="$emit('show-add-trainer', { dog:item})"
                  >
                    Invite Trainer
                  </v-btn>
                </div>

                <!-- dog's trainer info -->
                <div
                  v-else
                  style="display: flex"
                >
                  <avatar
                    :image="item.trainer_id_FR.profile_image"
                    :rounded="true"
                    size="75"
                    size-no-image="50"
                  />

                  <div class="ml-4">
                    {{ item.trainer_id_FR.name_first }} {{ item.trainer_id_FR.name_last }} <br>
                    {{ item.trainer_id_FR.email }}

                    <div
                      v-if="item.confirmed_trainer===false"
                      style="font-size: 10pt"
                    >
                      Waiting on user
                    </div>
                    <!--<div v-else>-->
                    <!--   <v-btn small text>-->
                    <!--      Edit-->
                    <!--   </v-btn>-->
                    <!--</div>-->
                  </div>
                </div>
              </div>
            </td>



            <!-------------- status column ---------------------------------->
            <td class="col-service-do-reg">
              <div
                style="display: flex; justify-content: center"
                class="pt-2"
              >
                <status
                  v-model="item.status"
                  style="width: 180px;"
                  @input="save_dog_status(item._id, $event)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>



      <!------------------------------------------------------------------------------------------------------------>
      <!-------------------------------- mobile table -------------------------------------------------------------->
      <!------------------------------------------------------------------------------------------------------------>
      <div v-else>
        <div
          v-if="myDogs"
          style="display: flex; justify-content: center"
          class="mb-3"
        >
          <avatar
            :image="user.profile_image"
            size="85"
            profile-type="user"
            :rounded="true"
          />

          <div class="ml-4">
            <div
              class="dog-row-header"
              style=" margin-bottom: 15px; margin-top: 10px"
            >
              <!--{{$auth.profile.name_first}}-->
              <v-btn
                to="/manageProfile"
              >
                Update Info
              </v-btn>
            </div>
          </div>
        </div>











        <div
          v-for="(item, ix) in dogs"
          :key="item._id + ix"
          class="dog-row "
        >
          <!------------- dog section ----------------->
          <div class="dog-row-section">
            <div style="display: flex; flex-wrap: wrap; justify-content: center">
              <div style="display: flex; flex-direction: column; align-items: center">
                <avatar
                  :image="item.profile_image"
                  size="85"
                  profile-type="dog"
                  :rounded="true"
                />

                <v-btn
                  text
                  x-small
                  style="padding-top: 0px"
                  @click="$emit('show-edit-dog', {user:user, dog:item})"
                >
                  <div style="font-size: 9pt; cursor: pointer;">
                    Edit
                  </div>
                </v-btn>
              </div>

              <div class="ml-4">
                <div
                  class="dog-row-header"
                  style=" margin-bottom: 15px; margin-top: 10px; "
                >
                  {{ item.name }}
                </div>
                <status
                  v-if="$vuetify.breakpoint.width > 400"
                  v-model="item.status"
                  style="width: 190px; max-width: 80%"
                  @input="save_dog_status(item._id, $event)"
                />
              </div>
            </div>

            <status
              v-if="$vuetify.breakpoint.width <= 400"
              v-model="item.status"
              style="width: 190px; max-width: 80%; margin-top: 10px"
              @input="save_dog_status(item._id, $event)"
            />
          </div>




          <!------------membership section------------>
          <div class="dog-row-section">
            <div style="text-align: center;">
              <span class="dog-row-header">Membership </span>
              <router-link
                v-if="isHandler"
                :to="'/team/'+item.dog_num"
              >
                <span class="dog-row-header2">SDS-{{ item.dog_num }}</span>
              </router-link>
              <span
                v-else
                class="dog-row-header2"
              >SDS-{{ item.dog_num }}</span>
            </div>


            <div
              v-if="item.registration_kit == null"
              style="font-size: 14pt; font-weight: 600; color: gray"
            >
              <div v-if="item.handler_id_FR">
                Exp. {{ fmt_date(item.handler_id_FR.account_status.date_expiry) }}
              </div>
            </div>
            <div
              v-else
              style="font-size: 14pt; font-weight: 600; color: gray"
            >
              Exp. {{ fmt_date(item.registration_kit.kit_info.details.expiration) }}
            </div>
          </div>




          <!------------handler section------------>
          <div
            v-if="$auth.profile.user_id !== item.handler_id"
            class="dog-row-section"
          >
            <template v-if="item.handler_id_FR == null">
              <div class="dog-row-header">
                Handler
              </div>


              <div class="large-grey-txt">
                No Handler
              </div>

              <div>
                <v-btn
                  text
                  color="var(--color-btn)"
                  @click="$emit('show-add-handler', { dog:item})"
                >
                  <span style="font-size:14pt">
                    Invite
                  </span>
                </v-btn>
              </div>
            </template>

            <template v-else>
              <div style="display: flex">
                <avatar
                  :image="item.handler_id_FR.profile_image"
                  :rounded="true"
                  size="75"
                  size-no-image="50"
                />

                <div class="ml-4">
                  <div
                    class="dog-row-header"
                    style="margin-top: 5px;"
                  >
                    Handler
                  </div>
                  <span class="dog-row-header2">
                    {{ item.handler_id_FR.name_first }} {{ item.handler_id_FR.name_last }}
                  </span>

                  <!--{{item.trainer_id_FR.email}}-->

                  <div
                    v-if="item.confirmed_trainer===false"
                    style="font-size: 10pt"
                  >
                    Waiting on user
                  </div>
                </div>
              </div>
            </template>
          </div>




          <!------------trainer section------------>
          <div class="dog-row-section">
            <template v-if="item.trainer_id == null">
              <div class="dog-row-header">
                Trainer
              </div>

              <div class="large-grey-txt">
                Owner Trained
              </div>
              <div>
                <v-btn
                  text
                  color="var(--color-btn)"
                  @click="$emit('show-add-trainer', { dog:item})"
                >
                  <span style="font-size:14pt">
                    Update
                  </span>
                </v-btn>
              </div>
            </template>

            <template v-else>
              <div style="display: flex">
                <avatar
                  :image="item.trainer_id_FR.profile_image"
                  :rounded="true"
                  size="75"
                  size-no-image="50"
                />

                <div class="ml-4">
                  <div
                    class="dog-row-header"
                    style="margin-top: 5px;"
                  >
                    Trainer
                  </div>
                  <span class="dog-row-header2">
                    {{ item.trainer_id_FR.name_first }} {{ item.trainer_id_FR.name_last }}
                  </span>

                  <!--{{item.trainer_id_FR.email}}-->

                  <div
                    v-if="item.confirmed_trainer===false"
                    style="font-size: 10pt"
                  >
                    Waiting on user
                  </div>
                </div>
              </div>
            </template>
          </div>





          <!------------buttons section------------>
          <div class="dog-row-section">
            <div style="display: flex; justify-content: center; width: 100%; max-width: 400px; flex-wrap: wrap">
              <v-btn
                class="ml-2 mr-2 mt-3"
                to="/accountHome"
                width="170px"
              >
                Renew Agreement
              </v-btn>


              <div class="ml-2 mr-2 mt-3">
                <v-btn
                  v-if="item.registration_kit == null"
                  color="#8fc64b"
                  class="white--text"
                  width="170px"
                  @click="$emit('show-add-dog-cart', {dog: item})"
                >
                  Order Items
                </v-btn>


                <v-btn
                  v-else
                  color="#8fc64b"
                  class="white--text"
                  width="170px"
                  @click="$emit('show-add-dog-cart', {dog: item})"
                >
                  Reorder Items
                </v-btn>
              </div>
            </div>
          </div>
        </div> <!--end or row-->
      </div> <!--end of mobile table-->











      <div
        v-if="showAddDogs"
        style="display:flex; justify-content: flex-end; align-items: center"
        class="pa-2"
      >
        <span class="pr-2 pt-1">
          Add Service Dog
        </span>
        <v-btn
          rounded
          small
          color="var(--color-btn)"
          @click="$emit('show-add-dog')"
        >
          <v-icon color="white">
            add
          </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>


import data_getters from "@/mixins/data_getters";
import status from '@/components/inputs/StatusDropDown';

import avatar from "@/components/app/avatar";
import {DateTime} from 'luxon';
import utilities from "@/mixins/utilities";
import _ from "lodash";


export default {
   name: "SingleUsersRegistrationV3",
   components: {status, avatar },
   mixins: [data_getters, utilities],
   props: {
      user: Object,
      dogs: Array,
      isHandler: {type: Boolean}, //use to indicate if this is

      expanded: {type: Boolean, default: true},
      showAddDogs: {type: Boolean, default: false}, //controls if button to add dogs is shown
      myDogs: {type: Boolean, default: false}, //controls if user's image is shown in mobile mode


   },
   data () {
      return {
         show_add_dog: false, //controls if add dog modal is shown
         expanded_loc: this.expanded,
      }
   },

  computed:{
    isMobile(){
      //todo: figure out bug when we dynamically resize screen
      // return this.$vuetify.breakpoint.width < 800;
      return true;
    },

     container_style(){
       if (this.isMobile){
          return 'padding: 10px; border-radius: 5px; border: 1px solid #d2d1d1'
       }
       return '';
     }
  },

   watch: {

      expanded(newVal){
         if (newVal !== this.expanded_loc){
            this.expanded_loc = newVal;
         }
      },

      expanded_loc(newVal){
         console.log('expanded')
         this.$emit('update:expanded', newVal);
      }
   },

   methods:{

      fmt_date(d){

         // let ans = DateTime.fromISO(d).toLocaleString();
         // let ans = DateTime.fromISO(d).toFormat('LLLL, d yyyy');
         let ans = DateTime.fromISO(d).toFormat('LL/dd/yyyy');
         return ans;
      },




      //saves a dogs status in realtime as user changes
      /**
       *
       * @param ix  index of this dog in the dogs array
       * @returns {Promise<void>}
       */
      async save_dog_status(dog_id, status){

         try{

            let payload = {
               user_id: this.user._id,
               dog: {
                  _id: dog_id,
                  status,
               },
            }
            await this.make_request('/private/updateDog', payload);
         }catch(e){
            throw e;
         }
      },

      // edit_user_access(type, dog){
      //
      // }



   },


}
</script>

<style scoped>
@import url('../mgmProfile/mgm_common.css');

.registration-container{
   background-color: white;
   width: 100%;


}

.reg-header{
   display: flex;
   justify-content: flex-start;
   align-items: center;
   padding:6px;

   /*height: 30px;*/
   /*border: solid 2px red;*/
}

.reg-body{

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

.sd-name-container{
   display: flex;
   align-items: center;

}


.col-service-do-reg{
   font-size: 12pt;
   font-weight: 500;
   color: var(--color-subheading);

    /*display: flex;*/
}


th{
    text-align: center;
}

td{
    text-align: center;
}


/****** stuff for mobile version of table****************/

.dog-row{
  /*padding: 5px 10px 5px 10px;*/
  margin-bottom: 30px;
  margin-left: 5px;
  margin-right: 5px;
    border-radius: 5px;
    border: 1px solid #d2d1d1;
}

.dog-row-section{
    background-color: #e7f3fb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 2px;
    padding-right: 10px;
    padding-left: 10px;
}

.dog-row-section:last-child{
    margin-bottom: 0;
}

/*.dog-row:nth-child(odd) {background-color: #e7f3fb;}*/
/*.dog-row:nth-child(even) {background-color: #f7fbfd;}*/

.dog-row-header {
  margin-top: 20px;
  font-size: 18pt;
  font-weight: 600;
    color: #054f86;
}


.dog-row-header2 {
    margin-top: 20px;
    font-size: 18pt;
    font-weight: 600;
    color: #519dd3;
}

.large-grey-txt{
    font-size: 14pt;
    font-weight: 600;
    color: gray;
}



</style>

