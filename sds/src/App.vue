<template>
  <div>
    <div v-if="!showSite && !isPublicRoute"
      style="display: flex; justify-content: center; align-items: center; flex-direction: column; min-height: 100vh;">
      <div style="text-align: center; margin-bottom: 20px;">
        This page requires authorization. Please enter password to continue.
        <div v-if="wrongPassword" style="color: red; margin-top: 10px;">
          Incorrect password. Please try again.
        </div>
      </div>
      <my-form style="max-width: 400px; display: flex">
        <my-text-input v-model="dev_code" label="Password" type="password" @keyup-enter="enter_dev_site" />
        <v-btn style="margin-top: 17px; margin-left: 10px" @click="enter_dev_site">
          Enter
        </v-btn>
      </my-form>
    </div>

    <template v-if="showSite || isPublicRoute">
      <v-app id="app" style="z-index:2;background: transparent;">
        <v-dialog v-model="show_cart">
          <div style="background-color: transparent; width: 100%; position:relative;" class="pb-1 pt-1">
            <div style="display: flex; justify-content: flex-end; position: absolute; width: 100%" class="pr-2">
              <v-spacer />
              <v-btn icon @click="show_cart = false">
                <v-icon>close</v-icon>
              </v-btn>
            </div>

            <shopping-cart show-keep-shopping @keep-shopping="show_cart = false" />
          </div>
        </v-dialog>


        <div v-if="show_nav" style="z-index:999;position: relative;">
          <div style="background-color: transparent;">
            <nav-bar />
          </div>
        </div>

        <v-main style="z-index:0">
          <side-nav v-if="show_drawer" />
          <div :style="router_style">
            <router-view :key="$route.fullPath" />
          </div>
        </v-main>

        <v-footer>
          <div class="footer section-container">
            <div data-v-3dd2e005="" class="section-inner-container">
              <div data-v-3dd2e005="" class="row">
                <div data-v-3dd2e005="" class="col-12">
                  <section>
                    <img src="./assets/images/content/logo-white.svg">
                  </section>
                </div>
              </div>
              <div data-v-3dd2e005="" class="row">
                <div data-v-3dd2e005="" class="col-md-9 col-12">
                  <section class="pr-128">
                    <div class="pt-8">
                      Service Dog Standards, this website and our materials are provided as a benefit to the
                      Assistance and Service Dog community as a whole. We are built on the trust and good-will of
                      our members and the animals that serve them. We are not a certification process or substitute
                      for training. Service Dog Standards can not and will not be held responsible or liable for the
                      actions of individual owners or their dogs in any way, shape or form. All member data is
                      provided at the assertion of the animal owner. We are an educational tool for the public and
                      Service and Assistance Dog trainers and owners. Misrepresenting an animal as a Service or
                      Assistance Animal for any reason in any way is a crime. All members are subject to our
                      Terms and Conditions.
                    </div>
                  </section>
                </div>
                <div data-v-3dd2e005="" class="col-md-3 col-12">
                  <section class="txt-box-side xsmall-content">
                    <div style="display:flex;flex-direction:column;gap:16px;">
                      <a href="/privacy" class="footer-links" style="margin-left:0">Privacy and Cookie Policy</a>
                      <a href="/terms-and-conditions" class="footer-links">Terms of Service</a>
                      <a href="/terms-access-use" class="footer-links">Terms of Access and Use</a>
                      <a href="/contact-us" class="footer-links">Contact Us</a>
                    </div>
                  </section>
                </div>
              </div>
              <div data-v-3dd2e005="" class="row">
                <div data-v-3dd2e005="" class="col-md-9 col-12">
                  <div class="copyright pt-8">
                    ©{{ cur_year }} Service Dog Standards. All Rights Reserved.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-footer>
      </v-app>
    </template>
  </div>
</template>

<script>
import NavBar from '@/components/app/NavBar.vue'
import SideNav from '@/components/app/SideNav'
import data_getters from "@/mixins/data_getters";
import ShoppingCart from "@/views/shop/ShoppingCart";

export default {
  name: 'App',
  components: { NavBar, SideNav, ShoppingCart },
  mixins: [data_getters],
  data: () => ({
    dev_code: null,
    wrongPassword: false
  }),

  computed: {
    isPublicRoute() {
      // Only allow home and learn more pages without password
      const path = this.$route.path.toLowerCase();
      return path === '/' || path.startsWith('/learn-more');
    },

    showSite() {
      // Check if password has been entered correctly
      return this.$store.state.seeDevSite || this.isPublicRoute;
    },

    cur_year() {
      let date = new Date();
      return date.getFullYear();
    },

    show_cart: {
      get() {
        return this.$store.state.show_cart;
      },
      set(value) {
        this.$store.commit('set_show_cart', value);
      }
    },

    router_style() {
      if (this.show_drawer) {
        return 'padding-left: 300px';
      }
      return '';
    },

    show_drawer() {
      if (this.$vuetify.breakpoint.width < 1200) {
        return false;
      }
      return this.$store.state.show_side_nav;
    },

    show_nav() {
      return this.$store.state.use_default_nav;
    }
  },

  watch: {
    // Redirect to home if accessing protected route without password
    '$route'(to) {
      if (!this.isPublicRoute && !this.$store.state.seeDevSite) {
        // Store attempted route to redirect back after password entry
        localStorage.setItem('attempted_route', to.fullPath);
      }
    }
  },

  async mounted() {
    // Check for saved password state
    const savedAuth = localStorage.getItem('sds_dev_auth');
    if (savedAuth === 'true') {
      this.$store.commit('set_seeDevSite', true);
    }

    await this.get_cart_from_db();

    this.$auth.$on('logged-out', () => {
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' });
      }
      this.get_cart_from_db();
    });

    this.$auth.$on('logged-in', () => {
      this.get_cart_from_db();
    });
  },

  methods: {
    enter_dev_site() {
      // Simple password check - using SdsUnderDev#1 as the password
      if (this.dev_code === 'SdsUnderDev#1') {
        this.$store.commit('set_seeDevSite', true);
        localStorage.setItem('sds_dev_auth', 'true');
        this.wrongPassword = false;

        // Redirect to attempted route if exists
        const attemptedRoute = localStorage.getItem('attempted_route');
        if (attemptedRoute) {
          this.$router.push(attemptedRoute);
          localStorage.removeItem('attempted_route');
        }
      } else {
        this.wrongPassword = true;
        this.dev_code = ''; // Clear the input on wrong password
      }
    },

    async get_cart_from_db() {
      try {
        let cart = await this.make_request('/store/getActiveCart');
        if (cart != null) {
          this.$store.commit('set_cart', cart);
        }
      } catch (e) {
        console.error(e);
      }
    },
  }
};
</script>

<style scoped lang="scss">
@import 'assets/styles/variables';

#main-container {
  margin: 10px;
  max-width: 1200px;
}

#main-background-gradient {
  position: fixed;
  height: 100%;
  width: 100%;
  margin: 0;
  z-index: -1;
}

/* Footer */
.vfooter {
  justify-content: center;
}

.v-sheet.v-footer,
.footer {
  width: 100%;
  background-color: var(--surface-dark);
  font-size: 14px;
  color: var(--text-light);
}

.footer section>img {
  max-width: 300px;
  opacity: .62;
}

a.footer-links {
  text-decoration: none;
  color: var(--text-light);
  transition: all 150ms ease-in-out;
}

a.footer-links:hover {
  color: var(--text-white);
}

.foot-link-divider {
  padding-left: 5px;
  padding-right: 5px;
}

section.pr-128 {
  padding-right: 128px;
}

.copyright {
  font-size: 13px;
  font-weight: 700;
}

@media only screen and (max-width: 768px) {
  .v-footer {
    padding: 0 !important;
  }

  .footer>.section-inner-container {
    padding-left: 10px;
    padding-right: 10px;
  }

  .footer section.pr-128 {
    padding-right: 0px !important;
  }
}

@media (max-width: 700px) {
  .footer {
    padding-left: 20px;
    padding-right: 20px;
  }

  .footer>.section-inner-container {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>

<style src="./views/common.css"></style>
