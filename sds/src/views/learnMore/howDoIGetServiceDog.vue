<template>

  <div>

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
              <h3 data-v-3dd2e005="" class="pb-8">{{ page_description }}</h3>
              <div data-v-3dd2e005="" class="text-box">{{ page_body }}</div>
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

    <div id="section_01" class="section-container pt-16">
      <div data-v-3dd2e005="" class="section-inner-container pt-0">
        <div data-v-3dd2e005="" class="row pb-8">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_01_title }}</h2>
              <p>{{ section_01_body }}</p>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
              <h3 data-v-3dd2e005="">{{ section_01_subtitle_01 }}</h3>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout3">
              <div v-html="section_01_body_01_col1"></div>
              <div v-html="section_01_body_01_col2"></div>
              <div v-html="section_01_body_01_col3"></div>
            </div>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12 pt-16">
              <h3 data-v-3dd2e005="">{{ section_01_subtitle_02 }}</h3>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout3">
              <div v-html="section_01_body_02_col1"></div>
              <div v-html="section_01_body_02_col2"></div>
              <div v-html="section_01_body_02_col3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_02" class="section-container bg-dark">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row pb-16">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <h2 data-v-3dd2e005="" class="text-white pb-12">{{ section_02_title}}</h2>
            <div v-html="section_02_body"></div>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <a data-v-3dd2e005="" href="/signup"
              class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default"
              style="padding:0 16px">
              <span class="standard-button-label text-dark">Join today</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  
  </div> <!-- END Content wrapper -->
  
  </template>

<script>
export default {
  name: "HowDoIGetServiceDog",
  data() {
    return {
      
      overline: 'About us',
      page_title: 'How Do I Get a Service Dog?',
      page_description: 'Empowering Independence: Your Guide to Obtaining a Service Dog',
      page_body: 'Owning a service dog can be life-changing for individuals with disabilities. These specially trained canine partners provide invaluable assistance, fostering greater independence and confidence in daily life. The good news is that you have options! You can choose to train your own dog to become a service animal, or partner with a professional program that provides fully trained service dogs. This guide will equip you with the knowledge to make informed decisions, exploring the pros and cons of both approaches, and ensuring a successful journey towards a fulfilling partnership with a service dog.',
      header_image: '[path to image]',

      section_01_title: 'Considering Self-Training vs. Professional Programs',
      section_01_body: "The path to acquiring a service dog hinges on your individual circumstances and experience. Here's a breakdown of the two main options:",
      section_01_subtitle_01: "Self-Training",
      section_01_body_01_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">The Choice</h4><p class="small-content">You can train your own dog to become a service animal, provided it possesses the temperament and aptitude for the required tasks.</p></section>',
      section_01_body_01_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Benefits</h4><ul class="small-content"><li><b>Stronger Bond: </b>Training your dog fosters a unique and powerful connection between you and your service partner.</li><li><b>Tailored Tasks: </b>You can customize the training program to address your specific needs and disability.</li><li><b>Cost-Effective: </b>Self-training can be a significant cost savings compared to professional programs. While there will still be expenses for food, veterinary care, and basic supplies, you won\'t have the training program fees.</li></ul></section>',
      section_01_body_01_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Challenges</h4><ul class="small-content"><li><b>Time Commitment: </b>Training a service dog requires hundreds of hours of dedicated work and consistent effort.</li><li><b>Expertise Required: </b>Understanding dog behavior, training techniques, and disability-specific tasks necessitates significant research and learning.</li><li><b>Success Rate: </b>Self-training doesn\'t guarantee success. Some dogs may not possess the temperament or aptitude for service dog work.</li></ul></section>',

      section_01_subtitle_02: "Professional Programs",
      section_01_body_02_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">The Choice</h4><p class="small-content">Partnering with a qualified service dog trainer or organization specializing in disabilities similar to yours can offer valuable guidance and support.</p></section>',
      section_01_body_02_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Benefits</h4><ul class="small-content"><li><b>Expert Guidance: </b>Experienced trainers can assess your needs, match you with a suitable dog, and provide comprehensive training guidance.</li><li><b>Increased Success Rate: </b>Professional programs have a higher success rate in producing qualified service dogs.</li><li><b>Reduced Time Commitment: </b>Programs handle a significant portion of the training, reducing your time investment.</li></ul></section>',
      section_01_body_02_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Considerations</h4><ul class="small-content"><li><b>Trainer Qualifications: </b>Look for trainers certified by reputable organizations and experienced in training dogs for disabilities similar to yours.</li><li><b>Program Reputation: </b>Research the program\'s reputation, success rates, and training methods</li><li><b>Cost: </b>Obtaining a professionally trained service dog is a significant investment, typically ranging from $15,000 to $30,000 or more, depending on the dog\'s specific training needs and the organization providing the service. Private trainers can cost $150-250 an hour.</li></ul></section>',

      /* Bottom section Dark gradient:: */
      section_02_title: "Additional Considerations",
      section_02_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">Regardless of the path you choose, remember that owning a service dog is a significant commitment. Beyond the initial training, ongoing care and maintenance are essential. Carefully evaluate your lifestyle to ensure you can accommodate the responsibilities involved, including food, veterinary care, and regular training reinforcement.</p><div class="dot full-width mt-8"></div></section>',
      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
    };
  }
};
</script>

<style scoped src="../common.css"></style>

