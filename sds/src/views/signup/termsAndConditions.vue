<template>
  <div>
    <div
      class="subheading-txt pb-4"
      style="text-align: center;"
    >
      In order to continue, you must accept the following...
    </div>


    <div>
      <ul>
        <li>I am at least 18 years of age.</li>
        <li>I am enrolling myself. If I am enrolling for someone else I have their permission to do so.</li>
        <li>I agree that I will not intentionally or unintentionally violate any applicable local, state, national or international law, including but not limited to the Americans with Disabilities Act and its implementing regulations.</li>
        <li>I understand that it is against the law to intentionally misrepresent an animal as a Service or Assistance Dog.</li>
        <li>I, or the person being enrolled, has a qualifying disability.</li>
        <li>This dog is either a fully trained Service or Assistance Dog, or is in the process of being trained to help perform specific tasks related to the owner's disability. Please note that not all states recognize Service or Assistance Dogs in Training. I understand that it is my responsibility to understand and obey all applicable laws in my area.</li>
        <li>I understand that membership is not a substitute for proper training.</li>
        <li>I understand that aggressive behavior constitutes an immediate forfeiture of membership.</li>
        <li>I understand that misrepresenting myself or my service animal, behaving in an unbecoming manner, misquoting the law or the purpose of our service can result in immediate forfeiture of membership.</li>
        <li>I will do my very best to leave an excellent impression with others with my behavior and that of my Service Dog.</li>
        <!--<li>I have read, understand and comply with the definition of a Service or Assistance Animal.</li>-->
        <!--<li>I have read, understand and comply with the Minimum Training Standards for a Service or Assistance Dog which includes a Public Access Test.</li>-->
      </ul>
    </div>


    <!--<div class="my-checkbox">-->
    <!--   <v-checkbox-->
    <!--       v-model="agree1"-->
    <!--       label="I UNDERSTAND AND AGREE TO ALL OF THE STATEMENTS LISTED ABOVE."-->
    <!--   ></v-checkbox>-->

    <!--</div>-->




    <!--<div class="my-heading" style="margin-top: 30px">-->

    <div
      class="subheading-txt pb-4"
      style="text-align: center; margin-top: 30px"
    >
      Terms of Service
    </div>
    <div class="terms-conditions">
      <sds-terms />
    </div>

    <div class="my-checkbox">
      <v-checkbox
        v-model="agree_terms"
        label="I agree to the statements above and the Service Dog Standards Terms of Service"
      />
    </div>
  </div>
</template>

<script>
import SdsTerms from "@/components/SdsTerms";
export default {
   name: "TermsAndConditions",
   components:{SdsTerms},
   props: {
      agreed: Boolean, //used to tell parent when user has agreed to all terms
   },
   data(){
      return {
         agree1: false,
         agree_terms: false,
      }
   },

   watch:{
      // agree1(){
      //
      //    let ans = (this.agree1 && this.agree_terms)
      //    this.$emit('update:agreed', ans);
      //    // console.log('watch 1', ans)
      // },
      agree_terms(){

         this.$emit('update:agreed', this.agree_terms);

      }
   }
}
</script>

<style scoped>

ul{
   /*list-style-image: url('../../assets/images/icons/tick.svg')*/

   padding-left: 10px;
}

li{
   margin: 0;
   padding: 5px 0px 5px 25px;
   list-style: none;
   background-image: url('../../assets/images/icons/tick.svg');
   background-repeat: no-repeat;
   background-position: left 10px;
   background-size: 15px;
}

.my-heading{
   text-align: center;
   font-size: 20px;
   font-weight: 600;
   margin-bottom: 20px;
}

.my-checkbox{
   display: flex;
   justify-content: center;
}

.terms-conditions{
   overflow: auto;
   max-height: 50vh;
   margin-left: 0px;
   border: solid 1px #fefefe;
   padding: 15px 15px 15px 20px;

   background-color: #f5f5f5;
}

.tc-heading{
   font-size: 17pt;
}

.tc-body{
   font-size: 12pt;
   margin-bottom: 20px;
}

.tc-subheading{
   font-size: 14pt;
   font-weight: 500;
   padding-top: 10px;
}
p{

}
</style>

