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
              <div data-v-3dd2e005="">{{ page_description }}</div>
              <div class="flex-row" v-html="page_bullet_01" style="padding:8px 0;gap:16px"></div>
              <div class="flex-row" v-html="page_bullet_02" style="padding:8px 0;gap:16px"></div>
              <div class="flex-row" v-html="page_bullet_03" style="padding:8px 0;gap:16px"></div>
              <div class="flex-row" v-html="page_bullet_04" style="padding:8px 0;gap:16px"></div>
              <div class="flex-row" v-html="page_bullet_05" style="padding:8px 0;gap:16px"></div>
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
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" v-html="section_01_title" class="pb-8"></h2>
              <div v-html="section_01_body"></div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div id="section_02" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row pb-4">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h3 data-v-3dd2e005="">{{ section_02_title }}</h3>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <div v-html="section_02_body_01"></div>
            <div v-html="section_02_body_02"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_03" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-9 col-12">
            <section>
              <h3 data-v-3dd2e005="" class="pb-9">{{ section_03_title }}</h3>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <section>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/zIa1Vs4jf7s?si=O5HFjZ274XC4eETu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div id="section_04" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row pb-4">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h3 data-v-3dd2e005="">{{ section_04_title }}</h3>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <div v-html="section_04_body_01"></div>
            <div v-html="section_04_body_02" class="pb-16"></div>
            <div v-html="section_04_body_03"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_05" class="section-container angled-section-bottom bg-dark">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <section>
              <h3 data-v-3dd2e005="" class="text-white pb-16">{{ section_05_title }}</h3>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/WyKld0UXjcY?si=qRmpL8_ZL92OJyis" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div id="section_06" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container pt-0">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_06_title }}</h3>
              <div data-v-3dd2e005="" class="pb-8">{{ section_06_body_01 }}</div>
              <div data-v-3dd2e005="">{{ section_06_body_02 }}</div>
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

    <div id="section_07" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_07_title }}</h3>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div data-v-3dd2e005="" class="column-layout2">
              <div v-html="section_07_body_col1"></div>
              <div v-html="section_07_body_col2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- 1-column layout Bottom section BG Dark:: -->
    <div id="section_08" class="section-container bg-dark">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row pb-16">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <h3 data-v-3dd2e005="" class="text-white">{{ section_08_title }}</h3>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12 pt-0">
            <div v-html="section_08_body_01"></div>
            <div v-html="section_08_body_02"></div>
          </div>
        </div>
      </div>
    </div>

  </div> <!-- END Content wrapper -->

</template>

<script>
export default {
  name: "BusinessRights",
  data() {
    return {
      overline: 'For the Public',
      page_title: 'Business Rights Concerning Service Dogs',
      page_bullet_01: '<div>Service dogs must be allowed in most business areas.</div>',
      page_bullet_02: '<div>Businesses can confirm legitimacy with 2 questions: disability need and trained task.</div>',
      page_bullet_03: '<div>Not all disabilities are visible.</div>',
      page_bullet_04: '<div>Businesses can remove disruptive animals, but must offer alternative service.</div>',
      page_bullet_05: '<div>Train staff to recognize service animals and be friendly to all customers.</div>',
      header_image: '[path to image]',

      section_01_title: 'Know the Rules, Serve Everyone:<br/>A Guide to Service Animals for Businesses',
      section_01_body: "<p>Service animals are vital companions for people with disabilities, providing essential assistance in navigating daily life. The Americans with Disabilities Act (ADA) ensures these dedicated partners can accompany their handlers in most public spaces, including your business. This guide outlines your rights and responsibilities regarding service animals, helping you maintain a welcoming and compliant environment for all customers.</p>",

      section_02_title: "What You Need to Know About Service Animals",
      section_02_body_01: '<section class="pb-8"><h4 class="copy-title pb-4">Definition</h4><p class="small-content">A service animal is a dog, specifically trained to do work or perform tasks for a person with a disability. These tasks are directly related to the person\'s specific disability and may include<ul><li><b>Mobility assistance:</b> Guiding someone who is visually impaired, providing balance and support for someone with mobility issues, or retrieving dropped items.</li><li><b>Alerting tasks:</b> Signaling when a diabetic\'s blood sugar drops, alerting someone with a hearing impairment to sounds like alarms or doorbells, or providing warnings for someone with seizures.</li><li><b>Mental health support:</b> Providing emotional support or mitigating the effects of anxiety or panic attacks.</li></ul></p></section>',
      section_02_body_02: '<section><h4 class="copy-title pb-5">Distinguishing Service Animals from Pets</h4><p class="small-content">Service animals are distinct from pets. They are typically outfitted with a vest or harness indicating their working status. However, this is not a legal requirement, and some legitimate service animals may not wear any specific gear.</p></section>',

      section_03_title: "Access to Public Places for Service and Assistance Dogs under the ADA",
      section_03_body_01: '',

      section_04_title: "Your Rights and Responsibilities",
      section_04_body_01: '<section class="pb-8"><h4 class="copy-title pb-5">Granting Access</h4><p class="small-content">Under the ADA, you are legally obligated to allow service animals to accompany their handlers in all areas of your business where the public is generally allowed. This includes restaurants, retail stores, offices, and even areas with specific health code restrictions (like food preparation areas) – provided the service animal doesn\'t pose a direct threat.</p></section>',
      section_04_body_02: '<section"><h4 class="copy-title pb-4">Verification:</h4><p class="small-content">While you cannot require proof of disability or special ID cards for service animals, you are allowed to ask two specific questions to determine legitimacy<ol><li class="small-content">Is the animal a service animal required because of a disability?</li><li class="small-content">What work or task has the animal been trained to perform?</li></ol></p></section>',
      section_04_body_03: '<section"><div class="content-card-large"><b>Important Note: You cannot require service animals to wear a vest, harness, ID tag, or any other specific gear.</b> Some handlers choose to provide these for visibility, but it\'s not a legal mandate. You cannot ask for documentation of the animal\'s training or proof of the person\'s disability.</div></section>',

      section_05_title: 'Welcome Service Animals',
      section_05_body: "",

      section_06_title: "Remember, You Can't Always See a Disability",
      section_06_body_01: "It's important to understand that not all disabilities are readily apparent. People with invisible disabilities, such as chronic illnesses, mental health conditions, or learning disabilities, may also rely on service animals for assistance.",
      section_06_body_02: "Here's why you can't judge disability by appearance",
      section_06_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Hidden Conditions</h4><p class="small-content">Many disabilities are unseen, such as chronic pain, fatigue, or anxiety disorders.</p></section>',
      section_06_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Varying Degrees of Impact</h4><p class="small-content">The same disability can manifest differently in each person. Someone with autism might appear "neurotypical" in some settings.</p></section>',
      section_06_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Adaptive Strategies</h4><p class="small-content">People with disabilities often develop strategies to cope and function, making their disability less visible.</p></section>',

      section_07_title: "Maintaining a Safe and Inclusive Environment",
      section_07_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Out-of-Control Animals</h4><p class="small-content">If a service animal displays disruptive behavior, such as excessive barking, growling, or lunging, you may ask the handler to remove the animal from the premises. However, you must first offer alternative ways for the customer to access your goods or services without the animal present.</p></section>',
      section_07_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Hygiene and Damage</h4><p class="small-content">Service animal owners are responsible for cleaning up after their animals. You can still charge for any property damage caused by a service animal, just as you would for any customer.</p></section>',

      section_08_title: "Fostering a Positive Experience",
      section_08_body_01: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary"><b>Staff Training:</b> Educate your staff on recognizing service animals and the proper way to interact with them. This promotes a welcoming atmosphere and avoids unnecessary confrontations.</p></div></section>',
      section_08_body_02: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary"><b>Focus on Courtesy:</b> Treat service animal handlers with the same courtesy you would extend to any other customer.</p><div class="dot full-width mt-8"></div></section>',


      /* Bottom section Dark gradient:: */
      section_09_title: "Title",
      section_09_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">Body content.</p><div class="dot full-width mt-8"></div></section>',

      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
    };
  }
};
</script>

<style scoped src="../common.css"></style>
