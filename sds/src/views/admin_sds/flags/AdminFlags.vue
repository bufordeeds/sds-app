<template>
   <div>

      <v-dialog v-model="show_edit_flag" persistent max-width="700px">
         <v-card class="pa-3" v-if="selected_flag != null">
            <div class="dialog-heading pb-4" style="display: flex">

               Flag Details
               <v-spacer/>
               <v-btn icon @click="show_edit_flag=false" style="margin-top: -8px">
                  <v-icon>close</v-icon>
               </v-btn>
            </div>









            <my-form>

               <div style="display: flex; justify-content: space-between; align-items: flex-end">
                  <div>
                     <div>
                        <span class="edit-flag-heading">
                           Flag Date:
                        </span>

                        {{fmt_date(selected_flag.date_created )}}
                     </div>

                     <div>
                        <span class="edit-flag-heading">
                           Flagged User:
                        </span>

                        <router-link v-if="selected_flag.user_id_FR.account_type === 'TRAINER'"
                                     :to="'/trainer/'+selected_flag.user_id_FR._id" target="_blank">
                           {{get_name_user(selected_flag.user_id_FR)}}
                           ({{selected_flag.user_id_FR.email}})
                        </router-link>

                        <router-link v-if="selected_flag.user_id_FR.account_type === 'HANDLER'"
                                     :to="'/team/'+selected_flag.dog_num" target="_blank">
                           {{get_name_user(selected_flag.user_id_FR)}}
                           ({{selected_flag.user_id_FR.email}})
                        </router-link>
                     </div>
                     <div>

                        <span class="edit-flag-heading">
                           User Type:
                        </span>
                        <span style="text-transform: capitalize">
                           {{selected_flag.user_id_FR.account_type.toLowerCase()}}
                        </span>

                     </div>

                     <div>
                        <span class="edit-flag-heading">
                           Flagger:
                        </span>

                        {{selected_flag.flag_request.flagger_name}}
                        ({{selected_flag.flag_request.flagger_email}})

                     </div>

                  </div>


                  <my-drop-down
                      style="max-width: 200px; "
                      label="Status"
                      :list="status_list"
                      v-model="selected_flag.status"
                  />
               </div>




               <div class="mt-3 edit-flag-heading">
                  Reason for flag
               </div>
               <div style="border: 1px solid #c1c1c1" class="pa-2">
                  {{selected_flag.flag_request.flagger_message}}
               </div>





               <my-text-area
                   class="mt-3"
                   label="Admin Comments"
                   v-model="selected_flag.comments"
               />
            </my-form>

            <v-row dense class="ma-0 mt-7">
               <v-spacer/>
               <v-btn @click="on_record_update" :loading="loading_flag">Update</v-btn>
            </v-row>
         </v-card>




      </v-dialog>





      <search-dialog
          v-model="show_search"
          @searched="on_search"
      />













      <!-----------------------main content---------------------------------------------------------------------------->

      <div class="page-title-app">
         Flag Reports
      </div>



      <!--<my-form ref="form">-->
      <!--   <v-row dense>-->

      <!--      <v-col >-->
      <!--         <my-drop-down-->
      <!--             label="Search Type"-->
      <!--             v-model="user_type"-->
      <!--             :list="type_list"-->
      <!--             item-text="txt"-->
      <!--             item-value="val"-->

      <!--         />-->
      <!--      </v-col>-->

      <!--      <v-col >-->
      <!--         <my-text-input-->
      <!--             label="First Name"-->
      <!--             v-model="name_first"-->
      <!--             @keyup-enter="search"-->
      <!--             clearable-->
      <!--         />-->
      <!--      </v-col>-->

      <!--      <v-col >-->
      <!--         <my-text-input-->
      <!--             label="Last Name"-->
      <!--             v-model="name_last"@keyup-enter="search"-->
      <!--             clearable-->
      <!--         />-->
      <!--      </v-col>-->

      <!--      <v-col v-if="!isDog">-->
      <!--         <my-text-input-->
      <!--             label="Email"-->
      <!--             v-model="email"-->
      <!--             @keyup-enter="search"-->
      <!--             clearable-->
      <!--         />-->

      <!--      </v-col>-->



      <!--      <v-col v-if="isDog">-->
      <!--         <my-text-input-->
      <!--             label="Dog's Name"-->
      <!--             v-model="dog_name"-->
      <!--             @keyup-enter="search"-->
      <!--             clearable-->
      <!--         />-->
      <!--      </v-col>-->

      <!--      <v-col v-if="isDog">-->
      <!--         <my-text-input-->
      <!--             label="SDS Number"-->
      <!--             v-model="sds_num"-->
      <!--             clearable-->
      <!--         />-->
      <!--      </v-col>-->

      <!--      <v-btn class="mt-6" @click="search">Search</v-btn>-->
      <!--   </v-row>-->

      <!--   <v-row dense>-->

      <!--   </v-row>-->
      <!--</my-form>-->






      <div class="content-container-bg">



         <div class="content-container mt-1" style="background-color: white">
            <div style="display: flex; width: 100%" class="pl-4 pt-4">
               <my-date-picker
                   style="width: 150px"
                   label="Date From"
                   readonly
                   v-model="date_start"
                   :on-change="get_flags"
               />

               <my-date-picker
                   class="ml-2"
                   style="width: 150px"
                   label="Date To"
                   readonly
                   v-model="date_end"
                   :on-change="get_flags"
               />

               <v-btn
                   @click="show_search=true"
                   class="ml-3"
               >
                  <v-icon>search</v-icon>Search
               </v-btn>

            </div>


            <template  v-if="search_results_msg!==null">
               <div
                   style="background-color: #eaeaea; " class="mt-4 ml-2 mr-2 pl-2 pr-2 pt-1 pb-1"
               >
                  Search Results For: {{search_results_msg}}
                  <v-spacer/>
                  <v-btn class="mt-2" small @click="clear_search">Clear Results</v-btn>
               </div>

            </template>


            <table-flags
                :flags="flags"
                @click-flag="on_click_flag"
            />

         </div>
      </div>
   </div>
</template>

<script>
import MyDropDown from "@/components/inputs/MyDropDown";
import myDatePicker from "@/components/inputs/myDatePicker";
import data_getters from "@/mixins/data_getters";
import tableFlags from "@/views/admin_sds/flags/tableFlags";
import MyTextArea from "@/components/inputs/MyTextArea";
import  _ from 'lodash';
import {DateTime} from "luxon";
import utilities from "@/mixins/utilities";
import SearchDialog from "@/views/admin_sds/flags/SearchDialog";


export default {
   name: "AdminFlags",
   mixins: [data_getters, utilities],
   components: {MyDropDown, myDatePicker, MyTextArea, tableFlags,SearchDialog},
   data(){
      return {


         show_search: false,
         search_results_msg: null,

         date_start: DateTime.local().minus({days:30}).toISO(),
         date_end: DateTime.local().toISO(),

         user_type: 'HANDLER',
         type_list: [
            {val: 'HANDLER', txt: 'Handler'},
            {val: 'TRAINER', txt: 'Trainer'},
            {val: 'SDS-ADMIN', txt: 'SDS Admins'},
            // {val: 'DOG', txt: 'Dog/Team'},
         ],

         status_list: [
            {val: 'Received', txt: 'Received'},
            {val: 'InReview', txt: 'In Review'},
            {val: 'Resolved', txt: 'Resolved'},

         ],

         name_first: null,
         name_last: null,
         email: null,

         dog_name: null,
         sds_num: null,


         flags: [],


         loading_flag: false,
         show_edit_flag: false,
         selected_flag: null,
         selected_flag_ix: -1,




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
      show_edit_flag(newVal){
         if (newVal === false){
            this.selected_flag = null;
            this.selected_flag_ix = -1;

            this.loading_flag = false;

         }
      }
   },

   methods: {

      clear_search(){
         this.search_query = null;
         this.search_results_msg = null;
         this.get_flags();
      },

      on_search(result){


         this.flags = result.data ;
         this.search_query = result.query;



         this.search_results_msg = '';

         let dr = result.query.date_range;
         let s1 = DateTime.fromISO(dr.start);
         let s2 = DateTime.fromISO(dr.stop);

         console.log({s2}, dr)

         if (s1.invalid !== null){
            s1 = '""'
         }
         else{
            s1 = s1.toFormat('M/d/yyyy');
         }

         if (s2.invalid !== null){
            s2 = '""'
         }
         else{
            s2 = s2.toFormat('M/d/yyyy');
         }



         // if (dr.start || dr.stop){
         //
         // }
         this.search_results_msg += `Date Range="${s1} to ${s2}", `;


         let q = result.query.query;
         if (q.cust_name_first ){
            this.search_results_msg += `First Name="${q.name_first}", `;
         }
         else{
            this.search_results_msg += `First Name="", `;
         }


         if (q.cust_name_last ){
            this.search_results_msg += `Last Name="${q.name_last}", `;
         }
         else{
            this.search_results_msg += `Last Name="", `;
         }


         // if (q.dog_name ){
         //    this.search_results_msg += `dog="${q.dog_name}", `
         // }
         // else{
         //    this.search_results_msg += `dog="", `
         // }
         //
         // if (q.sds_number ){
         //    this.search_results_msg += `SDS #="${q.sds_number}", `
         // }
         // else{
         //    this.search_results_msg += `SDS #="", `
         // }

         if (q.status ){
            this.search_results_msg += `status ="${q.status}", `
         }
         else{
            this.search_results_msg += `status ="", `
         }


      },








      on_click_flag(event){
         this.selected_flag = _.cloneDeep(event.flag);
         this.selected_flag_ix = event.ix;
         this.show_edit_flag = true;
      },

      //when a user's record is saved
      async on_record_update(){


         // this.flags[this.selected_flag_ix] = updated_flag;
         try{
            this.loading_flag = true;

            let flag = _.cloneDeep(this.selected_flag);
            delete flag.loc_name;

            await this.make_request('/admin/updateFlag', {flag});

            this.$set(this.flags, this.selected_flag_ix, this.selected_flag)
            this.selected_flag = null;
            this.selected_flag_ix = -1;
            this.show_edit_flag = false;

            this.loading_flag = false;
         }catch (e) {
            console.error(e);
         }




      },

      on_record_update_image(updated_flag){
         this.$set(this.flags, this.selected_flag_ix, updated_flag)

      },

      async get_flags(){

         let payload = {
            date_range: {
               start: this.date_start,
               stop: this.date_end,
            }
         };
         let data = await this.make_request('/admin/getFlagReports', payload);
         for (let i in data){
            if (data[i].user_id_FR.name_first == null){
               data[i].user_id_FR.name_first = '';
            }

            if (data[i].user_id_FR.name_last == null){
               data[i].user_id_FR.name_last = '';
            }

            data[i].loc_name = (data[i].user_id_FR.name_first + ' ' + data[i].user_id_FR.name_last).trim();
         }
         data.sort((a, b) => a.loc_name > b.loc_name ? 1 : -1);
         this.flags = data;
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
               await this.get_flags();
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
   },



   created(){
      this.get_flags();
      this.$store.commit("set_show_side_nav", true);

   }

}
</script>

<style scoped>

.edit-flag-heading{
    font-weight: 500;
    color: dimgrey;
}
</style>