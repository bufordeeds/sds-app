<template>
  <div style="width: 100%; background-color: white">
    <v-dialog v-model="show_image">
      <v-card>
        <image-viewer
          :images="images"
          :cur_ix="cur_ix"
          @close="show_image=false"
          @image-deleted="get_images"
        />
      </v-card>
    </v-dialog>


    <div
      v-if="edit_mode ||images.length>0"
      class=""
      style="width: 100%"
      :style="padding"
    >
      <div
        v-if="images.length === 0"
        class="pa-3"
      >
        No images. Add some to show your style.
      </div>

      <div v-else>
        <img
          :src="images[0].image_data.Location"
          width="100%"
          style="cursor: pointer; display: inline-block"
          @click="show_image=true; cur_ix=ix"
        >

        <div
          class="pa-4"
          style="font-weight: 500; color: gray;"
        >
          {{ caption }}
        </div>

        <div style="display: flex; margin-top: -10px">
          <v-spacer />
          <v-btn
            text
            color="var(--color-btn)"
            @click="show_image=true"
          >
            <v-icon
              small
              style="margin-top:5px; margin-right: 4px;"
            >
              collections
            </v-icon>
            Gallery
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import ImageViewer from "@/components/images/ImageViewer";

export default {
   name: "Gallery",
   components: {ImageViewer},
   mixins: [data_getters],

   props:{
     user_id: String,
      edit_mode: Boolean,
      caption: String,
   },
   data(){
      return {
         images: [],
         show_image: false,
         cur_ix: 0,
      }
   },
   computed:{
     padding(){
        if (this.edit_mode ){
           return 'padding-bottom: 30px;';
        }
        return '';
     },
      short_image_list(){
        if (this.images.length > 9){
           return this.images.slice(0,9);
        }
        else{
           return this.images;
        }
      }
   },

   watch: {
      user_id(){
        console.log('got images')
         this.get_images();
      }
   },
   created(){
      this.get_images();
   },
   methods: {
      async get_images(){
         try{
            if (this.user_id == null){
               return;
            }

            let payload = {user_id: this.user_id};
            console.log('payload', payload)
            this.images = await this.make_request('/public/getUserImages', payload);
         }
         catch (e) {
            throw e;
         }

      }
   }

}
</script>

<style scoped>

.container{
   background-color: white;
   width: 100%;

}


.section-header{
   display: flex;
   font-size: 14pt;
   font-weight: 600;
   padding-bottom: 10px;
}
</style>
