<template>
  <div>
    <div class="page-title">
      Order Confirmation
    </div>

    <div class="content-container-bg">
      <div class="content-container-centered">
        <!------------------------------ Cart Items ---------------------------->

        <div
          style="background-color: white"
          class="mb-5 mt-9 pa-6"
        >
          <div
            style="font-size: 14pt"
            class="mt-6"
          >
            Thank you for  your purchase!  Your order has been received and a confirmation has been emailed to
            {{ order.customer_info.email }}.
          </div>

          <div
            class="sds-subtitle mt-6"
            style="color: var(--color-headline)"
          >
            Order Summary
          </div>

          <div class="summary-title">
            Order Total: {{ fmt_number(order.order_total, {places: 2,prefix:'$' }) }}
          </div>

          <div class="summary-title">
            Payment Method: <span style="text-transform: uppercase">{{ payment.network }}</span>  *{{ payment.last4 }}
          </div>

          <div class="summary-title">
            Shipping Method: {{ shipping.carrier }} {{ shipping.service }}
          </div>

          <div class="summary-title">
            Shipping Address
          </div>
          <div style="text-transform: capitalize">
            {{ address.street1 }}<br>
            <span v-if="address.street2">{{ address.street2 }}<br></span>

            {{ address.city }} {{ address.state }} {{ address.zip }}
          </div>
        </div>



        <div
          style="background-color: white"
          class="pa-6"
        >
          <div
            class="sds-subtitle"
            style="color: var(--color-headline); padding-top: 0px"
          >
            Items
          </div>
          <v-divider />
          <item-box
            v-for="(item, i) in order.items"
            :key="item.dog_id + i.toString()"
            :item="item"
            :show-actions="false"
          />
        </div>





        <!--            <div v-for="(item, i) in order.items" :key="item.dog_id + i.toString()"-->
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
      </div>
    </div>
  </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import utilities from "@/mixins/utilities";
import ItemBox from "@/views/shop/ItemBox";

import _ from 'lodash';

export default {
   name: "Success",

   components: {ItemBox},
   mixins: [data_getters, utilities],
   data(){
      return{
         order: {customer_info:{}},
      }

   },

   computed:{
     email(){
        return this.$auth.profile.email;
     },

      address(){
        let addr = _.get(this.order, 'easypost.shipment.buyer_address', null);
        if (addr==null){
           return {}
        }


        return {
           street1: addr.street1,
           street2: addr.street2,
           city: addr.city,
           state: addr.state,
           zip: addr.zip,
        }
      },

      shipping(){
         return _.get(this.order, 'easypost.rate_selected', {});

      },

      payment(){
        let charges = _.get(this.order, 'stripe_info.payment_intent.charges.data', []);

        if (charges.length > 0){
           return charges[0].payment_method_details.card;

        }

        return {}


      }


   },

   async mounted(){

      await this.update_order();


   },


   methods:{





      async update_order(){
         let stripe_session_id = this.$route.query.session_id;

         console.log(this.$route)

         try{
            let res = await this.make_request('/store/closeCartAndCreateOrder', {stripe_session_id});

            console.log({res});

            this.order = res.order;


            this.$store.commit('clear_cart');
         }catch (e) {
            console.log(e)
         }
      }
   }
}
</script>

<style scoped>

.summary-title{
   margin-top: 10px;
}
</style>