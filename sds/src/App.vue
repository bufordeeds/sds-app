<template>
   <div>
      <div  v-if="!showSite" style="display: flex; justify-content: center; align-items: center; flex-direction: column">
         Site under construction.  Please enter code to see testing site
         <my-form style="max-width: 400px; display: flex">
            <my-text-input
                label="Code"
                v-model="dev_code"
                @keyup-enter="enter_dev_site"
            />
            <v-btn @click="enter_dev_site" style="margin-top: 17px; margin-left: 10px">
               Enter
            </v-btn>
         </my-form>
      </div>


      <template v-if="showSite">
         <v-app id="app" >

            <v-dialog v-model="show_cart" >
               <div style="background-color: var(--color-bg); width: 100%; position:relative;" class="pb-1 pt-1">
                  <div style="display: flex; justify-content: flex-end; position: absolute; width: 100%" class="pr-2">
                     <v-spacer/>
                     <v-btn icon @click="show_cart=false">
                        <v-icon>close</v-icon>
                     </v-btn>

                  </div>

                  <shopping-cart show-keep-shopping @keep-shopping="show_cart=false"/>
               </div>
            </v-dialog>


            <div v-if="show_nav" :style="{'background-image': `url(${require('./assets/images/content/header-background.jpg')})`}"
                 style="background-size: cover;background-position: center;"
            >
               <div style="background-color: rgba(0,0,0,0.4);">
                  <nav-bar style="max-width: 1280px; margin-left: auto; margin-right:auto" ></nav-bar>
               </div>
            </div>




            <v-main  >
               <side-nav v-if="show_drawer"></side-nav>
               <div :style="router_style" >
                  <router-view :key="$route.fullPath"></router-view>
               </div>

            </v-main>





            <!-------------------- footer --------------------------------------------------------------------------------->
            <v-footer
                style="background-color: #363437; color: white; font-size: 10pt; font-weight: lighter; padding: 0; width: 100%"
            >
               <div style="display: flex; justify-content: flex-start; width: 100%">

               </div>

               <div style="display: flex; justify-content: center; width: 100%">
                  <div style="max-width: 1280px" class="pt-7 pl-5 pr-5">
                     <div style="display: flex; flex-wrap: wrap;">
                        <div style="width: 100%; margin-top: -10px; margin-bottom: 10px;">
                           <!--<img src="./assets/images/logo/SDSLogoforFooter.svg" style="max-width: 350px">-->
                           <img src="./assets/images/content/ServiceDogStandardsFooterAsset25.svg" style="max-width: 350px">
                        </div>


                        <div style="">

                           ©{{cur_year}} Service Dog Standards. All Rights Reserved.
                        </div>
                        <v-spacer></v-spacer>
                        <div style="display: flex; flex-wrap: wrap">
                           <a href="/privacy" class="footer-links" style="margin-left:0">
                              Privacy and Cookie Policy
                           </a>
                           <span class="foot-link-divider">|</span>
                           <a href="/terms-and-conditions" class="footer-links">
                              Terms of Service
                           </a>
                           <span class="foot-link-divider">|</span>

                           <a href="/terms-access-use" class="footer-links">
                              Terms of Access and Use
                           </a>
                           <span class="foot-link-divider">|</span>
                           <a href="/contact-us" class="footer-links">
                              Contact Us
                           </a>

                        </div>
                     </div>
                     <div class="pt-9 pb-9">
                        Service Dog Standards, this website and our materials are provided as a benefit to the
                        Assistance and Service Dog community as a whole. We are built on the trust and good-will of
                        our members and the animals that serve them. We are not a certification process or substitute
                        for training. Service Dog Standards can not and will not be held responsible or liable for the
                        actions of individual owners or their dogs in any way, shape or form. All member data is
                        provided at the assertion of the animal owner. We are an educational tool for the public and
                        Service and Assistance Dog trainers and owners. Misrepresenting an animal as a Service or
                        Assistance Animal for any reason in any way is a crime. All members are subject to our
                        Terms and Conditions.
                     </div>
                  </div>
               </div>

            </v-footer>


         </v-app>
      </template>


   </div>

</template>






<script>

// import _ from 'lodash';
import NavBar from '@/components/app/NavBar.vue'
import SideNav from '@/components/app/SideNav'
import helpers from "@/utilities/helpers";
import data_getters from "@/mixins/data_getters";


import ShoppingCart from "@/views/shop/ShoppingCart";
import router from "@/router";

export default {
   name: 'App',
   mixins: [data_getters],
   components: {NavBar,SideNav, ShoppingCart},
   data: () => ({
      dev_code: null,
   }),


   computed:{

      //controls site render while we're still in dev mode
      showSite(){


         return true;

         // if (process.env.VUE_APP_node_env === 'dev'){
         //    return true;
         // }
         //
         // return (this.$store.state.seeDevSite || this.$auth.authenticated);

      },

      //copyright year
      cur_year(){
         let date = new Date();
         return date.getFullYear();
      },
      show_cart: {

         get(){
            return this.$store.state.show_cart;
         },

         set(value){
            this.$store.commit('set_show_cart', value);
         }

      },

      router_style(){
         // if (this.$store.state.show_side_nav){
         if (this.show_drawer ){
            // return 'padding-left: 256px';
           return 'padding-left: 300px';
         }
         else{
            return '';
         }

      },
      show_drawer(){
         // if (this.$vuetify.breakpoint.mobile){
         //    return false;
         // }


         //align this with hamburger menu for top nav
         if (this.$vuetify.breakpoint.width < 1200){
            return false;
         }

         return this.$store.state.show_side_nav;
      },

     show_nav(){
        return this.$store.state.use_default_nav;
     }
   },

   methods: {

      enter_dev_site(){
         if (this.dev_code === 'SdsUnderDev#1'){
            this.$store.commit('set_seeDev', true);
         }
      },

      async get_cart_from_db(){
         try{
            let cart = await this.make_request('/store/getActiveCart');

            if (cart != null){
               this.$store.commit('set_cart', cart);
               console.log('i ran')
            }
         }catch (e) {
            console.error(e);
         }
      },



   }, //methods


   async mounted(){
      console.log('breakpoint', this.$vuetify.breakpoint);
      // this.get_cart_from_db().then(()=>{}).catch(err =>{
      //    console.log(err);
      // });


      await this.get_cart_from_db();

      // this.$auth.$on('logged-in', ()=> {
      //    console.log('debug')
      //    try{
      //
      //       let url = '/';
      //       if (this.$auth.requested_url !== null && this.$auth.requested_url !== '/login'){
      //          url = this.$auth.requested_url
      //       }
      //
      //       this.$router.push({path: url});
      //
      //    }catch (e) {
      //       console.log(e)
      //    }
      //
      //
      // });


      this.$auth.$on('logged-out', ()=> {

         if (this.$route.path !== '/'){
            this.$router.push({path: '/'});
         }

         this.get_cart_from_db();

      });


      this.$auth.$on('logged-in', ()=> {
         this.get_cart_from_db();

      });

   },

   async created(){

   }

};
</script>



<style scoped lang="scss">
@import 'assets/styles/variables';

#app{
   /*background: none;*/
   //background: linear-gradient(180deg, rgb(6, 6, 6) 0%, rgb(28, 28, 28) 40%, rgb(6, 6, 6) 100%);
}


#main-container{
   /*background: none;*/
   margin: 10px;
   max-width: 1200px;
   /*background-color: rgba(255, 60, 63, 0.35);*/
}


#main-background-gradient{
   position: fixed;
   height: 100%;
   /*min-height: 1000px;*/
   width: 100%;
   margin: 0;

   //color: $color-white;
   //background: $color-app-background;
   z-index: -1;
   /*opacity: 0.5;*/

}

.footer{
   text-align: center;
   width:100%;
}

a.footer-links{
   text-decoration: none;
   color: white;
   //margin-left: 10px;
   //margin-right: 10px;
  white-space: nowrap;
}

.foot-link-divider{
  padding-left: 5px;
  padding-right: 5px;
}

</style>






<style src="./views/common.css"></style>



