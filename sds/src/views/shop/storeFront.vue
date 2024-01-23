<template>
  <div
    class="content-container-bg"
    style="min-height: auto;"
  >
    <!--<v-dialog v-model="show_kit_detail" width="unset">-->
    <!--   <div>-->
    <!--      &lt;!&ndash;<img src="../../assets/images/products/features_card.png" style="height: 90vh; min-height: 1000px; display: block; max-width: 100vw">&ndash;&gt;-->
    <!--      <v-img-->
    <!--          src="../../assets/images/products/features_card.png"-->
    <!--          max-width="100vw"-->
    <!--          min-height="1000px"-->
    <!--          height="100vh"-->
    <!--          contain-->
    <!--      ></v-img>-->
    <!--   </div>-->

    <!--</v-dialog>-->



    <dialog-features-cert v-model="show_detail_cert" />
    <dialog-features-card v-model="show_detail_card" />
    <dialog-features-patch v-model="show_detail_patch" />
    <dialog-features-tag v-model="show_detail_tag" />
    <dialog-features-patch-three v-model="show_detail_3_patch_set" />









    <!-----------------SDS kit ----------------------------------------------------------------------------------------->



    <div
      class="centered-flex-column pa-5 white-bg"
      style="width: 100%; max-width: 900px; "
    >
      <div
        class="headline-txt"
        style=" text-align: center;"
      >
        Support Standards
      </div>
      <img
        src="../../assets/images/products/SDSProductPackage.png"
        style="max-width: 750px; width: 90%"
      >

      <div
        class="subheading-txt mb-8"
        style="margin-top: 0px; text-align: center;"
      >
        Complete Service Dog Standards Kit
      </div>

      <!--<v-row dense style="max-width: 450px">-->
      <!--   <v-col cols="6" class="image-container">-->
      <!--      <img src="../../assets/images/products/SDSCertificateFeatures/SDSPrintedSecurityFeatures.png"-->
      <!--           class="image-shield">-->
      <!--   </v-col>-->

      <!--   <v-col cols="6" class="image-container">-->
      <!--      <img src="../../assets/images/products/SDSCertificateFeatures/SDSServiceDogStandardsURL.png"-->
      <!--           class="image-shield">-->
      <!--   </v-col>-->



      <!--   <v-col cols="6" class="image-container">-->
      <!--      <img src="../../assets/images/products/SDSCertificateFeatures/SDSColorshiftingAccessIcons.png"-->
      <!--           class="image-shield">-->
      <!--   </v-col>-->

      <!--   <v-col cols="6" class="image-container">-->
      <!--      <img src="../../assets/images/products/SDSPatchFeatures/SDSMilitaryGradePatches.png"-->
      <!--           class="image-shield">-->
      <!--   </v-col>-->

      <!--   <v-col cols="6" class="image-container">-->
      <!--      <img src="../../assets/images/products/SDSPatchFeatures/SDSRuggedHeavyDuty.png"-->
      <!--           class="image-shield">-->
      <!--   </v-col>-->


      <!--   <v-col cols="6" class="image-container">-->
      <!--      <img src="../../assets/images/products/SDSCertificateFeatures/SDSHelpsSupportVoluntaryServiceDogStandards.png"-->
      <!--           class="image-shield">-->
      <!--   </v-col>-->

      <!--</v-row>-->


      <div style="display: flex; justify-content: center">
        <img
          src="../../assets/images/products/SDSMainPageFeatureShields.png"
          width="90%"
          style="max-width: 500px; align-self: flex-start;"
        >
      </div>


      <div class="kit-details-container mt-6">
        <div
          class="kit-detail"
          style="text-align: center"
        >
          Service Dog Standards Certificate
        </div>

        <v-btn
          x-small
          text
          class="view-btn"
          @click="show_detail_cert=true"
        >
          View Details <div class="triangle ml-2" />
        </v-btn>
      </div>

      <div class="kit-details-container mt-4">
        <div class="kit-detail">
          SDS Membership Cards
        </div>

        <v-btn
          x-small
          text
          class="view-btn"
          @click="show_detail_card=true"
        >
          View Details <div class="triangle ml-2" />
        </v-btn>
      </div>

      <!--<div class="kit-details-container mt-4" >-->
      <!--   <div class="kit-detail">-->
      <!--      SDS Rugged 3 Patch Set-->
      <!--   </div>-->

      <!--   <v-btn x-small  text class="view-btn" @click="show_detail_patch=true">-->
      <!--      View Details <div class="triangle ml-2"></div>-->
      <!--   </v-btn>-->
      <!--</div>-->



      <div class="kit-details-container mt-4">
        <div class="kit-detail">
          SDS Accepted Patch
        </div>

        <v-btn
          x-small
          text
          class="view-btn"
          @click="show_detail_patch=true"
        >
          View Details <div class="triangle ml-2" />
        </v-btn>
      </div>




      <div class="kit-details-container mt-4">
        <div class="kit-detail">
          SDS Stainless Steel Tag
        </div>

        <v-btn
          x-small
          text
          class="view-btn"
          @click="show_detail_tag=true"
        >
          View Details <div class="triangle ml-2" />
        </v-btn>
      </div>


      <div
        style="font-size: 20pt; font-weight: 500; text-align: center"
        class="mt-8"
      >
        ${{ fmt_number(item_kit.price, {places:2}) }}
      </div>
      <div style="color: #31b741; font-size: 12pt; font-weight: 500; text-align: center">
        Orders ship within 5-7 business days
      </div>

      <v-btn
        width="70%"
        height="40px"
        class="mt-5"
        @click="$emit('order-kit')"
      >
        Order Now
      </v-btn>

      <div style="height: 40px" />
    </div>



    <!-----------------patches kit ------------------------------------------------------------------------------------->

    <!--<template v-if="$auth.profile.user_id != undefined && $auth.profile.acct_active">-->
    <div style="height: 40px" />


    <div
      class="centered-flex-column pa-5 white-bg"
      style="width: 100%; max-width: 900px;"
    >
      <v-row dense>
        <v-col
          cols="12"
          sm="4"
        >
          <img
            src="../../assets/images/products/SDSPatch.png"
            style="max-width: 400px; width: 90%"
          >
        </v-col>

        <v-col
          cols="12"
          sm="8"
        >
          <div style="color: var(--color-headline); font-size: 14pt; font-weight: 600">
            <!--Service Dog Standards Rugged 3 Patch Set-->
            {{ item_sds_patch.name }}
          </div>

          <div>
            <!--Configure them as you need on any size vest.  Our rugged military-spec, micro injected soft PVC Patches-->
            <!--with 3D effect feature a simple and clear message.-->
            {{ item_sds_patch.description_full }}
          </div>
          <v-btn
            x-small
            text
            class="view-btn"
            @click="show_detail_patch=true"
          >
            View Details <div class="triangle ml-2" />
          </v-btn>

          <div style="display: flex;">
            <div
              style="font-size: 20pt; font-weight: 600"
              class="pt-4"
            >
              ${{ fmt_number(item_sds_patch.price, {places:2}) }}
            </div>
            <v-spacer />

            <my-form
              style="max-width: 100px"
              class="ml-3"
            >
              <my-text-input
                v-model="quantity_patch"
                label="Quantity"
                :rules="[isNumber]"
              />
            </my-form>
          </div>


          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-btn
              v-if="$auth.profile.user_id == undefined || $auth.profile.acct_active !== true"
              width="50%"
              min-width="150px"
              height="40px"
              class="mt-5 "
              @click="$emit('order-sds-patch')"
            >
              Order Now
            </v-btn>

            <v-btn
              v-else
              width="50%"
              min-width="150px"
              height="40px"
              class="mt-5 "
              @click="add_patches_cart(item_sds_patch, quantity_patch)"
            >
              Order Now
            </v-btn>
          </template>
        </v-col>



        <div
          v-if="$vuetify.breakpoint.smAndDown"
          style="display: flex; justify-content: center; width: 100%"
        >
          <v-btn
            v-if="$auth.profile.user_id == undefined || $auth.profile.acct_active !== true"
            width="50%"
            min-width="150px"
            height="40px"
            class="mt-5 "
            @click="$emit('order-sds-patch')"
          >
            Order Now
          </v-btn>
          <v-btn
            v-else
            width="50%"
            min-width="150px"
            height="40px"
            class="mt-5 "
            @click="add_patches_cart(item_sds_patch, quantity_patch)"
          >
            Order Now
          </v-btn>
        </div>
      </v-row>
    </div>
    <!--</template>-->





    <div style="height: 40px" />
    <div
      class="centered-flex-column pa-5 white-bg"
      style="width: 100%; max-width: 900px;"
    >
      <v-row dense>
        <v-col
          cols="12"
          sm="4"
        >
          <img
            src="../../assets/images/products/SDSPatchTilted.png"
            style="max-width: 400px; width: 90%"
          >
        </v-col>

        <v-col
          cols="12"
          sm="8"
        >
          <div style="color: var(--color-headline); font-size: 14pt; font-weight: 600">
            <!--Service Dog Standards Rugged 3 Patch Set-->
            {{ item_3_patches.name }}
          </div>

          <div>
            <!--Configure them as you need on any size vest.  Our rugged military-spec, micro injected soft PVC Patches-->
            <!--with 3D effect feature a simple and clear message.-->
            {{ item_3_patches.description_full }}
          </div>
          <v-btn
            x-small
            text
            class="view-btn"
            @click="show_detail_3_patch_set=true"
          >
            View Details <div class="triangle ml-2" />
          </v-btn>




          <div style="display: flex;">
            <div
              style="font-size: 20pt; font-weight: 600"
              class="pt-4"
            >
              ${{ fmt_number(item_3_patches.price, {places:2}) }}
            </div>

            <v-spacer />

            <my-form
              style="max-width: 100px"
              class="ml-3"
            >
              <my-text-input
                v-model="quantity_3_patches"
                label="Quantity"
                :rules="[isNumber]"
              />
            </my-form>
          </div>




          <v-btn
            v-if="$vuetify.breakpoint.mdAndUp"
            width="50%"
            min-width="150px"
            height="40px"
            class="mt-5 "
            @click="add_patches_cart(item_3_patches, quantity_3_patches)"
          >
            Order Now
          </v-btn>
        </v-col>

        <div
          v-if="$vuetify.breakpoint.smAndDown"
          style="display: flex; justify-content: center; width: 100%"
        >
          <v-btn
            width="50%"
            min-width="150px"
            height="40px"
            class="mt-5 "
            @click="add_patches_cart(item_3_patches, quantity_3_patches)"
          >
            Order Now
          </v-btn>
        </div>
      </v-row>
    </div>








    <!-----------------Donations ------------------------------------------------------------------------------------>
    <div style="height: 40px" />

    <donate-page horizontal />
  </div>
</template>

<script>
import dialogFeaturesCard from "@/views/shop/kit/dialogFeaturesCard";
import dialogFeaturesPatch from "@/views/shop/kit/dialogFeaturesSDSPatch";
import dialogFeaturesPatchThree from "@/views/shop/kit/dialogFeaturesPatch";
import dialogFeaturesTag from "@/views/shop/kit/dialogFeaturesTag";
import dialogFeaturesCert from "@/views/shop/kit/dialogFeaturesCert";
import DonatePage from "@/views/shop/donate/DonatePage";
import _ from "lodash";
import data_getters from "@/mixins/data_getters";
import utilities from "@/mixins/utilities";
import store from "@/mixins/store";
import validation from "@/mixins/validation";


export default {
  name: "StoreFront",
   components: {dialogFeaturesCert, dialogFeaturesCard,dialogFeaturesPatch, dialogFeaturesTag, dialogFeaturesPatchThree,
      DonatePage},
   mixins: [data_getters, utilities, store, validation],
   data(){
     return{
        show_detail_cert: false,
        show_detail_card: false,
        show_detail_patch: false,
        show_detail_3_patch_set: false,
        show_detail_tag: false,

        item_3_patches: {},
        item_sds_patch: {},
        item_kit:{},

        quantity_patch: "1",
        quantity_3_patches: "1",

     }
   },

   created(){
       this.make_request('/store/getItem', {item_key: 'sds_accepted_patch'})
          .then(data => {this.item_sds_patch = data});

      this.make_request('/store/getItem', {item_key: 'sds_3_patch_set'})
          .then(data => {this.item_3_patches = data});

      this.make_request('/store/getItem', {item_key: 'sds_full_kit'})
          .then(data => {this.item_kit = data});
   },

   methods:{
      async add_patches_cart(item, num){

         num = parseInt(num)
         try{
            let item2 = {
               name: item.name,
               item_key: item.item_key,
               description: item.description,
               price: item.price,
               number: num,
               details: {

               },
            };

            console.log({item2, item})

            await this.add_item_to_cart(item2);

         }catch (e) {
            console.error(e)
         }
      },





      // async add_patches_cart(){
      //
      //
      //
      //    try{
      //       let item = {
      //          name: 'SDS Three Patch Set',
      //          serial_key: 'sds_three_patch_set',
      //          description: `Service Dog Standards Rugged 3 Patch Set`,
      //          price: 10.00,
      //          number: 1,
      //          details: {
      //
      //          },
      //       };
      //       console.log({item})
      //
      //       //if user isn't logged in then don't try and save to db
      //       if (!this.$auth.authenticated){
      //          this.$store.commit('add_cart_item', item);
      //          this.$emit('item-added');
      //          await this.$router.push({path:'/cart'});
      //          return;
      //       }
      //
      //
      //       //if user is logged in then save changes both to db and locally
      //       let items  = _.cloneDeep( this.$store.state.cart.items)
      //
      //       items.push(item);
      //
      //       let res = await this.make_request('/store/updateCartItems', {items});
      //
      //       if (res.newCart){
      //          //copy new cart with _id property over
      //          this.$store.commit('set_cart', res.cart);
      //       }else{
      //          this.$store.commit('add_cart_item', item);
      //       }
      //
      //
      //       this.$emit('item-added');
      //       await this.$router.push({path:'/cart'});
      //
      //    }
      //    catch (e) {
      //
      //       console.log(e)
      //    }
      //
      // },
   }
}
</script>


<style scoped>
.triangle{
   --width: 5px;
   width: 0;
   height: 0;
   border-top: var(--width) solid transparent;
   border-bottom: var(--width) solid transparent;
   border-left: 7px solid #2d76ba;
}

.image-container{
   display: flex;
   justify-content: flex-start;
}
.image-shield{
   height: 27px;
   display: inline-block;
}

.kit-details-container{
   display: flex;
   flex-direction: column;
   align-items: center;
}
.kit-detail{
   font-size: 14pt;
   font-weight: 600;
   color: #5a5959;
}
.view-btn{
   color: #2d76ba;
   font-weight: 600;
   font-size: 11pt;
   padding: 5px !important;
}



</style>
