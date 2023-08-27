<template>
   <div class="container">

      <div v-if="['about', 'caption'].includes(section)">
         <textarea
             class="pa-2"
             v-model="about"
             style="background-color: white; width: 100%; min-height: 400px"
         ></textarea>

      </div>








      <div v-if="['certifications', 'services', 'awards', 'breeds', 'groups', 'social'].includes(section)">

         <my-form>
            <draggable
                v-model="list"
                group="services"
                @start="drag=true"
                @end="drag=false"
                handle=".drag_class_services"
            >
               <div v-for="(item, ix) in list" :key="ix"
                    style="display:flex; margin-bottom: 15px;"
               >
                  <v-icon class="mt-5 mr-2 drag_class_services">drag_indicator</v-icon>
                  <div v-if="section === 'social'" style="display: flex; width: 100%">
                     <sds-input
                         style="width: 40%; "
                         :label="'Network '+(ix+1)"
                         v-model="list[ix].network"
                     ></sds-input>

                     <sds-input
                         style="width: 60%; margin-left:5px"
                         label="URL"
                         v-model="list[ix].url"
                     ></sds-input>
                  </div>
                  <sds-input
                      v-else
                      :label="section+ ' '+(ix+1)"
                      v-model="list[ix]"
                  ></sds-input>

                  <div style="margin-top: 25px; margin-right: -5px; margin-left: 5px">
                     <v-btn  icon small @click="list.splice(ix, 1)">
                        <v-icon small>close</v-icon>
                     </v-btn>
                  </div>

               </div>
            </draggable>

            <div style="display:flex">
               <v-spacer></v-spacer>

               <div style="margin-top: 20px; margin-right: -10px; margin-bottom: 25px">
                  <v-btn text @click="add_item">
                     Add New Item
                     <i class="material-icons">add</i>
                  </v-btn>
               </div>

            </div>


<!--            <div v-for="(item, ix) in services"-->
<!--            >-->
<!--               <sds-input-->
<!--               :label="'Training Service '+(ix+1)"></sds-input>-->
<!--            </div>-->
         </my-form>



      </div>











      <v-row class="ma-0 pt-2">
<!--         <v-btn @click="$emit('close')">Cancel</v-btn>-->
         <v-spacer></v-spacer>
         <v-btn color="var(--color-btn)" class="white--text" @click="save_data">
            Save</v-btn>
      </v-row>
   </div>
</template>

<script>
import sdsInput from "@/components/inputs/TextInput";
import myForm from "@/components/inputs/MyForm";
import uploadImage from "@/components/FileUploads/UploadUserImage";
import status from "@/components/inputs/StatusDropDown";
import data_getters from "@/mixins/data_getters";

import _ from 'lodash';
import draggable from 'vuedraggable'


export default {
   name: "EditProfileSection",
   mixins: [data_getters],
   components: {sdsInput, myForm , uploadImage, status, draggable},
   props: {
      section: String, // about|services|certs|awards|groups|social
   },


   data(){
      return {
         user: {},


         about: null,

         list:[], //array to hold list of items to edit

         drag: false,
      }
   },

   methods:{
      add_item(){
        if (this.section !== 'social'){
           this.list.push('');
        } else{
           this.list.push({network: '', url: ''});
        }
      },
      async get_profile_data(){
         this.update = {};
         try{
            let user = await this.make_request('/private/getProfilePublicInfo', );
            this.user=user;

            let type_map = {
               'TRAINER': 'trainer_info',
               'HANDLER': 'handler_info',
               'AIDE': 'aide_info',
            }
            let info_type = type_map[user.account_type];



            switch(this.section) {
               case 'about':
                  this.about = _.get(user, info_type+'.about', '');
                  break;

               case 'caption':
                  this.about = _.get(user, info_type+'.gallery_caption', '');
                  break;

               case 'services':
                  this.list = _.get(user, info_type + '.services', ['']);
                  break;


               case 'certifications':
                  this.list = _.get(user, info_type + '.certifications', ['']);
                  break;

               case 'awards':
                  this.list = _.get(user, info_type + '.awards', ['']);
                  break;

               case 'breeds':
                  this.list = _.get(user, info_type + '.breeds', ['']);
                  break;

               case 'groups':
                  this.list = _.get(user, info_type + '.groups', ['']);
                  break;

               case 'social':
                  this.list = _.get(user, info_type + '.social', [{network: '', url: ''}]);
                  if (this.list == null){
                     this.list = [{network: '', url: ''}];
                  }
                  if (this.list.length ===0){
                     this.list = [{network: '', url: ''}];
                  }
                  break;

               default:
                // code block

            }

            if (this.list == null){
               this.list = [''];
            }

            if (this.list.length ===0){
               this.list = [''];
            }



         }catch (e) {

            throw e;
         }
      },



      async save_data(){
         try{
            let nestedUpdate = {};

            let type_map = {
               'TRAINER': 'trainer_info',
               'HANDLER': 'handler_info',
               'AIDE': 'aide_info',
            }
            let info_type = type_map[this.user.account_type];


            if (['about'].includes(this.section)){
               nestedUpdate[info_type + '.'+this.section] = this.about;

               if (this.about !== null && this.about !== ''){
                  nestedUpdate[info_type + '.section_skip_checks.'+this.section] = false;
               }

            }

            else if (['caption'].includes(this.section)){
               nestedUpdate[info_type + '.gallery_caption'] = this.about;
            }

            else if (['services', 'certifications',  'awards',  'breeds', 'groups', 'social'].includes(this.section)){
               if (this.list.length === 1 && this.list[0] === ''){
                  this.list = [];
               }
               nestedUpdate[info_type + '.'+this.section] = this.list;


               if (this.list !== null && this.list.length > 0){
                  nestedUpdate[info_type + '.section_skip_checks.'+this.section] = false;
               }
            }

            else{
               throw Error(`section "${this.section}" not recognized`);
            }






            // switch(this.section) {
            //    case 'about':
            //       nestedUpdate[info_type + '.about'] = this.about;
            //
            //
            //       break;
            //
            //    case 'caption':
            //       nestedUpdate[info_type + '.gallery_caption'] = this.about;
            //       break;
            //
            //    case 'services':
            //       if (this.list.length === 1 && this.list[0] === ''){
            //          this.list = [];
            //       }
            //       nestedUpdate[info_type + '.services'] = this.list;
            //
            //       if (this.list.length > 0){
            //          nestedUpdate[info_type + 'section_skip_checks.about'] = this.about;
            //       }
            //
            //       break;
            //
            //
            //    case 'certifications':
            //       if (this.list.length === 1 && this.list[0] === ''){
            //          this.list = [];
            //       }
            //       nestedUpdate[info_type + '.certifications'] = this.list;
            //       break;
            //
            //    case 'awards':
            //       if (this.list.length === 1 && this.list[0] === ''){
            //          this.list = [];
            //       }
            //       nestedUpdate[info_type + '.awards'] = this.list;
            //       break;
            //
            //    case 'breeds':
            //       if (this.list.length === 1 && this.list[0] === ''){
            //          this.list = [];
            //       }
            //       nestedUpdate[info_type + '.breeds'] = this.list;
            //       break;
            //
            //
            //    case 'groups':
            //       if (this.list.length === 1 && this.list[0] === ''){
            //          this.list = [];
            //       }
            //       nestedUpdate[info_type + '.groups'] = this.list;
            //       break;
            //
            //
            //    case 'social':
            //       if (this.list.length === 1 && this.list[0] === ''){
            //          this.list = [];
            //       }
            //       nestedUpdate[info_type + '.social'] = this.list;
            //       break;
            //
            //
            //
            //    default:
            //     // code block
            // }


            await this.make_request('/private/updateUserProfile', {user_id: this.$auth.profile.user_id, nestedUpdate});


            this.$emit('section-updated');
         }catch (e) {

            throw e;
         }
      }
   },

   created(){
      this.get_profile_data();
   }

}
</script>

<style scoped>
.container{
   background-color: var(--color-bg);
}


.drag_class_services{
   cursor: move;
}
</style>
