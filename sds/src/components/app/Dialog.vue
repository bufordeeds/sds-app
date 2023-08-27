<template>
<!--   <div>-->
<!--      <div class="my-container" v-if="value">-->
<!--      </div>-->


<!--      <div class="content-container">-->
<!--         <div ref="dialog_content" :style="container_style" >-->
<!--            <slot style="z-index: 200"></slot>-->
<!--         </div>-->

<!--      </div>-->
<!--   </div>-->


<div class="my-container" v-if="value">
   <div class="my-content-container">
      <div ref="dialog_content" :style="container_style" >
         <slot style="z-index: 200; "></slot>
      </div>

   </div>

</div>
</template>

<script>
export default {
   name: "MyDialog",
   props: {
     attachId:  {type: String, default: null }, //element id string
      value:  {type: Boolean, default: true} , // controls if dialog is visible
      contentWidth: {type: Number, default: 500},
      boundingBox: {type: Object, default: null},

   },
   data(){
      return {
         left: 0,
         right: 0,
         top: 0,
         bot: 0,

         // content_width: 0,
         content_height:0,
      }
   },

   computed: {
     container_style(){
        let diag_left = (this.left + this.right)/2 - this.contentWidth/2;

        return `left: ${diag_left}px; position: fixed; width: ${this.contentWidth}px`
        // return  `left: 700px; position: fixed;`
      }
   },


   mounted(){



      console.log('boundingbox', this.boundingBox)
      this.$nextTick(()=>{
         if (this.attachId !== null){

            console.log('attachId', this.attachId)

            let el = document.getElementById(this.attachId);
            let rect = el.getBoundingClientRect();

            console.log('attach_id', rect)
            this.left = rect.left;
            this.top = rect.top;
            this.right = rect.right;
            this.bot = rect.bottom;

            // rect = this.$refs.dialog_content.getBoundingClientRect();
            //
            // this.content_height = rect.height;
            // this.content_width = rect.width;
            // console.log(rect)

         }
         else if (this.boundingBox !== null){
            console.log('boundingbox', this.boundingBox)
            this.left = this.boundingBox.left;
            this.right = this.boundingBox.right;
            // this.top = this.boundingBox.top;
            // this.bot = this.boundingBox.bottom;

         }

      })


   }

}
</script>

<style scoped>
   .my-container{
      position: fixed;
      height: 100%;
      /*width: 50%;*/
      top:0;
      left:0;
      right:0;
      z-index: 100;
      background: rgba(0, 0, 0, 0.7);
      opacity: 1;
   }

   .my-content-container{
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 1;
      z-index: 101;

   }
</style>
