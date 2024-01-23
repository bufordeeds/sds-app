<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="social-container">
            <div class="icon-box">
              <img src="../../assets/images/icons/facebook.svg">
            </div>
            <v-text-field
              v-model="social.facebook"
              label="Enter Facebook Link"
              dense
              hide-details
              style="align-self: center"
            />
          </div>
        </v-col>

        <v-col>
          <div class="social-container">
            <div class="icon-box">
              <img src="../../assets/images/icons/twitter.svg">
            </div>
            <v-text-field
              v-model="social.twitter"
              label="Enter Twitter Link"
              dense
              hide-details
              style="align-self: center"
            />
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="social-container">
            <div class="icon-box">
              <img src="../../assets/images/icons/instagram.svg">
            </div>
            <v-text-field
              v-model="social.instagram"
              label="Enter Instagram Link"
              dense
              hide-details
              style="align-self: center"
            />
          </div>
        </v-col>

        <v-col>
          <div class="social-container">
            <div class="icon-box">
              <img src="../../assets/images/icons/snapchat.svg">
            </div>
            <v-text-field
              v-model="social.snapchat"
              label="Enter Snapchat Link"
              dense
              hide-details
              style="align-self: center"
            />
          </div>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <div class="social-container">
            <div class="icon-box">
              <img src="../../assets/images/icons/linkedin.svg">
            </div>
            <v-text-field
              v-model="social.linkedin"
              label="Enter LinkedIn Link"
              dense
              hide-details
              style="align-self: center"
            />
          </div>
        </v-col>

        <v-col>
          <div class="social-container">
            <div class="icon-box">
              <img src="../../assets/images/icons/youtube.svg">
            </div>
            <v-text-field
              v-model="social.youtube"
              label="Enter YouTube Link"
              dense
              hide-details
              style="align-self: center"
            />
          </div>
        </v-col>
      </v-row>

      <v-row style="margin-top: 30px">
        <v-spacer />
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
   name: "SetupSocial",
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
