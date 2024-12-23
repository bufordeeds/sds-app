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
        <MySelect
          id="dog-gender__select"
          v-model="dog.gender"
          label="Gender"
          :items="gender_options"
          :rules="[isRequired]"
          outlined
        />
        <MySelect
          id="dog-yob__select"
          v-model="dog.yearOfBirth"
          label="What year was your dog born?"
          :items="yob_options"
          :rules="[isRequired]"
          outlined
        />
        <MySelect
          id="dog-breed__select"
          v-model="dog.breed"
          label="Breed"
          :items="dog_breed_options"
          :rules="[isRequired]"
          outlined
        />
        <MySelect
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
          <label>Is your dog currently in training?</label>
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
import MySelect from '../../../components/inputs/Select.vue';
import Notification from '../../../components/Notification.vue';
import TextInput from '../../../components/inputs/TextInput.vue';

import data_getters from '../../../mixins/data_getters.js';
import validation from '../../../mixins/validation';

export default {
  name: "AboutDog",
  components: { MyForm, MySelect, Notification, TextInput },
  mixins: [data_getters, validation],
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
      loading: false,
      gender_options: ['Male', 'Female', 'Non-Binary', 'Prefer not to say', 'Other'],
      dog_breed_options: [
        "Labrador Retriever",
        "German Shepherd",
        "Golden Retriever",
        "Bulldog",
        "Poodle",
        "Beagle",
        "Rottweiler",
        "Yorkshire Terrier",
        "Dachshund",
        "Siberian Husky",
        "Boxer",
        "Chihuahua",
        "Great Dane",
        "Doberman Pinscher",
        "Shih Tzu",
        "Australian Shepherd",
        "Cavalier King Charles Spaniel",
        "Border Collie",
        "Pomeranian",
        "French Bulldog",
        "Cocker Spaniel",
        "Boston Terrier",
        "Pembroke Welsh Corgi",
        "Maltese",
        "Basset Hound",
        "Bernese Mountain Dog",
        "Akita",
        "Staffordshire Bull Terrier",
        "Newfoundland",
        "Weimaraner",
        "Collie",
        "Saint Bernard",
        "Samoyed",
        "English Springer Spaniel",
        "Miniature Schnauzer",
        "Shetland Sheepdog",
        "Bullmastiff",
        "Airedale Terrier",
        "Whippet",
        "Irish Setter",
        "Vizsla",
        "Rhodesian Ridgeback",
        "Alaskan Malamute",
        "Italian Greyhound",
        "Bloodhound",
        "Australian Cattle Dog",
        "Papillon",
        "Havanese",
        "Lhasa Apso",
        "Schipperke"
      ],
      dog_size_options: ['Small (under 20lbs)', 'Medium (20-50lbs)', 'Large (50-90lbs)', 'Extra Large (90+lbs)'],
      yob_options: this.populateYearOfBirthOpts(),
    }
  },
  methods: {
    async handleSave() {
      this.loading = true;
      const payload = {
        email: this.$auth.profile.email,
        'dog_info.name': this.dog.name,
        'dog_info.gender': this.dog.gender,
        'dog_info.yob': this.dog.yearOfBirth,
        'dog_info.breed': this.dog.breed,
        'dog_info.size': this.dog.size,
        'dog_info.microchipNumber': this.dog.microchipNum,
        'dog_info.training': this.dog.training,
        'setup.basic_info_passed': true,
      };

      await this.make_request('/private/updateUserInfo', payload)
        .then((res) => {
          this.loading = false;
          EventBus.$emit('handle-form-submission');
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
        })
      
    },
    populateYearOfBirthOpts() {
      const yobOptions = [];
      const CURR_YEAR = new Date().getFullYear();

      for (let i = 0; i < 20; i++) {
        yobOptions.push((CURR_YEAR - i).toString());
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
