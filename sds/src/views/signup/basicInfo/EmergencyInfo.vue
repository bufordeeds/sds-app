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
      <MySelect
        id="emergency-contact__relationship"
        label="Relationship to disabled inidividual"
        :options="relationship_list"
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
      <MySelect
        id="emergency-contact__primary-disability"
        v-model="disabilities.primary"
        label="Primary Disability"
        :options="disability_list"
        name="disabilities.primary"
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
import MySelect from '../../../components/inputs/Select.vue';
import Notification from '../../../components/Notification.vue';
import TextInput from '../../../components/inputs/TextInput.vue';

export default {
  name: "EmergencyContactInfo",
  components: {
    MyForm,
    MySelect,
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
        { label: 'Arthritis (severe)', value: 'severe-arthritis' },
        { label: 'Ataxia (poor balance)', value: 'ataxia' },
        { label: 'Autism or Autism Spectrum', value: 'autism-spectrum' },
        { label: 'Blindness or Impaired Vision', value: 'blind-impaired' },
        { label: 'Cardio/Pulmonary Disease', value: 'cardio-pulmonary' },
        { label: 'Cerebral Palsy', value: 'cerebral-palsy' },
        { label: 'Deafness or Impaired Hearing', value: 'deaf-impaired' },
        { label: 'Diabetes', value: 'diabetes' },
        { label: 'Life Threatening Allergies/Anaphylaxis', value: 'anaphylaxis' },
        { label: 'Multiple Sclerosis (M.S.)', value: 'multiple-sclerosis' },
        { label: 'Medical Alert or Response', value: 'medical-alert-response' },
        { label: 'Neurological Disorders', value: 'neurological-disorder' },
        { label: 'Physical Mobility Issues', value: 'physical-mobility-issues' },
        { label: 'Psychiatric Disabilities', value: 'psychiatric' },
        { label: 'Seizure Disorders (Epilepsy)', value: 'epilepsy' },
        { label: 'Spina Bifida', value: 'spina-bifida' },
        { label: 'Spinal Cord/Head Trauma', value: 'spinal-head-trauma' },
        { label: 'Mobility Issues', value: 'mobility-issues' },
        { label: 'Stroke', value: 'stroke' },
        { label: 'Not listed', value: 'not-listed' },
      ],
      relationship_list: [
        { value: 'Parent', label: 'Parent'},
        { value: 'Spouse', label: 'Spouse'},
        { value: 'OtherFamilyMember', label: 'Other Family Member'},
        { value: 'FriendOrNeighbor', label: 'Friend or Neighbor'},
        { value: 'Caretaker', label: 'Caretaker'},
        { value: 'ServiceDogTrainer', label: 'Service Dog Trainer or Training Organization'},
        { value: 'SocialWorkerTherapist', label: 'Social Worker, Counselor, Therapist, Physician'},
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
