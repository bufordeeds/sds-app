<template>

   <div class="registration-container">


      <v-dialog v-model="show_delegate" max-width="500px" persistent>
         <edit-access
             v-if="show_delegate"
             :delegate="edit_delegate"
             @close="show_delegate=false; edit_delegate=null;"
             @added="get_my_delegated_users"
         ></edit-access>
      </v-dialog>


      <confirm-dialog
          header="Confirm Revoke Access"
          v-model="show_revoke_confirm"
          max-width="400px"
          :fn-confirm="ACTUALLY_revoke_access"
          :fn-cancel="close_revoke_confirm"
      >
         Are you sure you wish to remove access for
         <span style="font-weight: bold">
            {{revoke_user_name}}
         </span>
         from your account?

      </confirm-dialog>



      <div class="pa-2 delegate-access-container">

                  <span class="pr-2 pt-1">
                     Delegate Access
                  </span>
         <v-btn rounded small color="var(--color-primary)" @click="show_delegate=true">
            <v-icon color="white">add</v-icon>
         </v-btn>
      </div>

      <div class="reg-body" >

         <table style="width: 100%">
            <colgroup>
               <col span="1" style="width: 40%;">
               <col span="1" style="width: 25%;">
               <col span="1" style="width: 25%;">
               <col span="1" style="width: 10%;">
            </colgroup>
            <tbody>
            <tr style="background-color: #b7dbf1">
               <th>User</th>
               <th>Access Level</th>
               <th>Access Status</th>
               <th>Remove</th>
            </tr>

            <tr v-for="(item, ix) in users" :key="item._id">

               <td class="col-service-dog">

                  <div class="sd-name-container">
                     <img v-if="!item.user.profile_image"
                         src="../../assets/images/content/user-no-image.png" width="75px">
                     <img v-else
                          :src="item.user.profile_image.Location" width="75px">

                     <div class="pl-2">
                        <div>
                           <div>
                              {{item.user.name_first}}
                              {{item.user.name_last}}
                           </div>
                           <div>
                              {{item.user.email}}
                           </div>

                        </div>
                     </div>

                  </div>

               </td>

               <td class="col-service-do-reg">
                  {{item.access_level}}

                  <div style="font-size: 10pt; cursor: pointer;" @click="show_edit_delegate(item)">
                     Edit
                  </div>
               </td>

               <td class="col-service-dog-status" style="max-width: 200px">
                  <div style="max-width: 150px; margin-left: 10px">
                     {{item.access_status}}
                  </div>
               </td>

               <td>
                  <v-btn icon>
                     <v-icon color="red"
                             @click="confirm_revoke(item)"
                     >delete</v-icon>
                  </v-btn>
               </td>
            </tr>


            </tbody>

         </table>

      </div>

   </div>
</template>

<script>


import data_getters from "@/mixins/data_getters";
// import status from '@/views/mgmProfile/StatusDropDown';
import ConfirmDialog from "@/components/app/ConfirmDialog";
import EditAccess from "@/views/mgmProfile/AddDelegatedUser";
// import StatusDropDown from "@/views/mgmProfile/StatusDropDown";


/**
 * Table component to display user's I have given access to my account.
 */
export default {
   name: "TableDelegatedUsers",
   components: {EditAccess, ConfirmDialog},
   mixins: [data_getters],
   props: {
      // users_del: Array,
      expanded: {type: Boolean, default: true},

   },
   data () {
      return {

         //related to adding/editing a delegated user
         show_delegate: false,
         // edit_delegate_id: null,
         edit_delegate: null,

         // show_add_dog: false, //controls if add dog modal is shown
         expanded_loc: this.expanded,
         users: [],

         //related to revoking access
         show_revoke_confirm: false,
         revoke_delegate_id: null,

         revoke_user_name: '',
      }
   },

   methods:{

      async get_my_delegated_users() {
         try{
            this.users = await this.make_request('/private/getMyDelegatedUsers', {});
         }catch (e) {

            console.log(e)
         }

      },

      //*************** edit delegated user ************************************************

      show_edit_delegate(delegate){
         this.edit_delegate = delegate;
         this.show_delegate = true;
      },

      //*************************deleting a delegated_user************************************

      /**
       * shows the confirm dialog to remove a user from my list of delegated users_del
       * @param delegate_id : str, id of user to remove
       */
      confirm_revoke(delegate){
         this.revoke_delegate_id = delegate.user_id;
         this.show_revoke_confirm = true;
         this.revoke_user_name = delegate.user.name_first + ' ' + delegate.user.name_last;
         this.revoke_user_name += ` (${delegate.user.email})`;
      },


      close_revoke_confirm(){
         this.revoke_delegate_id = null;
         this.show_revoke_confirm = false;
         this.revoke_user_name = null;
      },


      async ACTUALLY_revoke_access(){
         try{

            let payload = {
               user_id: this.$auth.profile.user_id,
               delegate_id: this.revoke_delegate_id
            }
            await this.make_request('/private/removeDelegatedUser', payload);
            this.close_revoke_confirm();

            await this.get_my_delegated_users();
         } catch (e) {

            throw e;
         }
      },

   },

   created(){
      this.get_my_delegated_users();
   }


}
</script>

<style scoped>
@import url('./mgm_common.css');

.registration-container{

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
   background-color: white;
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

.delegate-access-container{
   display:flex;
   flex-direction: row;
   justify-content: flex-end;
   align-items: center;
   width:100%;
   max-width:1000px;
}


</style>

