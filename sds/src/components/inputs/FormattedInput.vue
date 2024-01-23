<template>
  <div class="input-container">
    <input
      v-model="val_fmt"
      type="text"
      @blur="format()"
      @keyup.enter="format()"
    >
    <div class="error-msg">
      {{ error_msg }}
    </div>
  </div>
</template>

<script>

   import helpers from '../../utilities/helpers';
   export default {
      name: "FormattedInput",
      props:{
         value: Number,
         val_type: String, //money | percent
         precision: {type: Number, default: 2}, //the number of decimals to round values to


      },

      data(){
         return {
            local_val: 0, //needed to check if change was from user input or from parent
            val_fmt: '',
            error_msg: null,
         }
      },

      watch: {

         // if the formatted input changes, parse and update the value
         val_fmt(newVal, oldVal){

            this.parse(); //this updates local_value.  This needs to be called first
            this.$emit('input', this.local_val); //this updates the prop in the parent

         },


         // if the prop changes, sync w/ local val and format
         value(newVal){

            //check if the change is coming from the parent or because val_fmt changed
            if (newVal !== this.local_val){
               this.local_val = newVal;
               this.format();
            }
         },


      },

      created(){
         this.format();
      },

      methods:{



         /**
          * parses the formatted input string into a number variable
          */
         parse(){
            // console.log('parse()')
            this.error_msg = null;

            if (this.val_fmt===''){
               return;
            }

            let val = this.val_fmt.replace(/[$%,]/g, '');
            val = Number(val);
            if (Number.isFinite(val)){
               if (this.val_type === 'percent'){
                  val /= 100;
               }
               this.local_val = val;
            }
            else{
               this.error_msg = 'Must be number'
            }
         },

         format(){
            let val = this.value;

            if (this.val_type === 'percent'){
               val *= 100;
               this.val_fmt = this.fmt_number(val, this.precision, '')+'%';
            }
            else if (this.val_type === 'money'){
               this.val_fmt = this.fmt_number(val, this.precision, '$');
            }
            else if (this.val_type === 'number'){
               this.val_fmt = this.fmt_number(val, this.precision, '');
            }

         },

      }

   }
</script>

<style scoped lang="scss">

   @use '../../assets/styles/variables' as vars;
   input{
      border: 1px solid #adadad;
      border-radius: 4px;

      /*border-radius: 10px;*/
      padding: 2px 5px 2px 10px; // top right bot left
      width: 100%;
      text-align: left;
      outline: none;
   }

   input:focus{
      border: 2px solid var(--color-input-active);
      /*border-radius: 10px;*/

   }
   .input-container{
      padding: 10px;
      width: 150px;
   }

   .error-msg{
      font-size: small;
      color: #ff3d00;
      /*height: 10px;*/
   }


    .input-container ::v-deep .v-input{
      padding-left: 10px;

   }

   .v-input{
      padding-left: 50px;
   }
</style>


<style>


    .v-input{
      /*padding-left: 50px;*/
   }
</style>
