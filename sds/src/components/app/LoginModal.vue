<template>
  <v-card
    class="login-modal"
    max-width="400"
    elevation="8"
  >
    <v-card-title
      v-if="isModal"
      class="headline text-center"
    >
      Sign in
    </v-card-title>
    <v-card-text>
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
        <div class="text-right mb-4">
          <v-btn
            text
            small
            color="primary"
            to="/requestResetPassword"
          >
            Forgot Password?
          </v-btn>
        </div>
        <v-btn
          color="primary"
          block
          large
          :loading="loading"
          @click="login"
        >
          Sign in
        </v-btn>
        <div class="text-center mt-4">
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

<style scoped>
.login-modal {
  margin: auto;
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