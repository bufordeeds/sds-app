<template>
  <main>
    <div
      id="signup"
      class="content-container flex"
    >
      <!-------- Stepper --------------------------------------------------------->
      <div
        id="signup__steps"
        class="flex flex-col"
      >
        <h2>
          Create your Account
        </h2>
        <stepper :step="step" />
      </div>

      <div
        id="signup__form"
        class="flex flex-col"
      >
        <!-------- step 1 container --------------------------------------------------------->
        <select-acct-type
          v-if="step === 1"
          @user-type-selected="acct_type = $event; step += 1"
        />

        <!-------- step 2 container --------------------------------------------------------->
        <div v-if="step === 2">
          <signup
            v-if="verified_email == null"
            :show-email-confirm="accountCreated"
            :acct-type="acct_type"
            @email-verified="on_email_confirmed"
          />

          <password-reset
            v-else
            :email-fill="verified_email"
            heading="Email verified"
            password-reset-code
            @pass-updated="step = 3"
          >
            <template #heading>
              <h4>
                Welcome Back!
              </h4>
              <h5>
                Please choose a password.
              </h5>
            </template>

            <template #button-text>
              Continue
            </template>
          </password-reset>
        </div>

        <!-------- step 3 container --------------------------------------------------------->
        <div v-if="step === 3">
          <v-row>
            <v-col align="center">
              <div class="my-stepper-container">
                <terms :agreed.sync="tc_agreed" />
              </div>
            </v-col>
          </v-row>

          <v-row
            class="ma-0"
            style="justify-content: center"
          >
            <v-btn
              color="var(--color-primary)"
              :disabled="!tc_agreed"
              @click="on_terms_agreed"
            >
              Continue
            </v-btn>
          </v-row>
        </div>



        <!-------- step 3 container --------------------------------------------------------->
        <div v-if="step === 4">
          <v-row>
            <v-col align="center">
              <div class="my-stepper-container">
                <handler-info
                  v-if="isHandler"
                  :setup-mode="true"
                  @user_updated="on_basic_info"
                />

                <user-info
                  v-else
                  @user_updated="on_basic_info"
                />
              </div>
            </v-col>
          </v-row>
        </div>


        <!-------- step 3 container --------------------------------------------------------->
        <div v-if="step === 5">
          <v-row>
            <v-col
              align="center"
              style="margin-top: 50px"
            >
              <div>
                <img
                  v-if="step === 5"
                  src="../../assets/images/content/checkmark.gif"
                  width="200px"
                >
              </div>
              <div class="pt-5">
                Congratulations on Joining Service Dog Standards!
              </div>

              <div class="mt-8">
                <v-btn @click="nav_to_account">
                  Go to my account
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import signup from './SignupModal';
import terms from './termsAndConditions';
import userInfo from './userInfo';
import PasswordReset from "@/components/app/PasswordReset";
import data_getters from "@/mixins/data_getters";
import selectAcctType from "@/views/signup/selectAcctType";
import handlerInfo from "@/views/mgmProfile/EditHandlerInfo";
import Stepper from "@/views/signup/Stepper";

export default {
  name: "SetupAccount",
  components: {
    Stepper, signup, terms, userInfo, selectAcctType, PasswordReset, handlerInfo
  },
  mixins: [data_getters],
  data() {
    return {
      step: 1,
      verified_email: null,

      tc_agreed: false,

      acct_type: null,

      //additional info
      image_uploaded: false,
      social_info: null,
      panel_ix: null, // used to keep track of which panel is open

      census_info: null,
    }
  }, //methods

  computed: {
    accountCreated() {
      console.log(this.$auth.authenticated)

      if (this.$auth.authenticated) {
        return true
      }

      return false;
    },

    isHandler() {
      if (!this.$auth.authenticated) {
        return null
      }

      return this.$auth.profile.acct_type === 'HANDLER';
    },
  },

  created() {
    if (this.$auth.isAuthenticated() && this.$auth.profile.acct_confirmed) {
      this.$router.push('/accountHome');
    }

    if (this.$auth.isAuthenticated() && !this.$auth.profile.acct_confirmed) {
      let setup = this.$auth.profile.setup;
      if (setup.confirmed_email) {
        this.step = 3;
      }

      if (setup.confirmed_tc) {
        this.step = 4;
      }

      if (setup.basic_info) {
        this.step = 5;
      }
    } else {
      if (this.$route.query.verified_email != null) {
        this.step = 2;
        this.verified_email = this.$route.query.verified_email;
      }
    }
  },

  methods: {
    test(e) {
      console.log('test', e);
    },

    async on_email_confirmed() {
      await this.$auth.check_is_logged_in().then(() => {
        this.step = 3;
      });
    },

    async on_terms_agreed() {
      try {
        let payload = { email: this.$auth.profile.email, terms: 'USER_AGREED' };
        await this.make_request('/private/updateSetup', payload, { authenticate: true });
        this.step = 4;
      } catch (e) {
        console.log(e)
      }
    },

    //handler to save basic (trainer) info
    async on_basic_info() {
      try {
        let payload = { email: this.$auth.profile.email, basic_info: 'USER_UPDATED' };
        await this.make_request('/private/updateSetup', payload);
        this.step = 5;
      } catch (e) {
        console.log(e)
      }
    },

    nav_to_account() {
      window.location.replace(process.env.VUE_APP_BASE + '/accountHome')
    },



    async on_social_saved(event) {
      this.social_info = event;

      let payload = {
        user_id: this.$auth.profile.user_id,
        update: {
          social_profiles: event,
        },
      }

      await this.make_request('/private/updateUserProfile', payload);

      this.panel_ix = null;
    },

    async on_census_ans(event) {
      this.census_info = event;

      let payload = {
        user_id: this.$auth.profile.user_id,
        update: {
          census_info: event,
        },
      }

      await this.make_request('/private/updateUserProfile', payload);

      this.panel_ix = null;
    },

    async on_additional_info() {
      try {
        let payload = { email: this.$auth.profile.email, additional_info: 'USER_SAW' };
        await this.make_request('/private/updateSetup', payload,);
        this.step = 6;
      } catch (e) {
        console.error(e)
      }
    },

    async on_join() {
      try {
        let payload = { email: this.$auth.profile.email, behaviors: 'USER_AGREED' };
        await this.make_request('/private/updateSetup', payload,);
      } catch (e) {
        console.error(e)
      }
    },
  }
}
</script>

<style scoped lang="scss">
@import url('../common.css');

h2 {
  color: var(--brand-primary-500);
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -0.5px;
  line-height: 48px;
}

#signup {
  align-items: flex-start;
  min-height: calc(100vh - 68px);
  padding-bottom: 56px;
  padding-top: 56px;
}

#signup__steps {
  row-gap: 32px;
  flex-basis: 50%;
}

#signup__form {
  border-radius: 4px;
  box-shadow: 0px 5px 15px 0px #0000001F, 0px 15px 35px 0px #3C425714;
  flex-basis: 50%;
  padding: 56px;
}
</style>