<template>
  <div>
    <div
      id="someone-else-form__header"
      class="flex flex-col"
    >
      <h2 class="text-center">
        What's their Name?
      </h2>
    </div>

    <MyForm
      id="someone-else-form__form"
      ref="form"
    >
      <TextInput
        v-model="firstName"
        label="First name"
        :rules="[isRequired]"
      />     
      <TextInput
        v-model="middleName"
        label="Middle name"
        :rules="[isRequired]"
      />     
      <TextInput
        v-model="lastName"
        label="Last name"
        :rules="[isRequired]"
      />     
      <TextInput
        v-model="emailAddress"
        label="Email Address"
        :rules="[isRequired, isEmail]"
      />     
      <MySelect
        id="someone-else-form__relationship"
        v-model="relationship"
        label="Relationship to disabled handler"
        :options="list_relationship"
        :rules="[isRequired]"
      />
    </MyForm>

    <div
      id="someone-else-form__footer"
      class="flex flex-col"
    >
      <button
        class="button button--primary"
        form="someone-else-form__form"
      >
        Continue
      </button>
      <Notification content="Your progress is auto-saved, so you can continue filling out the form at your convenience." /> 
    </div>
  </div>
</template>

<script>
import MyForm from '../../../components/inputs/MyForm.vue';
import Notification from '../../../components/Notification.vue';
import TextInput from '../../../components/inputs/TextInput.vue';
import MySelect from '../../../components/inputs/Select.vue';
import validation from '../../../mixins/validation';

export default {
  name: "SomeoneElse",
  components: {
    MyForm,
    Notification,
    MySelect,
    TextInput,
  },
  mixins: [validation],
  data() {
    return {
      emailAddress: null,
      firstName: null,
      lastName: null,
      middleName: null,
      relationship: null,
      list_relationship: [
        { value: 'Parent', label: 'Parent'},
        { value: 'Spouse', label: 'Spouse'},
        { value: 'OtherFamilyMember', label: 'Other Family Member'},
        { value: 'FriendOrNeighbor', label: 'Friend or Neighbor'},
        { value: 'Caretaker', label: 'Caretaker'},
        { value: 'ServiceDogTrainer', label: 'Service Dog Trainer or Training Organization'},
        { value: 'SocialWorkerTherapist', label: 'Social Worker, Counselor, Therapist, Physician'},
      ],
    }
  }
}
</script>

<style lang="scss">
@import url('../../vars.css');

#someone-else-form__header {
  margin-bottom: 16px;
  row-gap: 16px;
}

#someone-else-form__form {
  margin-bottom: 56px;
}

#someone-else-form__footer {
  row-gap: 16px;
}
</style>