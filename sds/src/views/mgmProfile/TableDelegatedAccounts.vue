<template>
   <div class="registration-container">

      <!-------- edit user dialog -------------------------------------------------------->
      <v-dialog v-model="show_edit_user" persistent>
         <v-row dense style="margin-bottom: -40px">
            <v-spacer/>
            <v-btn icon @click="show_edit_user=false">
               <v-icon>close</v-icon>
            </v-btn>
         </v-row>
         <!--<edit-profile-->
         <!--    v-if="selected_user"-->
         <!--    :user_id="selected_user._id"-->
         <!--    @update="on_record_update"-->
         <!--    @update-image="on_record_update_image"-->
         <!--&gt;</edit-profile>-->


         <div class="content-container-bg" style="background-color: var(--color-bg)">
            <!--<edit-trainer-info-->
            <!--    v-if="selected_user  && selected_user.account_type === 'TRAINER'"-->
            <!--    :user_id="selected_user._id"-->
            <!--    @user_updated="on_record_update"-->
            <!--    @photo_updated="on_record_update({close:false})"-->
            <!--/>-->




            <div class="content-container-sm">
               <edit-handler-info
                   v-if="selected_user && selected_user.account_type === 'HANDLER'"
                   :user_id="selected_user._id"
                   @user_updated="on_record_update"
                   @update-image="on_record_update({close:false})"

               />
            </div>
         </div>

      </v-dialog>



      <!-------- edit dog dialog -------------------------------------------------------->
      <v-dialog v-model="show_edit_dog" persistent max-width="400px">
         <v-row dense style="margin-bottom: -40px">
            <v-spacer/>
            <v-btn icon @click="show_edit_dog=false">
               <v-icon>close</v-icon>
            </v-btn>
         </v-row>


         <edit-dog-dialog
             v-if="show_edit_dog"
             :dog="selected_dog"
             @update="on_record_update"
             @update-image="on_record_update({close:false})"
             @close="show_edit_dog=false;"
         />

      </v-dialog>

















      <div class="reg-body" v-if="expanded_loc">

         <table style="width: 100%">
            <colgroup>
               <col span="1" style="width: 50%;">
               <col span="1" style="width: 25%;">
               <col span="1" style="width: 25%;">

            </colgroup>
            <tbody>
            <tr style="background-color: #b7dbf1" >
               <th>User</th>
               <th>Access Level</th>
               <th>Access Status</th>
            </tr>

            <template v-for="(item, ix) in users">
               <tr  :key="item.user._id" @click="on_click_user(item.user, ix)" style="cursor: pointer">

                  <td class="col-service-dog">

                     <div class="sd-name-container">
                        <img v-if="!item.user.profile_image"
                             src="../../assets/images/content/user-no-image.png" width="75px"
                        >

                        <img v-else :src="item.user.profile_image.Location" width="75px">

                        <div class="pl-2">
                           <div>
                              {{item.user.name_first}}
                              {{item.user.name_last}}
                           </div>
                           <div>
                              {{item.user.email}}
                           </div>
                        </div>

                     </div>

                  </td>

                  <td class="col-service-do-reg">
                     {{item.access_level}}</td>

                  <td class="col-service-dog-status" style="max-width: 200px">
                     <div style="max-width: 150px; margin-left: 10px">
                        {{item.access_status}}
                     </div>
                  </td>

               </tr>

               <tr  :key="item.user._id+'dog'" >

                  <td colspan="4">

                     <table style="width: 100%; margin-left: 20px">
                        <tr v-for="dog in item.user.dogs" :key="dog._id" @click="on_click_dog(dog)" style="cursor: pointer">
                           <td>
                              <avatar profile-type="dog" :profile="dog" image-only size="50"/>
                           </td>
                           <td>
                              {{dog.name}}
                           </td>
                           <td>
                              SDS-{{dog.dog_num}}
                           </td>
                           <td>
                              {{dog.status}}
                           </td>

                        </tr>
                     </table>

                  </td>

               </tr>
            </template>



            </tbody>

         </table>

      </div>

   </div>
</template>

<script>


import data_getters from "@/mixins/data_getters";
import status from '@/components/inputs/StatusDropDown';

import EditHandlerInfo from "@/views/mgmProfile/EditHandlerInfo";
// import EditTrainerInfo from "@/views/mgmProfile/EditTrainerInfo";
import EditDogDialog from "@/views/mgmDogs/EditDogDialog";

export default {
   name: "TableDelegatedAccess",
   components: {status, EditHandlerInfo, EditDogDialog,},
   mixins: [data_getters],
   props: {
      users: Array,
      expanded: {type: Boolean, default: true},

   },
   data () {
      return {
         show_add_dog: false, //controls if add dog modal is shown

         expanded_loc: this.expanded,

         show_edit_user: false,
         show_edit_dog: false,

         selected_user: null,
         selected_dog: null,


      }
   },

   methods:{

      //saves a dogs status in realtime as user changes
      /**
       *
       * @param ix  index of this dog in the dogs array
       * @returns {Promise<void>}
       */
      // async save_dog_status(dog_id, status){
      //
      //    try{
      //
      //       let payload = {
      //          user_id: this.user._id,
      //          dog: {
      //             _id: dog_id,
      //             status,
      //          },
      //       }
      //       await this.make_request('/private/updateDog', payload);
      //    }catch(e){
      //       throw e;
      //    }
      //
      // }


      on_click_user(user, ix){
         this.selected_user = user;
         this.show_edit_user = true;
      },

      on_click_dog(event){
         this.selected_dog= event;
         // this.selected_dog_ix = event.ix;
         this.show_edit_dog = true;
      },


      //when a user's record is saved
      async on_record_update({close=true}={}){

         // this.users[this.selected_user_ix] = updated_user;
         console.log('i ran')
         //
         // if (this.selected_user_ix > -1){
         //    let user = await this.make_request('/admin/getUser', {user_id: this.selected_user._id});
         //    this.$set(this.users, this.selected_user_ix, user)
         //
         // }
         //
         // if (this.selected_dog_ix > -1){
         //    let payload = {
         //       sds_num: this.selected_dog.dog_num,
         //       date_range: {
         //          start: this.date_start,
         //          stop: this.date_end,
         //       }
         //    }
         //    // let dog = await this.make_request('/admin/getDogProfileAdvanced', payload);
         //    // if (dog.length  === 1){
         //    //    this.$set(this.dogs, this.selected_dog_ix, dog[0])
         //    // }
         //    await this.get_dogs();
         // }

         this.$emit('updated');
         if (close) {
            this.selected_user_ix = -1;
            this.show_edit_user = false;
            this.show_edit_dog = false;
            this.selected_dog_ix = -1;
         }
      }, //on_record_update()
   },


}
</script>

<style scoped>
@import url('./mgm_common.css');

.registration-container{
   background-color: white;
   width: 100%;
   max-width: 1000px;

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

