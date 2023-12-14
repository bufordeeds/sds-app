<template>
  <div class="pa-5">
    <div style="display: flex; justify-content: center">
      <div
        ref="fileDrop"
        class="file-drop"
        :class="fileDropClass"
      >
        <div
          v-if="file === null"
          style="text-align: center"
        >
          Drag Image Here To Select
        </div>

        <img
          v-else
          ref="file_img"
          class="image-preview"
        >
      </div>
    </div>
  </div>
</template>

<script>
//see: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
import data_getters from "@/mixins/data_getters";


/**
 * Just handles the dropping of a file into the browser
 * on file drop, a 'file-dropped' event is emitted with the payload being a fileList object from the
 * original browser event.
 */

export default {
   name: "UserFileUploader",
   mixins: [data_getters],
   props:{
   },
   data(){
      return {
         files_being_dragged: false,
         file: null,

         file_data: [],// used to hold data for
      }
   },

   computed:{
      fileDropClass(){
         if (this.files_being_dragged){
            return 'file-drop-dragover';
         }
         else{
            return '';
         }
      }
   },//computed



   mounted(){
      this.$nextTick(() => {

         /*
         ***************stuff for creating file drop**********************************
         *
          https://serversideup.net/drag-and-drop-file-uploads-with-vuejs-and-axios/
          For each event add an event listener that prevents the default action
          (opening the file in the browser) and stop the propagation of the event (so
          no other elements open the file in the browser)
         */
         ['drag', 'dragover', 'dragstart', 'dragenter'].forEach( ( evt ) => {
            this.$refs.fileDrop.addEventListener(evt, (e) =>{
               e.preventDefault();
               e.stopPropagation();
               console.log('drag event')
               this.files_being_dragged = true;
            }, false);
         });


         ['dragend',  'dragleave'].forEach( ( evt ) =>{
            this.$refs.fileDrop.addEventListener(evt, (e)=>{
               e.preventDefault();
               e.stopPropagation();
               this.files_being_dragged = false;
            }, false);
         });


         this.$refs.fileDrop.addEventListener('drop', function(e){
            e.preventDefault();
            e.stopPropagation();
            this.files_being_dragged = false;

            //Capture the files from the drop event and add them to our local files array.

            console.log('files', e)

            if (e.dataTransfer.files.length> 0){
               this.file = e.dataTransfer.files[0]; //just get the first file
               this.$emit('file-dropped', e.dataTransfer.files);
               console.log('files', this.file)
            }

            // this.$nextTick(()=>{this.show_files();});

         }.bind(this));

      })//nextTick()
   }
}
</script>

<style scoped>
.file-drop{
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: #e9e9e9;
   max-width: 400px;
    width: 90%;
    /*width: 200px;*/
   min-height: 200px;
}


.btn-container{
   display: flex;
   justify-content: space-between;
   align-items: center;
   width: 400px;
   margin-top:20px;
}
.file-drop-dragover{

   background-color: #51be34;
}
.preview-container{
   display: flex;
   justify-content: flex-start;
   flex-wrap: wrap;
}

.image-preview{
   width: 100%;
   /*padding: 5px;*/
}
</style>
