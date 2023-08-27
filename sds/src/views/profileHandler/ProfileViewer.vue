<template>
   <div>
<!--      <user-profile/>-->

     <team-profile></team-profile>
   </div>
</template>

<script>


import data_getters from "@/mixins/data_getters";

import TrainerProfile from "@/views/profileTrainer/TrainerProfile";


import TeamProfile from "@/views/profileHandler/TeamProfile";

export default {
   name: "ProfileViewer",
   mixins: [data_getters],
   components: {TeamProfile},
   props: {
      user_id: String,

   },
   data(){
      return {
         user: null,
      }
   },

   methods:{
      async get_profile(){
         try{
            let user_id;

            console.log('debug')
            if (this.$route.params.user_id){
               user_id = this.$route.params.user_id;
            }
            else{
               user_id = this.user_id;
            }

            if (user_id == null){
               return ;
            }

            this.user =await this.make_request('/public/getUserProfile', {user_id});



         }catch (e) {
            throw e;
         }
      },
   },

   created(){
      this.get_profile()
   }
}
</script>

<style scoped>

</style>