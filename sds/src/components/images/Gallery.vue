<template>
  <div style="width: 100%">
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
      class="container"
      style="width: 100%"
      :style="padding"
    >
      <div class="section-header">
        My gallery
        <v-spacer />
        <!--            <v-btn text color="var(&#45;&#45;color-btn)">See All</v-btn>-->
      </div>

      <div v-if="images.length === 0">
        No images. Add some to show your style.
      </div>

      <div v-else>
        <div style="max-height: 450px; overflow-y: auto; ">
          <v-row
            dense
            class="ma-0"
          >
            <v-col
              v-for="(image, ix) in images"
              :key="image.image_data.Key"
              class="d-flex child-flex"
              cols="4"
            >
              <v-img
                :src="image.image_data.Location"
                aspect-ratio="1"
                class="grey lighten-2"
                style="cursor: pointer"
                @click="show_image=true; cur_ix=ix"
              >
                <template #placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    />
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>
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
