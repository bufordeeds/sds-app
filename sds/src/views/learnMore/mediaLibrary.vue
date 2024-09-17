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
    <div id="section_01" class="section-container pt-16">
      <div data-v-3dd2e005="" class="section-inner-container pt-0">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_01_title }}</h2>
              <div v-html="section_01_body"></div>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row pt-8 pb-16">
          <div data-v-3dd2e005="" class="col-12">
            <div v-html="section_01_body_01" class="text-bold"></div>
            <div data-v-3dd2e005="" class="column-layout2">
              <div v-html="section_01_body_01_col1" class="fpo --fpo-ad_250"></div>
              <div v-html="section_01_body_01_col2" class="fpo --fpo-ad_250"></div>
            </div>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row pt-16">
          <div data-v-3dd2e005="" class="col-12">
            <div v-html="section_01_body_02" class="text-bold"></div>
            <div data-v-3dd2e005="" class="column-layout2">
              <div v-html="section_01_body_02_col3" class="fpo --fpo-ad_300"></div>
              <div v-html="section_01_body_02_col4" class="fpo --fpo-ad_300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_02" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_02_title }}</h2>
              <div v-html="section_02_body_01" class="text-bold"></div>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12 pt-8 pb-16">
            <div v-html="section_02_body_02" class="text-bold"></div>
            <section class="fpo_wrapper">
              <div class="fpo-container"><div v-html="section_02_body_img_01" class="--fpo-badge_495"></div></div>
              <div class="fpo-container"><div v-html="section_02_body_img_02" class="--fpo-badge_495"></div></div>
              <div class="fpo-container"><div v-html="section_02_body_img_03" class="--fpo-badge_495"></div></div>
              <div class="fpo-container"><div v-html="section_02_body_img_04" class="--fpo-badge_495"></div></div>
            </section>
          </div>
        </div>
      </div>
    </div>

  </div> <!-- END Content wrapper -->

</template>

<script>
export default {
  name: "MediaLibrary",
  data() {
    return {
      overline: 'About us',
      page_title: 'Media Library',
      page_description: 'Together, we can help educate Service Dog handlers about their obligations and responsibilities. You are welcome to place these images on your blog or website.',
      header_image: '[path to image]',

      section_01_title: 'Advertisements',
      section_01_body: "<p>Please do not modify or alter these ads in any way. Ads should point to <a href='https://servicedogstandards.org'>https://servicedogstandards.org</a></p>",
      section_01_body_01: '<p><b>250px x 250px</b></p>',
      section_01_body_01_col1: "",
      section_01_body_01_col2: "",
      section_01_body_02: '<p><b>300px x 100px</b></p>',
      section_01_body_02_col3: "",
      section_01_body_02_col4: "",


      section_02_title: "Service Dog Standards Supporter Badges",
      section_02_body_01: '<p>The Service Dog Standards Supporter logo requires an "exclusion zone” — or in layman’s terms, a margin where no other type or images may appear, as illustrated below. Please do not modify or alter these logos in any way. Logos should point to <a href="https://servicedogstandards.org">https://servicedogstandards.org</a></p>',
      section_02_body_02: '<p><b>495px x 90px</b></p>',
      section_02_body_img_01: "",
      section_02_body_img_02: "",
      section_02_body_img_03: "",
      section_02_body_img_04: "",

    };
  }
};
</script>

<style scoped src="../common.css"></style>
<style scoped>
  .fpo_wrapper {
    display: inline-flex;
    flex-direction: column;
    gap: 48px;

  }
  div.fpo {
    background-color: var(--neutral-200);
  }
  div.fpo.--fpo-ad_250 {
    width: 250px;
    height: 250px;
  }
  div.fpo.--fpo-ad_300 {
    width: 300px;
    height: 100px;
  }
  div.fpo-container {
    padding: 24px 24px 48px;
    background-color: #fff;
  }
  div.fpo-container .--fpo-badge_495 {
    width: 495px;
    height: 90px;
    background-color: var(--neutral-200);
  }

</style>

