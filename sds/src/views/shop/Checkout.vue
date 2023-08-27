<template>
   <div>
            <!--<v-dialog v-model="show_edit_address" max-width="500px">-->

            <!--   <v-card class="pa-4">-->
            <!--      <div style="display:flex; ">-->
            <!--        <span style="font-weight: 600; color: var(&#45;&#45;color-txt-grey1)">-->
            <!--         Edit Address-->
            <!--        </span>-->

            <!--        <v-spacer />-->
            <!--        <v-btn icon small @click="show_edit_address=false;">-->
            <!--          <v-icon>close</v-icon>-->
            <!--        </v-btn>-->
            <!--      </div>-->
            <!--      <my-form>-->

            <!--        <v-row dense>-->
            <!--          <v-col>-->
            <!--            <my-text-input-->
            <!--                label="Name"-->
            <!--                v-model="shipping_address_edit.name"-->
            <!--            />-->
            <!--          </v-col>-->
            <!--        </v-row>-->

            <!--        <v-row dense>-->
            <!--          <v-col cols="8">-->
            <!--            <my-text-input-->
            <!--                label="Street"-->
            <!--                v-model="shipping_address_edit.street1"-->
            <!--            />-->
            <!--          </v-col>-->

            <!--          <v-col cols="4">-->
            <!--            <my-text-input-->
            <!--                label="Apt, Suit, etc."-->
            <!--                v-model="shipping_address_edit.street2"-->
            <!--            />-->
            <!--          </v-col>-->
            <!--        </v-row>-->

            <!--        <v-row>-->

            <!--          <v-col>-->
            <!--            <my-text-input-->
            <!--                label="City"-->
            <!--                v-model="shipping_address_edit.city"-->
            <!--            />-->
            <!--          </v-col>-->
            <!--          <v-col>-->
            <!--            <my-text-input-->
            <!--                label="State"-->
            <!--                v-model="shipping_address_edit.state"-->
            <!--            />-->
            <!--          </v-col>-->
            <!--          <v-col>-->
            <!--            <my-text-input-->
            <!--                label="Zip"-->
            <!--                v-model="shipping_address_edit.zip"-->
            <!--            />-->
            <!--          </v-col>-->
            <!--        </v-row>-->
            <!--      </my-form>-->

            <!--     <v-row class="mt-4 pr-2">-->
            <!--       <v-spacer />-->

            <!--       <v-btn-->
            <!--           color="var(&#45;&#45;color-btn)" class="white&#45;&#45;text"-->
            <!--           @click="on_save_address"-->
            <!--       >Update</v-btn>-->
            <!--     </v-row>-->
            <!--   </v-card>-->
            <!--</v-dialog>-->




      <v-dialog v-model="show_edit_address" max-width="500px">

            <v-card class="pa-4">
               <div style="display:flex; ">
                 <span style="font-weight: 600; color: var(--color-txt-grey1)">
                  Edit Address
                 </span>

                 <v-spacer />
                 <v-btn icon small @click="show_edit_address=false;">
                   <v-icon>close</v-icon>
                 </v-btn>
               </div>


               <checkout-edit-address
                   :address.sync="shipping_address_edit"
                   @save="on_save_address"
               />

              <v-row class="mt-4 pr-2">
                <v-spacer />

                <v-btn
                    color="var(--color-btn)" class="white--text"
                    @click="on_save_address"
                >Update</v-btn>
              </v-row>
            </v-card>
      </v-dialog>





     <!---------------------------------------------------------------------------------------------------------------->
     <!-------------------------------main content--------------------------------------------------------------------->
     <!---------------------------------------------------------------------------------------------------------------->

      <div class="page-title">
         Checkout
      </div>

      <div class="content-container-bg" >
         <div class="sds-content-container" style="max-width: 700px">




           <!----------------------------------------Shipping address---------------------------->


            <template v-if="!isGuest">
               <div  class="checkout-heading" style="display: flex">
                  Shipping Address
                  <v-spacer/>
                  <v-btn  text color="var(--color-btn)"
                          @click="on_change_address"
                  >
                     Edit
                  </v-btn>
               </div>

               <div class="checkout-data" >
                  <div>
                     <div>
                        {{email}}
                     </div>
                     <div>
                        {{shipping_address.name}}
                     </div>
                     <div>
                        {{shipping_address.street1}}
                     </div>
                     <div v-if="shipping_address.street2">
                        {{shipping_address.street2}}
                     </div>
                     <div>

                        {{shipping_address.city}}, {{shipping_address.state}} {{shipping_address.zip}}
                     </div>
                  </div>
               </div>
            </template>

            <template v-else>
               <div  class="checkout-heading" style="display: flex">
                  Your Info
               </div>

               <div class="checkout-data" >
                  <checkout-edit-address
                      ref="address"
                      :address.sync="shipping_address"
                      :email.sync="email"
                  />
               </div>

            </template>



            <!--v-if="shipping_rates == null"-->
            <div style="display:flex" class="mt-4" >
               <v-spacer />
               <v-btn
                   @click="get_shipping_info"
                   color="var(--color-btn)" class="white--text"
                   :loading="loading_confirm_address"
               >
                  <!--Confirm Address-->
                  Get Shipping Rates
               </v-btn>

            </div>




           <!----------------------------------------Shipping Rates---------------------------->

            <div style="background-color: white">
               <div class="checkout-heading mt-8" >
                  Shipping & Handling
               </div>

               <div  class="checkout-data">
                  <div v-if="shipping_rates == null" class="pa-2">
                     Please confirm your shipping address to see shipping options
                  </div>

                  <v-radio-group
                      v-else
                      v-model="selected_rate" class="mt-1"
                      @change="on_select_shipping"
                  >
                     <v-radio
                         v-for="rate in shipping_rates"
                         :key="'rate'+rate.id"
                         :value="rate"
                     >
                        <template v-slot:label>
                           <div style="display: flex; width: 100%">
                              <div>
                                 {{rate.carrier}} {{rate.service}}
                              </div>
                              <div v-if="rate.est_delivery_days != null" class="ml-1">
                                 (Est. delivery : {{rate.est_delivery_days}} day<span v-if="rate.est_delivery_days > 1">s</span>*)
                              </div>
                              <v-spacer/>
                              <div>
                                 {{rate.rate}}
                              </div>
                           </div>
                        </template>

                     </v-radio>
                  </v-radio-group>


                  <div v-if="shipping_rates != null" style="font-size: 10pt">
                     * Delivery estimates provided by USPS and are relative to the date items are shipped.
                  </div>
               </div>
            </div>









           <!--------------------- Order Summary ------------------------------------------->
           <div class="checkout-heading mt-9" >
             Order Summary
           </div>

            <div class="checkout-data">
             <div style="display: flex; width: 100%">
               <div>
                 Total Items
               </div>
               <v-spacer></v-spacer>
               <div class="ml-2 mr-3" style="">
                 {{fmt_number(cart_total, {places: 2, prefix: '$'}) }}
               </div>
             </div>

             <div style="display: flex; width: 100%">
               <div>
                 Shipping & Handling
               </div>
               <v-spacer></v-spacer>
               <div class="ml-2 mr-3" style="" v-if="selected_rate != null">
                 {{fmt_number(shipping, {places: 2,prefix: '$'}) }}
               </div>
               <div class="ml-2 mr-3" style="font-size: 10pt" v-else>
                 -
               </div>
             </div>
             <v-divider/>

             <div style="display: flex; font-weight: 600" class="mt-2">
               <div>
                 Order Total
               </div>
               <v-spacer></v-spacer>
               <div class="ml-2 mr-3" style="">
                 {{fmt_number(shipping + cart_total, {places: 2, prefix: '$'}) }}
               </div>
             </div>

           </div>


           <div style="display:flex; margin-top: 20px;">
             <v-spacer />
             <v-btn :disabled="selected_rate == null"
                    dark text class="ma-0 pa-0" style="height: 40px" @click="checkout_stripe">
               <div style="background-color: var(--color-btn); height: 40px; display: flex; justify-content: center; align-items: center; width: 270px">
                 Proceed to Payment</div>
               <div class="btn-arrow-right"></div>
             </v-btn>
           </div>





           <!------------------------------ Cart Items ---------------------------->
            <div class="checkout-heading mt-6 pl-3 pt-1" style="color: var(--color-headline); background-color: white">
            Items
            </div>


            <item-box
                v-for="(item, i) in cart_items" :key="item.dog_id + i.toString()"
                :item="item"
                :show-actions="false"
            />


<!--            <div v-for="(item, i) in cart_items" :key="item.dog_id + i.toString()"-->
<!--                 style="background-color: white; display: flex;" class="pa-2 mt-0">-->

<!--               <div>-->
<!--                  <img src="../../assets/images/content/Kit_Expanded_Large.png"-->
<!--                       style="width: 200px"-->
<!--                  >-->
<!--               </div>-->

<!--               <div class="ml-4" style="display: flex; flex-direction: column">-->
<!--                  <div>-->
<!--                     <div style="font-weight: 500; font-size: 14pt; color: var(&#45;&#45;color-subheading)">-->
<!--                        {{item.description}}-->
<!--                     </div>-->
<!--                     Service Dog: <span class="data-label"> {{item.details.dog_name}} </span><br>-->
<!--                     Registration: <span class="data-label">  {{item.details.dog_num}} </span>-->
<!--                  </div>-->

<!--               </div>-->

<!--               <v-spacer></v-spacer>-->
<!--               <div class="ml-2 mr-3" style="font-weight: 600">-->
<!--                  ${{item.price}}-->
<!--               </div>-->

<!--            </div>-->


            <div style="height: 30px"></div>








         </div>
      </div>



   </div>
</template>

<script>

import data_getters from "@/mixins/data_getters";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(process.env.VUE_APP_STRIPE_KEY);

import _ from 'lodash';
import utilities from "@/mixins/utilities";
import ItemBox from "@/views/shop/ItemBox";
import checkoutEditAddress from "@/views/shop/checkoutEditAddress";


export default {
   name: "checkout",
   components: {ItemBox, checkoutEditAddress},
   mixins: [data_getters, utilities],

  data() {
    return {
      sds_number: null,
      show_edit_address: false,

      user: {},
      email: null,
      shipping_address:{},
      shipping_address_edit:{},

      //stuff from easypost
      address_verify: null,
      shipping_rates: null,
      selected_rate: null,

       loading_confirm_address: false,

    }
  },

   computed:{

      isGuest(){
         return !this.$auth.isAuthenticated();
      },

     shipping(){
       if (this.selected_rate != null){
         return Number(this.selected_rate.rate);
       }
       return 0;

     },
     //
     // shipping_fmt(){
     //   if (this.shipping_rate != null){
     //     return this.fmt_number(this.shipping_rate.rate, {places: 2, prefix: '$'});
     //   }
     //   return 'Confirm Address to see shipping cost'
     // },


      cart_user(){
         return this.$store.state.cart_user;
      },

      cart_items(){
         return this.$store.state.cart.items;
      },

      cart_total(){
         let ans = 0;
         for (let i of this.cart_items){
            ans += _.get(i, 'price', 0);
         }
         return ans;
      }
   },


   methods:{

      async remove_item(ix){
         try{

            let items = _.cloneDeep(this.cart_items);

            items.splice(ix, 1);
            await this.make_request('/store/updateCartItems', {items});
            this.$store.commit('set_cart_items', items);
         }catch (e) {

            console.log(e)
         }
      },



      async checkout_stripe(){

         const stripe = await stripePromise;

         // Call your backend to create the Checkout Session

         let cart_id = this.$store.state.cart._id;

         let address = _.cloneDeep(this.shipping_address);
         delete address.name
         let payload = {
            cart_id, email: this.email,
            name: this.shipping_address.name,
            address

         };

         const session = await this.make_request('/store/createCheckoutSession', payload);

         console.log(session)


         const result = await stripe.redirectToCheckout({
            sessionId: session.id,
         });

         if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
         }


      },


     async get_profile(){
       try{
         this.user = await this.make_request('/private/getMyProfile', {});
         let u = this.user;


         this.shipping_address = {
           name: this.get_name(u.name_first, u.name_last),
           street1: _.get(u, 'private_info.address.street1', ''),
           street2: _.get(u, 'private_info.address.street2', ''),
           city: _.get(u, 'private_info.address.city', ''),
           state: _.get(u, 'private_info.address.state', ''),
           zip: _.get(u, 'private_info.address.zip', ''),
         }
       }catch (e) {

         console.log(e)
       }

     },


     //handler for clicking change btn on address
     on_change_address(){
       this.shipping_address_edit = _.cloneDeep(this.shipping_address);
       this.show_edit_address = true;
     },

     //handler for clicking save in edit address dialog
     on_save_address(){
       this.shipping_address = _.cloneDeep(this.shipping_address_edit);
       this.show_edit_address = false;
       this.shipping_address_edit = {};
     },


     //
     async get_shipping_info(){

         if (this.$refs.address && !this.$refs.address.validate()){
            return;
         }

         this.loading_confirm_address = true;
        try{
          let res = await  this.make_request('/store/createShippingLabel', {address:this.shipping_address});
          this.address_verify = res.toAddress;
          this.shipping_rates = res.rates;
          this.selected_rate = res.selected_rate;

          console.log()

          // if (verify.success){
          //
          // }

           this.loading_confirm_address = false;

        }catch (e) {
          console.error(e)
        }

     },

     //handler for when user select a shipping rate
     async on_select_shipping(){
        try{
          let payload = {
            rate_selected: this.selected_rate
          }
          await this.make_request('/store/updateCartShipping', payload);

        }catch (e) {
          console.log(e)
        }
     }


   },


   async created(){

     this.$store.commit("set_show_side_nav", false);
      if (this.$auth.isAuthenticated()){
        this.get_profile().then();
         // this.sds_number = this.$auth.profile.member_num;
         this.email = this.$auth.profile.email;
      }

     let rate = _.get(this.$store.state.cart, 'easypost.selected_rate', null);
      if (rate !== null){
        this.selected_rate = rate;
      }
   }
}
</script>







<style scoped>
@import url('./store_common.css');

.info-container{
   text-align: left;
   width: auto;
   display: inline-block
}

.data-label{
   font-weight: 600;
}


.checkout-heading{
   color: var(--color-headline);
   font-size: 18pt;
   font-weight: 500;
   background-color: white;
   padding-left: 10px;
   padding-top: 10px;
}

.checkout-data{
   background-color: white;
   padding: 0px 15px 10px 15px;
}


</style>
