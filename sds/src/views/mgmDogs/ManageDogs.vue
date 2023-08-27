<template>
   <div >

      <v-dialog v-model="show_add_dog" max-width="500px" persistent >
         <add-dog
             v-if="show_add_dog"
             :dog="edit_dog"
             :user_id="edit_dog_user_id"
             @close="show_add_dog=false"
             @update="update_dogs"
             @update-image="update_dogs(false)"

         ></add-dog>
      </v-dialog>



      <v-dialog v-model="show_add_trainer" max-width="500px" persistent>
         <add-user
             v-if="show_add_trainer"
             :delegate="null"
             :dog="edit_dog"
             :type="add_user_type"
             @close="show_add_trainer=false"
             @added="show_add_trainer=false; update_dogs()"
             invite-type="trainer"
         ></add-user>
      </v-dialog>


      <v-dialog v-model="show_add_user" max-width="500px" persistent >
         <add-client
             v-if="show_add_user"
             :delegate="null"
             :dog="edit_dog"
             :type="add_user_type"
             @close="show_add_user=false"
             @added="show_add_user=false; update_dogs()"
         ></add-client>
      </v-dialog>


      <v-dialog v-model="show_transfer_dog" max-width="500px" persistent>
         <transfer-dog
             v-if="show_transfer_dog"
             :dog="edit_dog"
             type="HANDLER"
             @close="show_transfer_dog=false"
             @added="show_transfer_dog=false; update_dogs()"
             invite-type="trainer"
         ></transfer-dog>
      </v-dialog>


      <v-dialog v-model="show_add_kit" :fullscreen="$vuetify.breakpoint.width<650">
         <div style="background-color: white; padding: 10px" >
            <add-kit-index
                v-if="show_add_kit"
                :dog="dog_cart"
                @close="show_add_kit=false"
                simple
                :reorder="isReorder"
            />
         </div>

      </v-dialog>






      <!----------------search row ---------------------------------------------------------------------->

      <div class="page-title-app">
         <span v-if="!isTrainer">
         Manage Service Dogs
         </span>
         <span v-if="isTrainer">
         Manage Clients & Dogs
         </span>


      </div>

      <div class="content-container-bg" >

         <my-form style="width: 90%" v-if="isTrainer">
            <v-row dense class="ma-0">

               <v-col cols="12" md="7">
                  <my-text-input
                      label="Search"
                      v-model="search_txt"
                      :append-icon="search_txt ? 'close': null"
                      @click:append="search_txt=null; get_my_dogs()"
                      @keyup-enter="search_dogs"
                  />
               </v-col>

               <v-col  md="3" >
                  <my-drop-down
                      v-model="search_field"
                      label="Search Field"
                      :list="searchByList"
                      item-text="txt"
                      item-value="val"
                  />
               </v-col>



               <v-btn style="margin-top: 23px" @click="search_dogs">
                  Search
               </v-btn>


            </v-row>

         </my-form>









         <!----------------main tables ----------------------------------------------------------------------------->

         <div class="mgm-subtitle" style="width: 100%;" v-if="isTrainer">
            My Dogs
         </div>


         <dog-table
             :user="user"
             :dogs="my_dogs"
             :expanded="expanded_user"
             :show-add-dogs="true"
             :is-handler="!isTrainer"

             :show-transfer="true"
             my-dogs
             @show-add-dog="add_dog(user, null)"
             @show-edit-dog="add_dog(user, $event.dog)"

             @show-add-trainer="add_user('TRAINER', $event.dog)"
             @show-add-handler="add_user('HANDLER', $event.dog)"

             @show-add-dog-cart="add_to_cart( $event.dog, $event.isReorder)"

             @show-transfer-dog="transfer_dog($event.dog)"
         ></dog-table>





         <template v-if="isTrainer">
            <div class="mgm-subtitle">
               My Clients
            </div>

            <div style="display: flex; justify-content: flex-end; width: 100%; "
                 :style="isMobile?'margin-top: 10px': 'margin-top: -30px'"
            >
               <v-btn small @click="show_add_user=true">
                  Add Client
               </v-btn>

            </div>


            <!--:showAddDogs="client.handler_id_FR.account_status.date_expiry != null"-->
            <template v-if="my_clients.length>0">
               <dog-table
                   class="mt-2"

                   v-for="(client, ix) in my_clients"
                   :key="client.handler_id"

                   :user="client.handler_id_FR"
                   :dogs="client.dogs"
                   :expanded.sync="my_clients[ix].loc_expanded"
                   :is-handler="isTrainer"

                   @show-add-dog="add_dog(user, null)"
                   @show-edit-dog="add_dog(user, $event.dog)"

                   @show-transfer-dog="transfer_dog($event.dog)"
                   @show-add-dog-cart="add_to_cart( $event.dog)"
               ></dog-table>
            </template>

            <div v-else class="pa-3 mt-3"
                 style="background-color: white; width: 100%; padding: 10px;border-radius: 5px;border: 1px solid rgb(210, 209, 209); text-align: center"
            >
               You have no clients yet
            </div>

         </template>









<!--         <div class="mgm-subtitle">-->
<!--            Dogs I've Trained-->
<!--         </div>-->


<!--         <user-reg-->
<!--             :user="user"-->
<!--             :dogs="my_dogs_train"-->
<!--             :expanded="expanded_user"-->

<!--             @show-add-dog="add_dog(user, null)"-->
<!--             @show-edit-dog="add_dog(user, $event.dog)"-->

<!--             @show-add-trainer="add_user('TRAINER', $event.dog)"-->
<!--             @show-add-handler="add_user('HANDLER', $event.dog)"-->
<!--         ></user-reg>-->



<!--         <div class="mgm-subtitle">-->
<!--            Dogs I'm Handler For-->
<!--         </div>-->


<!--         <user-reg-->
<!--             :user="user"-->
<!--             :dogs="my_dogs_handle"-->
<!--             :expanded="expanded_user"-->

<!--             @show-add-dog="add_dog(user, null)"-->
<!--             @show-edit-dog="add_dog(user, $event.dog)"-->

<!--             @show-add-trainer="add_user('TRAINER', $event.dog)"-->
<!--             @show-add-handler="add_user('HANDLER', $event.dog)"-->
<!--         ></user-reg>-->




<!--         <div class="mgm-subtitle">-->
<!--            My Delegated Accounts-->
<!--         </div>-->



<!--         <user-reg-->
<!--             class="mb-5"-->
<!--             v-for="item in delegated_accounts"-->
<!--             :key="item.user._id"-->
<!--             :user="item.user"-->
<!--             :dogs="item.dogs"-->
<!--             :expanded="item.loc_expanded"-->
<!--             @show-add-dog="add_dog(item.user, null)"-->
<!--             @show-edit-dog="add_dog(item.user, $event.dog)"-->
<!--         ></user-reg>-->


      </div>

   </div>
</template>

<script>

import addDog from './EditDogDialog';
import addUser from "@/views/mgmDogs/AddUser";
import addClient from "@/views/mgmDogs/AddClient";
import TransferDog from "@/views/mgmDogs/TransferDog";

import data_getters from "@/mixins/data_getters";

import dogTable  from './SingleUsersRegistrationV4';
import AddKitIndex from "@/views/shop/AddKitIndex";
import MyDropDown from "@/components/inputs/MyDropDown";

export default {
   name: "ManageDogs",
   components: {MyDropDown, addDog, addUser, TransferDog, addClient, dogTable, AddKitIndex},
   mixins: [data_getters],
   data () {
      return {
         show_add_dog: false, //controls if add dog modal is shown
         show_transfer_dog: false,

         expanded_user: true,
         user: {},
         my_dogs: [],
         my_dogs_train: [],
         my_dogs_handle: [],
         my_clients: [],



         edit_dog_user_id: null,
         edit_dog: null,

         show_add_user: false, //
         add_user_type: null,
         // edit_dog: null,

         show_add_trainer: false,

         //delegated
         delegated_accounts: [],


         //buy kit variables
         show_add_kit: false,
         dog_cart: null,
         isReorder: null,

         search_txt: null,
         search_field: 'dog_name',
         searchByList: [
            {txt: "Dog's Name",     'val': 'dog_name'},
            {txt: "Handler's Name", 'val': 'handler_name'},
         ]

      }
   },

   computed: {
      isTrainer(){
         return this.$auth.profile.acct_type === 'TRAINER';
      },

      isMobile(){
         return this.$vuetify.breakpoint.width < 450;
      }
   },

   methods:{
      //
      // test(event){
      //
      //    console.log('event', event)
      // },

      async get_profile(){
         try{
            this.user = await this.make_request('/private/getMyProfile', {});
         }catch (e) {

            console.log(e)
         }

      },

      add_to_cart(dog, isReorder){
         this.show_add_kit = true;
        this.dog_cart = dog;
        this.isReorder = isReorder;
      },

      add_user(user_type, dog){
         // this.edit_dog_user_id = user._id;

         console.log('add user')
         this.add_user_type = user_type;
         this.edit_dog = dog;
         this.show_add_trainer = true;
      },

      add_dog(user, dog){
         this.edit_dog_user_id = user._id;
         this.edit_dog = dog;
         this.show_add_dog = true;
      },


      transfer_dog(dog){

         this.edit_dog = dog;
         this.show_transfer_dog = true;
      },


      //updates dogs after a user edits/adds a dog
      update_dogs(close_dialog=true){
       this.get_my_dogs();
       if (close_dialog){
          this.show_add_dog = false;
       }

      },

      async get_my_dogs(){

         console.log('get my dogs')
         try{
            this.my_dogs = await this.make_request('/private/getDogs', {user_id: this.$auth.profile.user_id});


            let payload= {
               filterBy: {user_id: this.$auth.profile.user_id, user_type: 'TRAINER'},
               groupBy: 'HANDLER',
            }
            let clients = await this.make_request('/private/getDogsGroupedByUser', payload);

            for (let i in clients){
               clients[i].loc_expanded = false;
            }

            this.my_clients = clients;

         }catch (e) {

            console.log(e)
         }

      },


      async search_dogs(){

         if (this.search_txt == null || this.search_txt === ''){
            return;
         }

         try{

            let search = {
               search_txt: this.search_txt,
               search_field: this.search_field
            }

            if (this.search_field === 'dog_name'){
               this.my_dogs = await this.make_request('/private/getDogs', {user_id: this.$auth.profile.user_id, search});
            }
            else{
               this.my_dogs = [];
            }



            let payload= {
               filterBy: {user_id: this.$auth.profile.user_id, user_type: 'TRAINER'},
               groupBy: 'HANDLER',
               search

            }
            let clients = await this.make_request('/private/getDogsGroupedByUser', payload);

            for (let i in clients){
               clients[i].loc_expanded = true;
            }

            this.my_clients = clients;

         }catch (e) {

            console.log(e)
         }

      },




      async get_delegated_accounts() {
         try{
            this.delegated_accounts = await this.make_request('/private/getDelegatedAccounts', {include_dogs: true});

            for (let i in this.delegated_accounts){
               this.delegated_accounts[i].loc_expanded = false;
            }


         }catch (e) {

            console.log(e)
         }

      },

   },


   mounted(){
      // console.log('debug')
      this.$store.commit("set_show_side_nav", true);

      this.get_profile();
      this.get_my_dogs();
      // this.get_delegated_accounts();
   },

   beforeDestroy() {
      // this.$store.commit("set_show_side_nav", false);
   }
}
</script>

<style scoped>
@import url('../mgmProfile/mgm_common.css');

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


/*!*settings for registration table*!*/
/*th, td{*/
/*   text-align: left;*/
/*   padding: 10px;*/
/*}*/

/*tr:nth-child(odd) {background-color: #e7f3fb;}*/
/*tr:nth-child(even) {background-color: #f7fbfd;}*/

/*.col-service-dog{*/
/*   font-size: 12pt;*/
/*   font-weight: 500;*/
/*}*/

/*.col-service-do-reg{*/
/*   font-size: 12pt;*/
/*   font-weight: 500;*/
/*   color: var(--color-subheading)*/
/*}*/

</style>

