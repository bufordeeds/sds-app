<template>

   <div>

      <upload-user-image
          v-if="show_upload_image && dog"
          :show.sync="show_upload_image"
          file-type="profile"
          @uploaded="updated_image"
          :dog_id="dog._id"
      ></upload-user-image>



      <v-card style="overflow: auto ">
         <v-card-title>
            {{title_txt}}
         </v-card-title>
         <my-form ref="form">
            <v-container>
               <v-row class="ma-0" v-if="dog">
                  <v-col>
                     <div class="profile-image-container" @click="show_upload_image=true;">
<!--                        <img v-if="!value.profile_image" src="../../assets/images/content/dog-no-image.png" width="75px">-->
<!--                        <img v-else :src="value.profile_image.Location" width="75px">-->
                       <avatar
                           profile-type="dog"
                           :image="value.profile_image"
                           size="75" />

                        <div style="font-size: 11pt; color: blue; padding-top: 5px; padding-left: 10px">
                           Change <br> Profile Image
                        </div>
                     </div>


                  </v-col>



               </v-row>



               <v-row dense class="ma-0">

                  <v-col cols="12" xs="6">
<!--                     <v-text-field-->
<!--                         label="Service Dog's Name"-->
<!--                         outlined-->
<!--                         v-model="value.name"-->
<!--                         :rules="[x=>isRequired(x, 'Name')]"-->
<!--                     ></v-text-field>-->
                     <my-text-input
                         label="Service Dog's Name"
                         v-model="value.name"
                         :rules="[x=>isRequired(x, 'Name')]"
                     ></my-text-input>
                  </v-col>

<!--               </v-row>-->
<!--               <v-row class="ma-0">-->
                  <v-col cols="12" xs="6">
<!--                     <v-select-->
<!--                         label="Current Status"-->
<!--                         :menu-props="{ bottom: true, offsetY: true }"-->
<!--                         :items="list"-->
<!--                         item-text="txt"-->
<!--                         item-value="val"-->
<!--                         outlined-->
<!--                         v-model="value.status"-->
<!--                         :rules="[x=>isRequired(x, 'Status')]"-->
<!--                     ></v-select>-->



                     <my-drop-down
                         label="Current Status"
                         :menu-props="{ bottom: true, offsetY: true }"
                         :list="list"
                         item-text="txt"
                         item-value="val"
                         outlined
                         v-model="value.status"
                         :rules="[x=>isRequired(x, 'Status')]"
                     />
                  </v-col>


                  <v-col cols="12" xs="6">
                     <my-text-input
                         label="Breed*"
                         v-model="value.breed"
                         :rules="[isRequired]"
                     ></my-text-input>
                  </v-col>

                  <v-col cols="12" xs="6">
                     <my-drop-down
                         label="How big is your dog?*"
                         v-model="value.size"
                         :list="list_size_dog"
                         item-value="val"
                         item-text="val"
                         :rules="[isRequired]"
                     />
                  </v-col>

                  <v-col cols="12" xs="6">
                     <my-text-input
                         label="Birth Year*"
                         v-model="value.birth_year"
                         :rules="[isNumber, x=>checkLength(x, 4, {type: 'eq'})]"
                     ></my-text-input>
                  </v-col>

                  <v-col cols="12" xs="6">
                     <my-text-input
                         label="Coat Color"
                         v-model="value.coat_color"
                     ></my-text-input>
                  </v-col>
                  <v-col cols="12" xs="6">
                     <my-text-input
                         label="Microchip Number"
                         v-model="value.microchip_num"
                     ></my-text-input>
                  </v-col>


                  <v-col cols="6">
                     <my-text-input
                         v-if="value.status === 'InMemoriam'"
                         label="Date Passed"
                         v-model="value.died"
                         :rules="[isDate]"
                     ></my-text-input>
                  </v-col>
               </v-row>


               <v-row justify="end" class="ma-0 pt-4">
                  <v-btn @click="$emit('close')" color="grey" class="mr-2">
                     Cancel
                  </v-btn>

                  <v-btn @click="save_dog">{{btn_txt}}</v-btn>
               </v-row>
            </v-container>
         </my-form>

      </v-card>
   </div>

</template>

<script>
// import status from '@/views/mgmProfile/StatusDropDown';
import UploadUserImage from "@/components/FileUploads/UploadUserImage";
import validation from "@/mixins/validation";

import _ from 'lodash';
import data_getters from "@/mixins/data_getters";
import MyDropDown from "@/components/inputs/MyDropDown";

import {DateTime} from 'luxon';

export default {
   name: "AddDogDialog",
   components: {MyDropDown, UploadUserImage},
   mixins: [data_getters, validation],
   props: {
      dog: {type: Object, default: null},
      user_id: {type: String, default: null},
   },
   data(){
      return {
         show_upload_image: false,


         value: _.cloneDeep(this.dog),

         //note: need to keep this in sync with the options in the StatusDropDown component's options
         list: [
            {txt: 'In Training', val: 'InTraining'},
            {txt: 'Fully Trained', val: 'FullyTrained'},
            {txt: 'Retired', val: 'Retired'},
            {txt: 'In Memoriam', val: 'InMemoriam'},
            {txt: 'Washout', val: 'Washout'},
            {txt: 'Hidden/Private', val: 'Private'},
         ],

         list_size_dog: [
            {val: 'Small (under 20lbs)'},
            {val: 'Medium (20-50lbs)'},
            {val: 'Large (50-90lbs)'},
            {val: 'Extra Large (90+lbs)'},
         ],


      }
   },
   computed: {
     btn_txt(){
        if (this.dog === null){
           return 'Add Dog'
        }
        else{
           return 'Save'
        }
     },

      title_txt(){
         if (this.dog === null){
            return 'Add New Service Dog'
         }
         else{
            return 'Edit Service Dog Profile'
         }

      }
   },

   methods:{
      // updateValue(key, value) {
      //    let ans = _.cloneDeep(this.value);
      //    ans[key] = value;
      //    this.$emit("input", ans);
      // }

      async updated_image(){

         try{
            this.show_upload_image = false;
            // this.value.profile_image = null;
            let dog = await this.make_request('/private/getDogs', {dog_id: this.value._id});

            this.value.profile_image = dog.profile_image;
            this.$emit('update-image')
         }catch (e) {

            throw e;
         }


      },

      async save_dog(){
         this.form_err = null;
         if (!this.$refs.form.validate()){
            this.form_err = 'Please check fields';
            return;
         }

         try{
            let user_id = this.user_id;
            if (user_id == null){
               user_id = this.$auth.profile.user_id;
            }


            console.log('debug save dog')

            let dog = _.cloneDeep(this.value);

            if (dog.born != null){
               dog.born = DateTime.fromFormat(dog.born,'M/d/yyyy').toJSDate();
            }

            if (dog.died != null){
               dog.died = DateTime.fromFormat(dog.died,'M/d/yyyy').toJSDate();
            }

            let payload = {
               user_id,
               dog,
            }


            await this.make_request('/private/updateDog', payload);
            this.$emit('update')
         }catch(e){
            throw e;
         }

      },
   },

   created(){
      if (this.dog === null){
         this.value = {}
      }
      else{
         this.value = _.cloneDeep(this.dog);

         if (this.value.born != null){
            this.value.born = DateTime.fromISO(this.value.born).toFormat('M/d/yyyy');
         }
         if (this.value.died != null){
            this.value.died = DateTime.fromISO(this.value.died).toFormat('M/d/yyyy');
         }
      }
   }
}
</script>

<style scoped>
.profile-image-container{
   display: flex;
   flex-direction: row;
   cursor: pointer;

}
</style>
