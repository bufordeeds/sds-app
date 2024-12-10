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
      step: { type: [String, Number], default: 1},
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

<style>
#steps {
  list-style-type: none;
  margin: 0;
  padding: 0;
  row-gap: 32px;
}

.steps__list-item {
  font-size: var(--rt-h5);
  font-weight: 600;
  color: var(--text-medium);
}

.steps__list-item.steps__list-item--active  {
  color: var(--brand-primary-500);
}

.steps__counter {
  align-items: center;
  background-color: var(--surface-light-white);
  border-radius: 50%;
  color: var(--text-medium);
}

.steps__list-item.steps__list-item--active .steps__counter {
  background-color: var(--button-form-button);
  color: var(--text-white);
}

.steps__list-item .steps__counter {
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


.steps__list-item.steps__list-item--finished .steps__counter::before {
  background-color: var(--surface-light-white);
  border: 2px solid var(--button-form-button);
  border-radius: 50%;
  content: '';
  height: 40px;
  position: absolute;
  width: 40px;
}

.steps__list-item.steps__list-item--finished .steps__counter::after {
  border-bottom: 2px solid var(--button-form-button);
  border-right: 2px solid var(--button-form-button);
  content: '';
  height: 20px;
  transform: rotate(45deg) translate(-5px, 1px);
  width: 10px;
}
</style>