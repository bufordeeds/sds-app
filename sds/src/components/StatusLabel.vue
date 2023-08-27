<template>
   <div class="background" :class="color_class"   >
      <div class="content">
         <div class="status">
            {{status_map[status]}}
         </div>

         <div v-if="born != null && status==='InMemoriam'">
            Born {{born}}
         </div>
         <div v-if="died != null && status==='InMemoriam'">
            Died {{died}}
         </div>

      </div>


      <div class="chevron"></div>
   </div>
</template>

<script>
export default {
   name: "StatusLabel",
   props: {
      status: {type: String},
      subStatus: {type: String, default: null},
      born: {type: String, default: null},//only if in memoriam
      died: {type: String, default: null},//only if in memoriam
   },

   data(){
      return {
         status_map: {
            InTraining: 'In Training',
            FullyTrained: 'Fully Trained',
            Retired: 'Retired',
            InMemoriam: 'In Memoriam',
            Washout: 'Washout',
            Private: 'Private'

         }
      }
   },

   computed: {
      color_class(){
         if (['Retired', 'InMemoriam'].includes(this.status)){
            return 'bg-grey';
         }
         return 'bg-blue';
      }
   }


}
</script>

<style scoped>
.background {
   height: 150px;

   background-position: center; /* Center the image */
   background-repeat: no-repeat; /* Do not repeat the image */
   background-size: contain;

   margin-top: -60px;

   display: flex;
   justify-content: center;
   align-items: center;
}

.bg-grey{
   background-image: url('../assets/images/content/StatusLabel_dark.png');
}
.bg-blue{
   background-image: url('../assets/images/content/StatusLabel_blue.png');
}


.content {
   color: white;
   padding-bottom: 20px;
}

.status{
   font-size: 16pt;
   font-weight: 600;
}

/*.triangle{*/
/*   --width: 200px;*/
/*   width: 0;*/
/*   height: 0;*/
/*   border-left: var(--width) solid transparent;*/
/*   border-right: var(--width) solid transparent;*/
/*   border-bottom: 20px solid #2d76ba;*/
/*}*/


/*.chevron::before {*/
/*   border-style: solid;*/
/*   border-width: 0.25em 0.25em 0 0;*/
/*   content: '';*/
/*   display: inline-block;*/
/*   height: 0.45em;*/
/*   left: 0.15em;*/
/*   position: relative;*/
/*   top: 0.15em;*/
/*   transform: rotate(-45deg);*/
/*   vertical-align: top;*/
/*   width: 0.45em;*/
/*}*/

/*.chevron.right:before {*/
/*   left: 0;*/
/*   transform: rotate(45deg);*/
/*}*/

/*.chevron.bottom:before {*/
/*   top: 0;*/
/*   transform: rotate(135deg);*/
/*}*/

/*.chevron.left:before {*/
/*   left: 0.25em;*/
/*   transform: rotate(-135deg);*/
/*}*/
</style>