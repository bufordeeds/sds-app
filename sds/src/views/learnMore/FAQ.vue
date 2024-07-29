<template>

  <div>

    <div class="section-container product-hero-section pt-1">
      <div data-v-3dd2e005="" class="section-layout">
        <div class="angled-ribbon">
          <canvas id="gradient-canvas-sds2" data-js-darken-top data-transition-in>
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
                <img src="../learnMore/images/iStock-953742852.jpg" alt="" class="bg-none card--shadowLarge"
                  style="width:100%;height:auto;border-radius:24px">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section-container">
      <div data-v-3dd2e005="" class="section-inner-container pt-16">
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

    <div class="section-container bg-dark">
      <div data-v-3dd2e005="" class="section-inner-container">
        <div v-html="section_02_title" class="text-center"></div>
        <v-expansion-panels v-model="open_section">

          <v-expansion-panel id="accept_standards_make_service_dog">
            <v-expansion-panel-header class="faq-header">
              Will simply accepting these standards make my dog a Service Dog?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              Our purpose is to add clarity to the process of obtaining, training and working with a Service Dog.
              Accepting these standards is a way of voluntarily holding yourself and your dog to a higher standard which
              goes above and beyond the law. Under the law, the only requirement for a Service Dog is that they be
              specifically trained to perform tasks or work for a disabled individual who would otherwise have
              difficulty accomplishing on their own due to their disability. Emotional support or other behaviors that a
              dog does naturally, while they may be beneficial and even help mitigate a disability, should not be
              included when naming trained work or tasks.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              Can I just make or buy a vest and add some patches?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              No. Most individuals who are partnered with a Service Dogs use vests, harnesses or patches that display
              generic wording like "Service Dog" or "Do not pet." Others may choose to use generic IDs that are not
              linked to any organization. While this is traditional, it leaves little accountability and these items are
              sometimes purchased by those who abuse the law — even though absolutely NO gear or IDs are required in the
              first place. Like with any product or tool, it is not necessarily the fault of the item itself or those
              who make it. The sole responsibility lies with the person who seeks it out and uses it improperly.
              <span class="br" />
              Online retailers such as Amazon, Etsy, eBay provide a platform for countless makers and resellers selling
              products including patches, vests, capes, harnesses, leashes, generic ID cards and more. In fact, a Google
              search for Service Dog products reveals well over 1,300,000,000 results at the time of this writing.
              <span class="br" />
              It is our mission to clarify what is necessary for educated and responsible Service Dog partnership by
              clearly laying out expectations and best practices for trainers and handlers.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel id="license_test_for_service_dog">
            <v-expansion-panel-header class="faq-header">
              Is there a Service Dog license, test, exam or certification?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              No. There is no “formal” test for Service Dogs because the tasks Service Dogs can be trained to perform
              vary too widely. Furthermore, under the law it is illegal for anyone to ask for proof of training or
              certification. The law is written this way because otherwise disabled individuals who use Service Dogs
              would be stopped and forced to show paperwork everywhere they go. Under the law, individuals are permitted
              to work with an organization, private trainer or train their own dog.
              <span class="br" />
              Service Dog Standards includes successful completion of a Public Access Test as part of our standards.
              Furthermore, our expectations go beyond just passing the PAT. We also require adherence to specific
              training and behavioral standards on the part of the hander and dog.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              What are “qualifying” Service Dog Tasks?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              There is no list of “qualifying” tasks for physical, mental or sensory disabilities because it would be
              nearly impossible to create. The only factor is that your dog is trained to perform work or tasks you
              would otherwise have difficulty completing due to your disability. Under the law, people are allowed to
              ask you what specific physical tasks your dog performs and you should be prepared to explain. Providing
              comfort or emotional support are not qualifying tasks.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel id="landlord_rights">
            <v-expansion-panel-header class="faq-header">
              What are my rights as a landlord or business owner?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              If a person verbally claims their animal is a Service Animal, you must allow them to enter - however that
              does not mean it is a free-for-all. If a customer or tenant causes damage or is disruptive, the same logic
              and laws apply as if they had a wheelchair or no disability at all. Damage or disruptive behavior should
              be dealt with as if it was done by any adult or child. Every Service Dog handler is solely responsible for
              their actions. You may not blame any group of people as a whole for the actions of a few, whether by race,
              nationality, religion, ability or disability.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              I’m disabled and I have a dog. Does that make my dog a Service Dog?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              No. Many disabled people have pets. Simply having a disability is not enough to qualify a pet as a Service
              or Assistance Dog. Service Dogs must be trained to complete tasks or work for you would otherwise have
              difficulty accomplishing on your own due to your disability.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              My dog taught itself to help me. Is that the same as training?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              No. Anything your dog does naturally or has taught itself to do does not qualify as a task or work. As
              well, any behavior that most dogs do naturally does not qualify as a task or work under the law.
              <span class="br" />
              Emotional support, providing comfort or companionship are examples of behaviors most dogs do naturally.
              While natural behaviors may be beneficial and even help mitigate a disability,
              <span style="font-weight: bold">they should not be included when naming trained work or tasks</span>.
              <span class="br" />
              Guard dog tasks are also prohibited.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel id="doctors_letter">
            <v-expansion-panel-header class="faq-header">
              Are physician or therapist letters required for Service Animals?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              Letters from a physician, psychiatrist, social worker or other mental health professional are not required
              for public access, though they may be required for housing or airlines.
              <span class="br" />
              <router-link to="/learn-more/for-physicians-therapists">
                Learn more
              </router-link>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              Do Service Dogs make life easier?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              Before you begin to explore partnering with a Service Dog, you should know that they do not always make
              life easier, and you should fully consider it.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              Can any dog become a Service Dog?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              Not all dogs are cut to become Service Dogs and many washout, so you should be emotionally prepared should
              your dog not work out. Under the law it is permissible for individuals to train their own Service Dog,
              however, we recommend you still work with a private trainer or get a dog from an organization that
              provides fully trained service dogs if you don't have experience training animals.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              Can a dog be too big or too small?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              Depending on the type of disability, the tasks that a Service Dog needs to perform, the living situation
              of a handler, their employment environment and a myriad of other factors, a disabled individual may choose
              to be partnered with a small, medium or large dog. For example, an individual with hearing loss who lives
              in a third floor apartment may choose a small breed as their Service Dog. An individual with early stage
              multiple sclerosis may choose a large breed because they anticipate future physical limitations such as
              balance or mobility issues.
              <span class="br" />
              The ADA does not restrict the type, size or breed of dog that can be a Service Animal. A service animal
              may not be excluded based on assumptions or stereotypes about the animal's breed or how the animal might
              behave. However, if a particular service animal behaves in a way that poses a direct threat to the health
              or safety of others, has a history of such behavior, or is not under the control of the handler, that
              animal may be excluded. If an animal is excluded for such reasons, staff must still offer their goods or
              services to the person without the animal present.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              Can cities ban certain breeds?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              No. Municipalities that prohibit specific breeds of dogs must make an exception for a service animal of a
              prohibited breed, unless the dog poses a direct threat to the health or safety of others. Under the
              “direct threat” provisions of the ADA, local jurisdictions need to determine, on a case-by-case basis,
              whether a particular service animal can be excluded based on that particular animal’s actual behavior or
              history, but they may not exclude a service animal because of fears or generalizations about how an animal
              or breed might behave. It is important to note that breed restrictions differ significantly from
              jurisdiction to jurisdiction. In fact, some jurisdictions have no breed restrictions.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              Should there be government mandated Service Dog testing or certification?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              While this question sounds simple at first, once you start looking deeper, it's far more complex than most
              would assume — and has been already extensively considered by the United States Department of Justice,
              major service dog training organizations, disability advocates, highly experienced Service Dog handlers,
              professional trainers, the public, lawyers, healthcare professionals and more.
              <span class="br" />
              When the United States Department of Justice revised the ADA, Service Dog handlers, trainers, the public,
              lawyers, healthcare professionals and more all worked together very hard to carefully craft the revised
              legislation. At its heart, the ADA is designed to level the playing field for disabled individuals, to
              give them the same level of access as any abled body person has.
              <span class="br" />
              With standardized rules and requirements would come some sort of identification either in the form of
              patches, vests or identification cards — and they would have to be furnished on-demand at any time to
              anyone who demands to see it. If only the police are allowed to ask then the police would be called on
              Service Dog teams all the time. Service Dog handlers would be stopped everywhere and asked to show proof
              of training, ID, microchipping, collar tags or whatever form of ID is decided.
              <span class="br" />
              Then there is the question of who would pay for Service Dog testing? Many disabled handlers have no, low
              or limited income and many are rural. What if there is no testing agency or agent nearby? Do taxpayers pay
              for travel and/or testing? Perhaps someone could hire a local dog trainer to administer a test. But anyone
              can call themselves a dog trainer. Some of the best trainers have no formal schooling or certifications.
              <span class="br" />
              Furthermore, most experienced trainers and legitimate members of the Service Dog community agree that
              there is not an appropriate one-size-fits-all test for every handler, dog and/or disability combination.
              In fact, the main test used to judge the proficiency of Service Dogs, the Public Access Test, is not
              intended to certify any animal.
              <span class="br" />
              Every organization that provides a Public Access Test, including ADI, IAADP and others, make it clear that
              passing their test does not mean they (nor we) “certify” your dog — and nor is certification recognized
              under federal law. While some trainers and organizations may “certify" graduates, that status is something
              granted by them and is not recognized under the law or necessarily by other trainers.
              <span class="br" />
              Most people who are partnered with service dogs have explored dozens of other paths to find independence
              and many have literally nowhere else to turn for help. The ADA is written this way because those who
              created this law realized cruelest possible thing to Service Dog handlers would be to take this vital tool
              away from them and place it behind a barrier.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              What is the ADA?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              <span style="font-weight: 600">The Americans with Disabilities Act (ADA)</span> is a civil rights law that
              prohibits discrimination against individuals with disabilities in all areas of public life, including
              jobs, schools, transportation, and all public and private places that are open to the general public. The
              purpose of the law is to make sure that people with disabilities have the same rights and opportunities as
              everyone else. The ADA gives civil rights protections to individuals with disabilities similar to those
              provided to individuals on the basis of race, color, sex, national origin, age, and religion. It
              guarantees equal opportunity for individuals with disabilities in public accommodations, employment,
              transportation, state and local government services, and telecommunications. The ADA is divided into five
              titles (or sections) that relate to different areas of public life.
              In 2008, the Americans with Disabilities Act Amendments Act (ADAAA) was signed into law and became
              effective on January 1, 2009. The ADAAA made a number of significant changes to the definition of
              “disability.” The changes in the definition of disability in the ADAAA apply to all titles of the ADA,
              including Title I (employment practices of private employers with 15 or more employees, state and local
              governments, employment agencies, labor unions, agents of the employer and joint management labor
              committees); Title II (programs and activities of state and local government entities); and Title III
              (private entities that are considered places of public accommodation).
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel id="public_access_test">
            <v-expansion-panel-header class="faq-header">
              What is a Service Dog Public Access Test?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              <p>
                The Service Dog community considers a Public Access Test (PAT) the best tool for evaluating a team's
                readiness to graduate or finish formal training. There are several versions of the PAT available. Most
                PATs are relatively similar, although some are specific to the organization or trainer administering the
                test.
                You may use the
                <router-link to="/learn-more/sds-training-and-behavior-standards">
                  Service Dog Standards Public Access Test (SDSPAT)
                </router-link>,
                the PAT from Assistance Dogs International (ADI), the International Association of Assistance Dog
                Partners (IAADP) or other reputable organization.
              </p>

              Passing any PAT is not required by law. This is because most experienced trainers and legitimate members
              of the Service Dog community agree that there is not an appropriate one-size-fits-all test for every
              handler, dog and/or disability combination.
              <span class="br" />
              Every organization that provides a Public Access Test, including ADI, IAADP and others, make it clear that
              passing their test does not mean they (nor we) “certify” your dog — and nor is certification recognized
              under federal law. While some trainers and organizations may “certify" their graduates, that status is
              something granted by them and is not recognized under the law or necessarily by other trainers.
              <span class="br" />
              Under the law, individuals are legally allowed to train their own Service Dog. As well, there are no
              mandatory regulations for dog trainers. Some of the most qualified and experienced dog trainers do not
              have a formal background. Please do your research and look for recommendations when selecting a trainer or
              training organization.
              <span class="br" />
              Whichever PAT you choose to use, every version recommends you have reputable trainer, friend, family
              member or other witness watch you complete the test and, preferably video record it and/or sign a printed
              copy of the test to have as part of your records.
              <span class="br" />
              Service Dog Standards includes successful completion of a Public Access Test as part of our standards.
              Furthermore, our expectations go beyond just passing the PAT. We also require adherence to specific
              training and behavioral standards on the part of the hander and dog.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header class="faq-header">
              Can someone train their own dog?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              It is permissible to train your own dog. However fully training a Service Dog requires hundreds of hours
              of hard work. Not all dogs are cut out for this type of work and many washout, so you should be
              emotionally prepared should your dog not work out. Under the law it is permissible for individuals to
              train their own Service Dog, however, we recommend you still work with a private trainer or get a dog from
              an organization that provides fully trained service dogs if you don't have experience training animals.
              <span class="br" />
              If you don't already have a list of specific trained tasks, the first thing you should do is sit down and
              write out a list of specific things you would like your dog to perform. Tasks or work should be things
              that are physically necessary. Under the law, people are allowed to ask you what specific physical tasks
              your dog performs and you should be prepared to explain. Providing comfort, emotional support, guarding or
              protection duties are not qualifying tasks.
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel id="how_do_i_find_trainer">
            <v-expansion-panel-header class="faq-header">
              How do I find a Service Dog trainer?
            </v-expansion-panel-header>
            <v-expansion-panel-content class="faq-body">
              Depending on your disability, you may wish to search for trainers or organizations that specialize in
              training animals for tasks related to the type of disability you have. Organizations often have waiting
              lists, some may charge nothing, others may charge $20,000 or more depending on a variety of factors.
              <span class="br" />
              You can also find an independent trainer locally or by searching through:
              <span class="br" />
              <router-link to="/findTrainers">
                The Service Dog Standards Resource Directory
              </router-link><br>
              <a href="https://nadoi.org/">The National Association of Obedience Dog Instructors</a><br>
              <a href="https://www.ccpdt.org/">Certification Council for Professional Dog Trainers</a><br>
            </v-expansion-panel-content>
          </v-expansion-panel>

        </v-expansion-panels>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "FAQ",
    data() {
      return {
        overline: 'About us',
        page_title: 'Common Questions',
        page_description: '<h3 class="heading-color-default">Service Dogs Save Lives and Make Independent Living Possible</h3>',
        header_image: '../learnMore/images/iStock-953742852.jpg',
        section_01_body_col1: '<section class="txt-box-side"><h4 class="copy-title pb-4">Finding Independence</h4><p>Most people who are partnered with Service Dogs have explored dozens of other paths to find independence and many have literally nowhere else to turn for help.</p></section>',
        section_01_body_col2: '<section class="txt-box-side"><h4 class="copy-title pb-4">Indepenent Living</h4><p>Service Dogs are capable of performing small and large tasks at any time day or night, making independent living possible.</p></section>',
        section_01_body_col3: '<section class="txt-box-side"><h4 class="copy-title pb-4">Simple to Complex Tasks</h4><p>Service Dogs can be trained to help people with the simplest tasks — such as picking up a medicine bottle — or the most complex — like keeping someone from spiraling out of control during an episode of PTSD in the middle of the night.</p></section>',
        
        section_02_title: '<h2 class="text-white pb-16">Frequently Asked Questions</h2>',
        /* Bottom section Dark gradient:: */
        section_04_title: "Title",
        section_04_body: '<section class="theme-dark pb-4"><div class="dot full-width mb-8"></div><p class="text-white">Body content.</p><div class="dot full-width mt-8"></div></section>',
        cta_join_today: '<a data-v-3dd2e005="" href="/signup" class="v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--dark v-size--default" style="padding:0 16px"><span class="standard-button-label text-dark">Join today</span></a>',
        open_section: null,
        //note need to add id to section element with key for scrolling
        section_map: {
          accept_standards_make_service_dog: 0,
          license_test_for_service_dog: 2,
          landlord_rights: 4,
          doctors_letter: 7,
          public_access_test: 13,
          how_do_i_find_trainer: 15
        }
      };
    },
    mounted() {
      try {
        this.$store.commit("set_show_side_nav", false);
        let sec = this.$route.params.section;
        if (sec) {
          this.open_section = this.section_map[sec];
          let el = document.getElementById(sec);
          setTimeout(() => {
            el.scrollIntoView()
          }, 1000)
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
</script>

<style scoped src="../common.css" />

<style scoped>
div > .v-expansion-panels {
  display: block;
  border-radius: 12px;
}
div > .v-expansion-panel{
  display: flex;
  flex-direction: column;
  min-height: 64px;

}
div > .v-expansion-panel::before{
    box-shadow: none !important;
}
.v-expansion-panel-header {
  min-height: 64px;
}
</style>