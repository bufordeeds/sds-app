<template>
  <div>
    <v-dialog
      :value="show2"
      persistent
      :fullscreen="$vuetify.breakpoint.width<500"
      width="unset"
    >
      <v-card class="pa-3">
        <cropper
          :crop-ratio="ratio"
          @close="show2=false"
          @cropped="upload_file"
        />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import Cropper from "@/components/FileUploads/Cropper";

export default {
   name: "UserFileUploader",
   components: {Cropper},
   mixins: [data_getters],
   props:{
     profileType: {type: String, default:'user'},// user|dog
      fileType:  {type: String, default: null},// profile | banner | gallery | dog_kit
      // userType:  {type: String, default: null},// TRAINER, HANDLER, AIDE, needed for banner files (to know which property to save to)
     dog_id: {type: String, default:null}, //required if dog

      user_id: {type: String, default:null}, // required if logged in user is an admin (and profile type = user)

      show: {type: Boolean, default:true},
   },
   data(){
      return {
         files_being_dragged: false,
         file: null,

         show2: this.show,
         file_data: [],// used to hold data for
      }
   },

   computed:{

      ratio(){
         if (this.fileType === 'profile'){
            return 1;
         }
         else if (this.fileType === 'dog_kit'){
            return 1;
         }
         else if (this.fileType === 'banner'){
            return 1000/400;
         }
         else{
            return NaN;
         }
      }

   },

   watch:{
      show(newVal){
         if (newVal !== this.show2){
            this.show2 = newVal;
         }

      },

      show2(newVal){
         this.$emit('update:show', newVal);


      }
   },//computed


   methods:{



      async upload_file(fileData){

         console.log(fileData)

         // try {
         // }
         // catch(err){
         //    throw err;
         //    // this.show_error_details(err, 'upload_files()');
         //    // this.form_error_3 = "There was an issues uploading files to server."
         //
         // }


         if (this.profileType === 'dog' && this.dog_id == undefined){
            throw Error('dog_id must be specified')
         }

         console.log('debug')

         this.submit_upload_files = true;
         //create form data object to pass to upload endpoint
         let formData = new FormData();

         formData.append('profile_pic', fileData.blob, fileData.filename);

         if (this.dog_id != null){
            formData.append('dog_id', this.dog_id);

         }else{
            // if (this.$auth.profile.acct_type === 'SDS-ADMIN'){
            //    if (this.user_id == null){
            //       throw new Error('user_id must be specified when in admin mode');
            //    }
            //    formData.append('user_id', this.user_id);
            // }else{
            //    formData.append('user_id', this.$auth.profile.user_id);
            // }

            if (this.user_id != null){
               formData.append('user_id', this.user_id);
            }
            else{
               formData.append('user_id', this.$auth.profile.user_id);
            }

         }



         // note: you cannot access formData objects directly.
         // i.e. logging formData will just show an empty object
         for (var data of formData) {
            console.log(data);
         }


         let headers = {'content-type': 'multipart/form-data'};
         let res;

         if (this.fileType === 'banner'){
            res = await this.make_request('/private/uploadUserBanner', formData, {headers});
         }
         else if (this.fileType === 'profile'){
            res = await this.make_request('/private/uploadProfileImage', formData, {headers});
         }
         else if (this.fileType === 'gallery'){
            res = await this.make_request('/private/uploadGalleryImage', formData, {headers});
         }
         else if (this.fileType === 'dog_kit'){
            res = await this.make_request('/public/uploadDogKitImage', formData, {headers});
         }
         else{
            throw Error('fileType not recognized')
         }


         this.$emit('uploaded', res)
         this.submit_upload_files = false;
      },

   },//methods

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

/*div. >>> .v-dialog{*/
/*   width: auto;*/
/*}*/
</style>
