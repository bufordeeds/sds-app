<template>
  <div>
    <h3>Emergency Contact Information</h3>

    <MyForm
      id="emergency-contact-form"
      ref="emergency-contact-form"
      :handle-submit="handleSave"
      class="flex flex-col"
    >
      <TextInput
        v-model="firstName"
        label="First Name"
        name="firstName"
      />
      <TextInput
        v-model="lastName"
        label="Last Name"
        name="lastName"
      />
      <v-select
        id="emergency-contact__relationship"
        label="Relationship to disabled inidividual"
        :items="relationship_list"
        outlined
      />
      <TextInput
        v-model="phone"
        label="Primary Phone"
        name="phone"
      />
      <TextInput
        v-model="emailAddress"
        label="Email address"
        name="emailAddress"
      />
      <span>
        <h3>Disability Information</h3>
        <p>Which best describes your PRIMARY reason for using a Service Dog?</p>
      </span>
      <v-select
        id="emergency-contact__primary-disability"
        v-model="disabilities.primary"
        label="Primary Disability"
        :items="disability_list"
        name="disabilities.primary"
        outlined
      />
      <span>
        <label>Do you have a secondary disability?</label>
        <v-radio-group v-model="disabilities.secondary">
          <v-radio
            label="Yes"
            value="true"
          />
          <v-radio
            label="No"
            value="false"
          />
        </v-radio-group>
      </span>
      <div
        id="emergency-contact-form__footer"
        class="flex flex-col"
      >
        <button
          class="button button--primary"
        >
          Continue
        </button>
        <Notification content="Your progress is auto-saved, so you can continue filling out the form at your convenience." /> 
      </div>
    </MyForm>
  </div>
</template>

<script>
import { EventBus } from '../../../eventBus.js';
import MyForm from '../../../components/inputs/MyForm.vue';
import Notification from '../../../components/Notification.vue';
import TextInput from '../../../components/inputs/TextInput.vue';

export default {
  name: "EmergencyContactInfo",
  components: {
    MyForm,
    Notification,
    TextInput,
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      relationshipToIndividual: null,
      phone: null,
      emailAddress: null,
      disabilities: {
        primary: null,
        secondary: null,
      },
      disability_list: [
        'Arthritis (severe)',
        'Ataxia (poor balance)',
        'Autism or Autism Spectrum',
        'Blindness or Impaired Vision',
        'Cardio/Pulmonary Disease',
        'Cerebral Palsy',
        'Deafness or Impaired Hearing',
        'Diabetes',
        'Life Threatening Allergies/Anaphylaxis',
        'Multiple Sclerosis (M.S.)',
        'Medical Alert or Response',
        'Neurological Disorders',
        'Physical Mobility Issues',
        'Psychiatric Disabilities',
        'Seizure Disorders (Epilepsy)',
        'Spina Bifida',
        'Spinal Cord/Head Trauma',
        'Mobility Issues',
        'Stroke',
        'Not listed',
      ],
      relationship_list: [
        'Parent',
        'Spouse',
        'OtherFamilyMember',
        'FriendOrNeighbor',
        'Caretaker',
        'ServiceDogTrainer',
        'SocialWorkerTherapist',
      ],
    }
  },
  methods: {
    handleSave() {
      EventBus.$emit('handle-form-submission');
    },
  }
}
</script>

<style lang="scss">
@import url('../../common.css');

#emergency-contact-form {
  row-gap: 32px;

  .input-group,
  .v-input {
    margin: 0;
  }

  h3 {
    line-height: 28px;
    letter-spacing: -0.22px;
  }

  p {
    font-size: 17px;
    line-height: 24px;
    margin-bottom: 0;
  }

  #emergency-contact-form__footer {
    row-gap: 16px;

    button.button--primary {
      margin-top: 16px;
    }
  }
}
</style>
