<template>
  <div>
    <our-mission v-if="page==='mission'" />
    <what-is-a-service-animal v-if="page==='what-is-service-animal'" />
    <what-should-service-dog-act-like v-if="page==='what-should-service-dog-act-like'" />
    <for-trainers v-if="page==='for-trainers'" />
    <for-physicians-therapists v-if="page==='for-physicians-therapists'" />
    <for-colleges v-if="page==='for-colleges'" />
    <what-todo-when-see-dog v-if="page === 'what-todo-when-see-dog'" />
    <how-can-i-tell-if-legitimate v-if="page === 'how-can-i-tell-if-legitimate'" />
    <business-rights v-if="page === 'business-rights'" />
    <landlord-hoa-rights v-if="page==='landlord-hoa-rights'" />
    <how-do-i-get-service-dog v-if="page ==='how-do-i-get-service-dog'" />

    <media-library v-if="page==='media-library'" />
    <sds-training-and-behavior-standards v-if="page==='sds-training-and-behavior-standards'" />
  </div>
</template>

<script>
import ourMission from "@/views/learnMore/ourMission";
import whatIsAServiceAnimal from "@/views/learnMore/whatIsAServiceAnimal";
import whatShouldServiceDogActLike from "@/views/learnMore/whatShouldServiceDogActLike";
import forTrainers from "@/views/learnMore/forTrainers";
import forPhysiciansTherapists from "@/views/learnMore/forPhysiciansTherapists";
import forColleges from "@/views/learnMore/forColleges";
import whatTodoWhenSeeDog from "@/views/learnMore/whatTodoWhenSeeDog";
import howCanITellIfLegitimate from "@/views/learnMore/howCanITellIfLegitimate";
import businessRights from "@/views/learnMore/businessRights";
import landlordHoaRights from "@/views/learnMore/landlordHoaRights";
import howDoIGetServiceDog from "@/views/learnMore/howDoIGetServiceDog";
import mediaLibrary from "@/views/learnMore/mediaLibrary";
import sdsTrainingAndBehaviorStandards from "@/views/learnMore/sdsTrainingAndBehaviorStandards";


import {get_meta} from '@/router/helper';
import {DateTime} from 'luxon';

let year = DateTime.local().toFormat('yyyy');
let suffix = ` (${year})`;

export default {
   name: "LearnMore",
   components: {ourMission, whatIsAServiceAnimal,whatShouldServiceDogActLike, forTrainers, forPhysiciansTherapists,
      forColleges, whatTodoWhenSeeDog, howCanITellIfLegitimate, businessRights,
      landlordHoaRights, howDoIGetServiceDog, mediaLibrary, sdsTrainingAndBehaviorStandards
   },

   data(){
      return {
         // page:null,

         meta_map:{
            'mission': get_meta(
                'SDS: What is our mission, purpose and focus?' + suffix,
            ),
            'what-is-service-animal': get_meta(
                'SDS: What Is A Service Animal?'  + suffix,
            ),
            'what-should-service-dog-act-like': get_meta(
                'SDS: What Should a Service Dog Act Like?' + suffix,
            ),
            'for-trainers': get_meta(
                'SDS: Pro Solutions for Service Dog Trainers' + suffix,
            ),
            'for-physicians-therapists': get_meta(
                'SDS: For physicians and therapists' + suffix,
            ),
            'for-colleges': get_meta(
                'SDS: For colleges and universities' + suffix,
            ),
            'what-todo-when-see-dog': get_meta(
                'SDS: What should you do when you see a Service Dog?' + suffix,
            ),
            'how-can-i-tell-if-legitimate': get_meta(
                'SDS: How Can I Tell If A Service Animal Is Legitimate? ' + suffix,
            ),
            'business-rights': get_meta(
                'SDS: Business Rights Concerning Service Dogs' + suffix,
            ),
            'landlord-hoa-rights': get_meta(
                'SDS: Landlord/HOA Rights Concerning Service Dogs' + suffix,
            ),
            'how-do-i-get-service-dog': get_meta(
                'SDS: How Do I Get A Service Dog?' + suffix,
            ),
            'media-library': get_meta(
                'SDS: Media Library',
            ),
            'sds-training-and-behavior-standards': get_meta(
                'SDS Training and Behavior Standards' + suffix,
            ),

         }

      }
   },



   computed:{
      page(){
         let p = this.$route.params.page;
         if (this.meta_map[p]){
            document.title = this.meta_map[p].title
         }

         return this.$route.params.page;
      }
   },

   mounted() {
      window.scrollTo(0, 0);
   }
}
</script>

<style scoped>

</style>
