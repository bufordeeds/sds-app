<template>
  <div>
    <!--<ul class="breadcrumb" v-if="$vuetify.breakpoint.width > 800">-->
    <!--   <li :class="highlighted(1)"><a href="#" class="pl-5 " >Account  Type</a></li>-->
    <!--   <li :class="highlighted(2)"><a href="#" class=" ">Email Verification</a></li>-->
    <!--   <li :class="highlighted(3)"><a href="#">Terms & Conditions</a></li>-->
    <!--   <li :class="highlighted(4)"><a href="#" class="pr-6">Basic Info</a></li>-->
    <!--</ul>-->

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











/*!*get rid of the normal styling for a list*!*/
/*.breadcrumb {*/
/*   list-style: none;*/
/*   overflow: hidden;*/
/*   font: 18px Sans-Serif;*/
/*   padding-left: 0px;*/
/*   padding-right: 32px*/
/*}*/
/*.breadcrumb li {*/
/*   float: left;*/
/*}*/

/*!*style the boxes  as we like*!*/
/*.breadcrumb li a {*/
/*   color: white;*/
/*   text-decoration: none;*/
/*   padding: 10px 0 10px 65px;*/
/*   !*background: brown; !* fallback color *!*!*/
/*   background: #61afe1;*/
/*   position: relative;*/
/*   display: block;*/
/*   float: left;*/
/*}*/

/*!*creates triangle at end of each li element *!*/
/*.breadcrumb li a::after {*/
/*   content: " ";*/
/*   display: block;*/
/*   width: 0;*/
/*   height: 0;*/
/*   border-top: 50px solid transparent; !* Go big on the size, and let overflow hide *!*/
/*   border-bottom: 50px solid transparent;*/
/*   border-left: 30px solid #61afe1;*/
/*   position: absolute;*/
/*   top: 50%;*/
/*   margin-top: -50px;*/
/*   left: 100%;*/
/*   z-index: 2;*/

/*}*/


/*!*creates another triangle that overlays to create a white border effect*!*/
/*.breadcrumb li a:before {*/
/*   content: " ";*/
/*   display: block;*/
/*   width: 0;*/
/*   height: 0;*/
/*   border-top: 50px solid transparent;           !* Go big on the size, and let overflow hide *!*/
/*   border-bottom: 50px solid transparent;*/
/*   border-left: 30px solid #dbdbdb;*/
/*   position: absolute;*/
/*   top: 50%;*/
/*   margin-top: -50px;*/
/*   margin-left: 2px;*/
/*   left: 100%;*/
/*   z-index: 1;*/
/*}*/


/*.breadcrumb li:first-child a {*/
/*   padding-left: 10px;*/
/*}*/




/*!*controls color for highlighted section*!*/
/*li.highlighted a {*/
/*   background: #8cc63f !important;*/
/*}*/
/*li.highlighted a:after {*/
/*   border-left-color: #8cc63f !important;*/
/*}*/


/*!*controls color for finished section*!*/
/*li.finished a {*/
/*   background: #658d2f !important;*/
/*}*/
/*li.finished a:after {*/
/*   border-left-color: #658d2f !important;*/
/*}*/




</style>