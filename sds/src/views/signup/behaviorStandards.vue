<template>
  <div style="justify-content: flex-start;  ">
    <v-stepper
      v-model="step"
      alt-labels
      style="height: 100%;  padding-bottom: 80px; background-color: white "
    >
      <v-stepper-header>
        <v-stepper-step
          v-for="i in 20"
          :key="i+'step-header'"
          :complete="accepted[i]"
          :step="i"
          :editable="false"
          edit-icon="$complete"
        />

        <!--            <v-divider></v-divider>-->
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="pa-2 step-content">
            <h2 class="step-heading">
              Training &amp; Behavior Standards
            </h2>
            <p>Service Dog Standards is comprised of a group of trainers and handlers who are trying to do the right thing by voluntarily choosing to hold themselves and their dogs to a higher standard which goes above and beyond the law.</p>

            <p>Our purpose is to create a powerful personal identification, record keeping, reference, information and educational tool for all Service Dog handlers regardless of certification levels, training methods or other affiliations.</p>

            <p>We hope to add clarity to the process of training and partnering with a Service Dog by outlining some of the more confusing parts of the process step-by-step.</p>
          </div>

          <div class="btn-container">
            <v-btn
              color="primary"
              dark
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>



        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="2">
          <div class="pa-2 step-content">
            <h2>Please read each page carefully</h2>
            <p>Service Dog Standards represents community-defined training and behavior standards for handlers and their Service Dogs.</p>

            <p>Accepting these standards is a way of voluntarily holding yourself and your animal to a higher standard which goes above and beyond the law. Under the law the only requirement for a Service Dog is that they be specifically trained to perform tasks or work for a disabled individual who would otherwise have difficulty accomplishing those tasks on their own due to their disability. Emotional support or other behaviors that a dog does naturally, while they may be beneficial and even help mitigate a disability, should not be included when naming trained work or tasks.</p>

            <h3>WARNING</h3>
            <p>
              Simply having a disability is not enough to qualify a pet as a Service or Assistance Dog. Those who pretend that they are disabled or that their pet is a Service Dog so that they may gain entry to areas where the public is normally allowed to go, enter restaurants, fly in-cabin on an airplane, stay in a hotel, apartment or condominium — or test the boundaries of what is legal or ethical are breaking the law and should exit now. There are legal options for traveling and living with your dog. If you need to learn more, there are training and educational resources on this website, <a
                href="https://servicedogstandards.org"
                target="_blank"
              >ServiceDogStandards.org</a> and at <a
                href="https://anythingpawsable.com"
                target="_blank"
              >AnythingPawsable.com</a>
            </p>
          </div>
          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>


        <!--------------------------step------------------------------------------------------------------------------->

        <v-stepper-content step="3">
          <div class="pa-2 step-content">
            <h2>Leave nothing but an excellent impression</h2>

            <p>Owning and using a Service or Assistance Dog is a privilege, covered under the law, for disabled individuals who use a dog to help them complete specific tasks or work they would otherwise have difficulty performing on their own. It also comes with great responsibility. </p>

            <p>Service and Assistance Dogs teams have been granted their rights based on their excellent behavior, politeness, public conduct and the necessary, beneficial and functional tasks the dogs perform for their disabled owners. </p>
          </div>
          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="4">
          <div class="pa-2 step-content">
            <h2>Having a Service Dog does not always make life easier</h2>
            <p>Since the beginning of time, disabled individuals have been discriminated against and judged for a wide variety of reasons by family, friends, strangers, landlords, employers and even other individuals who are disabled. Having a Service Dog may add other layers of complications.</p>

            <p>This is especially true for those who have invisible disabilities, a disability which will intensify over time or one that has intermittent flare-ups where some days are better than others. Keep in mind that not everyone who uses a Service Dog needs their dog all the time, much like someone with a physical disability who uses a wheelchair may have less pain and may be able to walk or stand at times.</p>

            <h3>Discrimination often comes from well-intentioned "gatekeepers."</h3>

            <p>
              Discrimination is most often veiled as a well-intentioned effort to protect or defend those deemed "truly disabled" or more deserving of a Service Dog. Today, social media provides a method for people to judge others more freely from behind a computer or smartphone screen.
            </p>
            <p>Self-appointed and well-intentioned gatekeepers often say things like, "you don't look disabled!" or encase their judgment in made-up rules such as, "your dog is too small/too big/not the right breed to be a Service Dog" and more.</p>

            <h3>Having a disability may make caring for a Service Dog more difficult.</h3>
            <p>There are a lot of costs to having a Service Dog, from training to veterinary costs and more. Your own physical limitations may make daily care, from potty breaks to grooming more burdensome. If you have psychological challenges, you may encounter additional and unforeseen stress. Please make sure you are capable, both physically and mentally, for the demands of partnering with a Service Dog.</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="5">
          <div class="pa-2 step-content">
            <h2>Being disabled isn’t enough</h2>

            <p>Many disabled people have pets. A Service or Assistance Dog is distinguished from a pet by the specific work or tasks they have been trained to complete. A Service or Assistance Dog is individually trained to complete identifiable work or tasks that its disabled owner has trouble completing for him or herself. </p>
            <p>In other words, simply having a disability is not enough to qualify a pet as a Service or Assistance Dog. While it is illegal for someone to ask about your disability, they may ask what tasks or work your dog has been trained to complete.</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>



        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="6">
          <div class="pa-2 step-content">
            <h2>It’s about personal responsibility</h2>

            <h3>Every individual is responsible for their own actions. </h3>
            <p>If an individual or their animal causes damage or is disruptive, the same logic and laws apply as if they had a wheelchair, a child or other person under their supervision — or no disability at all. Damage or disruptive behavior should be dealt with as if it was done by any adult or child. Every Service Dog handler is solely responsible for their actions. </p>

            <h3>It is not appropriate to blame any group of people as a whole for the actions of a few, whether by race, nationality, religion, ability or disability.</h3>

            <p>We, nor any federal or local law, nor any Service Dog training organization, private trainer nor God himself can prevent any individual from doing the wrong thing. For example, driver’s licenses, which are highly regulated through mandatory driver’s education, recurring printed tests and in-vehicle exams do not prevent individual drivers from speeding or other violations.</p>

            <p>Simply accepting these training and behavior standards does not qualify an animal or an individual as a Service Dog Team or provide any special rights, legal or otherwise. If you are found not to comply with our training or behavior standards we can and will suspend or remove your account.</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="7">
          <div class="pa-2 step-content">
            <h2>Service Dogs may be trained to help people with visible and invisible disabilities</h2>

            <p>Service and Assistance Dogs can be trained to complete work or tasks that help people with visible and invisible disabilities associated with many diagnoses, including but not limited to:</p>
            <ul>
              <li>Arthritis (severe)</li>
              <li>Ataxia (poor balance)</li>
              <li>Autism or Autism Spectrum</li>
              <li>Blindness or Impaired Vision</li>
              <li>Cardio/Pulmonary Disease</li>
              <li>Cerebral Palsy</li>
              <li>Deafness or Impaired Hearing</li>
              <li>Diabetes</li>
              <li>Life Threatening Allergies/Anaphylaxis</li>
              <li>Multiple Sclerosis (M.S.)</li>
              <li>Medical Alert or Response </li>
              <li>Neurological Disorders</li>
              <li>Physical Mobility Issues</li>
              <li>Psychiatric Disabilities</li>
              <li>Seizure Disorders (Epilepsy)</li>
              <li>Spina Bifida</li>
              <li>Spinal Cord/Head Trauma</li>
              <li>Mobility Issues</li>
              <li>Stroke</li>
            </ul>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="8">
          <div class="pa-2 step-content">
            <h2>How does the ADA define a Service Animal?</h2>

            <p>According to the Americans with Disabilities Act: "§ 35.104 Definitions. Service animal means any dog that is individually trained to do work or perform tasks for the benefit of an individual with a disability, including a physical, sensory, psychiatric, intellectual, or other mental disability."</p>

            <p>
              Only dogs (and miniature horses) are allowed
              "Other species of animals, whether wild or domestic, trained or untrained, are not service animals for the purposes of this definition."
            </p>

            <h3>The work or tasks performed by a service animal must be directly related to the individual's disability.</h3>
            <p>"Examples of work or tasks include, but are not limited to, assisting individuals who are blind or have low vision with navigation and other tasks, alerting individuals who are deaf or hard of hearing to the presence of people or sounds, providing non-violent protection or rescue work, pulling a wheelchair, assisting an individual during a seizure, alerting individuals to the presence of allergens, retrieving items such as medicine or the telephone, providing physical support and assistance with balance and stability to individuals with mobility disabilities, and helping persons with psychiatric and neurological disabilities by preventing or interrupting impulsive or destructive behaviors. </p>

            <p>The crime deterrent effects of an animal's presence and the provision of emotional support, well-being, comfort, or companionship do not constitute work or tasks for the purposes of this definition."</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="9">
          <div class="pa-2 step-content">
            <h2>What two types of working dogs are most often confused with Service Dogs?</h2>

            <p>Much of the confusion around Service Dogs comes from professional journalists, television, movies, social media posts, bloggers, online videos or misleading websites and products. Even some professional dog trainers, dedicated puppy raisers, physicians, therapists and other career professionals sometimes add to the confusion. However, it is not complicated and it is extremely important to use the proper terms.</p>

            <h3>Emotional Support Animals (ESAs) are not Service Dogs </h3>
            <p>ESAs are an important type of working dog which provide a calming influence and comfort to their owner. They do not require any special training but should be well behaved. </p>

            <p>Some confusion arises because Service Dogs also provide emotional support, but since providing emotional support is not a trained task, it should not be mentioned when describing the tasks a Service Dog is trained to perform. We will talk more about this later.</p>

            <p>Individuals who use Emotional Support Animals are not entitled under the ADA to bring their animals into public areas such as restaurants and stores. ESAs may be allowed in housing under the Fair Housing Act with a letter from a physician or counselor.</p>

            <h3>Therapy Dogs are not Service Dogs </h3>
            <p>Therapy Dogs are trained to help and comfort people other than their owners. Those they help and comfort may or may not be disabled. They can help teach, lift spirits, assist with physical and emotional rehabilitation and more. Therapy Dog handlers are not covered by the ADA and are not entitled to public access.</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="10">
          <div class="pa-2 step-content">
            <h2>What are some other examples of working dogs that are NOT Service Dogs?</h2>

            <p>A properly educated Service Dog or Working Dog handler should never refer to their animal as a "pet."</p>

            <h3>Companion Animals</h3>
            <p>"Companion Animal" is generally considered another way to describe a pet.</p>

            <h3>Comfort Animals </h3>
            <p>"Comfort Animal" is synonymous with "Emotional Support Animal."</p>

            <h3>Facility Dogs</h3>
            <p>"Facility Dogs" are a type of Therapy Dog which work for a specific facility like a courthouse or school.</p>

            <h3>Forensic Dogs</h3>
            <p>Also known as "Cadaver Dogs," these dogs are trained to help sniff out human remains at a crime scene or natural disaster.</p>

            <h3>Military Working Dogs</h3>
            <p>These dogs are partnered with a soldier and may perform a wide variety of jobs on and off the battlefield.</p>

            <h3>Police Dogs</h3>
            <p>These dogs are partnered with a law enforcement officer and may be trained to sniff out drugs or narcotics, apprehend suspects and more.</p>

            <h3>Search and Rescue Dogs</h3>
            <p>These dogs are trained to help find missing children or adults in urban, rural or natural areas using tracking or trailing skills.</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="11">
          <div class="pa-2 step-content">
            <h2>What makes a dog a Service Dog?</h2>
            <p>Legally, the only requirement for a Service Dog is that they be specifically trained to perform tasks or work for a disabled individual which they would otherwise have difficulty accomplishing on their own due to their disability. Please note that "tasks" is plural, meaning that the ADA requires at least two tasks.</p>

            <h3>What is task or work training?</h3>
            <p>Task or work training is the process by which a dog is specifically taught a behavior or task through rewards, praise or corrections. Methods may include using treats, clicker training or praise. Natural dog behavior such as protectiveness, barking, licking or comforting an owner are not considered appropriate tasks or work under the ADA, even if those actions help the disabled owner — unless they are trained to reliably perform on command, physical behavior related to your disability or cue.</p>
            <h3>What are work or tasks?</h3>
            <p>Work or tasks are chores or behaviors that a Service or Assistance Animal performs, on command or cue, to help a disabled person with something that they can not easily do for themselves.</p>
            <p>Work or tasks must also be quantifiable in some way, such as fetching a medicine bottle for someone who is having a seizure, redirecting someone who is having a panic attack with nudging, pawing or licking, opening doors or drawers for someone who has physical mobility issues or alerting on glucose levels for a diabetic.</p>
            <p>Examples of some things that would NOT be an appropriate task would be simply providing companionship, guarding, protecting or even tasks performed merely for convenience.</p>

            <p><strong>Our guideline is that a Service Dog must be able to complete two or more tasks or work that are directly related to an individual's disability. You must be prepared to explain these if someone asks.</strong></p>

            <p>
              If you need to learn more, there are training and educational resources on this website, <a
                href="https://servicedogstandards.org"
                target="_blank"
              >ServiceDogStandards.org</a> and at <a
                href="https://anythingpawsable.com"
                target="_blank"
              >AnythingPawsable.com</a>
            </p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="12">
          <div class="pa-2 step-content">
            <h2>The Public Access Test</h2>
            <p>
              The Service Dog community considers the best tool for evaluating a team's readiness to graduate or
              finish formal training is a Public Access Test or PAT.  There are several versions of a PAT available
              and they are all relatively similar. You may use the
              <a
                href="/downloads/Service_Dog_Standards_Public_Access_Test_SDSPAT-A21.pdf"
                target="_blank"
              >
                Service Dog Standards Public Access Test (SDSPAT)
              </a>
              or you may use PATs from Assistance Dogs International (ADI), the International Association of
              Assistance Dog Partners (IAADP) or other reputable organizations. Please note that passing a PAT
              is NOT required by law.
            </p>

            <p>
              <strong>
                Every organization that provides a Service Dog Public Access Test makes it clear that passing their test does not mean they (nor we) "certify" your dog — and nor is certification recognized under federal law.</strong>
            </p>

            <p>While some trainers and organizations may "certify" their graduates, that status is something granted by them and is not recognized under under the law or necessarily by other trainers.</p>

            <p>Having a video recording of your animal passing the test is the most recommended way to document your PAT, however you may also have a trainer sign off on a printed copy of the test. </p>

            <p>Our standards include the PAT and go beyond, requiring specific training and behavior standards on the part of the handler and animal.</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="13">
          <div class="pa-2 step-content">
            <h2>How should you interact with the public?</h2>

            <p>Under the ADA law Service Dog owners are to be taken at their word and no proof of certification, training, licensing or identification such as vests, capes, patches or collar tags are required for public access. In short, the only proof a disabled individual needs to provide for their Service Dog is verbal. This is important because it allows disabled individuals to go about their day like everyone else. Without this important provision, disabled individuals could (and would) be stopped any time, anywhere and by anyone and demanded to show some form of paperwork, identification or proof of training. </p>

            <p>Most Service Dog training organizations provide ID cards and/or a canine vest and/or patches for their teams. Some Service Dog owners choose to provide a vest for their dog, use a special harness, carry identification cards, etc. in order to reduce conflict.</p>

            <p>Please do not automatically flash doctor's notes, training documentation or identification as it may give the impression that documentation or paperwork is required, thus making it more difficult for the next Service Dog team. Please try to explain the law first.</p>

            <h3>Section § 35.136 Service animals part "f" of the Americans with Disabilities Act says:</h3>

            <p><strong>(f) Inquiries. A public entity shall not ask about the nature or extent of a person's disability, but may make two inquiries to determine whether an animal qualifies as a service animal. A public entity may ask if the animal is required because of a disability and what work or task the animal has been trained to perform. A public entity shall not require documentation, such as proof that the animal has been certified, trained, or licensed as a service animal. Generally, a public entity may not make these inquiries about a service animal when it is readily apparent that an animal is trained to do work or perform tasks for an individual with a disability (e.g., the dog is observed guiding an individual who is blind or has low vision, pulling a person's wheelchair, or providing assistance with stability or balance to an individual with an observable mobility disability). </strong></p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="14">
          <div class="pa-2 step-content">
            <h2>What can the public ask you?</h2>

            <p>Under federal law, members of the public are allowed to ask you two questions:</p>

            <ol class="text-left">
              <li>Is this a service dog?</li>
              <li>What work or tasks has this dog been trained to perform?</li>
            </ol>

            <p>While the law states that if you have an observable disability you are generally not required to answer these questions, please be aware that you may still be requested to answer these questions if the person asking does not notice — or does not claim to notice — your disability.</p>

            <h3>What if describing the tasks or work my dog is trained to perform reveals my disability?</h3>
            <p>This is one of the most common challenges for new and experienced Service Dog handlers alike. While under the law members of the public are prohibited from asking you about your disability, describing the tasks or work your dog performs sometimes ends up revealing the nature of your disability. This may be unavoidable, however you are not required to discuss your disability beyond describing the tasks or work your dog performs.</p>

            <p>In other words, under federal law you must be prepared to describe some of the necessary tasks or work your dog is trained to perform, EVEN IF DESCRIBING THOSE TASKS OR WORK REVEALS THE NATURE OF YOUR DISABILITY.</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="15">
          <div class="pa-2 step-content">
            <h2>What are not considered Service Dog tasks or work?</h2>

            <p>There is a lot of confusion about how to describe tasks or work a Service Dog is trained to perform - even among experienced Service Dog trainers and handlers.</p>

            <p>
              The ADA is clear: Service Dogs must be specifically trained to perform tasks or work for a disabled individual who would otherwise have difficulty accomplishing on their own due to their disability - and you should be prepared to describe some of those tasks. Unfortunately, pop culture including television shows, poorly written news articles and social media have led to some needless confusion.
            </p>
            <p>First, let’s talk about what are <strong>NOT</strong> trained tasks or work.</p>

            <h3>Natural behaviors are NOT trained tasks</h3>
            <p>Anything your dog does naturally or has taught itself to do does not qualify as a task or work. As well, any behavior that most dogs do naturally does not qualify as a task or work under the law. To be clear, this is not our rule or guideline. This is how it is defined by federal law.</p>

            <p>Emotional support, providing comfort or companionship are examples of behaviors most dogs do naturally. While natural behaviors may be beneficial and even help mitigate a disability, <strong>they should not be included when naming trained work or tasks. </strong></p>

            <p><strong>Guard dog behaviors, crime deterrent behaviors including intimidation or aggression, are also prohibited.</strong></p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="16">
          <div class="pa-2 step-content">
            <h2>How should you describe Service Dog tasks or work?</h2>

            <p>Properly describing the tasks or work that a dog is trained to perform is often difficult and awkward for even the most experienced Service Dog handler. Often, describing the tasks your dog has been trained to perform may reveal your disability, which can be embarrassing. </p>

            <p>As well, being stopped and questioned about your dog can be tiresome, especially if you are exhausted, under stress, are having a painful flare-up related to your disability or have had to do it several times that day already.</p>

            <p>However, simply saying "I am blind" or "I have multiple sclerosis" or "I have PTSD" or "my dog is a medical alert dog" or "my dog helps me with panic attacks" or similar things do <strong>NOT</strong> describe tasks or work.</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>


        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="17">
          <div class="pa-2 step-content">
            <h2>Choose to share trained tasks or work that are directly related to your disability</h2>

            <p>Most disabled individuals who use a Service Dog have trained their animal in a variety of tasks to assist with their disability. However, describing some tasks or work may be more embarrassing than others.</p>

            <h3>Always remain calm and polite.</h3>
            <p>Remember, you and your Service Dog may be the first team that someone ever meets. It is up to you to make sure that you leave them with an excellent impression. </p>

            <h3>Phrase your tasks in a professional way.</h3>
            <p>Work or tasks are chores or behaviors that a Service Dog is trained to perform, on command or cue, to help a disabled person with something that they can not easily do for themselves due to their disability.</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="18">
          <div class="pa-2 step-content">
            <h2>Describe your tasks properly by saying, "my Service Dog is trained to…"</h2>

            <p>Work or tasks must be quantifiable in some way and described clearly, such as:</p>

            <ul>
              <li><strong>My Service Dog is trained to</strong> fetch medicine on command or on cue during a seizure (or episode).</li>
              <li><strong>My Service Dog is trained to</strong> alert to the presence of life threatening allergens.</li>
              <li><strong>My Service Dog is trained to</strong> open doors or drawers when I am unable.</li>
              <li><strong>My Service Dog is trained to</strong> alert on my blood glucose levels.</li>
              <li><strong>My Service Dog is trained to</strong> provide deep pressure therapy during a panic attack.</li>
              <li><strong>My Service Dog is trained to</strong> interrupt / nudge / lick me if I display panic or freezing behavior.</li>
              <li><strong>My Service Dog is trained to</strong> fetch someone to help me if necessary.</li>
              <li><strong>My Service Dog is trained to</strong> pick things up for me if I am unable.</li>
              <li><strong>My Service Dog is trained to</strong> alert me to specific sounds I have trouble hearing.</li>
              <li><strong>My Service Dog is trained to</strong> wake me from nightmares or night terrors.</li>
              <li><strong>My Service Dog is trained to</strong> paw me when I'm experiencing a panic attack (or episode).</li>
              <li><strong>My Service Dog is trained to</strong> ground me if I display a compulsive behavior.</li>
              <li><strong>My Service Dog is trained to</strong> guide me to a safe place during an episode.</li>
              <li><strong>My Service Dog is trained to</strong> guide me through areas that have low light.</li>
              <li><strong>My Service Dog is trained to</strong> alert me to sounds I'm unable to hear.</li>
            </ul>


            <p class="mt-4">
              Again, if you partner with a Service Dog you must be prepared and willing to clearly describe some of the tasks or work your dog is trained to perform, <strong>even if doing so reveals the nature of your disability</strong>. If you need more clarification, please exit now and seek a local Service Dog trainer for help.
            </p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content step="19">
          <div class="pa-2 step-content">
            <h2>Your dog's behavior and appearance</h2>


            <h3>Your dog's behavior </h3>

            <p>You and your Service Dog must be on your best behavior and display excellent social skills at all times. </p>

            <ul>
              <li>No aggressive behavior toward people or other animals; no biting, no snapping, no growling, no mounting, no lunging and/or aggressive barking.</li>
              <li>No begging for food, eating table scraps, or petting from other people.</li>
              <li>No sniffing merchandise or people who pass by.</li>
              <li>No overly excited or hyper behavior.</li>
              <li>No urinating or defecating in public unless given a command/signal to eliminate in an appropriate place.</li>
              <li>No riding in grocery carts, even if something is covering the cart. </li>
              <li>No sitting or laying on chairs, benches or surfaces other than the floor in public places.</li>
            </ul>


            <h3 class="mt-4">
              Your dog's appearance
            </h3>

            <p>Your dog should be clean and appear well-groomed at all times. It is important to appear professional whenever you are in public.</p>
          </div>

          <div class="btn-container">
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              @click="accept"
            >
              Accept
            </v-btn>
          </div>
        </v-stepper-content>

        <!--------------------------step------------------------------------------------------------------------------->
        <v-stepper-content
          v-if="isTrainer"
          step="20"
        >
          <div class="pa-2 step-content">
            <h2>Service Dog Standards Trainer Oath</h2>

            <p style="font-weight: bold">
              As a Service Dog Standards Trainer, I will do my best to:
            </p>
            <ul>
              <li>Do no harm to my humans or canine clients.</li>
              <li>Train potential Service Dog owners to become the best dog handler they can be.</li>
              <li>Pursue my work in an ethical manner and behave with integrity.</li>
              <li>Safeguard my client’s private disability information.</li>
              <li>Manage my Service Dog training practice in good faith.</li>
              <li>Understand and uphold, both in letter and in spirit, Service Dog Standards and all applicable laws.</li>
              <li>Take responsibility for my actions and represent the promises of my training practice accurately and honestly.</li>
              <li>Develop both myself and other Service Dog trainers under my supervision to grow and contribute to the well-being of society.</li>
              <li>This oath I make freely, and upon my honor.</li>
            </ul>
          </div>



          <div style="display:flex; justify-content: center">
            <v-checkbox
              v-model="accept_all"
              label="I Accept Training &amp; Behavior Standards Agreement"
            />
          </div>

          <!--               <p class="text-center">By clicking "I agree" you are agreeing to all of the above as well.</p>-->

          <div
            class="btn-container"
            style="margin-top: -20px"
          >
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              :disabled="!agreedToAll"
              @click="join"
            >
              Accept Agreement
            </v-btn>
          </div>
        </v-stepper-content>



        <v-stepper-content
          v-else
          step="20"
        >
          <div class="pa-2 step-content">
            <h2>Your behavior matters too</h2>

            <p>Please be polite, courteous and respectful at all times. Remember that not everyone you encounter will be knowledgeable about Service Dogs, your rights or the ADA.</p>
            <p>Be prepared to explain what tasks your dog is trained to complete to help manage your disability. You do not need to explain your disability. Keep in mind that the impression you leave with someone may be their only experience with a Service or Assistance Dog team.</p>
            <p>If we receive proof you or your animal are not behaving up to our standards, we reserve the right to suspend or remove your account at any time. </p>
            <p>It is a harsh truth that you need to be prepared for people to watch — and judge — you and your Service Dog while you are in public — and online where people often feel more free to be cruel.</p>
            <p>Please make sure the opinion they form of you will make access easier for the next Service Dog team they meet.</p>


            <!--                  <div class="form-divider mt-4 pt-2"></div>-->
            <!--                  <div class="form-check">-->
            <!--                     <input type="checkbox" class="form-check-input" id="tsagree" />-->
            <!--                     <label class="form-check-label" for="tsagree">-->
            <!--                        I Accept Training &amp; Behavior Standards Agreement-->
            <!--                     </label>-->
            <!--                  </div>-->

            <!--                  <p class="text-center">By clicking "I agree" you are agreeing to all of the above as well.</p>-->
          </div>



          <div style="display:flex; justify-content: center">
            <v-checkbox
              v-model="accept_all"
              label="I Accept Training &amp; Behavior Standards Agreement"
            />
          </div>

          <!--               <p class="text-center">By clicking "I agree" you are agreeing to all of the above as well.</p>-->

          <div
            class="btn-container"
            style="margin-top: -20px"
          >
            <v-btn
              :color="back_color"
              class="btn-back"
              @click="back"
            >
              Back
            </v-btn>
            <v-btn
              color="primary"
              :disabled="!agreedToAll"
              @click="join"
            >
              Accept Agreement
            </v-btn>
          </div>
        </v-stepper-content>




        <!--            &lt;!&ndash;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;step-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&ndash;&gt;-->
        <!--            <v-stepper-content step="21">-->
        <!--               <div class="pa-2 step-content">-->
        <!--                  <div class="form-check">-->
        <!--                     <input type="checkbox" class="form-check-input" id="tsagree" />-->
        <!--                     <label class="form-check-label" for="tsagree">-->
        <!--                        I accept the Terms and Conditions-->
        <!--                     </label>-->
        <!--                  </div>-->

        <!--                  <p class="text-center">By clicking "I agree" you are agreeing to all of the above as well as our Terms and Conditions.</p>-->

        <!--                  <button class="btn btn-pledge-exit btn-small btn-arrow-right sw-btn-prev mt-3 mr-3" type="button">Back</button>-->
        <!--                  <a runat="server" asp-page="/Dashboard/PledgeAccepted" style="display:none;" id="Continue" class="btn btn-small mt-3">I Agree</a>-->
        <!--               </div>-->

        <!--               <div class="btn-container">-->
        <!--                  <v-btn  :color="back_color" @click="back" class="btn-back">Back</v-btn>-->
        <!--&lt;!&ndash;                  <v-btn  color="primary" @click="accept"> Accept</v-btn>&ndash;&gt;-->
        <!--               </div>-->
        <!--            </v-stepper-content>-->
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import _ from "lodash";

export default {
   name: "BehaviorStandards",
   data(){
      return {

         e1: 1,
         step: 1,

         back_color: '#ffff4',

         isEditable: true, //used for debugging

         accepted: {},
         accept_all: false,

      }
   },
   computed: {
      agreedToAll(){

         // let ans = true;
         // for (let i=1; i<=20; i++){
         //    if (!this.accepted[i]){
         //       ans = false;
         //    }
         // }


         return  this.accept_all;
      },

      isMobile(){
         return this.$vuetify.breakpoint.width<500;
      },

      isTrainer(){
         return this.$auth.profile.acct_type === 'TRAINER';
      },


      // btn_text(){
      //
      //    if (this.$auth.profile.acct_active){
      //       return 'Accept'
      //    }
      //    return 'Activate Account'
      // }
   },
   methods:{


      join(){
         this.$emit('join')

      },
      back(){
         this.step -= 1;
      },
      accept(){

         this.accepted[this.step.toString()] = true;
         this.step += 1;

         setTimeout(()=>{
            window.scrollTo(0, 0); // values are x,y-offset
         }, 350)


         // if (this.isMobile){
         //    // this.$nextTick(() =>{
         //    //    window.scrollTo(0,0);
         //    // })
         //
         //    setTimeout(() =>{
         //       window.scrollTo(0,0);
         //       console.log('tried to scroll')
         //    }, 500)
         // }



      }

   },//methods

   // created() {
   //    document.getElementsByTagName("body")[0].className="noscroll";
   // },
   //
   // beforeDestroy() {
   //    document.body.removeAttribute("class","noscroll");
   // }
}
</script>

<style scoped>

/* needed because we're inside of another stepper component*/
/*div >>> .v-stepper__step{*/
/*   align-items: flex-start;*/
/*   flex-direction: row;*/
/*}*/

/*div >>> .v-stepper__content{*/
/*   padding-top:0px;*/
/*   padding-bottom:0px;*/
/*}*/

.btn-container{
   width: 100%;
   display:flex;
   justify-content: center;
   padding: 30px;
    margin-bottom: 50px;
}

.btn-back{
   margin-right: 10px;
}

.step-content{
   /*background-color: #f5f5f5;*/
}

/*h2.step-heading{*/
/*   font-size: large;*/
/*   font-weight: 600;*/
/*   color: var(--color-headline);*/
/*}*/


.step-content > h2{
    color: var(--color-headline);
   text-align: center;
   padding: 20px;
   font-size: 20pt;
   text-transform: capitalize;
}

div >>> .v-stepper__header{
   box-shadow: none;
   -webkit-box-shadow: none;
   justify-content: center;
   padding-top: 20px;
}

div >>> .v-stepper--alt-labels .v-stepper__step{
   flex-basis: 0px;
   padding: 5px;
}
</style>

<style>
.noscroll{
    position: fixed;
    overflow-x: hidden;
    overflow-y: hidden;
}

</style>
