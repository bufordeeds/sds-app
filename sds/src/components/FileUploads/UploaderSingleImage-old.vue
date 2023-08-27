<template>
   <div>

      <div style="display: flex; justify-content: center">
         <div ref="fileDrop" class="file-drop" :class="fileDropClass">
            <div v-if="file === null"
                style="text-align: center">
               Drag Files Here To Select
            </div>

            <img
                v-else
                ref="file_img"
                class="image-preview"
            >
         </div>
      </div>

      <div style="display: flex; justify-content: center">
         <div class="btn-container">
            <v-btn @click="file=null">Clear</v-btn>
            <v-btn @click="upload_file" color="var(--color-primary)">Upload</v-btn>
         </div>
      </div>








      <vue-cropper
          ref="cropper"
          src="imgSrc"
          :aspect-ratio="16 / 9"
      >
      </vue-cropper>




   </div>
</template>

<script>
//see: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
import data_getters from "@/mixins/data_getters";

import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default {
   name: "UserFileUploader",
   components: {VueCropper},
   mixins: [data_getters],
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


   methods:{

      on_img_load(e){
         let img = this.$refs.file_img; // for some reason the ref is an array of a single element
         let img_c = this.$refs.cropper;
         console.log('img', img_c)
         img.src = e.target.result;
         img_c.src = e.target.result;
      },

      show_files() {

         let file = this.file;
         if (file.type.startsWith('image/')){

            let img = this.$refs.file_img; // for some reason the ref is an array of a single element
            let img_c = this.$refs.cropper;
            console.log('img', img_c)

            const reader = new FileReader();

            reader.onload = this.on_img_load;

            // reader.onload = (function(aImg, bImg) {
            //    return function(e) {
            //       aImg.src = e.target.result; }; })(img, img_c);
            //
            reader.readAsDataURL(file);
         }


      },



      async upload_file(){
         try {
            this.submit_upload_files = true;
            //create form data object to pass to upload endpoint
            let formData = new FormData();

            formData.append('profile_pic', this.file);


            // note: you cannot access formData objects directly.
            // i.e. logging formData will just show an empty object
            for (var data of formData) {
               console.log(data);
            }


            let headers = {'content-type': 'multipart/form-data'};

            let res = await this.make_request('/private/uploadProfileImage', formData, {headers});


         }
         catch(err){
            throw err;
            // this.show_error_details(err, 'upload_files()');
            // this.form_error_3 = "There was an issues uploading files to server."

         }
         this.submit_upload_files = false;
      },

   },//methods


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
         ['drag', 'dragover', 'dragstart', 'dragenter'].forEach( function( evt ) {
            this.$refs.fileDrop.addEventListener(evt, function(e){
               e.preventDefault();
               e.stopPropagation();
               console.log('drag event')
               this.files_being_dragged = true;
            }.bind(this), false);
         }.bind(this));


         ['dragend',  'dragleave'].forEach( function( evt ) {
            this.$refs.fileDrop.addEventListener(evt, function(e){
               e.preventDefault();
               e.stopPropagation();
               this.files_being_dragged = false;
            }.bind(this), false);
         }.bind(this));


         this.$refs.fileDrop.addEventListener('drop', function(e){
            e.preventDefault();
            e.stopPropagation();
            this.files_being_dragged = false;

            //Capture the files from the drop event and add them to our local files array.

            if (e.dataTransfer.files.length> 0){
               this.file = e.dataTransfer.files[0]; //just get the first file
            }

            this.$nextTick(()=>{this.show_files();});

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
   width: 400px;
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
