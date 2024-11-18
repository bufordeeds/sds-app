<template>
  <section>
    <NameInfo
      v-if="formState.value === 'name_info'"
    />
    <PersonalInfo v-if="formState.value === 'personal_info'" />
    <EmergencyInfo v-if="formState.value === 'emergency_contact_info'" />
    <AboutDog v-if="formState.value === 'about_type_dog_info'" />
    <OptionalInfo v-if="formState.value === 'optional_info'" />
    <SignUpComplete v-if="formState.value === 'complete'" />
  </section>
</template>

<script>
import { EventBus } from '../../../eventBus';
import { formStateIterator, smoothScrollToTop } from '../../../utilities/helpers';
import AboutDog from './AboutDog.vue';
import SignUpComplete from './SignUpComplete.vue';
import EmergencyInfo from './EmergencyInfo.vue';
import NameInfo from './NameInfo.vue';
import OptionalInfo from './OptionalInfo.vue';
import PersonalInfo from './PersonalInfo.vue';


export default {
  name: 'BasicInfo',
  components: { AboutDog, EmergencyInfo, NameInfo, OptionalInfo, PersonalInfo, SignUpComplete },
  data() {
    return {
      generator: null,
      formState: null,
    }
  },
  created() {
    const gen = formStateIterator(['name_info', 'personal_info', 'emergency_contact_info', 'about_type_dog_info', 'optional_info', 'complete']);
    this.generator = gen;
    this.formState = gen.next();
    EventBus.$on('handle-form-submission', this.handleEventEmission);
  },
  beforeDestroy() {
    EventBus.$off('handle-form-submission', this.handleEventEmission);
  },
  methods: {
    handleEventEmission() {
      smoothScrollToTop();
      this.formState = this.generator.next();
    }
  },
}
</script>

<style>
</style>