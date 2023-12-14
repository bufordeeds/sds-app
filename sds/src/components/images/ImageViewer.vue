<template>
  <div style="width: 100%; background-color: var(--color-bg)">
    <confirm-dialog
      v-model="show_delete_confirm"
      @confirm="delete_image"
    >
      Are you sure you want to delete this image?  This action cannot be reversed.
    </confirm-dialog>









    <div style="display: flex; justify-content: flex-end">
      <v-btn
        icon
        large
        @click="$emit('close')"
      >
        <v-icon>close</v-icon>
      </v-btn>
    </div>



    <v-carousel
      v-model="ix"
      hide-delimiters
      height="60vh"
      style="background-color: white; margin-bottom: 10px"
    >
      <div
        v-if="edit_mode"
        class="more-menu"
      >
        <v-btn
          icon
          large
          color="red"
          @click="show_delete_confirm=true"
        >
          <v-icon>delete</v-icon>
        </v-btn>
      </div>


      <v-carousel-item
        v-for="(item,i) in images"
        :key="i"
      >
        <div class="carousel-container">
          <img
            :src="item.image_data.Location"
            style="max-height: 100%; max-width: 100%"
          >
        </div>
      </v-carousel-item>
    </v-carousel>

    <v-row>
      <v-row
        dense
        style="width: 100%; "
        justify="center"
        class="pt-1 pb-1 mb-4"
      >
        <v-col
          v-for="(image, i) in short_image_list"
          :key="image.image_data.Key"
          cols="1"
          :style="highlighted(i+low)"
        >
          <v-img
            :src="image.image_data.Location"
            :lazy-src="image.image_data.Location"
            aspect-ratio="1"
            class="grey lighten-2"
            style="cursor: pointer"
            @click="show_image=true; ix=i+low"
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
    </v-row>
  </div>
</template>

<script>
import data_getters from "@/mixins/data_getters";
import ConfirmDialog from "@/components/app/ConfirmDialog";
export default {
   name: "ImageViewer",
   components: {ConfirmDialog},
   mixins: [data_getters],
   props:{
      images: Array,
      cur_ix: {type: Number, default: 0},

   },
   data(){
      return {
         ix: this.cur_ix,


         show_delete_confirm: false,
         low: 0,
         high: this.images.length,

         short_image_list:[],


      }
   },
   computed:{
      edit_mode(){

         if (this.images.length === 0 || this.ix < 0 ){
            return false;
         }

         if (!this.$auth.isAuthenticated()){
            return false;
         }

         return this.$auth.profile.user_id === this.images[this.ix].user_id;


      },


     // short_image_list(){
     //
     //     let n= this.images.length;
     //    if (n > 11){
     //       let ix = this.ix;
     //       let low = ix - 5;// Math.min(ix-5, 0);
     //       let high = ix + 5;// Math.max(ix+5, this.images.length);
     //
     //       if (ix - 5 < 0){
     //          low = 0;
     //          high = Math.max(12, ix+5)
     //       }
     //
     //       if (ix + 5 >= n){
     //          high = n;
     //          low = Math.min(0, ix-5)
     //       }
     //
     //       return this.images.slice(low, high);
     //    }
     //    else{
     //       return this.images;
     //    }
     // }
   },

   watch:{
      cur_ix(newVal){
         this.ix = newVal;
      },


      ix(newVal){

         this.update_ix(newVal);
      },

      images(){
         this.update_ix();

      }


   },

   created(){
      this.update_ix(this.cur_ix);
   },

   methods:{

      update_ix(ix){

         if (ix === undefined){
            ix = this.ix;
         }
         let n = this.images.length;

         let low = ix - 5 ;// Math.min(ix-5, 0);
         let high = ix + 5+1;// Math.max(ix+5, this.images.length);

         if (ix - 5 < 0){
            low = 0;
            high = Math.min(Math.max(11, ix+5+1), n);
         }

         if (ix + 5 >= n){
            high = n;
            low =  Math.max(Math.min(n-11, ix - 5 ), 0);
         }

         console.log(ix, low, high)
         this.low = low;
         this.high = high;
         this.short_image_list = this.images.slice(low, high);

      },


     highlighted(ix){
        if (ix === this.ix){
           return 'border: solid 2px var(--color-primary)'
        }
        return ''
     },

      async delete_image(){
        try{
           await this.make_request('/private/deleteGalleryImage', {image_id: this.images[this.ix]._id});

           if (this.ix === this.images.length-1){
              this.ix -= 1;
           }
           this.$emit('image-deleted');
        }catch (e) {
           throw e;
        }
      }
   }


}
</script>

<style scoped>
.carousel-container{
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 100%;
}

.more-menu{
   display: flex;
   justify-content: flex-end;
   /*margin-bottom: -40px;*/
   margin-top: 10px;
   position: absolute;
   width: 100%;
   z-index: 100;
}
</style>
