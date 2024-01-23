<template>
  <div>
    <div
      style="background-color: white; display: flex;"
      class="pa-2 "
    >
      <div>
        <img
          :src="item_image"
          :style="{width: $vuetify.breakpoint.xs? '50px' : '200px',}"
        >
      </div>

      <div
        class="ml-4 "
        style="display: flex; flex-direction: column"
      >
        <div>
          <div
            style="font-weight: 500;  color: var(--color-subheading)"
            :style="{'font-size':$vuetify.breakpoint.width<600? '12pt' : '14pt' }"
          >
            {{ item.description }}
          </div>
          <div v-html="item_subtext" />
        </div>


        <div
          v-if="showActions"
          style="color: var(--color-subheading); margin-top: 5px; font-weight: 600; font-size: 8pt"
        >
          <!--<v-btn-->
          <!--    v-if="showEditItem"-->
          <!--    text x-small-->
          <!--    @click="$emit('edit-item')"-->
          <!--&gt;-->
          <!--<span style="color: var(&#45;&#45;color-subheading); font-weight: 600; font-size: 8pt">-->
          <!--   View/Edit-->
          <!--</span>-->
          <!--</v-btn>-->

          <v-btn
            text
            x-small
            @click="$emit('remove-item')"
          >
            <span style="color: red; font-weight: 600; font-size: 8pt">
              Remove
            </span>
          </v-btn>
        </div>
      </div>

      <v-spacer />
      <div
        class="ml-5 mr-3 "
        style="font-weight: 600; text-align: center"
      >
        ${{ item.price }}
        <div
          v-if="item.item_key !== 'sds_donation'"
          class="mt-2"
          style="font-weight: 400"
        >
          Qty {{ item.number }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import data_getters from "@/mixins/data_getters";

export default {
   name: "ItemBox",
   mixins:[data_getters],
   props: {
      item: Object,
      showActions: {type:Boolean, default: true},
   },

   data(){
      return {
         store_item: {images:[]}
      }
   },


   computed:{

      showEditItem(){

         return this.item.item_key === 'sds_full_kit';
      },

      // item_subtext(){
      //    let ans;
      //    if (this.item.item_key === 'sds_full_kit'){
      //       ans = `Service Dog: <span class="data-label"> ${this.item.details.dog_name} </span><br>
      //             SDS Num: <span class="data-label">  ${this.item.details.dog_num} </span>`
      //    }
      //    else if (this.item.item_key === 'sds_3_patch_set'){
      //       ans = `Rugged military-spec, micro injected soft PVC Patches with 3D effect feature a simple and clear message.`;
      //    }
      //    else if (this.item.item_key === 'sds_donation'){
      //       ans = `We greatly appreciate your donation to support Service Dog Standards!`;
      //    }
      //
      //    if (this.$vuetify.breakpoint.xs){
      //       ans = '';
      //    }
      //
      //    return ans;
      //
      // },
      //
      // item_image(){
      //    let ans;
      //    if (this.item.item_key === 'SDS Registration Kit'){
      //       ans = require("../../assets/images/products/SDSProductPackage.png");
      //    }
      //    else if (this.item.item_key === 'SDS Three Patch Set'){
      //       ans = require("../../assets/images/products/SDSPatchTilted.png");
      //    }
      //    else if (this.item.item_key === 'Donation'){
      //       ans = require("../../assets/images/icons/donate_heart.png");
      //    }
      //
      //    return ans;
      //
      // }



      item_subtext(){
         let ans;

         ans = this.store_item.description_full;

         if (this.store_item.item_key === 'sds_donation')
            ans = `We greatly appreciate your donation to support Service Dog Standards!`;

         if (this.$vuetify.breakpoint.xs){
            ans = '';
         }

         return ans;

      },

      item_image(){
         let ans = '/products/'+this.store_item.images[0];


         return ans;

      }

   },

   async created(){
      console.log({item: this.item})
      this.store_item = await this.make_request('/store/getItem', {item_key: this.item.item_key});
   }

}
</script>

<style scoped>

</style>