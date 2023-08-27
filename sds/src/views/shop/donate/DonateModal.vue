<template>
<div>

   <div class="page-title">
      Donate
   </div>
   <div class="content-container-bg">
      <div class="content-container-sm centered-flex-column white-bg">
         <div class="centered-flex-column mb-9" style="max-width: 350px; text-align: center; ">

            <img src="../../../assets/images/icons/donate_heart.png" width="150px" class="mt-4">

            <div  class="heading mt-0">
               <!--Please help support Voluntary Service Dog Standards-->
               Please Help Support Voluntary Service Dog Standards
            </div>

            <div  class="text mt-4" style="">
               Help us improve and provide more free tools for Service Dog Standards for trainers and handlers.

               <!--<p>-->
               <!--   Programming and maintaining free Service Dog Standards is not a small task.-->
               <!--</p>-->

               <!--<p>-->
               <!--   Please help offset our substantial programming, maintenance, education, and outreach expenses, keep our-->
               <!--   coffee maker and servers running — and help support free Service Dog Standards for trainers and handlers.-->
               <!--</p>-->

            </div>


            <div class="heading mt-4">
               Choose an amount:
            </div>


            <!----------container for dollar selector ----------->
            <div>

            </div>

            <v-row dense style="width:100%">

               <v-col v-for="(amount, ix) in amounts" :key="'amount'+amount"
                   class="dollar-container" cols="6"
               >
                  <div class="dollar-amount" @click="selected_ix=ix" :class="selected(ix)">
                     ${{amount}}
                  </div>
               </v-col>

               <v-col class="dollar-container" cols="6">
                  <div class="dollar-amount" @click="selected_ix=7" :class="selected(7)">
                     $ <input type="text" v-model="custom_amount" class="custom-amount" :style="cust_style">
                  </div>
               </v-col>

            </v-row>

            <v-btn large style="width: 100%; font-size: 14pt;" class="mt-3" :disabled="disabled_contribute"
                   @click="$emit('donated', amount)"
            >
               Contribute
            </v-btn>

            <v-btn large style="width: 100%; font-size: 14pt; background-color: gray" class="mt-3"
                   @click="$emit('close')"
            >
               No thank you
            </v-btn>


            <div class="text mt-4" style="color: #6d6f72">
               Free and voluntary Service Dog Standards are made possible by contributions from members and people like
               you.
            </div>

            <div class="text mt-2" style="color: #6d6f72">
               Thank you.
            </div>

         </div>
      </div>

   </div>
</div>
</template>

<script>
export default {
   name: "DonateModal",
   props:{

   },

   data(){
      return{
         amounts: [5, 10, 15, 25, 50, 100, 250],
         custom_amount: null,
         selected_ix: 2,
      }
   },

   computed: {
     amount(){
        let ans = 0;
        if (this.selected_ix == null){
           ans = 0;
        }
        else{
           if (0 <= this.selected_ix && this.selected_ix<= 6){
              ans = this.amounts[this.selected_ix];
           }
           else if ( this.selected_ix === 7){
              ans =  Number(this.custom_amount);
           }
        }
        return ans;
     },

      cust_style(){


        if (!Number.isFinite(this.amount) ){
           return 'border: 1px solid red';
        }
        return '';
      },

      disabled_contribute(){
        return !Number.isFinite(this.amount) || this.amount <= 0;
      }
   },

   methods:{

      selected(ix){
         if (this.selected_ix === ix){
            return 'selected-amount'

         }
         return ''
      }
   }
}
</script>

<style scoped>
.heading{
   color: #093c73;
   font-size: 17pt;
   font-weight: 600;
   text-align: center;
}

.text{
   color: #464748;
   font-size: 14pt;
   font-weight: 600;
   text-align: center;

}


.dollar-container{
   padding-left: 10px;
   padding-right: 10px;
    cursor: pointer;

}

.dollar-amount{
   background-color: #f0f0f1;
   width: 100%;
   padding-top: 10px;
   padding-bottom: 10px;
   border: 2px solid transparent;
}

.selected-amount{
   border: 2px solid #03d003;
}

.custom-amount{
   border-radius: 5px;
   border: 1px solid #999999;
   background-color: white;
   width: 60%;
   padding-left: 5px;
}

input:focus{
   border: 1px solid #999999;
   outline: none;
}
</style>