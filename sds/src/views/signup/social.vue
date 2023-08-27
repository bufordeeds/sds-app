<template>
<div>
   <v-container>
      <v-row>
         <v-col>
            <div class="social-container">
               <div class="icon-box">
                  <img src="../../assets/images/icons/facebook.svg" >
               </div>
               <v-text-field
                   label="Enter Facebook Link"
                   v-model="social.facebook"
                   dense
                   hide-details
                   style="align-self: center"
               ></v-text-field>
            </div>
         </v-col>

         <v-col>
            <div class="social-container">
               <div class="icon-box">
                  <img src="../../assets/images/icons/twitter.svg" >
               </div>
               <v-text-field
                   label="Enter Twitter Link"
                   v-model="social.twitter"
                   dense
                   hide-details
                   style="align-self: center"
               ></v-text-field>
            </div>
         </v-col>

      </v-row>

      <v-row>
         <v-col>
            <div class="social-container">
               <div class="icon-box">
                  <img src="../../assets/images/icons/instagram.svg" >
               </div>
               <v-text-field
                   label="Enter Instagram Link"
                   v-model="social.instagram"
                   dense
                   hide-details
                   style="align-self: center"
               ></v-text-field>
            </div>
         </v-col>

         <v-col>
            <div class="social-container">
               <div class="icon-box">
                  <img src="../../assets/images/icons/snapchat.svg" >
               </div>
               <v-text-field
                   label="Enter Snapchat Link"
                   v-model="social.snapchat"
                   dense
                   hide-details
                   style="align-self: center"
               ></v-text-field>
            </div>
         </v-col>

      </v-row>

      <v-row>
         <v-col>
            <div class="social-container">
               <div class="icon-box">
                  <img src="../../assets/images/icons/linkedin.svg" >
               </div>
               <v-text-field
                   label="Enter LinkedIn Link"
                   v-model="social.linkedin"
                   dense
                   hide-details
                   style="align-self: center"
               ></v-text-field>
            </div>
         </v-col>

         <v-col>
            <div class="social-container">
               <div class="icon-box">
                  <img src="../../assets/images/icons/youtube.svg" >
               </div>
               <v-text-field
                   label="Enter YouTube Link"
                   v-model="social.youtube"
                   dense
                   hide-details
                   style="align-self: center"
               ></v-text-field>
            </div>
         </v-col>

      </v-row>

      <v-row style="margin-top: 30px">
         <v-spacer></v-spacer>
         <v-btn
             color="var(--color-primary)"
             @click="save"
         >
            Add Social Profiles
         </v-btn>
      </v-row>
   </v-container>
</div>
</template>

<script>
export default {
   name: "setup-social",
   data(){
      return {
         social: {
            facebook: null,
            twitter: null,
            snapchat: null,
            instagram: null,
            linkedin: null,
            youtube: null
         }
      }
   },

   methods:{
      save(){

         let atLeastOne = false;

         let keys = Object.keys(this.social);
         for (let k of keys){
            if (this.social[k] !== null){
               atLeastOne = true;
            }
         }

         if (atLeastOne){
            this.$emit('social_saved', this.social);
         }

      }
   }
}
</script>

<style scoped>

.social-container{
   display:flex;
   flex-direction: row;
   border: solid 1px #d9d9d9;
   padding-right: 10px;
}
.icon-box{
   background-color: var(--color-primary);
   height: 50px;
   width: 50px;
   display: flex;
   justify-content: center;
   align-items: center;
   margin-right: 10px;
}

img{
   height: 50%;
}
</style>
