<template>
<span>
   <!--   see arrow.ai file in design/assets folder for svg code-->


<!--   if vertical arrow-->
   <svg  v-if="direction==='up' || direction==='down'"
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 325.34" preserveAspectRatio="xMidYMid slice" :height="height">
      <path :style="arrow_style"
            d="M194.33,88.27,110.88,5.33l0,0a16.19,16.19,0,0,0-22.72,0h0L4.67,88.27a15.75,15.75,0,0,0,.06,22.45,16.16,16.16,0,0,0,22.69-.06L83.45,55V310.13a16.05,16.05,0,0,0,32.1,0V55l56,55.68a16.16,16.16,0,0,0,22.69,0A15.74,15.74,0,0,0,194.33,88.27Z"
            :transform="transform"
      />
   </svg>


<!--   if side ways arrow-->
   <svg v-else
       xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326.24 199.71" preserveAspectRatio="xMidYMid slice" :width="width">
      <path
          :style="arrow_style"
          d="M238.56,194.81l82.94-83.45h0a16.19,16.19,0,0,0,0-22.72v0L238.56,5.16a15.76,15.76,0,0,0-22.45,0,16.18,16.18,0,0,0,.06,22.7l55.68,56H16.7a16,16,0,0,0,0,32.09H271.85l-55.68,56a16.18,16.18,0,0,0,0,22.7A15.75,15.75,0,0,0,238.56,194.81Z"
          :transform="transform2"
      />

   </svg>

</span>

</template>

<script>

/**
 * my own custom stylable arrow...cause material design arrow icons suck!
 */

export default {
   name: "arrow",
   props:{
      height: {type: [String, Number], default: 20},
      width: {type: [String, Number], default: 20},
      direction: {type: String, default: 'up'}, // up/down, add left/right later
      color: {type: String, default: 'grey'}, // color of arrow, can be any css style value
   },
   computed:{
      transform(){
         if (this.direction === 'down')
            return "rotate(180, 100, 160)";
         else
            return '';
      },

      transform2(){
         if (this.direction === 'left')
            return "rotate(180, 160, 100)";
         else
            return '';
      },

      arrow_style(){
         return `fill: ${this.color};`;
      },
   }

}
</script>

<style scoped>

.arrrow_style{
   fill: #ff1afc;
}
</style>
