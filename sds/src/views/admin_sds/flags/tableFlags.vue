<template>
  <div>
    <div
      class="pa-2"
      style="display: flex; flex-wrap: wrap"
    />


    <table>
      <tr class="col-headers">
        <th />
        <th>
          Flag Date
          <sort-icon
            :sort-dir.sync="sortCols.date"
            @click="sort_handler('date', $event)"
          />
        </th>
        <th>
          Flagged User
          <!--<sort-icon :sort-dir.sync="sortCols.name_first" @click="sort_handler('name_first', $event)"/>-->
        </th>
        <th>
          Flagger
          <!--<sort-icon :sort-dir.sync="sortCols.name_last" @click="sort_handler('name_last', $event)" />-->
        </th>
        <th>
          Flag Message
        </th>

        <th>
          Comment
          <!--<sort-icon :sort-dir.sync="sortCols.cust" @click="sort_handler('cust', $event)" />-->
        </th>

        <th>
          Status
        </th>
      </tr>

      <template v-for="(flag, ix) in flags">
        <!-----------------------main row-------------------------------------------------------->
        <tr
          :key="flag._id"
          :class="get_row_bg_class(ix)"
          @click="$emit('click-flag', {flag, ix})"
        >
          <td>{{ ix+1 }}</td>

          <td>
            {{ fmt_date(flag.date_created ,{fmt: 'MM/dd/yyyy'}) }}
          </td>
          <td>
            <!--{{flag.loc_name}}-->
            {{ flag.user_id_FR.account_type }}
            <avatar
              :profile="flag.user_id_FR"
              size="40"
            />
          </td>


          <td>
            <div>
              {{ flag.flag_request.flagger_name }}
            </div>
            <div>
              {{ flag.flag_request.flagger_email }}
            </div>
          </td>

          <td style="max-width: 300px; font-size: 10pt">
            {{ fmt_trim_str(flag.flag_request.flagger_message, 100) }}
          </td>

          <td style="max-width: 300px; font-size: 10pt">
            {{ fmt_trim_str(flag.comments, 100) }}
          </td>

          <td>
            {{ flag.status }}
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
   name: "TableFlags",
   components: {StatusDropDown, SortIcon},
   mixins: [data_getters, utilities],
   props: {
      flags: {type: Array, },
   },
   data(){
      return {
         check_all: false, //used to control if all rows should be checked

         status_list: [
            {txt: 'Received', val: 'Received'},
            {txt: 'Printed', val: 'Printed'},
            {txt: 'Ready To Ship', val: 'ReadyToShip'},
            {txt: 'Shipped', val: 'Shipped'},
            {txt: 'In Transit', val: 'InTransit'},
            {txt: 'Out For Delivery', val: 'OutForDelivery'},
            {txt: 'Delivered', val: 'Delivered'},
         ],

         status_colors: {
            Received: '#c86464',
            Printed: '#cba638',
            ReadyToShip: '#9ec437',
            Shipped: '#9ec437',
            InTransit: '#9ec437',
            OutForDelivery: '#9ec437',
            Delivered: '#32c318',
         },

         sortCols:{
            date: 'descending',
            name_first: 'none',
            name_last: 'none',
         },


      }
   },

   computed:{
      // showBatch(){
      //    let ans = false;
      //
      //    for (let o of this.flags){
      //       if (o.loc_checked){
      //          ans = true;
      //          break;
      //       }
      //    }
      //    return ans;
      // },
      //
      // all_expanded(){
      //    let ans = true;
      //
      //    for (let o of this.flags){
      //       if (!o.loc_expanded){
      //          ans = false;
      //          break;
      //       }
      //    }
      //    return ans;
      // }
   },


   watch: {

      check_all(newVal){
         if (newVal){
            for (let i in this.flags){
               this.flags[i].loc_checked = true;
            }
         }
         else{
            for (let i in this.flags){
               this.flags[i].loc_checked = false;
            }
         }
      }
   },

   methods:{
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

         for (let o of this.flags){
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
               console.log('debug', k)
            }
         }





         //sort rows by col

         let sortDir = 1;
         if (dir === 'descending'){
            sortDir = -1;
         }



         console.log({col, sortDir})


         switch (col){
            case 'date':
               this.flags.sort((a, b) => a.date_created > b.date_created ? sortDir : -sortDir);
               break;

            case 'name_last':
               this.flags.sort((a, b) => a.name_last > b.name_last ? sortDir : -sortDir);
               break;

            case 'name_first':
               this.flags.sort((a, b) => a.name_first > b.name_first ? sortDir : -sortDir);
               break;


            // case 'status':
            //    this.flags.sort((a, b) => a.status > b.status ? sortDir : -sortDir);
            //    break;
            //
            // case 'cust':
            //    this.flags.sort((a, b) => this.get_name_user(a.user_id_FR) > this.get_name_user(b.user_id_FR) ? sortDir : -sortDir);
            //    break;
            //
            // case 'total':
            //    this.flags.sort((a, b) => a.order_total > b.order_total ? sortDir : -sortDir);
            //    break;
            //
            // case 'items':
            //    this.flags.sort((a, b) => a.items.length > b.items.length ? sortDir : -sortDir);
            //    break;

         }








      }, //sort_handler()


   },




}
</script>

<style scoped>
tr.col-headers {

   background-color: #b7dbf1 !important;
   /*background-color: #e0b7f1 !important;*/
}

th, td {
   text-align: left;
   padding: 10px;
}



.row-1{
   background-color: #f7fbfd;
}
.row-2{
   background-color: #e7f3fb;
}



.item-label{
   color: dimgrey;
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
