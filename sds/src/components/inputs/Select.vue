<template>
  <div
    class="flex flex-col my-select__container"
  >
    <label :for="id">{{ label }}</label>
    <select
      :id="id"
      :name="name"
      @change="handleValueChange"
    >
      <option
        disabled
        hidden
        selected
        :value="null"
      >
        {{ placeholder }}
      </option>
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "MySelect",
  inject: ['registerThisField', 'unRegisterField'],
  props: {
    id: { default: "my_select", required: true, type: String },
    label: { default: "Default Label", required: true, type: String },
    name: { default: "my_select_name", type: String },
    options: { default: () => [], required: true, type: Array },
    placeholder: { default: 'Select one...', type: String},
    rules: { default: () => [], type: Array },
    handleValueChange: { default: (e) => { console.log(e); }, type: Function },
  },
  created(){
    if (this.registerThisField !=  null){
      this.field_id = this.registerThisField(this);
    }
  },
  beforeDestroy() {
      this.unRegisterField(this.field_id);
  },
  methods: {
    validate() {
        this.errorMessage = null;

        for (let f of this.rules) {
          let ans = f(this.inputVal);

          if (ans !== true) {
              this.errorMessage = ans.toString();
              console.log('Validation ran', ans)
              return false;
          }
        }

        return true;
    }
  }
}
</script>

<style lang='scss'>
@import url('../../views/vars.css');

.my-select__container {
  position: relative;
  row-gap: 8px;

  select {
    appearance: none;
    background-color: var(--surface-light-white);
    border: 1px solid var(--border-default);
    border-radius: 4px;
    color: var(--text-medium);
    cursor: pointer;
    font-size: 17px;
    height: 44px;
    line-height: 24px;
    padding: 0 12px;
  }

  select::-ms-expand {
    display: none;
  }

  &::after {
    border-bottom: 2px solid var(--border-default);
    border-left: 2px solid var(--border-default);
    bottom: 18px;
    content: '';
    display: inline-block;
    height: 10px;
    position: absolute;
    right: 18px;
    transform: rotate(-45deg);
    width: 10px;
  }
}
</style>