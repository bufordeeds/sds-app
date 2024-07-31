<template>
  <div>
    <div class="page-title">
      For The Public
    </div>

    <div
      class="content-container-bg pl-0 pr-0"
      style="min-height: inherit; padding-bottom: 10px; "
    >
      <!--<div class="content-container lm-title">-->
      <!--   What should you do when you see a Service Dog?-->
      <!--</div>-->
      <!--<img src="./images/Dog-Pointing.jpg" width="100%">-->


      <div class="content-container-sm">
        <div class="bread-crumb-title">
          Public Etiquette
        </div>
        <div class="lm-title">
          What should you do when you see a Service Dog?
        </div>
        <share-section />
      </div>
    </div>





    <div class="content-container-bg pt-0">
      <div class="content-container-sm">
        <div class="section">
          It seems when some people see a Service Dog in public they either act as though it’s a celebrity, a cute toy to be played with or an annoyance, even if it’s just laying there. So what should you do when you see a Service Dog? What is proper Service Dog etiquette?

          <div class="lm-heading">
            Smile and be polite to the Service Dog’s handler, but most of all:
          </div>
          <span class="br" />
          <ul>
            <li>
              Do not pet the Service Dog
            </li>
            <li>
              Do not distract the Service Dog in any way
            </li>
            <li>
              Please ignore the Service Dog entirely. You’re not being rude if you don’t acknowledge the Service Dog’s presence.
            </li>
          </ul>

          When a Service Dog has a vest on or is in public with its disabled handler (or trainer), it is working, even if it appears as though it is not.
          <span class="br" />
          Distracting a Service Dog by making noises, offering food, water, toys or petting may be dangerous to the dog’s disabled handler, especially if the dog is a medical alert dog or brace/mobility support dog.

          <div class="lm-heading">
            Remember, Not All Disabilities Are Visible
          </div>

          Many handlers have “invisible disabilities,” such as diabetes, hearing loss or other symptoms not readily apparent, and if a Service Dog is paying attention to someone who’s distracting her, she’s not doing her job for her handler.

          <div class="lm-heading">
            Special Circumstances
          </div>

          Some handlers are okay with having their Service Dog pet during certain situations. If you would like to pet a Service Dog, ALWAYS ask the handler first, but don’t be offended if they refuse.
          <span class="br" />
          Some disabled Service Dog handlers don’t like to chat about their Service Dogs. Most like to go about their day, just like you! Also, never ask personal questions about the handler’s disability or intrude on their privacy.
        </div>
      </div>
    </div>






    <!--<div class="content-container-bg pt-0" >-->
    <!--   <div class="content-container-sm">-->




    <!--      <div class="section">-->

    <!--         <p>-->
    <!--            It seems when some people see a Service Dog in public they either act as though it’s a celebrity, a cute toy to be played with or an annoyance, even if it’s just laying there. So what should you do when you see a Service Dog? What is proper Service Dog etiquette?-->
    <!--         </p>-->


    <!--         <p>-->
    <!--            Smile and be polite to the Service Dog’s handler, but most of all:-->
    <!--         </p>-->

    <!--         <ul>-->
    <!--            <li>-->
    <!--               Do not pet the Service Dog-->
    <!--            </li>-->
    <!--            <li>-->
    <!--               Do not distract the Service Dog in any way-->
    <!--            </li>-->
    <!--            <li>-->
    <!--               Please ignore the Service Dog entirely. You’re not being rude if you don’t acknowledge the Service Dog’s presence.-->
    <!--            </li>-->
    <!--         </ul>-->

    <!--         <p class="mt-4">-->
    <!--            Service Dog etiquette says when Service Dog has a vest on or is in public with its disabled handler (or trainer), it is working, even if it appears as though it is not. Distracting a Service Dog by making noises, offering food, water, toys or petting may be dangerous to the dog’s disabled handler, especially if the dog is a medical alert dog or brace/mobility support dog. Many handlers have “invisible disabilities,” such as diabetes, hearing loss or other symptoms not readily apparent, and if a Service Dog is paying attention to someone who’s distracting her, she’s not doing her job for her handler.-->
    <!--         </p>-->


    <!--         <p>-->
    <!--            If you would like to pet the Service Dog, ALWAYS ask the handler first, but don’t be offended if they refuse. Some disabled Service Dog handlers don’t like to chat about their Service Dogs. Most like to go about their day, just like you! Also, never ask personal questions about the handler’s disability or intrude on their privacy. Keep these simple Service Dog etiquette tips in mind, and you’ll have a far smoother experience when you see a Service Dog in public.-->
    <!--         </p>-->




    <!--      </div>-->


    <!--   </div>-->
    <!--</div>-->
  </div>
</template>

<!-- Layout template:: -->
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
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_01_title }}</h2>
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

    <div id="section_02" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_02_title }}</h2>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_02_subtitle }}</h3>
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


    <!-- 1-column layout Bottom section BG Dark:: -->
    <div id="section_05" class="section-container bg-dark">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row pb-16">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <h2 data-v-3dd2e005="" class="text-white pb-12">{{ section_03_title }}</h2>
            <div v-html="section_03_body"></div>
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
  name: "WhatTodoWhenSeeDog",
  data() {
    return {
      overline: 'For the Public',
      page_title: 'Invisible Disabilities: Why You Can\'t Judge a Disability by Appearance',
      page_description: 'Many people associate disability with physical appearance or equipment like wheelchairs, walkers, oxygen tanks or prosthetic limbs. However, most disabilities are invisible, meaning they\'re not readily apparent. This can lead to discrimination, confusion and a lack of understanding for individuals with these disabilities.',
      header_image: '[path to image]',

      section_01_title: "Here's why you can't judge disability by appearance",
      section_01_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">The Spectrum of Conditions</h4><p class="small-content">Many disabilities are hidden. Chronic illnesses like fibromyalgia or lupus cause immense pain and fatigue, yet leave no outward signs. Similarly, mental health conditions like anxiety, depression, or learning disabilities can significantly impact daily life, often unseen by others.</p></section>',
      section_01_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Varying Degrees of Impact</h4><p class="small-content">The same disability can manifest differently in each person. Someone with autism might appear "neurotypical" in some settings, while struggling in others. A person with a learning disability might excel in certain areas, but require accommodations in others.</p></section>',
      section_01_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Adaptive Strategies</h4><p class="small-content">People with disabilities often develop impressive strategies to cope and function in the world. They might use assistive technology, manage their environment, or plan their activities meticulously. These efforts can make their disability less visible.</p></section>',

      section_02_title: "The Importance of Awareness",
      section_02_subtitle: "Understanding the prevalence of invisible disabilities is crucial. Here's why",
      section_02_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Promoting Empathy</h4><p class="small-content">Recognizing that someone might be struggling, even if they don\'t appear to be, fosters a more compassionate society. Offering a seat, extra time, or simply being patient can make a big difference.</p></section>',
      section_02_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Advocating for Accessibility</h4><p class="small-content">When we understand the diverse needs of people with disabilities, we can advocate for inclusive spaces and services. This can be as simple as ensuring clear signage or readily available seating.</p></section>',
      section_02_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Breaking Stereotypes</h4><p class="small-content">Moving beyond the stereotype of disability as solely physical allows us to recognize the vast spectrum of human experience. It fosters a more inclusive world where everyone feels valued and respected.</p></section>',

      /* Bottom section Dark gradient:: */
      section_03_title: "Remember",
      section_03_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">Just because someone appears healthy doesn\'t mean they are. Treat everyone with kindness and understanding, and be open to the possibility that unseen challenges might be present.</p><div class="dot full-width mt-8"></div></section>',
      
      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
    };
  }
};
</script>

<style scoped src="../common.css"></style>