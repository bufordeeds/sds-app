<template>

  <!-- START Page wrapper:: -->
  <div>

    <!-- Product Hero section:: -->
    <div class="section-container product-hero-section pt-1">
      <div data-v-3dd2e005="" class="section-layout">
        <div class="angled-ribbon">
          <canvas id="gradient-canvas-sds1" data-js-darken-top data-transition-in>
          </canvas>
        </div>
        <div data-v-3dd2e005="" class="section-inner-container pt-15">
          <div data-v-3dd2e005="" class="row">
            <div data-v-3dd2e005="" class="col-md-6 col-12">
              <div data-v-3dd2e005="" class="small-header-line">{{ overline }}</div>
              <h1 data-v-3dd2e005="" class="mt-4 pb-8">{{ page_title }}</h1>
              <div data-v-3dd2e005="">{{ page_description }}</div>
            </div>
            <div data-v-3dd2e005="" class="col-md-6 col-12">
              <div style="width:100%;" class="mt-12 bg-none">
                <!-- <img :src="header_image" alt=""> -->
                 <img src="../learnMore/images/iStock-953742852.jpg" alt="" class="bg-none card--shadowLarge"
                  style="width:100%;height:auto;border-radius:24px">
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container pt-16">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="">{{ section_01_title }}</h2>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout3">
              <div v-html="section_01_body_col1"></div>
              <div v-html="section_01_body_col2"></div>
              <div v-html="section_01_body_col3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 1-column layout Bottom Angle BG Light:: -->
    <div class="section-container angled-section-bottom light pb-16">
      <div data-v-3dd2e005="" class="section-inner-container mb-16">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_02_title }}</h2>
              <div v-html="section_02_body"></div>
            </section>
          </div>
        </div>
      </div>
    </div>


    <!-- 3-column layout BG Pale:: -->
    <div class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container pt-4">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="">{{ section_03_title }}</h2>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout2">
              <section>
                <div v-html="section_03_body_col1" class="pb-4"></div>
                <div v-html="section_03_body_col2" class="pb-4"></div>
                <div v-html="section_03_body_col3"></div>
              </section>
              <section>
                <div class="content-card-large">
                  <h2 class="copy-title" style="font-weight:300">Together, we can create a more welcoming environment for service dog teams everywhere.</h2>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 1-column layout Bottom section BG Dark:: -->
    <div class="section-container bg-dark">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row pb-16">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <h2 data-v-3dd2e005="" class="text-white pb-12">{{ section_04_title }}</h2>
            <div v-html="section_04_body"></div>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div v-html="cta_join_today"></div>
          </div>
        </div>
      </div>
    </div>

  </div> <!-- END Content wrapper -->

</template>

<script>
  import shareSection from "@/views/learnMore/shareSection2";

  export default {
    name: "OurMission",
    components: {
      shareSection
    },
    data() {
      return {
        overline: 'About Us',
        page_title: 'Service Dog Standards: Empowering Responsible Teams',
        page_description: "We are a community built by trainers and owners, dedicated to elevating service dog standards. We offer a free, voluntary program that recognizes teams committed to responsible training and public access, exceeding the ADA's minimum requirements.",
        header_image: 'iStock-953742852.jpg',
        
        section_01_title: 'What We Do',
        section_01_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-4">Simplify Your Journey:</h4><p>We provide clear training and behavior standards to help educate handlers about the responsibilities of partnering with a service dog.</p></section>',
        section_01_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-4">Safer for All:</h4><p>We advocate for high training standards and well-behaved service dogs.</p></section>',
        section_01_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-4">Champion Inclusion:</h4><p>We fight for disability rights and educate the public about service dogs.</p></section>',
        
        section_02_title: "Why Join?",
        section_02_body: "<section><p>Enrolling with Service Dog Standards is a powerful way for teams to publicly accept training and behavior standards that promote responsible behavior. We provide a voluntary form of self-identification for those who qualify under the ADA to use a service dog.</p></section>",
        
        section_03_title: "Join us if you're ready to",
        section_03_body_col1: '<section class="txt-box-side"><p>Train your dog to the highest standards set by the service dog community.</p></section>',
        section_03_body_col2: '<section class="txt-box-side"><p>Promote responsible service dog use and minimize discrimination.</p></section>',
        section_03_body_col3: '<section class="txt-box-side"><p>Educate the public about service dogs, especially those used for invisible disabilities.</p></section>',

        /* Bottom section Dark gradient:: */
        section_04_title: "Additional Notes",
        section_04_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">We are not a certification body, and certification is not legally required.</p><div class="dot full-width mt-8 mb-8"></div><p class="text-secondary">Membership does not guarantee public access rights, which are determined by the ADA.</p><div class="dot full-width mt-8 mb-8"></div><p class="text-secondary">Unsure about your service dog qualifications? We recommend consulting a local service dog trainer.</p><div class="dot full-width mt-8"></div></section>',
        cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default"><span class="standard-button-label text-dark">Join today</span></a>'
      }
    },
    computed: { /* This is not working!!! :( */
      imageSrc() {
        return 'images/${this.header_image}';
      }
    }
  }
</script>

<style scoped src="../common.css"></style>

