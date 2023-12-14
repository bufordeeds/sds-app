<template>
  <div>
    <!------------------- dialog for profile editor ----------------------------------------------------------------->
    <v-dialog
      v-model="show_edit_profile"
      persistent
      :fullscreen="$vuetify.breakpoint.width < 600"
    >
      <v-card
        class=""
        style="width: 100%; position: relative;"
        @keyup.esc="test"
      >
        <div style="position: absolute; width: 100%; display: flex; justify-content: flex-end">
          <v-btn
            icon
            @click="show_edit_profile=false"
          >
            <v-icon>close</v-icon>
          </v-btn>
        </div>

        <!--<edit-profile-->
        <!--    v-if="show_edit_profile"-->
        <!--    @update="update_profile"-->
        <!--&gt;</edit-profile>-->

        <edit-trainer-info
          v-if="show_edit_profile"
          @user_updated="update_profile"
          @photo_updated="update_photo"
        />
      </v-card>
    </v-dialog>


    <!------------------- dialog for upload banner ----------------------------------------------------------------->
    <upload-user-image
      v-if="show_upload_banner"
      file-type="banner"
      :show.sync="show_upload_banner"
      @uploaded="update_profile"
    />



    <!------------------- dialog for upload profile pic-------------------------------------------------------------->

    <upload-user-image
      v-if="show_upload_profile"
      file-type="profile"
      :show.sync="show_upload_profile"
      @uploaded="update_profile"
    />


    <!------------------- dialog for upload gallery pic-------------------------------------------------------------->

    <upload-user-image
      v-if="show_upload_gallery"
      file-type="gallery"
      :show.sync="show_upload_gallery"
      @uploaded="update_profile"
    />




    <!------------------- dialog for editing a section-------------------------------------------------------------->
    <v-dialog
      v-model="show_edit_section"
      max-width="700px"
      persistent
    >
      <v-card class="pa-0">
        <div style="display: flex; ">
          <div
            style="text-transform: capitalize;"
            class="pl-3 pt-2 dialog-heading"
          >
            {{ edit_section }}
          </div>
          <v-spacer />
          <v-btn
            icon
            @click="show_edit_section=false"
          >
            <v-icon>
              close
            </v-icon>
          </v-btn>
        </div>

        <edit-section
          v-if="show_edit_section"
          :section="edit_section"
          @section-updated="on_section_updated"
        />
      </v-card>
    </v-dialog>


    <!--------------------------------------------------------------------------------------------------------------->
    <!------------------- Render trainer profile -------------------------------------------------------------------->
    <!--------------------------------------------------------------------------------------------------------------->
    <div class="page-title-app">
      My Info
    </div>





    <trainer-profile
      v-if="profile_type === 'TRAINER'"
      ref="trainer_profile"
      :user_id="user_id"
      @edit-basic="show_edit_profile=true"
      @upload-banner="show_upload_banner=true"
      @edit-profile-pic="show_upload_profile=true"
      @edit-gallery="show_upload_gallery=true"
      @edit-section="on_edit_section"
    />



    <div
      v-if="profile_type === 'HANDLER'"
      class="content-container-bg"
    >
      <div class="content-container-sm">
        <edit-handler-info
          @edit-profile-pic="show_upload_profile=true"
        />
      </div>
    </div>




    <!--<edit-profile-->
    <!--    v-if="profile_type === 'HANDLER'"-->
    <!--    class="content-container-bg"-->
    <!--/>-->




    <!--      <handler-profile-->
    <!--          v-if="profile_type === 'HANDLER'"-->
    <!--          :user_id="user_id"-->
    <!--          @edit-basic="show_edit_profile=true"-->
    <!--          @upload-banner="show_upload_banner=true"-->
    <!--          @edit-profile-pic="show_upload_profile=true"-->
    <!--          @edit-gallery="show_upload_gallery=true"-->
    <!--          @edit-section="on_edit_section"-->
    <!--      ></handler-profile>-->
  </div>
</template>

<script>
import EditProfile from "@/views/mgmProfile/EditProfile";
import TrainerProfile from "@/views/profileTrainer/TrainerProfile";
import UploadUserImage from "@/components/FileUploads/UploadUserImage";
import EditSection from "@/views/mgmProfile/EditProfileSection"
import HandlerProfile from "@/views/profileTrainer/UserProfile-old";

import EditTrainerInfo from "@/views/mgmProfile/EditTrainerInfo";
import EditHandlerInfo from "@/views/mgmProfile/EditHandlerInfo";


import data_getters from "@/mixins/data_getters";

export default {
   name: "ManageProfileContainer",
   components: {EditProfile, TrainerProfile, UploadUserImage, EditSection, EditTrainerInfo,EditHandlerInfo},
  mixins: [data_getters],
   data(){
      return {
         show_edit_profile: false,
         show_upload_banner: false,
         show_upload_profile: false,
         show_upload_gallery: false,

         show_edit_section: false,
         edit_section: null,

         user_id: null,

         user: null,


      }
   },

   computed: {
      // user_id(){
      //    return this.$auth.profile.user_id;
      // },

      profile_type(){

         return this.$auth.profile.acct_type;
      }

   },

   async mounted(){

      //note need this to be a variable, as we "reset" this value to force a page refresh
      this.user_id = this.$auth.profile.user_id;

      this.$store.commit("set_show_side_nav", true);

      window.addEventListener('keyup', this.close);
   },

   destroyed() {
      console.log('destroyed')
      window.removeEventListener('keyup', this.close);
   },

   methods:{

      on_edit_section(section){
         this.edit_section = section;
         this.show_edit_section = true;

      },

      on_section_updated(){
         this.edit_section = null;
         this.show_edit_section = false;
         this.update_profile();
      },

      close(e){
         console.log('esc ran');
         if (e.key === 'Escape'){
            this.show_edit_profile = false;
         }
      },

      update_photo(){
         this.$refs.trainer_profile.get_profile();
      },


      //basically a hack to get the trainer-profile component to update its data
     update_profile(){

        console.log('update ran')
        this.show_edit_profile = false;
        this.show_upload_banner=false;
        this.show_upload_profile = false;
        this.show_upload_gallery=false;
        this.user_id = null;
        this.$nextTick(() => {
          setTimeout(()=> {
                this.user_id = this.$auth.profile.user_id;
              },
              100)

        })
     }
   },
}
</script>

<style scoped>
@import url('./mgm_common.css');
</style>
