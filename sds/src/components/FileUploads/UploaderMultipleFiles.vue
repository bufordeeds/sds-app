<template>
  <div>
    <div
      ref="fileDrop"
      class="pa-3 ma-3 file-drop"
      :class="fileDropClass"
    >
      Drag Files Here To Select
    </div>

    <!--      <input type="file" id="input-file" >-->

    <div class="preview-container">
      <div
        v-for="(item, i) in files"
        :key="item.name + i"
      >
        <img
          ref="file_img"
          class="image-preview"
        >
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
//see: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications

export default {
   name: "UserFileUploader",
   data(){
      return {
         files_being_dragged: false,
         files: [],

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
            for( let i = 0; i < e.dataTransfer.files.length; i++ ) {
               // this.files.push( e.dataTransfer.files[i] );

               if (this.files.length === 1 && this.files[0].file == null){
                  this.files =[];
               }

               // this.files.push(e.dataTransfer.files[i]);
               console.log(e.dataTransfer.files[i]);

               this.files.push({
                  name: e.dataTransfer.files[i].name,
                  file: e.dataTransfer.files[i],
                  type: null,
               })
               // console.log(e.dataTransfer.files[i]);
            }//for i

            this.$nextTick(()=>{this.show_files();});
         }.bind(this));





      })//nextTick()
   },//computed


   methods:{


      show_files() {

         let files = this.files;

         let preview = this.$refs.preview;

         for (let i = 0; i < files.length; i++) {
            const file = files[i].file;

            if (!file.type.startsWith('image/')){ continue }


            // const img = document.createElement("img");
            // img.classList.add("image-preview");
            // img.file = file;
            // preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

            let img = this.$refs.file_img[i]; // for some reason the ref is an array of a single element
            console.log('img', img)

            const reader = new FileReader();
            reader.onload = (function(aImg) {
               return function(e) {
                  aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);
         }
      }

   }
}
</script>

<style scoped>
.file-drop{
   background-color: #e9e9e9;
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
   width: 100px;
   padding: 5px;
}
</style>
