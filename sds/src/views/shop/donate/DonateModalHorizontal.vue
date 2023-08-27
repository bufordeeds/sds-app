<template>
   <div class="centered-flex-column pa-5 white-bg" style="width: 100%; max-width: 900px;">

      <v-row dense>
         <v-col cols="12" sm="4" style="display: flex; justify-content: center">
            <img src="../../../assets/images/icons/donate_heart.png"
                 style="max-width: 400px; width: 90%; align-self: flex-start"
            >
         </v-col>

         <v-col cols="12" sm="8">
            <div style="color: var(--color-headline); font-size: 14pt; font-weight: 600">
               Please Help Support Voluntary Service Dog Standards
            </div>

            <div>
               Help us improve and provide more free tools for Service Dog Standards for trainers and handlers.

               <!--Programming and maintaining free Service Dog Standards is not a small task.-->

               <!--Please help offset our substantial programming, maintenance, education, and outreach expenses, keep our-->
               <!--coffee maker and servers running — and help support free Service Dog Standards for trainers and handlers.-->
            </div>

            <v-row dense style="width:100%; margin-top: 20px">

               <v-col v-for="(amount, ix) in amounts" :key="'amount'+amount"
                      class="dollar-container" cols="3"
               >
                  <div class="dollar-amount" @click="selected_ix=ix" :class="selected(ix)">
                     ${{amount}}
                  </div>
               </v-col>

               <v-col class="dollar-container" cols="3">
                  <div class="dollar-amount" @click="selected_ix=7" :class="selected(7)">
                     $ <input type="text" v-model="custom_amount" class="custom-amount" :style="cust_style">
                  </div>
               </v-col>

            </v-row>

            <v-btn  width="50%" min-width="150px" height="40px" class="mt-5 "
                    :disabled="disabled_contribute"
                    @click="$emit('donated', amount)"
                    v-if="$vuetify.breakpoint.mdAndUp"
            >
               Contribute
            </v-btn>

         </v-col>

         <div  v-if="$vuetify.breakpoint.smAndDown" style="display: flex; justify-content: center; width: 100%">
            <v-btn  width="50%" min-width="150px" height="40px" class="mt-5 "
                    :disabled="disabled_contribute"
                    @click="$emit('donated', amount)"
            >
               Contribute
            </v-btn>
         </div>
      </v-row>
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
    text-align: center;
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