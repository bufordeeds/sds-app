<template>
  <MyForm
    id="about-dog-form"
    :handle-submit="handleSave"
  >
    <h3>About the Dog</h3>
    <TextInput
      v-model="dog.name"
      label="Name"
      :rules="[isRequired]"
    />
    <MySelect
      id="dog-gender__select"
      v-model="dog.gender"
      label="Gender"
      :options="gender_options"
      :rules="[isRequired]"
    />
    <MySelect
      id="dog-yob__select"
      v-model="dog.yearOfBirth"
      label="What year was your dog born?"
      :options="yob_options"
      :rules="[isRequired]"
    />
    <MySelect
      id="dog-breed__select"
      v-model="dog.breed"
      label="Breed"
      :options="[]"
      :rules="[isRequired]"
    />
    <MySelect
      id="dog-size__select"
      v-model="dog.size"
      label="How big is your dog?"
      :options="dog_size_options"
      :rules="[isRequired]"
    />
    <TextInput
      v-model="dog.microchipNum"
      label="Microchip Number (if applicable)"
      max-length="14"
      placeholder="12345678901234"
    />
    <div>
      <label>Do you have a secondary disability?</label>
      <v-radio-group v-model="dog.training">
        <v-radio
          label="Yes"
          value="true"
        />
        <v-radio
          label="No"
          value="false"
        />
      </v-radio-group>
    </div>
    <div
      id="about-dog-form__footer"
      class="flex flex-col"
    >
      <button class="button button--primary">
        Continue
      </button>
      <Notification content="Your progress is auto-saved, so you can continue filling out the form at your convenience." /> 
    </div>
  </MyForm>
</template>

<script>
import { EventBus } from '../../../eventBus.js';
import MyForm from '../../../components/inputs/MyForm.vue';
import MySelect from '../../../components/inputs/Select.vue';
import Notification from '../../../components/Notification.vue';
import TextInput from '../../../components/inputs/TextInput.vue';

import validation from '../../../mixins/validation';

export default {
  name: "AboutDog",
  components: { MyForm, MySelect, Notification, TextInput },
  mixins: [validation],
  data() {
    return {
      dog: {
        name: null,
        gender: null,
        yearOfBirth: null,
        breed: null,
        size: null,
        microchipNum: null,
        training: null,
      },
      gender_options: [
        {
          label: 'Male',
          value: 'male',
        },
        {
          label: 'Female',
          value: 'female',
        },
        {
          label: 'Non-binary',
          value: 'non-binary',
        },
        {
          label: 'Prefer not to say',
          value: 'prefer-not-to-say',
        },
        {
          label: 'Other',
          value: 'other',
        },
      ],
      dog_size_options: [
        { label: 'Small (under 20lbs)', value: 'small' },
        { label: 'Medium (20-50lbs)', value: 'medium' },
        { label: 'Large (50-90lbs)', value: 'large' },
        { label: 'Extra Large (90+lbs)', value: 'extra-large' },
      ],
      yob_options: this.populateYearOfBirthOpts(),
    }
  },
  methods: {
    handleSave() {
      EventBus.$emit('handle-form-submission');
    },
    populateYearOfBirthOpts() {
      const yobOptions = [];
      const CURR_YEAR = new Date().getFullYear();

      for (let i = 0; i < 20; i++) {
        yobOptions.push({
          label: (CURR_YEAR - i).toString(),
          value: (CURR_YEAR - i).toString()
        });
      }

      return yobOptions;
    }
  }
}
</script>

<style lang="scss" module>
@import url('../../main.css');
@import url('../../vars.css');

#about-dog-form {
  & > h3 {
    margin-bottom: 16px;
  }

  & > div {
    margin-bottom: 36px;
  }

  label {
    color: var(--text-dark);
    font-size: 14px;
    font-weight: 510;
    letter-spacing: -0.2px;
    line-height: 18px;
  }

  .input-group {
    margin-bottom: 0;
  }

  #about-dog-form__footer {
    row-gap: 16px;
  }
}
</style>
