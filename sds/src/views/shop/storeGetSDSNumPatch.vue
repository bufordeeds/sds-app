<template>
  <div>
    <div class="sds-content-container-bg">
      <div
        class="sds-content-container"
        style="display: flex; flex-direction: column; align-items: center"
      >
        <div
          class="sds-subtitle"
          :style="$vuetify.breakpoint.smAndDown? 'font-size: 15pt' : ''"
          style="text-align: center"
        >
          Please verify you have accepted the SDS Behavioral Standards by entering a valid SDS Number
        </div>
        <img
          src="../../assets/images/products/SDSPatch.png"
          style="max-width: 300px; width: 90%; margin-top: 20px"
        >
        <div style="font-size: 10pt; padding-left: 20px; margin-top: -20px">
          <!--               Click on any item to enlarge.  Items not to scale.-->
        </div>




        <!---------------------- container for the "continue" buttons --------------------------------------------->
        <div
          v-if="!show_dogs"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <div style="color: var(--color-subheading); margin-top: 30px; font-weight: 600">
            Enter 10 Digit Team SDS Number
          </div>

          <my-form ref="form">
            <text-input
              v-model="sds_number"
              style="max-width: 250px; margin-top: 10px"
              label="SDS Number"
              hide-label-on-input
              border-color="var(--color-primary)"
              :rules="[isRequired]"
            />
          </my-form>


          <div style="color: var(--color-subheading); margin-top: 5px; font-weight: 600; font-size: 8pt; display: flex; justify-content: space-between; max-width: 250px">
            <router-link
              to="/?advanced_search=true"
              target="_blank"
            >
              Find SDS number
            </router-link>


            <router-link
              v-if="$auth.authenticated "
              to="/manageServiceDogs"
            >
              My Service Dogs
            </router-link>
          </div>



          <div
            v-if="err_msg"
            style="color: var(--color-input-error)"
          >
            {{ err_msg }}
          </div>
          <div style="height: 30px" />



          <!--            arrow button 2-->
          <v-btn
            dark
            text
            class="ma-0 pa-0"
            style="height: 40px"
            @click="add_to_cart"
          >
            <div style="background-color: var(--color-btn); height: 40px; display: flex; justify-content: center; align-items: center; width: 170px">
              Verify and add to cart
            </div>
            <div class="btn-arrow-right" />
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/inputs/TextInput";
import MyForm from "@/components/inputs/MyForm";
import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";
import helpers from "@/utilities/helpers";
import store from "@/mixins/store";

export default {
   name: "StorePage1",
   components: {MyForm, TextInput},
   mixins: [data_getters,validation, store],
   data() {
      return {

         sds_number: null,

         dogs: null,
         user: null,

         show_dogs: false,

         dog_to_add: null,
         loading_dog: false,

         item_sds_patch: {},

         err_msg: null,

      }
   },


   async created(){

      this.make_request('/store/getItem', {item_key: 'sds_accepted_patch'})
          .then(data => {this.item_sds_patch = data});

      // if (this.$auth.isAuthenticated()){
      //
      //    // this.sds_number = this.$auth.profile.member_num;
      //
      //   let cart = await this.make_request('/store/getActiveCart');
      //
      //   if (cart != null){
      //     this.$store.commit('set_cart_items', cart.items);
      //     console.log('i ran')
      //     // await this.continue_forward();
      //
      //     for (let i in this.dogs){
      //
      //       let ix = helpers.findWithAttr(cart.items, 'details.dog_num', this.dogs[i].dog_num)
      //       if (ix > -1){
      //         this.dogs[i].loc_selected = true;
      //       }
      //     }
      //
      //
      //   }
      //
      //
      // }
   },

   methods:{







      async add_to_cart(){

         if (!this.$refs.form.validate()){
            return;
         }

         try{
            this.loading_dog = true;
            let dog = await this.make_request('/public/getDogProfile', {dog_num: this.sds_number});

            this.loading_dog = false;


            if (dog == null || dog.name == undefined){
               this.err_msg = 'SDS number could not verified'
               return;
            }





            let item = this.item_sds_patch;
            let item2 = {
               name: item.name,
               item_key: item.item_key,
               description: item.description,
               price: item.price,
               number: 1,
               details: {

               },
            };
            await this.add_item_to_cart(item2);

            this.$emit('items-added')
         }

         catch (e) {
            throw e;
         }




      },


     /**
      *
      * Get cart from database and update store
      */
     // async update_cart(){
     //   let cart = await this.make_request('/store/getActiveCart');
     //
     //   if (cart != null){
     //     this.$store.commit('set_cart_items', cart.items);
     //   }
     // }

   }
}
</script>







<style scoped>
   @import url('./store_common.css');


   .sds-arrow-button {
      background-color: pink;
      /*color: blue;*/
      padding: 5px 20px 5px 20px;
   }

   .text {
      background-color:#ff0000;
      color:#fff;
      display:inline-block;
      padding-left:4px;
   }



   /******* for arrow button *********/
   /*used for arrow after buttone*/
   .arrow-btn-container{
      display: flex;
      overflow: hidden;
      height: 40px;
   }

   .arrow-btn{
      background-color: var(--color-btn);
      border-radius: 0px;
      height: 40px !important;
      color: white;
      padding-left: 50px !important;
      padding-right: 50px !important;
   }




   /**************************** for table *********************************************************/

   .table-header{
      font-weight: 700;
      padding: 10px;
      color: var(--color-subheading);
   }

   .reg-body{

      background-color: white;
   }


   /*settings for registration table*/
   th, td{
      text-align: left;
      padding: 10px;
      font-weight: 600;
   }

   th{
     color: var(--color-subheading);
   }

   tr:nth-child(odd) {background-color: #e7f3fb;}
   tr:nth-child(even) {background-color: #f7fbfd;}

   .col-service-dog{
      font-size: 12pt;
      font-weight: 500;
   }

   .sd-name-container{
      display: flex;
      align-items: center;

   }


   .col-service-do-reg{
      font-size: 12pt;
      font-weight: 500;
      color: var(--color-subheading)
   }



</style>
