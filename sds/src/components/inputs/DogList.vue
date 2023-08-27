<template>
<v-card>
   <v-card-title>
      My Dogs
   </v-card-title>
   <div v-for="item in dogs" :key="item._id" class="pl-4 dog-container" @click="$emit('click', item.dog_num)">
      <div style="display: flex" class="pt-2">
         <avatar
             :image="item.profile_image"
             size="40"
             profile-type="dog"
             :rounded="true"
         />
         <div class="pl-2">
            {{item.name}}<br>
            SDS-{{item.dog_num}}
         </div>

      </div>


   </div>
</v-card>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import avatar from "@/components/app/avatar";

export default {
   name: "DogList",
   mixins: [data_getters],
   components: {avatar},
   props:{
      dogs: Array,
   },
   data(){
      return {
         // dogs: [
         //
         // ]
      }
   },

   methods:{
      // async get_dogs(){
      //    try{
      //       let dogs = await this.make_request('/private/getDogs', {user_id: this.$auth.profile.user_id});
      //       console.log(dogs)
      //       this.dogs = dogs;
      //    }catch (e) {
      //
      //    }
      // },

      row_class(){

      }
   },

   created(){
      // this.get_dogs();
   }
}
</script>

<style scoped>

.dog-container{
    border-bottom: 1px solid #adadad;
}
.dog-container:last-child{
    border-bottom: 0;
}

.dog-container:hover{
    background-color: var(--color-txt-blue-light);
    color: white;
}

</style>
