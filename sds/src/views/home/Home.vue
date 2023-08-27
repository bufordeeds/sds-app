<template>
   <div class="home">


      <!------------dialog for showing error when no user found----------------->
      <v-dialog v-model="show_no_user" max-width="400px">
         <v-card >
<!--            <div style="display: flex; justify-content: flex-end">-->
<!--               <v-btn icon @click="show_no_user=false">-->
<!--                  <v-icon>close</v-icon>-->
<!--               </v-btn>-->
<!--            </div>-->
            <div class="pa-4" style="font-size: 14pt">
               No user with a public profile was found with that number.

               <div style="display: flex; justify-content: flex-end">
                  <v-btn @click="show_no_user=false"  color="var(--color-btn)" class="white--text">
                     Ok
                  </v-btn>
               </div>
            </div>
         </v-card>
      </v-dialog>



      <!------------dialog for advanced search----------------->

      <advanced-team-search
          v-if="show_advanced_search"
          v-model="show_advanced_search"
      />








      <!------------------------main content--------------------------------------------------------------------------->



     <Section
         background="black" class="image-bg"
         :style="{'background-image': `url(${require('../../assets/images/content/header-background.jpg')})`}"
     >
       <div style="background-color: rgba(0,0,0,0.4);">
         <nav-bar style="max-width: 1280px; margin-left: auto; margin-right:auto"></nav-bar>
       </div>


       <div class=" main-heading" v-if="$vuetify.breakpoint.smAndUp" :style="{height: $vuetify.breakpoint.width<900? '300px': '400px'}">
         <div class="fold-content">
            <div style="width: 40%">
               <img
                   src="../../assets/images/logo/service-dog-standards-h.png"
                   style="width: 100%;"
                   alt="Service Dog Standards Logo large"
               >
            </div>


            <div style="width: 35%">
               <img
                   src="../../assets/images/content/Home-Dog.png"
                   style="width: 100%; "
                   alt="Image of dog"
               >
            </div>
         </div>
       </div>



        <div v-else class="  " style="align-items: flex-start; padding-bottom: 180px; padding-top: 40px; align-items: center; display: flex; flex-direction: column">
           <div class="fold-content" style="justify-content: center; flex-direction: column">

              <div style="width: 90%">
                 <img
                     src="../../assets/images/logo/service-dog-standards-h.png"
                     style="width: 100%;"
                 >
              </div>

              <div style="width: 90%; font-weight: 100; font-size: 16pt; line-height: 1.2" class="mt-4">
                 <!--Cloud-based voluntary training and behavioral standards and team management solutions for Service-->
                 <!--Dog Trainers and Handlers-->
                 Free and voluntary training and behavior standards and team management solutions for Service Dog Trainers and Handlers.
              </div>
           </div>


        </div>



     </Section>



      <!---------------------------- fold 2 box -------------------------------------------------------------->
      <fold2 v-if="$vuetify.breakpoint.smAndUp"
          :search-num.sync="search_member_num"
          @search-user="search_user"
          @show-advanced-search="show_advanced_search=true"
      ></fold2>

      <fold2_mobile v-else
          :search-num.sync="search_member_num"
          @search-user="search_user"
          @show-advanced-search="show_advanced_search=true"
      ></fold2_mobile>






















      <!---------------------------- More confidence... Section ------------------------------------------------------->

      <!--<div class="section-container" style="margin-top: 20px;">-->
      <!--   <div class="section-inner-container" style="padding: 20px 50px 30px 50px; ">-->

      <!--      <div class="small-header-line">-->
      <!--         For Housing, Employment, Education & Travel-->
      <!--      </div>-->


      <!--      <div class="mt-4 large-header-line" >-->
      <!--         More confidence where you live, work and play.-->
      <!--      </div>-->

      <!--      <div style="display: flex" class="mt-4">-->
      <!--         <div>-->
      <!--            <div class="txt-box ">-->
      <!--               Service Dog owners who have chosen to go through the process of accepting Service Dog Standards conduct-->
      <!--               themselves better and have fewer access issues in housing, employment, education and while traveling.-->
      <!--            </div>-->

      <!--            <div class="txt-box-side">-->
      <!--               <img src="../../assets/images/content/SDSAircraftIconAsset4.svg" width="60px">-->
      <!--               <div class="b1-heading">-->
      <!--                  Peace-of-mind for all-->
      <!--               </div>-->

      <!--               Tenants, passengers, employees or guests use Service Dog Standards to offer a measure of-->
      <!--               assurance that they understand their responsibilities and what is involved with being partnered with a-->
      <!--               service dog as well as their rights and privileges.-->
      <!--            </div>-->

      <!--         </div>-->

      <!--         <div>-->
      <!--            <div class="txt-box">-->
      <!--               We provide free, community-defined training and-->
      <!--               behavior standards for Service Dog teams, trainers-->
      <!--               and organizations. Together, we can make a kinder,-->
      <!--               more educated and accessible world for everyone.-->
      <!--            </div>-->

      <!--            <div class="txt-box-side">-->

      <!--               <img src="../../assets/images/content/SDSBetterEducatedIconAsset5.svg" width="60px">-->
      <!--               <div class="b1-heading">-->
      <!--                  Better educated-->
      <!--               </div>-->

      <!--               Schools, colleges and universities use Service Dog-->
      <!--               Standards to help educate students and staff who are-->
      <!--               partnered with Service Dogs about their obligations-->
      <!--               and responsibilities to make campus and dorm life-->
      <!--               function more smoothly for everyone.-->
      <!--            </div>-->

      <!--         </div>-->
      <!--      </div>-->



      <!--      <div style="margin-top: 40px">-->
      <!--         <v-btn style="padding-right: 30px; padding-left: 30px">-->
      <!--            Join today-->
      <!--         </v-btn>-->
      <!--      </div>-->

      <!--   </div>-->
      <!--</div>-->




      <div class="section-container" style="margin-top: 0px;">
         <div class="section-inner-container" :class="class_mobile">

            <div class="small-header-line" :class="class_mobile">
               For Housing, Employment, Education & Travel
            </div>


            <div class="mt-4 large-header-line" :class="class_mobile">
               More confidence where you live, work and play.
            </div>

           <v-row>
              <v-col cols="12" md="6">
                 <div class="txt-box ">
                    Service Dog owners who have chosen to go through the process of accepting Service Dog Standards conduct
                    themselves better and have fewer access issues in housing, employment, education and while traveling.
                 </div>
              </v-col>
              <v-col cols="12" md="6">
                 <div class="txt-box">
                    We provide free, community-defined training and
                    behavior standards for Service Dog teams, trainers
                    and organizations. Together, we can make a kinder,
                    more educated and accessible world for everyone.
                 </div>
              </v-col>
           </v-row>


            <v-row>
               <v-col cols="12" md="6">
                  <div class="txt-box-side">
                     <img src="../../assets/images/content/SDSAccessIconsAsset18.svg" height="30px">
                     <div class="b1-heading">
                        Peace-of-mind for all
                     </div>

                     Tenants, passengers, employees or guests use Service Dog Standards to offer a measure of
                     assurance that they understand their responsibilities and what is involved with being partnered with a
                     service dog as well as their rights and privileges.
                  </div>
               </v-col>
               <v-col cols="12" md="6">
                  <div class="txt-box-side">

                     <img src="../../assets/images/content/SDSBetterEducatedIconAsset5.svg" height="40px">
                     <div class="b1-heading">
                        Better educated
                     </div>

                     Schools, colleges and universities use Service Dog
                     Standards to help educate students and staff who are
                     partnered with Service Dogs about their obligations
                     and responsibilities to make campus and dorm life
                     function more smoothly for everyone.
                  </div>
               </v-col>
            </v-row>


            <div style="margin-top: 40px">
               <v-btn style="padding-right: 30px; padding-left: 30px" to="/signup">
                  Join today
               </v-btn>
            </div>

         </div>
      </div>


      <!---------------------------- Section Accepted Standards ------------------------------------------------------->

      <!--<div class="section-container" style="margin-top: 20px; background-color: white">-->
      <!--   <div class="section-inner-container" :class="class_mobile">-->
      <!--      &lt;!&ndash;style="padding: 100px 50px 30px 50px; "&ndash;&gt;-->

      <!--      <div class="small-header-line" :class="class_mobile">-->
      <!--         Accepted Standards-->
      <!--      </div>-->


      <!--      <div class="mt-4 large-header-line" :class="class_mobile">-->
      <!--           Credentials backed up by Standards.-->
      <!--      </div>-->

      <!--      <div style="display: flex" class="mt-4">-->
      <!--         <div>-->
      <!--            <div class="txt-box ">-->
      <!--               Unlike generic IDs, patches or vests, our service is-->
      <!--               built on over 10 years of research and collaboration-->
      <!--               with Service Dog trainers, owners, disability-->
      <!--               advocates, medical professionals, legal experts,-->
      <!--               property managers, and landlords.-->
      <!--            </div>-->



      <!--         </div>-->

      <!--         <div>-->
      <!--            <div class="txt-box">-->
      <!--               Please help support Service Dog handlers and our-->
      <!--               ongoing work for the Service Dog community by-->
      <!--               choosing genuine Service Dog Standards materials-->
      <!--               available only on this website.-->
      <!--            </div>-->



      <!--         </div>-->
      <!--      </div>-->


      <!--      <div style="margin-top: 40px">-->
      <!--         <v-btn style="padding-right: 30px; padding-left: 30px">-->
      <!--            Get Started-->
      <!--         </v-btn>-->
      <!--      </div>-->


      <!--      <div style="width: 100%; overflow-x: hidden">-->
      <!--         <img src="../../assets/images/content/SDSMaterialsForIndexPageAsset_3.png" style="width: 100%">-->

      <!--      </div>-->

      <!--   </div>-->
      <!--</div>-->


      <div class="section-container" style="margin-top: 20px; background-color: white">
         <div class="section-inner-container" :class="class_mobile">
            <!--style="padding: 100px 50px 30px 50px; "-->

            <div class="small-header-line" :class="class_mobile">
               Accepted Standards
            </div>


            <div class="mt-4 large-header-line" :class="class_mobile">
               Credentials backed up by Standards.
            </div>

            <div v-if="ismobile" style="width: 120%; overflow-x: hidden" :style="{order: ismobile? -1: 0}">
               <img src="../../assets/images/content/SDSMaterialsForIndexPageAsset_3.png" style="width: 100%">
            </div>

            <v-row>
               <v-col cols="12" md="6">
                  <div class="txt-box ">
                     Unlike generic IDs, patches or vests, our service is
                     built on over 10 years of research and collaboration
                     with Service Dog trainers, owners, disability
                     advocates, medical professionals, legal experts,
                     property managers, and landlords.
                  </div>
               </v-col>
                  <v-col cols="12" md="6">
                     <div class="txt-box">
                        Please help support Service Dog handlers and our
                        ongoing work for the Service Dog community by
                        choosing genuine Service Dog Standards materials
                        available only on this website.
                     </div>
                  </v-col>
            </v-row>



            <div style="display: flex; flex-direction: column">
               <div :style="ismobile?'margin-top:0px; margin-bottom: 20px;':'margin-top:20px'">
                  <v-btn style="padding-right: 30px; padding-left: 30px" to="/signup">
                     Get Started
                  </v-btn>
               </div>


               <!--<div style="width: 100%; overflow-x: hidden" :style="{order: ismobile? -1: 0}">-->
               <!--   <img src="../../assets/images/content/SDSMaterialsForIndexPageAsset_3.png" style="width: 100%">-->
               <!--</div>-->

               <div v-if="!ismobile" style="width: 120%; overflow-x: hidden" :style="{order: ismobile? -1: 0}">
                  <img src="../../assets/images/content/SDSMaterialsForIndexPageAsset_3.png" style="width: 100%">
               </div>


            </div>


         </div>
      </div>

      <!---------------------------- Section free owners ------------------------------------------------------->





      <div class="section-container angled-section" :class="class_mobile">
         <div class="section-inner-container" :class="class_mobile">

            <div class="small-header-line" >
               Free for owners
            </div>

            <template v-if="class_mobile_img1 !== ''">
               <div class="mt-4 large-header-line" style="color: white" :class="class_mobile">
                  Create a secure profile for your Service Dog.
               </div>

               <div class="img_full_width_container" :class="class_mobile_img1">
                  <img src="../../assets/images/content/SDSSecureProfileExampleAsset_15.png"
                       class="img_full_width" :class="class_mobile_img1">
               </div>
            </template>



            <v-row>
               <v-col >
                  <div v-if="!ismobile" class="mt-4 large-header-line" style="color: white" :class="class_mobile">
                     Create a secure profile for your Service Dog.
                  </div>

                  <div class="txt-box mt-8 " style="color: white; line-height: 1.6; font-weight: 400">
                     When you register with Service Dog Standards,
                     your dog gets their own free Profile Page. Here,
                     you'll be able to safely share your dog's training
                     accomplishments, photos, and more — privately
                     and only with those you choose.
                  </div>

                  <div class="txt-box-side" style="border-left: 1px solid white; color: white">

                     <img src="../../assets/images/content/SDSLockIconAsset_2.svg" width="50px">
                     <div class="b1-heading" style="color: white">
                        Keep your documents private
                     </div>

                     <div class="mt-2" style="font-weight: 400">
                        Service Dog Standards lets you know what types of
                        documentation and training accomplishments are
                        relevant and allows you to share the fact that you
                        have them while protecting your privacy.
                     </div>

                  </div>

                  <div style="margin-top: 40px">
                     <v-btn style="padding-right: 30px; padding-left: 30px" to="/signup">
                        Join today
                     </v-btn>
                  </div>
               </v-col>

               <v-col cols="12" md="7" v-if="class_mobile_img1 === ''">
                  <img src="../../assets/images/content/SDSSecureProfileExampleAsset_15.png"
                       :style="ismobile? 'margin-left: -50px': 'margin-top: -200px; margin-left: -50px'"
                       width="150%"
                  >

               </v-col>
            </v-row>

         </div>
      </div>



      <!--<div class="section-container angled-section" >-->
      <!--   <div class="section-inner-container" :class="class_mobile">-->

      <!--      <div class="small-header-line" :class="class_mobile">-->
      <!--         Free for owners-->
      <!--      </div>-->
      <!--      -->
      <!--      &lt;!&ndash;cols 1&ndash;&gt;-->
      <!--      <div style="display: flex; " class="mt-4" >-->

      <!--         <div style="width: 40%">-->
      <!--            <div class="mt-4 large-header-line" style="color: white" :class="class_mobile">-->
      <!--               Create a secure profile for your Service Dog.-->
      <!--            </div>-->

      <!--            <div class="txt-box mt-8 " style="color: white; line-height: 1.6; font-weight: 400">-->
      <!--               When you register with Service Dog Standards,-->
      <!--               your dog gets their own free Profile Page. Here,-->
      <!--               you'll be able to safely share your dog's training-->
      <!--               accomplishments, photos, and more — privately-->
      <!--               and only with those you choose.-->
      <!--            </div>-->

      <!--            <div class="txt-box-side" style="border-left: 1px solid white; color: white">-->

      <!--               <img src="../../assets/images/content/SDSLockIconAsset_2.svg" width="50px">-->
      <!--               <div class="b1-heading" style="color: white">-->
      <!--                  Keep your documents private-->
      <!--               </div>-->

      <!--               <div class="mt-2" style="font-weight: 400">-->
      <!--                  Service Dog Standards lets you know what types of-->
      <!--                  documentation and training accomplishments are-->
      <!--                  relevant and allows you to share the fact that you-->
      <!--                  have them while protecting your privacy.-->
      <!--               </div>-->

      <!--            </div>-->

      <!--            <div style="margin-top: 40px">-->
      <!--               <v-btn style="padding-right: 30px; padding-left: 30px">-->
      <!--                  Join today-->
      <!--               </v-btn>-->
      <!--            </div>-->
      <!--         </div>-->

      <!--         &lt;!&ndash;cols 2&ndash;&gt;-->
      <!--         <div style="width: 60%; padding: 0">-->
      <!--            <img src="../../assets/images/content/SDSSecureProfileExampleAsset_15.png"-->
      <!--                 style="margin-top: -200px; margin-left: -50px"-->
      <!--                 width="130%"-->
      <!--            >-->



      <!--         </div>-->
      <!--      </div>-->







      <!--   </div>-->
      <!--</div>-->

      <!---------------------------- Section Free for trainers ------------------------------------------------------->

      <div class="section-container" :class="class_mobile" style="margin-top: 0px; ">
         <div class="section-inner-container" :class="class_mobile" style="overflow-x: hidden; ">

            <div class="small-header-line" :class="class_mobile">
               Free for Trainers
            </div>


            <div class="mt-4 large-header-line" :class="class_mobile">
               Grow your dog training practice or organization.
            </div>







            <div style="display: flex" class="mt-4">

               <div style="margin-right: 0%"  :style="{width: ismobile? '100%': '50%'}">
                  <div class="txt-box " style="max-width: 500px">
                     Whether you're an individual trainer who visits
                     clients at their home or a training organization with
                     a facility, Service Dog Standards gives you the tools
                     to educate and manage your human clients and
                     grow your business.
                  </div>

                  <div class="txt-box-side">

                     <img src="../../assets/images/content/SDSFreeRobustBusinessPageIconAsset6.svg" width="50px">
                     <div class="b1-heading">
                        Free robust business page
                     </div>


                     Whether you currently train Service Dogs or would
                     like to begin, Service Dog Standards lets you set up
                     a free business page with ease. It's so powerful, you
                     can even use it in place of a website. To get started,
                     create an account with us today.
                  </div>



                  <!--mini matrix-->
                  <div style="display: flex" class="mt-4" :style="{'flex-direction': ismobile?'column':'row'}">
                     <div class="txt-box-side" :style="{'width': ismobile?'100%':'50%'}">
                        <img src="../../assets/images/content/SDSInviteClientsIconAsset7.svg" height="40px">
                        <div class="b1-heading">
                           Invite clients
                        </div>
                      Easily send email invitations to clients.
                     </div>

                     <div class="txt-box-side" :style="{'width': ismobile?'100%':'50%'}">

                        <img src="../../assets/images/content/SDSTrackDogsandClientsIconAsset8.svg" height="40px">
                        <div class="b1-heading">
                           Track dogs & clients
                        </div>
                        Manage service dog puppy candidates, graduates, washouts and more.
                     </div>
                  </div>
                  <div style="display: flex" class="mt-4" :style="{'flex-direction': ismobile?'column':'row'}">
                     <div class="txt-box-side" :style="{'width': ismobile?'100%':'50%'}">
                        <img src="../../assets/images/content/SDSEducateClientsIconAsset9.svg" height="40px">
                        <div class="b1-heading">
                           Educate clients
                        </div>
                        Easily send email invitations to clients.
                     </div>

                     <div class="txt-box-side" :style="{'width': ismobile?'100%':'50%'}">

                        <img src="../../assets/images/content/SDSReducesStressIconAsset10.svg" height="40px">
                        <div class="b1-heading">
                           Reduce Stress
                        </div>
                        Manage service dog puppy candidates, graduates, washouts and more.
                     </div>
                  </div>



                  <div style="margin-top: 40px;" :style="{'padding-bottom': ismobile? '0px': '200px'}">
                     <v-btn style="padding-right: 30px; padding-left: 30px" to="/signup">
                        Join today
                     </v-btn>
                  </div>
               </div>






               <!--col2-->
               <div style="width: 50%;  " v-if="!ismobile">
                  <div style="margin-left: 0px ">
                     <img src="../../assets/images/content/SDSTrainerMobileScreensAsset_11.png"
                          style="margin-top: 20px; "
                          width="130%"
                     >

                  </div>



               </div>
            </div>


         </div>
      </div>



      <!--<div class="section-container" :class="class_mobile" style="margin-top: 0px; ">-->
      <!--   <div class="section-inner-container" :class="class_mobile" style="overflow-x: hidden; ">-->

      <!--      <div class="small-header-line" :class="class_mobile">-->
      <!--         Free for Trainers-->
      <!--      </div>-->


      <!--      <div class="mt-4 large-header-line" :class="class_mobile">-->
      <!--         Grow your dog training practice or organization.-->
      <!--      </div>-->

      <!--      <div style="display: flex" class="mt-4">-->




      <!--         <div style="width: 50%; margin-right: -80px">-->
      <!--            <div class="txt-box " style="max-width: 500px">-->
      <!--               Whether you're an individual trainer who visits-->
      <!--               clients at their home or a training organization with-->
      <!--               a facility, Service Dog Standards gives you the tools-->
      <!--               to educate and manage your human clients and-->
      <!--               grow your business.-->
      <!--            </div>-->

      <!--            <div class="txt-box-side">-->

      <!--               <img src="../../assets/images/content/SDSFreeRobustBusinessPageIconAsset6.svg" width="50px">-->
      <!--               <div class="b1-heading">-->
      <!--                  Free robust business page-->
      <!--               </div>-->


      <!--               Whether you currently train Service Dogs or would-->
      <!--               like to begin, Service Dog Standards lets you set up-->
      <!--               a free business page with ease. It's so powerful, you-->
      <!--               can even use it in place of a website. To get started,-->
      <!--               create an account with us today.-->
      <!--            </div>-->



      <!--            &lt;!&ndash;mini matrix&ndash;&gt;-->
      <!--            <div style="display: flex" class="mt-4">-->
      <!--               <div class="txt-box-side">-->
      <!--                  <img src="../../assets/images/content/SDSInviteClientsIconAsset7.svg" width="60px">-->
      <!--                  <div class="b1-heading">-->
      <!--                     Invite clients-->
      <!--                  </div>-->
      <!--                  Easily send email invitations to clients.-->
      <!--               </div>-->

      <!--               <div class="txt-box-side">-->

      <!--                  <img src="../../assets/images/content/SDSTrackDogsandClientsIconAsset8.svg" width="60px">-->
      <!--                  <div class="b1-heading">-->
      <!--                     Track dogs & clients-->
      <!--                  </div>-->
      <!--                  Manage service dog puppy candidates, graduates, washouts and more.-->
      <!--               </div>-->
      <!--            </div>-->
      <!--            <div style="display: flex" class="mt-4">-->
      <!--               <div class="txt-box-side">-->
      <!--                  <img src="../../assets/images/content/SDSEducateClientsIconAsset9.svg" width="60px">-->
      <!--                  <div class="b1-heading">-->
      <!--                     Educate clients-->
      <!--                  </div>-->
      <!--                  Easily send email invitations to clients.-->
      <!--               </div>-->

      <!--               <div class="txt-box-side">-->

      <!--                  <img src="../../assets/images/content/SDSReducesStressIconAsset10.svg" width="60px">-->
      <!--                  <div class="b1-heading">-->
      <!--                     Reduce Stress-->
      <!--                  </div>-->
      <!--                  Manage service dog puppy candidates, graduates, washouts and more.-->
      <!--               </div>-->
      <!--            </div>-->



      <!--            <div style="margin-top: 40px">-->
      <!--               <v-btn style="padding-right: 30px; padding-left: 30px">-->
      <!--                  Join today-->
      <!--               </v-btn>-->
      <!--            </div>-->
      <!--         </div>-->






      <!--         &lt;!&ndash;col2&ndash;&gt;-->
      <!--         <div style="width: 50%;  ">-->
      <!--            <div style="margin-left: 0px ">-->
      <!--               <img src="../../assets/images/content/SDSTrainerMobileScreensAsset_11.png"-->
      <!--                    style="margin-top: 0px; "-->
      <!--                    width="130%"-->
      <!--               >-->

      <!--            </div>-->



      <!--         </div>-->
      <!--      </div>-->


      <!--   </div>-->
      <!--</div>-->



      <!---------------------------- anything pawsable Section -------------------------------------------------------->
      <div class="section-container " style="background-color: white;" :class="class_mobile" :style="{'margin-top': ismobile? '20px': '-150px'}">
         <div class="section-inner-container" style="background-color: white;" :class="class_mobile">
            <div class="small-header-line" :class="class_mobile">
               News and education
            </div>
            <wp-embed></wp-embed>
         </div>
      </div>






      <!---------------------------- Section begin today ------------------------------------------------------->

      <div class="section-container" :class="class_mobile" >
         <div class="section-inner-container" style="overflow-x: hidden; " :class="class_mobile" >

            <div class="small-header-line" :class="class_mobile" >
               Begin today
            </div>


            <div class="mt-4 large-header-line" :class="class_mobile" >
               Join Now.  Level up as your dog progresses.
            </div>

            <div style="display: flex" class="mt-4" >

               <div :style="{'max-width': ismobile? '100%': '500px'}">
                  <div class="txt-box " style="max-width: 500px">
                     Service Dog Standards is designed for both newer teams and those that been active for years.
                  </div>
               </div>



            </div>

            <!--mini matrix-->
            <div style="display: flex" class="mt-4" :style="{'flex-direction': ismobile? 'column': 'row'}">
               <div class="txt-box-side">
                  <img src="../../assets/images/content/SDSAllBreedsAllowedIconAsset13.svg" width="60px">
                  <div class="b1-heading">
                     All dog breeds & sizes are
                     allowed
                  </div>

                  The ADA does not discriminate
                  against different breeds or sizes of
                  dogs — large or small — and neither
                  do we. It's the training and
                  behavior that matters.


               </div>


               <div class="txt-box-side">
                  <img src="../../assets/images/content/SDSWelcomeIconAsset14.svg" width="60px">
                  <div class="b1-heading">
                     Service Dogs in Training are welcome
                  </div>

                  New teams should start working
                  towards meeting Service Dog
                  Standards as soon as possible.
                  Everyone has to start somewhere,
                  including dogs.
               </div>

               <div class="txt-box-side">
                  <img src="../../assets/images/content/SDSOwnerTrainerOrProgramTrainedIconAsset15.svg" width="60px">
                  <div class="b1-heading">
                     Built for Owner-Trainers &
                     Program-Trained Dogs
                  </div>
                  Whether you're training your dog
                  yourself, working with a private
                  trainer or have received your dog
                  fully-trained from an organization,
                  Service Dog Standards can help.
               </div>

            </div>

            <div style="margin-top: 40px">
               <v-btn style="padding-right: 30px; padding-left: 30px; font-size: 14pt" to="/signup">
                  Get started
               </v-btn>

               <div v-if="ismobile" class="b1-heading mt-2">
                  Join now.  It's free.
               </div>
               <span class="b1-heading ml-4" v-else>
                  Join now.  It's free.
               </span>

            </div>

         </div>
      </div>




      <!---------------------------- Social media Section --------------------------------------------------------------------->
      <div class="section-container" style="margin-top: 100px; background-color: #404042">
         <div class="section-inner-container" style=" padding: 80px 50px 80px 50px; ">


            <div class="mb-3" style="color: white; font-size: 15pt; text-align: center">
               Please connect with us!
            </div>

            <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap">

               <a href="https://www.facebook.com/servicedog" class="ma-2">
                  <img src="../../assets/images/content/social/SDSFacebookCounterAsset19.svg"
                       :width="ismobile?'100px': '120px'">
               </a>

               <a href="https://www.facebook.com/servicedog" target="_blank" class="ma-2">
                  <img src="../../assets/images/content/social/SDSFacebookAsset20.svg"
                       :width="ismobile?'40px': '60px'">
               </a>

               <a href="https://twitter.com/servicedog" target="_blank" class="ma-2">
                  <img src="../../assets/images/content/social/SDSTwitterAsset21.svg" :width="ismobile?'40px': '60px'">
               </a>

               <a href="https://www.pinterest.com/servicedogstandards/" target="_blank" class="ma-2">
                  <img src="../../assets/images/content/social/SDSPintrestAsset22.svg" :width="ismobile?'40px': '60px'">
               </a>

               <a href="https://instagram.com/servicedogstandards/" target="_blank" class="ma-2">
                  <img src="../../assets/images/content/social/SDSInstragramAsset23.svg" :width="ismobile?'40px': '60px'">
               </a>

               <a href="https://www.youtube.com/c/ServiceDogStandards" target="_blank" class="ma-2">
                  <img src="../../assets/images/content/social/SDSYouTubeAsset24.svg" :width="ismobile?'40px': '60px'">
               </a>
            </div>
         </div>
      </div>

      <!---------------------------- Social media Section --------------------------------------------------------------------->
      <!--<div class="section-container" style="margin-top: 30px;">-->
      <!--   <div class="section-inner-container" style="background-color: white; padding: 20px 50px 30px 50px; ">-->
      <!--      <v-row justify="center">-->
      <!--         <v-col cols="12" md="6" style="display: flex; flex-direction: column; align-items: center">-->
      <!--            <div style="color: var(&#45;&#45;color-headline); font-size: 16pt; text-align: center">-->
      <!--               You're invited to connect with us!-->
      <!--            </div>-->


      <!--            <div class="social-container">-->
      <!--               <a href="https://www.anythingpawsable.com/" target="_blank">-->
      <!--                  <div class="social-bar-container" style="background-color: #44B05A; padding-bottom: 15px; padding-top: 15px">-->
      <!--                     <div><img src="../../assets/images/icons/AP-Foot.png" style="height: 20px"></div>-->
      <!--                     <div>Anything Pawsable</div>-->
      <!--                  </div>-->
      <!--               </a>-->


      <!--               <a href="https://www.facebook.com/servicedog" target="_blank">-->
      <!--                  <div class="social-bar-container" style="background-color: #5170AC; padding-bottom: 15px; padding-top: 15px">-->
      <!--                     <div><img src="../../assets/images/icons/facebook.svg" style="height: 20px"></div>-->
      <!--                     <div>Facebook</div>-->
      <!--                  </div>-->
      <!--               </a>-->


      <!--               <a href="https://www.youtube.com/c/ServiceDogStandards" target="_blank">-->
      <!--                  <div class="social-bar-container" style="background-color: #EF3C23">-->
      <!--                     <div><img src="../../assets/images/icons/youtube.svg" style="height: 20px"></div>-->
      <!--                     <div>YouTube</div>-->
      <!--                  </div>-->
      <!--               </a>-->


      <!--               <a href="https://twitter.com/servicedog" target="_blank">-->
      <!--                  <div class="social-bar-container" style="background-color: #32C4F3">-->
      <!--                     <div><img src="../../assets/images/icons/twitter.svg" style="height: 20px"></div>-->
      <!--                     <div>Twitter</div>-->
      <!--                  </div>-->
      <!--               </a>-->


      <!--               <a href="https://www.pinterest.com/servicedogstandards/" target="_blank">-->
      <!--                  <div class="social-bar-container" style="background-color: #EF3C23">-->
      <!--                     <div><img src="../../assets/images/icons/pinterest.svg" style="height: 20px"></div>-->
      <!--                     <div>Pinterest</div>-->
      <!--                  </div>-->
      <!--               </a>-->

      <!--               <a href="https://instagram.com/servicedogstandards/" target="_blank">-->
      <!--                  <div class="social-bar-container" style="background-image: linear-gradient(to top right, #f7c800, #f71401, #c92666, #c92666, #7833a8);">-->
      <!--                     <div><img src="../../assets/images/icons/instagram-logo.svg" style="height: 20px"></div>-->
      <!--                     <div>Instagram</div>-->
      <!--                  </div>-->
      <!--               </a>-->

      <!--               &lt;!&ndash;<a href="https://www.flickr.com/groups/servicedog" target="_blank">&ndash;&gt;-->
      <!--               &lt;!&ndash;   <div class="social-bar-container" style="background-color: #CCCCCC">&ndash;&gt;-->
      <!--               &lt;!&ndash;      <div><img src="../../assets/images/icons/flickr.svg" style="height: 20px"></div>&ndash;&gt;-->
      <!--               &lt;!&ndash;      <div>Flickr</div>&ndash;&gt;-->
      <!--               &lt;!&ndash;   </div>&ndash;&gt;-->
      <!--               &lt;!&ndash;</a>&ndash;&gt;-->


      <!--            </div>-->

      <!--         </v-col>-->


      <!--      </v-row>-->
      <!--   </div>-->
      <!--</div>-->


   </div>
</template>

<script>
// @ is an alias to /src
import LoginModal from '@/components/app/LoginModal.vue'
import Section from '@/components/Section.vue'
import NavBar from '@/components/app/NavBar.vue'

import HomeContentBox from "@/components/HomeContentBox";
import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";
import AdvancedTeamSearch from "@/components/AdvancedTeamSearch";
import LineAnimation2 from "@/components/LineAnimation2";

import wpEmbed from "@/components/wpEmbed";
import fold2 from "@/views/home/fold2";
import fold2_mobile from "@/views/home/fold2_mobile";


export default {
   name: 'Home',
   mixins: [data_getters, validation],
   components: {AdvancedTeamSearch, Section, NavBar, HomeContentBox, wpEmbed, fold2, fold2_mobile, LineAnimation2},

   data() {
      return {
         show_mission: false,
         search_member_num: null,

         show_no_user: false,
         show_advanced_search: false,
      }
   },

   computed: {
      class_mission() {
         if (this.show_mission) {
            return 'mission-show';
         } else {
            return 'mission-collapsed';
         }
      },

      ismobile(){
         // return !this.$vuetify.breakpoint.mdAndUp
         return this.$vuetify.breakpoint.width < 700
      },
      class_mobile(){
         if (!this.ismobile){
            return ''
         }
         else{
            return 'ismobile'
         }
      },

      class_mobile_img1(){
         let ans = ''
         if (this.$vuetify.breakpoint.width < 500){
            ans = 'mobile_sm'
         }
         else if (this.$vuetify.breakpoint.width < 900){
            ans = 'mobile_md'
         }


         return ans;

      }
   },

   methods: {


      async get_ap_data(){
         try {
            let xml = await this.make_request('/public/getAnythingPawsableContent', {});


         } catch (e) {
            console.log(e);
         }
      },

      async search_user() {
         //
         // if (!this.$refs.form1.validate()) {
         //    return;
         // }

         try {
            let dog = await this.make_request('/public/getDogProfile', {dog_num: this.search_member_num});
            console.log(dog)
            if (dog !== null) {
               // await this.$router.push('/profile/' + user._id);
              await this.$router.push('/team/' + this.search_member_num);
            } else {
               this.show_no_user = true;
            }

         } catch (e) {
            console.log(e);
         }
      }
   },

   created() {
      this.$store.commit("set_default_nav", false)
      this.$store.commit("set_show_side_nav", false);

      //check if advanced search should be shown
      let as = this.$route.query.advanced_search;
      if (as === 'true'){
         this.show_advanced_search=true;
      }

   },

   beforeDestroy() {
      this.$store.commit("set_default_nav", true)
   }


}
</script>


<style scoped>




.home {
   background-color: var(--color-bg);
   /*background-color: #853bcd;*/
   position: relative;
}

.image-bg {
   background-size: cover;
   background-position: center;
}


.content-container {
   max-width: 1280px;
   left-margin: auto;
   right-margin: auto;

   padding: 10px;
}


.main-heading {
   height: 400px;
   display: flex;
   align-items: flex-end;
   justify-content: center;
   padding-bottom: 40px;
   /*background-image: url('../assets/images/content/math.png')*/

   /*background-size: cover;*/
   /*!*background-size: auto 100%;*!*/
   /*!*background-size: 100% auto;*!*/
   /*background-position: center;*/
}

.fold-content {
   display: flex;
   flex-wrap: nowrap;
   justify-content: space-between;
   align-items: center;
   width: 90%;
   max-width: 1100px;
   /*border: 1px solid red;*/

   position: relative;
   z-index: 0;


}

.fold-text {
   font-size: 30pt;
   margin-top: 50px;
   text-align: center;
}




/************ section 1 box **********************************/

.txt-box{
    font-size: 14pt;
    font-weight: 600;
    color: #666766;
    line-height: 1.4;
    padding-right: 10px;
    /*max-width: 500px;*/
}

.txt-box-side{
    margin-top: 30px;
    font-size: 11pt;
    font-weight: 600;
    color: #666766;
    line-height: 1.4;
    border-left: 2px solid #969696;

    padding-right: 10px;
    padding-left: 20px;

    max-width: 500px;
}


.b1-heading{
    font-size: 13pt;
    font-weight: 600;
    color: var(--color-txt-blue-light);
}


.small-header-line{
    font-weight: bold;
    color: var(--color-txt-blue-light)
}
.large-header-line{
    font-weight: 600;
    color: var(--color-txt-blue-dark);
    font-size: 40pt;
    line-height: 1.2;
    max-width: 900px
}


.b1-heading.ismobile{
    font-size: 10pt;
    font-weight: 600;
}


.small-header-line.ismobile{
    font-weight: bold;
    color: var(--color-txt-blue-light)
}
.large-header-line.ismobile{
    font-weight: 600;
    color: var(--color-txt-blue-dark);
    font-size: 20pt;
    line-height: 1.2;
    max-width: 900px
}



.angled-section{
    /*-webkit-clip-path: polygon(0 0, 100% 0, 100% 96%, 0 100%);*/
    /*clip-path: polygon(0 0, 100% 0, 100% 96%, 0 100%);*/

    -webkit-clip-path: polygon(0 200px, 100% 0, 100% 100%, 0 100%);
    clip-path: polygon(0 200px, 100% 0, 100% 100%, 0 100%);
    padding-top: 200px;

    margin-top: -180px;

    background-image: linear-gradient(#0d1836, #0d1836, #044f86)
}

.section-container.angled-section.ismobile{


    clip-path: polygon(0 80px, 100% 0, 100% 100%, 0 100%);
    padding-top: 80px;

    margin-top: -80px;


}



/*********** related to full width images**********************************************/
.img_full_width{
    width: 100%;
    margin-left: -10%
}

.img_full_width.mobile_md {
    width: 100%;
    margin-left: -10%
}



.img_full_width_container{
    width: 130%;
}




/************ fold 2 box **********************************/

/*.fold2-container {*/
/*   display: flex;*/
/*   !*position: absolute;*!*/
/*   width: 100%;*/
/*   justify-content: center;*/
/*   margin-top: -50px;*/
/*   padding-bottom: 50px;*/
/*   padding-left: 20px;*/
/*   padding-right: 20px;*/



/*}*/

/*.fold2 {*/
/*   !*max-width: var(--max-width);*!*/
/*   max-width: 1000px;*/
/*   background-color: white;*/
/*   width: 100%;*/
/*   min-height: 200px;*/
/*   display: flex;*/
/*   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/

/*   z-index: 1;*/

/*}*/


/*.member-lookup-box {*/
/*   height: 100%;*/
/*   width: 500px;*/
/*   padding: 15px;*/
/*   background-image: linear-gradient(to bottom, #60aee0, #2567b0);*/
/*}*/

/*.fold2-label {*/
/*   color: white;*/
/*   !*font-size: 14pt;*!*/

/*   font-size: 16pt;*/
/*   font-weight: 600;*/
/*   !*padding-left: 20px;*!*/
/*   !*padding-right: 10px;*!*/
/*}*/


/*.learn-more-btn {*/
/*   font-size: 16pt;*/
/*   font-weight: 600;*/
/*   color: var(--color-headline);*/
/*   padding-left: 20px;*/
/*   padding-right: 10px;*/
/*   letter-spacing: -0.1px;*/


/*}*/


/*div >>> .v-btn {*/
/*   border-radius: 0px;*/

/*}*/


/*.triangle {*/
/*   --width: 5px;*/
/*   width: 0;*/
/*   height: 0;*/
/*   border-top: var(--width) solid transparent;*/
/*   border-bottom: var(--width) solid transparent;*/
/*   border-left: 7px solid #ffffff;*/
/*   margin-top: 2px;*/
/*}*/


/*.triangle-blue {*/
/*   --width: 5px;*/
/*   width: 0;*/
/*   height: 0;*/
/*   border-top: var(--width) solid transparent;*/
/*   border-bottom: var(--width) solid transparent;*/
/*   border-left: 7px solid #2d76ba;*/
/*   margin-top: 2px;*/
/*}*/


/*****matrix section *********************************************/
.section-container {
   display: flex;
   justify-content: center;
    padding-left: 20px;
    padding-right: 20px;
    overflow-x: hidden;
}

.section-inner-container {
    max-width: var(--max-width);
    width: 100%;
    padding: 80px 50px 30px 50px;
}

.section-inner-container.ismobile {
    padding: 50px 10px 30px 10px;
}

.flex-centered {
   display: flex;
   justify-content: center;
}





/**************** FAQ *************************************************/


/*FAQ*/

.faq-header {
   font-weight: bold;
   font-size: 16pt;
   /*background: #dfeef3;*/

}

.faq-body {
   padding-top: 0px;
   padding-bottom: 20px;
}

.learn-more-btn-container {
   padding-top: 5px;
}

.learn-more-txt {
   color: #2d76ba;
   text-decoration: none;
}

a.learn-more-txt:focus {
   outline: none;
   background-color: #c6d8ff;
}


/* mission section */

.flex-container {
   display: flex;
   justify-content: center;
   font-size: 17pt;
}


.mission-collapsed {
   max-height: 0px;
   overflow: hidden;
   transition: max-height 0.9s ease-out;
}

.mission-show {
   max-height: 1000px;
   overflow: hidden;
   transition: max-height 0.9s ease-out;
}


/* for three column section*/

.column-card {
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100%;

   padding: 40px 20px 40px 20px;


}

.box-header {
   font-size: 20px;
   font-weight: bold;
   margin-top: 20px;
   margin-bottom: 20px;
   text-align: center;
}

.box-button {
   margin-top: 20px;
}


/*social*/
.social-container {
   max-width: 400px;
   width: 100%

}

.social-bar-container {
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   padding: 5px 10px 5px 10px;
   margin-top: 5px;
   color: white;
   font-width: bold;
   font-size: 11pt;
}

/*get rid of link decoration for social lilnks*/
div.social-container > a {
   text-decoration: none;
}
</style>
