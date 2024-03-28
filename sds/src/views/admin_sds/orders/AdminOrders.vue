<template>
   <div>
      <search-dialog v-model="show_search" @searched="on_search" />
      <my-show-error v-model="dialog_show_error" :error="show_error_obj" />



      <div class="page-title-app">
         Manage Orders
      </div>

      <div class="content-container-bg">
         <div class="admin-content-container">
            <div style="display: flex">
               <my-date-picker v-model="date_start" style="width: 150px" label="Date From" readonly
                  :on-change="get_orders" />

               <my-date-picker v-model="date_end" class="ml-2" style="width: 150px" label="Date To" readonly
                  :on-change="get_orders" />

               <!--               <div style="width: 250px">-->
               <!--                  <v-text-field-->
               <!--                      v-model="search_txt"-->
               <!--                      class="ml-2"-->
               <!--                      label="search"-->
               <!--                      outlined-->
               <!--                      dense-->
               <!--                      hide-details-->
               <!--                      append-icon="search"-->
               <!--                      clearable-->
               <!--                  ></v-text-field>-->
               <!--               </div>-->

               <!--               <div style="width: 200px">-->
               <!--                  <v-select-->
               <!--                      class="ml-2"-->
               <!--                      label="Field"-->
               <!--                      outlined-->
               <!--                      dense-->
               <!--                      hide-details-->
               <!--                      v-model="search_field"-->
               <!--                      :items="['Customer', 'Dog Name', ]"-->
               <!--                  ></v-select>-->
               <!--               </div>-->



               <v-btn :loading="loading_download" plain class="ml-3 v-btn--outlined admin-button" @click="download_data">
                  Download
               </v-btn>

               <v-btn plain class="ml-3 v-btn--outlined admin-button" @click="show_search = true">
                  <v-icon>search</v-icon>Search
               </v-btn>
            </div>



            <!--            <div style="display: flex" class="mt-3">-->
            <!--               <v-btn small @click="download_data" :loading="loading_download"-->
            <!--               >Download CSV</v-btn>-->
            <!--            </div>-->



            <template v-if="search_results_msg !== null">
               <div style="background-color: #eaeaea; " class="mt-4 pl-2 pr-2 pt-1 pb-1">
                  Search Results For: {{ search_results_msg }}
                  <v-spacer />
                  <v-btn class="mt-2" small @click="clear_search">
                     Clear Results
                  </v-btn>
               </div>
            </template>






            <orders-table :orders="orders" @buy-label="on_buy_label" @buy-checked-labels="buy_labels_bulk" />
         </div>
      </div>
   </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import utilities from "@/mixins/utilities";
import _ from 'lodash';

import { DateTime } from 'luxon';

import OrdersTable from "@/views/admin_sds/orders/OrdersTable";
import SearchDialog from "@/views/admin_sds/orders/SearchDialog";
import myDatePicker from "@/components/inputs/myDatePicker";


export default {
   name: "AdminOrders",
   components: { OrdersTable, myDatePicker, SearchDialog },
   mixins: [data_getters, utilities],
   data() {
      return {
         orders: [],

         loading_download: false,
         date_start: DateTime.local().minus({ days: 30 }).toISO(),
         date_end: DateTime.local().toISO(),

         // search_txt: null,
         // search_field: 'Customer',

         search_query: null, //used to align downloads with search terms

         show_search: false,

         search_results_msg: null,

         dialog_show_error: false,
         show_error_obj: null,
      }
   },

   created() {
      this.$store.commit("set_show_side_nav", true);
      this.get_orders();
   },


   methods: {

      on_search(result) {

         for (let i in result.data) {
            result.data[i].loc_checked = false;
            result.data[i].loc_loading_label = false;
            result.data[i].loc_expanded = false;
         }

         this.orders = result.data;
         this.search_query = result.query;



         this.search_results_msg = '';

         let dr = result.query.date_range;
         let s1 = DateTime.fromISO(dr.start);
         let s2 = DateTime.fromISO(dr.stop);

         console.log({ s2 }, dr)

         if (s1.invalid !== null) {
            s1 = '""'
         }
         else {
            s1 = s1.toFormat('M/d/yyyy');
         }

         if (s2.invalid !== null) {
            s2 = '""'
         }
         else {
            s2 = s2.toFormat('M/d/yyyy');
         }



         // if (dr.start || dr.stop){
         //
         // }
         this.search_results_msg += `Date Range="${s1} to ${s2}", `;


         let q = result.query.query;
         if (q.cust_name_first) {
            this.search_results_msg += `First Name="${q.cust_name_first}", `;
         }
         else {
            this.search_results_msg += `First Name="", `;
         }


         if (q.cust_name_last) {
            this.search_results_msg += `Last Name="${q.cust_name_last}", `;
         }
         else {
            this.search_results_msg += `Last Name="", `;
         }


         if (q.dog_name) {
            this.search_results_msg += `dog="${q.dog_name}", `
         }
         else {
            this.search_results_msg += `dog="", `
         }

         if (q.sds_number) {
            this.search_results_msg += `SDS #="${q.sds_number}", `
         }
         else {
            this.search_results_msg += `SDS #="", `
         }

         if (q.status) {
            this.search_results_msg += `status ="${q.status}", `
         }
         else {
            this.search_results_msg += `status ="", `
         }


      },

      clear_search() {
         this.search_query = null;
         this.get_orders();
      },

      async get_orders() {
         try {


            let payload = {
               date_range: {
                  start: this.date_start,
                  stop: this.date_end,
               }
            };
            let tmp = await this.make_request('/admin/getOrders', payload);
            for (let i in tmp) {
               tmp[i].loc_checked = false;
               tmp[i].loc_loading_label = false;
               tmp[i].loc_expanded = false;
               tmp[i].loc_loading = false;
            }

            this.search_results_msg = null;
            this.orders = tmp;
         } catch (e) {
            console.log(e)
         }
      },

      status_txt(order) {
         let status = order.status;

         let date_delivered = _.get(order, 'date_delivered', '')

         let ans = {
            received: 'Order received, waiting to be processed.',
            processing: 'Order is currently being processed.',
            shipped: 'Order has shipped.',
            delivered: `Order was delivered on ${date_delivered}`
         }

         return ans[status];
      },



      async on_buy_label(order_id, ix) {
         this.orders[ix].loc_loading_label = true;
         try {


            let order = await this.make_request('/admin/buyPostageForOrder', { order_id, action: 'BUY_POSTAGE' });

            console.log({ order });

            // await this.get_orders();
            this.orders[ix].easypost = order.easypost;
            this.orders[ix].status = order.status;
            this.orders[ix].loc_loading_label = false;
         } catch (e) {
            console.log(e)
            this.form_error = this.show_error_details(e, 'Buy label');
         }
      },


      buy_labels_bulk() {

         for (let i = 0; i < this.orders.length; i++) {
            let order = this.orders[i];

            if (order.loc_checked) {
               console.log('checked', i)
               if (order.easypost.shipment.postage_label == null) {
                  console.log(i, 'Buying postage')
                  this.on_buy_label(order._id, i);
               }
               else {
                  console.log(i, 'postage already purchased')
               }


            }
         }
      },


      async download_data() {

         this.loading_download = true;
         try {
            let payload = {
               date_range: {
                  start: this.date_start,
                  stop: this.date_end,
               }
            };

            if (this.search_query !== null) {
               payload = this.search_query;
            }

            let tmp = await this.make_request('/admin/downloadOrders', payload, { responseType: 'blob' });

            let filename = 'orders.zip';

            const url = URL.createObjectURL(new Blob([tmp]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);

            document.body.appendChild(link);
            link.click();
            link.remove();

            this.loading_download = false;

         } catch (e) {
            console.log(e)
         }
      },


   }
}
</script>

<style scoped src="../admin.css" />
<style scoped>
/*.order-container{*/
/*  background-color: white;*/
/*  width: 100%;*/
/*  max-width: 1000px;*/
/*  margin-bottom: 30px;*/
/*}*/

/*.order-header{*/
/*  !*background-color: #e7f3fb;*!*/
/*  background-color: #b7dbf1;*/
/*  padding: 10px 20px 10px 20px;*/
/*  display: flex;*/

/*}*/

/*.order-header-label{*/
/*  font-weight: 500;*/
/*}*/


/*.order-body{*/
/*  padding: 20px;*/

/*}*/

/*.status-text{*/
/*  font-weight: 600;*/
/*  color: var(--color-txt-grey1);*/
/*  display: flex;*/
/*}*/

/*.item-container{*/
/*  display: flex;*/
/*  margin-bottom: 15px;*/
/*  padding-top: 10px;*/
/*  padding-bottom: 10px;*/
/*  background-color: #f5fafd;*/

/*}*/
</style>