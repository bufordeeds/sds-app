<!-- Layout template:: -->
<template>

  <!-- START Page wrapper:: -->
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
              <div data-v-3dd2e005="">{{ page_description }}</div>
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

    <!-- 1-column layout:: -->
    <div class="section-container pt-16">
      <div data-v-3dd2e005="" class="section-inner-container pt-0">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_01_title }}</h2>
              <div v-html="section_01_body"></div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <!-- 2-column layout BG Pale:: -->
    <div class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_02_title }}</h2>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout2">
              <div v-html="section_02_body_col1"></div>
              <div v-html="section_02_body_col2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3-column layout BG Pale:: -->
    <div class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_03_title }}</h2>
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

    <!-- 1-column layout Bottom Angle BG Light:: -->
    <div class="section-container angled-section-bottom light">
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

    <!-- 1-column layout Bottom section BG Dark:: -->
    <div class="section-container bg-dark">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row pb-16">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <h2 data-v-3dd2e005="" class="text-white pb-12">{{ section_05_title }}</h2>
            <div v-html="section_05_body"></div>
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
  name: "WhatShouldServiceDogActLike",
  data() {
    return {
      overline: 'overline',
      page_title: 'Title',
      page_description: 'Description.',
      header_image: '[path to image]',

      section_01_title: 'Section title',
      section_01_body: "<p>Body content.</p>",

      section_02_title: "Section title",
      section_02_body_col1: "<section><p>Body content.</p></section>",
      section_02_body_col2: "<section><p>Body content.</p></section>",

      section_03_title: "Section title",
      section_03_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Title</h4><p class="small-content">Body</p></section>',
      section_03_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Title</h4><p class="small-content">Body</p></section>',
      section_03_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Title</h4><p class="small-content">Body</p></section>',

      section_04_body_col1: "<section><p>Body content.</p></section>",
      section_04_body_col2: "<section><p>Body content.</p></section>",
      section_04_body_col3: "<section><p>Body content.</p></section>",

      /* Bottom section Dark gradient:: */
      section_05_title: "Title",
      section_05_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">Body content.</p><div class="dot full-width mt-8"></div></section>',

      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
    };
  }
};
</script>

<style scoped src="../common.css"></style>