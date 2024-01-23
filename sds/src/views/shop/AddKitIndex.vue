<template>
  <div>
    <div style="display: flex; justify-content: flex-end">
      <v-btn
        icon
        style="border-radius: 50%"
        @click="$emit('close')"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </div>



    <reorder-kit
      v-if="reorder"
      :dog="dog"
      @item-added="add_item"
    />

    <template v-else>
      <add-kit-to-cart-simple
        v-if="simple"
        :dog="dog"
        @item-added="add_item"
      />

      <add-kit-to-cart
        v-else
        :dog="dog"
        @item-added="add_item"
      />
    </template>




    <!--   <div v-if="page===2">-->
    <!--      <shopping-cart />-->
    <!--   </div>-->
  </div>
</template>

<script>
import addKitToCart from "@/views/shop/addKitToCart";
import addKitToCartSimple from "@/views/shop/addKitToCartSimple";
import reorderKit from "@/views/shop/addKitToCartReorder";

// import shoppingCart from "@/views/shop/ShoppingCart";

export default {
   name: "AddKitIndex",
   components: {addKitToCart, addKitToCartSimple, reorderKit},
   props:{
      dog: Object,

      reorder: {type: Boolean, default: false},
      simple: {type: Boolean, default: true},
   },
   data(){
      return {
         page: 1,
      }
   },

   methods:{
      add_item(){
         this.$emit('close');
         this.$store.commit('set_show_cart', true);
      }
   },

}
</script>

<style scoped>

</style>