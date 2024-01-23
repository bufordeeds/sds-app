<template>
  <div>
    <div class="page-title">
      Shop & Support
    </div>


    <div class="container-genuine">
      <div
        class="content-container-sm"
        style="max-width: 850px; width: 100%"
      >
        <div
          style="font-size: 14pt; font-weight: 500; cursor: pointer; "
          @click="expand_genuine=!expand_genuine"
        >
          Genuine Service Dog Standards Materials only offered here
          <span
            class="triangle  ml-2"
            :style="{transform: expand_genuine? 'rotate(180deg)': ''}"
          />
        </div>

        <div
          v-if="expand_genuine"
          class="mt-3"
        >
          We rely on your support to partially offset the costs for programming and outreach efforts.
          Please do not purchase counterfeit materials offered on Amazon or other websites with copycat names or logos.
        </div>
      </div>
    </div>



    <div
      class="content-container-bg"
      style="padding-left: 0; padding-right: 0;"
    >
      <store-front
        v-if="verify === null"
        @order-kit="on_order_kit"
        @order-sds-patch="on_order_patch"
      />


      <template v-if="verify === 'sds_kit'">
        <store-get-sds-num
          v-if="page === 2"
          key="store-page1"
          @items-added="page=3"
          @dog-selected="page=3; dog=$event"
        />


        <template v-if="page === 3">
          <add-kit-to-cart

            v-if="dog != null"
            key="store-page2"
            :dog="dog"
            @item-added="item_added"
          />

          <div
            v-else
            style="margin-top: 30px; text-align: center; max-width: 500px"
          >
            <span style="font-size: 16pt; cont-weight: 500; color: var(--color-headline)">
              No team found.
            </span>
            <br> <br>
            Note, the team info may be set to be private.  If you are the handler, please log in and order
            from your Manage Service Dogs page.
          </div>
        </template>
      </template>





      <template v-if="verify === 'sds_patch'">
        <store-get-sds-num-patch
          v-if="page === 2"
          key="store-page1"
          @items-added="page=3"
          @dog-selected="page=3; dog=$event"
        />
      </template>
    </div>
  </div>
</template>

<script>

import storeFront from "@/views/shop/storeFront";
// import storePage1 from "@/views/shop/storeGetSDSNum";
import storeGetSdsNum from "@/views/shop/storeGetSDSNum";
import storeGetSdsNumPatch from "@/views/shop/storeGetSDSNumPatch";
import addKitToCart from "@/views/shop/addKitToCartSimple";

import data_getters from "@/mixins/data_getters";

export default {
   name: "Store",
   components: {addKitToCart, storeFront, storeGetSdsNum, storeGetSdsNumPatch, },
  mixins: [data_getters],

   data(){
      return {
         page: 1,
         verify: null,
         dog: null,


         expand_genuine: true,
      }
   },
   computed: {
      num_cart_items(){
         let ans = this.$store.state.cart.length;
         if (ans > 0)
            return ans;
         else
            return '0'
      },

      cart_items(){
         return this.$store.state.cart;
      }
   },

   watch:{
     page(){

     }
   },

  created(){

     // this.update_cart();
     let page = 1;
     if (this.$route.query.page){
        page = this.$route.query.page;
     }
     this.page = Number(page);



     if (this.$route.query.verify){
        this.verify = this.$route.query.verify;
     }
     this.$store.commit("set_show_side_nav", false);
  },

  methods:{

     on_order_patch(){
        this.page = 2;
        this.$router.push({path:'/store', query:{page: this.page, verify: 'sds_patch'}})
     },


      on_order_kit(){
         this.page = 2;
         // this.$router.push({path:'/store', query:{page: this.page}})
         this.$router.push({path:'/store', query:{page: this.page, verify: 'sds_kit'}})
      },

      item_added(){
         this.$router.push('/cart');
      }

    // /**
    //  *
    //  * Get cart from database and update store
    //  */
    // async update_cart(){
    //   let cart = await this.make_request('/store/getActiveCart');
    //
    //   if (cart != null){
    //     this.$store.commit('set_cart_items', cart.items);
    //
    //   }
    //
    //
    //
    // }
  }

}
</script>

<style scoped>
.triangle{
    --width: 7px;
    width: 0;
    height: 0;
    border-left: var(--width) solid transparent;
    border-right: var(--width) solid transparent;
    border-top: 12px solid white;
    display: inline-block;
    /*margin-top: 20px;*/


}

.container-genuine{
    background-color: #5bade1;
    padding: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    color: white;
}
</style>

