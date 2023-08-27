<template>
   <div>
      <div class="page-title">
         About Us
      </div>

      <div class="content-container-bg" >
         <div class="content-container-sm">



            <div class="content-container-sm">
               <div class="bread-crumb-title">
                  For Owners and Trainers
               </div>
               <div class="lm-title">
                  Service Dog Standards Training & Behavior Standards
               </div>
               <share-section />

            </div>

            <div class="section">


               <p>
                  Service Dog Standards is comprised of service dog trainers and owners who are trying to do the right thing by voluntarily choosing to hold themselves and their dogs to a higher standard which goes above and beyond the law. Our purpose is to create a powerful personal identification, record keeping, reference, information and educational tool for all Service Dog handlers regardless of certification levels, training methods or other affiliations. We hope to add clarity to the process of training and partnering with a Service Dog by outlining some of the more confusing parts of the process step-by-step.
               </p>


               <div class="lm-heading">
                  Please read each page carefully
               </div>

               <p>
                  Service Dog Standards represents community-defined training and behavior standards for handlers and
                  their Service Dogs. Accepting these standards is a way of voluntarily holding yourself and your animal
                  to a higher standard which goes above and beyond the law. Under the law the only requirement for
                  a Service Dog is that they be specifically trained to perform tasks or work for a disabled individual
                  who would otherwise have difficulty accomplishing those tasks on their own due to their disability.
                  Emotional support or other behaviors that a dog does naturally, while they may be beneficial and even
                  help mitigate a disability, should not be included when naming trained work or tasks.
               </p>


               <p>
                  This guide is designed to not only help with expectations and requirements for Service Dog trainers
                  and handlers but to also serve as a resource that covers commonly overlooked pitfalls and issues that handlers experience.
               </p>


            </div>





            <!------------ code copy/pasted from accountHome ----------------------->
            <div style="display: flex; justify-content: center">
               <div class="account-status-container mt-4 pb-8" >
                  <div style="display: flex; justify-content: center" class="pt-5 pb-5">
                     <img src="../../assets/images/content/cloud-download.png" width = "100px">
                  </div>


                  <div class="headings pb-1">
                     Downloadables
                  </div>

                  <div style="background-color: var(--color-bg)" class="ml-4 mr-4 pa-3">
                     <div style="display: flex; justify-content: center; align-items: center; " >
                        <img src="../../assets/images/content/pdf_icon.png" width="50">
                        <div style="max-width: 250px; font-size: 11pt; color: var(--color-subheading); font-weight: 500" class="pl-2">
                           Service Dogs Standards Training and Behavior Agreement
                        </div>
                     </div>


                     <div style="margin-left:60px" class="pt-2">
                        <!--<a href="/downloads/Service_Dog_Standards_Training_and_Behavior_Standards_SDSTBS-21.pdf"-->
                        <!--   target="_blank" style="text-decoration: none;">-->
                        <!--   Open in new window-->
                        <!--</a>-->
                        <!--<br>-->
                        <a href="/downloads/Service_Dog_Standards_Training_and_Behavior_Standards_SDSTBS-21.pdf"
                           style="text-decoration: none;" download>
                           Download
                        </a>
                     </div>
                  </div>

                  <div style="height: 10px"></div>

                  <div style="background-color: var(--color-bg)" class="ml-4 mr-4 pa-3">
                     <div style="display: flex; justify-content: center; align-items: center; " >
                        <img src="../../assets/images/content/pdf_icon.png" width="50">
                        <div style="max-width: 250px; font-size: 11pt; color: var(--color-subheading); font-weight: 500" class="pl-2">
                           Service Dog Standards Public Access Test
                        </div>
                     </div>


                     <div style="margin-left:60px" class="pt-0">
                        <!--<a href="/downloads/Service_Dog_Standards_Public_Access_Test_SDSPAT-A21.pdf"-->
                        <!--   target="_blank" style="text-decoration: none;">-->
                        <!--   Open in new window-->
                        <!--</a>-->
                        <!--<br>-->
                        <a href="/downloads/Service_Dog_Standards_Public_Access_Test_SDSPAT-A21.pdf"
                           style="text-decoration: none;" download>
                           Download
                        </a>
                     </div>
                  </div>

                  <div style="height: 15px"></div>
               </div>
            </div>






         </div>
      </div>
   </div>
</template>

<script>
import SelectAcctType from "@/views/signup/selectAcctType";
export default {
   name: "behaviorStandards",
   components: {SelectAcctType}
}
</script>

<style scoped src="./common.css"></style>

<style scoped>
.headings{
    font-size: 18pt;
    font-weight: 600;
    color: var(--color-headline);
    text-align: center;
    /*margin-top: 5px;*/
    margin-bottom: 15px;

}

.account-status-container{
    background-color: white;
    padding: 50px;
    max-width: 450px;
    width: 100%;
}


</style>
