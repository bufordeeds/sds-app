<template>
  <div>
    <div
      class="pa-2"
      style="display: flex; flex-wrap: wrap"
    />


    <table>
      <tr class="col-headers">
        <th />
        <th />
        <th>
          First Name
          <sort-icon
            :sort-dir.sync="sortCols.name_first"
            @click="sort_handler('name_first', $event)"
          />
        </th>
        <th>
          Last Name
          <sort-icon
            :sort-dir.sync="sortCols.name_last"
            @click="sort_handler('name_last', $event)"
          />
        </th>
        <th>
          User Type
        </th>

        <th>
          Active?
          <!--<sort-icon :sort-dir.sync="sortCols.cust" @click="sort_handler('cust', $event)" />-->
        </th>
        <th>
          Email
        </th>

        <th>Admin Deactivated</th>

        <th>Comments</th>
      </tr>

      <template v-for="(user, ix) in users">
        <!-----------------------main row-------------------------------------------------------->
        <tr
          :key="user._id"
          :class="get_row_bg_class(ix)"
        >
          <td>{{ ix+1 }}</td>
          <td>
            <div @click="$emit('click-user', {user, ix})">
              <avatar
                :image="user.profile_image"
                size="40"
                style="cursor: pointer"
              />
              <div class="edit-btn">
                Edit
              </div>
            </div>
          </td>
          <td>
            <!--{{fmt_datetime(order.date_ordered )}}-->
            {{ user.name_first }}
          </td>
          <td>
            <!--{{fmt_datetime(order.date_ordered )}}-->
            {{ user.name_last }}
          </td>

          <td style="text-transform: capitalize">
            {{ user.account_type }}
            <!--<StatusDropDown-->
            <!--    v-model="order.status"-->
            <!--    :list="status_list"-->
            <!--    :color-map="status_colors"-->
            <!--    :compact="true"-->
            <!--    :disabled="true"-->
            <!--/>-->
          </td>


          <td style="text-transform: capitalize">
            {{ user.account_status.date_accepted != null? 'Yes' : 'No' }}
          </td>

          <td>
            {{ user.email }}
          </td>

          <td>
            <status
              v-if="user.deactivated != null"
              v-model="user.deactivated"
              style="width: 180px;"
              :list="[{txt: 'Deactivated', val: true}, {txt: 'Reactivated', val: false},]"
              item-text="txt"
              item-value="val"
              :color-map="{'true': '#bf1e2e', 'false': '#8dc63f' }"
              compact
              disabled
            />
          </td>

          <td @click.stop="$emit('edit-comment', {user, ix})">
            <span v-if="user.admin">
              {{ fmt_trim_str(user.admin.comment, 50) }}
            </span>

            <v-btn
              icon
              small
              style="border-radius: 50%"
            >
              <v-icon small>
                edit
              </v-icon>
            </v-btn>
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
import status from "@/components/inputs/StatusDropDown";
import SortIcon from "@/components/icons/SortIcon";

export default {
   name: "TableUsers",
   components: {status, SortIcon},
   mixins: [data_getters, utilities],
   props: {
      users: {type: Array, },
   },
   data(){
      return {
         check_all: false, //used to control if all rows should be checked

         status_list: [
            { txt: 'Open', val: 'Open' },
            { txt: 'Label Created', val: 'LabelCreated' },
            { txt: 'Processing', val: 'Processing' },
            { txt: 'Shipped', val: 'Shipped' },
            { txt: 'Delivered', val: 'Delivered' },
         ],

         status_colors: {
            Open: '#D2D2D7',
            LabelCreated: '#cba638',
            Processing: '#82B6FA',
            Shipped: '#7FCC62',
            Delivered: '#7FCC62',
         },

         sortCols:{
            name_first: 'ascending',
            name_last: 'none',
         },


      }
   },

   computed:{
      // showBatch(){
      //    let ans = false;
      //
      //    for (let o of this.users){
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
      //    for (let o of this.users){
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
            for (let i in this.users){
               this.users[i].loc_checked = true;
            }
         }
         else{
            for (let i in this.users){
               this.users[i].loc_checked = false;
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

         for (let o of this.users){
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
            case 'name_last':
               this.users.sort((a, b) => a.name_last > b.name_last ? sortDir : -sortDir);
               break;

            case 'name_first':
               this.users.sort((a, b) => a.name_first > b.name_first ? sortDir : -sortDir);
               break;


            // case 'status':
            //    this.users.sort((a, b) => a.status > b.status ? sortDir : -sortDir);
            //    break;
            //
            // case 'cust':
            //    this.users.sort((a, b) => this.get_name_user(a.user_id_FR) > this.get_name_user(b.user_id_FR) ? sortDir : -sortDir);
            //    break;
            //
            // case 'total':
            //    this.users.sort((a, b) => a.order_total > b.order_total ? sortDir : -sortDir);
            //    break;
            //
            // case 'items':
            //    this.users.sort((a, b) => a.items.length > b.items.length ? sortDir : -sortDir);
            //    break;

         }








      }, //sort_handler()


   },




}
</script>

<style scoped>

.edit-btn{
    font-size: 8pt;
    text-align: center;
    cursor: pointer;
}


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
