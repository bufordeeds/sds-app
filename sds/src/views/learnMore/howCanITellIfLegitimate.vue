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
            <div data-v-3dd2e005="" class="col-md-6 col-12">
              <div data-v-3dd2e005="" class="small-header-line">{{ overline }}</div>
              <h1 data-v-3dd2e005="" class="mt-4 pb-8">{{ page_title }}</h1>
              <div v-html="page_description"></div>
            </div>
            <div data-v-3dd2e005="" class="col-md-6 col-12">
              <div style="width:100%;" class="mt-12 bg-none">
                <!--<img :src="header_image" alt="" class="bg-none card-shadowLarge" style="width:100%;height:auto;border-radius:24px">-->
                <img src="../learnMore/images/iStock-953742852.jpg" alt="" class="bg-none card--shadowLarge"
                  style="width:100%;height:auto;border-radius:24px">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_01" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="">{{ section_01_title }}</h2>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <div v-html="section_01_body_01" class="pb-4"></div>
            <div v-html="section_01_body_02" class="pb-4"></div>
            <div v-html="section_01_body_03" class="pb-4"></div>
            <div v-html="section_01_body_04" class="pb-4"></div>
            <div v-html="section_01_body_05"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_03" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container pb-16">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_03_subtitle }}</h3>
              <div v-html="section_03_body"></div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div id="section_04" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container pt-0">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_04_subtitle }}</h3>
              <div v-html="section_04_body_01"></div>
              <div v-html="section_04_body_02"></div>
              <div v-html="section_04_body_03"></div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div id="section_05" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_05_title }}</h2>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_05_subtitle }}</h3>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout3">
              <div v-html="section_05_body_col1"></div>
              <div v-html="section_05_body_col2"></div>
              <div v-html="section_05_body_col3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_06" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_06_title }}</h2>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_06_subtitle }}</h3>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout3">
              <div v-html="section_06_body_col1"></div>
              <div v-html="section_06_body_col2"></div>
              <div v-html="section_06_body_col3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_07" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_07_title }}</h2>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_07_subtitle }}</h3>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout3">
              <div v-html="section_07_body_col1"></div>
              <div v-html="section_07_body_col2"></div>
              <div v-html="section_07_body_col3"></div>
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
            <h2 data-v-3dd2e005="" class="text-white pb-12">{{ section_08_title }}</h2>
            <div v-html="section_08_body"></div>
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
export default {
  name: "HowCanITellIfLegitimate",
  data() {
    return {
      overline: 'For the Public',
      page_title: 'The challenge of testing service dogs',
      page_blurb: 'Should service dogs and their handlers be tested?',
      page_description: "<p>While standardized testing and certification for service dogs might seem like a straightforward path to ensuring legitimacy, the issue is far more nuanced. This topic has been meticulously examined by the Department of Justice, service dog organizations, disability advocates, experienced handlers, trainers, and a vast array of stakeholders.</p>",
      header_image: '[path to image]',

      section_01_title: 'Summary',
      section_01_body_01: '<section class="txt-box-side"><h4 class="copy-title pb-3">Testing service dogs</h4><p class="small-content">While the concept of testing is well-intentioned, it can be problematic.</p></section>',
      section_01_body_02: '<section class="txt-box-side"><h4 class="copy-title pb-3">A single test wouldn\'t work</h4><p class="small-content">Service dog tasks vary widely.</p></section>',
      section_01_body_03: '<section class="txt-box-side"><h4 class="copy-title pb-3">Disabilities themselves create challenges</h4><p class="small-content">An individual\’s disability itself could make completing a test challenging.</p></section>',
      section_01_body_04: '<section class="txt-box-side"><h4 class="copy-title pb-3">Testing can create burdens</h4><ul><li>Handlers would face constant questioning and ID checks.</li><li>Financial strain for disabled people.</li><li>Could invalidate well-trained dogs.</li><li>May be difficult for some disabilities.</li></ul></section>',
      section_01_body_05: '<section class="txt-box-side"><h4 class="copy-title pb-3">Paperwork over function</h4><p class="small-content">Focus should be on the dog\'s skills and teamwork, not paperwork or tests.</p></section>',

      section_03_subtitle: "The Core Principle of the ADA: Unwavering Commitment to Equal Access",
      section_03_body: "<p>The Americans with Disabilities Act (ADA) stands firm on the principle of ensuring equal access for individuals with disabilities. Extensive collaboration during the ADA's revision ensured this critical objective was achieved within the legislation.</p>",

      section_04_subtitle: "Challenges of Standardized Identification: Beyond Appearance",
      section_04_body_01: "<p>Standardized rules and mandatory identification (vests, patches, etc.) could create a system of constant scrutiny. Handlers might face frequent questioning by police and the public, requiring them to present proof of training, microchipping, and various forms of ID. This creates unnecessary stress and hinders their daily lives.</p>",
      section_04_body_02: "<p>Furthermore, a focus on appearance over function could emerge. A dog with a perfectly compliant vest but lacking proper training might gain access, while a highly-skilled dog without an ID could be denied entry. This prioritizes aesthetics over functionality, undermining the true purpose of service animals.</p>",
      section_04_body_03: "<p>Additionally, handlers with invisible disabilities or those who prefer discretion might be uncomfortable constantly displaying identifying information.</p>",

      section_05_title: "Accessibility Concerns: Beyond Reach for Many",
      section_05_subtitle: "Standardized testing presents another hurdle for disabled handlers in terms of accessibility",
      section_05_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Financial Strain</h4><p class="small-content">Many handlers have limited income and might struggle to afford testing fees, especially considering many highly skilled trainers lack formal certifications. This could force them to choose between affording proper care for themselves or obtaining "certification" for their service dog.</p></section>',
      section_05_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Rural Challenges</h4><p class="small-content">Those living in rural areas may face significant difficulty reaching testing centers. Traveling long distances can be a physical barrier for some disabilities.</p></section>',
      section_05_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Uncertain Cost Distribution</h4><p class="small-content">The additional burden of travel and testing costs could fall on taxpayers, creating a new financial strain on the system.</p></section>',

      section_06_title: 'There is no "One-Size-Fits-All" Test for Service Dogs',
      section_06_subtitle: "Experienced service dog professionals agree that a single, standardized test wouldn't be effective",
      section_06_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Individualized Needs</h4><p class="small-content">The specific tasks a dog performs will vary depending on the handler\'s unique disability.</p></section>',
      section_06_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Public Access Test (PAT) Clarification</h4><p class="small-content">The PAT, a common assessment tool, is not designed to certify animals.</p></section>',
      section_06_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Trainers or organizations who “certify”</h4><p class="small-content">While some trainers might offer "certification" to graduates, this status holds no legal weight and may not even be recognized by other trainers or organizations.</p></section>',

      section_07_title: 'The True Burdens: Financial Strain, Discrimination, and Unforeseen Challenges',
      section_07_subtitle: "The concept of standardized testing and certification, while seemingly focused on legitimacy, creates a complex web of burdens for disabled handlers.",
      section_07_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Financial Strain and Accessibility Barriers</h4><p class="small-content">Testing fees and travel expenses can impose significant costs, especially for those with limited income or facing physical limitations. Additionally, the financial burden on the system as a whole is a concern.</p></section>',
      section_07_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Discriminating Against Existing Teams</h4><p class="small-content">Many disabled people have successfully trained their own service dogs without formal certifications. Standardized testing could invalidate these well-functioning teams, leaving some handlers without their vital companions.</p></section>',
      section_07_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Unforeseen Challenges for Handlers</h4><p class="small-content">A handler\'s disability itself may make it difficult to perform well on a standardized test, creating an additional hurdle. Furthermore, many handlers face challenges advocating for themselves due to conditions associated with their disability.</p></section>',

      /* Bottom section Dark gradient:: */
      section_08_title: "The ADA Protects Access: Ensuring Independence for All",
      section_08_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">The ADA prioritizes equal access for people with disabilities because service dogs are often a vital tool for independence. Creating these new burdens could severely limit access for those who rely on service animals. The current system allows many to find the independence they deserve. A focus on a dog\'s ability to perform tasks and a handler\'s demonstrated teamwork, rather than paperwork and standardized tests, is crucial for ensuring continued access and independence for all.</p><div class="dot full-width mt-8"></div></section>',

      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
    };
  }
};
</script>

<style scoped src="../common.css"></style>
