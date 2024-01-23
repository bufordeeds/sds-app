<template>
  <div>
    <flag-user-dialog
      v-model="show_flag_user"
      :dog_id="dog._id"
      :sds_num="dog.dog_num"
      :user_id="dog.handler_id"
    />


    <v-dialog
      v-model="show_overlay"
      max-width="600"
      persistent
    >
      <div
        style="background-color: white"
        class="pa-6"
      >
        <div class="headline-txt">
          Terms of Access and Use
        </div>

        <p>
          Did you know that many Service Dogs perform tasks or work for individuals with disabilities which may or may not be
          apparent to you? Please don't ask about anyone's disability - it's against the law. The U.S. Department of Justice
          and the Americans with Disabilities Act (ADA) allows for Service Dog owners to be taken at their word. You are
          permitted to ask up to two questions — only if it isn't obvious that the animal is a Service Dog. Under federal
          law you may not demand proof of someones disability, Service Dog training, licencing, registration or certification.
        </p>


        <p>
          By clicking continue you are signaling that you understand the purpose of
          <router-link to="/faq">
            Service Dog Standards
          </router-link>
          and agree to our
          <router-link to="/terms-access-use">
            Terms of Access and Use
          </router-link>.
        </p>


        <div style="justify-content: center; display: flex">
          <v-btn @click="show_overlay=false">
            Continue
          </v-btn>
        </div>
      </div>
    </v-dialog>




    <upload-user-image
      v-if="show_upload_image && dog"
      :show.sync="show_upload_image"
      file-type="profile"
      :dog_id="dog._id"
      @uploaded="updated_image"
    />









    <div
      v-if="edit_mode"
      style="display: flex; justify-content: center"
    >
      <router-link
        :to="'/team/'+dog.dog_num"
        target="_blank"
      >
        View as public
      </router-link>
    </div>

    <div
      class="page-title"
      style="text-align: center;"
    >
      Profile Page
    </div>

    <div
      class="content-container-bg"
      :style="{'background-image': `url(${require('../../assets/images/content/SDSProfilePageBackground.png')})`, 'background-size': $vuetify.breakpoint.width>800?'contain':'200%'}"
      style=" background-position: top;"
    >
      <div
        v-if="dog._id == null"
        class="content-container-centered"
        style="text-align: center; font-size: 14pt"
      >
        Oops can't seem to find this profile.
        The user may have set their profile to private.
      </div>

      <div
        v-if="dog._id != null"
        class="content-container-centered"
        style="max-width: 500px"
      >
        <!------------------------ dog avatar ------------------->
        <div v-if="hasPic">
          <avatar
            :image="dog.profile_image"
            profile-type="dog"
            size="300"
            border-width="15px"
          />
        </div>




        <div
          v-else
          style="height: 70px"
        />


        <div
          v-if="edit_mode"
          class="centered-flex-column"
        >
          <v-btn
            text
            color="var(--color-btn)"
            @click="show_upload_image=true"
          >
            Edit Photo
          </v-btn>
        </div>

        <!------------------------ main content  container ------------------->
        <div
          class="main-content"
          style="margin-top: -50px; padding-top: 10px; padding-bottom: 100px;"
        >
          <!--flag as inappropriate-->
          <!--<div style="display: flex; justify-content: flex-end" class="pr-2" >-->
          <!--   <v-tooltip bottom>-->
          <!--      <template v-slot:activator="{on, attrs}" >-->
          <!--         <v-btn-->
          <!--             icon-->
          <!--             v-bind="attrs"-->
          <!--             v-on="on"-->
          <!--             @click="show_flag_user = true"-->
          <!--             :disabled="edit_mode"-->
          <!--         >-->
          <!--            <v-icon color="red">flag</v-icon>-->
          <!--         </v-btn>-->
          <!--      </template>-->

          <!--      Is this handler violating the Service Dog Standard?-->
          <!--   </v-tooltip>-->

          <!--</div>-->


          <div
            class="centered-content"
            style="margin-top: 35px"
          >
            <span class="pr-1">Pet me!</span>
            <v-btn
              icon
              dark
              :disabled="edit_mode"
              @click="pet_dog"
            >
              <img
                src="../../assets/images/icons/like2.png"
                height="30"
              >
            </v-btn>
            <span class="pl-1">{{ dog.num_pets }} Pets</span>
          </div>


          <!--          <div class="centered-content" >-->
          <!--            <line-animation/>-->
          <!--          </div>-->


          <div
            v-if="$vuetify.breakpoint.width >400"
            class="centered-content"
            style="margin-top: -50px; margin-bottom: -60px;"
          >
            <line-animation2 />
          </div>


          <div
            v-else
            class="centered-content"
            style="margin-top: -30px; margin-bottom: -40px;"
          >
            <line-animation2 />
          </div>


          <div
            class="centered-content"
            style="flex-direction: column; text-align: center"
          >
            <div v-if="$vuetify.breakpoint.width >500">
              Screen shots are not valid <br>
              Verify
              <a href="https://servicedogstandards.org">servicedogstandards.org</a> URL <br>
              Colored lines must be moving
            </div>


            <div
              v-else
              style="font-size: small; margin-top: 0px"
            >
              Screen shots are not valid <br>
              Verify
              <a href="https://servicedogstandards.org">servicedogstandards.org</a> URL <br>
              Colored lines must be moving
            </div>


            <!--------handler info--------------->
            <div class="info-header mt-6">
              Handler
            </div>
            <div class="info-value">
              {{ dog.handler_id_FR.name_first }} {{ dog.handler_id_FR.name_last }}
            </div>

            <!--------dog info--------------->
            <div class="info-header mt-6">
              Service Dog
            </div>
            <div class="info-value ">
              {{ dog.name }}
            </div>


            <div class="info-header mt-6">
              Membership Number
            </div>
            <div class="info-value ">
              SDS-{{ dog.dog_num }}
            </div>
          </div>
        </div>


        <status-label
          :status="dog.status"
          :born="dog.born"
          :died="dog.died"
        />



        <!------------------------ about the standard ------------------->
        <div
          class="main-content"
          style="margin-top: 20px; padding-top: 20px; padding-bottom: 40px"
        >
          <div class="centered-content">
            <div style="font-size: 15pt; font-weight: 600; color: var(--color-txt-grey1); text-align: center; max-width: 400px">
              This Service Dog Team has voluntarily chosen to hold themselves accountable to a higher standard
              by signing a specific set of training and behavior standards that go above and beyond the law.
            </div>
          </div>


          <div class="centered-content">
            <learn-more-btn
              :size="15"
              to="/learn-more/mission"
            />
          </div>
        </div>



        <!------------------------ Trainer info  ------------------->
        <div
          v-if="dog.trainer_id_FR || dog.chip_number || dog.coat_color"
          class="main-content"
          style="margin-top: 20px; padding-top: 20px; padding-bottom: 40px"
        >
          <div
            class="centered-content"
            style="flex-direction: column"
          >
            <!--------trainer info--------------->

            <template v-if="dog.trainer_id_FR">
              <div class="info-header mt-6">
                Trainer
              </div>
              <div class="info-value">
                <span v-if="dog.trainer_id_FR.trainer_info && dog.trainer_id_FR.trainer_info.business_name">
                  {{ dog.trainer_id_FR.trainer_info.business_name }}
                </span>

                <span v-else>
                  {{ dog.trainer_id_FR.name_first }} {{ dog.trainer_id_FR.name_last }}
                </span>
              </div>
            </template>



            <!--------dog info--------------->
            <template v-if="dog.chip_number != null">
              <div class="info-header mt-6">
                Microchip
              </div>
              <div class="info-value ">
                {{ dog.chip_number }}
              </div>
            </template>



            <template v-if="dog.coat_color">
              <div class="info-header mt-6">
                Coat color
              </div>
              <div class="info-value ">
                {{ dog.coat_color }}
              </div>
            </template>
          </div>
        </div>








        <!----------------------------------------------------------------------------------------------------------->
        <!-------------------------------------sections-------------------------------------------------------------->
        <!----------------------------------------------------------------------------------------------------------->


        <!------------------------ Training   ------------------->
        <team-modal
          v-if="dog.checks.is_adi_graduate || edit_mode"
          color="#8dc63f"
          :icon-url="require('../../assets/images/icons/team_training.png')"
          label="TRAINING"
          heading="My Service Dog has graduated from an ADI accredited facility or organization."
          :edit-mode="edit_mode"
          edit-event="is_adi_graduate"
          :dog_id="dog._id"
          :is-checked.sync="dog.checks.is_adi_graduate"
        >
          <template #expand_content>
            <div class="modal-expanded">
              <p>
                My dog has graduated from an Assistance Dogs International accredited facility or organization. Graduating from an ADI accredited program is not required by law but is can be an excellent indicator of quality training.
              </p>
              <p>
                This is an extra step that goes above and beyond the law.  I may choose to share these physical documents at my own discretion.
              </p>
            </div>
          </template>
        </team-modal>


        <!------------------------ Training   ------------------->
        <team-modal
          v-if="dog.checks.have_training_logs || edit_mode"
          color="#8dc63f"
          :icon-url="require('../../assets/images/icons/team_training.png')"
          label="TRAINING"
          heading="I have detailed logs which document my Service Dog’s training and progress."
          :edit-mode="edit_mode"
          edit-event="have_training_logs"
          :dog_id="dog._id"
          :is-checked.sync="dog.checks.have_training_logs"
        >
          <template #expand_content>
            <div class="modal-expanded">
              <p>
                While not required by law, keeping detailed daily training logs that record training specifics and hours on paper or electronically may be part of a Service Dog team's training resume
              </p>
              <p>
                This is an extra step that goes above and beyond the law.  I may choose to share these physical documents at my own discretion.
              </p>
            </div>
          </template>
        </team-modal>


        <!------------------------ Training   ------------------->
        <team-modal
          v-if="dog.checks.took_obedience_class || edit_mode"
          color="#8dc63f"
          :icon-url="require('../../assets/images/icons/team_training.png')"
          label="TRAINING"
          heading="I have a certificate of completion from an advanced obedience class or classes. "
          :edit-mode="edit_mode"
          edit-event="took_obedience_class"
          :dog_id="dog._id"
          :is-checked.sync="dog.checks.took_obedience_class"
        >
          <template #expand_content>
            <div class="modal-expanded">
              <p>
                While not required by law, graduating from an advanced obedience class or classes may be part of one's training resume.
              </p>
              <p>
                This is an extra step that goes above and beyond the law.  I may choose to share these physical documents at my own discretion.
              </p>

              <!--              Learn more > ANCHOR TO Q&A Is there a Service Dog license, test, exam, evaluation, assessment, service dog certification, registration or government database?-->
              <div>
                <learn-more-btn
                  :size="12"
                  no-padding
                  to="/faq/license_test_for_service_dog"
                />
              </div>
            </div>
          </template>
        </team-modal>






        <!------------------------ Training   ------------------->
        <team-modal
          v-if="dog.checks.have_trainer || edit_mode"
          color="#8dc63f"
          :icon-url="require('../../assets/images/icons/team_training.png')"
          label="TRAINING"
          heading="I have worked with a trainer or organization who has signed off on my Service Dog."
          :edit-mode="edit_mode"
          edit-event="have_trainer"
          :dog_id="dog._id"
          :is-checked.sync="dog.checks.have_trainer"
        >
          <template #expand_content>
            <div class="modal-expanded">
              <p>
                While not required by law, having a dog trainer or organization sign off on a Service Dog team may be part of one's training resume.
              </p>
              <p>
                This is an extra step that goes above and beyond the law.  I may choose to share these physical documents at my own discretion.
              </p>

              <!--              Learn more > ANCHOR TO Q&A Is there a Service Dog license, test, exam, evaluation, assessment, service dog certification, registration or government database?-->
              <div>
                <learn-more-btn
                  :size="12"
                  no-padding
                  to="/faq/license_test_for_service_dog"
                />
              </div>
            </div>
          </template>
        </team-modal>


        <!------------------------ Training   ------------------->
        <team-modal
          v-if="dog.checks.passed_cgc || edit_mode"
          color="#8dc63f"
          :icon-url="require('../../assets/images/icons/team_training.png')"
          label="TRAINING"
          heading="My dog has passed the AKC Canine Good Citizen (CGC) test or equivalent."
          :edit-mode="edit_mode"
          edit-event="passed_cgc"
          :dog_id="dog._id"
          :is-checked.sync="dog.checks.passed_cgc"
        >
          <template #expand_content>
            <div class="modal-expanded">
              <p>
                While not required by law, passing an American Kennel Club Canine Good Citizen test or similar test may be part of one's training resume.
              </p>
              <p>
                This is an extra step that goes above and beyond the law.  I may choose to share these physical documents at my own discretion.
              </p>
            </div>
          </template>
        </team-modal>




        <!------------------------ Records 1  ------------------->
        <team-modal
          v-if="dog.checks.passed_public_access || edit_mode"
          color="#8556a3"
          :icon-url="require('../../assets/images/icons/team_records.png')"
          label="RECORDS"
          heading="I have a record of my Service Dog passing and completing a Public Access Test."
          :edit-mode="edit_mode"
          edit-event="passed_public_access"
          :dog_id="dog._id"
          :is-checked.sync="dog.checks.passed_public_access"
        >
          <template #expand_content>
            <div class="modal-expanded">
              <p>
                The Service Dog community considers a Public Access Test (PAT) the best tool for evaluating a team's readiness to graduate or finish formal training. There are several versions of the PAT available. Most PATs are relatively similar, although some are specific to the organization or trainer administering the test.
              </p>
              <p>
                Passing any PAT is not required by law. This is because most experienced trainers and legitimate members of the Service Dog community agree that there is not an appropriate one-size-fits-all test for every handler, dog and/or disability combination.
              </p>
              <p>
                Every organization that provides a Public Access Test makes it clear that passing their test does not mean they “certify” a dog or team — and nor is certification recognized under federal law. While some trainers and organizations may “certify" their graduates, that status is something granted by them and is not recognized under the law or necessarily by other trainers.
              </p>

              <p>
                This is an extra step that goes above and beyond the law.  I may choose to share these physical documents at my own discretion.
              </p>



              <!--              Learn more >  ANCHOR TO Q&A What is a Service Dog Public Access Test?-->

              <div>
                <learn-more-btn
                  :size="12"
                  no-padding
                  to="/faq/public_access_test"
                />
              </div>
            </div>
          </template>
        </team-modal>






        <!------------------------animal's health  ------------------->
        <team-modal
          v-if="dog.checks.have_vet_records || edit_mode"
          color="#5fafe1"
          :icon-url="require('../../assets/images/icons/team_animal_health.png')"
          label="ANIMAL'S HEALTH"
          heading="I have complete and up-to date veterinary records for my dog."
          :edit-mode="edit_mode"
          edit-event="have_vet_records"
          :dog_id="dog._id"
          :is-checked.sync="dog.checks.have_vet_records"
        >
          <template #expand_content>
            <div class="modal-expanded">
              <p>
                While not required by law, having complete and up-to-date veterinary records are a part of responsible dog ownership, whether it is a Service Dog or a pet.
              </p>

              <p>
                This is an extra step that goes above and beyond the law.  I may choose to share these physical documents at my own discretion or where required for all animals such as at an animal boarding facility.
              </p>
            </div>
          </template>
        </team-modal>


        <!------------------------handler's health  ------------------->
        <team-modal
          v-if="dog.handler_id_FR.handler_info.checks.have_doc_letter || edit_mode"
          color="#82ccba"
          :icon-url="require('../../assets/images/icons/team_handler_health.png')"
          label="HANDLER'S HEALTH"
          heading="I have a letter from a medical professional supporting or recommending my Service Dog."
          :edit-mode="edit_mode"
          edit-event="have_doc_letter"
          :is-checked.sync="dog.handler_id_FR.handler_info.checks.have_doc_letter"
          edit-global-prop
        >
          <template #expand_content>
            <div class="modal-expanded">
              <p>
                I have a letter from a medical professional supporting or recommending my Service Dog.
              </p>
              <p>
                While not required under the ADA for public access, having letter from a medical professional which is printed and signed on their letterhead supporting or recommending a Service Dog may be part of one’s training resume. A letter from a medical professional may be required under the Fair Housing Act (FHAct) for housing or under the Air Carrier Access Act (ACAA) for airline travel.
              </p>
              <p>
                This is an extra step that goes above and beyond the law.  I may choose to share these physical documents at my own discretion or where required by law.
              </p>

              <!--              Learn more  > ANCHOR TO Q&A Are physician letters required for Service Animals?-->
              <div>
                <learn-more-btn
                  :size="12"
                  no-padding
                  to="/faq/doctors_letter"
                />
              </div>
            </div>
          </template>
        </team-modal>



        <!------------------------ Recommendation letter  ------------------->
        <team-modal
          v-if="dog.handler_id_FR.handler_info.checks.have_rec_letter || edit_mode"
          color="#b82d7a"
          :icon-url="require('../../assets/images/icons/team_recommendations.png')"
          label="RECOMMENDATIONS"
          heading="I have a letter or letters of recommendation about me and my dog."

          :edit-mode="edit_mode"
          edit-event="have_rec_letter"
          :is-checked.sync="dog.handler_id_FR.handler_info.checks.have_rec_letter"
          edit-global-prop
        >
          <template #expand_content>
            <div class="modal-expanded">
              <p>
                While not required by law — similar to providing a reference on a work resume — having a letter of recommendation for an individual and their Service Dog may be part of one's training resume.
              </p>

              <p>
                This is an extra step that goes above and beyond the law.  I may choose to share these physical documents at my own discretion.
              </p>

              <div>
                <learn-more-btn
                  :size="12"
                  no-padding
                  to="/faq/doctors_letter"
                />
              </div>
            </div>
          </template>
        </team-modal>





        <!--flag as inappropriate-->
        <div
          class="mt-5"
          style="display: flex; justify-content: center"
        >
          <v-btn
            text
            :disabled="edit_mode"
            color="var(--color-btn)"
            @click="show_flag_user = true"
          >
            <v-icon>flag</v-icon>
            Flag this profile
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import LineAnimation from "@/components/LineAnimation";
import LineAnimation2 from "@/components/LineAnimation2";
import LearnMoreBtn from "@/components/LearnMoreBtn";
import StatusLabel from "@/components/StatusLabel";
import teamModal from "@/views/profileHandler/section";
import FlagUserDialog from "@/components/FlagUserDialog";

import teamOverlay from "@/views/profileHandler/teamOverlay";
import UploadUserImage from "@/components/FileUploads/UploadUserImage";

export default {
   name: "TeamProfile",
   components: {LineAnimation,LineAnimation2, LearnMoreBtn, StatusLabel, teamModal,FlagUserDialog, teamOverlay, UploadUserImage },
   mixins: [data_getters],
   props: {
      dog_num: String,
      edit_mode: {type:Boolean, default: false},
   },

   data(){
      return {

         dog: {handler_id_FR: {handler_info: {checks: {}}}, checks: {}},

         show_flag_user: false,
         show_overlay: true,


         show_upload_image: false,

      }
   },

   computed:{
      checks(){
         if (this.dog.checks != null){
            return this.dog.checks;
         }
         return {};
      },

      hasPic(){
         return (this.dog.profile_image != null && this.dog.profile_image.Location != null);
      }
   },

   watch: {
      dog_num(newVal, oldVal){
         if (newVal !== oldVal && newVal != null){
            this.get_profile();
         }
      }
   },

   created(){
      if (this.edit_mode){
         this.show_overlay = false;
      }
      this.get_profile();
   },

   methods:{
      async get_profile(){
         try{

            let dog_num;

            if (this.dog_num){
               dog_num = this.dog_num;
            }else if(this.$route.params.dog_num){
               dog_num = this.$route.params.dog_num;
            }
            else{
               throw Error('No value for dog_num defined')
            }
            let dog = await this.make_request('/public/getDogProfile', {dog_num});
            if (dog.checks == null){
               dog.checks = {};
            }


            //needed in case we've set the handler to be a trainer
            if (dog.handler_id_FR.handler_info == null){
               dog.handler_id_FR.handler_info = {};
            }

            if (dog.handler_id_FR.handler_info.checks == null){
               dog.handler_id_FR.handler_info.checks = {};
            }
            this.dog = dog;



         }catch (e) {
            throw e;
         }
      },


      async updated_image(){

         try{
            this.show_upload_image = false;
            // this.value.profile_image = null;
            let dog = await this.make_request('/private/getDogs', {dog_id: this.dog._id});

            this.dog.profile_image = dog.profile_image;

            this.$emit('update-image')
         }catch (e) {

            throw e;
         }


      },





      async pet_dog(){
         try{

            let res = await this.make_request('/public/petDog', {dog_id: this.dog._id});
            console.log('debug', res)

            this.dog.num_pets = res.num_pets;



         }catch (e) {
            throw e;
         }
      },

   }
}
</script>

<style scoped>

.triangle-up {
   --width: 6px;
   width: 0;
   height: 0;
   border-left: var(--width) solid transparent;
   border-right: var(--width) solid transparent;
   border-bottom: 8px solid #9d9d9d;
   margin-left: 5px;

}



.main-content{
   background-color: white;
   width: 100%;
   border: 1px solid #cdcccc;
   border-radius: 4px;


}

.centered-content{
   display: flex;
   justify-content: center;
   align-items: center;
   padding: 10px 20px 0 20px;
   font-size: 16pt;
   font-weight: 500;
   color: var(--color-txt-grey1);

}


.modal-expanded{
   padding-top: 15px;
   font-size: 12pt;
   font-weight: normal;
}


.info-header{
   font-size: 14pt;
   font-weight: 600;
   color: #706f6f;
}
.info-value{
   font-size: 20pt;
   font-weight: 600;
   color: var(--color-headline);
    text-align: center;
}
</style>