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
        Service Dog Standards Stainless Steel Tag
      </div>

      <v-img
        src="../../../assets/images/products/SDSTag.png"
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
          src="../../../assets/images/products/SDSTagFeatureShields.png"
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
          Heavy Duty Stainless Steel
        </div>

        <div class="benefits-list-item">
          ServiceDogStandards.org Web Address
        </div>
      </div>




      <div style="border: 1px solid dimgrey; width: 80%; display: flex; flex-direction: column; align-items: center; margin-top: 30px ">
        <div
          style="border-bottom: 1px solid dimgrey; width: 100%; max-width: none"
          class="benefits-list pt-2 pb-2"
        >
          Privacy Protecting Secondary Number
        </div>

        <div
          class="benefits-list pt-2 pb-2"
          style="line-height: 1.4;"
        >
          <div class="pa-2">
            <p>
              This tag uses a unique secondary number, different from your Service Dog Standards Membership Number.
            </p>


            <p>
              This secondary number protects your disability privacy should your Service Dog lose their tag.
            </p>


            <p>
              If your dog loses their tag or if you need other  replacement items, you may order replacement
              items individually without purchasing another full kit
            </p>
          </div>
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