<template>
  <div>
    <h3>
      Personal Information
    </h3>

    <MyForm id="personal-info__form">
      <MySelect
        id="gender-select"
        v-model="gender"
        label="Gender"
        name="gender"
        :options="genderOptions"
        :rules="[isRequired]"
      />
      <TextInput
        v-if="gender === 'other'"
        v-model="other"
        name="other"
        placeholder="Please specify..."
      />
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
    </MyForm>

    <div
      id="personal-info-form__footer"
      class="flex flex-col"
    >
      <button
        class="button button--primary"
        form="personal-info-form__form"
      >
        Continue
      </button>
      <Notification content="Your progress is auto-saved, so you can continue filling out the form at your convenience." /> 
    </div>
  </div>
</template>

<script>
  import MyForm from '../../../components/inputs/MyForm.vue';
  import MySelect from '../../../components/inputs/Select.vue';
  import Notification from '../../../components/Notification.vue';
  import TextInput from '../../../components/inputs/TextInput.vue';

  import validation from '../../../mixins/validation';

  export default {
    name: "PersonalInfo",
    components: {
      MyForm,
      MySelect,
      Notification,
      TextInput,
    },
    mixins: [validation],
    watch: {
      gender(newVal, oldVal) {
        console.log(newVal,oldVal);
      }
    },
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
        genderOptions: [
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
        ]
      }
    }
  }
</script>

<style lang="scss">
@import url('../../common.css');

h3 {
  margin-bottom: 16px;
}

#personal-info__form {
  #dob__section {
    margin-top: 32px;

    h4 {
      font-weight: 500;
      margin-bottom: 32px;
    }

    .flex {
      justify-content: flex-start;
      column-gap: 16px;

      & > div {
        width: calc(33% - 10px);
      }
    }
  }
}

#personal-info-form__footer {
  row-gap: 16px;
}
</style>