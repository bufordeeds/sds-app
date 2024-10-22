<template>
  <section>
    <NameInfo
      v-if="formState.value === 'name_info'"
    />
    <p v-if="formState.value === 'personal_info'">Personal Info</p>
  </section>
</template>

<script>
import { EventBus } from '../../../eventBus';
import { formStateIterator } from '../../../utilities/helpers';
import NameInfo from './NameInfo.vue';


export default {
  name: 'BasicInfo',
  components: { NameInfo },
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