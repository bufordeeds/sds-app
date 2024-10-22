<template>
  <ul class="tabs-container">
    <li
      v-for="(tab, index) in tabOptions"
      :key="tab.value"
      :class="index === selectedTabIdx ? 'active' : null"
      :title="tab.value"
      @click="() => {
        $emit('handleTabChange', { ...tab });
        setActiveTab(index)
      }"
    >
      {{ tab.label }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'MyTabs',
  props: {
    defaultTab: { default: null, required: false, type: Number },
    tabOptions: { default: () => [], required: true, type: Array },
    variant: { default: 'normal', required: false, type: String }, // one of 'normal', 'rounded', 'pill'
  },
  data() {
    return {
      selectedTabIdx: +this.defaultTab || 0,
    }
  },
  computed: {
    variantStyle() {
      switch (this.variant) {
        case 'rounded':
          return '4px';
        case 'pill':
          return '20px';
        default:
          return '0';
      }
    },
    calculateTabWidth() {
      return this.tabOptions.length ? `${(100 / this.tabOptions.length)}%` : '100%';
    }
  },
  beforeMount() {
    if (this.defaultTab !== null) {
      this.$emit('handleTabChange', this.tabOptions[this.defaultTab]);
    }
  },
  methods: {
    setActiveTab(index) {
      this.selectedTabIdx = index;
    },
  },
}
</script>

<style lang="scss">
@import url('../../views/main.css');
@import url('../../views/vars.css');

ul.tabs-container {
  background-color: var(--surface-dark-primary-200);
  border-radius: v-bind('variantStyle');
  display: inline-flex;
  height: 40px;
  list-style-type: none;
  margin: 0;
  max-width: 100%;
  min-width: 350px;
  overflow: auto;
  padding: 0;
  width: 100%;

  li {
    align-items: center;
    color: var(--button-form-button);
    cursor: pointer;
    display: flex;
    flex-grow: 1;
    flex-basis: v-bind('calculateTabWidth');
    font-size: 17px;
    font-weight: 500;
    justify-content: center;
    line-height: 24px;
    min-width: 120px;
    overflow: hidden;
    padding: 0 12px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      background-color: var(--surface-dark-primary-400);
    }

    &.active {
      background-color: var(--button-form-button);
      color: var(--text-white);
    }
  }
}
</style>