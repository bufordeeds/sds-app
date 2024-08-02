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
              <div v-html="page_blurb_01"></div>
              <div v-html="page_description"></div>
            </div>
            <div data-v-3dd2e005="" class="col-md-5 col-12">
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

    <div id="section_02" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-0">{{ section_02_title }}</h2>
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

    <div id="section_03" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container pt-0">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_03_title }}</h2>
              <p>{{ section_03_description }}</p>
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

    <div id="section_04" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-8">{{ section_04_title }}</h2>
              <div v-html="section_04_body"></div>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section class="pt-8">
              <div class="content-card-large">
                <h5 class="text-center pb-8">Physician, psychiatrist, social worker or other mental health professional’s letterhead Address / Website / Email / Phone</h5>
                <p class="small-content">Date</p>
                <p class="small-content">Date_______________________,</p>
                <p class="small-content">_______________________ is my patient, and has been under my care since [DATE]. My patient meets the definition of disability under the Americans with Disabilities Act, the Fair Housing Act, and the Rehabilitation Act of 1973 and I am intimately familiar with their history and with the functional limitations imposed by their disability.</p>
                <p class="small-content">In order to help alleviate these difficulties, my patient is partnered with a Service Dog which is trained to complete tasks they would otherwise have difficulty completing on their own.</p>
                <p class="small-content">Upon request, I would be happy share professional literature and articles citing the benefits of Service Dogs for people with disabilities. Please let me know if you have any questions regarding my recommendation.</p>
                <p class="small-content"><br/>Sincerely,</p>
                <p class="small-content"><br/>Signature</p>
              </div>
            </section>  
          </div>
        </div>
      </div>
    </div>

    <div id="section_05" class="section-container bg-dark">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row pb-16">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <div data-v-3dd2e005="" class="small-header-line text-accent-200">{{ section_05_overline }}</div>
            <h2 data-v-3dd2e005="" class="text-white mt-4 pb-8">{{ section_05_title }}</h2>
            <div v-html="section_05_01_body"></div>
            <div v-html="section_05_02_body"></div>
            <div v-html="section_05_03_body"></div>
            <div v-html="section_05_04_body"></div>
            <div v-html="section_05_05_body"></div>
            <div v-html="section_05_06_body"></div>


            <div v-html="section_05_blurb"></div>
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
  name: "ForPhysiciansTherapists",
  data() {
    return {
      overline: 'For Professionals',
      page_title: 'Supporting Patient Independence with Service Dogs: A Guide for Physicians and Therapists',
      page_blurb_01: '<h3>Empowering Informed Decisions</h3>',
      page_description: '<div class="pt-8">As a physician or therapist, you play a crucial role in supporting your patients\' well-being. You may be aware of the potential benefits of service dogs for patients with disabilities, however, concerns about patient preparedness for this responsibility can make recommending them a challenge. Service Dog Standards offers a solution focused on education and empowerment.</div>',
      header_image: '[path to image]',

      section_01_title: "We understand your role isn't to verify expertise in service dog training",
      section_01_description: '<div class="pt-8">As a physician or therapist, you play a crucial role in supporting your patients\' well-being. You may be aware of the potential benefits of service dogs for patients with disabilities, however, concerns about patient preparedness for this responsibility can make recommending them a challenge. Service Dog Standards offers a solution focused on education and empowerment.</div>',      section_01_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Attract New Clients</h4><p class="small-content">Stand out with a comprehensive trainer listing, showcasing your expertise and attracting clients seeking service dog training.</p></section>',
      section_01_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Educating Patients</h4><p class="small-content">Our platform provides clear, reliable information on service dog rights and responsibilities. This empowers patients to make informed decisions and explore if a service dog aligns with their needs and lifestyle.</p></section>',
      section_01_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Focus on Patient Readiness</h4><p class="small-content">Educated patients can assess their individual suitability for a service dog, fostering successful long-term partnerships. This reduces the risk of unsuitable pairings that may hinder patient progress.</p></section>',
      section_01_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Building Confidence for Public Access</h4><p class="small-content">Understanding expectations reduces anxiety and equips patients to confidently navigate public spaces with their service dog.</p></section>',

      section_02_title: "Benefits for Your Patients",
      section_02_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Informed & Responsible Service Dog Ownership</h4><p class="small-content">Patients gain a clear understanding of their role, leading to responsible service dog ownership.</p></section>',
      section_02_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Reduced Anxiety & Enhanced Confidence</h4><p class="small-content">Education empowers patients to confidently navigate public spaces with their service dog.</p></section>',
      section_02_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Streamlined Documentation</h4><p class="small-content">Service Dog Standards offers a method for patients to showcase their commitment and achievements as a service dog handler while still safeguarding their privacy.</p></section>',
      

      section_03_title: "Benefits for You",
      section_03_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-3">Confident Recommendations</h4><p class="small-content">Feel assured knowing your patients have the knowledge and resources needed for a potentially successful service dog journey.</p></section>',
      section_03_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-3">Focus on Patient Care and Empower Your Patients</h4><p class="small-content">Our resources empower your patients to navigate the complexities of partnering with a service dog, allowing them to take ownership of their well-being and confidently explore if a service dog aligns with their needs and lifestyle.</p></section>',
      section_03_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-3">Promoting Safety and Responsible Ownership</h4><p class="small-content">Our emphasis on training and behavior standards helps ensure well-trained and well-behaved service dogs in public spaces, fostering a safer environment for everyone.</p></section>',
      
      section_04_title: "Writing a Physician Letter",
      section_04_body: "Letters from a physician, psychiatrist, social worker or other mental health professional should be printed on their letterhead and contain something similar to the following:",

      /* Bottom section Dark gradient:: */
      section_05_overline: 'Digging Deeper',
      section_05_title: "Why Physician Letters Aren't Required for All Service Dogs",
      section_05_01_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary"><b>Limited Expertise:</b> Physicians can diagnose disabilities but aren\'t qualified to assess service dog training, task effectiveness, or dog behavior.</p></div></section>',
      section_05_02_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary"><b>Accessibility Issues:</b> Not everyone has a regular doctor. Urgent care or emergency room visits often involve different physicians who can\'t write such letters.</p></div></section>',
      section_05_03_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary"><b>Potential for Abuse:</b> Paying for a doctor\'s letter online makes the system vulnerable to abuse by those who don\'t truly need a service dog.</p></div></section>',      
      section_05_04_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary"><b>Burden on Disabled Individuals, Especially with Mental Health Concerns:</b> Disclosing a disability, especially a mental health condition like PTSD, can be humiliating and discouraging. Requiring a letter can exacerbate this burden.</p></div></section>',
      section_05_05_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary"><b>Focus on Disability, not Verification:</b> The ADA focuses on the disability and how the service dog helps, not the specifics of training or behavior. Physician letters can be one-sided, focusing solely on the disability and not the potential for abuse of the system through purchased letters.</p></div></section>',
      section_05_06_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary"><b>Privileged Documentation:</b> Access to a physician who can write a letter can be a privilege. Those with limited income or who rely on temporary care facilities may not have this option.</p></div><div class="dot full-width mt-8"></div></section>',
      
      section_05_blurb: '<h4 class="mt-16 text-white">In short, physician letters can be a barrier, not a reliable verification tool, for service dog use. They can be especially challenging for individuals with mental health conditions.</h4>',
      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
    };
  }
};
</script>

<style scoped src="../common.css"></style>

