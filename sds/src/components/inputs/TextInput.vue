<template>
  <div>
    <div class="input-group">
      <label
        class="flex flex-col"
        :for="`${label.toLowerCase()}__input`"
      >
        {{ label }}

        <input
          :id="`${label.toLowerCase()}__input`"
          ref="input"
          v-model="inputVal"
          :disabled="disabled"
          :type="type"
          data-1p-ignore
          @input="$emit('input', inputVal)"
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
      <span
        v-if="errorMessage != null"
        class="error-message"
      >
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>

<script>
// import helpers from '../../utilities/helpers';
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
      rules: { type: Array, default: () => [] },
      type: { type: String, default: 'text' },
      value: { type: [String, Number], default: null },
   },

   data() {
      return {
         inputVal: this.value,
         valFormat: '',
         errorMessage: null,
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
  /* @import url('./input_styles.css'); */
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
