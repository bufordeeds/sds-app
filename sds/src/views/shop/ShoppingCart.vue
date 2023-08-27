<template>
   <div>


      <v-dialog v-model="show_add_kit">
         <div style="background-color: white; padding: 10px" >
            <add-kit-to-cart
                v-if="item_ix!=null"
                :dog="edit_item_dog"
                :cart_ix="item_ix"
                @close="show_add_kit=false; item_ix=null"
            />
         </div>

      </v-dialog>




      <v-dialog v-model="show_donate">
         <div style="background-color: white; padding: 10px" >
            <donate-modal
                @close="on_no_donate"
                @donated="on_donate"
            />
         </div>

      </v-dialog>




      <div class="content-container-bg" >
         <div class="sds-content-container" style="max-width: 1000px">
            <div
                class="sds-subtitle pt-2 pl-3" style="color: var(--color-headline); background-color: white" >
              Cart Items
            </div>

            <item-box
                v-for="(item, i) in cart_items" :key="item.description + i.toString()"
                :item="item"
                @remove-item="remove_item(i)"
                @edit-item="edit_item(i)"
            ></item-box>


            <div style="background-color: white; display: flex; font-weight: 600;" class="pa-2 mt-3">
               Total <v-spacer></v-spacer>
               <div class="ml-2 mr-3" style="">
                  ${{cart_total}}
               </div>

            </div>

            <div style="height: 30px"></div>



            <div style="display:flex">
               <v-spacer />
               <v-btn
                   v-if="showKeepShopping"
                   style="height: 40px; margin-right: 20px"  @click="$emit('keep-shopping')">
                     Keep Shopping
               </v-btn>

               <v-btn dark text class="ma-0 pa-0" style="height: 40px" @click="checkout" :disabled="cart_items.length===0">
                  <div style="background-color: var(--color-btn); height: 40px; display: flex; justify-content: center; align-items: center;"
                       :style="{width: $vuetify.breakpoint.width <500? '100px' : '250px' }"
                  >
                     Checkout</div>
                  <div class="btn-arrow-right"></div>
               </v-btn>
            </div>




         </div>
      </div>



   </div>
</template>

<script>

import data_getters from "@/mixins/data_getters";
// import DropDown from "@/components/inputs/StatusDropDown";
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe(process.env.VUE_APP_STRIPE_KEY);

import ItemBox from "@/views/shop/ItemBox";
import addKitToCart from "@/views/shop/addKitToCart";
import AddKitIndex from "@/views/shop/AddKitIndex";
import DonateModal from "@/views/shop/donate/DonateModal";

import _ from 'lodash';
import store from "@/mixins/store";

export default {
   name: "checkout",
   mixins: [data_getters, store],
   components: {ItemBox,addKitToCart, DonateModal},
   props:{
      showKeepShopping: {type:Boolean, default: false}
   },

   data() {
      return {

         sds_number: null,



         //for editing a cart item
         item_ix: null,
         edit_item_dog: null,
         show_add_kit: false,

         show_donate: false,
      }
   },

   computed:{
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
            if (this.$auth.authenticated){
               await this.make_request('/store/updateCartItems', {items});
            }

            this.$store.commit('set_cart_items', items);
         }catch (e) {

            console.log(e)
         }
      },


      async edit_item(ix){

         //get dog_id for item
         let dog_id = this.$store.state.cart.items[ix].details.dog_id;
         this.edit_item_dog = await this.make_request('/public/getDogProfile', {dog_id});

         this.item_ix = ix;
         this.show_add_kit = true;
      },

      checkout(){
         this.$store.commit('set_show_cart', false);
         this.show_donate = true;
        // this.$router.push('/checkout');
      },


      on_no_donate(){
         this.show_donate = false;
         this.$router.push('/checkout');
      },



      async on_donate(amount) {

         let item = {
            name: 'Donation',
            item_key: 'sds_donation',
            description: `Donation`,
            price: amount,
            number: 1,
            details: {},
         };

         this.show_donate = false;
         await this.add_item_to_cart(item, {path: '/checkout'});
      },




      // async on_donate(amount){
      //
      //    let item = {
      //       name: 'Donation',
      //       serial_key: 'donation',
      //       description: `Donation`,
      //       price: amount,
      //       number: 1,
      //       details: {
      //
      //       },
      //    };
      //
      //
      //    try{
      //
      //       console.log('debug')
      //
      //       let res;
      //
      //       //if user is logged in then save to db first
      //       if (this.$auth.authenticated){
      //          //if user is logged in then save changes both to db and locally
      //          let items  = _.cloneDeep( this.$store.state.cart.items)
      //          items.push(item);
      //          res = await this.make_request('/store/updateCartItems', {items});
      //       }
      //
      //
      //       if (res !== undefined){
      //          if (res.newCart){
      //             //copy new cart with _id property over
      //             this.$store.commit('set_cart', res.cart);
      //          }else{
      //             this.$store.commit('add_cart_item', item);
      //          }
      //       }
      //       else{
      //          this.$store.commit('add_cart_item', item);
      //       }
      //
      //       this.$emit('item-added');
      //
      //    }
      //    catch (e) {
      //
      //       console.log(e)
      //    }
      //
      //    this.show_donate = false;
      //    await this.$router.push('/checkout');
      //
      // }


   },

   async created(){
      if (this.$auth.isAuthenticated()){

         this.sds_number = this.$auth.profile.member_num;
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



</style>
