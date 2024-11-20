<template>
  <div>

    <v-card class="login-modal">
      <v-card-title v-if="isModal" class="headline text-center">
        Sign in
      </v-card-title>
      <v-card-text>

        <h4 class="pb-4">Sign in to your account</h4>
        <div class="text-center captions-caption-medium pb-4">Sign in with your social media account</div>

        <section class="social_signin">
          <div class="social-logos">
            <svg class="social_logo facebook" width="48" height="48" viewBox="0 0 48 48" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="#0866FF" />
              <path
                d="M33.3999 31.2825L34.7467 23.968H26.9074V21.3811C26.9074 17.5157 28.4278 16.029 32.3632 16.029C33.5855 16.029 34.5693 16.0587 35.1358 16.1182V9.48758C34.0626 9.1902 31.439 8.89281 29.9185 8.89281C21.8988 8.89281 18.2019 12.6691 18.2019 20.8162V23.968H13.2529V31.2825H18.2019L18.2019 48H26.9074V31.2825H33.3999Z"
                fill="white" />
            </svg>
            <div class="social_logo google">
              <svg class="group-4" width="36" height="36" viewBox="0 0 36 36" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M35.0558 18.3852C35.0558 17.2014 34.9243 16.0176 34.7928 14.8338H18.355V21.542H27.6917C27.2972 23.6465 26.1136 25.6195 24.2726 26.8033V31.1438H29.9272C33.2148 28.1186 35.0558 23.6465 35.0558 18.3852Z"
                  fill="#4285F4" />
                <path
                  d="M18.3575 35.3797C23.0955 35.3797 27.0439 33.8016 29.9394 31.1714L24.2801 26.8317C22.7007 27.8837 20.7265 28.5413 18.3575 28.5413C13.8826 28.5413 9.93424 25.5166 8.61812 21.3083H2.82715V25.7796C5.85424 31.6975 11.7768 35.3797 18.3575 35.3797Z"
                  fill="#34A853" />
                <path
                  d="M8.61914 21.3009C7.82855 19.194 7.82855 16.8237 8.61914 14.585V10.1078H2.82149C0.317965 14.9801 0.317965 20.7742 2.82149 25.7782L8.61914 21.3009Z"
                  fill="#FBBC04" />
                <path
                  d="M18.3328 7.47964C20.8334 7.47964 23.2025 8.40206 25.045 10.1151L30.0463 5.10771C26.8876 2.20868 22.676 0.495616 18.4644 0.62739C11.8838 0.62739 5.82957 4.31706 2.93408 10.2469L8.72505 14.7272C9.90956 10.5104 13.858 7.47964 18.3328 7.47964Z"
                  fill="#EA4335" />
              </svg>
            </div>
            <svg class="social_logo apple" width="48" height="48" viewBox="0 0 48 48" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="12" fill="black" />
              <path
                d="M37.3759 17.014C37.163 17.1792 33.404 19.2973 33.404 24.007C33.404 29.4546 38.1872 31.3818 38.3303 31.4295C38.3083 31.5469 37.5705 34.0688 35.8084 36.6384C34.2373 38.8997 32.5964 41.1573 30.1002 41.1573C27.6041 41.1573 26.9616 39.7073 24.08 39.7073C21.2718 39.7073 20.2733 41.205 17.9901 41.205C15.7068 41.205 14.1136 39.1126 12.2819 36.543C10.1601 33.5255 8.4458 28.8378 8.4458 24.3888C8.4458 17.2526 13.0858 13.4679 17.6523 13.4679C20.0788 13.4679 22.1014 15.0611 23.6248 15.0611C25.0748 15.0611 27.3361 13.3725 30.0966 13.3725C31.1428 13.3725 34.9017 13.4679 37.3759 17.014ZM28.7861 10.3514C29.9277 8.99681 30.7353 7.11733 30.7353 5.23784C30.7353 4.97721 30.7133 4.71291 30.6656 4.5C28.8081 4.56975 26.5982 5.73708 25.2657 7.28252C24.2195 8.47188 23.2431 10.3514 23.2431 12.2565C23.2431 12.5429 23.2908 12.8292 23.3128 12.921C23.4303 12.943 23.6212 12.9687 23.812 12.9687C25.4786 12.9687 27.5747 11.8527 28.7861 10.3514Z"
                fill="white" />
            </svg>
          </div>

          <div class="or">
            <div class="or_divider"></div>
            <div class="label">or</div>
            <div class="or_divider"></div>
          </div>

        </section>

        <my-form ref="form">
          <div v-if="error_msg" class="error-message mb-4">
            {{ error_msg }}
          </div>
          <my-text-input v-model="email" label="Email Address" :rules="[isRequired, checkEmail]" class="mb-4" />
          <my-text-input v-model="password" label="Password" :rules="[isRequired]" :is-password="!showPass"
            :append-icon="showPass ? 'mdi-eye-off' : 'mdi-eye'" class="mb-4" :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass" @keyup-enter="login" />
          <div class="login--modal--footer">
            <v-btn text large color="primary" to="/requestResetPassword">
              Forgot Password?
            </v-btn>
            <v-btn color="primary" block large :loading="loading" @click="login">
              Continue
            </v-btn>
            <div class="text-center">
              <span class="captions-caption-medium pr-2">Don't have an account?</span>
              <v-btn text small color="primary" to="/signup">
                Create one
              </v-btn>
            </div>
          </div>
        </my-form>
      </v-card-text>
    </v-card>
  </div>
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
      email: this.emailFill || this.$route.query.email || '',
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
  display: flex;
  flex-direction: column;
  margin: 0 auto 56px;
  width: 540px;
  min-width: 540px;
  border-radius: 12px;
  box-shadow: var(--card-shadow-xlarge) !important;
  overflow: hidden;

  .v-card__text {
    padding: 56px 48px;
  }
  form {
    margin-top: 24px;
  }

  .social-logos,
  .social-logos * {
      box-sizing: border-box;
  }

  .social-logos {
    position: relative;
    display: flex;
    flex-direction: row;
    gap: 40px;
    align-items: center;
    justify-content: center;

    .social_logo {
      position: relative;
      overflow: visible;
      border-radius: 12px;
      flex-shrink: 0;
      width: 48px;
      height: 48px;
    }
    .google {
      background: #d7e9ff;
      overflow: hidden;
    }
    .group-4 {
      position: absolute;
      right: 14.47%;
      left: 14.47%;
      bottom: 13.79%;
      top: 13.79%;
      width: 71.07%;
      height: 72.42%;
      overflow: visible;
    }
  }
  .or {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
    width: 100%;
    height: 32px;

    .or_divider {
      position: relative;
      background: #d2d2d7;
      width: 100%;
      height: 1px;
    }
    .label {
      position: relative;
      padding: 0 16px;
      width: auto;
      background: #ffffff;
      text-align: center;
      font-family: 'Montserrat-Bold', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--text-medium, #616165);
    }
  }

  .login--modal--footer {
    gap: 16px;

    button.v-btn.primary {
      border-radius: 6px;
      height: 44px;
      font-size: var(--rt-small);
      font-weight: 600;
      letter-spacing: -0.12px;
      line-height: 20px;
      padding: 12px;

      &:hover {
        background-color: #1d1d1d !important;
      }
    }
    a.v-btn.v-size--large.primary--text {
      border-radius: 6px;
      height: 44px;
      font-size: var(--rt-small);
      font-weight: 600;
      letter-spacing: -0.12px;
      line-height: 20px;
      padding: 12px;
    }
  }
}
@media (max-width: 960px) {
  .login-modal {
    width: 50%;
    max-width: 375px;
    min-width: fit-content;

    .v-card__text {
      padding: 16px 20px;
    }
    form {
      gap: 0;
    }
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