<template>
   <div class="main-content" :style="border_style">


      <!--     Edit control-->
      <div v-if="editMode" class="section-edit-container" :key="label+'edit'">
         <v-switch
             label="Include on team profile"
             color="blue"
             class="reverse-label-checkbox"
             hide-details
             :loading="saving_setting"
             @change="update_records"
             v-model="checked"

         ></v-switch>
         <div style="padding-right: 20px; font-size: 10pt; color: gray"
         >{{switch_label2}}</div>
      </div>







      <!-- main content-->
      <div class="centered-content" style="flex-direction: column;">

         <div style="display: flex;">
            <img :src="iconUrl" width="70" height="70">
            <div>
               <div class="ml-6" :style="{color, 'font-weight': 600}">
                  {{label}}
               </div>

               <div class="ml-6 pr-4" style="color: #3c3c3c; font-weight: 600; max-width: 400px">
                  {{heading}}
               </div>

            </div>
         </div>

         <slot v-if="expanded" name="expand_content" ></slot>

      </div>

      <div class="pl-2 pr-2 mt-6 ">
         <v-divider/>
      </div>

      <div class="centered-content" style="flex-direction: column;" >
         <v-btn text @click="expanded = !expanded">
            <div style="display: flex; font-size: 12pt; font-weight: 600; color: #9d9d9d; align-items: center">
               {{expand_txt}}
               <div class=" triangle-up" :style="triangle_style" />
            </div>
         </v-btn>


      </div>
   </div>
</template>

<script>

import data_getters from "@/mixins/data_getters";


export default {
   name: "teamModal",
   mixins: [data_getters],
   props:{
      color: String,
      iconUrl: {type: String},
      label: String,
      heading: String,

      editMode: {type: Boolean, default: false},
      editEvent: {type: String, default: null}, //should align with property for checks property in db model for dog
      isChecked:  {type: Boolean, default: false},
      editGlobalProp: {type: Boolean, default: false}, //used to indicate if this is a handler or dog level setting

      dog_id: String,

   },

   data(){
      return {
         expanded: false,

         checked: this.isChecked,

         saving_setting: false,
      }
   },

   watch:{
     isChecked(newVal){
        if (this.checked !== newVal){
           this.checked = newVal;
        }
     },

      // checked(newVal){
      //
      //   this.$emit('check-event', {section:this.editEvent, val:newVal});
      // }

   },

   computed:{
      switch_label2(){
         if (this.editGlobalProp){
            return '(Applies to ALL your team profiles)'
         }
         return '(Applies to this team profile)'
      },


      triangle_style(){
         let ans = '';
         if (this.expanded){
            ans = '';
         }
         else{
            ans = 'transform: rotate(180deg)';
         }

         return ans;
      },

      expand_txt(){
         if (this.expanded){
            return 'HIDE DETAILS'
         }
         else{
            return 'EXPAND DETAILS'
         }

      },

      border_style(){
         return `border-top: 5px solid ${this.color}`
      }



   },

   methods: {

      async update_records(checkVal){


         console.log('debug')

         if (this.editEvent== null){
            throw Error('editEvent not set')
         }

         this.saving_setting = true;
         try{

            //update dog's record
            if (!this.editGlobalProp){
               //update db
               let payload = {
                  dog_id: this.dog_id,
                  update: {},
               };

               payload.update[this.editEvent] = checkVal;
               await this.make_request('/private/updateDogChecks', payload);

               //update local model
               this.$emit('update:isChecked', checkVal);
            }


            //update handler's record
            else{
               //update db
               let payload = {
                  user_id: this.$auth.profile.user_id,
                  update: {},
               };

               payload.update[this.editEvent] = checkVal;
               await this.make_request('/private/updateHandlerChecks', payload);



               //update local model
               this.$emit('update:isChecked', checkVal);
            }


            this.saving_setting = false;
         }catch (e) {

            console.error(e);
         }


      }
   }
}
</script>

<style scoped>

.triangle-up {
   --width: 6px;
   width: 0;
   height: 0;
   border-left: var(--width) solid transparent;
   border-right: var(--width) solid transparent;
   border-bottom: 8px solid #9d9d9d;
   margin-left: 5px;

}



.main-content{
   background-color: white;
   width: 100%;
   border: 1px solid #cdcccc;
   border-radius: 4px;

   margin-top: 20px;
   padding-top: 20px;
   padding-bottom: 20px;



}

.centered-content{
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 10px 20px 0 20px;
   font-size: 16pt;
   font-weight: 500;
   color: var(--color-txt-grey1);

}

/*  related to edit row below sections*/
.section-edit-container{
   margin-top: -20px;
   margin-bottom: -0px;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-end;
}
.section-edit-icon{
   font-size:10pt;
   margin-right: 3px;
}


div >>> .reverse-label-checkbox .v-input__slot{
   flex-direction: row-reverse;
   justify-content: flex-end;
}

div >>> .v-input--selection-controls__input{
   margin-left: 10px;
   margin-right: 20px;
}

</style>