<template>

      <v-dialog v-model="value2" max-width="400px" content-class="my-dialog-customizations"  persistent>
         <v-card class="pa-3" style="">

            <div class="dialog-heading" style="display: flex">
               Advanced Search
               <v-spacer/>
               <v-btn icon @click="value2=false" style="margin-top: -10px; margin-right: -5px">
                  <v-icon>close</v-icon>
               </v-btn>
            </div>



            <div style="display: flex; margin-top: 20px">
               <my-date-picker

                   label="Date From"
                   readonly
                   v-model="date_start"
                   clearable

                  />
               <my-date-picker
                   class="ml-2"
                   label="Date to"
                   readonly
                   v-model="date_end"
                   clearable
               />
            </div>


            <div>
               <my-form>
                  <my-text-input
                      label="First Name"
                      v-model="first_name"
                      @keyup-enter="search"
                      clearable
                  />
                  <my-text-input
                      label="Last Name"
                      v-model="last_name"
                      @keyup-enter="search"
                      clearable
                  />

                  <!--<my-text-input-->
                  <!--    label="Dog's Name"-->
                  <!--    v-model="dog_name"-->
                  <!--    @keyup-enter="search"-->
                  <!--    clearable-->
                  <!--/>-->

                  <!--<my-text-input-->
                  <!--    label="SDS Number"-->
                  <!--    v-model="sds_number"-->
                  <!--    @keyup-enter="search"-->
                  <!--    clearable-->
                  <!--/>-->

                  <my-drop-down
                      label="Status"
                      v-model="status"
                      :list="status_list"
                      item-text="txt"
                      item-value="val"
                      clearable
                  />

               </my-form>


               <div v-if="err_msg" style="color: var(--color-input-error); text-align: center" class="mt-3">
                  {{err_msg}}
               </div>
               <v-row class="ma-0" style="padding: 10px 0px;">
                  <v-spacer/>

                  <v-btn @click="search">Search</v-btn>
               </v-row>
            </div>




<!--            <div class="dialog-heading"  v-if="show_results" >-->
<!--               Search Results-->
<!--            </div>-->



<!--            <div v-if="show_results" style="max-height: 50vh; overflow-y: auto" >-->

<!--               <div v-if="teams.length === 0" style="text-align: center; margin-top: 10px">-->
<!--                  No Teams found-->
<!--               </div>-->

<!--               <div-->
<!--                   v-for="item in teams" :key="item._id"-->
<!--                   style="border: 1px solid #d7d7d7;"-->
<!--                   class="pa-2 mt-2"-->
<!--               >-->
<!--                  <a style="display: flex; text-decoration: none; color: inherit"-->
<!--                     :href="'/team/'+item.dog_num"-->
<!--                       target="_blank"-->
<!--                  >-->
<!--                     <div style="display: flex; flex-direction: column; align-items: center">-->
<!--                        <avatar-->
<!--                            profile-type="user"-->
<!--                            :profile="item.handler_id_FR"-->
<!--                            image-only-->
<!--                            size="50"-->
<!--                        />-->
<!--                        {{get_name_user(item.handler_id_FR)}}-->
<!--                     </div>-->

<!--                     <div style="display: flex; flex-direction: column; align-items: center">-->
<!--                        <avatar profile-type="dog" :profile="item" image-only size="50"/>-->
<!--                        {{item.name}}-->
<!--                     </div>-->

<!--                  </a>-->
<!--               </div>-->
<!--            </div>-->

         </v-card>
      </v-dialog>







</template>

<script>
import data_getters from "@/mixins/data_getters";
import utilities from "@/mixins/utilities";
import myDatePicker from "@/components/inputs/myDatePicker";
import MyDropDown from "@/components/inputs/MyDropDown";

import {DateTime} from 'luxon';

export default {
   name: "AdminFlagSearch",
   components: {myDatePicker, MyDropDown},
   mixins: [data_getters, utilities],
   props: {
      value: {type: Boolean},
   },
   data(){
      return {
         value2: this.value,

         show_results: false,

         teams: [],

         date_start: DateTime.local().minus({days:30}).toISO(),
         date_end: DateTime.local().toISO(),

         first_name: null,
         last_name: null,
         dog_name: null,
         sds_number: null,
         status: null,

         loading_data: false,


         status_list: [
            {val: 'Received', txt: 'Received'},
            {val: 'InReview', txt: 'In Review'},
            {val: 'Resolved', txt: 'Resolved'},

         ],

         err_msg: null,
      }
   },

   watch:{
      value(newVal){
         if (newVal !== this.value2){
            this.value2 = newVal;
         }
      },

      value2(newVal){
         this.$emit('input', newVal);
      }
   },
   methods:{
      async search(){
         this.err_msg = null;

         this.loading_data = true;
         try{
            let payload = {
               query:{
                  name_first: this.first_name,
                  name_last: this.last_name,
                  // dog_name: this.dog_name,
                  // sds_number: this.sds_number,
                  status: this.status,
               },
               date_range: {
                  start: this.date_start,
                  stop: this.date_end,
               }
            };

            let data = await this.make_request('/admin/getFlagReports', payload);

            this.$emit('searched', {data, query: payload});
            this.loading_data = true;

            this.value2 = false;

         }
         catch (e){
            console.log(e)
            if (e.status === 400){
               this.err_msg = 'Please enter at least one value to search for.'
            }
         }
      },



   },


}
</script>

<style scoped>
div >>> .my-dialog-customizations{
   transform: translateY(-100px);
}


</style>

