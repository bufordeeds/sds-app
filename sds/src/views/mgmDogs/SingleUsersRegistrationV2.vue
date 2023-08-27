<template>

   <div class="registration-container">

      <div class="reg-header">
         <!-- green plus icon-->
         <div style="width:20px; height: 20px; display: flex; justify-content: center; align-items: center; cursor: pointer"
              :style="{'background-color': expanded_loc?'var(--color-btn)':'var(--color-active)'}"
              @click="expanded_loc = !expanded_loc"
         >
            <!--                  <img src="../../assets/images/icons/add.svg" style="width: 70%">-->
            <v-icon color="white" v-if="expanded_loc">remove</v-icon>
            <v-icon color="white" v-else>add</v-icon>
         </div>


         <!-- name    ------>
         <div style="padding-left: 10px; color: var(--color-subheading); font-size: 12pt; font-weight: 500">
            {{user.name_first}} {{user.name_last}}
         </div>
         <v-spacer></v-spacer>

         <!-- status box----->
         <!--         <div style="width:100px; height: 25px; display: flex; justify-content: center; align-items: center; cursor: pointer; color:white;"-->
         <!--              :style="{'background-color': user.expanded?'var(&#45;&#45;color-primary)':'var(&#45;&#45;color-active)'}"-->
         <!--              @click="user.expanded = !user.expanded"-->
         <!--         >-->
         <!--            Active-->
         <!--         </div>-->

<!--         <div style="width: 150px">-->
<!--            <status-->
<!--                :compact="true"-->
<!--                v-model="user.membership_status"-->
<!--                list-type="user"-->
<!--                :disabled="true"-->
<!--            ></status>-->
<!--         </div>-->


         <v-btn icon>
            <v-icon>settings</v-icon>
         </v-btn>

      </div>





      <div class="reg-body" v-if="expanded_loc">

         <table style="width: 100%">
            <!--            <colgroup>-->
            <!--               <col span="1" style="width: 40%;">-->
            <!--               <col span="1" style="width: 30%;">-->
            <!--               <col span="1" style="width: 30%;">-->
            <!--            </colgroup>-->
            <tbody>
            <tr style="background-color: #b7dbf1">
               <th>Service Dog</th>
               <th>Registration Status</th>
               <th>Trainer</th>
               <th>Handler</th>

            </tr>

            <tr v-for="(item, ix) in dogs" :key="item._id + ix">

               <td class="col-service-dog">

                  <div class="sd-name-container">
                     <div style="cursor: pointer;"
                         @click="$emit('show-edit-dog', {user:user, dog:item})"
                     >
                        <avatar
                            :image="item.profile_image"
                            size="75"
                            profile-type="dog"
                            :rounded="true"
                        />
                        <div >
                           <v-btn text x-small>
                              <div style="font-size: 9pt; cursor: pointer;">
                                 Edit Info
                              </div>

                           </v-btn>

                        </div>
                     </div>


                     <div class="pl-2" style="align-self: flex-start; ">
                        <div style="font-weight: 600; font-size: 13pt">
                           {{item.name}}
                        </div>

                        <div style="width: 150px;" class="pt-2" >
                           <status v-model="item.status" @input="save_dog_status(item._id, $event)"></status>
                        </div>

                     </div>

                  </div>

               </td>

               <!-------------- status column ---------------------------------->
               <td  style=" padding-left: 10px; ">
                  <div >
                     Reg Number: {{item.dog_num}}
                  </div>

                  <div v-if="item.registration_kit == null">
                     <div>
                        Status: No Kit Purchased
                     </div>

                     <div style="display: flex; justify-content: center; padding-top: 5px;">
                        <v-btn @click="$emit('show-add-dog-cart', {dog: item})"
                            small color="var(--color-btn)" class="white--text">
                           Purchase Kit
                        </v-btn>
                     </div>

                  </div>
                  <div v-else>
                     Reg Expiration: {{fmt_date(item.registration_kit.kit_info.details.expiration)}}
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
                  <div v-if="item.trainer_id_FR==null">
                     <v-btn text  @click="$emit('show-add-trainer', { dog:item})">
                        Invite Trainer
                     </v-btn>
                  </div>

                  <!-- dog's trainer info -->
                  <div v-else style="display: flex">
                     <avatar
                         :image="item.trainer_id_FR.profile_image"
                         :rounded="true"
                         size="75"
                         size-no-image="50"
                     />

                     <div class="ml-4">
                        {{item.trainer_id_FR.name_first}} {{item.trainer_id_FR.name_last}} <br>
                        {{item.trainer_id_FR.email}}

                        <div v-if="item.confirmed_trainer===false" style="font-size: 10pt">
                           Waiting on user
                        </div>
                     </div>

                  </div>


               </td>



               <!-------------- handler column ---------------------------------->
               <td class="col-service-do-reg">


                  <!-- if dog has no handler -->
                  <div v-if="item.handler_id_FR==null">
                     <v-btn @click="$emit('show-add-handler', { dog:item})" text>
                        Invite Handler
                     </v-btn>
                  </div>

                  <!-- dog's handler's info -->
                  <div v-else style="display: flex">
                     <avatar
                         :image="item.handler_id_FR.profile_image"
                         :rounded="true"
                         size="75"
                         size-no-image="50"
                     />

                     <div class="ml-4">
                        {{item.handler_id_FR.name_first}} {{item.handler_id_FR.name_last}} <br>
                        {{item.handler_id_FR.email}}
                     </div>

                  </div>


               </td>


            </tr>

            </tbody>

         </table>
         <div style="display:flex; justify-content: flex-end; align-items: center" class="pa-2" v-if="showAddDogs">

               <span class="pr-2 pt-1" >
                  Add Service Dog
               </span>
            <v-btn rounded small color="var(--color-btn)" @click="$emit('show-add-dog')"> <v-icon color="white">add</v-icon></v-btn>
         </div>

      </div>

   </div>



</template>

<script>


import data_getters from "@/mixins/data_getters";
import status from '@/components/inputs/StatusDropDown';

import avatar from "@/components/app/avatar";
import {DateTime} from 'luxon';


export default {
   name: "SingleUsersRegistrationV2",
   components: {status, avatar },
   mixins: [data_getters],
   props: {
      user: Object,
      dogs: Array,
      expanded: {type: Boolean, default: true},
      showAddDogs: {type: Boolean, default: false}, //controls if button to add dogs is shown
   },
   data () {
      return {
         show_add_dog: false, //controls if add dog modal is shown

         expanded_loc: this.expanded,




      }
   },

   methods:{

      fmt_date(d){

         let ans = DateTime.fromISO(d).toLocaleString();
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

      edit_user_access(type, dog){

      }



   },


}
</script>

<style scoped>
@import url('../mgmProfile/mgm_common.css');

.registration-container{
   background-color: white;
   width: 100%;
   max-width: 90%;

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
   color: var(--color-subheading)
}




</style>

