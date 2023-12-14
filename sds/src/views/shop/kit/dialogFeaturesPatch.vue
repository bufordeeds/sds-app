<template>
  <v-dialog
    v-model="value2"
    width="unset"
    :fullscreen="$vuetify.breakpoint.smAndDown"
  >
    <div class="background">
      <div style="margin-bottom: -10px; display: flex; justify-content: flex-end; width: 100% ">
        <v-btn
          icon
          @click="value2=false"
        >
          <v-icon color="white">
            close
          </v-icon>
        </v-btn>
      </div>


      <div class="kit-heading">
        Service Dog Standards Membership Card Rugged <span style="color: white">Three (3) Patch Set</span>
        with Velcro Backing
      </div>

      <v-img
        src="../../../assets/images/products/SDSPatchwithMeasurements.png"
        max-width="80%"
        contain
      />



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



      <div
        style="display: flex; justify-content: center"
        class="mt-6 pl-5"
      >
        <img
          src="../../../assets/images/products/SDSPatchFeatureShields.png"
          width="90%"
          style="max-width: 350px; align-self: flex-start;"
        >
      </div>


      <div class="kit-heading mt-8">
        Feature Details
      </div>

      <hr
        style="height:1px;border-width:0;color:#cccccc;background-color:#cccccc; width: 80%"
        class="ma-2"
      >

      <div class="benefits-list">
        <div class="benefits-list-item">
          Set of three (3) Patches.  Configure them as you need on any size vest.
        </div>

        <div class="benefits-list-item">
          Heavy Duty, Rugged Military-Spec PVC Patch
        </div>

        <div class="benefits-list-item">
          Micro-Injected Soft PVC with 3D Effect
        </div>

        <div class="benefits-list-item">
          Velcro Backing
        </div>

        <div class="benefits-list-item">
          Simple and Clear Message
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
export default {
   name: "DialogFeaturesCard",
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
            require("../../../assets/images/products/SDSPatchFeatures/SDSVelcroBacked.png"),
            require("../../../assets/images/products/SDSPatchFeatures/SDSMilitaryGradePatches.png"),
            require("../../../assets/images/products/SDSPatchFeatures/SDSSetofThreePatches.png"),
            require("../../../assets/images/products/SDSPatchFeatures/SDSRuggedHeavyDuty.png"),
            require("../../../assets/images/products/SDSPatchFeatures/SDSWaterproofFadeproof.png"),
            require("../../../assets/images/products/SDSPatchFeatures/SDSHelpsSupportVoluntaryServiceDogStandards.png"),
         ];


         return srcs;
      }


   },

}
</script>

<style scoped src="./kit_common.css">

</style>