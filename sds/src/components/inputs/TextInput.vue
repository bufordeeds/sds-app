<template>
   <div class="input-container" :style="input_container_style">
      <div
           class="label"
           :style="label_style"
           style="z-index: 0"
           @click="set_focus"
      >
         {{label}}
      </div>




      <input
          :type="input_type"
          v-model="local_val"
          @input="$emit('input', local_val)"
          @change="$emit('change', local_val)"
          :class="border_class" :disabled="disabled"
          :style="input_style"
          ref="input"
          @blur="$emit('blur')"
          @keyup.enter="$emit('keyup-enter')"
      >

      <div v-if="appendIcon2 !=null" style="display:flex; justify-content: flex-end; width: 100%; position: absolute;z-index: 0">
         <v-btn icon style="margin-top:-35px" @click="onclick_append">
            <v-icon
            >{{appendIcon2}}</v-icon>
         </v-btn>

      </div>



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


   export default {
      name: "MyTextField",

      props:{
         value: {type: [String, Number], default: null},
         label: {type: String, default: ''},
         rules: {type: Array, default: () => []},
         error: {type: String, default: null},
         // hint:  {type: String, default: null},

         labelOnBottom:  {type: Boolean, default: false}, //if true then the label is pushed to bottom of text box
         hideLabelOnInput: {type: Boolean, default: false}, //if true then the label is hidden once text is entered
         disabled: {type: Boolean, default: false},
         borderColor: {type: String, default: null},
         isPassword:  {type: Boolean, default: false},
         appendIcon: {type: String, default: null}, //listen for @click:append
         // onAppendClick:  {type: Function, default: () => null},
         labelStyle: {type:String, default: ''},
         labelSmall:  {type: Boolean, default: false}, //if true then label is always minimized regardless of value state

         clearable:   {type: Boolean, default: false},//if true then show clear icon.  Note this overrides appendIcon.


      },
      inject: ['registerThisField', 'unRegisterField'],



      data(){
         return {
            local_val: this.value,
            val_fmt: '',
            error_msg: null,
         }
      },

      watch:{
         value(newVal){

            if (newVal !== this.local_val){
               this.local_val = newVal;
            }
         },
        local_val(){
           this.validate();
           // if (this.error_msg !== null){
           //    this.validate();
           // }
        }
      },

      computed: {

         appendIcon2(){
            if (this.clearable && this.local_val !== null){
               return 'clear';
            }

            return this.appendIcon;

         },

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

           if ((this.local_val !== null && this.local_val !== '') || this.labelSmall){
              let ans =  'margin-left: 5px;  margin-top: -20px; font-size: 8pt;';
              if (this.labelOnBottom){
                 ans =  'margin-left: 5px;  margin-top: 40px; font-size: 8pt;';
              }

              if (this.hideLabelOnInput){
                 ans += 'display: none';
              }
              return ans;
           }



           return this.labelStyle;
         },

         input_style(){
            let ans  = `background-color': ${this.disabled ? '#e7e7e7': ''};`

            if (this.borderColor ){
               ans += 'border-color: ' + this.borderColor+';';
            }

            // if (this.$vuetify.breakpoint.width < 400){
            //    ans += 'font-size: small;'
            // }

            return ans;

         },




         border_class(){

           let ans = '';

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

         onclick_append(){
            if (this.clearable){
               this.local_val = null;
               this.$emit('input', null);
            }
            else{
               this.$emit('click:append')
            }

         },

         validate(){
            this.error_msg = null;

            for (let f of this.rules){
               let ans = f(this.local_val);

               if (ans !== true){
                  this.error_msg = ans.toString();
                  console.log('Validation ran', ans)
                  return false;
               }
            }//for

            // console.log('Validation ran', true)
            return true;
         },

         set_focus(){
            // console.log( this.$refs)
            this.$refs.input.focus();
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

<style scoped >


   /*.v-input{*/
   /*   padding-left: 50px;*/
   /*}*/


</style>


<style>


    .v-input{
      /*padding-left: 50px;*/
   }
</style>
