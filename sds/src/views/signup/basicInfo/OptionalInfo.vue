<template>

  <div>
    <div class="heading">
      <h3>Optional Information</h3>
      <p>Responses to the following questions will be kept private and only shared with others in anonymized statistical form. You will not be identified.</p>
    </div>

    <MyForm
      id="optional-info-form"
      :handle-submit="handleSave"
    >
      <div>
        <v-label>What is your race, ethnicity, or origin?</v-label>
        <v-select
          v-model="ethnicity"
          hint="Select all that apply..."
          :items="['Asian', 'Black/African', 'Caucasian', 'Hispanic/Latinx', 'Native American', 'Pacific Islander', 'Prefer not to answer', 'Other']"
          multiple
          persist-hint
          outlined
        />
      </div>

      <div>
        <v-label>Highest level of education</v-label>
        <v-select
          v-model="education"
          hint="Select one..."
          :items="['High School', 'GED', 'Some College', 'Associates Degree', 'Bachelors Degree', 'Doctorates']"
          persist-hint
          outlined
        />
      </div>

      <div>
        <v-label>Approximate annual income</v-label>
        <v-select
          v-model="income"
          hint="Select one..."
          :items="['High School', 'GED', 'Some College', 'Associates Degree', 'Bachelors Degree', 'Doctorates']"
          persist-hint
          outlined
        />
      </div>

      <section class="military--radios">
        <div>
          <label>Have you or do you currently serve in the military?</label>
          <v-radio-group v-model="serveInMilitary">
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
        
        <div>
          <label>Have you or do you currently work as a civilian wartime contractor?</label>
          <v-radio-group v-model="civilianWartimeContractor">
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

        <div>
          <label>Do you use your Service Dog to help with an injury which occurred while serving in the military or working as a civilian wartime contractor?</label>
          <v-radio-group v-model="useDogForMilitaryOrContractor">
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
      </section>

      <div
        id="optional-info-form__footer"
        class="flex flex-col"
      >
        <button class="button button--primary">
          Submit & Finalize
        </button>
        <Notification content="Your progress is auto-saved, so you can continue filling out the form at your convenience." /> 
      </div>
    </MyForm>
  </div>
</template>

<script>
import MyForm from '../../../components/inputs/MyForm.vue';
import Notification from '../../../components/Notification.vue';

export default {
  name: "OptionalInfo",
  components: { MyForm, Notification },
  data() {
    return {
      ethnicity: null,
      education: null,
      income: null,
      serveInMilitary: null,
      civilianWartimeContractor: null,
      useDogForMilitaryOrContractor: null,
    }
  },
  methods: {
    handleSave() {
      alert('handle sign up completion')
    },
  }
}
</script>

<style lang="scss" scoped>
@import url('../../main.css');
@import url('../../vars.css');

.heading > p {
  color: var(--text-medium);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}
#optional-info-form {
  margin-top: 32px;
  row-gap: 16px;

  >div {
    gap: 0;
  }
  section.military--radios {
    display: flex;
    flex-direction: column;
    gap: 16px;

    label {
      color: var(--text-dark);
    }
  }
  #optional-info-form__footer {
    row-gap: 16px;
  }
}
</style>