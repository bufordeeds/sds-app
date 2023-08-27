<template>
   <div :style="container_style" @click="$emit('click')">
      <v-avatar :size="size2" :tile="!rounded"  :style="avatar_style">
         <img v-if="!image2.Location" :src="no_image" >
         <img v-else :src="image2.Location">
      </v-avatar>

      <div v-if="profile && !imageOnly"  class="ml-3">
         <div v-if="profile.name">
            {{profile.name}}
         </div>

         <div v-if="profile.name_first || profile.name_last">
            {{profile.name_first}} {{profile.name_last}}
         </div>

         <div v-if="profile.email">
            {{profile.email}}
         </div>

         <div v-if="profile.dog_num">
            {{profile.dog_num}}
         </div>

      </div>
   </div>

</template>

<script>
export default {
   name: "avatar",
   props: {
      // image: {type: Object, default: () => { return {} }}, // s3/spaces storage object
      image: {type: Object, default: null}, // s3/spaces storage object
      profile: {type: Object, default: null},

      borderWidth: {type: String, default: null},
      borderColor: {type: String, default: 'white'},
      size: {type: String, default: "100"},
      sizeNoImage: {type: String, default: null},
      rounded: {type: Boolean, default: true},
      profileType:  {type: String, default: 'user'},
      imageOnly: {type: Boolean, default: false}, //if true only display image
   },

   computed:{

      container_style(){
         if (this.imageOnly){
            return "";
         }
         else{
            return "display: flex; justify-content: center"
         }
      },

     avatar_style(){
       let ans = '';
       if (this.borderWidth !== null){
         ans = `border: ${this.borderWidth} solid ${this.borderColor};`;
         // if (this.rounded){
         //   ans += `border-radius: 50%;`;
         // }

       }

       return ans;

     },


      size2(){

         if (this.image2.Location == undefined){
            if (this.sizeNoImage !== null){
               return this.sizeNoImage;
            }
            else{
               return this.size;
            }
         }


         else{
            return this.size;
         }


      },


      no_image(){
        if (this.profileType === 'user'){
           return require('../../assets/images/content/user-no-image.png')
        }
        else if (this.profileType === 'dog'){
           return require('../../assets/images/content/dog-no-image.png')
        }
        return null;
      },

      image2(){
         // console.log('debug')

         if (this.image != null){
            return this.image;
         }
         else{
            if (this.profile !== null && this.profile.profile_image){
               return this.profile.profile_image;
            }
            return {};
         }
      }
   }
}
</script>

<style scoped>

</style>
