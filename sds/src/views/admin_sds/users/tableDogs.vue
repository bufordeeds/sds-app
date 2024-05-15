<template>
  <div>
    <div
      class="pa-2"
      style="display: flex; flex-wrap: wrap"
    />



    <table>
      <tr>
        <th />
        <th
          colspan="4"
          style="text-align: center; padding: 2px; background-color: #b7dbf1 "
        >
          Handler Info
        </th>


        <th />
        <th />
        <th />
      </tr>
      <tr class="col-headers">
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
          Email
        </th>
        <th>Acct Type</th>
        <th>
          Dog Name
          <sort-icon
            :sort-dir.sync="sortCols.dog_name"
            @click="sort_handler('dog_name', $event)"
          />
        </th>


        <th>
          Number
        </th>
        <th>
          Comment
        </th>
      </tr>

      <template v-for="(dog, ix) in dogs">
        <!-----------------------main row-------------------------------------------------------->
        <tr
          :key="dog._id"
          :class="get_row_bg_class(ix)"
        >
          <td>
            <div style="display: flex">
              <div @click="click_user(dog, ix)">
                <avatar
                  :image="dog.handler_id_FR.profile_image"
                  size="40"
                  style="cursor: pointer"
                />
                <div class="edit-btn">
                  Edit
                </div>
              </div>


              <div @click="click_dog(dog, ix)">
                <avatar
                  class="ml-1"
                  :image="dog.profile_image"
                  size="40"
                  profile-type="dog"
                  style="cursor: pointer"
                />
                <div class="edit-btn">
                  Edit
                </div>
              </div>
            </div>
          </td>
          <td>
            <!--{{fmt_datetime(order.date_ordered )}}-->
            {{ dog.handler_id_FR.name_first }}
          </td>
          <td>
            {{ dog.handler_id_FR.name_last }}
          </td>
          <td>
            {{ dog.handler_id_FR.email }}
          </td>

          <td>
            {{ dog.handler_id_FR.account_type }}
          </td>
          <td>
            {{ dog.name }}
          </td>




          <td style="white-space: nowrap">
            <router-link
              :to="'/team/'+dog.dog_num"
              target="_blank"
            >
              SDS-{{ dog.dog_num }}
            </router-link>
          </td>


          <td @click.stop="$emit('edit-comment', {dog, ix})">
            <span v-if="dog.admin">
              {{ fmt_trim_str(dog.admin.comment, 50) }}
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
import StatusDropDown from "@/components/inputs/StatusDropDown";
import SortIcon from "@/components/icons/SortIcon";

export default {
   name: "DogTable",
   components: {StatusDropDown, SortIcon},
   mixins: [data_getters, utilities],
   props: {
      dogs: {type: Array, },
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
            LabelCreated: '#D2D2D7',
            Processing: '#82B6FA',
            Shipped: '#D5EDCB',
            Delivered: '#7FCC62',
         },

         sortCols:{
            name_first: 'ascending',
            name_last: 'none',
            dog_name: 'none'
         },


      }
   },

   computed:{
      showBatch(){
         let ans = false;

         for (let o of this.dogs){
            if (o.loc_checked){
               ans = true;
               break;
            }
         }
         return ans;
      },

      all_expanded(){
         let ans = true;

         for (let o of this.dogs){
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
            for (let i in this.dogs){
               this.dogs[i].loc_checked = true;
            }
         }
         else{
            for (let i in this.dogs){
               this.dogs[i].loc_checked = false;
            }
         }
      }
   },

   methods:{

      click_dog(dog, ix){
         this.$emit('click-dog', {dog, ix})
      },

      click_user(dog, ix){

         console.log(dog)
         this.$emit('click-user',{dog, user:dog.handler_id_FR, ix})
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

         for (let o of this.dogs){
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



         // //if sort set to none, sort by date
         // if (dir === 'none'){
         //    this.dogs = this.dogs.sort((a, b) => a.name_first < b.name_first ? 1 : -1);
         //    this.sortCols.name_first = 'ascending';
         //    return;
         // }




         //sort rows by col

         let sortDir = 1;
         if (dir === 'descending'){
            sortDir = -1;
         }



         console.log({col, sortDir})


         switch (col){
            case 'name_last':
               this.dogs.sort((a, b) => a.handler_id_FR.name_last > b.handler_id_FR.name_last ? sortDir : -sortDir);
               break;

            case 'name_first':
               this.dogs.sort((a, b) => a.handler_id_FR.name_first > b.handler_id_FR.name_first ? sortDir : -sortDir);
               break;

            case 'dog_name':
               this.dogs.sort((a, b) => a.name > b.name ? sortDir : -sortDir);
               break;

            // case 'status':
            //    this.dogs.sort((a, b) => a.status > b.status ? sortDir : -sortDir);
            //    break;
            //
            // case 'cust':
            //    this.dogs.sort((a, b) => this.get_name_user(a.user_id_FR) > this.get_name_user(b.user_id_FR) ? sortDir : -sortDir);
            //    break;
            //
            // case 'total':
            //    this.dogs.sort((a, b) => a.order_total > b.order_total ? sortDir : -sortDir);
            //    break;
            //
            // case 'items':
            //    this.dogs.sort((a, b) => a.items.length > b.items.length ? sortDir : -sortDir);
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
