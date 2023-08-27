<template>
   <div  >

      <v-menu
          bottom
          offsetY
          rounded="0"
          :disabled="disabled"
          max-height="300px"
          v-model="show_list2"

      >
         <template v-slot:activator="{ on, attrs }">
            <div style=" height: 34px; display: flex; justify-content: flex-start; align-items: center; color: white"
                 :style="btn_col"
                 v-bind="attrs"
                 v-on="on"
                 tabindex="0"
            >


               <div :style="style_btn" style="width: 100%">
                  <!-- style added so won't inherit from parent element, need to make as parameter -->
                  <div class="pl-2" style="font-weight: normal" :style="{'font-size': font_size(value_fmt)}">
                     {{value_fmt}}
                  </div>
               </div>


               <div v-if="clearable && value!== null" >
                  <v-btn icon @click.stop="$emit('input', null)">
                     <v-icon >close</v-icon>
                  </v-btn>

               </div>

               <div v-if="!compact" class="arrow-button-container">
                  <v-icon color="white">arrow_drop_down</v-icon>
               </div>


            </div>


         </template>



         <v-list class="pa-0" >
            <v-list-item
                v-for="item in list" :key="item[itemValue]+rnd_id"
                @click="updateVal(item[itemValue])"
                class="menu-item"
            >
               <span >
                  {{item[itemText]}}
               </span>

            </v-list-item>
         </v-list>
      </v-menu>


   </div>
</template>

<script>

import _ from 'lodash';
import helpers from "@/utilities/helpers";

export default {
   name: "DropDown0",
   data(){
      return {
         rnd_id: '',
         ix: -1,
         show_list2: false,
      }
   },
   props: {
      value: [String, Number, Boolean],
      list: {type: Array, default: () => {return []} },
      itemValue: {type: String, default: 'val'},
      itemText: {type: String, default: 'txt'},

      showValue:  {type: Boolean, default: false}, //if true then display the value instead of the txt

      compact:  {type: Boolean, default: false},
      disabled:  {type: Boolean, default: false},

      show_list: {type: Boolean, default: false}, //used to manually control if list should be displayed

      clearable: {type: Boolean, default: false},
   },

   watch: {
     show_list(newVal){

        if (newVal !== this.show_list2){
           this.show_list2 = newVal;
        }
     },

      show_list2(newVal){
        this.$emit('update:show_list', newVal);
      }

   },

   methods:{
      updateVal(val){
         console.log('debug mydropdown')
         this.$emit('input', val)
      },

      font_size(txt, sm='9pt'){
         let ans = '12pt';

         if (this.$vuetify.breakpoint.width < 400 && typeof txt === 'string' && txt.length > 30){
            ans = sm;
         }

         return ans;

      } ,
   },


   computed:{

      // list2(){
      //    let ans = [];
      //    let value = this.itemValue;
      //    let txt = this.itemText;
      //
      //    for (let i of this.list){
      //       if (value && txt){
      //          ans.push({
      //             txt: i[txt],
      //             val: i[value],
      //          })
      //       }
      //       else{
      //          ans.push({
      //             txt: i,
      //             val: i,
      //          })
      //       }
      //    }
      //    return ans;
      // },

      value_fmt(){
         let ix = helpers.findWithAttr(this.list, this.itemValue, this.value)
         if (ix > -1){
            if (this.showValue){
               return this.list[ix][this.itemValue];
            }
            else{
               return this.list[ix][this.itemText];
            }

         }
         return ''
      },

      btn_col(){
         let v = this.value;

         //todo: get rid of this, holder from StatusDropDown

         // let col = 'background-color: #4991c9;';
         let col = 'background-color: white; color: black';
         return col;
      },

      style_btn(){

         if (this.compact){
            return 'display: flex; justify-content: center;';
         }
         return '';
      }
   },


   created(){
      this.rnd_id = _.random(1, 10000000, false).toString();

   }
}
</script>


<style scoped src="./input_styles.css"></style>

<style scoped>


.menu-item{
   /*background-color: #97cbeb;*/
   color: black;
   margin-top: 1px;
   padding-top: 3px;
   padding-bottom: 3px;
   /*font-size: 16pt !important;*/

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
   border: none;
   background-color: deeppink !important;
}

div:focus{
   outline: #29ea49 solid 2px;
   /*border: #29ea49 solid 1px;*/
}

.arrow-button-container{
   background: rgba(0, 0, 0, 0.4);
   height: 100%;
   display: flex;
   align-items: center
}


</style>
