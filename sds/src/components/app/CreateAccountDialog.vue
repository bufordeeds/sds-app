<template>
  <dialog id="create-account__dialog">
    <MyForm id="create-account__form">
      <h4 class="create-account__form-title">
        Create your account
      </h4>

      <v-col class="create-account__social-media">
        <p>Sign in with your Social Media account</p>
        <v-row class="social-media__row place-content-center">
          <img
            class="social-media__login"
            src="../../assets/images/icons/Facebook.png"
            alt="Facebook SSO Logo"
          >
          <img
            class="social-media__login"
            src="../../assets/images/icons/Google.png"
            alt="Google SSO Logo"
          >
          <img
            class="social-media__login"
            src="../../assets/images/icons/Apple.png"
            alt="Apple SSO Login"
          >
        </v-row>
      </v-col>

      <HorizontalDivider />

      <v-col class="create-account__form-footer">
        <TextInput
          label="Email address"
        />
        <button class="button--primary">
          Continue
        </button>
        <v-row class="place-content-center">
          <p>
            Have an account? <a href="/login">Sign In</a>
          </p>
        </v-row>
      </v-col>
    </MyForm>
  </dialog>
</template>

<script>
import data_getters from "../..//mixins/data_getters";
import validation from "../../mixins/validation";

import MyForm from '../inputs/MyForm.vue';
import TextInput from '../inputs/TextInput.vue';
import HorizontalDivider from "./HorizontalDivider.vue";

export default {
  name: "CreateAccountDialog",
  components: { HorizontalDivider, MyForm, TextInput },
  mixins: [data_getters, validation],
}
</script>

<style scoped lang="css">
@import url('../../views/common.css');

#create-account__dialog {
  background: var(--surface-light-white, #FFFFFF);
  border-radius: 6px;
  border: none;
  box-shadow: 0px 5px 15px 0px #0000001F, 0px 15px 35px 0px #3C425714;
  display: inline-block;
  /* height: 506px; */
  padding: 56px;
  width: 540px;
}

#create-account__dialog h2 {
  font-family: Montserrat;
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.2px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.create-account__social-media p {
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.2px;
  margin: 0;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

#create-account__form .social-media__row {
  column-gap: 40px;
}

#create-account__form .social-media__row .social-media__login:hover {
  cursor: pointer;
}

#create-account__form .create-account__form-footer p {
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  margin: 0;
  letter-spacing: -0.2px;
  text-align: center;
  text-decoration-style: solid;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
</style>