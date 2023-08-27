<template>


   <div class="flex-centered-content-col">

      <!--font-size: 16pt; font-weight: 600; color: var(&#45;&#45;color-headline)-->

      <!----------- box handler/trainer select ------------------------------------------------------------------------>
      <div v-if="!isHandler">
         <div style="text-align: center; " class="blue-heading">
            Are you a Trainer or Handler?
         </div>

         <div style="display: flex; justify-content: center; flex-wrap: wrap;margin-top: 30px">
            <div class="user-box">
               <div class="icon-container"  @click="isHandler=true">
                  <img src="../../assets/images/icons/dog-with-belt-walking-with-a-man.svg" width="60px" >
               </div>

               <v-btn text @click="isHandler=true">
                  <div class="icon-text">
                     I'm a Handler
                  </div>
               </v-btn>

            </div>


            <div class="user-box">
               <div class="icon-container" @click="$emit('user-type-selected', 'TRAINER')" >
                  <img src="../../assets/images/icons/trainer.svg" width="60px" >
               </div>

               <v-btn text @click="$emit('user-type-selected', 'TRAINER')">
                  <div class="icon-text">
                     I'm a Trainer
                  </div>
               </v-btn>


            </div>
         </div>
      </div>



      <!----------- box for animal types------------------------------------------------------------------------------->

      <div v-if="isHandler">
         <div style="text-align: center;" class="blue-heading">
            What type of animal are you registering?
         </div>

         <div style="display: flex; justify-content: center; flex-wrap: wrap; margin-top: 30px">
            <div class="user-box">
               <div class="icon-container" @click="$emit('user-type-selected', 'HANDLER')">
                  <img src="../../assets/images/icons/service-dog.e7bc71b3.svg" width="60px" >

               </div>

               <v-btn text @click="$emit('user-type-selected', 'HANDLER')">
                  <div class="icon-text">
                     Service Dog
                  </div>
               </v-btn>

            </div>


            <div class="user-box">
               <div class="icon-container" @click="animalType='ESA'" >
                  <img src="../../assets/images/icons/cat.png" width="60px" >
               </div>

               <v-btn text @click="animalType='ESA'">
                  <div class="icon-text">
                     Emotional Support Animal
                  </div>
               </v-btn>
            </div>


            <div class="user-box" >
               <div class="icon-container"  @click="animalType='therapy'">
                  <img src="../../assets/images/icons/therapy-dog.svg" width="60px" >
               </div>

               <v-btn text @click="animalType='therapy'">
                  <div class="icon-text">
                     Therapy Dog
                  </div>
               </v-btn>
            </div>


         </div>
      </div>



      <!----------- box info therapy dog------------------------------------------------------------------------------->

      <div v-if="animalType==='therapy'" class="content-container">


         <img src="../../assets/images/content/therapy_dog.png"  :class="isMobile? 'full-image': 'floated-image'">

         <p>
            <span style="font-weight: 600">Therapy Dogs</span>
             are an important type of working dog, but they are not Service Dogs. Therapy Dogs are trained to help others who may or may not be disabled. These dogs typically work with their handler in hospitals, nursing homes or other facilities. We don't allow Therapy Dogs to be included as part of Service Dog Standards because they are not Service Dogs and therefore not covered under the Americans With Disabilities Act (ADA).
         </p>

         <p>
            There are no universally mandated licensing, registration, certification or training requirements for Therapy Dogs or Therapy Dog trainers. Since these dogs work alongside their handler with the public at a specific facility, each facility that utilizes Therapy Dogs sets their own requirements. Please check with the organization where you wish to volunteer or work. There are voluntary programs that provide training and behavior standards for Therapy Dogs much like we do for Service Dogs.
         </p>

         <p>
            Of course, handlers of Therapy Dogs do not have public access rights and should not bring their animal partners into restaurants, stores or other public places. There are programs that provide training and behavior standards for Therapy Dogs much like we do for Service Dogs.
         </p>

         <p style="background-color: white; padding: 15px">
            Note: Some disabled Service Dog handlers have cross-trained their dog to work as a Therapy Dog. However, it's worth mentioning that some trainers believe this can be dangerous because Service Dogs are typically taught to focus solely on their handler, while Therapy Dogs are trained to focus on others. We do not advise cross-training a Service Dog for this reason, however we believe this decision should be left to each handler with consideration given to the disability involved and the individual characteristics of each team.
         </p>

         <p>
            <span style="font-weight: 600"> Read:</span>
            <a href="https://www.anythingpawsable.com/the-difference-between-service-dogs-therapy-dogs-emotional-support-animals-and-more/">
               The Difference Between Service Dogs, Therapy Dogs, Emotional Support Animals and More
            </a>
         </p>

      </div>




      <div v-if="animalType==='ESA'" class="content-container">


         <img src="../../assets/images/content/emotional_support_animal.png" :class="isMobile? 'full-image': 'floated-image'" >

         <p>
            Emotional Support Animals (ESAs) are an important type of working dog, but they are not Service Dogs. There is no legal or valid registration, certification or training requirements for Emotional Support Animals. We don't allow Emotional Support Animals to be included as part of Service Dog Standards because they are not Service Dogs and therefore not covered under the Americans With Disabilities Act (ADA). A simple letter from a physician or counselor stating need (but not mentioning any specifics) is the only documentation that is recognized under law.
         </p>

         <p>
            ESAs help individuals by comforting them with their presence but are not required to perform work or tasks related to a disability. ESAs have their own rights, separate from Service Dogs.
         </p>

         <p>
            Of course, handlers of Emotional Support Animals do not have public access rights and should not be bring their animal partners into restaurants, stores or other public places. As well, Emotional Support Animals do not need to wear vests or any identifying gear.
         </p>


         <p style="background-color: white; padding: 15px">
            <span style="font-weight: 600">ADA REG § 35.104 Definitions.</span>
            Service animal means any dog that is individually trained to do work or perform tasks for the benefit of an individual with a disability, including a physical, sensory, psychiatric, intellectual, or other mental disability . . . The effects of an animal's presence and the provision of emotional support, well-being, comfort, or companionship do not constitute work or tasks for the purposes of this definition.
         </p>




         <p>
            <span style="font-weight: 600"> Read:</span>
            <a href="https://www.anythingpawsable.com/the-difference-between-service-dogs-therapy-dogs-emotional-support-animals-and-more/">
               The Difference Between Service Dogs, Therapy Dogs, Emotional Support Animals and More
            </a>

         </p>

      </div>

   </div>

</template>


<script>

export default {
   name: "selectAcctType",
   data(){
      return{
         isHandler: false,

         animalType: null,
      }
   },

   computed:{
      isMobile(){
         return this.$vuetify.breakpoint.width < 700;
      }
   }



}
</script>

<style scoped>

.user-box{
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding: 15px;
}

.icon-container{
   background-color: #60afe1;
   border-radius: 50%;
   height: 100px;
   width:  100px;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
}

.icon-text{
   padding-top: 7px;
   /*font-size: 14pt;*/
   font-weight: 600;
}

.content-container{
   max-width: 900px;
   margin-top: 20px;
}

.floated-image{
   float: left;
   max-width: 500px;
    width: 100%;
   /*background: red;*/
   margin-right: 20px;
}



.full-image{
    width: 100%;
    /*margin-right: 20px;*/
}
</style>
