<template>
  <div class="home">
    <Section
      background="black"
      class="image-bg"
      :style="{'background-image': `url(${require('../assets/images/content/header-background.jpg')})`}"
    >
      <div style="background-color: rgba(0,0,0,0.4);">
        <nav-bar style="max-width: 1280px; margin-left: auto; margin-right:auto" />
      </div>

      <div class=" main-heading">
        <div class="fold-content">
          <div class="fold-text">
            <img
              src="../assets/images/logo/service-dog-standards-h.png"
              style="height: 220px; margin-right: 200px"
            >

            <!--                 <div class="pt-6 pb-4" style="justify-content: flex-end; display: flex" >-->
            <!--                    <v-btn-->
            <!--                        color="var(&#45;&#45;btn-green)"-->
            <!--                        large-->
            <!--                        style="font-weight: bold; font-size: medium;"-->
            <!--                        to="/signup_old"-->
            <!--                    >Join for Free</v-btn>-->
            <!--                 </div>-->
          </div>
          <div
            class="pl-5"
            style="align-self: flex-end; margin-bottom: -6px"
          >
            <img
              src="../assets/images/content/Home-Dog.png"
              style="height: 390px"
            >
          </div>
        </div>
      </div>
    </Section>


    <!---------------------------- Overlap box ----------------------------------------------------------------------->

    <div class="fold2-container">
      <div class="fold2">
        <!--- first column with blue search box ------------------------------------>
        <div class="member-lookup-box">
          <div class="fold2-label">
            Membership Lookup
          </div>
          <my-form>
            <my-text-input
              label="Enter 10 digit membership number"
            />
          </my-form>
          <v-btn
            style="width:100%; margin-top: 10px"
            color="var(--color-btn)"
            class="white--text"
          >
            Search
          </v-btn>
          <div
            class="white--text"
            style="justify-content: flex-end; font-size:12pt; margin-top: 10px; display: flex; align-items: center"
          >
            Advanced Search
            <div class="triangle ml-2 mb-1" />
          </div>
        </div>

        <!--- 2nd  column with buttons/fold2 content ------------------------------------>
        <div style="width: 100%">
          <!----- 1st row with learn/join buttons ------>
          <v-row class="ma-0">
            <v-col>
              <v-btn
                text
                class="learn-more-btn"
              >
                Learn More
              </v-btn>
            </v-col>
            <v-col style="background-color: #e6e7e8">
              <v-btn
                text
                class="learn-more-btn"
                style="color: #39b54a;"
              >
                Join for Free
              </v-btn>
            </v-col>
          </v-row>

          <v-row class="ma-0">
            <v-col style="font-weight: 600; font-size: 14pt; color: #054e85">
              Free and voluntary training and behavior standards and team management solutions for
              Service Dog Trainers and Handlers.
              <div style="justify-content: flex-start; font-size:12pt; margin-top: 10px; display: flex; align-items: flex-end">
                Learn More
                <div
                  class="triangle ml-1 mb-1 mb-1"
                  style="border-left-color: var(--color-headline)"
                />
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>










    <!---------------------------- value prop matrix ----------------------------------------------------------------->

    <div class="matrix-container">
      <div style="max-width: var(--max-width)">
        <v-row
          class="ma-0"
          style="align-items: stretch"
        >
          <v-col>
            <home-content-box>
              <template #icon>
                <img src="../assets/images/content/CloudBased.png">
              </template>
              <template #header>
                Cloud-based, voluntary standards
              </template>
              <template #content>
                Share your acceptance of our voluntary Service Dog Standards anywhere, anytime - and
                only with those you choose.
              </template>
            </home-content-box>
          </v-col>

          <v-col>
            <home-content-box>
              <template #icon>
                <img src="../assets/images/content/Trainonyourown.png">
              </template>
              <template #header>
                Train on your own or with a trainer
              </template>
              <template #content>
                Service Dog Standards helps individual trainers, large training organizations
                and owner-trainers understand their responsibilities.
              </template>
            </home-content-box>
          </v-col>

          <v-col>
            <home-content-box>
              <template #icon>
                <img src="../assets/images/content/ForHousing.png">
              </template>
              <template #header>
                For housing, rental and lodging
              </template>
              <template #content>
                Voluntarily share peasce-of-mind with landlords, HOAs or lodging managers
                that you and your animal know how to behave well.
              </template>
            </home-content-box>
          </v-col>
        </v-row>



        <v-row class="ma-0">
          <v-col>
            <home-content-box>
              <template #icon>
                <img src="../assets/images/content/TrainingResume.png">
              </template>
              <template #header>
                Create a secure training resume
              </template>
              <template #content>
                Share important training details and documentation while still protecting
                your privacy and medical history.
              </template>
            </home-content-box>
          </v-col>

          <v-col>
            <home-content-box>
              <template #icon>
                <img src="../assets/images/content/TravelSmarter.png">
              </template>
              <template #header>
                Travel smarter with SDS
              </template>
              <template #content>
                Voluntarily accepting Service Dog Standards on behalf of yourself and your
                animal can make traveling go smoother for everyone.
              </template>
            </home-content-box>
          </v-col>

          <v-col>
            <home-content-box>
              <template #icon>
                <img src="../assets/images/content/ProSolutions.png">
              </template>
              <template #header>
                Pro Solutions for Service Dog Trainers
              </template>
              <template #content>
                Make sure your human clients understand responsibilities of Service Dog ownership.
                Manage active teams, washouts and more.
              </template>
            </home-content-box>
          </v-col>
        </v-row>
      </div>
    </div>





    <!---------------------------- Mission-------------------------------------------------------------------------------->
    <Section
      background="white"
      class="flex-container pt-8"
    >
      <div class="content-container">
        <v-card class="pa-5  ">
          <div
            style="text-align: center; font-size: 32pt"
            class="pb-3"
          >
            Our Mission
          </div>
          <p>
            <!--                 Our mission is to help bring clarity to what a service dog is and reduce abuse of ADA's service animal provisions.  We achieve this by creating service dog behavior standards that both owners and trainers of service animals can formally, but voluntarily, agree to.-->
            Our mission is to serve not only as an educational tool for the public but for Service and Assistance dog owners as well.
            We were designed with input from experienced trainers and Service Dog owners who felt that people who use Service Dogs should, at the very least, have a free and open method to voluntarily agree to a specific set of standards.
          </p>


          <div
            class="mb-5"
            :class="class_mission"
          >
            <div style="font-weight: bold">
              Our Purpose
            </div>
            <p>
              Our purpose is to allow someone the opportunity to voluntarily hold themselves and their animal accountable to a higher standard by publicly signing a specific set of training and behavior standards that goes above and beyond the law. Simply registering with us does not qualify an animal or an individual as a Service Dog Team or provide any special rights, legal or otherwise. If someone found not to comply with our training or behavior standards we can remove or suspend their registration rendering any materials they have invalid.
            </p>


            <p>
              When someone registers with us, displays a SDS patch, shares their registration number or registration card, they should be prepared that we will be notified if they do not present themselves or their dog properly or they or their dog behave in an unbecoming manner, misquote the law or the purpose of our service.
            </p>


            <p>
              At our heart, we hope to help reduce abuse of the ADA by requiring our Registrants to understand that intentionally misrepresenting an animal as Service Animal for any reason is not only unethical, it is also in violation of federal and local laws.
            </p>


            <p>
              We do not certify or authorize anyone to use a Service Animal — nor is certification required by law. The privilege to use a Service or Assistance Animal is granted, under the law, by the Americans with Disabilities Act (ADA) and local governments. If you are unsure if you qualify, please consult a local Service Dog trainer or organization. For more information, please review our five key points below.
            </p>


            <div style="font-weight: bold">
              Our Focus
            </div>
            Our focus is twofold. (1) To provide method for Registrants to formally state that they understand what is involved with training and using a Service or Assistance Animal; how important their behavior, and that of their Service or Assistance Dog, is to the general public and other Service and Assistance Animal teams; the legal definition of a Service or Assistance Animal; the Minimum Training Standards for a Service or Assistance Animal; what is involved with a Public Access Test and to accept our Terms and Conditions. (2) To provide a form of self-identification that is ONLY available behind the firewall of a strict training and behavior standards agreement.
          </div>

          <div style="text-align: center; color: var(--color-primary)">
            <span
              style="cursor: pointer;"
              @click="show_mission = !show_mission"
            >
              <span v-if="!show_mission">read more <v-icon color="var(--color-primary)"> expand_more</v-icon></span>
              <span v-else>hide <v-icon color="var(--color-primary)"> expand_less</v-icon></span>

            </span>
          </div>
        </v-card>
      </div>
    </Section>





    <!---------------------------- three columns --------------------------------------------------------------------->
    <Section
      background="white"
      flex
      class="mt-2"
    >
      <div class="content-container">
        <v-row
          class="sds-max-width"
          align="stretch"
        >
          <v-col>
            <v-card class="column-card">
              <img
                src="../assets/images/icons/checklist.png"
                style="width: 50px"
              >
              <div class="box-header">
                Behavior Standards
              </div>
              <div>
                Trainers and Handlers use Service Dog Standards as the backbone their program. Accepting these standards is a way someone to publicly hold themselves and their animal to a higher standard that goes above and beyond the law.
              </div>
              <div class="box-button">
                <v-btn
                  color="var(--color-primary)"
                  dark
                >
                  See Standard
                </v-btn>
              </div>
            </v-card>
          </v-col>



          <v-col>
            <v-card class="column-card">
              <img
                src="../assets/images/icons/dog-training.png"
                style="height: 50px"
                alt="dog training icon"
              >
              <div class="box-header">
                Solutions For Handlers and Trainers
              </div>
              <div>
                We provide our members with tools to manage their service dog from puppy, to active duty, retirement, and even a way to remember them once they pass.
              </div>

              <div class="box-button">
                <v-btn
                  color="var(--color-primary)"
                  dark
                >
                  Learn More
                </v-btn>
              </div>
            </v-card>
          </v-col>


          <v-col>
            <v-card class="column-card">
              <img
                src="../assets/images/icons/people-connection.png"
                style="width: 50px"
              >
              <div class="box-header">
                Connect
              </div>
              <div>
                Do you need to find a qualified trainer to help train your service dog to assist you with your specific disability?  We've built a tool to help trainers and handlers connect with each other.
              </div>
              <div class="box-button">
                <v-btn
                  color="var(--color-primary)"
                  dark
                >
                  Find Trainer
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </Section>


    <!---------------------------- Q & A Section --------------------------------------------------------------------->
    <Section
      background="white"
      flex
    >
      <div
        class="content-container "
        style="width: 100%;"
      >
        <v-card class="pa-5">
          <div
            style="display:flex; align-items: center"
            class="mb-5"
          >
            <img
              src="../assets/images/icons/faq.jpg"
              style="height: 50px; justify-self: flex-start;"
              alt="FAQ icon"
            >
            <span
              class="pl-5"
              style="font-size: 20pt; font-weight: bold;"
            >Quick FAQ</span>
          </div>


          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-header class="faq-header">
                Will simply accepting these standards make my dog a Service Dog?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="faq-body">
                No. Our purpose is to add clarity to the process of obtaining, training and working with a Service Dog. Accepting these standards is a way of voluntarily holding yourself and your dog to a higher standard which goes above and beyond the law. Under the law, the only requirement for a Service Dog is that they be specifically trained to perform tasks or work for a disabled individual who would otherwise have difficulty accomplishing on their own due to their disability. Emotional support or other behaviors that a dog does naturally, while they may be beneficial and even help mitigate a disability, should not be included when naming trained work or tasks.

                <br>
                Learn more
              </v-expansion-panel-content>
            </v-expansion-panel>



            <v-expansion-panel>
              <v-expansion-panel-header class="faq-header">
                Is there a Service Dog license, test, exam, evaluation, assessment, service dog certification, registration or government database?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="faq-body">
                No. There is no "formal" test for Service Dogs because the tasks Service Dogs can be trained to perform vary too widely. Furthermore, under the law it is illegal for anyone to ask for proof of training or certification. The law is written this way because otherwise disabled individuals who use Service Dogs would be stopped and forced to show paperwork everywhere they go.

                <br>
                Learn more
              </v-expansion-panel-content>
            </v-expansion-panel>


            <v-expansion-panel>
              <v-expansion-panel-header class="faq-header">
                What are my rights as a landlord or business owner?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="faq-body">
                If a person verbally claims their animal is a Service Animal, you must allow them to enter - however that does not mean it is a free-for-all. If a customer or tenant causes damage or is disruptive, the same logic and laws apply as if they had a wheelchair or no disability at all. Damage or disruptive behavior should be dealt with as if it was done by any adult or child. Every Service Dog handler is solely responsible for their actions. You may not blame any group of people as a whole for the actions of a few, whether by race, nationality, religion, ability or disability.

                <br>
                Learn more
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header class="faq-header">
                I'm disabled and I have a dog. Does that make my dog a Service Dog?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="faq-body">
                No. Many disabled people have pets. Simply having a disability is not enough to qualify a pet as a Service or Assistance Dog. Service Dogs must be trained to complete tasks or work for you would otherwise have difficulty accomplishing on your own due to your disability.

                <br>
                Learn more
              </v-expansion-panel-content>
            </v-expansion-panel>



            <v-expansion-panel>
              <v-expansion-panel-header class="faq-header">
                My dog taught itself to help me. Is that the same as training?
              </v-expansion-panel-header>
              <v-expansion-panel-content class="faq-body">
                <p>
                  No. Anything your dog does naturally or has taught itself to do does not qualify as a task or work. As well, any behavior that most dogs do naturally does not qualify as a task or work under the law.
                </p>

                <p>
                  Emotional support, providing comfort or companionship are examples of behaviors most dogs do naturally. While natural behaviors may be beneficial and even help mitigate a disability,
                  <span style="font-weight: bold">they should not be included when naming trained work or tasks.</span>
                </p>

                <p>
                  Guard dog tasks are also prohibited.
                </p>

                <br>
                Learn more
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </div>
    </Section>



    <!---------------------------- Social media Section --------------------------------------------------------------------->
    <Section
      background="white"
      flex
    >
      <div
        class="content-container "
        style="width: 100%;"
      >
        <v-card class="pa-5">
          <!--              <div style="display:flex; align-items: center" class="mb-5">-->
          <!--                 <img-->
          <!--                     src="../assets/images/icons/faq.jpg"-->
          <!--                     style="height: 50px; justify-self: flex-start;"-->
          <!--                     alt="FAQ icon"-->
          <!--                 >-->
          <!--                 <span class="pl-5" style="font-size: 20pt; font-weight: bold;" >Quick FAQ</span>-->
          <!--              </div>-->



          <v-row justify="center">
            <v-col style="display: flex; flex-direction: column; align-items: center">
              <div style="color: var(--color-headline); font-size: 16pt;">
                You're invited to connect with us!
              </div>


              <div class="social-container">
                <a href="https://www.anythingpawsable.com/">
                  <div
                    class="social-bar-container"
                    style="background-color: #44B05A"
                  >
                    <div> <img
                      src="../assets/images/icons/AP-Foot.png"
                      style="height: 20px"
                    ></div>
                    <div>Anything Pawsable</div>
                  </div>
                </a>



                <a href="https://www.facebook.com/servicedog">
                  <div
                    class="social-bar-container"
                    style="background-color: #5170AC"
                  >
                    <div> <img
                      src="../assets/images/icons/facebook.svg"
                      style="height: 20px"
                    ></div>
                    <div>Facebook</div>
                  </div>
                </a>


                <a href="https://twitter.com/servicedog">
                  <div
                    class="social-bar-container"
                    style="background-color: #EF3C23"
                  >
                    <div> <img
                      src="../assets/images/icons/youtube.svg"
                      style="height: 20px"
                    ></div>
                    <div>YouTube</div>
                  </div>
                </a>


                <a href="https://twitter.com/servicedog">
                  <div
                    class="social-bar-container"
                    style="background-color: #32C4F3"
                  >
                    <div> <img
                      src="../assets/images/icons/twitter.svg"
                      style="height: 20px"
                    ></div>
                    <div>Twitter</div>
                  </div>
                </a>


                <a href="https://www.pinterest.com/ussdr/">
                  <div
                    class="social-bar-container"
                    style="background-color: #EF3C23"
                  >
                    <div> <img
                      src="../assets/images/icons/pinterest.svg"
                      style="height: 20px"
                    ></div>
                    <div>Pinterest</div>
                  </div>
                </a>


                <a href="https://www.flickr.com/groups/servicedog">
                  <div
                    class="social-bar-container"
                    style="background-color: #CCCCCC"
                  >
                    <div> <img
                      src="../assets/images/icons/flickr.svg"
                      style="height: 20px"
                    ></div>
                    <div>Flickr</div>
                  </div>
                </a>
              </div>
            </v-col>

            <v-col>
              <!--                    <div class="fb-page" data-href="https://www.facebook.com/servicedog" data-tabs="timeline"-->
              <!--                         data-width="500" data-height="" data-small-header="false" data-adapt-container-width="true"-->
              <!--                         data-hide-cover="false" data-show-facepile="true">-->
              <!--                       <blockquote cite="https://www.facebook.com/servicedog" class="fb-xfbml-parse-ignore">-->
              <!--                          <a href="https://www.facebook.com/servicedog">Facebook</a>-->
              <!--                       </blockquote>-->
              <!--                    </div>-->

              <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fservicedog&tabs=timeline&width=500&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                width="500"
                height="300"
                style="border:none;overflow:hidden"
                scrolling="no"
                frameborder="0"
                allowTransparency="true"
                allow="encrypted-media"
              />
            </v-col>
          </v-row>
        </v-card>
      </div>
    </Section>
  </div>
</template>

<script>
// @ is an alias to /src
import LoginModal from '@/components/app/LoginModal.vue'
import Section from '@/components/Section.vue'
import NavBar from '@/components/app/NavBar.vue'

import HomeContentBox from "@/components/HomeContentBox";

export default {
  name: 'Home',
  components: {Section, NavBar, HomeContentBox },

   data(){
     return {
        show_mission: false,
     }
   },

   computed:{
      class_mission(){
        if (this.show_mission){
           return 'mission-show';
        }
        else{
           return 'mission-collapsed';
        }
     }
   },

   created(){
     this.$store.commit("set_default_nav", false)
      this.$store.commit("set_show_side_nav", false);
   },

   beforeDestroy() {
      this.$store.commit("set_default_nav", true)
   }


}
</script>


<style scoped>


.home{
   background-color: var(--color-bg);
   /*background-color: #853bcd;*/
   position: relative;
}

.image-bg{
   background-size: cover;
   background-position: center;
}


.content-container{
   max-width: 1280px;
   left-margin: auto;
   right-margin: auto;

   padding: 10px;
}



.main-heading{
   height: 400px;
   display: flex;
   align-items: flex-end;
   justify-content: center;
   /*background-image: url('../assets/images/content/math.png')*/

   /*background-size: cover;*/
   /*!*background-size: auto 100%;*!*/
   /*!*background-size: 100% auto;*!*/
   /*background-position: center;*/
}

.fold-content{
   display: flex;
   flex-wrap: nowrap;
   justify-content: center;

}

.fold-text{
   font-size: 30pt;
   margin-top: 50px;
   text-align: center;
}



/************ fold 2 box **********************************/

.fold2-container{
   display: flex;
   /*position: absolute;*/
   width: 100%;
   justify-content: center;
   margin-top: -50px;
   padding-bottom: 50px;
   padding-left: 20px;
   padding-right: 20px;

}

.fold2{
   /*max-width: var(--max-width);*/
   max-width: 1000px;
   background-color: white;
   width: 100%;
   height: 200px;
   display: flex;
   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

}


.member-lookup-box{
   height: 100%;
   width: 500px;
   padding: 15px;
   background-image: linear-gradient(to bottom, #60aee0, #2567b0);
}

.fold2-label{
   color: white;
   font-size: 14pt;

}


.learn-more-btn{
   font-size: 16pt;
   font-weight: 600;
   color: var(--color-headline);
   padding-left: 20px;
   padding-right: 10px;

}



div >>> .v-btn{
   border-radius: 0px;

}





.triangle{
   --width: 7px;
   width: 0;
   height: 0;
   border-top: var(--width) solid transparent;
   border-bottom: var(--width) solid transparent;
   border-left: var(--width) solid #ffffff;



}


/*****matrix section *********************************************/
.matrix-container{
   display: flex;
   justify-content: center;
}

















/* mission section */

.flex-container{
   display: flex;
   justify-content: center;
   font-size: 17pt;
}





.mission-collapsed{
   max-height: 0px;
   overflow:hidden;
   transition:max-height 0.9s ease-out;
}

.mission-show{
   max-height: 1000px;
   overflow:hidden;
   transition:max-height 0.9s ease-out;
}



/* for three column section*/

.column-card{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   height: 100%;

   padding: 40px 20px 40px 20px;


}

.box-header{
   font-size: 20px;
   font-weight: bold;
   margin-top: 20px;
   margin-bottom: 20px;
   text-align: center;
}

.box-button{
   margin-top: 20px;
}



/*FAQ*/

.faq-header{
   font-weight: 600;
   font-size: 14pt;
   background: #dfeef3;

}

.faq-body{
   padding-top: 20px;
   padding-bottom: 20px;
}

/*social*/
.social-container{
   max-width: 400px;
   width: 100%

}

.social-bar-container{
   display: flex;
   flex-direction: row;
   justify-content: space-between;
   padding: 5px 10px 5px 10px;
   margin-top: 5px;
   color: white;
   font-width: bold;
   font-size: 11pt;
}

/*get rid of link decoration for social lilnks*/
div.social-container > a{
   text-decoration: none;
}
</style>
