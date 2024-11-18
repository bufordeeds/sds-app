<template>
  <div>
    <h3>About the Dog</h3>

    <MyForm
      id="about-dog-form"
      :handle-submit="handleSave"
    >
      <div class="about-dog-form">
        <TextInput
          v-model="dog.name"
          label="Name"
          :rules="[isRequired]"
        />
        <v-select
          id="dog-gender__select"
          v-model="dog.gender"
          label="Gender"
          :items="gender_options"
          :rules="[isRequired]"
          outlined
        />
        <v-select
          id="dog-yob__select"
          v-model="dog.yearOfBirth"
          label="What year was your dog born?"
          :items="yob_options"
          :rules="[isRequired]"
          outlined
        />
        <v-select
          id="dog-breed__select"
          v-model="dog.breed"
          label="Breed"
          :items="[]"
          :rules="[isRequired]"
          outlined
        />
        <v-select
          id="dog-size__select"
          v-model="dog.size"
          label="How big is your dog?"
          :items="dog_size_options"
          :rules="[isRequired]"
          outlined
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
      </div>
    </MyForm>
  </div>
</template>

<script>
import { EventBus } from '../../../eventBus.js';
import MyForm from '../../../components/inputs/MyForm.vue';
import Notification from '../../../components/Notification.vue';
import TextInput from '../../../components/inputs/TextInput.vue';

import validation from '../../../mixins/validation';

export default {
  name: "AboutDog",
  components: { MyForm, Notification, TextInput },
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

<style lang="scss">
@import url('../../main.css');
@import url('../../vars.css');

#signup__form form #about-dog-form__footer {
    gap: 16px;

    > .button--primary {
      margin-top: 16px;
    }
}
</style>
