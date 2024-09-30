<template>
   <div>
      <search-dialog v-model="show_search" @searched="on_search" />
      <my-show-error v-model="dialog_show_error" :error="show_error_obj" />

      <div class="page-title-app">
         Manage Orders
      </div>

      <div class="content-container-bg">
         <div class="admin-content-container" style="height: 70vh;">
            <div style="display: flex; gap: 16px;">
               <my-date-picker v-model="date_start" style="width: 150px; height: 44px !important;" label="Date From"
                  readonly :on-change="get_orders" />

               <my-date-picker v-model="date_end" class="ml-2" style="width: 150px" label="Date To" readonly
                  :on-change="get_orders" />

               <v-btn :loading="loading_download" plain class="custom-button" @click="download_data">
                  Download
               </v-btn>

               <v-btn plain class="custom-button" @click="show_search = true">
                  <v-icon class="icon">
                     search
                  </v-icon>Advanced Search
               </v-btn>
            </div>

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
         date_start: DateTime.local().minus({ year: 5 }).toISO(), // TODO: change back to 1 month after dev is done
         date_end: DateTime.local().toISO(),
         search_query: null,
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
      async on_search(result) {
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

         if (s1.invalid !== null) {
            s1 = '""'
         } else {
            s1 = s1.toFormat('M/d/yyyy');
         }

         if (s2.invalid !== null) {
            s2 = '""'
         } else {
            s2 = s2.toFormat('M/d/yyyy');
         }

         this.search_results_msg += `Date Range="${s1} to ${s2}", `;

         let q = result.query.query;
         this.search_results_msg += `First Name="${q.cust_name_first || ""}", `;
         this.search_results_msg += `Last Name="${q.cust_name_last || ""}", `;
         this.search_results_msg += `dog="${q.dog_name || ""}", `;
         this.search_results_msg += `SDS #="${q.sds_number || ""}", `;
         this.search_results_msg += `status ="${q.status || ""}", `;
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
               if (order.easypost.shipment.postage_label == null) {
                  this.on_buy_label(order._id, i);
               } else {
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

<style scoped>
/* Ensure that styles are applied to the text inside the button content */
::v-deep .custom-button>.v-btn__content {
   color: #000000DE !important;
   /* Force text color to black */
}

/* For the icon inside the custom button */
::v-deep .custom-button .icon {
   color: #0066DF !important;
}

::v-deep .custom-button {
   border-radius: 4px !important;
   border: 2px solid var(--Button-form-button, #0066DF) !important;
   color: black !important;
   /* Ensuring the text is black */
   height: 44px !important;
   line-height: 44px !important;
   font-size: 17px;
   font-weight: 500;
}

::v-deep .custom-button .icon {
   color: #0066DF !important;
}

.ml-2 {
   margin-left: 0 !important;
}
</style>
