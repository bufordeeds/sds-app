<template>
  <div>
    <upload-user-image
      v-if="show_upload_image"
      file-type="profile"
      :show.sync="show_upload_image"
      :user_id="user._id"
      @uploaded="on_image_upload"
    />


    <check-address
      ref="addrCheck"
      :address-new="private_info.address"
      :address-old="private_info_address_old"
      @checked-address="on_save({checked_addr: $event})"
    />


    <change-email v-model="show_change_email" />


    <v-dialog
      v-model="show_name_warning"
      max-width="400px"
    >
      <v-card class="pa-4">
        Warning: Please only list one person per registration. Each disabled individual who benefits from tasks
        or work from a particular dog must sign their own registration agreement.

        <v-row class="ma-0">
          <v-spacer />
          <v-btn @click="show_name_warning=false">
            Ok
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>



    <!--------------------- header section with account status ------------------------------------------------>
    <div
      v-if="!setupMode"
      class="centered-flex-column"
      style="padding-top: 50px; padding-bottom: 20px"
    >
      <!-- row for profile image-->
      <div style="display:flex; padding-bottom: 25px;">
        <div
          class="profile-image-container mr-4"
          style="cursor: pointer;"
          @click="show_upload_image=true;"
        >
          <img
            :src="user_image"
            style="max-height: 200px; max-width: 200px"
          >
          <div style="font-size: 11pt; color: blue; padding-top: 5px; ">
            Change Profile Image
          </div>
        </div>


        <div class="account-settings-container">
          <div
            v-if="isAdmin"
            style=" margin-top:15px"
          >
            <div style="color: var(--color-subheading); font-size: medium">
              (Admin) Deactivation
            </div>

            <status
              v-model="user.deactivated"
              style="width: 150px;"
              :list="[{txt: 'Deactivated', val: true}, {txt: 'Active', val: false}]"
              item-text="txt"
              item-value="val"
              :color-map="{'true': '#bf1e2e', 'false': '#8dc63f' }"
            />

            <!--<v-btn v-if="user.deactivated == null"-->
            <!--    -->
            <!--    color="red" @click="$emit('deactivate-account')">-->
            <!--   Deactivate Account-->
            <!--</v-btn>-->
          </div>


          <div style="width: 150px; margin-top:10px">
            <div style="color: var(--color-subheading); font-size: medium">
              Account Type
            </div>

            <div>
              {{ user.account_type }}
            </div>
          </div>


          <div style="width: 150px; margin-top:15px">
            <div style="color: var(--color-subheading); font-size: medium">
              Profile Status
            </div>

            <status
              v-model="user.account_visibility"
              list-type="user"
            />
          </div>


          <div style="width: 150px; margin-top:15px">
            <div style="color: var(--color-subheading); font-size: medium; display: flex">
              Email
              <v-btn
                v-if="!isAdmin"
                small
                text
                style="padding: 0px; margin-left: 5px; margin-top: -2px;"
                @click="show_change_email=true"
              >
                (Change)
              </v-btn>
            </div>

            <div style="display: flex">
              {{ user.email }}
            </div>

            <div
              v-if="user.email_change"
              style="color: red; font-size: 10pt; text-align: left; white-space: nowrap"
              class="pt-1"
            >
              Waiting on confirmation for {{ user.email_change.new_email }}
            </div>
          </div>
        </div>
      </div>
    </div>









































    <template v-if="setupMode">
      <div
        class="heading-loc"
        style="text-align: center; margin-top: -10px; margin-bottom: 15px"
      >
        Let's Begin!
      </div>

      <div>
        Are you filling out this form and signing this training and behavior standards agreement on behalf of for
        yourself or someone else?
      </div>

      <my-form class="flex-centered-content mt-3">
        <my-drop-down
          v-model="self_other"
          style="margin-top: -20px; max-width: 200px"
          :list="[{val: 'SELF', txt: 'For myself'}, {val: 'OTHER', txt: 'For someone else'}]"
        />
      </my-form>
    </template>




    <template v-else>
      <div>
        Are you filling out this form and signing this training and behavior standards agreement on behalf of for
        yourself or someone else?
      </div>

      <my-form class="mt-3">
        <my-drop-down
          v-model="self_other"
          style="margin-top: -20px; max-width: 200px"
          :list="[{val: 'SELF', txt: 'For myself'}, {val: 'OTHER', txt: 'For someone else'}]"
        />
      </my-form>
    </template>




    <my-form ref="form">
      <template v-if="self_other!==null">
        <!--------------------------------------------------------------------------------------------------------------->
        <!------------------------- step 1 container -------------------------------------------------------------------->
        <!--------------------------------------------------------------------------------------------------------------->
        <div
          v-if="step >=1 && self_other==='OTHER'"
          key="OTHERFORM"
          class="stepper-container"
        >
          <div class="heading-loc">
            About Aide
          </div>
          <hr class="line">


          <div class="mt-3">
            Since you are filling this form out for someone else, we need some of your information.

            <v-row dense>
              <v-col>
                <my-text-input
                  v-if="isOther"
                  v-model="private_info.aide.name_first"
                  label="First Name*"
                  :rules=" [isRequired]"
                />
              </v-col>
              <v-col>
                <my-text-input
                  v-if="isOther"
                  v-model="private_info.aide.name_last"
                  label="Last Name*"
                  :rules="[isRequired]"
                />
              </v-col>

              <v-col cols="12">
                <my-drop-down
                  v-if="isOther"
                  v-model="private_info.aide.relationship"
                  label="Relationship to disabled individual*"
                  :list="list_relationship"
                  :rules="[isRequired]"
                />
              </v-col>

              <v-col>
                <my-text-input
                  v-if="isOther"
                  v-model="private_info.aide.email"
                  label="E-mail Address*"
                  :rules="[isRequired, isEmail]"
                />
              </v-col>

              <v-col>
                <my-text-input
                  v-if="isOther"
                  v-model="private_info.aide.phone"
                  label="Primary Phone*"
                  :rules="[isRequired, isPhone]"
                  @input="private_info.aide.phone = fmtPhone(private_info.aide.phone)"
                />
              </v-col>
            </v-row>
          </div>

          <!--<div class="btn-container">-->
          <!--   <v-btn @click="step = 2">-->
          <!--      Save-->
          <!--   </v-btn>-->
          <!--</div>-->
        </div>


        <!--------------------------------------------------------------------------------------------------------------->
        <!------------------------- step 2 container -------------------------------------------------------------------->
        <!--------------------------------------------------------------------------------------------------------------->
        <div
          v-if="step>=2"
          class="stepper-container"
        >
          <div class="heading-loc">
            Who is the disabled person who uses this service dog?
          </div>

          <hr class="line">

          <!-------------handler info ------------------------------------------->
          <!--<div class="subheading-loc mt-3">-->
          <!--   Contact Information-->
          <!--</div>-->

          <div class="mt-3">
            <template v-if="setupMode">
              The disabled handler’s <span style="font-weight: 600">first, middle and last name must match</span>
              a secondary form of identification they will be carrying such as:

              <div
                style="display: flex; align-items: center"
                class="mt-4 mb-2"
              >
                <img
                  src="../../assets/images/icons/Passport.svg"
                  height="30px"
                >
                <div style="padding-left: 10px">
                  Valid U.S. passport book or passport card
                </div>
              </div>

              <div style="display: flex; align-items: center">
                <img
                  src="../../assets/images/icons/REALID.svg"
                  height="25px"
                >
                <div style="padding-left: 9px">
                  Valid driver's license or REAL ID compliant driver's license
                </div>
              </div>


              <div
                style="font-weight: 600"
                class="pt-4"
              >
                OTHER FORMS OF SECONDARY IDENTIFICATION
              </div>

              <ul>
                <li>Government or state issued ID</li>
                <li>Government employee ID (city, county, state, or federal)</li>
                <li>Trusted Traveler IDs (including valid Global Entry, FAST, SENTRI, and NEXUS cards)</li>
                <li>Certificate of Naturalization</li>
                <li>Certificate of Citizenship</li>
                <li>U.S. military or military dependent ID</li>
                <li>Current (valid) foreign passport</li>
                <li>Enhanced Tribal Cards and Native American tribal photo IDs</li>
              </ul>

              <div
                style="font-weight: 600"
                class="pt-4"
              >
                IF HANDLER IS UNDER 18
              </div>

              <ul>
                <li>Valid driving learner's permit with photo</li>
                <li>Valid non-driver ID with photo</li>
                <li>Temporary driver's license with photo</li>
                <li>U.S. Permanent Resident Card (Green Card) - commonly used by a parent of a U.S. citizen child applicant</li>
                <li>Current school ID with photo</li>
                <li>Birth certificate</li>
                <li>Airline boarding pass (for traveling same-day)</li>
              </ul>
            </template>


            <v-row dense>
              <v-col
                cols="12"
                sm="4"
              >
                <my-text-input
                  v-model="user.name_first"
                  label="First Name*"
                  :rules="[isRequired, check_name]"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <my-text-input
                  v-model="user.name_middle"
                  label="Middle Name"
                />
              </v-col>
              <v-col
                cols="12"
                sm="4"
              >
                <my-text-input
                  v-model="user.name_last"
                  label="Last Name*"
                  :rules="[isRequired, check_name]"
                />
              </v-col>



              <v-col cols="6">
                <my-drop-down
                  v-model="private_info.gender"
                  label="Gender*"
                  :list="list_gender"
                  :rules="[isRequired]"
                />
              </v-col>


              <v-col cols="6">
                <my-text-input
                  v-model="private_info.dob"
                  label="Date of birth*"
                  :rules="[isRequired, isDate]"
                />
              </v-col>


              <v-col cols="12">
                <my-text-input
                  v-model="private_info.address.street1"
                  label="Mailing Address*"
                  :rules="[isRequired]"
                />
              </v-col>


              <v-col cols="5">
                <my-text-input
                  v-model="private_info.address.city"
                  label="City*"
                  :rules="[isRequired]"
                />
              </v-col>

              <v-col cols="3">
                <my-text-input
                  v-model="private_info.address.state"
                  label="State*"
                  :rules="[isRequired]"
                />
              </v-col>


              <v-col cols="4">
                <my-text-input
                  v-model="private_info.address.zip"
                  label="Zip*"
                  :rules="[isRequired, isZip]"
                />
              </v-col>



              <v-col
                cols="12"
                sm="6"
              >
                <my-text-input
                  v-model="private_info.phone"
                  label="Primary Phone*"
                  :rules="[isRequired, isPhone]"
                  @input="private_info.phone = fmtPhone(private_info.phone)"
                />
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <my-text-input
                  v-model="private_info.phone2"
                  label="Secondary Phone (if applicable)"
                  :rules="[isPhone]"
                  @input="private_info.phone2 = fmtPhone(private_info.phone2)"
                />
              </v-col>

              <v-col
                cols="12"
                sm="6"
              >
                <my-text-input
                  v-model="private_info.email2"
                  label="Alternate email address"
                  :rules="[isEmail]"
                />
              </v-col>
            </v-row>
          </div>



          <!-------------emergency contact info ------------------------------------------->
          <div class="heading-loc mt-6">
            Emergency contact information
          </div>
          <hr class="line">


          <div class="mt-0">
            <v-row dense>
              <v-col cols="6">
                <my-text-input
                  v-model="private_info.emergency_contact.name_first"
                  label="First Name"
                />
              </v-col>
              <v-col cols="6">
                <my-text-input
                  v-model="private_info.emergency_contact.name_last"
                  label="Last Name"
                />
              </v-col>


              <v-col cols="12">
                <my-drop-down
                  v-model="private_info.emergency_contact.relationship"
                  label="Relationship to disabled individual"
                  :list="list_relationship"
                />
              </v-col>




              <v-col cols="6">
                <my-text-input
                  v-model="private_info.emergency_contact.phone"
                  label="Primary Phone"
                  :rules="[isPhone]"
                  @input="private_info.emergency_contact.phone = fmtPhone(private_info.emergency_contact.phone)"
                />
              </v-col>


              <v-col cols="6">
                <my-text-input
                  v-model="private_info.emergency_contact.email"
                  label="E-mail address"
                  :rules="[isEmail]"
                />
              </v-col>
            </v-row>
          </div>





          <!-------------Disability info ------------------------------------------->
          <div class="heading-loc mt-6">
            Disability information
          </div>
          <hr class="line">


          <my-form class="mt-3">
            <v-row dense>
              Which best describes your PRIMARY reason for using a Service Dog
              <v-col cols="12">
                <my-drop-down
                  v-model="private_info.disability.primary"
                  label="Primary Disability"
                  :list="list_disability"
                  item-text="val"
                  item-value="val"
                />
              </v-col>




              <v-col
                v-if="private_info.disability.primary === 'Not listed'"
                cols="12"
              >
                <my-text-input
                  v-model="private_info.disability.primary_other"
                  label="Please enter your disability"
                />
              </v-col>
            </v-row>

            <v-row dense>
              <v-col cols="12">
                <div class="mt-4">
                  Do you have a secondary disability?
                </div>

                <my-drop-down
                  v-model="have_2nd_disability"
                  style="width: 100px; margin-top: -15px"
                  :list="[{val: true, txt: 'Yes'}, {val: false, txt: 'No'}]"
                  item-text="txt"
                  item-value="val"
                />
              </v-col>



              <template v-if="have_2nd_disability">
                <div style="margin-top: 25px; margin-bottom: -10px">
                  Which best describes a SECONDARY reason for using a Service Dog
                  <!--   <v-btn small text v-if="private_info.disability.secondary" @click="private_info.disability.secondary = null">-->
                  <!--      <v-icon small>clear</v-icon> Clear-->
                  <!--   </v-btn>-->
                </div>

                <v-col cols="12">
                  <my-drop-down
                    v-model="private_info.disability.secondary"
                    label="Secondary Disability"
                    :list="list_disability"
                    item-text="val"
                    item-value="val"
                  />
                </v-col>




                <v-col
                  v-if="private_info.disability.secondary === 'Not listed'"
                  cols="12"
                >
                  <my-text-input
                    v-model="private_info.disability.secondary_other"
                    label="Please enter your secondary disability"
                  />
                </v-col>
              </template>
            </v-row>
          </my-form>
        </div>





        <!--------------------------------------------------------------------------------------------------------------->
        <!------------------------- dog container ----------------------------------------------------------------------->
        <!--------------------------------------------------------------------------------------------------------------->
        <div
          v-if="step>=2 && setupMode"
          class="stepper-container"
        >
          <div class="heading-loc">
            About the dog
          </div>
          <hr class="line">




          <v-row dense>
            <v-col
              cols="12"
              sm="6"
            >
              <my-text-input
                v-model="dog.name"
                label="Name*"
                :rules="[isRequired]"
              />
            </v-col>

            <!--<v-col cols="6">-->
            <!--   <my-text-input-->
            <!--       label="Gender"-->
            <!--       v-model="dog.gender"-->
            <!--       :rules="[isRequired]"-->
            <!--   />-->
            <!--</v-col>-->


            <v-col
              cols="12"
              sm="6"
            >
              <my-drop-down
                v-model="dog.gender"
                label="Gender*"
                :list="list_gender_dog"
                :rules="[isRequired]"
              />
            </v-col>



            <v-col
              cols="12"
              sm="6"
            >
              <v-tooltip bottom>
                <template #activator="{on, attrs}">
                  <div
                    v-bind="attrs"
                    v-on="on"
                  >
                    <my-text-input
                      v-model="dog.birth_year"
                      label="What year was your dog born*"
                      :rules="[isRequired, isNumber, x=>checkLength(x, 4, {type: 'eq'})]"
                    />
                  </div>
                </template>

                If you do not know the year, please enter best guess.
              </v-tooltip>
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <my-text-input
                v-model="dog.breed"
                label="Breed*"
                :rules="[isRequired]"
              />
            </v-col>


            <v-col
              cols="12"
              sm="6"
            >
              <my-drop-down
                v-model="dog.size"
                label="How big is your dog?*"
                :list="list_size_dog"
                item-value="val"
                item-text="val"
                :rules="[isRequired]"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <my-text-input
                v-model="dog.microchip_num"
                label="Microchip Number (if applicable)"
              />
            </v-col>

            <v-col
              cols="12"
              sm="6"
            >
              <my-drop-down
                v-model="dog_in_training"
                label="In training currently?*"
                :list="[{val: true, txt: 'Yes'}, {val: false, txt: 'No'}]"
                item-text="txt"
                item-value="val"
                :rules="[isRequired]"
              />
            </v-col>


            <div v-if="dog_in_training">
              Please be aware that Service Dogs in Training do not have full public access rights under federal law. Some communities may have extended rights to include them. Please check with your local law enforcement officials to learn about the laws in your area
            </div>
          </v-row>
        </div>





        <!--------------------------------------------------------------------------------------------------------------->
        <!------------------------- optional info container ------------------------------------------------------------->
        <!--------------------------------------------------------------------------------------------------------------->
        <div
          v-if="step>=2 && setupMode"
          class="stepper-container"
        >
          <div class="heading-loc">
            Optional Info
          </div>
          <hr class="line">
          <div class="mt-2 mb-4">
            Responses to the following questions will be kept private and only shared with others in annonymized statistical
            form.  You will not be identified.
          </div>


          <!--<census-info/>-->


          <div class="census-q">
            <div class="census-q-text">
              Which best describes your nationality?
              <v-btn
                v-if="census.race"
                small
                text
                @click="census.race = null"
              >
                <v-icon small>
                  clear
                </v-icon> Clear
              </v-btn>
            </div>
            <v-radio-group
              v-model="census.race"
              class="radio-group"
            >
              <v-radio
                v-for="item in race"
                :key="item"
                :label="item"
                :value="item"
              />
            </v-radio-group>
          </div>


          <div class="census-q">
            <div class="census-q-text">
              Highest level of education
              <v-btn
                v-if="census.education"
                small
                text
                @click="census.education = null"
              >
                <v-icon small>
                  clear
                </v-icon> Clear
              </v-btn>
            </div>
            <v-radio-group
              v-model="census.education"
              class="radio-group"
            >
              <v-radio
                v-for="item in education"
                :key="item"
                :label="item"
                :value="item"
              />
            </v-radio-group>
          </div>


          <div class="census-q">
            <div class="census-q-text">
              Approximate annual income

              <v-btn
                v-if="census.income"
                small
                text
                @click="census.income = null"
              >
                <v-icon small>
                  clear
                </v-icon> Clear
              </v-btn>
            </div>
            <v-radio-group
              v-model="census.income"
              class="radio-group"
            >
              <v-radio
                v-for="item in income"
                :key="item"
                :label="item"
                :value="item"
              />
            </v-radio-group>
          </div>



          <div class="census-q">
            <div class="census-q-text">
              Have you, or do you currently, serve in the military?
              <v-btn
                v-if="census.isVeteran"
                small
                text
                @click="census.isVeteran = null"
              >
                <v-icon small>
                  clear
                </v-icon> Clear
              </v-btn>
            </div>
            <v-radio-group
              v-model="census.isVeteran"
              class="radio-group"
              row
            >
              <v-radio
                v-for="item in binary"
                :key="item.txt+'mil'"
                :label="item.txt"
                :value="item.val"
              />
            </v-radio-group>
          </div>




          <div class="census-q">
            <div class="census-q-text">
              Have you, or do you currently, work as a civilian wartime contractor?
              <v-btn
                v-if="census.isCivilianContractor"
                small
                text
                @click="census.isCivilianContractor = null"
              >
                <v-icon small>
                  clear
                </v-icon> Clear
              </v-btn>
            </div>
            <v-radio-group
              v-model="census.isCivilianContractor"
              class="radio-group"
              row
            >
              <v-radio
                v-for="item in binary"
                :key="item.txt+'cc'"
                :label="item.txt"
                :value="item.val"
              />
            </v-radio-group>
          </div>


          <div class="census-q">
            <div class="census-q-text">
              Do you use your Service Dog to help with an injury, which occurred while serving in the military,
              or working as a civilian wartime contractor?
              <v-btn
                v-if="census.wartimeInjury"
                small
                text
                @click="census.wartimeInjury = null"
              >
                <v-icon small>
                  clear
                </v-icon> Clear
              </v-btn>
            </div>
            <v-radio-group
              v-model="census.wartimeInjury"
              class="radio-group"
              row
            >
              <v-radio
                v-for="item in binary"
                :key="item.txt+'inj'"
                :label="item.txt"
                :value="item.val"
              />
            </v-radio-group>
          </div>
        </div>



        <!------------- save buttons-------------------------------------------------------->
        <div
          class="btn-container mb-6"
          style="justify-content: center"
        >
          <template v-if="setupMode">
            <v-btn
              large
              class="mr-2"
              :loading="loading_save"
              @click="on_save({draft:true})"
            >
              Save Draft
            </v-btn>

            <v-btn
              large
              class="ml-2"
              color="green"
              :loading="loading_save"
              @click="on_save"
            >
              Submit and Finalize
            </v-btn>
          </template>

          <v-btn
            v-else
            large
            class="ml-2"
            :loading="loading_save"
            @click="on_save"
          >
            Save
          </v-btn>
        </div>



        <div style="text-align: center;  transition: opacity 1s linear; color: var(--color-input-error); ">
          {{ error_msg }}
        </div>


        <div
          style="text-align: center;  transition: opacity 1s linear; color: green; height: 20px;"
          :style="{opacity: saved_msg != null? '100%' : '0%',}"
        >
          Changes Saved
        </div>
      </template>
    </my-form>
  </div>
</template>

<script>
import StepperHandler from "@/views/signup/handlerStepper/StepperHandler";
import censusInfo from "@/views/signup/handlerStepper/censusInfo";
import MyDropDown from "@/components/inputs/MyDropDown";
import data_getters from "@/mixins/data_getters";
import _ from "lodash";
import validation from "@/mixins/validation";
import CheckAddress from "@/components/CheckAddress";
import ChangeEmail from "@/components/ChangeEmail";
import status from '@/components/inputs/StatusDropDown';
import UploadUserImage from "@/components/FileUploads/UploadUserImage";
import store from "@/mixins/store";


export default {
   name: "HandlerInfo",
   components: {MyDropDown,  CheckAddress, ChangeEmail, status, UploadUserImage},
   mixins: [data_getters, validation, store],
   props:{
      setupMode: {type: Boolean, default: false},
      user_id:  {type: String, default: null},
   },


   data(){
      return{
         show_change_email: false, //controls the change email dialog
         show_upload_image: false,
         show_name_warning: false,

         step: 2,

         // self_other: null,
         self_other: null,
         // registerer: {},
         user: { },
         handler_info: {},

         private_info: {
            aide:{},
            address:{},
            disability: {},
            emergency_contact: {},
         },
         census: {},

         dog: {},

         have_2nd_disability: false,
         dog_in_training: null,

         private_info_address_old: {}, //used to cache the address to tell if we need to confirm it

         // census:{
         //    race: null,
         //    education: null,
         //    income: null,
         //    isVeteran: null,
         //    isCivilianContractor: null,
         //    wartimeInjury: null,
         // },



         list_relationship: [
            {val: 'Parent', txt: 'Parent'},
            {val: 'Spouse', txt: 'Spouse'},
            {val: 'OtherFamilyMember', txt: 'Other Family Member'},
            {val: 'FriendOrNeighbor', txt: 'Friend or Neighbor'},
            {val: 'Caretaker', txt: 'Caretaker'},
            {val: 'ServiceDogTrainer', txt: 'Service Dog Trainer or Training Organization'},
            {val: 'SocialWorkerTherapist', txt: 'Social Worker, Counselor, Therapist, Physician'},
         ],


         list_gender: [
            {val: 'M', txt: 'M'},
            {val: 'F', txt: 'F'},
            {val: 'X', txt: 'X'},
         ],

         list_gender_dog: [
            {val: 'M', txt: 'M'},
            {val: 'F', txt: 'F'},
         ],


         list_disability: [
            {val: 'Arthritis (severe)' },
            {val: 'Ataxia (poor balance)' },
            {val: 'Autism or Autism Spectrum' },
            {val: 'Blindness or Impaired Vision' },
            {val: 'Cardio/Pulmonary Disease' },
            {val: 'Cerebral Palsy' },
            {val: 'Deafness or Impaired Hearing' },
            {val: 'Diabetes' },
            {val: 'Life Threatening Allergies/Anaphylaxis' },
            {val: 'Multiple Sclerosis (M.S.)' },
            {val: 'Medical Alert or Response' },
            {val: 'Neurological Disorders' },
            {val: 'Physical Mobility Issues' },
            {val: 'Psychiatric Disabilities' },
            {val: 'Seizure Disorders (Epilepsy)' },
            {val: 'Spina Bifida' },
            {val: 'Spinal Cord/Head Trauma' },
            {val: 'Mobility Issues' },
            {val: 'Stroke' },
            {val: 'Not listed' },
         ],


         list_size_dog: [
            {val: 'Small (under 20lbs)'},
            {val: 'Medium (20-50lbs)'},
            {val: 'Large (50-90lbs)'},
            {val: 'Extra Large (90+lbs)'},
         ],

         //census related




         race: [
            'African American/Black',
            'Asian',
            'Caucasian/White',
            'Filipino',
            'Hispanic',
            'Latino',
            'Native American/Alaska Native',
            'Pacific Islander'
         ],

         education:[
            'Grades K-12',
            'High School Diploma/GED',
            'Some College',
            '2 Year/Associates Degree',
            '4 Year Degree',
            'Masters Degree',
            'Doctorate'
         ],

         income:[
            'Less than $20,000',
            '$20,000 - $40,000',
            '$40,000 - $60,000',
            '$60,000 - $80,000',
            '$80,000 - $100,000',
            'Over $100,000',
         ],

         binary:[{txt:'Yes', val: true}, {txt:'No', val: false}],

         loading_save: false,
         saved_msg: null,
         error_msg: null,

      }
   },

   computed:{
      isAdmin(){
         return this.$auth.profile.acct_type === 'SDS-ADMIN';
      },
      // user_image: {
      //    get: function(){
      //       if (this.user.profile_image){
      //          return this.user.profile_image.Location;
      //       }
      //       else{
      //          return require('../../assets/images/content/user-no-image.png');
      //       }
      //    },
      //    set: function (newVal){
      //    }
      // },

      isOther(){
         return this.self_other === 'OTHER';
      },

      user_image() {
         if (this.user.profile_image){
            return this.user.profile_image.Location;
         }
         else{
            return require('../../assets/images/content/user-no-image.png');
         }
      },

   },

   watch: {
     self_other(newVal){
        if (newVal === 'OTHER' && this.private_info.aide == null){
           this.private_info.aide = {};
        }
     }
   },

   async created(){
      // let data = await this.make_request('/private/getMyProfile', {});

      console.log('debug')

      let data;
      if (this.user_id !== null){
         //note this will only work if called by an admin user
         if (this.$auth.profile.acct_type === 'SDS-ADMIN'){
            data = await this.make_request('/admin/getUser', {user_id: this.user_id});
         }
         else{
            data = await this.make_request('/private/getProfile', {user_id: this.user_id});
         }

      }
      else{
         data = await this.make_request('/private/getMyProfile', {});


      }

      console.log({data})

      this.user = {
         _id: data._id,
         name_first: data.name_first,
         name_middle: data.name_middle,
         name_last: data.name_last,
         account_visibility: data.account_visibility,
         email: data.email,
         account_type: data.account_type,
         profile_image: data.profile_image,
         deactivated: data.deactivated === true,
      }

      this.handler_info = _.get(data, 'handler_info', {});
      this.private_info = _.get(data, 'private_info', {});

      let tmp =_.get(data, 'private_info.address', {});
      this.private_info_address_old = _.cloneDeep(tmp);

      this.census = this.private_info.census;

      if (this.census == null) this.census = {};

      delete this.private_info.census;

      this.have_2nd_disability = _.get(data, 'private_info.disability.secondary', null) !== null;


      if (_.get(data, 'private_info.aide', null) === null){
         this.self_other = 'SELF';// : "OTHER";
      }
      else{
         this.self_other = "OTHER";
      }


      let dogs = await this.make_request('/private/getDogs', {user_id: this.$auth.profile.user_id});
      if (dogs.length === 0){
         this.dog = {}
      }
      else{
         this.dog = dogs[0];
         if (this.dog.status === 'InTraining'){
            this.dog_in_training = true;
         }
         if (this.dog.status === 'FullyTrained'){
            this.dog_in_training = false;
         }
      }
   },

   methods:{
      check_name(x){
         let ans = true;
         if (x.toLowerCase().includes(' and ')){
            ans = '"and" not allowed';
         }
         if (x.toLowerCase().includes(' or ')){
            ans = '"or" not allowed';
         }

         if (x.toLowerCase().includes('/')){
            ans = '"/" not allowed';
         }
         if (x.toLowerCase().includes('+')){
            ans = '"+" not allowed';
         }

         if (ans !== true){
            this.show_name_warning = true;
         }

         return ans;
      },

      // async check_address(){
      //    try{
      //
      //       if (!this.$refs.form.validate()){
      //          return;
      //       }
      //
      //
      //       this.loading_save = true;
      //       let verify = await this.verify_address(this.user.address);
      //       console.log({verify})
      //
      //       this.address_suggestion = null;
      //
      //       if (verify.success){
      //
      //          this.address_suggestion = verify.suggestion;
      //       }
      //       else{
      //          this.address_err = verify.error_msg;
      //       }
      //       this.show_address_confirm = true;
      //
      //       this.loading_save = false;
      //
      //    }catch (e) {
      //
      //       throw e;
      //    }
      // },


      on_image_upload(event){

         this.show_upload_image = false;

         console.log({event})
         this.user.profile_image = event;

         this.$emit('update-image', event);
      },






      async on_save({checked_addr, draft=false}={}){

         // if (this.$auth.profile.acct_type !== 'HANDLER' && this.$auth.profile.acct_type !== 'SDS-ADMIN'){
         //    throw Error('This component should only be used with a Handler');
         // }

         try{

            this.error_msg = null;




            console.log('debug')

            //check the address using the CheckAddress component

            if (!draft){

               if (this.$auth.profile.acct_type !== 'SDS-ADMIN' && !this.$refs.form.validate()){
                  this.error_msg = 'Some required fields are incomplete.  Please scroll up.';
                  // setTimeout(()=>{this.error_msg = null}, 5000);
                  return;
               }

               if (checked_addr === undefined){
                  this.loading_save = true;
                  await this.$refs.addrCheck.check_address();
                  // this.private_info_address_old = _.cloneDeep(this.private_info.address);
                  this.loading_save = false;
                  return;
               }
               else{
                  //assumes we're being called from the event handler from the CheckAddress component
                  this.private_info.address = checked_addr; //value returned from CheckAddress component's event
               }
            }





            this.loading_save = true;

            let update = _.cloneDeep(this.user);
            update.handler_info = this.handler_info;
            update.private_info = _.cloneDeep(this.private_info);




            //check if census had any entries
            let keys = Object.keys(this.census)
            let isNull = true;
            for (let k of keys){
               if (this.census[k] != null){
                  isNull=false;
               }
            }

            if (!isNull){
               update.private_info.census = this.census;
            }

            if (this.have_2nd_disability === false){
               update.private_info.disability.secondary = null;
               update.private_info.disability.secondary_other = null;
            }


            if (this.self_other === 'SELF'){
               update.private_info.aide = null;
            }




            if (this.$auth.profile.acct_type === 'SDS-ADMIN'){
               let p1 = await this.make_request('/admin/updateUserProfile', {user:update});
            }else{

               let user_id = this.$auth.profile.user_id;
               if (this.user_id != null){
                  user_id = this.user_id;
               }
               let payload = {
                  // user_id: this.$auth.profile.user_id,
                  user_id,
                  update,
               }
               let p1 = await this.make_request('/private/updateUserProfile', payload);
            }




            //*************save dog******************

            if (this.setupMode){
               let dog = _.cloneDeep(this.dog);


               keys = Object.keys(dog)
               isNull = true;
               for (let k of keys){
                  if (dog[k] != null){
                     isNull=false;
                  }
               }

               if (!isNull){
                  if (this.dog_in_training === true){
                     dog.status = 'InTraining'
                  }
                  if (this.dog_in_training === false){
                     dog.status = 'FullyTrained'
                  }
                  let p2 = await this.make_request('/private/updateDog', {user_id: this.$auth.profile.user_id, dog});
               }
            }


            this.loading_save = false;
            this.show_address_confirm = false;

            this.saved_msg = 'Changes Saved';
            setTimeout(()=>{this.saved_msg = null}, 5000);

            if (!draft){
               this.$emit('user_updated', update)
            }


         }catch (e) {

            throw e;
         }



      }
   }

}
</script>

<style scoped>


.profile-image-container{
    display:flex;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
}

.stepper-container{
    display: flex; justify-content: center; align-items: center; flex-direction: column;
}

.btn-container{
    margin-top: 25px;
    display: flex; justify-content: flex-end;
    width: 100%;
}

.heading-loc{
    width: 100%;
    text-align: left;
    font-size: 18pt;
    font-weight: 500;
    color: var(--color-subheading);
    margin-top: 50px;
}

.subheading-loc{
    width: 100%;
    text-align: left;
    font-size: 16pt;
    font-weight: 500;
    color: var(--color-subheading);
}

.line{
    width: 100%;
    /*border-color: red;*/
    /*border-width: 1px;*/
    border: 1px solid #b5b5b5;
    height: 0px;
    border-bottom: none;
    border-left: none;
    border-right: none;
}


/*census*/

.census-q{
    width: 100%;

}

.census-q-text{
    margin-top: 0px;
    margin-bottom: -10px;
    font-weight: 500;
    font-size: 13pt;

}

.radio-group{
    margin-left: 20px;
}



</style>
