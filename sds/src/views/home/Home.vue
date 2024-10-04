<template>
  <div class="home">
    <!------------dialog for showing error when no user found----------------->
    <v-dialog v-model="show_no_user" max-width="400px">
      <v-card>
        <!--            <div style="display: flex; justify-content: flex-end">-->
        <!--               <v-btn icon @click="show_no_user=false">-->
        <!--                  <v-icon>close</v-icon>-->
        <!--               </v-btn>-->
        <!--            </div>-->
        <div class="pa-4" style="font-size: 14pt">
          No user with a public profile was found with that number.

          <div style="display: flex; justify-content: flex-end">
            <v-btn color="var(--color-btn)" class="white--text" @click="show_no_user = false">
              Ok
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>

    <!------------dialog for advanced search----------------->

    <advanced-team-search v-if="show_advanced_search" v-model="show_advanced_search" />

    <!------------------------main content--------------------------------------------------------------------------->

    <!--
    <Section
      background="black"
      class="image-bg"
      :style="{ 'background-image': `url(${require('../../assets/images/content/header-background.jpg')})` }"
    >
      <div style="background-color: rgba(0,0,0,0.4);">
        <nav-bar style="max-width: 1280px; margin-left: auto; margin-right:auto" />
      </div>


      <div
        v-if="$vuetify.breakpoint.smAndUp"
        class=" main-heading"
        :style="{ height: $vuetify.breakpoint.width < 900 ? '300px' : '400px' }"
      >
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

      <div
        v-else
        class="  "
        style="align-items: flex-start; padding-bottom: 180px; padding-top: 40px; align-items: center; display: flex; flex-direction: column"
      >
        <div
          class="fold-content"
          style="justify-content: center; flex-direction: column"
        >
          <div style="width: 90%">
            <img
              src="../../assets/images/logo/service-dog-standards-h.png"
              style="width: 100%;"
            >
          </div>

          <div
            style="width: 90%; font-weight: 100; font-size: 16pt; line-height: 1.2"
            class="mt-4"
          >
            <!- Cloud-based voluntary training and behavioral standards and team management solutions for Service ->
            <!- Dog Trainers and Handlers ->
            Free and voluntary training and behavior standards and team management solutions for Service Dog Trainers
            and
            Handlers.
          </div>
        </div>
      </div>
    </Section>
  -->

    <!-- ROB New Hero Header -->
    <section data-v-2ee8aeaa=""  class="home-hero section-container">

      <canvas class="hero-section-bg" data-transition-in></canvas>
 <!-- <canvas id="gradient-canvas" class="hero-section-bg" data-transition-in></canvas> -->

      <div data-v-3dd2e005="" class="section-inner-container pt-0">
        <div data-v-3dd2e005="" class="hero-grid-container">
          <div data-v-3dd2e005="" class="column-1">
            <div class="hero-container">
              <div class="row">
                <img src="../../assets/images/logo/HomepageHeroHeader__black.svg" class="hero-logo hero-under hero-under-blended"/>
                <img src="../../assets/images/logo/HomepageHeroHeader__black.svg" class="hero-logo hero-under hero-under-overlay"/>
              </div>
            </div>
            <div class="row hero-text">
              <div class="hero-blurb pt-16">{{ subtitle }}</div>
              <div data-v-3dd2e005="" style="margin-top: 40px;">
                <a data-v-3dd2e005="" href="/signup" class="button_secondary v-btn v-btn--has-bg v-btn--router v-size--default">
                  <span class="v-btn__content text-white"> Start now </span>
                </a>
              </div>
            </div>
          </div>
          <div data-v-3dd2e005="" class="column-2">
            <div class="hero-app-screenshot">
              <img src="../../assets/images/content/hero-app-screenshot.png"/>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!---------------------------- fold 2 box -------------------------------------------------------------->
    <!--
    <fold2 v-if="$vuetify.breakpoint.smAndUp" :search-num.sync="search_member_num" @search-user="search_user"
      @show-advanced-search="show_advanced_search = true" />

    <fold2_mobile v-else :search-num.sync="search_member_num" @search-user="search_user"
      @show-advanced-search="show_advanced_search = true" />
  -->
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
    <!--         <v-btn class="button_primary">-->
    <!--            Join today-->
    <!--         </v-btn>-->
    <!--      </div>-->

    <!--   </div>-->
    <!--</div>-->

    <div class="section-container bg-pale" style="margin-top: 0px;">
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
          <v-btn to="/signup" class="button_primary">
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
    <!--         <v-btn class="button_primary">-->
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

        <div v-if="ismobile" style="width: 120%; overflow-x: hidden" :style="{ order: ismobile ? -1 : 0 }">
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
          <div :style="ismobile ? 'margin-top:0px; margin-bottom: 20px;' : 'margin-top:20px'">
            <v-btn class="button_primary" to="/signup">
              Get Started
            </v-btn>
          </div>

          <!--<div style="width: 100%; overflow-x: hidden" :style="{order: ismobile? -1: 0}">-->
          <!--   <img src="../../assets/images/content/SDSMaterialsForIndexPageAsset_3.png" style="width: 100%">-->
          <!--</div>-->

          <div v-if="!ismobile" style="width: 120%; overflow-x: hidden" :style="{ order: ismobile ? -1 : 0 }">
            <img src="../../assets/images/content/SDSMaterialsForIndexPageAsset_3.png" style="width: 100%">
          </div>
        </div>
      </div>
    </div>

    <!---------------------------- Section free owners ------------------------------------------------------->

    <div class="section-container angled-section" :class="class_mobile">
      <div class="section-inner-container" :class="class_mobile">
        <div class="small-header-line on-dark">
          Free for owners
        </div>

        <template v-if="class_mobile_img1 !== ''">
          <div class="mt-4 large-header-line" style="color: white" :class="class_mobile">
            Create a secure profile for your Service Dog.
          </div>

          <div class="img_full_width_container" :class="class_mobile_img1">
            <img src="../../assets/images/content/SDSSecureProfileExampleAsset_15.png" class="img_full_width"
              :class="class_mobile_img1">
          </div>
        </template>

        <v-row>
          <v-col>
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
              <v-btn class="button_primary" to="/signup">
                Join today
              </v-btn>
            </div>
          </v-col>

          <v-col v-if="class_mobile_img1 === ''" cols="12" md="7">
            <img src="../../assets/images/content/SDSSecureProfileExampleAsset_15.png"
              :style="ismobile ? 'margin-left: -50px' : 'margin-top: -200px; margin-left: -50px'" width="150%">
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
    <!--               <v-btn class="button_primary">-->
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

    <div class="section-container bg-pale" :class="class_mobile" style="margin-top: 0px; ">
      <div class="section-inner-container" :class="class_mobile" style="overflow-x: hidden; ">
        <div class="small-header-line" :class="class_mobile">
          Free for Trainers
        </div>

        <div class="mt-4 large-header-line" :class="class_mobile">
          Grow your dog training practice or organization.
        </div>

        <div style="display: flex" class="mt-4">
          <div style="margin-right: 0%" :style="{ width: ismobile ? '100%' : '50%' }">
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
            <div style="display: flex" class="mt-4" :style="{ 'flex-direction': ismobile ? 'column' : 'row' }">
              <div class="txt-box-side" :style="{ 'width': ismobile ? '100%' : '50%' }">
                <img src="../../assets/images/content/SDSInviteClientsIconAsset7.svg" height="40px">
                <div class="b1-heading">
                  Invite clients
                </div>
                Easily send email invitations to clients.
              </div>

              <div class="txt-box-side" :style="{ 'width': ismobile ? '100%' : '50%' }">
                <img src="../../assets/images/content/SDSTrackDogsandClientsIconAsset8.svg" height="40px">
                <div class="b1-heading">
                  Track dogs & clients
                </div>
                Manage service dog puppy candidates, graduates, washouts and more.
              </div>
            </div>
            <div style="display: flex" class="mt-4" :style="{ 'flex-direction': ismobile ? 'column' : 'row' }">
              <div class="txt-box-side" :style="{ 'width': ismobile ? '100%' : '50%' }">
                <img src="../../assets/images/content/SDSEducateClientsIconAsset9.svg" height="40px">
                <div class="b1-heading">
                  Educate clients
                </div>
                Easily send email invitations to clients.
              </div>

              <div class="txt-box-side" :style="{ 'width': ismobile ? '100%' : '50%' }">
                <img src="../../assets/images/content/SDSReducesStressIconAsset10.svg" height="40px">
                <div class="b1-heading">
                  Reduce Stress
                </div>
                Manage service dog puppy candidates, graduates, washouts and more.
              </div>
            </div>

            <div style="margin-top: 40px;" :style="{ 'padding-bottom': ismobile ? '0px' : '200px' }">
              <v-btn class="button_primary" to="/signup">
                Join today
              </v-btn>
            </div>
          </div>

          <!--col2-->
          <div v-if="!ismobile" style="width: 50%;  ">
            <div style="margin-left: 0px ">
              <img src="../../assets/images/content/SDSTrainerMobileScreensAsset_11.png" style="margin-top: 20px; "
                width="130%">
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
    <!--               <v-btn class="button_primary">-->
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
    <div class="section-container " style="background-color: white;" :class="class_mobile"
      :style="{ 'margin-top': ismobile ? '20px' : '-150px' }">
      <div class="section-inner-container" style="background-color: white;" :class="class_mobile">
        <div class="small-header-line" :class="class_mobile">
          News and education
        </div>
        <wp-embed />
      </div>
    </div>

    <!---------------------------- Section begin today ------------------------------------------------------->

    <div class="section-container bg-pale" :class="class_mobile">
      <div class="section-inner-container" style="overflow-x: hidden; " :class="class_mobile">
        <div class="small-header-line" :class="class_mobile">
          Begin today
        </div>

        <div class="mt-4 large-header-line" :class="class_mobile">
          Join Now. Level up as your dog progresses.
        </div>

        <div style="display: flex" class="mt-4">
          <div :style="{ 'max-width': ismobile ? '100%' : '500px' }">
            <div class="txt-box " style="max-width: 500px">
              Service Dog Standards is designed for both newer teams and those that been active for years.
            </div>
          </div>
        </div>

        <!--mini matrix-->
        <div style="display: flex" class="mt-4" :style="{ 'flex-direction': ismobile ? 'column' : 'row' }">
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
          <v-btn class="button_primary" to="/signup">
            Get started
          </v-btn>

          <div v-if="ismobile" class="b1-heading mt-2">
            Join now. It's free.
          </div>
          <span v-else class="b1-heading ml-4">
            Join now. It's free.
          </span>
        </div>
      </div>
    </div>

    <!---------------------------- Social media Section --------------------------------------------------------------------->
    <div class="section-container" style="background-color: #404042">
      <div class="section-inner-container">
        <div class="mb-3" style="color: white; font-size: 15pt; text-align: center">
          Please connect with us!
        </div>

        <div style="display: flex; justify-content: center; align-items: center; flex-wrap: wrap">
          <a href="https://www.facebook.com/servicedog" class="ma-2">
            <img src="../../assets/images/content/social/SDSFacebookCounterAsset19.svg"
              :width="ismobile ? '100px' : '120px'">
          </a>

          <a href="https://www.facebook.com/servicedog" target="_blank" class="ma-2">
            <img src="../../assets/images/content/social/SDSFacebookAsset20.svg" :width="ismobile ? '40px' : '60px'">
          </a>

          <a href="https://twitter.com/servicedog" target="_blank" class="ma-2">
            <img src="../../assets/images/content/social/SDSTwitterAsset21.svg" :width="ismobile ? '40px' : '60px'">
          </a>

          <a href="https://www.pinterest.com/servicedogstandards/" target="_blank" class="ma-2">
            <img src="../../assets/images/content/social/SDSPintrestAsset22.svg" :width="ismobile ? '40px' : '60px'">
          </a>

          <a href="https://instagram.com/servicedogstandards/" target="_blank" class="ma-2">
            <img src="../../assets/images/content/social/SDSInstragramAsset23.svg" :width="ismobile ? '40px' : '60px'">
          </a>

          <a href="https://www.youtube.com/c/ServiceDogStandards" target="_blank" class="ma-2">
            <img src="../../assets/images/content/social/SDSYouTubeAsset24.svg" :width="ismobile ? '40px' : '60px'">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import LoginModal from '@/components/app/LoginModal.vue'
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
    name: 'HomeComponent',
    components: {
      AdvancedTeamSearch,
      Section,
      NavBar,
      HomeContentBox,
      wpEmbed,
      fold2,
      fold2_mobile,
      LineAnimation2
    },
    mixins: [data_getters, validation],
    data() {
      return {
        show_mission: false,
        search_member_num: null,
        show_no_user: false,
        show_advanced_search: false,
        /* Content Variables */
        title: '',
        subtitle: 'Free and voluntary training and behavior standards and team management solutions for Service Dog Trainers and Handlers.'
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
      ismobile() {
        // return !this.$vuetify.breakpoint.mdAndUp
        return this.$vuetify.breakpoint.width < 700
      },
      class_mobile() {
        if (!this.ismobile) {
          return ''
        } else {
          return 'ismobile'
        }
      },
      class_mobile_img1() {
        let ans = ''
        if (this.$vuetify.breakpoint.width < 500) {
          ans = 'mobile_sm'
        } else if (this.$vuetify.breakpoint.width < 900) {
          ans = 'mobile_md'
        }
        return ans;
      }
    },
    created() {
      this.$store.commit("set_default_nav", false)
      this.$store.commit("set_show_side_nav", false);
      //check if advanced search should be shown
      let as = this.$route.query.advanced_search;
      if (as === 'true') {
        this.show_advanced_search = true;
      }
    },
    beforeDestroy() {
      this.$store.commit("set_default_nav", true)
    },
    methods: {
      async get_ap_data() {
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
          let dog = await this.make_request('/public/getDogProfile', {
            dog_num: this.search_member_num
          });
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
    }
  }
</script>

<!-- ROB Gradient Canvas script
<script>
  import { Gradient } from './Gradient.js'

  // Create your instance
  const gradient = new Gradient()

  // Call `initGradient` with the selector to your canvas
  gradient.initGradient('#gradient-canvas')
</script>
 END -->


<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />

<style scoped src="../common.css"></style>