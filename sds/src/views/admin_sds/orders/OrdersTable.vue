<template>
  <div>
    <div
      class="pa-2"
      style="display: flex; flex-wrap: wrap"
    />

    <div
      v-if="showBatch"
      class="mb-1"
    >
      <v-btn
        small
        @click="$emit('buy-checked-labels')"
      >
        Buy Labels for Checked
      </v-btn>
    </div>

    <table>
      <tr class="col-headers">
        <th>
          <v-checkbox
            v-model="check_all"
            hide-details
            dense
          />
        </th>
        <!--            <th>Order ID</th>-->
        <th>
          Date Ordered
          <sort-icon
            :sort-dir.sync="sortCols.date"
            @click="sort_handler('date', $event)"
          />
        </th>
        <th>
          Status
          <sort-icon
            :sort-dir.sync="sortCols.status"
            @click="sort_handler('status', $event)"
          />
        </th>
        <th>
          Customer
          <sort-icon
            :sort-dir.sync="sortCols.cust"
            @click="sort_handler('cust', $event)"
          />
        </th>
        <th>
          Order Total
          <sort-icon
            :sort-dir.sync="sortCols.total"
            @click="sort_handler('total', $event)"
          />
        </th>
        <th>
          Items
          <sort-icon
            :sort-dir.sync="sortCols.items"
            @click="sort_handler('items', $event)"
          />
        </th>
        <th>Processing</th>
        <th>Shipping</th>
        <th>Tracking</th>
        <th>
          <v-btn
            class="expand-colapse"
            icon
            @click="toggle_expand_all"
          >
            <v-icon>{{ all_expanded? 'unfold_less': 'unfold_more' }}</v-icon>
          </v-btn>
        </th>
      </tr>

      <template v-for="(order, ix) in orders">
        <!-----------------------main row-------------------------------------------------------->
        <tr
          :key="order._id"
          :class="[!order.loc_expanded && bottomBorder]"
        >
          <td>
            <v-checkbox
              v-model="order.loc_checked"
              hide-details
              dense
            />
          </td>

          <td>
            {{ fmt_datetime(order.date_ordered ) }}
          </td>

          <td style="text-transform: capitalize">
            <!--            {{order.status}}-->
            <StatusDropDown
              v-model="order.status"
              :list="status_list"
              :color-map="status_colors"
              :compact="true"
              :disabled="false"
              :loading="order.loc_loading"
              @input="update_order(order)"
            />
          </td>

          <!-- :loading="order.loc_loading" -->

          <td>
            <!--{{get_name_user(order.user_id_FR)}}-->
            {{ order.customer_info.name }}
          </td>

          <td>
            {{ fmt_number(order.order_total, {places: 2, prefix: '$'}) }}
          </td>
          <td>
            {{ order.items.length }}
          </td>

          <td>
            <v-btn
              small
              color="var(--color-btn)"
              class="white--text"
              disabled
            >
              Print Kit(s)
            </v-btn>
          </td>


          <td>
            <v-btn
              v-if="order.easypost.shipment.postage_label == null"
              class="buy-label"
              small
              color="var(--color-brand-accent-400)"
              :loading="order.loc_loading_label"
              @click="$emit('buy-label', order._id, ix)"
            >
              Buy Label
            </v-btn>

            <div
              v-else
              class="shippingCol"
            >
              <a
                v-if="order.easypost.shipment.postage_label.label_url"
                :href="order.easypost.shipment.postage_label.label_url"
                target="_blank"
              >png</a> /

              <a
                v-if="order.easypost.shipment.postage_label.label_pdf_url"
                :href="order.easypost.shipment.postage_label.label_pdf_url"
                target="_blank"
              >pdf</a>
            </div>
          </td>


          <td>
            <a
              v-if="has_tracking(order)"
              :href="order.easypost.tracker.public_url"
              target="_blank"
            >Track</a>
          </td>

          <td>
            <v-btn
            class="expand-colapse"
              icon
              @click="order.loc_expanded = !order.loc_expanded"
            >
              <v-icon>{{ order.loc_expanded? 'expand_less': 'expand_more' }}</v-icon>
            </v-btn>
          </td>
        </tr>

        <!-----------------------second row with item details------------------------------------------------>

        <tr
          v-if="order.loc_expanded"
          :key="order._id+'hidden'"
          :class="[order.loc_expanded && bottomBorder ]"
        >
          <td
            colspan="10"
            style="padding: 0px"
          >
            <div style="display: flex; margin-bottom: 10px; width: 100%;">
              <div style="background-color: white; width: 55px;" />

              <div
                class="pa-2"
                style="width: 100%;"
              >
                <div
                  v-for="(item, ix) in order.items"
                  :key="order._id+'hidden'+ix"
                  class=""
                  style="display: flex"
                >
                  <div>
                    <div>
                      Item {{ ix+1 }}:

                      <span
                        class="item-label"
                        style="font-weight: 500;  padding-right: 5px"
                      >
                        {{ item.name }} ({{ fmt_number(item.price, {places:2, prefix: '$'}) }} x {{ item.number }})
                      </span>
                    </div>
                    <div
                      v-if="show_details(item.item_key)"
                      style="font-size:11pt; padding-left: 50px; padding-bottom: 6px"
                    >
                      SDS-{{ item.details.dog_num }};
                      <span class="item-label">Handler</span>: {{ item.details.handler_name }};
                      <span class="item-label">Dog</span>: {{ item.details.dog_name }};
                      <span
                        v-if="item.details.trainer_name"
                        class="pl-1"
                      >
                        Trainer: {{ item.details.trainer_name }};
                      </span>

                      <span
                        v-if="item.details.aide_name"
                        class="pl-1"
                      >
                        Aide: {{ item.details.aide_name }};
                      </span>



                      <span v-if="item.item_key==='sds_certificate'" />
                      <template v-else>
                        <a
                          v-if="item.details.kit_image !== null"
                          :href="item.details.kit_image.Location"
                          target="_blank"
                        >
                          Get Image
                        </a>
                        <span v-else>No Image</span>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>
import utilities from "@/mixins/utilities";
import _ from 'lodash';
import data_getters from "@/mixins/data_getters";
import StatusDropDown from "@/components/inputs/StatusDropDown";
import SortIcon from "@/components/icons/SortIcon";

export default {
   name: "OrdersTable",
   components: {StatusDropDown, SortIcon},
   mixins: [data_getters, utilities],
   props: {
      orders: {type: Array, },
   },
   data(){
      return {
         check_all: false, //used to control if all rows should be checked
        bottomBorder: 'bottomBorder',


         status_list: [
            {txt: 'Open', val: 'Open'},
            {txt: 'Label Created', val: 'LabelCreated'},
            {txt: 'Processing', val: 'Processing'},
            {txt: 'Shipped', val: 'Shipped'},
            {txt: 'Delivered', val: 'Delivered'},
         ],

        status_colors: {
          Open: '#D2D2D7',
          LabelCreated: '#D2D2D7',
          Processing: '#82B6FA',
          Shipped: '#7FCC62',
          Delivered: '#7FCC62',
        },

         sortCols:{
            date: 'descending',
            status: 'none',
            cust: 'none',
            total: 'none',
            items: 'none',
         },


      }
   },

   computed:{
      showBatch(){
         let ans = false;

         for (let o of this.orders){
            if (o.loc_checked){
               ans = true;
               break;
            }
         }
         return ans;
      },

      all_expanded(){
         let ans = true;

         for (let o of this.orders){
            if (!o.loc_expanded){
               ans = false;
               break;
            }
         }
         return ans;
      }
   },


   watch: {

      check_all(newVal){
         if (newVal){
            for (let i in this.orders){
               this.orders[i].loc_checked = true;
            }
         }
         else{
            for (let i in this.orders){
               this.orders[i].loc_checked = false;
            }
         }
      }
   },

   methods:{



      show_details(key){
         return ['sds_full_kit', 'sds_certificate', 'sds_card'].includes(key)
      },


      has_tracking(order){

         let tmp = _.get(order, 'easypost.tracker.public_url', null);
         return tmp !== null;
      },

      get_row_bg_class(ix){
         if ( (ix % 2) === 0){
            return 'row-1'
         }
         else{
            return 'row-2'
         }
      },

      toggle_expand_all(){
         let val = false;
         if (this.all_expanded){
            val = false
         }
         else{
            val = true;
         }

         for (let o of this.orders){
            o.loc_expanded = val;
         }

      },


      /**
       *
       * @param col : string, key of this.sortCols
       * @param dir : string, sort direction emitted from sortIcon component
       */
      sort_handler(col, dir){


         //make all other cols not sorted
         let keys = Object.keys(this.sortCols);
         for (let k of keys){
            if (k !== col){
               this.sortCols[k] = 'none';
            }
         }

         //if sort set to none, sort by date
         if (dir === 'none'){
            this.orders = this.orders.sort((a, b) => a.date_ordered < b.date_ordered ? 1 : -1);
            this.sortCols.date = 'descending';
            return;
         }

         //sort rows by col

         let sortDir = 1;
         if (dir === 'descending'){
            sortDir = -1;
         }

         switch (col){
            case 'date':
               this.orders.sort((a, b) => a.date_ordered > b.date_ordered ? sortDir : -sortDir);
               break;

            case 'status':
               this.orders.sort((a, b) => a.status > b.status ? sortDir : -sortDir);
               break;

            case 'cust':
               // this.orders.sort((a, b) => this.get_name_user(a.user_id_FR) > this.get_name_user(b.user_id_FR) ? sortDir : -sortDir);
               this.orders.sort((a, b) => a.customer_info.name > b.customer_info.name ? sortDir : -sortDir);
               break;

            case 'total':
               this.orders.sort((a, b) => a.order_total > b.order_total ? sortDir : -sortDir);
               break;

            case 'items':
               this.orders.sort((a, b) => a.items.length > b.items.length ? sortDir : -sortDir);
               break;

         }

      }, //sort_handler()


      async update_order(item){
         try{
            item.loc_loading = true;
            let order = {
               _id: item._id,
               status: item.status,
            }
            await this.make_request('/admin/updateOrder', {order})

            item.loc_loading = false;

         }catch (e) {
            console.error(e);
         }
      }

   },




}
</script>

<style scoped>
tr.col-headers {

  background-color: #fff !important;
  box-shadow: 0px -1px 0px 0px #151B25 inset;
}

th, td {
  text-align: left;
  padding: 10px;
}
tr{

}

.item-label{
  color: dimgrey;
}

.bottomBorder{
  box-shadow: 0px -1px 0px 0px #A1A3A7 inset;
}

.shippingCol{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.buy-label{
  color: #1D1D1F !important;
}

.expand-colapse{
  background-color: #ffffff !important;
  color: #616165 !important;
}


/*tr:nth-child(odd) {*/
  /*   background-color: #e7f3fb;*/
  /*}*/

/*tr:nth-child(even) {*/
/*   background-color: #f7fbfd;*/
/*}*/


/*get rid of padding on checkbox component*/
tr >>> .v-input--selection-controls{
   margin-top: 0px;
}

/*th >>> .v-input--selection-controls{*/
/*   margin-top: 0px;*/
/*}*/

</style>
