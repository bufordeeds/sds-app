<template>
  <v-dialog
    v-model="value2"
    max-width="400px"
    content-class="my-dialog-customizations"
    persistent
  >
    <v-card
      class="pa-3"
      style=""
    >
      <div
        class="dialog-heading"
        style="display: flex"
      >
        Advanced Search
        <v-spacer />
        <v-btn
          icon
          style="margin-top: -10px; margin-right: -5px"
          @click="value2=false"
        >
          <v-icon>close</v-icon>
        </v-btn>
      </div>



      <div style="display: flex; margin-top: 20px">
        <my-date-picker

          v-model="date_start"
          label="Date From"
          readonly
          clearable
        />
        <my-date-picker
          v-model="date_end"
          class="ml-2"
          label="Date to"
          readonly
          clearable
        />
      </div>


      <div>
        <my-form>
          <my-text-input
            v-model="first_name"
            label="Customer's First Name"
            clearable
            @keyup-enter="search"
          />
          <my-text-input
            v-model="last_name"
            label="Customer's Last Name"
            clearable
            @keyup-enter="search"
          />

          <my-text-input
            v-model="dog_name"
            label="Dog's Name"
            clearable
            @keyup-enter="search"
          />

          <my-text-input
            v-model="sds_number"
            label="SDS Number"
            clearable
            @keyup-enter="search"
          />

          <my-drop-down
            v-model="status"
            label="Status"
            :list="status_list"
            item-text="txt"
            item-value="val"
            clearable
          />
        </my-form>


        <div
          v-if="err_msg"
          style="color: var(--color-input-error); text-align: center"
          class="mt-3"
        >
          {{ err_msg }}
        </div>
        <v-row
          class="ma-0"
          style="padding: 10px 0px;"
        >
          <v-spacer />

          <v-btn @click="search">
            Search
          </v-btn>
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
   name: "AdminOrdersSearch",
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
            {txt: 'Received', val: 'Received'},
            {txt: 'Printed', val: 'Printed'},
            {txt: 'Ready To Ship', val: 'ReadyToShip'},
            {txt: 'Shipped', val: 'Shipped'},
            {txt: 'In Transit', val: 'InTransit'},
            {txt: 'Out For Delivery', val: 'OutForDelivery'},
            {txt: 'Delivered', val: 'Delivered'},
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
                  cust_name_first: this.first_name,
                  cust_name_last: this.last_name,
                  dog_name: this.dog_name,
                  sds_number: this.sds_number,
                  status: this.status,
               },
               date_range: {
                  start: this.date_start,
                  stop: this.date_end,
               }
            };

            let data = await this.make_request('/admin/getOrders', payload);

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

      on_click_dog(dog){
         this.$router.push('/team/' + dog.dog_num);
      }

   },


}
</script>

<style scoped>
div >>> .my-dialog-customizations{
   transform: translateY(-100px);
}


</style>

