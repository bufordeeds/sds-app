<template>
   <v-dialog width="unset" v-model="value2" :fullscreen="$vuetify.breakpoint.smAndDown">
      <div class="background">
         <div style="margin-bottom: -10px; display: flex; justify-content: flex-end; width: 100% ">
            <v-btn icon @click="value2=false">
               <v-icon color="white">close</v-icon>
            </v-btn>
         </div>


         <div class="kit-heading">
            Service Dog Standards Accepted Patch
         </div>

         <v-img
             src="../../../assets/images/products/SDSPatch.png"
             max-width="80%"
             contain
         ></v-img>




         <!--list of features-->

         <!--<div style="display: flex; flex-direction: column; width: 100%;"  class="mt-6"-->
         <!--     :style="{'max-width': $vuetify.breakpoint.xs? '200px' : '300px'}"-->
         <!--&gt;-->
         <!--   &lt;!&ndash;<img v-for="(src, ix) in feature_srcs" :key="ix" :src=src class="image-shield mt-2">&ndash;&gt;-->
         <!--   &lt;!&ndash;note need to use background property to get images to not distort margins&ndash;&gt;-->

         <!--   <div v-for="(src, ix) in feature_srcs" :key="ix" :class="shield_class"-->
         <!--       :style="{'background-image': `url(${src})`, }"-->
         <!--   ></div>-->

         <!--</div>-->



         <div style="display: flex; justify-content: center" class="mt-6 pl-5">

            <img src="../../../assets/images/products/SDSAcceptedPatchFeatureShields.png" width="90%" style="max-width: 350px; align-self: flex-start;" >
         </div>



         <div class="kit-heading mt-8">
            Feature Details
         </div>

         <hr style="height:1px;border-width:0;color:#cccccc;background-color:#cccccc; width: 80%" class="ma-2" >

         <div class="benefits-list">
            <div class="benefits-list-item">
               3” Diameter Patch
            </div>

            <div class="benefits-list-item">
               Iron-On (May Also Be Sewn to Increase Durability)
            </div>

            <div class="benefits-list-item">
               Beautiful, Professional Embroidery
            </div>


            <div class="benefits-list-item">
               Military-Grade Patch
            </div>

            <div class="benefits-list-item">
               Rugged Heavy Duty
            </div>

            <div class="benefits-list-item">
               Helps Support Voluntary Service Dog Standards
            </div>

         </div>








      </div>
   </v-dialog>
</template>

<script>
export default {
   name: "dialogFeaturesCard",
   props: {
      value: Boolean,
   },
   data(){
      return {
         image_front: true,
      }
   },

   computed:{
      shield_class(){
         if (this.$vuetify.breakpoint.xs){
            return 'shield-div-sm'
         }
         return 'shield-div';
      },
      value2: {
         get(){
            return this.value;
         },

         set(newVal){
            this.$emit('input', newVal);
         }
      },


      src(){
        if (this.image_front){
           return require("../../../assets/images/products/SDSCardFront.png");
        }
        else{
         return require("../../../assets/images/products/SDSCardBack.png");
        }
      },


      feature_srcs(){

         //note require can't be passed a variable, must be a hardcoded string
         let srcs = [
            require("../../../assets/images/products/SDSTagFeatures/SDSHeavyDutyStainlessSteelTag.png"),
            require("../../../assets/images/products/SDSTagFeatures/SDSServiceDogStandardsURL.png"),
            require("../../../assets/images/products/SDSTagFeatures/SDSPrivacyProtectingSecondaryNumber.png"),
            require("../../../assets/images/products/SDSTagFeatures/SDSHelpsSupportVoluntaryServiceDogStandards.png"),
         ];


         return srcs;
      }


   },

}
</script>

<style scoped src="./kit_common.css">

</style>