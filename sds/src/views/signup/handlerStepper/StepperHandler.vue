<template>
  <div>
    <div
      class="breadcrumb-container mt-2"
      style="margin-left: 10px"
    >
      <div
        class="block"
        :class="highlighted(1)"
      >
        <span v-if="!isMobile">Account Type</span>
        <span v-else>Acct</span>
      </div>
      <svg class="svg-container">
        <path
          d="M0 0 L10 20 L00 40"
          class="svg-triangle"
          :style="triangle_style(1)"
        />
      </svg>


      <div
        class="block"
        :class="highlighted(2)"
      >
        <span v-if="!isMobile">Email Verification</span>
        <span v-else>Email</span>
      </div>
      <svg class="svg-container">
        <path
          d="M0 0 L10 20 L00 40"
          class="svg-triangle"
          :style="triangle_style(2)"
        />
      </svg>



      <div
        class="block"
        :class="highlighted(3)"
      >
        <span v-if="!isMobile">Terms & Conditions</span>
        <span v-else>Terms</span>
      </div>
      <svg class="svg-container">
        <path
          d="M0 0 L10 20 L00 40"
          class="svg-triangle"
          :style="triangle_style(3)"
        />
      </svg>

      <div
        class="block"
        :class="highlighted(4)"
      >
        <span v-if="!isMobile">Basic Info</span>
        <span v-else>Info</span>
      </div>
      <svg class="svg-container">
        <path
          d="M0 0 L10 20 L00 40"
          class="svg-triangle"
          :style="triangle_style(4)"
        />
      </svg>
    </div>
  </div>
</template>

<script>
//based on https://css-tricks.com/triangle-breadcrumbs/
export default {
   name: "StepperHeader",
   props:{
      step: {type: Number, default: 2},
   },

   computed:{
      isMobile(){
         return this.$vuetify.breakpoint.width<700;
      }
   },

   methods:{
      highlighted(step){

         if (step < this.step){
            return 'finished';
         }
         else if (this.step === step){
            return 'highlighted';
         }
         return  '';
      },

      triangle_style(step){

         if (step < this.step){
            return ' fill: #658d2f;';
         }
         else if (this.step === step){
            return ' fill: #8cc63f;';
         }
         return  '';
      },


   }

}
</script>

<style scoped>

.breadcrumb-container{
    display: flex;

}

.block{
    background-color: #61afe1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding-left: 20px;
    padding-right: 10px;
    margin-left: -10px;
    color: white;
    font-size: 13pt;
    font-weight: 500;
}

.highlighted {
    background: #8cc63f !important;
}

/*controls color for finished section*/
.finished {
    background: #658d2f !important;
}

.svg-container{
    width: 10px;
    height: 40px;
    z-index: 2;
}
.svg-triangle{
    fill: #61afe1;
    stroke: #dedede;
    stroke-width:2;
}

@media screen and (max-width: 500px) {
    .block{
        font-size: 11pt;
    }
}



</style>