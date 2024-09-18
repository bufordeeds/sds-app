<template>
  <div>
    <v-menu
      v-model="show_learn_more"
      content-class="learn-more-mobile"
    >
      <learn-more />
    </v-menu>

    <!--------------------------full size menu----------------------------->
    <v-app-bar
      v-if="!hamburger_menu"
      key="full-size-nav-bar"
      :app="app_val"
      style="display:flex;justify-content: center;align-items:center;width:100%;background:none;padding:4px 48px"
      elevation="0"
      height="68px"
    >
      <img
        :src="logoPath"
        height="48px"
        style="cursor: pointer;"
        alt="Service Dog Standards Logo"
        @click="$router.push('/')"
      >
      <span class="pa-3" />

      <v-spacer />

      <v-btn
        v-if="!isAdmin"
        ref="btn_learn_more"
        class="nav-bar-btn"
        :style="learnMoreButtonStyle"
        :dark="navMode.dark"
        :light="navMode.light"
        :class="isRootUrl ? 'dark' : 'light'"
        @click="click_learn_more()"
      >
        Learn More
      </v-btn>

      <v-menu
        v-if="!isAdmin"
        v-model="show_menu"
        :close-on-content-click="true"
        bottom
        nudge-bottom="40px"
        absolute
        :position-x="menu_pos_x"
        :position-y="25"
        rounded
      >
        <div style="width:100%;max-width:1080px">
          <div
            class="arrow-up"
            :style="{ 'margin-left': menu_triangle_x }"
          />
          <learn-more style="border-radius: 10px; " />
        </div>
      </v-menu>

      <v-btn
        v-for="(item, i) in items"
        :key="i"
        class="nav-bar-btn v-btn__content "
        text
        :to="item.url"
        :dark="navMode.dark"
        :light="navMode.light"
      >
        {{ item.name }}
      </v-btn>

      <v-menu
        v-model="show_login"
        :close-on-content-click="false"
        bottom
        nudge-bottom="60px"
      >
        <template #activator="{ on }">
          <v-btn
            class="nav-bar-btn v-btn__content"
            text
            large
            :dark="navMode.dark"
            :light="navMode.light"
            v-on="on"
          >
            <span
              class="v-btn__content"
              :class="isRootUrl ? 'dark-text' : 'light-text'"
              style="text-align: center; text-transform: none !important;"
            >
              {{ account_txt }}
            </span>
            <avatar
              v-if="$auth.authenticated"
              :image="acct_image"
              size="50px"
              class="ml-2"
            />
          </v-btn>
        </template>

        <v-card v-if="!$auth.authenticated">
          <login @logged-in="on_login" />
        </v-card>

        <v-card
          v-else
          class="pa-2"
        >
          <div style="display: flex; justify-content: flex-end;">
            <v-btn
              text
              style="padding-right: 5px"
              @click="$auth.logout()"
            >
              Log Out
              <img
                src="../../assets/images/icons/logout.svg"
                height="20px;"
                style="margin-left: 5px"
              >
            </v-btn>
          </div>
        </v-card>
      </v-menu>

      <!-- menu for shopping cart -->

      <v-btn
        v-if="!isAdmin"
        icon
        large
        class="mr-2"
        @click="go_to_cart"
      >
        <div style="display: flex; flex-direction: row; ">
          <!--<v-icon color="white">shopping_cart</v-icon>-->

          <img
            :src="cartPath"
            width="35px"
            height="30px"
          >
          <div
            :class="isRootUrl ? 'white-text' : 'black-text'"
            style="margin-top: -4px; margin-left: -28px; text-align: center; width: 25px"
          >
            {{ num_cart_items }}
          </div>
        </div>
      </v-btn>
    </v-app-bar>

    <!--------------------------hamburger menu------------------------------------------------------------------------->
    <v-app-bar
      v-else
      key="mobile-nav-bar"
      :app="app_val"
      style="background: none"
      elevation="0"
    >
      <a href="/">
        <img
          :src="logoPath"
          height="42px"
        >
      </a>

      <span class="pa-3" />

      <v-spacer />

      <!------------shopping cart-------------------------------------->
      <v-btn
        v-if="!isAdmin"
        icon
        large
        @click="go_to_cart"
      >
        <div style="display: flex; flex-direction: row; ">
          <img
            :src="cartPath"
            width="30px"
            height="25px"
          >
          <div
            :class="isRootUrl ? 'white-text' : 'black-text'"
            style="margin-top: -4px; margin-left: -28px; text-align: center; width: 25px"
          >
            {{ num_cart_items }}
          </div>
        </div>
      </v-btn>

      <!------------menu for login/logout------------------------------------>
      <v-menu
        v-model="show_login"
        :close-on-content-click="false"
        bottom
        nudge-bottom="60px"
      >
        <template #activator="{ on }">
          <v-btn
            key="menu-learn-more"
            text
            small
            v-on="on"
          >
            <avatar
              v-if="$auth.authenticated"
              :image="acct_image"
              size="30px"
              class="ml-2"
            />

            <div
              v-else
              style="text-align: center; text-transform: none !important; color: #61afe1;"
            >
              {{ account_txt }}
            </div>
          </v-btn>
        </template>

        <v-card
          v-if="!$auth.authenticated"
          style="width: 300px; max-width: 95vw"
        >
          <login @logged-in="on_login" />
        </v-card>

        <v-card
          v-else
          class="pa-2"
        >
          <div style="text-align: center; text-transform: none !important; color: #61afe1;">
            {{ account_txt }}
          </div>

          <div style="display: flex; justify-content: flex-end;">
            <v-btn
              text
              style="padding-right: 5px"
              @click="$auth.logout()"
            >
              Log Out
              <img
                src="../../assets/images/icons/logout.svg"
                height="20px;"
                style="margin-left: 5px"
              >
            </v-btn>
          </div>
        </v-card>
      </v-menu>

      <!------------nav menu ------------------------------------------------>
      <v-menu
        bottom
        nudge-bottom="50"
      >
        <template #activator="{ on }">
          <v-btn
            icon
            :dark="dark"
            v-on="on"
          >
            <v-icon>menu</v-icon>
          </v-btn>
        </template>

        <v-card class="pa-6">
          <div
            style="width: 100%; display: flex; justify-content: flex-start"
            class="mt-2"
          >
            <img
              src="../../assets/images/icons/menu_icons_arrow.png"
              height="30px"
              style="margin-top: 5px"
            >
            <div
              :dark="dark"
              color="black"
              class="pl-2"
              @click="show_learn_more = true"
            >
              <div class="mobile-menu-h1">
                Learn More
              </div>
              <div class="mobile-menu-h2">
                About Service Dog Standards
              </div>
            </div>
          </div>

          <div
            v-for="(item) in items"
            :key="item.url"
            style="width: 100%; display: flex; justify-content: flex-start"
            class="mt-2"
          >
            <!--<img :src="require('../../assets/images/icons/'+item.icon)" height="30px" style="margin-top: 5px">-->
            <img
              :src="item.icon"
              height="30px"
              style="margin-top: 5px"
            >

            <router-link
              :to="item.url"
              :dark="dark"
              color="black"
              class="pl-2"
              @click="show_learn_more = true"
            >
              <div class="mobile-menu-h1">
                {{ item.h1 }}
              </div>
              <div class="mobile-menu-h2">
                {{ item.h2 }}
              </div>
            </router-link>
          </div>

          <div
            v-for="(item) in sidebar_items"
            :key="item.url"
          >
            <div
              style="width: 100%; display: flex; justify-content: flex-start; margin-left: 40px"
              class="pt-3"
            >
              <!--<v-btn text :to="item.path" :dark="dark" color="black"  >{{ item.title }}</v-btn>-->
              <router-link
                :to="item.path"
                style="color:black"
              >
                {{ item.title }}
              </router-link>
            </div>
          </div>
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>

import login from '@/components/app/LoginModal'
import avatar from "@/components/app/avatar";
import learnMore from "@/components/app/learnMore2";

export default {
  name: 'NavBar',
  components: { login, avatar, learnMore },

  props: {
    app: Boolean,
    dark: { type: Boolean, default: true },
    light: { type: Boolean, }
  },

  data: () => ({
    show_menu: false,
    show_login: false,
    show_learn_more: false,
    menu_triangle_x: 0,


  }),

  computed: {

    menu_pos_x() {
      // menu width = min(1500, 95vw).


      if (this.$vuetify.breakpoint.width <= 1080) {
        return this.$vuetify.breakpoint.width * 0.025;
      }
      else {
        let vw = document.documentElement.clientWidth
        return vw / 2 - Math.min(1080, vw * 1.0) / 2;
      }
    },


    cart_items() {
      return this.$store.state.cart.items;
    },

    num_cart_items() {
      let ans = this.$store.state.cart.items.length;
      if (ans > 0)
        return ans;
      else
        return '0'
    },

    hamburger_menu() {
      // return (['xs', 'sm'].includes(this.$vuetify.breakpoint.name));
      return this.$vuetify.breakpoint.width < 1200; //note, align this with show_drawer() in app.vue
    },

    app_val() {
      if (this.app !== undefined)
        return this.app;
      else return false;
    },

    account_txt() {
      if (this.$auth.isAuthenticated()) {
        let ans = '';
        if (this.$auth.profile.name_first) ans += this.$auth.profile.name_first;
        if (ans !== '') ans += ' '
        if (this.$auth.profile.name_last) ans += this.$auth.profile.name_last;

        if (ans === '') {
          ans = this.$auth.profile.email;
        }
        return ans;
      }
      else {
        return 'Log In';
      }
    },

    acct_image() {
      if (this.$auth.isAuthenticated()) {
        return this.$auth.profile.profile_image;
      }
      return '';
    },


    items() {
      let ans = [
        // {name: 'Learn More', url: '/faq'},
        { name: 'Find Trainer', url: '/findTrainers', h1: 'Find Trainer', h2: 'Search trainer database', icon: require('../../assets/images/icons/menu_icons_search.png') },
        { name: 'Shop & Support ', url: '/store', h1: 'Shop & Support', h2: 'Help support SDS', icon: require('../../assets/images/icons/menu_icons_cart.png') },
        { name: 'Membership Center', url: '/accountHome', h1: 'Membership Center', h2: 'Manage your account', icon: require('../../assets/images/icons/menu_icons_member.png') },
      ];

      if (this.$auth.profile.acct_type === 'SDS-ADMIN') {

        ans = [{ name: 'Admin Center', url: '/admin/orders' }];
      }

      return ans;
    },

    isAdmin() {
      return this.$auth.profile.acct_type === 'SDS-ADMIN'
    },

    //note this is copy/pasted from the SideNav.vue component
    sidebar_items() {

      let ans = [];

      if (this.$auth.authenticated) {
        if (this.$auth.profile.acct_type === 'SDS-ADMIN') {
          ans = [
            // { title: 'Admin Home', icon: 'home', path: '/admin/home'},
            { title: 'Manage Orders', icon: 'home', path: '/admin/orders' },
            { title: 'Manage Users', icon: 'account_circle', path: '/admin/users' },
            { title: 'Flag Reports', icon: 'flag', path: '/admin/flagReports' },

          ];
        }
        else if (this.$auth.profile.acct_type === 'TRAINER') {
          ans = [
            { title: 'Account Home', icon: 'home', path: '/accountHome' },
            { title: 'My Info', icon: 'account_circle', path: '/manageProfile' },

            {
              title: 'Manage Service Dogs', path: '/manageServiceDogs', image: require('../../assets/images/icons/dog-face.png'),
              image_active: require('../../assets/images/icons/dog-face-white.png')
            },

            { title: 'My Orders', icon: 'shopping_cart', path: '/orders' },
          ];
        }

        else if (this.$auth.profile.acct_type === 'HANDLER') {
          ans = [
            { title: 'Account Home', icon: 'home', path: '/accountHome' },
            { title: 'My Info', icon: 'account_circle', path: '/manageProfile' },
            { title: 'Delegated Access', icon: 'account_circle', path: '/delegateAccess' },

            {
              title: 'Manage Service Dogs', path: '/manageServiceDogs',
              image: require('../../assets/images/icons/dog-face.png'),
              image_active: require('../../assets/images/icons/dog-face-white.png')
            },

            {
              title: 'Edit Profile Page', path: '/teamProfileEditor',
              image: require('../../assets/images/icons/man-and-dog.png'),
              image_active: require('../../assets/images/icons/man-and-dog-white.png')
            },

            { title: 'My Orders', icon: 'shopping_cart', path: '/orders' },
          ];
        }
      }

      return ans;
    },
    isRootUrl() {
      return this.$route.path === '/';
    },

    navMode() {
      return this.isRootUrl ? { dark: true, light: false } : { dark: false, light: true };
    },

    logoPath() {
      return this.isRootUrl
        ? require('../../assets/images/logo/SDSTrainerLogo-white.svg')
        : require('../../assets/images/logo/SDSTrainerLogo.svg');
    },

    learnMoreButtonStyle() {
      return this.isRootUrl
        ? { color: 'white !important', backgroundColor: 'transparent !important' }
        : { color: 'black !important', backgroundColor: 'transparent !important' };
    },

    cartPath() {
      return this.isRootUrl
        ? require('../../assets/images/icons/shopping-cart_open-white.svg')
        : require('../../assets/images/icons/shopping-cart_open-primary-highlight.svg');
    },

  },
  watch: {
    $route() {
      this.updateButtonStyle();
    },
  },

  created() {
    console.log(this.$vuetify.breakpoint);

  },

  methods: {

    updateButtonStyle() {
      this.learnMoreButtonStyle = this.isRootUrl
        ? { color: 'white', backgroundColor: 'transparent' }
        : { color: 'black', backgroundColor: 'transparent' };
    },

    on_login() {
      console.log('logged in')
      this.show_login = false
    },

    go_to_cart() {
      // this.$store.commit('set_show_cart', true);
      this.$router.push('/cart');
    },

    toggle_menu() {
      if (['xs', 'sm'].includes(this.$vuetify.breakpoint.name)) {
        this.show_menu = false;
        return;
      }
      this.show_menu = !this.show_menu;
    },

    // toggle_login() {
    //   let elm = document.getElementById('my-account-btn');
    //   let rect = elm.getBoundingClientRect();


    // },

    click_learn_more() {

      this.show_menu = !this.show_menu;
      let ans = 0;

      console.log({ ans: this.$refs.btn_learn_more })

      if (this.$refs.btn_learn_more) {
        let el = this.$refs.btn_learn_more.$el;
        let dim = el.getBoundingClientRect();

        ans = dim.x + dim.width / 2 - this.menu_pos_x - 7;
        // console.log({dimx: dim.x, dimwidth: dim.width, menu_pos_x: this.menu_pos_x})
      }

      this.menu_triangle_x = `${Math.round(ans)}px`;


    },

  }
};
</script>


<style>
/*#site-menu{*/
/* background: none;*/
/*}*/

.top-nav-site-menu {
  background: none ! important;

}
</style>

<style scoped>
 ::v-deep button>.v-btn__content.dark-text,
 ::v-deep span>.v-btn__content.dark-text {
  color: white !important;
  /* Ensure white text for dark mode */
}

/* Override styles for light mode text (on other URLs) */
::v-deep button>.v-btn__content.light-text,
::v-deep span>.v-btn__content.light-text {
  color: #000000DE !important;
  /* Ensure black text for light mode */
}

::v-deep button>.v-btn__content,
::v-deep span>.v-btn__content {
  color: white !important;
  /* Dark mode text should be white */
}

::v-deep button.light>.v-btn__content,
::v-deep span.light>.v-btn__content {
  color: #000000DE !important;
  /* Light mode text should be black */
}

::v-deep .white-text {
  color: white !important;
}

::v-deep .black-text {
  color: black !important;
}

:root {
  --font-family: "Inter", "Libre Franklin", "Helvetica Neue", Arial, sans-serif;
  --font-size-base: 18px;

  /* Text colors */
  --text-white: #FFFFFFFF;
  --text-default: #425466;
  --text-light: #a4a4a9;
  --text-medium: #616165;
  --text-dark: #0a2540;
  --text-light-on-dark: var(--text-white);
  --text-link: #0066cc;
  --text-highlight: var(--text-link);
  --text-error: #e22718;
}

.arrow-up {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid white;
}

.learn-more-mobile {
  max-width: 100%;
}

.mobile-menu-h1 {
  font-weight: 600;
  color: black;

}

.mobile-menu-h2 {
  font-size: 10pt;
  color: black;

}

/* ROB styles */
.v-toolbar__content {
  width: 100% !important;
}

header>.v-toolbar.v-app-bar {
  width: 100%;
}
</style>
