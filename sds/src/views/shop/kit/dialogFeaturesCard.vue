<template>
   <v-dialog width="unset" v-model="value2" :fullscreen="$vuetify.breakpoint.smAndDown">
      <div class="background">
         <div style="margin-bottom: -10px; display: flex; justify-content: flex-end; width: 100% ">
            <v-btn icon @click="value2=false">
               <v-icon color="white">close</v-icon>
            </v-btn>
         </div>


         <div class="kit-heading">
            Service Dog Standards Membership Card
         </div>

         <v-img
             :src="src"
             max-width="80%"
             contain
         ></v-img>

         <div>
            <v-btn text color="white" @click="image_front=true">Front</v-btn>
            <v-btn text color="white" @click="image_front=false">Back</v-btn>
         </div>


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

            <img src="../../../assets/images/products/SDSCardFeatureShields.png" width="90%" style="max-width: 350px; align-self: flex-start;" >
         </div>



         <div class="kit-heading mt-8">
            Unique Security Feature Details
         </div>

         <hr style="height:1px;border-width:0;color:#cccccc;background-color:#cccccc; width: 80%" class="ma-2" >

         <div class="benefits-list">
            Custom Unbounded Holographic Logo <br>
            Colorshifting Printing <br>
            Fine Line Printing Patterns <br>
            Access Icons &#8482;<br>
            Expiration Date <br>
            ServiceDogStandards.org Web Address <br>
            Signature Strip on Back
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
            require("../../../assets/images/products/SDSCardFeatures/SDSHeavyDutyPlasticCards.png"),
            require("../../../assets/images/products/SDSCardFeatures/SDSServiceDogStandardsURL.png"),
            require("../../../assets/images/products/SDSCardFeatures/SDSPrintedSecurityFeatures.png"),
            require("../../../assets/images/products/SDSCardFeatures/SDSMetallicLogoHologram.png"),
            require("../../../assets/images/products/SDSCardFeatures/SDSSignatureStriponBack.png"),
            require("../../../assets/images/products/SDSCardFeatures/SDSColorshiftingAccessIcons.png"),
            require("../../../assets/images/products/SDSCardFeatures/SDSHelpsSupportVoluntaryServiceDogStandards.png"),
         ];


         return srcs;
      }


   },

}
</script>

<style scoped src="./kit_common.css">

</style>