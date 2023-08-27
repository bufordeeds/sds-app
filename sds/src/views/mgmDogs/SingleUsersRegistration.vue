<template>
   <div class="registration-container">

      <div class="reg-header">
         <!-- green plus icon-->
         <div style="width:20px; height: 20px; display: flex; justify-content: center; align-items: center; cursor: pointer"
              :style="{'background-color': expanded_loc?'var(--color-primary)':'var(--color-active)'}"
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

         <div style="width: 150px">
            <status
                :compact="true"
                v-model="user.account_visibility"
                list-type="user"
                :disabled="true"
            ></status>
         </div>


         <v-btn icon>
            <v-icon>settings</v-icon>
         </v-btn>

      </div>





      <div class="reg-body" v-if="expanded_loc">

         <table style="width: 100%">
            <colgroup>
               <col span="1" style="width: 40%;">
               <col span="1" style="width: 30%;">
               <col span="1" style="width: 30%;">
            </colgroup>
            <tbody>
            <tr style="background-color: #b7dbf1">
               <th>Service Dog</th>
               <th>Registration</th>
               <th>Working Status</th>
            </tr>

            <tr v-for="(item, ix) in dogs" :key="item._id">

               <td class="col-service-dog">

                  <div class="sd-name-container">
                     <img v-if="!item.profile_image"
                          src="../../assets/images/content/dog-no-image.png" width="75px">
                     <img v-else
                          :src="item.profile_image.Location" width="75px">

                     <div class="pl-2">
                        <div>
                           {{item.name}}
                        </div>
                        <div style="font-size: 10pt; cursor: pointer;" @click="$emit('show-edit-dog', {user:user, dog:item})">
                           Edit
                        </div>
                     </div>

                  </div>

               </td>

               <td class="col-service-do-reg">
                  {{item.dog_num}}
               </td>

               <td class="col-service-dog-status" style="max-width: 200px">
                  <!--                  {{item.status}}-->
                  <div style="max-width: 150px; margin-left: 10px">
                     <status v-model="item.status" @input="save_dog_status(item._id, $event)"></status>
                  </div>

               </td>
            </tr>

            </tbody>

         </table>
         <div style="display:flex; justify-content: flex-end; align-items: center" class="pa-2">

                  <span class="pr-2 pt-1">
                     Add Service Dog
                  </span>
            <v-btn rounded small color="var(--color-primary)" @click="$emit('show-add-dog')"> <v-icon color="white">add</v-icon></v-btn>
         </div>

      </div>

   </div>
</template>

<script>


import data_getters from "@/mixins/data_getters";
import status from '@/components/inputs/StatusDropDown';

export default {
   name: "SingleUsersRegistration",
   components: {status},
   mixins: [data_getters],
   props: {
      user: Object,
      dogs: Array,
      expanded: {type: Boolean, default: true},
   },
   data () {
      return {
         show_add_dog: false, //controls if add dog modal is shown

         expanded_loc: this.expanded,

      }
   },

   methods:{

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

      }
   },


}
</script>

<style scoped>
@import url('../mgmProfile/mgm_common.css');

.registration-container{
   background-color: white;
   width: 100%;
   max-width: 701px;
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

