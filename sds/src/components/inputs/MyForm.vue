<template>
<div class="my-form">
   <slot></slot>
</div>
</template>

<script>
/**
 * Component designed as wrapper for custom input components for top level validation.
 * To use, wrap individual input components with this, and then call the injected registerThisField() method to
 * Register the input.  This then allows us to call this components validate() method which will in turn call each of the
 * registered input's validation() method.
 */
export default {
   name: "myForm",
   data(){
      return {
         fields: {},
         num_fields: 0,
      }

   },

   provide() {
      return {
         registerThisField: this.registerSelf,
         unRegisterField: this.unRegisterField,
      }

   },

   methods:{
      /**
       * function intended to be injected into the child field component.  Calling it essentially registers the field
       * in this wrapper component
       *
       * @param component : the vue input component, when called, child should pass in  its "this"
       */
      registerSelf(component){
         this.num_fields += 1;

         let field_id = 'field_' + this.num_fields.toString();
         this.fields[field_id] = component;
         return field_id;
      },

      unRegisterField(field_id){
         delete this.fields[field_id];
      },

      /**
       * validate all registered fields
       * @returns {boolean}
       */
      validate(){
         let keys = Object.keys(this.fields);

         let ans = true;

         for (let k of keys){
            let tmp = this.fields[k].validate();
            if (!tmp){
               ans = false;
            }
         }

         return ans;

      },

      resetValidation(){

      },
   }

}
</script>

<style scoped>
.my-form{
   width: 100%;
}
</style>
