<template>

  <div>

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

    <div id="section_01" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container pt-16">
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

    <div id="section_02" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_02_title }}</h3>
              <div v-html="section_02_body"></div>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <div v-html="section_02_body_01" class="pb-4"></div>
            <div v-html="section_02_body_02" class="pb-4"></div>
            <div v-html="section_02_body_03" class="pb-4"></div>
            <div v-html="section_02_body_04" class="pb-4"></div>
            <div v-html="section_02_body_05"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_03" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_03_title }}</h3>
              <div v-html="section_03_body"></div>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-12">
            <div v-html="section_03_body_01" class="pb-4"></div>
            <div v-html="section_03_body_02"></div>
            <div v-html="section_03_body_03"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_04" class="section-container angled-section-bottom light">
      <div data-v-3dd2e005="" class="section-inner-container pb-16">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_04_title }}</h3>
              <div v-html="section_04_body_01"></div>
              <div v-html="section_04_body_02"></div>
            </section>
          </div>
        </div>
      </div>
    </div>

    <div id="section_05" class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container pt-0">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h3 data-v-3dd2e005="" class="pb-8">{{ section_05_title }}</h3>
              <div data-v-3dd2e005="" v-html="section_05_body"></div>
            </section>
          </div>
        </div>
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <div v-html="section_05_body_01"></div>
              <div v-html="section_05_body_02"></div>
              <div v-html="section_05_body_03"></div>
            </section>
          </div>
        </div>
        <div id="section_06" data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12 pt-16">
            <div v-html="section_06_body_01"></div>
            <div v-html="section_06_body_02" class="pt-8"></div>
          </div>
        </div>
      </div>
    </div>

    <div id="section_07" class="section-container bg-pale">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div data-v-3dd2e005="" class="row">
          <div data-v-3dd2e005="" class="col-md-8 col-12">
            <section>
              <h2 data-v-3dd2e005="" class="pb-16">{{ section_07_title }}</h2>
            </section>
            <section class="pb-16">
              <h3 v-html="section_07_subtitle_01" class="pb-4"></h3>
              <div v-html="section_07_body_01"></div>
            </section>
            <section class="pb-16">
              <h3 v-html="section_07_subtitle_02" class="pb-4"></h3>
              <div v-html="section_07_body_02"></div>
            </section>
            <section class="pb-16">
              <h3 v-html="section_07_subtitle_03" class="pb-4"></h3>
              <div v-html="section_07_body_03"></div>
            </section>
            <section>
              <h3 v-html="section_07_subtitle_04" class="pb-4"></h3>
              <div v-html="section_07_body_04"></div>
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
  name: "LandlordHoaRights",
  data() {
    return {
      overline: 'For the Public',
      page_title: 'Landlords & HOAs',
      page_description: '',
      page_bullet_01: '<div>Landlords and HOA managers must allow service animals under the Fair Housing Act (FHA).</div>',
      page_bullet_02: '<div>Service animals are not pets, they are working animals classified as medical equipment</div>',
      page_bullet_03: '<div>Landlords may need to waive pet fees and adjust some rules. </div>',
      page_bullet_04: '<div>Service Dog Standards membership helps demonstrate a tenant\'s commitment to responsible service dog ownership, providing landlords and HOAs with peace of mind regarding the animal\'s training and behavior.</div>',
      header_image: '[path to image]',

      section_01_title: 'Landlord & HOA Considerations for Service Animals',
      section_01_body: "<p>The Fair Housing Act (FHA) is a cornerstone legal resource for landlords, homeowners associations (HOAs), and tenants regarding service animals in housing. However, it's not the only source of information. Here, we'll explore key details about service animals and your obligations under the FHA.</p>",

      section_02_title: "Building a Strong Knowledge Base",
      section_02_body: "Here are additional resources to ensure clear understanding and compliance",
      section_02_body_01: '<section class="txt-box-side"><h4 class="copy-title pb-3"><a href="https://www.hud.gov/" class="text-link">U.S. Department of Housing and Urban Development (HUD)</a></h4><p class="small-content">Provides comprehensive guidance for landlords and tenants, including fact sheets and resources on reasonable accommodations.</p></section>',
      section_02_body_02: '<section class="txt-box-side"><h4 class="copy-title pb-3"><a href="https://www.justice.gov/" class="text-link">U.S. Department of Justice (DOJ)</a></h4><p class="small-content">Offers resources on the Americans with Disabilities Act (ADA) and service animals in housing, including frequently asked questions. ([link to DOJ resource])</p></section>',
      section_02_body_03: '<section class="txt-box-side"><h4 class="copy-title pb-3">State Attorney General</h4><p class="small-content">May provide state-specific regulations regarding service animals and housing.</p></section>',
      section_02_body_04: '<section class="txt-box-side"><h4 class="copy-title pb-3">Your Attorney</h4><p class="small-content">Can offer personalized legal advice on your specific situation, including navigating potential legal disputes.</p></section>',

      section_03_title: "Understanding Service Animals",
      section_03_body: "The FHA protects the rights of individuals with disabilities to live with service animals. It's important to distinguish service animals from pets",
      section_03_body_01: '<section class="txt-box-side"><h4 class="copy-title pb-3">Service Animal</h4><p class="small-content">A dog (and in some rare cases, a miniature horse) that is individually trained to perform work or tasks for a person with a disability. These tasks are directly related to the person\'s disability and may include</p><ul><li><b>Mobility assistance: </b>Guiding someone who is visually impaired, providing balance and support for someone with mobility issues, or retrieving dropped items.</li><li><b>Hearing assistance:</b> Alerting someone who is deaf or hard of hearing to sounds like alarms or doorbells.</li><li><b>Medical alert:</b> Signaling when a diabetic\'s blood sugar drops or warning someone with a seizure disorder of an impending seizure.</li><li><b>Mental health support:</b> Providing emotional support or mitigating the effects of anxiety or panic attacks.</li></ul></section>',
      section_03_body_02: '<section class="txt-box-side"><h4 class="copy-title pb-3">Pets</h4><p class="small-content">Animals kept for companionship or pleasure.</p></section>',

      section_04_title: 'What the Law Requires',
      section_04_body_01: "<p>The FHA prohibits discrimination against people with disabilities, including denying housing based on a service animal. Here's the relevant section:</p>",
      section_04_body_02: '<p><b>(Fair Housing Act Section 804(a))</b> "It is unlawful... to refuse to make reasonable accommodations in rules, policies, practices, or services, when such accommodations may be necessary to afford a handicapped person equal opportunity to use and enjoy a dwelling unit, including public and common use areas."</p>',

      section_05_title: "Reasonable Accommodations",
      section_05_body: "<p>These are changes you, as a landlord or HOA, can make to your policies or practices to allow a person with a disability to use and enjoy their housing. In the context of service animals, reasonable accommodations may include</p>",
      section_05_body_01: '<section class="txt-box-side"><p class="small-content">Waiving pet fees or deposits</p></section>',
      section_05_body_02: '<section class="txt-box-side"><p class="small-content">Modifying pet restrictions to allow service animals</p></section>',
      section_05_body_03: '<section class="txt-box-side"><p class="small-content">Allowing reasonable modifications to the dwelling unit, at the tenant\'s expense (if necessary) to accommodate the service animal (e.g., installing grab bars for a balance assistance dog).</p></section>',

      section_06_body_01: "<b>Important Note:</b> You cannot require proof of disability or special ID cards for service animals. You are allowed to ask two specific questions to determine legitimacy:",
      section_06_body_02: '<section><ol><li>Is the animal a service animal required because of a disability?</li><li>hat work or task has the animal been trained to perform?</li></ol></section>',

      section_07_title: "Service Dog Standards: Demonstrating Expertise",

      section_07_subtitle_01: "For Landlords",
      section_07_body_01: "Some tenants with service animals may choose to demonstrate their commitment to responsible pet ownership by adhering to the Service Dog Standards program. This program is entirely voluntary and exceeds the minimum legal requirements. Service dog handlers can train their dogs themselves or partner with a trainer or organization to achieve these standards.",

      section_07_subtitle_02: "What this means for you",
      section_07_body_02: "Regardless of whether a tenant has trained their service animal independently or with a professional, membership in Service Dog Standards can provide you with peace of mind. By adhering to these standards, handlers demonstrate a strong commitment to professionalism and ensure their service animals are well-trained and well-behaved.",
      
      section_07_subtitle_03: "Maintaining a Welcoming Community",
      section_07_body_03: "By understanding your rights and responsibilities under the FHA, you can create a more inclusive and welcoming environment for tenants and homeowners with disabilities. Remember, fostering a respectful and compliant community benefits everyone.",
      
      section_07_subtitle_04: "A Note About Emotional Support Animals (ESAs)",
      section_07_body_04: 'Emotional Support Animals are not service dogs, however they are a valuable type of working animal and are allowed in housing settings. Federal fair housing laws protect the right to have an ESA in a "no-pet" housing, however, some limitations may apply, so it\'s always best to check with your landlord or property manager beforehand.',

      /* Bottom section Dark gradient:: */
      section_08_title: "Disclaimer",
      section_08_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-secondary">This information is not a substitute for legal advice. Please consult a qualified attorney for specific legal guidance.</p><div class="dot full-width mt-8"></div></section>',

      cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>'
    };
  }
};
</script>

<style scoped src="../common.css"></style>
