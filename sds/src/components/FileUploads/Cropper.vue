<template>
   <div style="width: 100%; overflow: auto " >

      <!--<div class="progress-wait" v-if="cropping">-->
      <!--   <v-progress-circular-->
      <!--       size="100"-->
      <!--       indeterminate-->
      <!--       width="10"-->
      <!--       color="var(&#45;&#45;color-primary)"-->
      <!--   ></v-progress-circular>-->
      <!--</div>-->



      <div class="header pl-1 pr-1" >
         <div class="dialog-heading" :style="{'font-size': isMobile? '12pt': '16pt'}">Image Editor/Uploader</div>

                  <v-btn icon @click="$emit('close')">
                     <v-icon>close</v-icon>
                  </v-btn>
      </div>

      <hr class="mb-2" />

      <input
          ref="input"
          type="file"
          name="image"
          accept="image/*"
          @change="setImage"
      />

      <div class="content">

         <section class="cropper-area mr-4" style="display: flex; flex-direction: column">
            <div class=" " style="width: 100%;">

               <upload-file-drop
                   v-if="imgSrc==null"
                   @file-dropped="setImage($event, true)"
               ></upload-file-drop>


               <vue-cropper
                   ref="cropper"
                   :aspect-ratio="cropRatio"
                   :src="imgSrc"
                   preview=".preview"
                   :style="cropper_style"
                   style="width: 100%; "
                   :containerStyle="{'max-height': 'calc(100vh - 250px)'}"

               />

<!--               -->
<!--               <div-->
<!--                   v-if="imgSrc!==null"-->
<!--                   style="display: flex; justify-content: flex-end; margin-top: -30px; padding-right:10px; margin-bottom: 10px"-->
<!--               >-->
<!--                  <v-btn x-small @click="imgSrc=null">-->
<!--                     Clear-->
<!--                  </v-btn>-->
<!--               </div>-->
            </div>


            <div class="action-row" :style="isMobile?'order:3;':''">
               <div class="pb-1">
                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="zoom(0.2)"
                      class="action-button"
                      :disabled="disabled"
                  >
                     <v-icon>zoom_in</v-icon>
                  </v-btn>


                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="zoom(-0.2)"
                      class="action-button"
                      :disabled="disabled"
                  >
                     <v-icon>zoom_out</v-icon>
                  </v-btn>


                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="rotate(-90)"
                      class="action-button"
                      :disabled="disabled"
                  >
                     <v-icon>rotate_left</v-icon>
                  </v-btn>

                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="rotate(90)"
                      class="action-button"
                      :disabled="disabled"
                  >
                     <v-icon>rotate_right</v-icon>
                  </v-btn>
               </div>



               <div class="pb-1">
                  <!-- move left-->
                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="move(-10, 0)"
                      class="action-button"
                      :disabled="disabled"
                  >
                     <v-icon style="transform: rotate(180deg)">arrow_right_alt</v-icon>
                  </v-btn>




                  <!-- move right-->
                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="move(10, 0)"
                      class="action-button"
                      :disabled="disabled"
                  >
                     <v-icon>arrow_right_alt</v-icon>
                  </v-btn>

                  <!-- move up-->
                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="move(0, -10)"
                      class="action-button"
                      :disabled="disabled"
                  >
                     <v-icon style="transform: rotate(-90deg)">arrow_right_alt</v-icon>
                  </v-btn>

                  <!-- move down-->
                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="move(0, 10)"
                      class="action-button"
                      :disabled="disabled"
                  >
                     <v-icon style="transform: rotate(90deg)">arrow_right_alt</v-icon>
                  </v-btn>
               </div>

            </div>






            <div class="action-row mb-4" :style="isMobile?'margin-top: -0px;':''">

               <div class="action-row" >
                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="imgSrc=null"
                      class="action-button"
                      :disabled="disabled"
                  >
                     <v-icon small> delete</v-icon>
                     Clear
                  </v-btn>

                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="reset"
                      class="action-button"
                      :disabled="disabled"
                  >
                     <v-icon>settings_backup_restore</v-icon>
                     Reset
                  </v-btn>
               </div>


               <div class="action-row" >
                  <v-btn
                      small
                      color="var(--color-btn)"
                      @click="showFileChooser"
                      class="action-button"
                  >
                     Select Image
                  </v-btn>


                  <v-btn
                      small
                      color="#08b108"
                      @click="cropImage"
                      class="action-button"
                      :disabled="disabled"
                      :loading="cropping"
                  >
                     Save/Upload

                  </v-btn>
               </div>


            </div>

























            <!--<v-row dense>-->
            <!--   <v-col cols="12" sm="6" class="action-row">-->
            <!--      <v-btn-->
            <!--          small-->
            <!--          color="var(&#45;&#45;color-btn)"-->
            <!--          @click="zoom(0.2)"-->
            <!--          class="action-button"-->
            <!--          :disabled="disabled"-->
            <!--      >-->
            <!--         <v-icon>zoom_in</v-icon>-->
            <!--      </v-btn>-->


            <!--      <v-btn-->
            <!--          small-->
            <!--          color="var(&#45;&#45;color-btn)"-->
            <!--          @click="zoom(-0.2)"-->
            <!--          class="action-button"-->
            <!--          :disabled="disabled"-->
            <!--      >-->
            <!--         <v-icon>zoom_out</v-icon>-->
            <!--      </v-btn>-->


            <!--      <v-btn-->
            <!--          small-->
            <!--          color="var(&#45;&#45;color-btn)"-->
            <!--          @click="rotate(-90)"-->
            <!--          class="action-button"-->
            <!--          :disabled="disabled"-->
            <!--      >-->
            <!--         <v-icon>rotate_left</v-icon>-->
            <!--      </v-btn>-->

            <!--      <v-btn-->
            <!--          small-->
            <!--          color="var(&#45;&#45;color-btn)"-->
            <!--          @click="rotate(90)"-->
            <!--          class="action-button"-->
            <!--          :disabled="disabled"-->
            <!--      >-->
            <!--         <v-icon>rotate_right</v-icon>-->
            <!--      </v-btn>-->
            <!--   </v-col>-->

            <!--   <v-col cols="12" sm="6" class="action-row">-->
            <!--      &lt;!&ndash; move left&ndash;&gt;-->
            <!--      <v-btn-->
            <!--          small-->
            <!--          color="var(&#45;&#45;color-btn)"-->
            <!--          @click="move(-10, 0)"-->
            <!--          class="action-button"-->
            <!--          :disabled="disabled"-->
            <!--      >-->
            <!--         <v-icon style="transform: rotate(180deg)">arrow_right_alt</v-icon>-->
            <!--      </v-btn>-->




            <!--      &lt;!&ndash; move right&ndash;&gt;-->
            <!--      <v-btn-->
            <!--          small-->
            <!--          color="var(&#45;&#45;color-btn)"-->
            <!--          @click="move(10, 0)"-->
            <!--          class="action-button"-->
            <!--          :disabled="disabled"-->
            <!--      >-->
            <!--         <v-icon>arrow_right_alt</v-icon>-->
            <!--      </v-btn>-->

            <!--      &lt;!&ndash; move up&ndash;&gt;-->
            <!--      <v-btn-->
            <!--          small-->
            <!--          color="var(&#45;&#45;color-btn)"-->
            <!--          @click="move(0, -10)"-->
            <!--          class="action-button"-->
            <!--          :disabled="disabled"-->
            <!--      >-->
            <!--         <v-icon style="transform: rotate(-90deg)">arrow_right_alt</v-icon>-->
            <!--      </v-btn>-->

            <!--      &lt;!&ndash; move down&ndash;&gt;-->
            <!--      <v-btn-->
            <!--          small-->
            <!--          color="var(&#45;&#45;color-btn)"-->
            <!--          @click="move(0, 10)"-->
            <!--          class="action-button"-->
            <!--          :disabled="disabled"-->
            <!--      >-->
            <!--         <v-icon style="transform: rotate(90deg)">arrow_right_alt</v-icon>-->
            <!--      </v-btn>-->
            <!--   </v-col>-->
            <!--</v-row>-->














            <!--<v-row dense>-->
            <!--   <v-col cols="12" sm="6" class="action-row">-->

            <!--      <v-btn-->
            <!--          small-->
            <!--          color="var(&#45;&#45;color-btn)"-->
            <!--          @click="imgSrc=null"-->
            <!--          class="action-button"-->
            <!--          :disabled="disabled"-->
            <!--      >-->
            <!--         <v-icon small> delete</v-icon>-->
            <!--         Clear-->
            <!--      </v-btn>-->

            <!--      <v-btn-->
            <!--          small-->
            <!--          color="var(&#45;&#45;color-btn)"-->
            <!--          @click="reset"-->
            <!--          class="action-button"-->
            <!--          :disabled="disabled"-->
            <!--      >-->
            <!--         <v-icon>settings_backup_restore</v-icon>-->
            <!--         Reset-->
            <!--      </v-btn>-->

            <!--   </v-col>-->




            <!--   <v-col cols="12" sm="6" class="action-row" >-->


            <!--         <v-btn-->
            <!--             small-->
            <!--             color="var(&#45;&#45;color-btn)"-->
            <!--             @click="showFileChooser"-->
            <!--             class="action-button"-->
            <!--         >-->
            <!--            Select Image-->
            <!--         </v-btn>-->


            <!--         <v-btn-->
            <!--             small-->
            <!--             color="#08b108"-->
            <!--             @click="cropImage"-->
            <!--             class="action-button"-->
            <!--             :disabled="disabled"-->
            <!--             :loading="cropping"-->
            <!--         >-->
            <!--            Save/Upload-->

            <!--         </v-btn>-->

            <!--   </v-col>-->
            <!--</v-row>-->




         </section>




         <section class="preview-area" :style="cropper_style" v-if="!isMobile">
            <p>Preview</p>
            <div class="preview sds-preview" style="background-color: #c4c4c4"/>

            <!--            <p>Cropped Image</p>-->
            <!--            <div class="cropped-image">-->
            <!--               <img-->
            <!--                   v-if="cropImg"-->
            <!--                   :src="cropImg"-->
            <!--                   alt="Cropped Image"-->
            <!--               />-->
            <!--               <div v-else class="crop-placeholder" />-->
            <!--            </div>-->
         </section>
      </div>


   </div>
</template>

<script>


/**
 * Base code taken from https://github.com/Agontuk/vue-cropperjs/tree/master/example
 */
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';


import UploadFileDrop from "@/components/FileUploads/UploadFileDrop";

export default {
   components: {
      VueCropper,
      UploadFileDrop
   },
   props:{
      cropRatio: {type: Number, default: 1},
   },
   data() {
      return {
         imgSrc: null, //require('../assets/images/content/dog-no-image.png') ,
         cropImg: '',
         data: null,

         filename: '',

         cropping: false,


      };
   },

   watch:{
      show(newVal){
         if (newVal !== this.show2){
            this.show2 = newVal;
         }

      },

      show2(newVal){
        if (newVal !== this.show){
           this.$emit('update:show', newVal);
        }

     }
   },
   computed: {
      // preview_style(){
      //    return 'height: calc('
      //
      // }
      // max_width(){
      //    if (this.imgSrc == null){
      //       return '600px'
      //    }
      //    return '600px';
      // },

      isMobile(){
         return this.$vuetify.breakpoint.width < 800;
      },

      cropper_style(){
         if (this.imgSrc == null){
            return 'display: none'
         }
         return '';
      },

      disabled(){
         if (this.imgSrc == null){
            return true;
         }
         return false;
      }



   },
   methods: {
      cropImage() {
         this.cropping = true;

         // get image data for post processing, e.g. upload or setting image src
         // this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
         // this.$emit('cropped', {blob:this.cropImg, filename: this.filename});

         let type = 'image/png';

         let tmp = this.filename.split('.')
         let ext = tmp[tmp.length-1];
         if (['jpg', 'jpeg'].includes( ext.toLowerCase())){
            type = 'image/jpeg'
         }


         this.$refs.cropper.getCroppedCanvas().toBlob((data)=>{
            this.$emit('cropped', {blob:data, filename: this.filename});

         }, type);

      },
      flipX() {
         const dom = this.$refs.flipX;
         let scale = dom.getAttribute('data-scale');
         scale = scale ? -scale : -1;
         this.$refs.cropper.scaleX(scale);
         dom.setAttribute('data-scale', scale);
      },
      flipY() {
         const dom = this.$refs.flipY;
         let scale = dom.getAttribute('data-scale');
         scale = scale ? -scale : -1;
         this.$refs.cropper.scaleY(scale);
         dom.setAttribute('data-scale', scale);
      },
      getCropBoxData() {
         this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
      },
      getData() {
         this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
      },
      move(offsetX, offsetY) {
         this.$refs.cropper.move(offsetX, offsetY);
      },
      reset() {
         this.$refs.cropper.reset();
      },
      rotate(deg) {
         this.$refs.cropper.rotate(deg);
      },
      setCropBoxData() {
         if (!this.data) return;

         this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
      },
      setData() {
         if (!this.data) return;

         this.$refs.cropper.setData(JSON.parse(this.data));
      },
      setImage(e, dropped=false) {

         console.log('e', e);

         let file;
         if (dropped){
            file = e[0]; //assumes we're getting the filelist directly
         }
         else {
            //assumes we're passing in a single file directly
            file = e.target.files[0];

         }


         this.filename = file.name;

         if (file.type.indexOf('image/') === -1) {
            alert('Please select an image file');
            return;
         }



         if (typeof FileReader === 'function') {
            const reader = new FileReader();

            reader.onload = (event) => {
               this.imgSrc = event.target.result;
               // rebuild cropperjs with the updated source
               this.$refs.cropper.replace(event.target.result);
            };

            reader.readAsDataURL(file);
         } else {
            alert('Sorry, FileReader API not supported');
         }
      },

      //if file is obtained not from the file explorer dialog
      set_image_handler(file){

         console.log(file)
         // this.imgSrc = file;
         // this.filename = file.name;
         // // rebuild cropperjs with the updated source
         // this.$refs.cropper.replace(file);
      },


      showFileChooser() {
         this.$refs.input.click();
      },
      zoom(percent) {
         this.$refs.cropper.relativeZoom(percent);
      },
   },












};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

div >>> .cropper-bg{
   background-repeat: repeat;
}

/*body {*/
/*   font-family: Arial, Helvetica, sans-serif;*/
/*   width: 1024px;*/
/*   margin: 0 auto;*/
/*}*/

input[type="file"] {
   display: none;
}

.header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 0px 0 5px 0;
}

.header h2 {
   margin: 0;
}

.header a {
   text-decoration: none;
   color: black;
}

.content {
   display: flex;
   justify-content: center;
}

.cropper-area {
   width: 614px;
   /*width: 60vw;*/
}

div >>> .cropper-container{
   width: 100%;
}

.actions {
   margin-top: 1rem;
}

.actions a {
   display: inline-block;
   padding: 5px 15px;
   background: #0062CC;
   color: white;
   text-decoration: none;
   border-radius: 3px;
   margin-right: 1rem;
   margin-bottom: 1rem;
}

textarea {
   width: 100%;
   height: 100px;
}

.preview-area {
   width: 307px;
}

.preview-area p {
   font-size: 1.25rem;
   margin: 0;
   margin-bottom: 1rem;
}

.preview-area p:last-of-type {
   margin-top: 1rem;
}

.preview {
   width: 100%;
   height: calc(372px * (9 / 16));
   overflow: hidden;

   /*border: solid 1px grey;*/
}

.crop-placeholder {
   width: 100%;
   height: 200px;
   background: #ccc;
}

.cropped-image img {
   max-width: 100%;
}




/*action row*/

.action-row{
   padding-top:10px;
   display: flex;
   justify-content: center;
    flex-wrap: wrap;
}

.action-button{
   color: white;
   margin-left:5px;
}

.test{
   color: #08b108;
}


.progress-wait{
   position: absolute;
   margin-top: 30px;
   width: calc(100% - 20px);
   display: flex;
   justify-content: center;
   align-items: center;
   height: calc(100% - 20px);
   z-index: 20;

}

</style>
