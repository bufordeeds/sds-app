<template>
  <div id="name-info__container">
    <div class="name-info__header flex flex-col">
      <h2>Let's Begin!</h2>
      <p>Are you filling out this form and signing this training and behavior standards agreement on behalf of for yourself or someone else?</p>
      <Tabs
        variant="pill"
        :tab-options="[{ value: 'myself', label: 'Myself'}, { value: 'someone_else', label: 'Someone Else' }]"
        @handleTabChange="handleTabChange"
      />
    </div>
    <MyselfForm v-if="state === 'myself'" />
    <SomeoneElseForm v-else />
  </div>
</template>

<script>
import Tabs from '../../../components/inputs/Tabs.vue';
import MyselfForm from './MyselfForm.vue';
import SomeoneElseForm from './SomeoneElseForm.vue';

export default {
  name: 'NameInfo',
  components: {
    MyselfForm,
    SomeoneElseForm,
    Tabs,
  },
  data() {
    return {
      state: 'myself', // 'myself' || 'somone_else'
    }
  },
  methods: {
    handleTabChange(tab) {
      this.state = tab.value;
    }
  },
}
</script>

<style lang='scss'>
#name-info__container {
  .name-info__header {
    margin-bottom: 24px;
    row-gap: 24px;

    h2 {
      color: #1D1D1F;
      font-weight: 500
    }

    p {
      color: var(--text-medium);
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
  }
}
</style>