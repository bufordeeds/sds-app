<template>
   <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">

      <div v-if="error" style="font-size: 18pt; padding: 30px 0 20px 0;" >
         There was an issue confirming dog.
      </div>

      <div v-else >
         <div style="font-size: 18pt; padding: 30px 0 20px 0;" >
            {{confirmed_msg}}

         </div>

         <div>
            <router-link to="/manageServiceDogs">
               Go to my Service Dogs
            </router-link>
         </div>

      </div>

   </div>
</template>

<script>

import data_getters from "@/mixins/data_getters";


export default {
   name: "AcceptDog",
   mixins: [data_getters],
   components: { },
   data(){
      return {
         confirmed: null,
         confirmed_msg: '',

         email: null,
         error: null,

         reset_email: false,
         dog: {},
      }
   },

   computed: {
     type(){
        let ans = this.$auth.profile.acct_type;
        ans = ans.toLowerCase();
        ans = ans[0].toUpperCase() + ans.slice(1);
        return ans;

     }
   },


   async created(){
      console.log(this.$route.query)
      this.email = this.$route.query.email;
      let payload = {
         dog_id: this.$route.query.dog_id,
      }

      try{
         let res = await this.make_request('/private/acceptDog', payload);

         if (res.dog){

            this.confirmed_msg = `Thank you for accepting.  You are now the ${this.type} of ${res.dog.name}`;
         }
         else{
            this.confirmed_msg = `Looks like you already accepted this invite`;
         }


      }
      catch(e){
         this.error = true;
      }




   }

}
</script>

<style scoped>

</style>
