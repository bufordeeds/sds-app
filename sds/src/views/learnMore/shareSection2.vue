<template>
   <div style="width: 100%; display: flex; justify-content: center" class="pb-4">
      <div id="my-inline-buttons" ></div>
   </div>

</template>

<script>
export default {
   name: "Sharethis",
   data(){
      return{
      }
   },
   props: {
      shareThisElementId: {
         type: String,
         default: "st-2"
      },
      // shareThisEmbedUrl: {
      //    type: String,
      //    required: true
      // },
      url: {
         type: String,
         default: window.location.href
      }
   },
   beforeDestroy() {

   },
   mounted() {
      //https://sharethis.com/support/guides/reinitialize-sharethis-buttons-specific-sharing-parameters/
      window.__sharethis__.load('inline-share-buttons', {
         alignment: 'left',
         id: 'my-inline-buttons',
         enabled: true,
         size: 32,
         labels: 'cta',
         networks: ['facebook', 'twitter', 'email', 'pinterest', 'sharethis', 'sms', ],
      });
   }
};
</script>

<style>

   #my-inline-buttons{
       z-index: 5 !important;  /*default z-index is set too high and shows on top of other elements like menus*/
   }
</style>
