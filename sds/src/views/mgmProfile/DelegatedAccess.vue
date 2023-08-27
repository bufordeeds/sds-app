<template>
   <div>


      <template v-if="isHandler">
         <div class="mgm-title">
            Users That Access To My Account
         </div>
         <div class="mgm-content-container-bg">



            <table-delegated-users
            ></table-delegated-users>
         </div>
      </template>



      <div class="mgm-title">
         Users That I have Access To
      </div>
      <div class="mgm-content-container-bg">

         <table-delegated-accounts
             :users="users_access_granted"
             @updated="get_delegated_accounts"
         ></table-delegated-accounts>
      </div>

   </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import TableDelegatedUsers from "@/views/mgmProfile/TableDelegatedUsers";
import TableDelegatedAccounts from "@/views/mgmProfile/TableDelegatedAccounts";


export default {
   name: "DelegatedAccess",
   mixins: [data_getters],
   components:{TableDelegatedUsers,TableDelegatedAccounts, },
   data(){
      return {


         // users_access_given: [{
         //    access_type: 'Admin',
         //    user:{
         //       name_first: 'test',
         //       name_last: 'last',
         //       membership_status: 'Active'
         //    }
         //
         //
         // }],
         users_access_granted: [],


      }
   },

   computed:{
     isHandler(){
        return this.$auth.profile.acct_type === 'HANDLER'
     }
   },
   methods:{
      // async get_my_delegated_users() {
      //    try{
      //       this.users_access_given = await this.make_request('/private/getMyDelegatedUsers', {});
      //    }catch (e) {
      //
      //       console.log(e)
      //    }
      //
      // },

      async get_delegated_accounts() {
         try{
            this.users_access_granted = await this.make_request('/private/getDelegatedAccounts', {});
         }catch (e) {

            console.log(e)
         }

      },




   },

   created(){
      this.$store.commit("set_show_side_nav", true);
      // this.get_my_delegated_users();
      this.get_delegated_accounts();

   }
}
</script>

<style scoped>
   @import url('./mgm_common.css');



</style>
