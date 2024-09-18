<template>
  <div style="background-color:#f6f9fc;display:flex;flex-wrap:wrap;padding:24px;border-radius:4px;">
    <div
      class="menu-col"
      style="width: 100%"
    >
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <div class="menu-header">
            About us
          </div>

          <router-link
            v-for="item in about_us"
            :key="item.url"
            :to="item.url"
          >
            <div class="link-container">
              <div class="hex-container">
                <!--<img :src="require('../../assets/images/icons/' +item.icon)" width="18px">-->
                <div style="width: 22px">
                  <svg
                    viewBox="0 0 760.155 703.155"
                    style="width: 100%; height: 100%;"
                    :style="'stroke:' + item.color"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="760.155px"
                    height="703.155px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="110.77px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M468.884,111.385 L585.385,323.884 L468.884,536.384 L235.885,536.384 L119.384,323.884 L235.885,111.385 L468.884,111.385 Z"
                    />
                  </svg>
                </div>
              </div>

              <div class="navitem-container">
                <div class="item-header">
                  {{ item.h1 }}
                </div>
                <div class="item-header2">
                  {{ item.h2 }}
                </div>
              </div>
            </div>
          </router-link>


          <a
            v-for="item in links"
            :key="item.href"
            :href="item.href"
          >
            <div class="link-container">
              <div class="hex-container">
                <!--<img :src="require('../../assets/images/icons/' +item.icon)" width="18px">-->
                <div style="width: 22px">
                  <svg
                    viewBox="0 0 760.155 703.155"
                    style="width: 100%; height: 100%;"
                    :style="'stroke:' + item.color"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="760.155px"
                    height="703.155px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="110.77px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M468.884,111.385 L585.385,323.884 L468.884,536.384 L235.885,536.384 L119.384,323.884 L235.885,111.385 L468.884,111.385 Z"
                    />
                  </svg>
                </div>

              </div>

              <div class="navitem-container">
                <div
                  class="item-header"
                  :style="item.color_h1 ? 'color:' + item.color_h1 : ''"
                >
                  {{ item.h1 }}
                </div>
                <div class="item-header2">
                  {{ item.h2 }}
                </div>

              </div>
            </div>

          </a>





          <!--<div class="link-container">-->
          <!--   <router-link to="/learn-more/mission">What is our mission, purpose and focus?</router-link>-->
          <!--</div>-->

          <!--<div class="link-container">-->
          <!--   <router-link to="/learn-more/what-is-service-animal">What is a Service Dog?</router-link>-->
          <!--</div>-->

          <!--<div class="link-container">-->
          <!--   <router-link to="/learn-more/how-do-i-get-service-dog">-->
          <!--      How do I get a Service Dog?-->
          <!--   </router-link>-->
          <!--</div>-->

          <!--<div class="link-container">-->
          <!--   <router-link to="/learn-more/what-should-service-dog-act-like">-->
          <!--      What Should a Service Dog Act like?-->
          <!--   </router-link>-->
          <!--</div>-->

          <!--<div class="link-container">-->
          <!--   <router-link to="/learn-more/sds-training-and-behavior-standards">-->
          <!--      SDS Training and Behavior Standards-->
          <!--   </router-link>-->
          <!--</div>-->

          <!--<div class="link-container">-->
          <!--   <router-link to="/faq">-->
          <!--      Common Questions-->
          <!--   </router-link>-->
          <!--</div>-->

          <!--<div class="link-container">-->
          <!--   <router-link to="/learn-more/media-library">-->
          <!--      Media Library-->
          <!--   </router-link>-->
          <!--</div>-->
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <div class="menu-header">
            For professionals
          </div>


          <router-link
            v-for="item in for_pros"
            :key="item.url"
            :to="item.url"
          >
            <div class="link-container">
              <div class="hex-container">
                <!--<img :src="require('../../assets/images/icons/' +item.icon)" width="18px">-->
                <div style="width: 22px">
                  <svg
                    viewBox="0 0 760.155 703.155"
                    style="width: 100%; height: 100%;"
                    :style="'stroke:' + item.color"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="760.155px"
                    height="703.155px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="110.77px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M468.884,111.385 L585.385,323.884 L468.884,536.384 L235.885,536.384 L119.384,323.884 L235.885,111.385 L468.884,111.385 Z"
                    />
                  </svg>
                </div>
              </div>

              <div class="navitem-container">
                <div class="item-header">
                  {{ item.h1 }}
                </div>
                <div class="item-header2">
                  {{ item.h2 }}
                </div>
              </div>
            </div>
          </router-link>


          <div
            class="menu-header"
            style="margin-top: 20px"
          >
            For the public
          </div>

          <router-link
            v-for="item in for_public"
            :key="item.url"
            :to="item.url"
          >
            <div class="link-container">
              <div class="hex-container">
                <!--<img :src="require('../../assets/images/icons/' +item.icon)" width="18px">-->
                <div style="width: 22px">
                  <svg
                    viewBox="0 0 760.155 703.155"
                    style="width: 100%; height: 100%;"
                    :style="'stroke:' + item.color"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    width="760.155px"
                    height="703.155px"
                  >
                    <path
                      fill-rule="evenodd"
                      stroke-width="110.77px"
                      stroke-linecap="butt"
                      stroke-linejoin="miter"
                      fill="none"
                      d="M468.884,111.385 L585.385,323.884 L468.884,536.384 L235.885,536.384 L119.384,323.884 L235.885,111.385 L468.884,111.385 Z"
                    />
                  </svg>
                </div>
              </div>

              <div class="navitem-container">
                <div class="item-header">
                  {{ item.h1 }}
                </div>
                <div class="item-header2">
                  {{ item.h2 }}
                </div>
              </div>
            </div>
          </router-link>


          <!--<div class="link-container">-->
          <!--   <router-link to="/learn-more/for-trainers">-->
          <!--      For trainers and training orgs-->
          <!--   </router-link>-->
          <!--</div>-->

          <!--<div class="link-container">-->
          <!--   <router-link to="/learn-more/for-physicians-therapists">-->
          <!--      For physicians and therapists-->
          <!--   </router-link>-->
          <!--</div>-->

          <!--<div class="link-container">-->
          <!--   <router-link to="/learn-more/for-colleges">-->
          <!--      For colleges and universities-->
          <!--   </router-link>-->
          <!--</div>-->
        </v-col>

        <!--<v-col cols="12" sm="6" md="3">-->
        <!--<div class="menu-header">-->
        <!--   For the public-->
        <!--</div>-->

        <!--<div class="link-container">-->
        <!--   <router-link to="/learn-more/what-todo-when-see-dog">-->
        <!--      What should you do when you see a Service Dog?-->
        <!--   </router-link>-->
        <!--</div>-->

        <!--<div class="link-container">-->
        <!--   <router-link to="/learn-more/how-can-i-tell-if-legitimate">-->
        <!--      How can I tell if a Service Animal is Legitimate?-->
        <!--   </router-link>-->
        <!--</div>-->

        <!--<div class="link-container">-->
        <!--   <router-link to="/learn-more/business-rights">-->
        <!--      Business Rights Concerning Service Dogs-->
        <!--   </router-link>-->
        <!--</div>-->

        <!--<div class="link-container">-->
        <!--   <router-link to="/learn-more/landlord-hoa-rights">-->
        <!--      Landlord/HOA Rights Concerning Service Dogs-->
        <!--   </router-link>-->
        <!--</div>-->
        <!--</v-col>-->



        <!--<v-col cols="12" sm="6" md="3">-->
        <!--   <div class="menu-header">-->
        <!--      Learn more-->
        <!--   </div>-->

        <!--   <div class="link-container">-->
        <!--      <a href="https://www.facebook.com/servicedog">-->
        <!--         Join us on Facebook-->
        <!--      </a>-->
        <!--   </div>-->

        <!--   <div class="link-container">-->
        <!--      <a href="https://anythingpawsable.com/">-->
        <!--         Visit Anything Pawsable-->
        <!--      </a>-->
        <!--   </div>-->


        <!--</v-col>-->
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "LearnMore",
  data() {
    return {
      about_us: [
        { url: '/learn-more/mission', color: '#17a07d', h1: 'What is our mission?', h2: 'Learn about our purpose & focus.' },
        { url: '/learn-more/what-is-service-animal', color: '#17a07d', h1: 'What is Service Dog?', h2: 'Learn the correct terms & Definitions.' },
        { url: '/learn-more/how-do-i-get-service-dog', color: '#17a07d', h1: 'How do I get a Service Dog?', h2: "Learn what's involved" },
        { url: '/learn-more/what-should-service-dog-act-like', color: '#17a07d', h1: "What Should a Service Dog Act like?", h2: "It's the training & behavior that matter." },
        { url: '/learn-more/sds-training-and-behavior-standards', color: '#17a07d', h1: "SDS Training & Behavior Standards", h2: "View online or download." },
        { url: '/faq', color: '#17a07d', h1: "Common Questions", h2: "FAQ: Frequently Asked Questions." },
        { url: '/learn-more/media-library', color: '#17a07d', h1: " Media Library", h2: "Toogether, we can help educate." },

        // {url: '', color: '#17a07d', h1: "", h2: ""},
      ],

      links: [
        { href: 'https://anythingpawsable.com/', color: '#714093', h1: "Anything Pawsable", h2: "News + More for Service and Working Dogs.", color_h1: '#714093' },
        { href: 'https://www.facebook.com/servicedog', color: '#3152a2', h1: "Join our Facebook Page", h2: "Join our community & stay up-to-date." },
      ],

      for_pros: [
        { url: '/learn-more/for-trainers', color: '#0f9dde', h1: "For trainers and training orgs", h2: "We help trainers educate handlers." },
        { url: '/learn-more/for-physicians-therapists', color: '#0f9dde', h1: "For physicians and therapists", h2: "Referring patients and clients." },
        { url: '/learn-more/for-colleges', color: '#0f9dde', h1: "For schools and universities", h2: "Education, safety & responsibility." },
      ],

      for_public: [
        { url: '/learn-more/what-todo-when-see-dog', color: '#92c742', h1: "How to act around a Service Dog?", h2: "Overview of public etiquette." },
        { url: '/learn-more/how-can-i-tell-if-legitimate', color: '#92c742', h1: "Can I tell if a Service Dog is legitimate?", h2: "Learn the two ways you can tell." },
        { url: '/learn-more/business-rights', color: '#92c742', h1: "Business Rights and Service Dogs", h2: "Overview of public etiquette." },
        { url: '/learn-more/landlord-hoa-rights', color: '#92c742', h1: "Landlord/HOA Rights", h2: "For housing & rental properties." },
      ]
    }
  }
}
</script>

<style>
/* Mega menu Navigation */

.menu-header {
  font-size: var(--rt-overline);
  font-family: var(--font-family);
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0;
  text-decoration: none;
  text-transform: uppercase;
  color: var(--text-default);
}

.link-container {
  display: flex;
  padding: 8px 0;
}

.menu-links,
.item-header,
.item-header2 {
  font-size: var(--rt-xsmall);
  font-family: var(--font-family);
  font-weight: 600;
  line-height: 22px;
  letter-spacing: 0;
  color: var(--text-dark);
  padding-left: 0;
  margin: 0;
}

.item-header2 {
  font-weight: 425;
  line-height: 20px;
  color: var(--text-light);
}

.navitem-container:hover>.item-header2 {
  color: var(--text-dark) !important;
}

.hex-container {
  margin-right: 16px;
  padding-top: 1.25px;
}

/* */
</style>