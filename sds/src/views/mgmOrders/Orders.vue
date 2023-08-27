<template>
   <div>


      <div class="page-title-app">
         My Orders
      </div>
      <div class="content-container-bg">


         <div class="order-container" v-for="order in orders" :key="order._id">

            <!---------------order header details ----------------------------------------------------->
            <v-row dense class="order-header ma-0">
               <v-col md="2" order-md="1" order="3">
                  <div class="order-header-label">
                     ORDER PLACED
                  </div>
                  <div class="order-header-value">

                     {{fmt_date(order.date_ordered)}}
                  </div>
               </v-col>

               <v-col md="2" order-md="2" order="4">
                  <div class="order-header-label">
                     TOTAL
                  </div>
                  <div class="order-header-value">
                     {{fmt_number(order.order_total, {prefix: '$', places:2})}}
                  </div>

                  <div class="order-header-value" style="font-size: 10pt">
                     {{get_pmt_info(order)}}
                  </div>
               </v-col>

               <v-col cols="12" sm="6" md="4" order-md="3" order="2">
                  <div class="order-header-label">
                     SHIP TO
                  </div>
                  <div class="order-header-value" style="font-size:10pt">
                     <div>
                        {{order.easypost.shipment.to_address.street1}}
                     </div>
                     <div>
                        {{order.easypost.shipment.to_address.city}}, {{order.easypost.shipment.to_address.state}}
                        {{order.easypost.shipment.to_address.zip}}
                     </div>

                  </div>
               </v-col>

               <v-col cols="12" sm="6" md="4" order-md="4" order="1">
                  <div class="order-header-label">
                     <div >
                        ORDER NUMBER
                     </div>
                  </div>
                  <div class="order-header-value" style="font-size: 10pt">
                     {{order._id}}
                  </div>
               </v-col>


            </v-row>


            <!---------------order main details ----------------------------------------------------->
            <div class="order-body" >

               <div class="status-text" :style="{'flex-direction': $vuetify.breakpoint.smAndUp? 'row': 'column'}">
                  <status-line
                      style="margin-top: -20px; margin-bottom: -50px"
                      :width="$vuetify.breakpoint.width > 350? 250: 200"
                      :status="order.status"/>

                  <v-spacer />

                  <a :href="tracking_url(order)" target="_blank" v-if="tracking_url(order)!==null"
                     :style="{'margin-top': $vuetify.breakpoint.smAndUp? '0': '50px'}"
                  >
                     <span v-if="order.status !== 'Delivered'">
                     Track Package
                     </span>
                     <span v-else>
                        Detailed Tracking
                     </span>
                  </a>
               </div>

               <div v-if="order.status === 'Delivered'" class="mt-4">
                  {{status_txt(order)}}
               </div>

               <div v-else class="mt-4" style="height: 10px">

               </div>

               <v-divider class="mt-3 mb-4"></v-divider>

               <item-box
                   v-for="(item, ix) in order.items" :key="order._id  + ix"
                   style="width: 100%"
                   :item="item"
                   :show-actions="false"
               />


            </div>
         </div>
         <!--order container-->

      </div>
   </div>
</template>

<script>
import ItemBox from "@/views/shop/ItemBox";
import data_getters from "@/mixins/data_getters";
import utilities from "@/mixins/utilities";
import StatusLine from "@/components/StatusLine";


import _ from 'lodash';
import {DateTime} from "luxon";

export default {
   name: "Orders",
   mixins: [data_getters, utilities],
   components: {ItemBox, StatusLine},
   data(){
      return {
         orders: [],
      }
   },



   methods: {
      async get_my_orders(){
         this.orders = await this.make_request('/store/getMyOrders');
      },


      get_pmt_info(order){
         let charges = _.get(order, 'stripe_info.payment_intent.charges.data', []);

         let ans = ''
         if (charges.length > 0){

            ans += charges[0].payment_method_details.card.network.toUpperCase();
            ans += ' *';
            ans += charges[0].payment_method_details.card.last4;

         }

         return ans;

      },

      status_txt(order){
         let status = order.status;

         let date_delivered = '';
         if (status === 'Delivered'){
            let n = order.easypost.tracker.tracking_details.length;
            date_delivered = order.easypost.tracker.tracking_details[n-1].datetime;
            date_delivered = DateTime.fromISO(date_delivered).toFormat('M/d/yyyy, h:mm a');
         }

         let ans = {
            Received : 'Order received, waiting to be processed.',
            processing : 'Order is currently being processed.',
            ReadyToShip : 'Order is currently being processed.',
            Shipped : 'Order has shipped.',
            InTransit : 'Order is in transit.',
            OutForDelivery : 'Order is out for delivery',
            Delivered : `Order was delivered on ${date_delivered}`
         }

         return ans[status];
      },

      tracking_url(order){

         let tracker = _.get(order, 'easypost.tracker', null);
         if (tracker === null){
            return null
         }
         else{
            return tracker.public_url;
         }
      },

      to_address(order){
         let address = order.easypost.shipment.to_address;
         let ans = address.street1;

         if (address.street2 !== ''){
            ans += ', ' + address.street2
         }

         ans += ', ' + address.city;
         ans += ', ' + address.state
         ans += ' ' + address.zip

         return ans;

      }

   },

   created(){
      this.$store.commit("set_show_side_nav", true);
      this.get_my_orders();
   },


}
</script>

<style scoped>
@import url('../mgmProfile/mgm_common.css');

.order-container{
   background-color: white;
   width: 100%;
   max-width: 1000px;
   margin-bottom: 30px;
}

.order-header{
   /*background-color: #e7f3fb;*/
   background-color: #b7dbf1;
   padding: 10px 20px 10px 20px;
   display: flex;

}

.order-header-label{
   font-weight: 500;
}


.order-body{
   padding: 20px;

}

.status-text{
   font-weight: 600;
   color: var(--color-txt-grey1);
   display: flex;
}

.item-container{
   display: flex;
   margin-bottom: 15px;
   padding-top: 10px;
   padding-bottom: 10px;
   background-color: #f5fafd;

}
</style>