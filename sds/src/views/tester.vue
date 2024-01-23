<template>
  <div>
    <!--      <uploader-single-image></uploader-single-image>-->

    <!--      <v-dialog :value="true">-->
    <!--         <v-card class="pa-3">-->
    <!--            <cropperjs></cropperjs>-->
    <!--         </v-card>-->

    <!--      </v-dialog>-->

    <!--      <upload-profile-image></upload-profile-image>-->



    <!--      <donate-modal></donate-modal>-->



    <!--<status-line status=""/>-->
    <!--<status-line status="InTransit"/>-->
    <!--<status-line status="Delivered"/>-->


    <!--<div style="width: 80%">-->
    <!--   <trainer-screen-shot />-->
    <!--</div>-->

    <dog-list />
  </div>
</template>

<script>

// import UploaderSingleImage from "@/components/FileUploads/UploaderSingleImage-old";
// import cropperjs from "@/components/FileUploads/Cropper";
// import uploadProfileImage from "@/components/FileUploads/UploadUserImage";
// import DonateModal from "@/views/shop/donate/DonateModal";
import DogList from "@/components/inputs/DogList";


// import trainerScreenShot from "@/components/trainerScreenShot";

// import StatusLine from "@/components/StatusLine";

export default {
name: "Tester",
   components: {DogList},
}
</script>

<style scoped>

</style>
