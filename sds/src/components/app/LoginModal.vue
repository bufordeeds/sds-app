<template>
  <v-card
    class="login-modal"
    min-width="540"
  >
    <v-card-title
      v-if="isModal"
      class="headline text-center"
    >
      Sign in
    </v-card-title>
    <v-card-text>

      <h3 class="pb-4">Sign in to your account</h3>
      <div class="text-center captions-caption-medium pb-4">Sign in with your social media account</div>

      <my-form ref="form">
        <div
          v-if="error_msg"
          class="error-message mb-4"
        >
          {{ error_msg }}
        </div>
        <my-text-input
          v-model="email"
          label="Email Address"
          :rules="[isRequired, checkEmail]"
          class="mb-4"
        />
        <my-text-input
          v-model="password"
          label="Password"
          :rules="[isRequired]"
          :is-password="!showPass"
          :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
          class="mb-4"
          :type="showPass ? 'text' : 'password'"
          @click:append="showPass = !showPass"
          @keyup-enter="login"
        />
        <div class="login--modal--footer">
          <v-btn
            text
            large
            color="primary"
            to="/requestResetPassword"
          >
            Forgot Password?
          </v-btn>
          <v-btn
            color="primary"
            block
            large
            :loading="loading"
            @click="login"
          >
            Continue
          </v-btn>
          <div class="text-center">
            <span class="caption">Don't have an account?</span>
            <v-btn
              text
              small
              color="primary"
              to="/signup"
            >
              Create one
            </v-btn>
          </div>
        </div>
      </my-form>
    </v-card-text>
  </v-card>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";

export default {
  name: "LoginModal",
  mixins: [data_getters, validation],
  props: {
    emailFill: { type: String, default: null },
    redirectOnLogin: { type: Boolean, default: false },
    isModal: { type: Boolean, default: true },
  },

  data() {
    return {
      email: this.emailFill,
      password: null,
      showPass: false,
      error_msg: null,
      loading: false,
    }
  },

  methods: {
    async login() {
      this.error_msg = null;
      if (!this.$refs.form.validate()) {
        return;
      }

      try {
        this.loading = true;
        let loggedin = await this.$auth.login(this.email, this.password);

        this.$emit('logged-in', loggedin);
        if (this.$route.path === '/' || this.$route.path === '/login') {
          if (this.$auth.profile.acct_type === 'SDS-ADMIN') {
            await this.$router.push('/admin/orders');
          } else {
            await this.$router.push('/accountHome');
          }
        }
      } catch (e) {
        this.error_msg = 'Please Check Credentials'
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-modal {
  margin: 0 auto;
  max-width: 540px;
  width: 540px;
  border-radius: 12px;
  box-shadow: var(--card-shadow-xlarge) !important;

  .v-card__text {
    padding: 56px 48px;
  }
  form {
    margin-top: 32px;
  }
  .login--modal--footer {
    gap: 16px;
  }
}

.error-message {
  color: var(--color-input-error);
  font-size: 0.875rem;
  padding: 8px;
  border-radius: 4px;
  background-color: rgba(var(--v-error-base), 0.12);
}

/* Custom styles to match your input styles */
:deep(.v-text-field__details) {
  display: none;
}

:deep(.v-text-field__slot input) {
  border: 1px solid #adadad;
  border-radius: 0;
  background-color: white;
  padding: 5px 5px 5px 10px;
  width: 100%;
  text-align: left;
  outline: none;
}

:deep(.v-text-field__slot input:focus) {
  border: 2px solid var(--color-input-active);
}

:deep(.v-text-field--error .v-text-field__slot input) {
  border: 2px solid var(--color-input-error);
}

:deep(.v-label) {
  position: absolute;
  font-size: 12pt;
  margin-top: 5px;
  margin-left: 7px;
  color: #949393;
  padding: 3px;
  transition: margin 0.5s;
}

:deep(.v-label--active) {
  font-size: 8pt;
  margin-left: 5px;
  margin-top: -20px;
}
</style>