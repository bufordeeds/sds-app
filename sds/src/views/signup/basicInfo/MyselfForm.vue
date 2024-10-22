<template>
  <div>
    <div
      id="myself-form__header"
      class="flex flex-col"
    >
      <h2 class="text-center">
        What's your Name?
      </h2>
      <div
        id="validation-info"
        class="flex"
      >
        <img
          src="../../../assets/images/icons/gold-circle-star.png"
          style="height: 32px; width: 32px;"
        >
        <p>Please enter your name exactly as it appears on your government-issued ID, travel document, or other valid form of identification.</p>
      </div>
    </div>
    <MyForm
      id="myself-form__form"
      ref="form"
      :handle-submit="handleSave"
    >
      <TextInput
        v-model="firstName"
        label="First name"
        name="firstName"
        :rules="[isRequired]"
        :error="errors.firstName"
        @input-focused="clearError"
      />     
      <TextInput
        v-model="middleName"
        label="Middle name"
      />     
      <TextInput
        v-model="lastName"
        label="Last name"
        name="lastName"
        :rules="[isRequired]"
        :error="errors.lastName"
        @input-focused="clearError"
      />     
    </MyForm>

    <div id="valid-id-info">
      <h3>Valid forms of ID</h3>
      <p>To avoid confusion, please make sure that your name matches one of these forms of ID.</p>
    </div>

    <div id="legal-info">
      <p>
        Valid U.S. passport book or passport card
      </p>
      <p>
        Valid driver's license or REAL ID compliant driver's license
      </p>

      <h4>
        OTHER FORMS OF SECONDARY IDENTIFICATION
      </h4>
      <ul>
        <li>Government or state issued ID</li>
        <li>Government employee ID (city, county, state, or federal)</li>
        <li>Trusted Traveler IDs (including valid Global Entry, FAST, SENTRI, and NEXUS cards)</li>
        <li>Certificate of Naturalization</li>
        <li>Certificate of Citizenship</li>
        <li>U.S. military or military dependent ID</li>
        <li>Current (valid) foreign passport</li>
        <li>Enhanced Tribal Cards and Native American tribal photo IDs</li>
      </ul>

      <h4>
        IF HANDLER IS UNDER 18
      </h4>
      <ul>
        <li>Valid driving learner's permit with photo</li>
        <li>Valid non-driver ID with photo</li>
        <li>Temporary driver's license with photo</li>
        <li>U.S. Permanent Resident Card (Green Card) - commonly used by a parent of a U.S. citizen child applicant</li>
        <li>Current school ID with photo</li>
        <li>Birth certificate</li>
        <li>Airline boarding pass (for traveling same-day)</li>
      </ul>
    </div>

    <div
      id="myself-form__footer"
      class="flex flex-col"
    >
      <button
        class="button button--primary"
        form="myself-form__form"
      >
        Continue
      </button>
      <Notification content="Your progress is auto-saved, so you can continue filling out the form at your convenience." /> 
    </div>
  </div>
</template>

<script>
import { EventBus } from '../../../eventBus';
import validation from "../../../mixins/validation";

import MyForm from '../../../components/inputs/MyForm.vue';
import Notification from '../../../components/Notification.vue';
import TextInput from '../../../components/inputs/TextInput.vue';

export default {
  components: {
    MyForm,
    Notification,
    TextInput,
  },
  mixins: [validation],
  data() {
    return  {
      firstName: '',
      middleName: '',
      lastName: '',
      errors: {},
    }
  },
  methods: {
    clearError(e) {
      this.$delete(this.errors, e.currentTarget.name);
    },
    handleSave() {
      EventBus.$emit(
        'handle-form-submission',
        {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
        }
      );
    },
  }
}
</script>

<style lang="scss">
@import url('../../vars.css');

#myself-form__header {
  margin-bottom: 16px;
  row-gap: 16px;
}

#validation-info {
  align-items: center;
  column-gap: 16px;

  p {
    color: var(--text-medium);
    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }
}

#valid-id-info {
  margin-bottom: 16px;

  h3,
  p {
    color: var(--text-medium);
    font-family: var(--font-family);
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
  }

  h3 {
    font-weight: 700;
  }
}

#legal-info {
  border: 1px solid var(--border-default);
  border-radius: 8px;
  color: var(--text-medium);
  height: 216px;
  margin-bottom: 56px;
  overflow: auto;
  padding: 8px;
  width: 100%;

  h4,
  p,
  li {
    font-size: 14px;
    letter-spacing: -0.2px;
    line-height: 18px;
  }

  h4 {
    font-weight: 700;
    margin-bottom: 4px;
    margin-top: 24px;
  }

  p {
    font-weight: 500;
  }

  ul {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    row-gap: 4px;
  }
}

#myself-form__footer {
  row-gap: 16px;
}
</style>