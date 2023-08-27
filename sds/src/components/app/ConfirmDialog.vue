<template>

      <v-dialog v-model="loc_value" :max-width="maxWidth" persistent
      >
         <v-card>
            <v-card-title>
               {{header}}
            </v-card-title>


            <div class="pl-6 pr-6 pb-6">
               <slot></slot>
            </div>


            <v-card-actions>
               <v-btn :style="btn_confirm_style"
                      @click="confirm">Confirm</v-btn>
               <v-spacer></v-spacer>
               <v-btn color="var(--color-primary)"
                   @click="cancel">Cancel</v-btn>
            </v-card-actions>
         </v-card>

      </v-dialog>


</template>

<script>
/**
 * This component provides a way to handle the problem of requesting confirmation before taking an action.
 */

export default {
   name: "ConfirmDialog",
   props:{
     value: Boolean,
      fnConfirm: {type: Function, default: null}, //fn to call on confirmation
      fnCancel: {type: Function, default: null}, //fn to call on cancel
      header: {type: String, default: 'Confirm'}, //v-card header
      maxWidth: {type: String, default: '500px'},
      confirmBtnColor: {type: String, default: null},
      autoClose: {type: Boolean, default: true}, // if true, then the dialog closes on either button. Else parent needs
                                                 // to manually close dialog by setting value to false

   },
   data(){
      return {

         loc_value: this.value,
      }
   },

   computed:{
      btn_confirm_style(){

         let bg_col = this.confirmBtnColor;
         if (bg_col === null) bg_col =  'var(--color-warning)'

        let ans = `background-color: ${bg_col}`;

        return ans;
      },
   },

   watch: {
      loc_value(newVal){
         this.$emit('input', newVal);
      },

      value(newVal){
         console.log('debug')
         if (newVal !== this.loc_value){
            this.loc_value = newVal;
         }

      }
   },

   methods:{
      async confirm(){
        if (this.fnConfirm !== null){
           await this.fnConfirm();
        }

        this.$emit('confirm');

        if (this.autoClose) this.loc_value = false;

      },

      async cancel(){
         if (this.fnCancel !== null){
            await this.fnCancel();
         }

         this.$emit('cancel');
         if (this.autoClose) this.loc_value = false;
      }
   }

}
</script>

<style scoped>

</style>
