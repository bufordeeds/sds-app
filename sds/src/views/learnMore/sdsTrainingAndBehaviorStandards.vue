<template>

  <div>

    <div class="section-container pt-1">
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
              <div v-html="page_sub_title"></div>
              <div data-v-3dd2e005="">{{ page_description }}</div>
            </div>
            <div data-v-3dd2e005="" class="col-md-6 col-12">
              <div style="width:100%;" class="mt-12 bg-none">
                <!--<img :src="header_image" alt="" class="bg-none Card--shadowLarge" style="width:100%;height:auto;border-radius:24px">-->
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
              <h2 data-v-3dd2e005="" class="pb-0">{{ section_01_title }}</h2>
            </section>
          </div>
        </div>
        <!-- 3-column layout:: -->
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
      <div data-v-3dd2e005="" class="section-inner-container pt-0">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_03_title }}</h2>
              <div v-html="section_03_body"></div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div id="section_04" class="section-container bg-dark">
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
    name: "BehaviorStandards",
    data() {
      return {
        overline: 'About us',
        page_title: 'Service Dog Standards Training & Behavior Standards',
        page_sub_title: '<b>Service Dog Standards:</b> Empowering Teams and Promoting Inclusion',
        page_description: 'Service Dog Standards is a community-driven organization founded by trainers and handlers who share a passion for excellence. We go beyond legal requirements by establishing high standards for service dog training and behavior.',
        header_image: '../learnMore/images/iStock-953742852.jpg',
        section_01_title: 'Our mission is to empower handlers and their canine partners through:',
        section_01_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">A Powerful Identification and Information Hub</h4><p class="small-content">We provide a central resource for service dog handlers, regardless of their certification or training methods. Our website offers clear information and educational materials to navigate the complexities of service dog partnerships.</p></section>',
        section_01_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Clearly Defined Standards</h4><p class="small-content">We outline training and behavior expectations for both handlers and their service dogs. By voluntarily adhering to these standards, handlers demonstrate their commitment to a level of professionalism that exceeds legal mandates.</p></section>',
        section_01_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">A Step-by-Step Guide</h4><p class="small-content">We break down the service dog journey into manageable steps, offering clarity and direction throughout the process.</p></section>',
        section_02_title: 'More Than Just Legal Requirements',
        section_02_body: "<section><p>The law defines a service dog as one that is specifically trained to perform tasks that directly mitigate a disability. Emotional support or natural behaviors a dog may exhibit, while helpful, don't qualify as service dog tasks. Service Dog Standards aims to raise the bar by promoting a clear distinction between emotional support animals and highly trained service dogs.</p></section",
        section_03_title: 'A Comprehensive Resource for Service Dog Teams',
        section_03_body: "<section><p>This website is designed to be a valuable tool for both aspiring and experienced service dog handlers. We not only outline expectations and requirements, but also address commonly encountered challenges and solutions.</p></section",
        section_04_title: 'Our Commitment',
        section_04_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">Service Dog Standards offers downloadable resources, including a Service Dog Standards Training and Behavior Agreement and a Public Access Test. These tools can be instrumental in ensuring a successful and compliant service dog partnership.</p><div class="dot full-width mt-8"></div></section>',
        cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
      };
    }
  };
</script>

<style scoped src="../common.css"></style>