<template>
  <div>
    <div class="input-group">
      <label
        class="flex flex-col"
        :for="`${label.toLowerCase().split(' ').join('_')}__input`"
      >
        {{ label }}

        <input
          :id="`${label.toLowerCase().split(' ').join('_')}__input`"
          ref="input"
          v-model="inputVal"
          :name="name"
          :disabled="disabled"
          :type="type"
          data-1p-ignore
          :maxlength="maxLength"
          :minlength="maxLength"
          :placeholder="placeholder"
          @input="$emit('input', inputVal)"
          @focus="handleInputFocus"
          @blur="$emit('blur')"
          @keyup.enter="$emit('keyup-enter')"
        >

        <button
          v-if="appendIcon"
          class="icon__button"
          @click="onclick_append"
        >
          <v-icon>
            {{ appendIcon2 }}
          </v-icon>
        </button>
      </label>
      <span class="error-message">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
   name: "TextInput",
   inject: ['registerThisField', 'unRegisterField'],

   props: {
      appendIcon: { type: String, default: null }, //listen for @click:append
      borderColor: { type: String, default: null },
      clearable: { type: Boolean, default: false },//if true then show clear icon.  Note this overrides appendIcon.
      disabled: { type: Boolean, default: false },
      error: { type: String, default: null },
      hideLabelOnInput: { type: Boolean, default: false }, //if true then the label is hidden once text is entered
      label: { type: String, default: '' },
      labelOnBottom: { type: Boolean, default: false }, //if true then the label is pushed to bottom of text box
      labelStyle: { type: String, default: '' },
      labelSmall: { type: Boolean, default: false }, //if true then label is always minimized regardless of value state
      maxLength: { default: 'none', type: String},
      minLength: { default: 'none', type: String},
      name: { type: String, default: '' },
      placeholder: { default: '', type: String },
      rules: { type: Array, default: () => [] },
      type: { type: String, default: 'text' },
      value: { type: [String, Number], default: null },
   },

   data() {
      return {
         inputVal: this.value,
         valFormat: '',
         errorMessage: this.error,
      }
   },

   computed: {
      appendIcon2() {
         if (this.clearable && this.inputVal !== null) {
            return 'clear';
         }

         return this.appendIcon;
      },
   },

   watch: {
      error: function (newVal, oldVal) {
         if (newVal !== oldVal) {
            this.errorMessage = newVal;
         }
      },
      value(newVal) {
         if (newVal !== this.inputVal) {
            this.inputVal = newVal;
         }
      },
   },

   created() {
      if (this.registerThisField != null) {
         this.field_id = this.registerThisField(this);
      }
   },

   beforeDestroy() {
      this.unRegisterField(this.field_id);
   },

   methods: {
      onclick_append() {
         if (this.clearable) {
            this.inputVal = null;
            this.$emit('input', null);
         }
         else {
            this.$emit('click:append')
         }
      },

      handleInputFocus(e) {
         this.$emit('input-focused', e);
      },

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
      },

      set_focus() {
         // console.log( this.$refs)
         this.$refs.input.focus();
      }
   }

}
</script>


<style scoped lang='scss'>
  @import url('../../views/common.css');
  @import url('../../views/main.css');

  .input-group {
    row-gap: 8px;
    margin-bottom: 32px;

    label {
      position: relative;

      input[id$="__input"] {
        margin-top: 8px;
      }
    }
  }

  .icon__button {
    bottom: 6px;
    position: absolute;
    right: 8px;
  }
</style>
