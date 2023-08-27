<template>
   <div>
      <!----------------dialog to edit details------------------------->
      <v-dialog v-model="show_edit_info" max-width="700px">
         <v-card>
            <my-form >
               <v-container>
                  <div style="font-weight: 600; font-size: 14pt">
                     Edit Order Details
                  </div>
                  <v-row>
                     <v-col>
                        <my-text-input
                            label="Dog"
                            v-model="edit_item.details.dog_name"

                        ></my-text-input>
                     </v-col>

                     <v-col>
                        <my-text-input
                            label="Handler's Name"
                            v-model="edit_item.details.handler_name"
                        ></my-text-input>
                     </v-col>

                  </v-row>

                  <v-row>

                     <v-col>
                        <my-text-input
                            label="Trainer"
                            v-model="edit_item.details.trainer_name"
                        ></my-text-input>
                     </v-col>

                     <v-col>
                        <my-text-input
                            label="Aide"
                            v-model="edit_item.details.aide_name"

                        ></my-text-input>
                     </v-col>


                  </v-row>


                  <v-row class="mt-6">
                     <v-spacer></v-spacer>
                     <v-btn @click="show_edit_info=false">
                        Cancel
                     </v-btn>
                     <v-btn color="var(--color-btn)" class="white--text ml-2 mr-3"
                            @click="save_edits"
                     >
                        Save
                     </v-btn>
                  </v-row>
               </v-container>

            </my-form>
         </v-card>
      </v-dialog>







      <upload-user-image
          v-if="show_upload_image"
          :show.sync="show_upload_image"
          file-type="profile"
          @uploaded="on_upload_image"
          :dog_id="dog._id"
      ></upload-user-image>

<!--      @uploaded=""-->




      <!---------------------------------------- main content --------------------------------------------------------->
      <div class="sds-content-container-bg">
         <div class="sds-content-container ">
            <div class="sds-subtitle" style="text-align: center">
               Order Replacement Items
            </div>
            <img src="../../assets/images/products/SDSProductPackage.png"
                 style="max-width: 750px; width: 99%"
            >

            <div v-if="!isMobile"
                style="font-size: 10pt; padding-left: 30px; margin-top: -50px">
               Items not to scale.
            </div>





            <!--<div class="item-box-container">-->
            <!--   test-->
            <!--</div>-->



            <my-form style="margin-top: 50px">

               <div v-for="item in store_items"
                    :key="item._id"
                   class="centered-flex-column pa-5 white-bg mt-5"
                    style="width: 100%; max-width: 900px;"
               >
                  <v-row dense>
                     <v-col cols="12" sm="3">
                        <!--<img src="../../assets/images/products/SDSPatchTilted.png"-->
                        <!--     style="max-width: 400px; width: 90%"-->
                        <!--&gt;-->

                        <img :src="'products/'+item.images[0]"
                             style="max-width: 400px; width: 90%"
                        >
                     </v-col>

                     <v-col cols="12" sm="7">
                        <div style="color: var(--color-headline); font-size: 14pt; font-weight: 600">
                           {{item.name}}
                        </div>

                        <div>
                           {{item.description_full}}
                        </div>
                        <!--<v-btn x-small  text class="view-btn" @click="show_detail_patch=true">-->
                        <!--   View Details <div class="triangle ml-2"></div>-->
                        <!--</v-btn>-->
                     </v-col>

                     <v-col cols="12" sm="2" style="display: flex; flex-direction: column; align-items: center">
                        <div style="font-size: 20pt; font-weight: 600" class="">
                           ${{fmt_number(item.price, {places: 2})}}
                        </div>
                        <my-text-input
                            label="Quantity"
                            :rules="[isNumber]"
                            v-model="buy_items[item.item_key].quantity"
                        />

                     </v-col>


                  </v-row>
               </div>




               <!--order complete kit-->
               <div
                    class="centered-flex-column pa-5 white-bg mt-5"
                    style="width: 100%; max-width: 900px;"
               >
                  <v-row dense>
                     <v-col cols="12" sm="3">
                        <img src="products/SDSProductPackage.png"
                             style="max-width: 400px; width: 90%"
                        >


                     </v-col>

                     <v-col cols="12" sm="7">
                        <div style="color: var(--color-headline); font-size: 14pt; font-weight: 600">
                           Complete Kit
                        </div>

                        <div>
                           If you wish to order a complete Service Dog Standards Archival Documentation Package,
                           with or without photo cards, please visit our main shop page.
                        </div>
                     </v-col>

                     <v-col cols="12" sm="2" style="display: flex; flex-direction: column; align-items: center; justify-content: center">
                        <v-btn
                            to="/store"
                        >New Order</v-btn>

                     </v-col>


                  </v-row>
               </div>
            </my-form>










            <!------------------------------ show user's dogs ------------------------------------------->
            <div  style="margin-top: 25px;" v-if="show_order_details">




               <div class="sds-subtitle"  style="text-align: center">
                  Order Details
               </div>


               <div class="centered-flex-column">
                  <template v-if="show_image_info">
                     <template v-if="dog.profile_image != null">
                        <avatar
                            size="70"
                            profile-type="dog"
                            :image="dog.profile_image"
                            style="border: 5px solid white; border-radius: 50%"
                        />

                        <v-tooltip top color="#353535">

                           <template v-slot:activator="{ on, attrs }">
                              <v-btn text color="var(--color-btn)" @click="show_upload_image=true"
                                     v-bind="attrs" v-on="on"
                              >
                                 Change Photo
                              </v-btn>
                           </template>
                           Note, that this permanently changes the profile photo for {{dog.name}}'s profile.
                        </v-tooltip>

                     </template>


                     <div v-else>
                        <v-tooltip top color="#353535" >

                           <template v-slot:activator="{ on, attrs }">
                              <v-btn text color="var(--color-btn)" @click="show_upload_image=true"
                                     v-bind="attrs" v-on="on"
                              >
                                 Add optional photo
                              </v-btn>
                           </template>
                           Note, that this permanently adds a profile photo to {{dog.name}}'s profile.
                        </v-tooltip>
                     </div>
                  </template>




                  <table>
                     <tr >
                        <td class="info-label">Handler</td>
                        <td style="width:10px"></td>
                        <td class="info-value">{{ item.details.handler_name }}</td>
                     </tr>

                     <tr>
                        <td class="info-label">Dog</td>
                        <td style="width:10px"></td>
                        <td class="info-value">{{ item.details.dog_name }}</td>
                     </tr>

                     <tr v-if="item.details.trainer_name !== ''">
                        <td class="info-label">Trainer</td>
                        <td style="width:10px"></td>
                        <td class="info-value">{{ item.details.trainer_name }}</td>
                     </tr>

                     <tr v-if="item.details.aide_name !== ''" >
                        <td class="info-label">Aide</td>
                        <td style="width:10px"></td>
                        <td class="info-value">{{ item.details.aide_name }}</td>
                     </tr>


                     <tr>
                        <td class="info-label">Member</td>
                        <td style="width:10px"></td>
                        <td class="info-value">SDS-{{ item.details.dog_num }}</td>
                     </tr>

                     <tr>
                        <td class="info-label">Expires</td>
                        <td style="width:10px"></td>
                        <td class="info-value">{{fmt_date(item.details.expiration)}}</td>
                     </tr>
                  </table>

                  <!--<v-btn text color="var(&#45;&#45;color-btn)" style="margin-top: -8px"-->
                  <!--       @click="edit_item_fn"-->
                  <!--&gt;-->
                  <!--   Edit-->
                  <!--</v-btn>-->
               </div>





               <div class="centered-flex-column" style="text-align: center" v-if="show_aide_question">

                  <div class="sds-subtitle" style="max-width: 400px; font-size: 17pt; margin-top: 15pt;">
                     Do you need to name someone as an Aide on your cards?
                  </div>


                  <my-form class="centered-flex-column">
                     <my-drop-down
                         :list="[{txt: 'Yes', val: true}, {txt: 'No', val: false}]"
                         v-model="show_add_aide"
                         style="max-width: 150px"
                         @input="update_aide"
                     />
                  </my-form>


                  <div v-if="show_add_aide"
                       style="max-width: 500px; text-align: left; font-weight: 600; font-size: 13pt; color: #474747"
                       class="mt-6"
                  >
                     <p>
                        For children or severely disabled individuals, an additional person may be listed on your card.
                     </p>


                     <p>
                        Remember, only the disabled handler has access privileges under the law.  In other words,
                        it's the disabled individual who has rights - not the dog.
                     </p>

                     <p class="mb-0" >
                        Friends, means friends, family or others who watch or transport the animal, take it for walks,
                        etc. do not have public access privileges while they are with the dog.
                     </p>

                     <my-form ref="aide_name">
                        <v-row dense>
                           <v-col cols="12" sm="6">
                              <my-text-input
                                  v-model="aide.name_first"
                                  label="Aide's First Name"
                                  :rules="[isRequired]"
                                  @input="update_aide"

                              />
                           </v-col>
                           <v-col cols="12" sm="6">
                              <my-text-input
                                  v-model="aide.name_last"
                                  label="Aide's last Name"
                                  :rules="[isRequired]"
                                  @input="update_aide"
                              />
                           </v-col>
                        </v-row>

                     </my-form>

                     <!--<v-btn  width="100%" style="font-size: medium; margin-top: 20px; " @click="add_aide">-->
                     <!--   Refresh-->
                     <!--</v-btn>-->
                  </div>



               </div>








            </div>

            <div style="display: flex; justify-content: center">
               <v-btn
                   width="100%" style="font-size: medium; margin-top: 40px; max-width: 400px"
                   @click="add_to_cart" :disabled="!items_ordered">
                  Add items to cart
               </v-btn>

            </div>

            <div style="height: 100px"
            ></div>
         </div>


      </div>


   </div>
</template>

<script>
import {DateTime} from 'luxon';
import _ from 'lodash';
import data_getters from "@/mixins/data_getters";
import store from "@/mixins/store";

import validation from "@/mixins/validation";
import UploadUserImage from "@/components/FileUploads/UploadUserImage";
import utilities from "@/mixins/utilities";
import MyDropDown from "@/components/inputs/MyDropDown";


export default {
   name: "addKitToCart",
   mixins: [data_getters, utilities, validation, store],
   components: {MyDropDown, UploadUserImage},
   props:{
      dog: {type:Object, default: null},  //if specified then creates new cart item, based on info in object
      cart_ix: {type:Number, default: null}, //if specified then displays info for the cart item
   },

   data(){
      return {
         show_edit_info: false,

         item: {
            details: {},
         },




         //used to create temp copy when editing info so that we can undo if user doesn't hit save
         edit_item: {
            details: {},
         },


         store_items: [], //
         buy_items: {},//actual items bought



         show_upload_image: false,

         show_add_aide: false, // show fields
         // aide_name_first: null,
         // aide_name_last: null,
         aide: {name_first: null, name_last: null},

         show_aide_question: true, //show the whole section

      }
   },

   watch: {
      dog(){
         // this.update_item();
      }
   },

   computed: {

      isValid(){
         let ans = true;

         if (this.item.details.expiration == null  ){
            ans = false;
         }

         return ans;

      },

      isMobile(){
         return this.$vuetify.breakpoint.width < 650;
      },


      show_order_details(){
         // console.log('debug')
         let ans = false;
         if (this.buy_items['sds_certificate'] && Number(this.buy_items['sds_certificate'].quantity)>0){
            ans = true;
         }
         if (this.buy_items['sds_card'] && Number(this.buy_items['sds_card'].quantity)>0){
            ans = true;
         }

         return ans;
      },

      show_image_info(){

         let ans = false;

         if (this.buy_items['sds_card'] && Number(this.buy_items['sds_card'].quantity)>0){
            ans = true;
         }

         return ans;
      },


      items_ordered(){


         for (let k in this.buy_items){
            if (Number(this.buy_items[k].quantity) > 0){
               return true;
            }
         }

         return false;
      }



   },


   methods: {

      replace_null(x){
         if (x=== null) return '';
         return x;
      },

      update_aide() {

         if (this.show_add_aide===false){
            this.aide={name_first: null, name_last: null};
         }

         let ans = '';
         if (this.aide.name_first != null){
            ans += this.aide.name_first + ' ';
         }
         if (this.aide.name_last != null){
            ans += this.aide.name_last + ' ';
         }
         ans = ans.trim();

         this.item.details.aide_name = ans;

      },





      //TODO:  should centralize this to a mixin function for adding in any item
      async add_to_cart(){
         // if (this.item.details.expiration == null){
         //    throw Error('expiration date is null')
         // }

         if (this.show_add_aide && !this.$refs.aide_name.validate()){
            return;
         }

         try{

            console.log('debug')
            for (let k in this.buy_items){
               let bi = this.buy_items[k];
               if (Number(bi.quantity) > 0 ){
                  let item = await this.get_cart_item(k, Number(bi.quantity), {dog:this.dog, aide: this.aide,});
                  await  this.add_item_to_cart(item, {navigateToCart: false});
               }


            }



            this.$emit('item-added');

         }
         catch (e) {

            console.log(e)
         }

      },


      on_upload_image(location){

         this.show_upload_image = false;
         this.item.details.kit_image = location;
         this.dog.profile_image = location;
         // this.item.price += 20;
         this.item.description= `Registration Kit w/ Image for "${this.dog.name}"`

      },


      add_aide(){
         if (!this.$refs.aide_name.validate()){
            return;
         }


         let name = this.aide_name_first + ' ' + this.aide_name_last;

         this.item.details.aide_name = name;

         this.show_aide_question = false;

      },


      async remove_image(){

         try {
            let payload =
                {dog_id: this.item.details.dog_id,
                   s3_info: this.item.details.kit_image,
                };
            await this.make_request('/public/deleteDogKitImage', payload);

         }catch (e) {
            console.error(e)
         }



         this.item.description= `Registration Kit for "${this.dog.name}"`
         this.item.details.kit_image = null;
         // this.item.price -= 20;
      },

      edit_item_fn() {
         this.edit_item = _.cloneDeep(this.item);
         this.show_edit_info=true

      },

      save_edits(){
        this.item = _.cloneDeep(this.edit_item);
        this.edit_item = {details:{}};
         this.show_edit_info=false;

      },






      async save_cart_item_changes(){
         this.$store.commit('set_cart_item', {ix: this.cart_ix, item: this.item});


         try{

            //if user is logged in then save changes both to db and locally
            let items  = _.cloneDeep( this.$store.state.cart.items)
            let res = await this.make_request('/store/updateCartItems', {items});


            this.$emit('close');

         }
         catch (e) {

            console.log(e)
         }

      },

   },

   async created(){
      // this.update_item();



      let si = await this.make_request('/store/getItems', {});

      let items = [];

      items.push(si['sds_certificate']);
      items.push(si['sds_card']);
      items.push(si['sds_3_patch_set']);
      items.push(si['sds_accepted_patch']);
      items.push(si['sds_tag']);

      let buy_items = {};
      for(let i in items){
         buy_items[items[i].item_key] = {quantity: "0", item: items[i]};

         if (items[i].images == null || items[i].images.length === 0){
            items[i].images = ['noProduct.png']
         }
      }

      this.buy_items = buy_items;
      this.store_items = items;

      this.item = await this.get_cart_item('sds_card', 1, {dog: this.dog});

   }
}
</script>

<style scoped>

@import url('./store_common.css');
/**************************** for table *********************************************************/

.table-header{
   font-weight: 700;
   padding: 10px;
   color: var(--color-subheading);
}

.reg-body{

   background-color: white;
}


/*settings for registration table*/
table.reg-table th, table.reg-table td{
   text-align: left;
   padding: 10px;
   font-weight: 600;
}

th{
   color: var(--color-subheading);
}

table.reg-table tr:nth-child(odd) {background-color: #e7f3fb;}
table.reg-table tr:nth-child(even) {background-color: #f7fbfd;}

.col-service-dog{
   font-size: 12pt;
   font-weight: 500;
}

.sd-name-container{
   display: flex;
   align-items: center;

}


.col-service-do-reg{
   font-size: 12pt;
   font-weight: 500;
   color: var(--color-subheading)
}


.order-detail{
   font-weight: 500;
}

.order-label{
   padding-right: 5px;
}

/*div >>> .v-btn{*/
/*   border-radius: 0px;*/
/*}*/


div >>> .v-btn{
   border-radius: 0px;

}








/****** stuff for mobile version of table****************/

.dog-row{
    /*padding: 5px 10px 5px 10px;*/
    margin-bottom: 30px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 5px;
    border: 1px solid #d2d1d1;
}

.dog-row-section{
    background-color: #e7f3fb;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 2px;
    padding-right: 10px;
    padding-left: 10px;
}




.dog-row-header {
    /*margin-top: 20px;*/
    width: 100%;
    /*text-align: center;*/
    font-size: 18pt;
    font-weight: 600;
    color: #054f86;
}


.dog-row-header2 {
    margin-top: 20px;
    font-size: 14pt;
    font-weight: 600;
    color: #519dd3;
}

.large-grey-txt{
    font-size: 14pt;
    font-weight: 600;
    color: gray;
}


.info-label{
    font-size: 13pt;
    font-weight: 700;
    color: #515151;
}

.info-value{
    font-size: 13pt;
    font-weight: 600;
    color: #5a5a5a;
}




.item-box-container{
    background-color: white;
}


</style>