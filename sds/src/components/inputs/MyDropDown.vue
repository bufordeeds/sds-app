<template>
   <div class="input-container" :style="input_container_style">
      <div
           class="label"
           :style="label_style"
           @click="show_list=true"
      >
         {{label}}
      </div>


<!--      <input :type="input_type" v-model="local_val" @input="$emit('input', local_val)"-->
<!--             :class="border_class" :disabled="disabled"-->
<!--             :style="input_style"-->
<!--             ref="input"-->
<!--             @blur="$emit('blur')"-->
<!--             @keyup.enter="$emit('keyup-enter')"-->
<!--      >-->


<!--      @input="$emit('input', $event)"-->
      <my-drop-down0

          v-model="local_val"
          :class="border_class"
          :style="input_style"
          :list="list"
          :item-text="itemText"
          :item-value="itemValue"
          ref="input"
          @blur="$emit('blur')"
          @keyup.enter="$emit('keyup-enter')"

          :show-value="showValue"
          :show_list.sync="show_list"
          :clearable="clearable"
      ></my-drop-down0>

      <div class="error-msg-container" v-if="error_msg !== null">
         <svg width="20" height="10" style="margin-left: 20px;">
            <polygon points="10,0 0,10 20, 10" style="fill:var(--color-input-error);" />
         </svg>

         <span class="error-msg" >
         {{error_msg}}
         </span>

      </div>
   </div>
</template>

<script>

   // import helpers from '../../utilities/helpers';
   import MyDropDown0 from "@/components/inputs/MyDropDown0";

   export default {
      name: "MyDropDown",
      components: {MyDropDown0},
      props:{
         value: {type: [String, Boolean, Number], default: null},
         list: {type: Array, default: null},
         itemValue: {type: String, default: 'val'},
         itemText: {type: String, default: 'txt'},

         showValue:  {type: Boolean, default: false}, //if true then display the value instead of the txt

         label: {type: String, default: ''},
         rules: {type: Array, default: () => []},
         error: {type: String, default: null},
         // hint:  {type: String, default: null},

         hideLabelOnInput: {type: Boolean, default: false}, //if true then the label is hidden once text is entered
         disabled: {type: Boolean, default: false},
         borderColor: {type: String, default: null},
         isPassword:  {type: Boolean, default: false},
         clearable:  {type: Boolean, default: false},

      },
      inject: ['registerThisField', 'unRegisterField'],

      data(){
         return {
            local_val: this.value,
            val_fmt: '',
            error_msg: null,

            show_list: false,
         }
      },

      watch:{
         value(newVal){

            if (newVal !== this.local_val){
               this.local_val = newVal;
            }
         },
        local_val(newVal){

           if (this.error_msg !== null){
              this.validate();
           }

           if (newVal !== this.value){
              this.$emit('input', newVal);
           }

        }
      },

      computed: {

         input_type(){
            if (this.isPassword){
               return 'password'
            }
            else{
               return 'text'
            }

         },

         input_container_style(){
            if (this.hideLabelOnInput){
               return '';
            }
            else{
               return 'padding-top: 20px;';
            }
         },

        label_style(){

           if (this.local_val !== null && this.local_val !== ''){
              let ans =  'margin-left: 5px;  margin-top: -20px; font-size: 8pt;';
              if (this.hideLabelOnInput){
                 ans += 'display: none';
              }
              return ans;
           }
           return 'cursor: pointer';
         },

         input_style(){
            let ans  = `background-color': ${this.disabled ? '#e7e7e7': ''};`

            if (this.borderColor ){
               ans += 'border-color: ' + this.borderColor;
            }



            return ans;

         },




         border_class(){

           let ans = 'input';

            if (this.error_msg !== null){
               return 'input-error';
            }

            if (this.local_val === null || this.local_val === ''){
               ans = 'input-null'
            }
            return ans;
         }


      },

      methods:{


         validate(){
            this.error_msg = null;

            for (let f of this.rules){
               let ans = f(this.local_val);

               if (ans !== true){
                  this.error_msg = ans.toString();
                  // console.log('Validation ran', ans)
                  return false;
               }
            }//for

            // console.log('Validation ran', true)
            return true;
         },

         set_focus(){
            // console.log( this.$refs)
            this.$refs.input.$el.focus();
         }
      },

      created(){
         // console.log('debug', this)

         if (this.registerThisField !=  null){
            this.field_id = this.registerThisField(this);
         }

      },

      beforeDestroy() {
         this.unRegisterField(this.field_id);
      }

   }
</script>


<style scoped src="./input_styles.css"></style>
<style scoped lang="scss">


.input{
   border: 1px solid #adadad;
}


   //.v-input{
   //   padding-left: 50px;
   //}
</style>


<style>


    .v-input{
      /*padding-left: 50px;*/
   }
</style>
