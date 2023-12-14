<template>
  <div>
    <div style="display:flex; justify-content: center">
      <a
        href="https://www.anythingpawsable.com"
        target="_blank"
      >
        <!--<img src="../assets/images/content/ap_logo_regular.png" style="max-width:400px; width:90%">-->

        <img
          src="../assets/images/content/SDSAnythingPawsableAsset12.png"
          style=" width:100%"
        >
      </a>
    </div>

    <div
      class="mt-5 mb-4"
      style="font-size: 15pt; font-weight: 400"
    >
      We're committed to educating Service Dog owners, working dog handlers and the public.  Learn more at our sister
      publication, Anything Pawsable.
    </div>


    <template v-if="articles.length>0">
      <v-row v-if="!ismobile">
        <v-col
          v-for="(item, ix) in articles"
          :key="'ap_article' + ix"
          cols="12"
          sm="4"
        >
          <!--         <v-img :src="item.image.SRC" width="100%"/>-->
          <a
            :href="item.link"
            target="_blank"
          >
            <v-img
              :src="item.image.SRC"
              width="100%"
              aspect-ratio="1.778"
            />
          </a>


          <div
            style="display: flex;  font-weight: 600; font-size: 10pt"
            class="pl-1 pr-1"
          >
            <div>{{ item.author }}</div>
            <v-spacer />
            <div>{{ fmt_date(item.date) }}</div>
          </div>


          <div style="margin-top: 50px; font-weight: 600">
            <a
              :href="item.link"
              target="_blank"
              style="text-decoration: none; color: inherit"
            >
              {{ item.title }}
            </a>
          </div>
          <div style="margin-top: 10px">
            {{ item.description }} ...
          </div>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          v-for="(item, ix) in articles"
          :key="'ap_article' + ix"
          cols="12"
          sm="4"
        >
          <!--         <v-img :src="item.image.SRC" width="100%"/>-->

          <div style="margin-top: 30px; margin-bottom: 10px; font-weight: 600">
            <a
              :href="item.link"
              target="_blank"
              style="text-decoration: none; color: inherit"
            >
              {{ item.title }}
            </a>
          </div>
          <a
            :href="item.link"
            target="_blank"
          >
            <v-img
              :src="item.image.SRC"
              width="100%"
              aspect-ratio="1.778"
            />
          </a>



          <div
            style="display: flex;  font-weight: 600; font-size: 10pt"
            class="pl-1 pr-1"
          >
            <div>{{ item.author }}</div>
            <v-spacer />
            <div>{{ fmt_date(item.date) }}</div>
          </div>



          <div style="margin-top: 10px">
            {{ item.description }} ...
          </div>
        </v-col>
      </v-row>
    </template>

    <div
      v-else
      style="display: flex; flex-display:column; align-items: center; justify-content: center; margin-top: 30px"
    >
      <v-progress-circular
        size="200"
        indeterminate
        color="var(--color-btn)"
      >
        Loading stories
      </v-progress-circular>
    </div>
  </div>
</template>

<script>

import axios from "axios";

import data_getters from "@/mixins/data_getters";
import utilities from "@/mixins/utilities"; //for encoding/decoding html strings


export default {
   name: "WpEmbed",
   mixins: [data_getters, utilities],
   data(){
      return {
         rss_obj: {},
         articles: [],

      }
   },

   computed:{
      ismobile(){
         return !this.$vuetify.breakpoint.mdAndUp
      },
   },

   created(){
      this.get_ap_data();
   },

   methods:{
      async get_ap_data(){

         try{
            this.articles = await this.make_request('/public/getAnythingPawsableContent');

         }catch (e) {
            console.log(e);
         }


         // let ap_data = await axios.get('https://www.anythingpawsable.com/feed');

         // let rss = ap_data.data;
         // let xml = await xmlParser.parseStringPromise(ap_data.data, {compact: true});
         //
         // let ans = xml.rss.channel.item[0]['content:encoded'];
         //
         // this.articles = xml.rss.channel.item.map(x => x['content:encoded']);
      }
   }
}
</script>

<style scoped>

</style>
