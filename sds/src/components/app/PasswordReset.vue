<template>
  <div>
    <slot name="heading">
      <h4 v-if="heading != null">
        {{ heading }}
      </h4>
      <h5 v-if="heading != null">
        Please set your password
      </h5>
    </slot>

    <my-form ref="form">
      <my-text-input
        v-model="password"
        label="Password"
        hint="Enter your password"
        :type="`${showPass ? 'text' : 'password'}`"
        :rules="[isRequired, x => checkLength(x, 8)]"
        :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="showPass = !showPass"
      />

      <my-text-input
        v-model="passwordVerification"
        label="Password Verification"
        hint="Re-enter your password"
        :type="showPass ? 'text' : 'password'"
        :rules="[isRequired]"
        :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append="showPass = !showPass"
      />

      <h5 class="error-message">
        {{ pass_msg }}
      </h5>

      <button
        class="button button--primary"
        :disabled="btn_disabled"
        :loading="loading"
        @click="reset_pw"
      >
        <slot name="button-text">
          {{ type }} Password
        </slot>
      </button>
    </my-form>
  </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";


export default {
  name: "PasswordReset",
  mixins: [data_getters, validation],

  props: {
    emailFill: { type: String, default: null }, //used to prefill the email field
    redirectOnLogin: { type: Boolean, default: false },
    type: { type: String, default: 'Set' }, // Set | Reset
    passwordResetCode: { type: String, default: null }, //the password reset code
    heading: { type: String, default: null },
  },

  data() {
    return {
      password: null,
      passwordVerification: null,
      showPass: false,
      errorMessage: null,
      loading: false,
    }
  },


  computed: {
    btn_disabled() {
      return (
        this.password !== this.passwordVerification ||
        this.password == null ||
        this.passwordVerification == null ||
        this.password === '' ||
        this.passwordVerification === ''
      );
    },

    pass_msg() {
      if (this.password !== this.passwordVerification) {
        return `Passwords don't match`;
      }
      return ''
    }
  },


  methods: {
    async reset_pw() {
      this.errorMessage = null;
      if (!this.$refs.form.validate()) {
        return;
      }

      let code = this.passwordResetCode;

      if (!code) {
        code = this.$route.query.passwordResetCode;
      }

      if (code == null) {
        throw new Error('Password Reset Code must be provided')
      }

      let email = this.emailFill;

      if (email == null) {
        email = this.$route.query.email;
      }

      if (email == null) {
        throw new Error('email code must be provided')
      }

      try {
        this.loading = true;

        let payload = {
          email,
          code,
          pass: this.password,
        }

        await this.make_request('/auth/updatePassword', payload);

        this.loading = false;
      }
      catch (e) {
        this.errorMessage = 'There was an issue updating your password'
      }

      await this.$auth.login(email, this.password);
      this.$emit('pass-updated');
    }

  }//methods
}
</script>

<style scoped>
h5 {
  margin-bottom: 24px;
}
</style>
