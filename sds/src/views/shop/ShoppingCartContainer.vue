<template>
<div>
  <div class="page-title" >
    Your Shopping Cart
  </div>
  <shopping-cart
      show-keep-shopping
      @keep-shopping="on_shopping"
  />
</div>
</template>

<script>
import ShoppingCart from "@/views/shop/ShoppingCart";
export default {
  name: "ShoppingCartContainer",
  components: {ShoppingCart},

   methods:{
     on_shopping(){
        this.$router.push('/store')
     }
   },

  async created(){

    this.$store.commit("set_show_side_nav", false);

  }
}
</script>

<style scoped>

</style>