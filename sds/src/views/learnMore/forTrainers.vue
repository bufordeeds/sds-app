<template>

  <div>

    <!-- Product Hero section:: -->
    <div class="section-container product-hero-section pt-1">
      <div data-v-3dd2e005="" class="section-layout">
        <div class="angled-ribbon">
          <canvas id="gradient-canvas-basic" data-js-darken-top data-transition-in>
          </canvas>
        </div>
        <div data-v-3dd2e005="" class="section-inner-container pt-15">
          <div data-v-3dd2e005="" class="row">
            <div data-v-3dd2e005="" class="col-md-7 col-12">
              <div data-v-3dd2e005="" class="small-header-line">{{ overline }}</div>
              <h1 data-v-3dd2e005="" v-html="page_title" class="mt-4 pb-8"></h1>
              <div class="flex-row" v-html="page_blurb_01" style="padding:8px 0;gap:16px"></div>
              <div class="flex-row" v-html="page_blurb_02" style="padding:8px 0;gap:16px"></div>
              <div class="flex-row" v-html="page_blurb_03" style="padding:8px 0;gap:16px"></div>
              <div v-html="page_description"></div>
            </div>
            <div data-v-3dd2e005="" class="col-md-5 col-12">
              <div style="width:100%;" class="mt-12 bg-none">
                <!--<img :src="header_image" alt="" class="bg-none card-shadowLarge" style="width:100%;height:auto;border-radius:24px">-->
                <img src="../learnMore/images/iStock-953742852.jpg" alt="" class="bg-none Card--shadowLarge"
                  style="width:100%;height:auto;border-radius:24px">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_01" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container pt-16">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-0">{{ section_01_title }}</h2>
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

    <div id="section_02" class="section-container angled-section-bottom light">
      <div data-v-3dd2e005="" class="section-inner-container">
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

    <div id="section_03" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container pt-8">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_03_title }}</h2>
              <p>{{ section_03_description }}</p>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout3">
              <div v-html="section_03_body_col1"></div>
              <div v-html="section_03_body_col2"></div>
              <div v-html="section_03_body_col3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_04" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_04_title }}</h2>
              <div v-html="section_04_body"></div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div id="section_05" class="section-container bg-dark">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row pb-16">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <h2 data-v-3dd2e005="" class="text-white pb-12">{{ section_05_title }}</h2>
            <div v-html="section_05_01_body"></div>
            <div v-html="section_05_02_body"></div>
            <div v-html="section_05_03_body"></div>
            <div v-html="section_05_card"></div>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div v-html="cta_join_today"></div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: "ForTrainers",
  data() {
    return {
      overline: 'For Professionals',
      page_title: 'Unleash the Power of Exceptional Service Dog Teams:<br/>Join Service Dog Standards',
      page_blurb_01: '<div class="dot"></div><div class="text-bold">Transform Your Practice</div>',
      page_blurb_02: '<div class="dot"></div><div class="text-bold">Empower Your Clients</div>',
      page_blurb_03: '<div class="dot"></div><div class="text-bold">Achieve Peace of Mind</div>',
      page_description: '<div class="pt-8">Service Dog Standards goes beyond training. We help backup life-changing partnerships between service dogs and their handlers. Our free platform equips you, the trainer, with the tools to elevate your practice and empower your clients to create responsible service dog teams.</div>',
      header_image: '[path to image]',

      section_01_title: 'Benefits for Trainers',
      section_01_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Attract New Clients</h4><p class="small-content">Stand out with a comprehensive trainer listing, showcasing your expertise and attracting clients seeking service dog training.</p></section>',
      section_01_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Maintain Easy Connections</h4><p class="small-content">View all your clients\' profiles and easily track their progress updates in one place.</p></section>',
      section_01_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Effortless Client Management</h4><p class="small-content">Manage graduates, washouts, and ongoing training with ease.</p></section>',

      section_02_title: "Boost Client Confidence",
      section_02_body: "<section><p>Empower your clients with clear, community-defined standards. Foster successful partnerships built on mutual understanding and trust.</p></section>",

      section_03_title: "Streamline Documentation and Showcase Progress",
      section_03_description: "Service Dog Standards offers a central hub for handlers to document their service dog's training journey. Store details like",
      section_03_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Physician Letters</h4><p class="small-content">Share the fact that you have one while also protecting your privacy.</p></section>',
      section_03_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Certification Completion</h4><p class="small-content">Track progress on certifications like the Canine Good Citizen test.</p></section>',
      section_03_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Letters of Recommendation</h4><p class="small-content">Securely include optional letters of recommendation with privacy controls.</p></section>',
      
      section_04_title: "Reduce Stress, Focus on Results",
      section_04_body: "By centralizing clear documentation, handlers can easily demonstrate their commitment to responsible ownership and their dog's qualifications. This frees you, the trainer, to focus on what truly matters – building a strong and reliable service dog team.",

      /* Bottom section Dark gradient:: */
      section_05_title: "Benefits for Clients",
      section_05_01_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">Responsible service dog ownership: Handlers who understand and accept their responsibilities make things safer for everyone.</p></div></section>',
      section_05_02_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">Simplify Documentation: Showcase your dedication by easily documenting training details and achievements. Maintain privacy while demonstrating responsible service dog ownership.</p></section>',
      section_05_03_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">Gain Confidence in Public Spaces: Feel empowered knowing you have the resources to navigate public spaces with your service dog with confidence.</p><div class="dot full-width mt-8"></div></section>',
      section_05_card: '<h3 class="mt-16 text-white">Join Service Dog Standards today and unlock a world of possibilities for both you and your clients.</h3>',
      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
    };
  }
};
</script>

<style scoped src="../common.css"></style>
