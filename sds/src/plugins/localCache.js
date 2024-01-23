// import localCache from '../services/localCache';

import Vue from "vue";
import Dexie from "dexie";
// import axios from 'axios';


import data_getters from '../mixins/data_getters'


function gen_LocalCache(){
   return new Vue({
      mixins: [data_getters],
      data(){
         return {
            db: null,

         }
      },//methods




      created(){
         this.db = new Dexie('car-app');
         this.db.version(1).stores({
            savedVehicles: '++id, [year+make+model], dateAdded',
         });
      },

      methods:{






         async save_vehicle({year, make, model, trims}={}){
         // async save_vehicle(vehicle){

            if (year == undefined || make == undefined || model== undefined){
               throw Error(`year, make, and model must be defined.  year="${year}", make="${make}", model="${model}"`);
            }

            let data;


            let trims_show = {};

            for (let trim of trims){
               trims_show[trim.trim] = true;
            }


            let now = new Date().toISOString();
            data  = {
               year, make, model,
               name_q: this.get_vehicle_name_q({year, make, model}), //used by the findVehicle component to check if a vehicle has already been saved
               dateAdded: now,
               trims_show, //initialize this to be initially empty object
            };



            let q = {year, make, model};
            // if (trim !=null) q.trim = trim;

            let res = await this.db.savedVehicles.where(q).toArray();
            if (res.length > 0){
               throw Error(`Record already exists in db.  query=${JSON.stringify(q)}`)
            }
            else{
               //return promise
               return this.db.savedVehicles.add(data);
            }
         },


         async delete_vehicle({year, make, model, trim=null}={}){

            let q = {year, make, model};
            if (trim !=null) q.trim = trim;

            return await this.db.savedVehicles.where(q).delete();
            // return await this.db.savedVehicles.delete(id);
         },




         async get_saved_vehicles(){
            return await this.db.savedVehicles.toArray();

         },




         // async deleteFinished(){
         //   await this.db.cachedCallData.where({'status':'Finished'}).delete();
         // },
         //
         // async setRecordStatus(id, status){
         //    let rec = await this.db.cachedCallData.get(id);
         //    rec.status = status;
         //    await this.db.cachedCallData.put(rec);
         // },






      }
   });
}









export default {
   install(Vue) {
      Vue.prototype.$localCache = gen_LocalCache();
   }
};

