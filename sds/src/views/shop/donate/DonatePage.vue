<template>
  <div>
    <donate-modal
      v-if="!horizontal"
      @donated="checkout_stripe"
    />
    <donate-modal-horizontal
      v-else
      @donated="checkout_stripe"
    />
  </div>
</template>

<script>
import DonateModal from "@/views/shop/donate/DonateModal";
import DonateModalHorizontal from "@/views/shop/donate/DonateModalHorizontal";

import { loadStripe } from '@stripe/stripe-js';
import data_getters from "@/mixins/data_getters";
const stripePromise = loadStripe(process.env.VUE_APP_STRIPE_KEY);

export default {
   name: "DonatePage",
   components: {DonateModal, DonateModalHorizontal},
   mixins: [data_getters],
   props: {
      horizontal: {type: Boolean, default: false},
   },

   data(){
      return {
         amount: 0,
      }
   },
   created(){

      this.$store.commit("set_show_side_nav", false);


   },


   methods: {
      async checkout_stripe(amount){

         console.log({amount})

         this.amount = amount;
         if (!Number.isFinite(amount)){
            throw Error('amount not valid')
         }



         const stripe = await stripePromise;

         // Call your backend to create the Checkout Session


         let user_id = this.$auth.profile.user_id;
         let back_url = this.$route.path;

         const session = await this.make_request('/store/createCheckoutSessionDonation', {donation_amount: amount, user_id, back_url});

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
   },
}
</script>

<style scoped>

</style>