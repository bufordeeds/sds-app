<template>
  <div id="terms-and-conditions__container">
    <h4>
      In order to continue, you must accept the following...
    </h4>

    <ul class="flex flex-col">
      <li>I am at least 18 years of age.</li>
      <li>I am enrolling myself. If I am enrolling for someone else I have their permission to do so.</li>
      <li>
        I agree that I will not intentionally or unintentionally violate any applicable local, state, national
        or international law, including but not limited to the Americans with Disabilities Act and its
        implementing regulations.
      </li>
      <li>
        I understand that it is against the law to intentionally misrepresent an animal as a Service or
        Assistance Dog.
      </li>
      <li>I, or the person being enrolled, has a qualifying disability.</li>
      <li>
        This dog is either a fully trained Service or Assistance Dog, or is in the process of being trained to
        help perform specific tasks related to the owner's disability. Please note that not all states recognize
        Service or Assistance Dogs in Training. I understand that it is my responsibility to understand and obey
        all applicable laws in my area.
      </li>
      <li>I understand that membership is not a substitute for proper training.</li>
      <li>I understand that aggressive behavior constitutes an immediate forfeiture of membership.</li>
      <li>
        I understand that misrepresenting myself or my service animal, behaving in an unbecoming manner,
        misquoting the law or the purpose of our service can result in immediate forfeiture of membership.
      </li>
      <li>
        I will do my very best to leave an excellent impression with others with my behavior and that of my
        Service Dog.
      </li>
      <!--<li>I have read, understand and comply with the definition of a Service or Assistance Animal.</li>-->
      <!--<li>I have read, understand and comply with the Minimum Training Standards for a Service or Assistance Dog which includes a Public Access Test.</li>-->
    </ul>

    <h4 class="text-center">
      Terms of Service
    </h4>

    <sds-terms class="terms-conditions" />

    <div class="my-checkbox">
      <v-checkbox
        v-model="agree_terms"
        label="I agree to the statements above and the Service Dog Standards Terms of Service"
      />
    </div>

    <div
      id="terms-and-conditions__footer"
      class="flex flex-col"
    >
      <button
        class="button button--primary"
        :disabled="!agree_terms"
        @click="$emit('termsAgreed')"
      >
        Continue
      </button>
      <Notification content="Your progress is auto-saved, so you can continue filling out the form at your convenience." />
    </div>
  </div>
</template>

<script>
import Notification from "../../components/Notification.vue";
import SdsTerms from "@/components/SdsTerms";

export default {
  name: "TermsAndConditions",
  components: { Notification, SdsTerms },
  props: {
    agreed: Boolean, //used to tell parent when user has agreed to all terms
  },
  data() {
    return {
      agree_terms: false,
    }
  },
  watch: {
    agree_terms() {
      this.$emit('update:agreed', this.agree_terms);
    }
  }
}
</script>

<style scoped lang='scss'>
  #terms-and-conditions__container {
    background-color: var(--surface-light-pale);
    border-radius: 4px;
    padding: 24px;

    h4 {
      margin-bottom: 16px;
    }

    .terms-conditions {
      background-color: var(--surface-light-white);
      border: 1px solid var(--text-light);
      border-radius: 8px;
      max-height: 50vh;
      margin-left: 0px;
      overflow: auto;
      padding: 15px 15px 15px 20px;
    }

    ul {
      row-gap: 16px;
      padding: 0;

      li {
        background-image: url('../../assets/images/icons/circle-check.svg');
        background-repeat: no-repeat;
        background-position: left 0;
        background-size: 24px;
        list-style: none;
        margin: 0;
        padding-left: 30px;
      }
    }

    .my-checkbox {
      display: flex;
      justify-content: center;
      margin-bottom: 24px;
    }

    #terms-and-conditions__footer {
      row-gap: 16px;

      button {
        flex-grow: 1;
      }
    }
  }
</style>
