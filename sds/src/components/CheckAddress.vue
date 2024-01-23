<template>
  <v-dialog
    v-model="show_address_confirm"
    max-width="600px"
    persistent
  >
    <v-card class="pa-3 pl-5 pr-5">
      <div
        class="dialog-heading mb-3"
        style="color: var(--color-headline); font-weight: 600;"
      >
        Address Verification
        <v-divider />
      </div>



      <template v-if="address_suggestion!== null">
        <div
          style="display: flex; justify-content: space-between"
          :style="{'flex-direction': isMobile? 'column': 'row'}"
        >
          <div>
            <div style="font-weight: 600; color: grey">
              Entered Address
            </div>
            {{ addressNew.street1 }} <br>
            {{ addressNew.street2 }} <br v-if="address_suggestion.street2 != null">
            {{ addressNew.city }}, {{ addressNew.state }} {{ addressNew.zip }}
          </div>

          <div>
            <div
              style="font-weight: 600; color: grey"
              :style="{'margin-top': isMobile? '15px': '0'}"
            >
              Suggestion
            </div>
            {{ address_suggestion.street1 }} <br>
            {{ address_suggestion.street2 }} <br v-if="address_suggestion.street2 != null">
            {{ address_suggestion.city }}, {{ address_suggestion.state }} {{ address_suggestion.zip }}
          </div>
        </div>


        <div
          style="display: flex; justify-content: space-between"
          class="mt-4 mb-3"
          :style="{'flex-direction': isMobile? 'column': 'row'}"
        >
          <div
            style="display: flex; justify-content: center"
            class="mt-3"
          >
            <v-btn
              small
              @click="return_address('USE_ENTERED')"
            >
              Use Entered
            </v-btn>
          </div>


          <div
            style="display: flex; justify-content: center"
            class="mt-3"
          >
            <v-btn
              small
              @click="show_address_confirm=false; $emit('close')"
            >
              Edit Address
            </v-btn>
          </div>

          <div
            style="display: flex; justify-content: center"
            class="mt-3"
          >
            <v-btn
              small
              @click="return_address('USE_SUGGESTION')"
            >
              Use Suggestion
            </v-btn>
          </div>
        </div>
      </template>


      <div v-else>
        <div style="color: var(--color-input-error)">
          {{ address_err }}
        </div>


        <div style="display: flex; justify-content: flex-end;">
          <v-btn @click="show_address_confirm=false">
            Close
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>/**
 * This component checks if the address is changed, and if so will check the updated address against easypost's backend.
 * If the new address is different from easypost's suggestion, a dialog will be displayed allowing the user to select
 * either. If the addressOld === addressNew then nothing happens.
 *
 * The component emits an checked-address event, with the appropriate address.
 */

import data_getters from "@/mixins/data_getters";
import store from "@/mixins/store";

export default {
   name: "CheckAddress",
   mixins: [data_getters, store],
   props:{
      addressOld: Object,
      addressNew: Object,
   },

   data(){
      return {
         address_suggestion: {},
         address_err: null,
         show_address_confirm: false,
      }
   },

   computed: {
      isMobile(){
         return this.$vuetify.breakpoint.width < 450;
      }
   },
   methods:{
      str(x){
         if (x == null){
            return ''
         }
         else {
            return x.toLowerCase()
         }
      },


     async check_address(){
         let changed = false;

         console.log('debug')


         let a1 = this.addressOld;
         let a2 = this.addressNew;

         let keys = ['street1', 'street2', 'city', 'state', 'zip'];
         for (let k of keys){
            if (a1[k] !== a2[k]){
               changed = true;
            }
         }



         if (changed){
            let address= {};
            for (let k of keys){
               address[k] = this.addressNew[k];
            }

            let verify = await this.verify_address(address);
            console.log({verify})

            this.address_suggestion = null;

            if (verify.success){

               this.address_suggestion = verify.suggestion;


               //check if new address is the same as the suggestion
               let changed2 = false;
               for (let k of keys){
                  if (this.str(this.address_suggestion[k]) !== this.str(a2[k])){
                     changed2 = true;
                  }
               }

               if (!changed2){
                  this.$emit('checked-address', this.addressNew);
                  return;
               }

            }
            else{
               this.address_err = verify.error_msg;


            }
            this.show_address_confirm = true;
         }
         else{
            this.$emit('checked-address', this.addressNew)
         }

      },

      return_address(type){
         console.log('debug return_address')

        if (type === 'USE_ENTERED'){
           this.$emit('checked-address', this.addressNew)
        }

        if (type === 'USE_SUGGESTION'){
           this.$emit('checked-address', this.address_suggestion)
        }

        this.show_address_confirm = false;
      }
   }
}
</script>

<style scoped>

</style>