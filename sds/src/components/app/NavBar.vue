<template>
  <div>
    <v-menu v-model="show_learn_more" content-class="learn-more-mobile">
      <learn-more />
    </v-menu>

    <v-app-bar :app="app_val" style="width:100%;background:none;padding:4px 16px" elevation="0" height="68px">
      <div class="nav-container">
        <div class="left-section">
          <img :src="logoPath" height="48px" style="cursor: pointer;" alt="Service Dog Standards Logo"
            @click="$router.push('/')" class="logo">

          <div class="full-menu">
            <v-btn v-if="!isAdmin" ref="btn_learn_more" class="nav-bar-btn" :style="learnMoreButtonStyle"
              :dark="navMode.dark" :light="navMode.light" :class="isRootUrl ? 'dark' : 'light'"
              @click="click_learn_more()">
              Learn More
            </v-btn>

            <v-menu v-if="!isAdmin" v-model="show_menu" :close-on-content-click="true" bottom nudge-bottom="40px"
              absolute :position-x="menu_pos_x" :position-y="25" rounded>
              <div style="width:100%;max-width:1080px">
                <div class="arrow-up" :style="{ 'margin-left': menu_triangle_x }" />
                <learn-more style="border-radius: 10px; " />
              </div>
            </v-menu>

            <v-btn v-for="(item, i) in items" :key="i" class="nav-bar-btn v-btn__content " text :to="item.url"
              :dark="navMode.dark" :light="navMode.light">
              {{ item.name }}
            </v-btn>
          </div>
        </div>

        <div class="right-section">
          <v-menu v-model="show_login" :close-on-content-click="false" bottom nudge-bottom="60px">
            <template #activator="{ on }">
              <v-btn class="nav-bar-btn v-btn__content" text large :dark="navMode.dark" :light="navMode.light"
                v-on="on">
                <span class="v-btn__content" :class="isRootUrl ? 'dark-text' : 'light-text'"
                  style="text-align: center; text-transform: none !important;">
                  {{ account_txt }}
                </span>
                <avatar v-if="$auth.authenticated" :image="acct_image" size="50px" class="ml-2" />
              </v-btn>
            </template>

            <v-card v-if="!$auth.authenticated">
              <login @logged-in="on_login" />
            </v-card>

            <v-card v-else class="pa-2">
              <div style="display: flex; justify-content: flex-end;">
                <v-btn text style="padding-right: 5px" @click="$auth.logout()">
                  Log Out
                  <img src="../../assets/images/icons/logout.svg" height="20px;" style="margin-left: 5px">
                </v-btn>
              </div>
            </v-card>
          </v-menu>

          <v-btn v-if="!isAdmin" icon large class="mr-2" @click="go_to_cart">
            <div style="display: flex; flex-direction: row; ">
              <img :src="cartPath" width="35px" height="30px">
              <div :class="isRootUrl ? 'white-text' : 'black-text'"
                style="margin-top: -4px; margin-left: -28px; text-align: center; width: 25px">
                {{ num_cart_items }}
              </div>
            </div>
          </v-btn>

          <div class="hamburger-menu">
            <v-menu bottom offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </template>
              <v-card class="pa-6">
                <div style="width: 100%; display: flex; justify-content: flex-start" class="mt-2">
                  <img src="../../assets/images/icons/menu_icons_arrow.png" height="30px" style="margin-top: 5px">
                  <div :dark="dark" color="black" class="pl-2" @click="show_learn_more = true">
                    <div class="mobile-menu-h1">
                      Learn More
                    </div>
                    <div class="mobile-menu-h2">
                      About Service Dog Standards
                    </div>
                  </div>
                </div>

                <div v-for="(item) in items" :key="item.url"
                  style="width: 100%; display: flex; justify-content: flex-start" class="mt-2">
                  <img :src="item.icon" height="30px" style="margin-top: 5px">
                  <router-link :to="item.url" :dark="dark" color="black" class="pl-2" @click="show_learn_more = true">
                    <div class="mobile-menu-h1">
                      {{ item.h1 }}
                    </div>
                    <div class="mobile-menu-h2">
                      {{ item.h2 }}
                    </div>
                  </router-link>
                </div>

                <div v-for="(item) in sidebar_items" :key="item.url">
                  <div style="width: 100%; display: flex; justify-content: flex-start; margin-left: 40px" class="pt-3">
                    <router-link :to="item.path" style="color:black">
                      {{ item.title }}
                    </router-link>
                  </div>
                </div>
              </v-card>
            </v-menu>
          </div>
        </div>
      </div>
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
      if (this.$vuetify.breakpoint.width <= 960) {
        return this.$vuetify.breakpoint.width * 0.025;
      }
      else {
        let vw = document.documentElement.clientWidth
        return vw / 2 - Math.min(960, vw * 1.0) / 2;
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
      return this.$vuetify.breakpoint.width < 960;
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

    sidebar_items() {
      let ans = [];

      if (this.$auth.authenticated) {
        if (this.$auth.profile.acct_type === 'SDS-ADMIN') {
          ans = [
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

  },

  created() {

  },

  methods: {

    on_login() {
      console.log('logged in')
      this.show_login = false
    },

    go_to_cart() {
      this.$router.push('/cart');
    },

    toggle_menu() {
      if (['xs', 'sm'].includes(this.$vuetify.breakpoint.name)) {
        this.show_menu = false;
        return;
      }
      this.show_menu = !this.show_menu;
    },

    click_learn_more() {
      this.show_menu = !this.show_menu;
      let ans = 0;

      console.log({ ans: this.$refs.btn_learn_more })

      if (this.$refs.btn_learn_more) {
        let el = this.$refs.btn_learn_more.$el;
        let dim = el.getBoundingClientRect();

        ans = dim.x + dim.width / 2 - this.menu_pos_x - 7;
      }

      this.menu_triangle_x = `${Math.round(ans)}px`;
    },
  }
};
</script>

<style>
.top-nav-site-menu {
  background: none !important;
}
</style>

<style scoped>
::v-deep button>.v-btn__content.dark-text,
::v-deep span>.v-btn__content.dark-text {
  color: white !important;
}

::v-deep button>.v-btn__content.light-text,
::v-deep span>.v-btn__content.light-text {
  color: #000000DE !important;
}

::v-deep button>.v-btn__content,
::v-deep span>.v-btn__content {
  color: white !important;
}

::v-deep button.light>.v-btn__content,
::v-deep span.light>.v-btn__content {
  color: #000000DE !important;
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
  font-size: 16px;
}

.mobile-menu-h2 {
  font-size: 14px;
  color: #666;
}

.v-toolbar__content {
  width: 100% !important;
}

header>.v-toolbar.v-app-bar {
  width: 100%;
}

.full-menu {
  display: flex;
  align-items: center;
}

.hamburger-menu {
  display: none;
}

@media (max-width: 960px) {
  .full-menu {
    display: none;
  }

  .hamburger-menu {
    display: block;
  }
}

/* Preserve original styles for the hamburger menu modal */
.hamburger-menu .v-menu__content {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, .2), 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12);
}

.hamburger-menu a {
  text-decoration: none;
  color: inherit;
}

/* Ensure the hamburger menu icon is visible */
.hamburger-menu .v-btn {
  color: var(--text-dark);
}

/* Style adjustments for the hamburger menu dropdown */
.hamburger-menu .v-card {
  padding: 16px;
}

.hamburger-menu .v-list-item {
  min-height: 48px;
}

.hamburger-menu .v-list-item__title {
  font-size: var(--font-size-base);
  color: var(--text-dark);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
}

.left-section {
  display: flex;
  align-items: center;
}

.right-section {
  display: flex;
  align-items: center;
}

.logo {
  margin-top: -10px;
}

.full-menu {
  display: flex;
  align-items: center;
}

.hamburger-menu {
  display: none;
}

@media (max-width: 960px) {
  .full-menu {
    display: none;
  }

  .hamburger-menu {
    display: block;
  }

  .nav-container {
    justify-content: space-between;
  }
}

/* Adjust spacing for mobile view */
@media (max-width: 960px) {
  .v-app-bar {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
}
</style>