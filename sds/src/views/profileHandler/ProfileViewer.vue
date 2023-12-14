<template>
  <div>
    <!--      <user-profile/>-->

    <team-profile />
  </div>
</template>

<script>


import data_getters from "@/mixins/data_getters";

import TrainerProfile from "@/views/profileTrainer/TrainerProfile";


import TeamProfile from "@/views/profileHandler/TeamProfile";

export default {
   name: "ProfileViewer",
   components: {TeamProfile},
   mixins: [data_getters],
   props: {
      user_id: String,

   },
   data(){
      return {
         user: null,
      }
   },

   created(){
      this.get_profile()
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
   }
}
</script>

<style scoped>

</style>