<template>
  <section>
    <NameInfo
      v-if="formState.value === 'name_info'"
    />
    <PersonalInfo v-if="formState.value === 'personal_info'" />
  </section>
</template>

<script>
import { EventBus } from '../../../eventBus';
import { formStateIterator } from '../../../utilities/helpers';
import NameInfo from './NameInfo.vue';
import PersonalInfo from './PersonalInfo.vue';


export default {
  name: 'BasicInfo',
  components: { NameInfo, PersonalInfo },
  data() {
    return {
      generator: null,
      formState: null,
    }
  },
  created() {
    const gen = formStateIterator(['name_info', 'personal_info', 'emergency_contact_info', 'about_tye_dog_info']);
    this.generator = gen;
    this.formState = gen.next();
    EventBus.$on('handle-form-submission', this.handleEventEmission);
  },
  beforeDestroy() {
    EventBus.$off('handle-form-submission', this.handleEventEmission);
  },
  methods: {
    handleEventEmission() {
      this.formState = this.generator.next();
    }
  },
}
</script>

<style>
</style>