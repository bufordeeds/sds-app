<template>

      <my-form ref="form">

         <v-row dense v-if="isGuest">
            <v-col>
               <my-text-input
                   label="Email"
                   v-model="email2"
                   :rules="[isRequired, isEmail]"
               />
            </v-col>
         </v-row>

         <v-row dense>
            <v-col>
               <my-text-input
                   label="Name"
                   v-model="address2.name"
                   :rules="[isRequired]"
               />
            </v-col>
         </v-row>

         <v-row dense>
            <v-col cols="8">
               <my-text-input
                   label="Street"
                   v-model="address2.street1"
                   :rules="[isRequired]"
               />
            </v-col>

            <v-col cols="4">
               <my-text-input
                   label="Apt, Suite, etc."
                   v-model="address2.street2"
               />
            </v-col>
         </v-row>

         <v-row>

            <v-col>
               <my-text-input
                   label="City"
                   v-model="address2.city"
                   :rules="[isRequired]"
               />
            </v-col>
            <v-col>
               <my-text-input
                   label="State"
                   v-model="address2.state"
                   :rules="[isRequired]"
               />
            </v-col>
            <v-col>
               <my-text-input
                   label="Zip"
                   v-model="address2.zip"
                   :rules="[isRequired]"
               />
            </v-col>
         </v-row>
      </my-form>



</template>

<script>
import validation from "@/mixins/validation";
import _ from 'lodash';

export default {
   name: "checkoutEditAddress",
   mixins: [validation],
   props:{
      address: Object,
      email: {type: String, default: null},
   },
   data(){
      return{
         address2: this.address, //note doing this to get around vue's warning about chainging a prop directly...yeah i get it.  don't care.
      }
   },

   // watch:{
   //    address2(newVal){
   //       if (newVal +)
   //    }
   // },

   computed:{
      isGuest(){
         return !this.$auth.isAuthenticated();
      },

      // address2:{
      //    get(){
      //       return _.cloneDeep(this.address);
      //    },
      //    set(newVal){
      //       this.$emit('update:address', newVal);
      //    }
      // },
      email2:{
         get(){
            return this.email;
         },
         set(newVal){
            this.$emit('update:email', newVal);
         }
      },
      name2:{
         get(){
            return this.name;
         },
         set(newVal){
            this.$emit('update:name', newVal);
         }
      }
   },

   methods:{
      validate(){
         return this.$refs.form.validate();
      }
   }


}
</script>

<style scoped>

</style>