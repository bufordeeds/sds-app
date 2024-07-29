<template>

<div>
  <!-- START Content wrapper -->
  <div class="section-container pt-1">
    <div data-v-3dd2e005="" class="section-layout">
      <div class="angled-ribbon">
        <canvas id="gradient-canvas-sds4" data-js-darken-top data-transition-in>
        </canvas>
      </div>
      <div data-v-3dd2e005="" class="section-inner-container pt-15">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-6 col-12">
            <div data-v-3dd2e005="" class="small-header-line">{{ overline }}</div>
            <h1 data-v-3dd2e005="" class="mt-4 pb-8">{{ page_title }}</h1>
            <div data-v-3dd2e005="" v-html="page_description"></div>
          </div>
          <div data-v-3dd2e005="" class="col-md-6 col-12">
            <div style="width:100%;" class="mt-12 bg-none">
              <!--<img :src="header_image" alt="" class="bg-none Card--shadowLarge" style="width:100%;height:auto;border-radius:24px">-->
              <img src="../learnMore/images/iStock-953742852.jpg" alt="" class="bg-none Card--shadowLarge" style="width:100%;height:auto;border-radius:24px">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

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

  <div class="section-container bg-pale">
    <div data-v-3dd2e005="" class="section-inner-container">
      <div data-v-3dd2e005="" class="row">
        <div data-v-3dd2e005="" class="col-md-8 col-12">
          <section>
            <h2 data-v-3dd2e005="" class="pb-8">{{ section_02_title }}</h2>
          </section>
        </div>
      </div>
       <!-- 2-column layout:: -->
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

  <div class="section-container">
    <div data-v-3dd2e005="" class="section-inner-container">
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

  <div class="section-container">
    <div data-v-3dd2e005="" class="section-inner-container pt-0">
      <div data-v-3dd2e005="" class="row">
        <div data-v-3dd2e005="" class="col-md-8 col-12">
          <section>
            <h2 data-v-3dd2e005="" class="pb-8">{{ section_05_title }}</h2>
          </section>
        </div>
      </div>
       <!-- 2-column layout:: -->
      <div data-v-3dd2e005="" class="row">
        <div data-v-3dd2e005="" class="col-12">
          <div data-v-3dd2e005="" class="column-layout2">
            <div v-html="section_05_body_col1"></div>
            <div v-html="section_05_body_col2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="section-container bg-pale">
    <div data-v-3dd2e005="" class="section-inner-container">
      <div data-v-3dd2e005="" class="row">
        <div data-v-3dd2e005="" class="col-md-8 col-12">
          <section>
            <h2 data-v-3dd2e005="" class="pb-8">{{ section_06_title }}</h2>
            <div v-html="section_06_body"></div>
          </section>
        </div>
      </div>
    </div>
  </div>

  <div class="section-container bg-dark">
    <div data-v-3dd2e005="" class="section-inner-container">
      <div data-v-3dd2e005="" class="row pb-16">
        <div data-v-3dd2e005="" class="col-md-8 col-12">
          <h2 data-v-3dd2e005="" class="text-white pb-12">{{ section_07_title }}</h2>
          <div v-html="section_07_body"></div>
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
import shareSection from "@/views/learnMore/shareSection2";

export default {
  name: "WhatShouldServiceDogActLike",
  components: {shareSection},
  data() {
    return {
      overline: 'About us',
      page_title: 'What should a service dog act like?',
      page_description: "Service dogs are more than just pets. They are highly trained partners that empower individuals with disabilities to navigate daily life with greater independence and confidence. <b>The key difference between a well-trained service dog and a pet lies in their behavior.</b> While there's no federally mandated certification for service dogs in the US, their public behavior speaks volumes.",
      header_image: '../learnMore/images/iStock-953742852.jpg',

      section_01_title: 'Every Service Dog Team is Unique',
      section_01_body: "<p>Service dog teams come in all shapes and sizes. Each partnership is built on the specific needs of the handler and the unique skillset of the dog. The tasks a service dog performs will vary depending on the disability it's trained to assist with. However, one common thread unites all legitimate service dog teams: <b>individually tailored training to meet the handler's disability-related needs.</b></p><p>This customized training equips the dog to perform specific tasks that directly address the handler's limitations. These tasks go beyond what a well-trained pet can offer and are performed on cue, reliably and precisely. A service dog's response to commands should be predictable, a testament to the extensive training behind it.</p>",

      section_02_title: "Emotional Support vs. Trained Tasks",
      section_02_body_col1: "<section><p>Emotional support, while valuable, is not a recognized service dog task. All dogs can provide companionship and emotional comfort. However, emotional support cannot be trained. In contrast, a service dog can be trained for deep pressure stimulation to calm a handler during a panic attack, or to alert them to an approaching person.</p></section>",
      section_02_body_col2: "<section><p>The distinction is crucial. A dog who isn't trained to reliably perform tasks that mitigate the handler's disability doesn't qualify as a service dog. These untrained animals masquerading as service dogs in public spaces can create difficulties for legitimate teams. They can raise suspicion and lead to access issues for well-trained service dogs.</p></section>",

      section_03_title: 'Service Dog Behavior: Public Manners',
      section_03_body: "<p>A hallmark of a service dog is its calm, focused demeanor while working with its partner in public. Good manners are essential. Excessive barking, growling, jumping, or fearfulness are all signs that the dog might not be a trained service animal. A dog overwhelmed by its surroundings cannot effectively focus on its handler's needs.</p>",

      section_04_title: "The Look of a Focused Professional",
      section_04_body: "<section><p>When you encounter a service dog, it should be evident that specialized training has gone into its behavior. They should be calm and attentive to their handler, remaining at their side unless directed otherwise or performing a trained task requiring distance. They shouldn't show undue interest in their environment or strangers.</p></section>",
      
      section_05_title: "The Mark of Training",
      section_05_body_col1: "<section><p>A trained service dog's skills are often readily apparent. Their exceptional leash manners and ability to move fluidly with their handler are clear signs of dedicated training. They can hold positions like stays for extended periods and remain relaxed in stimulating environments. Distractions hold no sway over a well-trained service dog. They may accept interaction but won't actively seek it out, reliably performing their tasks regardless of the surrounding activity.</p></section>",
      section_05_body_col2: "<section><p>The number of tasks a service dog performs varies by team. Some may specialize in just a few tasks, while others have a broader repertoire. A trained service dog can perform its duties anywhere the handler needs assistance. It's important to remember that a service dog on standby, waiting for a cue, isn't necessarily inactive. While business owners are allowed to inquire about the tasks a service dog performs to ensure it doesn't disrupt operations, they cannot request a demonstration of the dog's training. Handlers should be prepared to offer a clear and concise explanation of their service dog's tasks.</p></section>",

      section_06_title: "Public Access Etiquette",
      section_06_body: "<section><p>Public access training is another hallmark of a service dog. They shouldn't block walkways or impede access to items. They should quietly settle under tables or chairs while waiting, avoiding becoming a tripping hazard or obstacle. Common everyday occurrences like automatic doors, strollers, or shopping carts shouldn't startle or spook them.</p><p>In essence, a trained service dog acts the part. They don't resemble a pet on a casual outing. They don't create disturbances, attack other dogs, or drag their handler around. They are, quite simply, professionals.</p></section>",

      section_07_title: "Service Dog Standards: A Resource for the Service Dog Community",
      section_07_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-white">At Service Dog Standards, we are passionate about empowering individuals with disabilities and fostering a world of greater understanding and inclusion for service dog teams. We offer a wealth of resources and educational materials on various aspects of service dogs, from exploring the path to acquiring a service dog to navigating public access rights.</p><div class="dot full-width mt-8"></div></section>',

      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'

    };
  }
};
</script>

<style scoped src="../common.css">
</style>
