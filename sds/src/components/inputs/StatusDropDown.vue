<template>
   <div>
      <v-menu bottom offset-y rounded="16" :disabled="disabled || loading">
         <template #activator="{ on, attrs }">
            <div
               style=" height: 30px; width: 104px; font-size: 12px; display: flex; justify-content: flex-start; align-items: center; color: #1D1D1F; border-radius: 16px;"
               :style="btn_col" v-bind="attrs" tabindex="1" v-on="on">
               <div v-if="!compact" class="arrow-button-container">
                  <v-icon color="black">
                     arrow_drop_down
                  </v-icon>
               </div>
               <div :style="style_btn" style="width: 100%; white-space: nowrap;">
                  <button v-if="!disabled" class="pl-2 pr-2 dropdown-button">
                     {{ value_fmt }}
                  </button>
                  <div v-else class="pl-2 pr-2">
                     {{ value_fmt }}
                  </div>
               </div>
            </div>


            <!--"-->
         </template>

         <v-list class="pa-0">
            <v-list-item v-for="item in list2" :key="item.val+rnd_id" class="menu-item" @click="updateVal(item.val)">
               <span style="color: black">
                  {{ item.txt }}
               </span>
            </v-list-item>
         </v-list>
      </v-menu>


      <div v-if="loading" style="margin-top: -20px; display: flex; justify-content: center; width: 100%; height: 20px">
         <v-progress-circular indeterminate color="black" width="2" size="15" />
      </div>
   </div>
</template>

<script>

import _ from 'lodash';
import helpers from "@/utilities/helpers";

export default {
   name: "DropDown",
   props: {
      value: [String, Number, Boolean],
      list: {type: Array, default: null}, //[{txt, val}]
      listType: {type: String, default: 'dog'}, //used in place of list
      colorMap: {type: Object, default: null}, //{val: colorString }, used to map name values to colors,

      itemValue: {type: String, default: null},
      itemText: {type: String, default: null},
      compact:  {type: Boolean, default: false},
      disabled:  {type: Boolean, default: false},

      loading:  {type: Boolean, default: false},
   },
   data(){
      return {
         rnd_id: '',
         ix: -1,
      }
   },


   computed:{

      list2(){
         if (this.list !== null){
            return this.list
         }

         if (this.listType === 'dog'){
            return [
               {txt: 'In Training', val: 'InTraining'},
               {txt: 'Fully Trained', val: 'FullyTrained'},
               {txt: 'Retired', val: 'Retired'},
               {txt: 'In Memoriam', val: 'InMemoriam'},
               {txt: 'Washout', val: 'Washout'},
               {txt: 'Hidden/Private', val: 'Private'},
            ]
         }
         else if (this.listType == 'user'){
            return [
               {txt: 'Public', val: 'Public'},
               // {txt: 'Retired', val: 'Retired'},
               // {txt: 'In Memoriam', val: 'InMemoriam'},
               {txt: 'Private', val: 'Private'},
            ]
         }

         else if (this.listType == 'user_type'){
            return [
               {txt: 'Owner', val: 'Owner'},
               {txt: 'Trainer', val: 'Trainer'},
            ]
         }
         else{
            throw Error('Must specify list or listType')
         }

      },

      value_fmt(){
         let ix = helpers.findWithAttr(this.list2, 'val', this.value)
         if (ix > -1){
            return this.list2[ix].txt;
         }
         return 'Invalid Value'
      },

      btn_col(){
         let v = this.value;


         let col = 'background-color: #4991c9;';

         if (v != null){
            v = v.toString();
         } else{
            return col;
         }




         if (this.colorMap != null){
            return `background-color: ${this.colorMap[v]};`;
         }



         if (['Active', 'FullyTrained', 'Public'].includes(v)){
            col = 'background-color: #8dc63f;';
         }
         else if ([ 'InMemoriam'].includes(v)){
            col = 'background-color: #9c867a;';
         }
         else if ([ 'Private', 'Washout'].includes(v)){
            col = 'background-color: #bf1e2e;';
         }
         else if ([ 'Retired'].includes(v)){
            col = 'background-color: #662d91;';
         }

         return col;
      },

      style_btn(){

         let ans = '';
         if (this.compact){
            ans += 'display: flex; justify-content: center;';
         }

         if (this.loading){
            let c = this.btn_col
            c = c.split(':')
            ans += ` color: ${c[1]};`;
         }
         return ans;
      }
   },
   created(){
      this.rnd_id = _.random(1, 10000000, false).toString();

   },
   methods:{
      updateVal(val){
         this.$emit('input', val)
      }
   }
}
</script>

<style scoped>

.menu-item{
   background-color: #97cbeb;
   margin-top: 1px;
   padding-top: 3px;
   padding-bottom: 3px;

}

div:hover.menu-item{
   background-color: #5fafe1;
}

div >>> .v-list-item{
   min-height: 32px !important;
}

</style>


<style>
.dog-custom-menu{
   background-color: #6b46b3;
}

dropdown-button{
   width: 100% !important;
   border-radius: 0px;
}

div:focus{
   outline: #29ea49 solid 1px;
   /*border: #29ea49 solid 1px;*/
}

.arrow-button-container{
   background: rgba(0, 0, 0, 0.4);
   height: 100%;
   display: flex;
   align-items: center
}


</style>
