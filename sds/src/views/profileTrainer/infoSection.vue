<template>
  <div :class="class_container">
    <!--mobile version-->
    <div
      v-if="$vuetify.breakpoint.width<500"
      :class="class_icon_container "
      :style="icon_bg"
    >
      <img
        :src="iconUrl"
        height="50%"
      >
      <div style="text-align: center; padding-left: 10px">
        {{ label }}
      </div>
    </div>

    <!--Full screen version-->
    <div
      v-else
      :class="class_icon_container "
      :style="icon_bg"
    >
      <img
        :src="iconUrl"
        width="50%"
      >
      <div style="text-align: center; ">
        {{ label }}
      </div>
    </div>




    <div
      class="info-box-container"
      style="overflow-x: auto"
    >
      <slot name="content" />


      <div v-if="items != null">
        <div
          v-for="(item, ix) in items"
          :key="'services-'+ix"
          class="line-item"
        >
          <template v-if="item != null">
            <span v-if="typeof item === 'string'">
              {{ item }}
            </span>
            <div v-else>
              <span style=" padding-right: 5px;">
                {{ item.network }}:</span>
              <a
                :href="cleaned_url(item.url)"
                style="font-size: 10pt; text-decoration: none;"
              >{{ shorten(item.url) }}</a>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   name: "Section",
   props:{
      user: Object,
      color: String,
      items: {type: Array, default: null},
      iconUrl: {type: String},
      label: String,
   },
   computed:{

      class_icon_container(){
         if (this.$vuetify.breakpoint.width<500){
          return 'icon-container-mobile';
         }
         return 'icon-container';

      },


      class_container(){
         if (this.$vuetify.breakpoint.width<500){
            return 'my-container-mobile';
         }
         return 'my-container';

      },

      icon_bg(){

         let ans = '';
         if (this.color !== undefined){
            ans += `background-color: ${this.color};`
         }
         else{
            ans += `background-color: grey;`
         }


         // if (this.$vuetify.breakpoint.mdAndDown){
         //    ans +=  "flex: 0 0 50px; font-size: 8pt"
         // }

         return ans;
      }


   },

   methods:{

      //returns a cleaned version of trainer_info.website
      cleaned_url(url){
         // let ans = this.user.trainer_info.website;

         let ans = url;
         if (typeof ans === 'string'){
            ans = ans.toLowerCase();
            if (!ans.includes('http://') && !ans.includes('https://')){
               ans = 'http://' + ans
            }
         }
         return ans;
      },

      shorten(txt){
         if (txt == null){
            return ''
         }


         let n = 40;

         if (this.$vuetify.breakpoint.xs){
            n = 20;
         }

         if (txt.length > n){
            return txt.slice(0, n) + '...';
         }

         return txt;
      }
   }


}
</script>

<style scoped>
   .my-container{
      display: flex;
      background-color: white;
      width: 100%;
   }

   .icon-container{
      /*width: 200px;*/
      flex: 0 0 100px; /* note width doesn't work on flex boxes, need to use this instead */
      min-height: 100px;
      /*background-color: #8dc63f;*/
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 500;
      font-size: 10pt;

   }


   .info-box-container{
      padding: 20px 15px 20px 15px;
      font-size: 11pt;
      width: 100%;
   }


   .line-item{
      font-size: 12pt;
      /*font-weight: 500;*/
      border-bottom: solid 1px #bfbfbf;
      margin-bottom: 10px;
      /*   margin-left: 10px;*/
      /*   margin-right: 10px;*/
   }





   /*mobile version*/

   .my-container-mobile{
      display: flex;
      flex-direction: column;
      background-color: white;
      width: 100%;
   }

   .icon-container-mobile{
      /*width: 200px;*/

      height: 50px;
      /*background-color: #8dc63f;*/
      display: flex;
      /*flex-direction: column;*/
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: 500;
      font-size: 12pt;

   }

</style>
