import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    use_default_nav: true,
    show_side_nav: false,

    //for shopping cart
    cart: {
      items: []
    },

    cart_user: {},
    show_cart: false,

    seeDevSite: false,



  },
  mutations: {

    set_seeDev(state, data){
      state.seeDevSite = data
    },


    set_default_nav(state, data){
      state.use_default_nav = data;
    },
    set_show_side_nav(state, data){
      state.show_side_nav = data;
    },


    //*********** for cart******************

    set_cart(state, data){
      state.cart = data;
    },

    clear_cart(state){
      state.cart = {
        items: []
      }
    },

    add_cart_item(state, data){
      state.cart.items.push(data);
    },

    set_cart_items(state, data){
      state.cart.items = data;
    },

    set_cart_item(state, data){

      state.cart.items[data.ix] = data.item;
    },

    remove_cart_item(state, ix){
      state.cart.items.splice(ix, 1);
    },

    //
    // update_cart_user(state, data){
    //   state.cart_user = data;
    // },

    set_show_cart(state, value){
      state.show_cart = value;
    },


  },

  getters:{


    // //*******for cart**************
    // cart_items(state){
    //   return state.cart.items;
    // }
  },

  actions: {
  },
  modules: {
  }
})
