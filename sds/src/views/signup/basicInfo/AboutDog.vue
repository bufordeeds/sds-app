<template>
  <MyForm id="about-dog-form">
    <h3>About the Dog</h3>
    <TextInput
      v-model="dog.name"
      label="Name"
    />
    <MySelect
      id="dog-gender__select"
      v-model="dog.gender"
      label="Gender"
      :options="gender_options"
    />
    <MySelect
      id="dog-yob__select"
      v-model="dog.yearOfBirth"
      label="What year was your dog born?"
      :options="yob_options"
    />
    <MySelect
      id="dog-size__select"
      v-model="dog.size"
      label="How big is your dog?"
      :options="dog_size_options"
    />
    <TextInput
      v-model="dog.microchipNum"
      label="Microchip Number (if applicable)"
    />
    <span>
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
    </span>
  </MyForm>
</template>

<script>
import MyForm from '../../../components/inputs/MyForm.vue';
import MySelect from '../../../components/inputs/Select.vue';
import TextInput from '../../../components/inputs/TextInput.vue';

export default {
  name: "AboutDog",
  components: { MyForm, MySelect, TextInput },
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