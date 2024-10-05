<template>
  <div>
    <!--<ul class="breadcrumb" v-if="$vuetify.breakpoint.width > 800">-->
    <!--   <li :class="highlighted(1)"><a href="#" class="pl-5 " >Account  Type</a></li>-->
    <!--   <li :class="highlighted(2)"><a href="#" class=" ">Email Verification</a></li>-->
    <!--   <li :class="highlighted(3)"><a href="#">Terms & Conditions</a></li>-->
    <!--   <li :class="highlighted(4)"><a href="#" class="pr-6">Basic Info</a></li>-->
    <!--</ul>-->

    <ol
      id="steps"
      class="flex flex-col"
    >
      <li
        class="steps__list-item flex flex-row"
        :class="active(1)"
      >
        <span
          class="steps__counter"
        >1</span>
        Account Type
      </li>
      <!-- <svg class="svg-container">
        <path
          d="M0 0 L10 20 L00 40"
          class="svg-triangle"
          :style="triangle_style(1)"
        />
      </svg> -->

      <li
        class="steps__list-item flex flex-row"
        :class="active(2)"
      >
        <span
          class="steps__counter"
        >2</span>
        Email Verification
      </li>
      <!-- <svg class="svg-container">
        <path
          d="M0 0 L10 20 L00 40"
          class="svg-triangle"
          :style="triangle_style(2)"
        />
      </svg> -->

      <li
        class="steps__list-item flex flex-row"
        :class="active(3)"
      >
        <span
          class="steps__counter"
        >3</span>
        Terms & Conditions
      </li>
      <!-- <svg class="svg-container">
        <path
          d="M0 0 L10 20 L00 40"
          class="svg-triangle"
          :style="triangle_style(3)"
        />
      </svg> -->

      <li
        class="steps__list-item flex flex-row"
        :class="active(4)"
      >
        <span
          class="steps__counter"
        >4</span>
        Basic Info
      </li>
      <!-- <svg class="svg-container">
        <path
          d="M0 0 L10 20 L00 40"
          class="svg-triangle"
          :style="triangle_style(4)"
        />
      </svg> -->
    </ol>
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
      active(step){
         if (step < this.step){
            return 'steps__list-item--finished';
         }
         else if (this.step === step){
            return 'steps__list-item--active';
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

<style scoped lang="scss">
  #steps {
    list-style-type: none;
    margin: 0;
    padding: 0;
    row-gap: 32px;
  }

  .steps__list-item {
    color: var(--text-medium);
    
    .steps__counter {
      align-items: center;
      background-color: var(--surface-light-white);
      border-radius: 50%;
      color: var(--text-medium);
      display: flex;
      flex-grow: 0;
      font-weight: 700;
      height: 40px;
      justify-content: center;
      position: relative;
      width: 40px;
    }
    
    &.steps__list-item--active  {
      color: var(--brand-primary-500);

      .steps__counter {
        background-color: var(--button-form-button);
        color: var(--text-white);
      }
    }

    &.steps__list-item--finished {
      .steps__counter::before {
        background-color: var(--surface-light-white);
        border: 2px solid var(--button-form-button);
        border-radius: 50%;
        content: '';
        height: 40px;
        position: absolute;
        width: 40px;
      }

      .steps__counter::after {
        border-bottom: 2px solid var(--button-form-button);
        border-right: 2px solid var(--button-form-button);
        content: '';
        height: 20px;
        transform: rotate(45deg) translate(-5px, 1px);
        width: 10px;
      }
    }
  }

/**
*
*
* 10/04 Removed old Stepper styles aage
*
*
*/

/* .breadcrumb-container{
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
} */

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