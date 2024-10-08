<template>
  <div>
    <template v-if="emailVerificationState == 'FORM' || emailVerificationState == 'MODAL'">
      <h4>
        Before we begin, let's verify your email
      </h4>
      <h5
        v-if="errMessage != null"
        class="info-message"
      >
        Oops, it looks like you already have an account.
        <router-link to="/login">
          Log In
        </router-link>
      </h5>

      <my-form
        id="signup__form"
        ref="form"
        class="flex flex-col"
      >
        <TextInput
          v-model="email"
          label="Email address"
          :rules="[isRequired, isEmail]"
        />
        <button
          :disabled="email == null"
          :loading="loading_signup"
          class="button button--primary"
          type="submit"
          @click="changeVerificationState('MODAL')"
        >
          Verify Email
        </button>

        <h5 class="text-center">
          Have an account?
          <router-link to="/login">
            Sign in
          </router-link>
        </h5>
      </my-form>
    </template>

    <Modal v-if="emailVerificationState == 'MODAL'">
      <dialogue class="dialogue-box flex flex-col">
        <h5 class="dialogue__title">
          Please verify your email address
        </h5>
        <p class="dialogue__body">
          Thanks for enrolling in Service Dog Standards! Please verify your email to activate your account, begin your Training and Behavior Standards Agreement and create your Profile page.
        </p>
        <button
          :disabled="loading_signup"
          class="button button--primary"
          @click="signup"
        >
          Verify my Email
        </button>
        <h6>
          Service Dogs Standards is a cloud-based voluntary training and behavior standards and team management solutions for Service Dog Trainers and Handlers. Please note that unverified accounts are automatically deleted in 30 days after sign up.
        </h6>
        <span
          class="dialogue__close"
          @click="changeVerificationState('FORM')"
        >
          <v-icon>close</v-icon>
        </span>
      </dialogue>
    </Modal>


    <!----------------------------show after successful account creation--------------------------------------->
    <div v-if="emailVerificationState == 'SUCCESS'">
      <div style="padding: 60px 20px 60px 20px; text-align: left; ">
        <div
          class="subheading-txt"
          style="text-align: center; "
        >
          Please check your email
        </div>

        <p
          class="pt-6"
          style="text-align: center"
        >
          A verification email has been sent to {{ email }}.
        </p>

        <p>
          If you did not receive an email, please check your mail filter or use a
          <button @click="showConfirm=false; email=null">
            different email
          </button>.
          <!--(Link “different email” goes back to the first screen where they enter their address)-->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import data_getters from "@/mixins/data_getters";
  import validation from "@/mixins/validation";
  import Modal from "../../components/app/modal.vue";
  import TextInput from "../../components/inputs/TextInput.vue";

  export default {
    name: "SignUpModal",
    components: { Modal, TextInput },
    mixins: [data_getters, validation],

    props:{
      showEmailConfirm: {type: Boolean, default: false},// used to bypass showing the account creation page
      acctType: {type: String, default: null}, // HANDLER, TRAINER, AIDE
    },

    data(){
      return {
        code: null, //verification code
        codeErrMessage: [],
        codeConfirmed: false,
        email: null,
        emailVerificationState: 'FORM', // ['FORM', 'MODAL', 'SUCCESS']
        errMessage: null,
        loading_signup: false,
        password: null,
        showPass: false, // controls if password/text mode
        showConfirm: false, //shows confirmation page after account is created
      }
    },

    computed: {
      // showConfirmed2(){
      //   if (this.showEmailConfirm || this.showConfirm ){
      //       return true;
      //   }

      //   return false;
      // }
    },

    methods:{
      changeVerificationState(newState) {
        this.emailVerificationState = newState;
      },
      async signup(){
        let valid = this.$refs.form.validate();
        if (!valid){
            return null;
        }

        let payload = {
            email: this.email,
            // password: this.password,
            account_type: this.acctType,
        }

        try {
            this.loading_signup = true;

            await this.make_request('/auth/createUser', payload, {throwHTTPError: true})
              .then(() => {
                this.changeVerificationState('SUCCESS');
              });
        } catch(e) {
            console.error(e)
            this.changeVerificationState('FORM');

            if (e.status === 400 && e.response && e.response.data.includes('email already exists')){
              this.errMessage = "Oops, it looks like you already have an account"
              this.loading_signup = false;
            }
        }
        // this.$router.push({path: url});
      },

      //verify the email with code
      async verify(){
        let email = this.email;

        if (this.showEmailConfirm){
          //assuming that we're logged in if showEmailConfirm prop is true
          email = this.$auth.profile.email;
        } 

        let payload = {
            email,
            code:  this.code,
        }

        try {
            await this.make_request('/auth/confirmEmail', payload);
            this.codeConfirmed = true;
            this.codeErrMessage = [];
            this.$emit('email-verified')
        }
        catch(e){
            this.codeErrMessage = [`Couldn't verify code`];
        }
      },

      resetValidation() {
        this.errMessage = null;
      }
    }//methods
  }
</script>

<style scoped lang='scss'>
  @import url('../main.css');

  form#signup__form {
    margin-top: 24px;

    .button {
      margin-bottom: 12px;
    }
  }

  dialogue {
    position: relative;

    .dialogue__close {
      cursor: pointer;
      position: absolute;
      right: 8px;
      top: 8px;
    }

    .dialogue__title{
      margin-bottom: 38px;
    }

    .dialogue__body {
      color: var(--text-dark);
      font-size: 15px;
      font-weight: 500;
      line-height: 24px;
      letter-spacing: 0.2px;
      margin-bottom: 56px;
    }

    button {
      margin-bottom: 24px;
    }
  }
</style>
