<template>

  <div>

    <!-- Product Hero section:: -->
    <div class="section-container product-hero-section pt-1">
      <div data-v-3dd2e005="" class="section-layout">
        <div class="angled-ribbon">
          <canvas id="gradient-canvas-sds3" data-js-darken-top data-transition-in>
          </canvas>
        </div>
        <div data-v-3dd2e005="" class="section-inner-container pt-15">
          <div data-v-3dd2e005="" class="row">
            <div data-v-3dd2e005="" class="col-md-6 col-12">
              <div data-v-3dd2e005="" class="small-header-line">{{ overline }}</div>
              <h1 data-v-3dd2e005="" class="mt-4 pb-8">{{ page_title }}</h1>
              <div data-v-3dd2e005="">{{ page_description }}</div>
              <div v-html="page_list"></div>
            </div>
            <div data-v-3dd2e005="" class="col-md-6 col-12">
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

    <!-- 2-column layout BG Pale:: -->
    <div class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container pt-16">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_01_title }}</h2>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout2">
              <div data-v-3dd2e005="" v-html="section_01_body_col1"></div>
              <div data-v-3dd2e005="" v-html="section_01_body_col2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3-column layout BG Pale:: -->
    <div class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_02_title }}</h2>
              <h3>{{ section_02_01_subtitle }}</h3>
              <div v-html="section_02_01_body"></div>
            </section>
            <section>
              <h3>{{ section_02_02_subtitle }}</h3>
              <div v-html="section_02_02_body"></div>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout3 mb-16">
              <div v-html="section_02_02_body_col1"></div>
              <div v-html="section_02_02_body_col2"></div>
              <div v-html="section_02_02_body_col3"></div>
              <div v-html="section_02_02_body_col4"></div>
              <div v-html="section_02_02_body_col5"></div>
            </div>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section class="pt-0">
              <h3>{{ section_02_03_subtitle }}</h3>
              <div v-html="section_02_03_body"></div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_03_title }}</h2>
              <div v-html="section_03_01_body"></div>
              <div v-html="section_03_02_body"></div>
            </section>
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
export default {
  name: "WhatIsAServiceAnimial",
  data() {
    return {
      overline: 'About Us',
      page_title: 'What is a service dog?',
      page_description: 'The ADA defines a service animal as any dog that is individually trained to perform tasks that directly benefit a person with a disability.',
      page_list: '<ul><li>Service dogs are not pets and should never be referred to as such. They are working animals that are classified as medical equipment</li><li>Service Dogs are trained to perform tasks that help mitigate a disability.</li><li>Service dogs can go most places with their handlers (restaurants, stores, workplaces).</li><li>Emotional support animals are NOT service dogs.</li></ul>',
      header_image: '[path to image]',

      section_01_body_col1: "<section><h3>How is a service dog defined?</h3><p>The Americans with Disabilities Act (ADA) defines a service animal as any dog that is individually trained to perform tasks that directly benefit a person with a disability. This encompasses a wide range of disabilities, including physical, sensory, developmental, psychiatric, intellectual, and others.</p></section>",
      section_01_body_col2: "<section><h3>Service animals are more than just pets</h3><p>They are highly trained partners that empower individuals with disabilities to navigate daily life with greater independence and confidence. Service dogs are meticulously trained to mitigate challenges directly related to their handler's disability. These tasks directly assist the handler's limitations, and go beyond what a well-trained pet can offer.</p></section>",

      section_02_title: "Key Characteristics of a Service Animal",
      section_02_01_subtitle: "Individualized Training",
      section_02_01_body: "<p>Each service dog undergoes specialized training tailored to the specific needs of its handler</p>",
      section_02_02_subtitle: "Task-Oriented",
      section_02_02_body: "<p>Service dogs perform specific tasks that directly address the limitations caused by the handler's disability. Examples include:</p>",
      section_02_02_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Vision</h4><p class="small-content">Guiding individuals who are blind or visually impaired, retrieving dropped items.</p></section>',
      section_02_02_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Hearing</h4><p class="small-content">Alerting individuals who are deaf or hard of hearing to sounds like alarms or approaching people.</p></section>',
      section_02_02_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Mobility</h4><p class="small-content">Pulling wheelchairs, providing balance and stability.</p></section>',
      section_02_02_body_col4: '<section class="txt-box-side"><h4 class="copy-title pb-3">Medical</h4><p class="small-content">Alerting individuals to seizures or changes in blood sugar levels, retrieving medication.</p></section>',
      section_02_02_body_col5: '<section class="txt-box-side"><h4 class="copy-title pb-3">Psychiatric</h4><p class="small-content">Providing physical support or interrupting self-harming behaviors.</p></section>',
      section_02_03_subtitle: "Public Access Rights",
      section_02_03_body: "<p>Under the ADA, service animals are legally permitted to accompany their handlers in most public spaces, including restaurants, stores, and workplaces.</p>",

      section_03_title: 'Not All Animals Qualify as Service Animals',
      section_03_01_body: "<h3>Emotional support animals (ESAs)</h3><p>While ESAs can provide companionship and emotional support, they are not considered service animals under the ADA and do not have the same public access rights</p>",
      section_03_02_body: "<h3>Other Species</h3><p>Miniature horses are the only other animal recognized by the ADA as a service animal, although our focus here remains on canine partners</p>",

      /* Bottom section Dark gradient:: */
      section_04_title: "Service Dog Standards: Supporting the Community",
      section_04_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">At Service Dog Standards, we are dedicated to advocating for and supporting the service dog community. We provide a wealth of resources and educational materials to promote responsible ownership, high training standards, and public awareness. We believe in fostering a more inclusive world where service dogs can empower individuals with disabilities to live their lives to the fullest.</p><div class="dot full-width mt-8"></div></section>',
      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
    };
  }
};
</script>

<style scoped src="../common.css"></style>
