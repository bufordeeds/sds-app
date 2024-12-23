<template>
  <main>
    
    <!-- Angle BG -->
    <canvas class="hero-section-bg default" data-transition-in></canvas>

    <div
      id="signup"
      class="content-container flex"
    >
      <!-------- Stepper --------------------------------------------------------->
      <div
        id="signup__steps"
        :class="step === 'create' ? 'flex flex-col invisible' : 'flex flex-col sm:hidden'"
      >
        <h2>
          Create your Account
        </h2>
        <stepper :step="step" />
      </div>

      <div id="signup__form">
        <MobileStepper :step="step" />
        <!-------- step 1 container --------------------------------------------------------->
        <SelectAccountType
          v-if="step === 1"
          id="step_1"
          @user-type-selected="acct_type = $event; step += 1"
        />

        <!-------- step 2 container --------------------------------------------------------->
        <div
          v-if="step === 2"
          id="step_2"
        >
          <Signup
            v-if="verified_email == null"
            :show-email-confirm="accountCreated"
            :acct-type="acct_type"
            @email-verified="on_email_confirmed"
          />

          <PasswordReset
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
          </PasswordReset>
        </div>

        <!-------- create step container --------------------------------------------------------->
        <div v-if="step === 'create'">
          <CreateAccountDialog />
        </div>

        <!-------- step 3 container --------------------------------------------------------->
        <div
          v-if="step === 3"
          id="step_3"
        >
          <Terms
            :agreed.sync="tc_agreed"
            @terms-agreed="on_terms_agreed"
          />
        </div>

        <!-------- step 4 container --------------------------------------------------------->
        <div
          v-if="step === 4"
          id="step_4"
        >
          <BasicInfo @signup-finish="step = 5" />
          <!-- <HandlerInfo
              v-if="isHandler"
              :setup-mode="true"
              @user_updated="on_basic_info"
            />

            <UserInfo
              v-else
              @user_updated="on_basic_info"
            /> -->
        </div>


        <!-------- step 5 container --------------------------------------------------------->
        <div
          v-if="step === 5"
          id="step_5"
        >
          <v-col id="success__container" align-self="center">
            <img
              src="../../assets/images/content/success-checkmark.gif"
              width="200px"
            >

            <span>
              <h3>Woohoo!</h3>
              <p>
                Congratulations! Your profile is complete.
              </p>
            </span>

            <button class="button button--primary" @click="nav_to_account">
              Go to my account
            </button>
          </v-col>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SelectAccountType from "./selectAcctType.vue";
import Signup from './SignupModal';
import Stepper from "./Stepper";
import Terms from './termsAndConditions';
import CreateAccountDialog from '../../components/app/CreateAccountDialog.vue'
import BasicInfo from './basicInfo/BasicInfo.vue';
import MobileStepper from "./MobileStepper.vue";

import PasswordReset from "@/components/app/PasswordReset";
import data_getters from "@/mixins/data_getters";

import { smoothScrollToTop } from "../../utilities/helpers";

export default {
  name: "SetupAccount",
  components: {
    BasicInfo, CreateAccountDialog, MobileStepper, Stepper, Signup, Terms, SelectAccountType, PasswordReset, //HandlerInfo
  },
  mixins: [data_getters],
  data() {
    return {
      acct_type: null,
      census_info: null,
      image_uploaded: false,
      panel_ix: null, // used to keep track of which panel is open
      social_info: null,
      step: 1, //ROBDEBUG Change this number to start at that page
      tc_agreed: false,
      verified_email: null,
    }
  },

  computed: {
    accountCreated() {
      if (this.$auth.authenticated) {
        return true
      }

      return false;
    },

    isHandler() {
      if (!this.$auth.authenticated) {
        return false;
      }

      return this.$auth.profile.acct_type === 'HANDLER';
    },
  },

  beforeCreate() {
    if (this.$route.query.email || this.$route.query.verified_email) {
      // do some shit
    }
  },

  created() {
    if (this.$route.query.email != null) {
      this.step = 'create';
    }

    if (this.$auth.isAuthenticated() && this.$auth.profile.acct_confirmed) {
      this.$router.push('/accountHome');
    }

    if (this.$auth.isAuthenticated() && !this.$auth.profile.acct_confirmed) {
      let setup = this.$auth.profile.setup;
      if (setup.confirmed_email) {
        this.step = 4;
      }

      if (setup.confirmed_tc) {
        this.step = 5;
      }

      if (setup.basic_info) {
        this.step = 6;
      }
    } else {
      if (this.$route.query.verified_email != null) {
        this.step = 2;
        this.verified_email = this.$route.query.verified_email;
      }
    }
  },

  methods: {
    async on_email_confirmed(verificationResponse) {
      if (verificationResponse.status === 404) {
        this.$router.push({
          query: {
            email: verificationResponse.response.data.user_email,
            account_type: this.acct_type,
          }
        });
      }

      if (verificationResponse.msg === 'EmailConfirmed' && 'reset_pw' in verificationResponse) {
        this.$router.push({ path: '/login', query: { email: verificationResponse.user_email }});
      }
    },

    async on_terms_agreed() {
      try {
        let payload = {
          email: this.$auth.profile.email,
          terms: 'USER_AGREED',
        };

        await this.make_request('/private/updateSetup', payload, { authenticate: true })
          .then(() => {
            smoothScrollToTop();
            this.step = 4;
          });
      } catch (e) {
        console.log(e)
      }
    },

    //handler to save basic (trainer) info
    async on_basic_info() {
      smoothScrollToTop();
      this.step = 5;
      // try {
      //   let payload = { email: this.$auth.profile.email, basic_info: 'USER_UPDATED' };
      //   await this.make_request('/private/updateSetup', payload);
      // } catch (e) {
      //   console.log(e)
      // }
    },

    nav_to_account() {
      this.$router.push({ path: '/accountHome' });
    },

    async on_social_saved(event) {
      smoothScrollToTop();
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
      smoothScrollToTop();
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
      smoothScrollToTop();
      try {
        let payload = { email: this.$auth.profile.email, additional_info: 'USER_SAW' };
        await this.make_request('/private/updateSetup', payload,);
        this.step = 6;
      } catch (e) {
        console.error(e)
      }
    },

    async on_join() {
      smoothScrollToTop();
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

.content-container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 0;
}

#success__container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-items: center;
  padding: 24px;
}

#success__container > span,
#success__container > button {
  align-self: stretch;
}

h2 {
  color: var(--brand-primary-500);
  font-size: var(--rt-h2);
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 48px;
}

#signup {
  align-items: flex-start;
  justify-content: center;
  min-height: calc(100vh - 68px);
  padding-bottom: 56px;
  padding-top: 56px;
}

#signup__steps {
  row-gap: 32px;
}

#signup__form {
  border-radius: 8px;
  box-shadow: 0px 5px 15px 0px #0000001F, 0px 15px 35px 0px #3C425714;
  flex-basis: 55%;
  max-width: 55%;

  #step_1,
  #step_2,
  #step_4 {
    padding: 56px;
  }

  #step_3 {
    padding: 24px;
  }
}

@media only screen and (max-width: 768px) {
  #signup {
    /*align-items: center;*/
    justify-content: center;
    padding-top: 24px;

    #signup__steps {
      display: none;
    }

    #signup__form {
      min-width: 350px;

      #step_1,
      #step_2,
      #step_3,
      #step_4 {
        padding: 16px;
      }
    }
  }
}

.invisible {
  display: none;
}

</style>