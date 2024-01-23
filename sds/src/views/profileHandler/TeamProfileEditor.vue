<template>
  <div>
    <div class="page-title-app">
      Edit Profile Page
    </div>

    <!--<v-row dense class="page-title-app" style="display: flex; height: 100%; align-items: flex-end">-->
    <!--   <v-col cols="12" sm="8">-->
    <!--      Public Team Profiles-->
    <!--   </v-col>-->

    <!--   <v-spacer/>-->
    <!--   <v-col cols="12" sm="4" style="display: flex; justify-content: center">-->
    <!--      <my-form style="max-width: 500px">-->
    <!--         <my-drop-down-->
    <!--             label="Select Service Dog"-->
    <!--             :list="my_dogs"-->
    <!--             item-text="name"-->
    <!--             item-value="dog_num"-->
    <!--             v-model="selected_dog_num"-->
    <!--         />-->
    <!--      </my-form>-->
    <!--   </v-col>-->
    <!--</v-row>-->



    <div class="content-container-bg">
      <div class="content-container-centered">
        <my-form style="display: flex; justify-content: center">
          <my-drop-down
            v-model="selected_dog_num"
            style="max-width: 250px"
            label="Select Service Dog"
            :list="my_dogs"
            item-text="name"
            item-value="dog_num"
          />
        </my-form>

        <team-profile
          v-if="selected_dog_num !== null"
          :dog_num="selected_dog_num"

          :edit_mode="true"
          @check-event="handler_check_event"
        />
      </div>
    </div>
  </div>
</template>

<script>

import TeamProfile from "@/views/profileHandler/TeamProfile";
import data_getters from "@/mixins/data_getters";
import MyDropDown from "@/components/inputs/MyDropDown";
export default {
   name: "ProfileEditor",
   components: {MyDropDown, TeamProfile, },
   mixins: [data_getters],
   data(){
      return{
         my_dogs: [],
         selected_dog_num: null,
      }
   },
   created(){
      this.$store.commit("set_show_side_nav", true);
      this.get_my_dogs();
   },

   methods: {

      async get_my_dogs(){

         console.log('get my dogs')
         try{
            this.my_dogs = await this.make_request('/private/getDogs', {user_id: this.$auth.profile.user_id});

            if (this.my_dogs.length> 0){
               this.selected_dog_num = this.my_dogs[0].dog_num;
            }

         }catch (e) {

            console.log(e)
         }

      },


      handler_check_event({section, val}){

      }

   }
}
</script>

<style scoped>

</style>