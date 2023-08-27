<template>
<div>
   <behavior-standards
       @join="on_join"
   />
</div>
</template>

<script>
import behaviorStandards from "@/views/signup/behaviorStandards";
import data_getters from "@/mixins/data_getters";

/*
Building a full page view cause apple and ios are a bunch of a-holes and apparently have an issue with dealling with dialogs

https://github.com/vuetifyjs/vuetify/issues/3875
 */


export default {
   name: "behaviorStandardsViewer",
   mixins: [data_getters],
   components:{behaviorStandards},
   methods:{
      async on_join(){

         let payload = {email: this.$auth.profile.email, behaviors: 'USER_AGREED'};
         await this.make_request('/private/updateSetup', payload,);

         // this.$router.push('/accountHome?reload=true')

         this.$router.push({ path: '/accountHome', query: { reload: 'true' } })


      }
   }
}
</script>

<style scoped>

</style>
