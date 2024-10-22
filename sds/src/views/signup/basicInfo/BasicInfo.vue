<template>
  <section>
    <NameInfo v-if="formState === 'name_info'" />
  </section>
</template>

<script>
import NameInfo from './NameInfo.vue';

function* formStateIterator() {
  let i = 0;
  const FORM_STATES = ['name_info', 'personal_info', 'emergency_contact_info', 'about_tye_dog_info'];

  while (i < FORM_STATES.length) {
    // getting current state based on iterator index; starts at 0
    const currState = FORM_STATES[i];
    // increment iterator to next index
    i++;

    // yield the current state then wait for execution of .next() 
    yield currState;
  }
}

const formState = formStateIterator();

export default {
  name: 'BasicInfo',
  components: { NameInfo },
  data() {
    return {
      formState: formState, // 'name_info', 'personal_info', 'emergency_contact_info', 'about_the_dog_info'
    }
  },
  methods: {
    updateFormState() {
      formState.next();
    }
  },
}
</script>

<style>
</style>