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
              <div v-html="section_01_description"></div>
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
              <div v-html="section_02_description"></div>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout3">
              <div v-html="section_02_body_col1"></div>
              <div v-html="section_02_body_col2"></div>
              <div v-html="section_02_body_col3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_03" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container pt-4">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-4">{{ section_03_title }}</h2>
              <div v-html="section_03_body"></div>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <div v-html="section_03_body_01" class="pb-4"></div>
            <div v-html="section_03_body_02" class="pb-4"></div>
            <div v-html="section_03_body_03" class="pb-4"></div>
            <div v-html="section_03_body_04" class="pb-4"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_04" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-4">{{ section_04_title }}</h2>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout3">
              <div v-html="section_04_body_col1"></div>
              <div v-html="section_04_body_col2"></div>
              <div v-html="section_04_body_col3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_05" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-16">{{ section_05_title }}</h2>
              <div v-html="section_05_body"></div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div id="section_06" class="section-container bg-dark">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row pb-16">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <h2 data-v-3dd2e005="" class="text-white mt-4 pb-16">{{ section_06_title }}</h2>
            <div v-html="section_06_body"></div>
            <div v-html="section_06_blurb"></div>
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
  name: "ForColleges",
  data() {
    return {
      overline: 'For Professionals',
      page_title: 'Building a Safe and Inclusive Campus for Students with Service Dogs:<br/>A Collaborative Approach to Success',
      page_description: 'Colleges and universities strive to create a safe and inclusive learning environment for every student. This includes students who rely on service dogs to manage their disabilities. However, ensuring service dog safety, good behavior, and handler knowledge can be a concern.',
      header_image: '[path to image]',

      section_01_title: "Service Dog Standards: A Win-Win for Schools and Students",
      section_01_description: '<div class="pt-8">Here\'s how Service Dog Standards can be a valuable tool for schools, colleges and universities, and students with service dogs:</p></section>',
      section_01_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Safety First</h4><p class="small-content">Colleges understandably prioritize student safety. Service Dog Standards promotes responsible service dog ownership by educating our members on proper behavior in public settings like classrooms, dorms, and common areas.</p></section>',
      section_01_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Beyond Documentation</h4><p class="small-content">While doctor\'s letters and training certificates can be helpful, they don\'t speak to a handler\'s understanding of service dog etiquette and responsibilities. Service Dog Standards fills this gap.</p></section>',
      section_01_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Empowering Students, Ensuring Success</h4><p class="small-content">Our platform equips students with clear, comprehensive information about their rights and responsibilities, fostering responsible and confident handlers. This translates to well-behaved dogs and a safer, more positive campus experience for all.</p></section>',

      section_02_title: "A Commitment to Excellence for Our Members",
      section_02_description: '<div class="pt-8">Service Dog Standards is dedicated to fostering a community of responsible service dog handlers. Our system helps ensure that our members actively participate in maintaining responsible ownership, contributing to a safe and inclusive campus environment for everyone.</p></section>',


      section_03_title: "Benefits for Our Members (Students with Service Dogs)",
      section_03_body_01: '<section class="txt-box-side"><h4 class="copy-title pb-3">Confidence and Knowledge</h4><p class="small-content">Gaining a clear understanding of the role of a service dog handler empowers students to navigate life confidently, both on and off campus.</p></section>',
      section_03_body_02: '<section class="txt-box-side"><h4 class="copy-title pb-3">Streamlined Documentation</h4><p class="small-content">Service Dog Standards can be included as part of a service dog\'s background information or training resume, showcasing a handler’s commitment to responsible ownership.</p></section>',
      section_03_body_03: '<section class="txt-box-side"><h4 class="copy-title pb-3">Maintaining Responsible Ownership</h4><p class="small-content">Enrollment in Service Dog Standards is valid for four years. Regular renewal (with free reminders) ensures our members stay up-to-date on best practices and demonstrate continuous commitment to responsible ownership. Non-compliance or behavioral issues may result in revoked enrollment.</p></section>',
      section_03_body_04: '<section class="txt-box-side"><h4 class="copy-title pb-3">Positive Campus Culture</h4><p class="small-content">Educated handlers contribute to a more inclusive and welcoming environment for everyone.</p></section>',

      section_04_title: "Benefits for Schools, Colleges and Universities",
      section_04_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Reduced Disruptions</h4><p class="small-content">Educated handlers are less likely to encounter issues in public spaces, minimizing disruptions and promoting a safe learning environment.</p></section>',
      section_04_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Increased Confidence in Service Dogs</h4><p class="small-content">By encouraging students to utilize Service Dog Standards, you can foster greater trust and understanding of service dogs within the campus community.</p></section>',
      section_04_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Focus on Your Mission</h4><p class="small-content">By promoting responsible service dog ownership, you can minimize administrative burdens and free up resources for your core educational goals.</p></section>',
      
      section_05_title: "Recommendation for Our Members (Students with Service Dogs)",
      section_05_body: "If you're a student with a service dog who meets our training and behavior standards, including Service Dog Standards as part of your canine partner's background information or training resume can be very helpful. Enrollment demonstrates your commitment to responsible ownership and needs to be renewed every four years to maintain its validity.",

      /* Bottom section Dark gradient:: */
      section_06_title: "Recommendation for Schools, Colleges and Universities",
      section_06_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">Emphasize to students with service dogs the benefits of Service Dog Standards. This empowers students to be responsible handlers and contributes to a safer, more inclusive campus environment for everyone.</p></div><div class="dot full-width mt-8"></div></section>',
      section_06_blurb: '<h4 class="mt-16 text-white">Together, we can build a vibrant learning environment where all students can thrive. Learn more about Service Dog Standards and how it can benefit your institution.</h4>',
      
      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
    };
  }
};
</script>

<style scoped src="../common.css"></style>
