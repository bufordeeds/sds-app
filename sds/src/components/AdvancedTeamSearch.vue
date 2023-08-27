<template>

      <v-dialog v-model="value2" max-width="400px" :content-class="dialog_style"  persistent>
         <v-card class="pa-3" style="">

            <div class="dialog-heading" style="display: flex">
               Advanced search
               <v-spacer/>
               <v-btn icon @click="value2=false" style="margin-top: -10px; margin-right: -5px">
                  <v-icon>close</v-icon>
               </v-btn>
            </div>

            <div>
               <my-form ref="form">
                  <my-text-input
                      label="Handler's First Name"
                      v-model="first_name"
                      @keyup-enter="search"
                      :rules="[isRequired]"
                  />
                  <my-text-input
                      label="Handler's Last Name"
                      v-model="last_name"
                      @keyup-enter="search"
                      :rules="[isRequired]"
                  />

                  <my-text-input
                      label="Dog's Name"
                      v-model="dog_name"
                      @keyup-enter="search"
                      :rules="[isRequired]"
                  />


               </my-form>


               <div v-if="err_msg" style="color: var(--color-input-error); text-align: center" class="mt-3">
                  {{err_msg}}
               </div>
               <v-row class="ma-0" style="padding: 10px 0px;">
                  <v-spacer/>

                  <v-btn @click="search">Search</v-btn>
               </v-row>
            </div>

            <div class="dialog-heading"  v-if="show_results" >
               Search Results
            </div>


            <div v-if="show_results" style="max-height: 50vh; overflow-y: auto" >

               <div v-if="teams.length === 0" style="text-align: center; margin-top: 10px">
                  No Teams found
               </div>

               <div
                   v-for="item in teams" :key="item._id"
                   style="border: 1px solid #d7d7d7; "
                   class="pa-2 mt-2"
               >
                  <a style="display: flex;  text-decoration: none; color: inherit"
                     :href="'/team/'+item.dog_num"
                       target="_blank"
                  >
                     <div style="display: flex; flex-direction: column; align-items: center; ">
                        <avatar
                            profile-type="user"
                            :profile="item.handler_id_FR"
                            image-only
                            size="50"
                        />
                        {{get_name_user(item.handler_id_FR)}}
                     </div>

                     <div style="display: flex; flex-direction: column; align-items: center" class="ml-2">
                        <avatar profile-type="dog" :profile="item" image-only size="50"/>
                        {{item.name}}
                     </div>

                  </a>
               </div>


            </div>

         </v-card>
      </v-dialog>







</template>

<script>
import data_getters from "@/mixins/data_getters";
import utilities from "@/mixins/utilities";
import validation from "@/mixins/validation";

export default {
   name: "AdvancedTeamSearch",
   mixins: [data_getters, utilities, validation],
   props: {
      value: {type: Boolean},
   },
   data(){
      return {
         value2: this.value,

         show_results: false,

         teams: [],

         first_name: null,
         last_name: null,
         dog_name: null,

         err_msg: null,
      }
   },

   computed: {
     dialog_style(){
        if (this.$vuetify.breakpoint.height > 800){
           return 'my-dialog-customizations';
        }
        return '';

     }
   },

   watch:{
      value(newVal){
         if (newVal !== this.value2){
            this.value2 = newVal;
         }
      },

      value2(newVal){
         this.$emit('input', newVal);
      }
   },
   methods:{
      async search(){
         this.err_msg = null;

         if (!this.$refs.form.validate()){
           return;
         }

         try{
            let payload = {
               handler_name_first: this.first_name,
               handler_name_last: this.last_name,
               dog_name: this.dog_name
            };

            this.teams = await this.make_request('/public/getDogProfileAdvanced', payload);

            this.show_results = true;
            // if (this.teams.length > 0){
            //
            //
            // }
         }
         catch (e){
            console.log(e)
            if (e.status === 400){
               this.err_msg = 'Please enter at least one value to search for.'
            }
         }
      },

      on_click_dog(dog){
         this.$router.push('/team/' + dog.dog_num);
      }

   },


}
</script>

<style scoped>
div >>> .my-dialog-customizations{
   transform: translateY(-100px);
}


</style>

