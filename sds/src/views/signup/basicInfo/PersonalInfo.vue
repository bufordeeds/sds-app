<template>
  <div>
    <h3>
      Personal Information
    </h3>

    <MyForm
      id="personal-info__form"
      ref="perons-info__form"
      :handle-submit="handleSave"
    >
      <span>
        <MySelect
          id="gender-select"
          v-model="gender"
          label="Gender"
          name="gender"
          :items="gender_options"
          :rules="[isRequired]"
          outlined
        />
        <TextInput
          v-if="gender === 'Other'"
          v-model="other"
          name="other"
          placeholder="Please specify..."
          :rules="gender === 'Other' ? [isRequired] : []"
        />
      </span>
      <section id="dob__section">
        <h4>What is your date of birth?</h4>
        <div class="flex">
          <TextInput
            v-model="dob.month"
            label="Month"
            max-length="2"
            max-value="12"
            min-value="01"
            name="month"
            placeholder="MM"
            :rules="[isRequired, isValidMonth]"
          />
          <TextInput
            v-model="dob.date"
            label="Day"
            max-length="2"
            max-value="31"
            min-value="01"
            name="day"
            placeholder="DD"
            :rules="[isRequired, (month) => isValidDayOfMonth(month, dob.month)]"
          />
          <TextInput
            v-model="dob.year"
            label="Year"
            max-length="4"
            name="year"
            placeholder="YYYY"
            :rules="[isRequired, isValidYear]"
          />
        </div>
      </section>
      <TextInput
        v-model="phone.primary"
        label="Primary Phone"
        name="primary"
        :rules="[isRequired, isPhone]"
      />
      <TextInput
        v-model="phone.secondary"
        label="Secondary Phone (if applicable)"
        name="secondary"
        :rules="[isPhone]"
      />
      <TextInput
        v-model="alternateEmail"
        label="Alternate email address"
        name="alternateEmail"
        :rules="[isEmail]"
      />

      <div
        id="personal-info-form__footer"
        class="flex flex-col"
      >
        <button
          class="button button--primary"
          form="personal-info__form"
        >
          Continue
        </button>
        <Notification content="Your progress is auto-saved, so you can continue filling out the form at your convenience." /> 
      </div>
    </MyForm>

  </div>
</template>

<script>
  import { EventBus } from '../../../eventBus';
  import MyForm from '../../../components/inputs/MyForm.vue';
  import MySelect from '../../../components/inputs/Select.vue';
  import Notification from '../../../components/Notification.vue';
  import TextInput from '../../../components/inputs/TextInput.vue';

  import data_getters from '../../../mixins/data_getters';
  import validation from '../../../mixins/validation';

  export default {
    name: "PersonalInfo",
    components: {
      MyForm,
      MySelect,
      Notification,
      TextInput,
    },
    mixins: [data_getters, validation],
    data() {
      return {
        gender: null,
        other: null,
        dob: {
          month: null,
          date: null,
          year: null,
        },
        phone: {
          primary: null,
          secondary: null,
        },
        alternateEmail: null,
        gender_options: [
          'Male',
          'Female',
          'Non-binary',
          'Prefer not to say',
          'Other',
        ]
      }
    },
    methods: {
      async handleSave() {
        const payload = {
          email: this.$auth.profile.email,
          'private_info.gender': this.gender,
          'private_info.phone': this.phone.primary,
          'private_info.phone2': this.phone.secondary,
          'private_info.email2': this.alternateEmail,
          'private_info.dob': new Date(`${this.dob.month}/${this.dob.date}/${this.dob.year}`),
        };

        await this.make_request('/private/updateUserPrivateInfo', payload)
          .then(() => {
            EventBus.$emit('handle-form-submission');
          })
          .catch((err) => {
            console.error(err);
          });
        
      },
    }
  }
</script>

<style lang="scss" scoped>
@import url('../../common.css');

h3 {
  margin-bottom: 16px;
}

#personal-info__form {
  & > .col {
    padding: 0;
  }

  #dob__section {
    margin-top: 12px;

    h4 {
      font-weight: 500;
      margin-bottom: 16px;
    }

    .flex {
      justify-content: flex-start;
      column-gap: 16px;

      & > div {
        width: calc(33% - 10px);
      }
    }
    input[type=text][data-v-73c54332]:not(.v-input__control *) {
      font-weight: 500;
    }
  }
}

#personal-info-form__footer {
  row-gap: 16px;
}
</style>