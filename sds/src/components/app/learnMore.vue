<template>
  <div
    class="pa-6 pt-0"
    style="background-color: white; display: flex; flex-wrap: wrap"
  >
    <div class="menu-col mr-6 mt-4">
      <div>
        <div class="menu-header">
          About Us
        </div>

        <div class="menu-links">
          <router-link to="/learn-more/mission">
            What is our mission, purpose and focus?
          </router-link> <br>
          <router-link to="/learn-more/what-is-service-animal">
            What is a Service Dog?
          </router-link> <br>


          <router-link to="/learn-more/how-do-i-get-service-dog">
            How do I get a Service Dog?
          </router-link> <br>


          <router-link to="/learn-more/what-should-service-dog-act-like">
            What Should a Service Dog Act like?
          </router-link> <br>

          <!--<router-link to="/downloads/Service_Dog_Standards_Training_and_Behavior_Standards_SDSTBS-21.pdf">-->
          <!--   SDS Training and Behavior Standards-->
          <!--</router-link> <br>-->


          <!--<a href="/downloads/Service_Dog_Standards_Training_and_Behavior_Standards_SDSPAT-21.pdf"-->
          <!--    style="text-decoration: none;">-->
          <!--   SDS Training and Behavior Standards-->
          <!--</a><br>-->


          <router-link to="/learn-more/sds-training-and-behavior-standards">
            SDS Training and Behavior Standards
          </router-link> <br>


          <router-link to="/faq">
            Common Questions
          </router-link> <br>

          <router-link to="/learn-more/media-library">
            Media Library
          </router-link>
        </div>
      </div>



      <div>
        <div class="menu-header mt-4">
          For Professionals
        </div>

        <div class="menu-links">
          <router-link to="/learn-more/for-trainers">
            For trainers and training orgs
          </router-link> <br>

          <router-link to="/learn-more/for-physicians-therapists">
            For physicians and therapists
          </router-link> <br>


          <router-link to="/learn-more/for-colleges">
            For colleges and universities
          </router-link>
        </div>
      </div>
    </div>


    <div class="menu-col mt-4 ">
      <div>
        <div class="menu-header">
          For the public
        </div>

        <div class="menu-links">
          <router-link to="/learn-more/what-todo-when-see-dog">
            What should you do when you see a Service Dog?
          </router-link> <br>
          <router-link to="/learn-more/how-can-i-tell-if-legitimate">
            How can I tell if a Service Animal is Legitimate?
          </router-link> <br>

          <router-link to="/learn-more/business-rights">
            Business Rights Concerning Service Dogs
          </router-link> <br>

          <router-link to="/learn-more/landlord-hoa-rights">
            Landlord/HOA Rights Concerning Service Dogs
          </router-link>
        </div>
      </div>

      <div>
        <div class="menu-header mt-4">
          Learn more
        </div>

        <div class="menu-links">
          <a href="https://www.facebook.com/servicedog">
            Join us on Facebook
          </a><br>

          <a href="https://anythingpawsable.com/">
            Visit Anything Pawsable
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   name: "LearnMore"
}
</script>

<style scoped>
.menu-header{
    font-size: 16pt;
    font-weight: 600;
    color: gray;
}

.menu-links{
    padding-left: 2px;
}
</style>