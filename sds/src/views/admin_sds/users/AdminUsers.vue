<template>
  <div>
    <!-------- edit user dialog -------------------------------------------------------->
    <v-dialog
      v-model="show_edit_user"
      persistent
    >
      <v-row
        dense
        style="margin-bottom: -40px"
      >
        <v-spacer />
        <v-btn
          icon
          @click="show_edit_user=false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-row>
      <!--<edit-profile-->
      <!--    v-if="selected_user"-->
      <!--    :user_id="selected_user._id"-->
      <!--    @update="on_record_update"-->
      <!--    @update-image="on_record_update_image"-->
      <!--&gt;</edit-profile>-->


      <div
        class="content-container-bg"
        style="background-color: var(--color-bg)"
      >
        <edit-trainer-info
          v-if="selected_user && selected_user.account_type === 'TRAINER'"
          :user_id="selected_user._id"
          @user_updated="on_record_update"
          @photo_updated="on_record_update({close:false})"
        />


        <edit-admin-info
          v-if="selected_user && selected_user.account_type === 'SDS-ADMIN'"
          :user_id="selected_user._id"
          @user_updated="on_record_update"
          @photo_updated="on_record_update({close:false})"
        />

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
    <v-dialog
      v-model="show_edit_dog"
      persistent
      max-width="400px"
    >
      <v-row
        dense
        style="margin-bottom: -40px"
      >
        <v-spacer />
        <v-btn
          icon
          @click="show_edit_dog=false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </v-row>


      <!--<div class="content-container-bg" style="background-color: var(&#45;&#45;color-bg)">-->
      <!--   -->

      <!--</div>-->

      <edit-dog-dialog
        v-if="show_edit_dog"
        :dog="selected_dog"
        @update="on_record_update"
        @update-image="on_record_update({close:false})"
        @close="show_edit_dog=false;"
      />
    </v-dialog>






    <!---------------Edit comment dialog ------------------------------->
    <v-dialog
      v-model="show_edit_comments"
      persistent
      max-width="700px"
    >
      <v-card
        v-if="show_edit_comments"
        class="pa-3"
      >
        <div
          class="dialog-heading"
          style="display: flex"
        >
          Admin Comments
          <v-spacer />
          <v-btn
            icon
            @click="show_edit_comments=false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>
        <my-form>
          <my-text-area
            v-model="selected_user.admin.comment"
            label="Comments"
          />
        </my-form>

        <div style="display: flex">
          <v-spacer />
          <v-btn @click="save_comments_user">
            Save
          </v-btn>
        </div>
      </v-card>
    </v-dialog>



    <!---------------Edit comment dialog dog ------------------------------->
    <v-dialog
      v-model="show_edit_comments_dog"
      persistent
      max-width="700px"
    >
      <v-card
        v-if="show_edit_comments_dog"
        class="pa-3"
      >
        <div
          class="dialog-heading"
          style="display: flex"
        >
          Admin Comments
          <v-spacer />
          <v-btn
            icon
            @click="show_edit_comments_dog=false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>
        <my-form>
          <my-text-area
            v-model="selected_dog.admin.comment"
            label="Comments"
          />
        </my-form>

        <div style="display: flex">
          <v-spacer />
          <v-btn @click="save_comments_dog">
            Save
          </v-btn>
        </div>
      </v-card>
    </v-dialog>




















    <!----------------------------------main content----------------------------------------------------------------->


    <div class="page-title-app">
      Manage Users
    </div>

    <div class="content-container-bg">
      <div
        style="display: flex; width: 100%"
        class="pl-0 pt-4"
      >
        <my-date-picker
          v-model="date_start"
          style="width: 150px; background-color: white"
          label="Date From"
          readonly
        />

        <my-date-picker
          v-model="date_end"
          class="ml-4"
          style="width: 150px; background-color: white"
          label="Date To"
          readonly
        />
      </div>


      <my-form ref="form">
        <v-row dense>
          <v-col>
            <my-drop-down
              v-model="user_type"
              label="Search Type"
              :list="type_list"
              item-text="txt"
              item-value="val"
            />
          </v-col>

          <v-col>
            <my-text-input
              v-model="name_first"
              label="First Name"
              clearable
              @keyup-enter="search"
            />
          </v-col>

          <v-col>
            <my-text-input
              v-model="name_last"
              label="Last Name"
              clearable
              @keyup-enter="search"
            />
          </v-col>


          <v-col>
            <my-text-input
              v-model="user_city"
              label="City"
              clearable
              @keyup-enter="search"
            />
          </v-col>


          <v-col>
            <my-text-input
              v-model="user_state"
              label="State"
              clearable
              @keyup-enter="search"
            />
          </v-col>

          <v-col v-if="!isDog">
            <my-text-input
              v-model="email"
              label="Email"
              clearable
              @keyup-enter="search"
            />
          </v-col>



          <v-col v-if="isDog">
            <my-text-input
              v-model="dog_name"
              label="Dog's Name"
              clearable
              @keyup-enter="search"
            />
          </v-col>

          <v-col v-if="isDog">
            <my-text-input
              v-model="sds_num"
              label="SDS Number"
              clearable
            />
          </v-col>

          <v-btn
            class="mt-6"
            @click="search"
          >
            Search
          </v-btn>
        </v-row>

        <v-row dense />
      </my-form>



      <div
        class="content-container mt-8"
        style="background-color: white"
      >
        <table-dogs
          v-if="isDog"
          :dogs="dogs"
          @edit-comment="on_edit_comment_dog"
          @click-user="on_click_dog_user"
          @click-dog="on_click_dog"
        />

        <table-users
          v-else
          :users="users"
          @click-user="on_click_user"
          @edit-comment="on_edit_comment_user"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MyDropDown from "@/components/inputs/MyDropDown";
import MyTextArea from "@/components/inputs/MyTextArea";
import data_getters from "@/mixins/data_getters";
import tableUsers from "@/views/admin_sds/users/tableUsers";
import tableDogs from "@/views/admin_sds/users/tableDogs";

import EditProfile from "@/views/mgmProfile/EditProfile";
import EditHandlerInfo from "@/views/mgmProfile/EditHandlerInfo";
import EditTrainerInfo from "@/views/mgmProfile/EditTrainerInfo";
import EditAdminInfo from "@/views/mgmProfile/EditAdminInfo";
import EditDogDialog from "@/views/mgmDogs/EditDogDialog";


import _ from 'lodash';
import myDatePicker from "@/components/inputs/myDatePicker";
import {DateTime} from "luxon";


export default {
   name: "AdminUsers",
   components: {MyDropDown, myDatePicker, tableUsers, tableDogs, EditHandlerInfo, EditTrainerInfo, EditAdminInfo,
      MyTextArea, EditDogDialog},
   mixins: [data_getters],
   data(){
      return {
         user_type: 'DOG',
         type_list: [
            {val: 'DOG', txt: 'Teams'},
            {val: 'HANDLER', txt: 'Handler'},
            {val: 'TRAINER', txt: 'Trainer'},
            {val: 'SDS-ADMIN', txt: 'SDS Admins'},

         ],

         date_start: DateTime.local().minus({days:90}).toISO(),
         // date_start: DateTime.local().minus({days:300}).toISO(),
         date_end: DateTime.local().toISO(),

         name_first: null,
         name_last: null,
         email: null,
         user_city:null,
         user_state: null,

         dog_name: null,
         sds_num: null,

         users: [],
         dogs: [],

         show_edit_user: false,
         selected_user: null,
         selected_user_ix: -1,

         show_edit_comments: false,
         show_edit_comments_dog: false,

         show_edit_dog: false,
         selected_dog: null,
         selected_dog_ix: -1,



      }
   },


   computed:{
     isDog(){
        if (['HANDLER', 'TRAINER', 'SDS-ADMIN'].includes(this.user_type)){
           return false;
        }
        return true;
     }
   },

   watch:{
      show_edit_user(newVal){
         if (newVal === false){
            this.selected_user = null;
            this.selected_user_ix = -1;

         }
      },

      user_type(newVal){


         this.search();

      }
   },



   created(){
      this.$store.commit("set_show_side_nav", true);


   },

   mounted(){
      this.search();
   },

   methods: {

      on_click_user(event){
         console.log({event})
         this.selected_user = event.user
         this.selected_user_ix = event.ix;
         this.show_edit_user = true;
      },

      on_click_dog(event){
         this.selected_dog= event.dog
         this.selected_dog_ix = event.ix;
         this.show_edit_dog = true;
      },

      on_click_dog_user(event){
         this.selected_user= event.user;
         this.selected_dog= event.dog;
         this.selected_dog_ix = event.ix;
         this.show_edit_user = true;
      },



      on_edit_comment_user(event){
         event.user = _.cloneDeep(event.user);

         if (event.user.admin == null){
            event.user.admin = {comment: null}
         }
         this.selected_user = event.user
         this.selected_user_ix = event.ix;
         this.show_edit_comments = true;
      },

      async save_comments_user(){


         try{
            let payload = {
               user: {
                  _id: this.selected_user._id,
                  'admin.comment': this.selected_user.admin.comment,
               }
            };
            let user = await this.make_request('/admin/updateUserProfile', payload);

            await this.on_record_update(user);
            this.show_edit_comments = false;
         }
         catch (e){
            console.error(e)

         }
      },


      on_edit_comment_dog(event){
         event.dog = _.cloneDeep(event.dog);

         if (event.dog.admin == null){
            event.dog.admin = {comment: null}
         }
         this.selected_dog = event.dog
         this.selected_dog_ix = event.ix;
         this.show_edit_comments_dog = true;
      },

      async save_comments_dog(){


         try{
            let payload = {
               dog: {
                  _id: this.selected_dog._id,
                  'admin.comment': this.selected_dog.admin.comment,
               }
            };
            let dog = await this.make_request('/admin/updateDog', payload);

            await this.on_record_update_dog();
            this.show_edit_comments_dog = false;
         }
         catch (e){
            console.error(e)

         }
      },



      //when a user's record is saved
      async on_record_update({close=true}={}){

         // this.users[this.selected_user_ix] = updated_user;
         console.log('i ran')

         if (this.selected_user_ix > -1){
            let user = await this.make_request('/admin/getUser', {user_id: this.selected_user._id});
            this.$set(this.users, this.selected_user_ix, user)

         }

         if (this.selected_dog_ix > -1){
            let payload = {
               sds_num: this.selected_dog.dog_num,
               date_range: {
                  start: this.date_start,
                  stop: this.date_end,
               }
            }
            // let dog = await this.make_request('/admin/getDogProfileAdvanced', payload);
            // if (dog.length  === 1){
            //    this.$set(this.dogs, this.selected_dog_ix, dog[0])
            // }
            await this.get_dogs();
         }

         if (close) {
            this.selected_user_ix = -1;
            this.show_edit_user = false;
            this.show_edit_dog = false;
            this.selected_dog_ix = -1;
         }
      }, //on_record_update()


      // async on_record_update_dog(){
      //
      //    let payload = {
      //       sds_num: this.selected_dog.dog_num,
      //       date_range: {
      //          start: this.date_start,
      //          stop: this.date_end,
      //       }
      //    }
      //    let dog = await this.make_request('/admin/getDogProfileAdvanced', payload);
      //    if (dog.length  === 1){
      //       this.$set(this.dogs, this.selected_dog_ix, dog[0])
      //    }
      //
      //    this.selected_dog_ix = -1;
      //    this.show_edit_dog = false;
      //
      // },



      on_record_update_image(image){

         console.log('I ran')
         // this.$set(this.users, this.selected_user_ix, updated_user)

         if (this.selected_user_ix > -1){
            this.users[this.selected_user_ix].profile_image = image;
            // this.on_record_update();
         }

         if (this.selected_dog_ix > -1){
            this.on_record_update();
         }


      },

      async get_users(){
         let payload = {
            name_first: this.name_first,
            name_last: this.name_last,
            city: this.user_city,
            state: this.user_state,
            email: this.email,
            type: this.user_type,
            date_range: {
               start: this.date_start,
               stop: this.date_end,
            }
         };

         let data = await this.make_request('/admin/getUsers', payload);
         for (let i in data){
            if (data[i].name_first == null){
               data[i].name_first = '';
            }

            if (data[i].name_last == null){
               data[i].name_last = '';
            }
         }
         data.sort((a, b) => a.name_first > b.name_first ? 1 : -1);
         this.users = data;
      },


      async get_dogs(){
         let payload = {
            handler_name_first: this.name_first,
            handler_name_last: this.name_last,
            handler_city: this.user_city,
            handler_state: this.user_state,
            dog_name: this.dog_name,
            sds_num: this.sds_num,
            date_range: {
               start: this.date_start,
               stop: this.date_end,
            }
         };

         let data = await this.make_request('/admin/getDogProfileAdvanced', payload);
         // for (let i in data){
         //    if (data[i].name_first == null){
         //       data[i].name_first = '';
         //    }
         //
         //    if (data[i].name_last == null){
         //       data[i].name_last = '';
         //    }
         // }
         // data.sort((a, b) => a.name_first > b.name_first ? 1 : -1);
         this.dogs = data;
      },



      async search(){
         this.err_msg = null;

         if (!this.$refs.form.validate()){
            return;
         }



         try{
            if (this.isDog){
               await this.get_dogs();
            }
            else{
               await this.get_users();
            }


            this.show_results = true;
         }
         catch (e){
            console.log(e)
            if (e.status === 400){
               this.err_msg = 'Please enter at least one value to search for.'
            }
         }
      },





   }



}
</script>

<style scoped>

</style>