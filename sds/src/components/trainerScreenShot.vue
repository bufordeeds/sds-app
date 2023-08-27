<template>
<div style="position: relative; width:100%">
   <img src="../assets/images/content/SDSSecureProfileExampleAsset_15.png" width="100%">
   <div class="line-animation">
      <line-animation2 :speed="2" />

   </div>
</div>
</template>

<script>
/*
See task_id=62acee3848eb1fcef174ccf3
tried to make the lines animated in the screenshot but it would take a lot of work to get this work and scale properly.
 */
import LineAnimation2 from "@/components/LineAnimation2";
export default {
   name: "trainerScreenShot",
   components: {LineAnimation2}
}
</script>

<style scoped>
.line-animation{
    position: absolute;
    top: 35%;
    left: 16%;
    width: 18%;
    /*height: 10%;*/
    background-color: white;
    /*border: 1px solid red;*/
}
</style>
