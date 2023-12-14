<template>
  <div>
    <!----------------dialog to edit details------------------------->
    <v-dialog
      v-model="show_edit_info"
      max-width="700px"
    >
      <v-card>
        <my-form>
          <v-container>
            <div style="font-weight: 600; font-size: 14pt">
              Edit Order Details
            </div>
            <v-row>
              <v-col>
                <my-text-input
                  v-model="edit_item.details.dog_name"
                  label="Dog"
                />
              </v-col>

              <v-col>
                <my-text-input
                  v-model="edit_item.details.handler_name"
                  label="Handler's Name"
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col>
                <my-text-input
                  v-model="edit_item.details.trainer_name"
                  label="Trainer"
                />
              </v-col>

              <v-col>
                <my-text-input
                  v-model="edit_item.details.aide_name"
                  label="Aide"
                />
              </v-col>
            </v-row>


            <v-row class="mt-6">
              <v-spacer />
              <v-btn @click="show_edit_info=false">
                Cancel
              </v-btn>
              <v-btn
                color="var(--color-btn)"
                class="white--text ml-2 mr-3"
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
      :dog_id="dog._id"
      @uploaded="on_upload_image"
    />


    <!--<upload-user-image-->
    <!--    v-if="show_upload_image"-->
    <!--    :show.sync="show_upload_image"-->
    <!--    file-type="dog_kit"-->
    <!--    @uploaded="on_upload_image"-->
    <!--    :dog_id="dog._id"-->
    <!--&gt;</upload-user-image>-->

    <!--      @uploaded=""-->




    <!---------------------------------------- main content --------------------------------------------------------->
    <div class="sds-content-container-bg">
      <div class="sds-content-container">
        <div
          class="sds-subtitle"
          style="text-align: center"
        >
          Complete Service Dog Standards Kit
        </div>
        <img
          src="../../assets/images/products/SDSProductPackage.png"
          style="max-width: 750px; width: 90%"
        >

        <div
          v-if="!isMobile"
          style="font-size: 10pt; padding-left: 30px; margin-top: -50px"
        >
          Items not to scale.
        </div>








        <!------------------------------ show user's dogs ------------------------------------------->
        <div style="margin-top: 25px;">
          <div
            class="sds-subtitle"
            style="text-align: center"
          >
            Order Details
          </div>


          <div class="centered-flex-column">
            <template v-if="item.details.kit_image != null">
              <avatar
                size="70"
                profile-type="dog"
                :image="item.details.kit_image"
                style="border: 5px solid white; border-radius: 50%"
              />

              <v-tooltip
                top
                color="#353535"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    text
                    color="var(--color-btn)"
                    v-bind="attrs"
                    @click="show_upload_image=true"
                    v-on="on"
                  >
                    Change Photo
                  </v-btn>
                </template>
                Note, that this permanently changes the profile photo for {{ dog.name }}'s profile.
              </v-tooltip>
            </template>


            <div v-else>
              <!--<v-btn text color="var(&#45;&#45;color-btn)" @click="show_upload_image=true">-->
              <!--   Add optional photo-->
              <!--</v-btn>-->


              <v-tooltip
                top
                color="#353535"
              >
                <template #activator="{ on, attrs }">
                  <v-btn
                    small
                    color="var(--color-btn)"
                    v-bind="attrs"
                    class="mt-4 mb-4"
                    @click="show_upload_image=true"
                    v-on="on"
                  >
                    Add optional photo
                  </v-btn>
                </template>
                Note, that this permanently adds a profile photo to {{ dog.name }}'s profile.
              </v-tooltip>
            </div>

            <table>
              <tr>
                <td class="info-label">
                  Handler
                </td>
                <td style="width:10px" />
                <td class="info-value">
                  {{ item.details.handler_name }}
                </td>
              </tr>

              <tr>
                <td class="info-label">
                  Dog
                </td>
                <td style="width:10px" />
                <td class="info-value">
                  {{ item.details.dog_name }}
                </td>
              </tr>

              <tr v-if="item.details.trainer_name !== ''">
                <td class="info-label">
                  Trainer
                </td>
                <td style="width:10px" />
                <td class="info-value">
                  {{ item.details.trainer_name }}
                </td>
              </tr>

              <tr v-if="item.details.aide_name !== '' && show_add_aide">
                <td class="info-label">
                  Aide
                </td>
                <td style="width:10px" />
                <td class="info-value">
                  {{ item.details.aide_name }}
                </td>
              </tr>


              <tr>
                <td class="info-label">
                  Member
                </td>
                <td style="width:10px" />
                <td class="info-value">
                  SDS-{{ item.details.dog_num }}
                </td>
              </tr>

              <tr>
                <td class="info-label">
                  Expires
                </td>
                <td style="width:10px" />
                <td class="info-value">
                  {{ fmt_date(item.details.expiration) }}
                </td>
              </tr>
            </table>

            <!--<v-btn text color="var(&#45;&#45;color-btn)" style="margin-top: -8px"-->
            <!--       @click="edit_item_fn"-->
            <!--&gt;-->
            <!--   Edit-->
            <!--</v-btn>-->
          </div>





          <div
            v-if="show_aide_question"
            class="centered-flex-column"
            style="text-align: center"
          >
            <div
              class="sds-subtitle"
              style="max-width: 400px; font-size: 17pt; margin-top: 15pt;"
            >
              Do you need to name someone as an Aide on your cards?
            </div>


            <my-form class="centered-flex-column">
              <my-drop-down
                v-model="show_add_aide"
                :list="[{txt: 'Yes', val: true}, {txt: 'No', val: false}]"
                style="max-width: 150px"
                @input="update_aide"
              />
            </my-form>


            <div
              v-if="show_add_aide"
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

              <p class="mb-0">
                Friends, means friends, family or others who watch or transport the animal, take it for walks,
                etc. do not have public access privileges while they are with the dog.
              </p>

              <my-form ref="aide_name">
                <v-row dense>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <my-text-input
                      v-model="aide.name_first"
                      label="Aide's First Name"
                      :rules="[isRequired]"
                      @input="update_aide"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
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











          <!--------------additional items ---------------------->
          <my-form style="margin-top: 40px">
            <div style="display: flex; justify-content: center">
              <div
                class="sds-subtitle"
                style="max-width: 400px; font-size: 15pt; margin-top: 15pt;"
              >
                Additional/Spare Patches and Tags
              </div>
            </div>

            <div
              v-for="item in store_items"
              :key="item._id"
              class="centered-flex-column pa-5 white-bg mt-4"
              style="width: 100%; max-width: 900px;"
            >
              <v-row dense>
                <v-col
                  cols="12"
                  sm="3"
                >
                  <!--<img src="../../assets/images/products/SDSPatchTilted.png"-->
                  <!--     style="max-width: 400px; width: 90%"-->
                  <!--&gt;-->

                  <img
                    :src="'products/'+item.images[0]"
                    style="max-width: 400px; width: 90%"
                  >
                </v-col>

                <v-col
                  cols="12"
                  sm="7"
                >
                  <div style="color: var(--color-headline); font-size: 14pt; font-weight: 600">
                    {{ item.name }}
                  </div>

                  <div>
                    {{ item.description_full }}
                  </div>
                  <!--<v-btn x-small  text class="view-btn" @click="show_detail_patch=true">-->
                  <!--   View Details <div class="triangle ml-2"></div>-->
                  <!--</v-btn>-->
                </v-col>

                <v-col
                  cols="12"
                  sm="2"
                  style="display: flex; flex-direction: column; align-items: center"
                >
                  <div
                    style="font-size: 20pt; font-weight: 600"
                    class=""
                  >
                    ${{ fmt_number(item.price, {places: 2}) }}
                  </div>
                  <my-text-input
                    v-model="buy_items[item.item_key].quantity"
                    style="max-width: 100px"
                    label="Quantity"
                    :rules="[isNumber]"
                  />
                </v-col>
              </v-row>
            </div>
          </my-form>

          <!--v-if="!show_aide_question || !show_add_aide"-->
          <div style="display: flex; justify-content: center">
            <v-btn
              width="100%"
              style="font-size: medium; margin-top: 40px; max-width: 400px"
              @click="add_to_cart"
            >
              Add to cart
            </v-btn>
          </div>


          <div style="height: 100px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {DateTime} from 'luxon';
import _ from 'lodash';
import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";
import UploadUserImage from "@/components/FileUploads/UploadUserImage";
import utilities from "@/mixins/utilities";
import MyDropDown from "@/components/inputs/MyDropDown";
import store from "@/mixins/store";

export default {
   name: "AddKitToCartSimple",
   components: {MyDropDown, UploadUserImage},
   mixins: [data_getters, utilities, validation, store],
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

         show_upload_image: false,

         show_add_aide: false, // show fields
         aide_name_first: null,
         aide_name_last: null,
         aide: {name_first: null, name_last: null},
         show_aide_question: true, //show the whole section


         test: {test: null},



         item_kit:{},
         store_items: [],
         buy_items: {},
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


      // aide() {
      //    console.log('debug aide')
      //    let ans = '';
      //    if (this.aide_name_first != null){
      //       ans += this.aide_name_first + ' ';
      //    }
      //    if (this.aide_name_last != null){
      //       ans += this.aide_name_last + ' ';
      //    }
      //    ans = ans.trim();
      //
      //    this.item.details.aide_name = ans;
      //
      //    let val = {
      //       name_first: this.aide_name_first,
      //       name_last: this.aide_name_last
      //    }
      //
      //
      //    // if (this.show_add_aide){
      //    //    val = {}
      //    // }
      //
      //
      //    return val;
      //
      // },

      // aide_name(){
      //    let ans = '';
      //    if (this.aide.name_first != null){
      //       ans += this.aide.name_first + ' ';
      //    }
      //    if (this.aide.name_last != null){
      //       ans += this.aide.name_last + ' ';
      //    }
      //    ans = ans.trim();
      //
      //    return ans;
      // }
   },

   watch: {
      dog(){
         this.update_item();
      },


   },

   async created(){

      let si = await this.make_request('/store/getItems', {});

      let items = [];

      // items.push(si['sds_certificate']);
      // items.push(si['sds_card']);
      items.push(si['sds_accepted_patch']);
      items.push(si['sds_3_patch_set']);
      items.push(si['sds_tag']);

      let buy_items = {};
      for(let i in items){
         buy_items[items[i].item_key] = {quantity: "0", item: items[i]};

         if (items[i].images == null || items[i].images.length === 0){
            items[i].images = ['noProduct.png']
         }
      }


      this.store_items = items;
      this.buy_items = buy_items;

      // this.item_kit = await this.make_request('/store/getItem', {item_key: 'sds_full_kit'});
      this.item_kit = si['sds_full_kit'];
      this.update_item();

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






      // update_item(){
      //
      //
      //    if (this.cart_ix !== null){
      //       this.item = _.cloneDeep(this.$store.state.cart.items[this.cart_ix]);
      //       return;
      //    }
      //
      //
      //    let now = DateTime.local();
      //
      //
      //    let handler = this.replace_null(_.get(this.dog, 'handler_id_FR.name_first', ''));
      //    if (handler !== '') handler += ' ';
      //    handler += this.replace_null(_.get(this.dog, 'handler_id_FR.name_last', ''));
      //
      //    let trainer = this.replace_null(_.get(this.dog, 'trainer_id_FR.name_first', ''));
      //    if (trainer !== '') trainer += ' ';
      //    trainer +=  this.replace_null(_.get(this.dog, 'trainer_id_FR.name_last', ''));
      //
      //    // let handler_u = await this.make_request('/private/getUserAgreementExpiration', {user_id: this.dog.handler_id});
      //    let expiry =_.get(this.dog, 'handler_id_FR.account_status.date_expiry', null);
      //
      //
      //    let image = _.get(this.dog, 'profile_image', null);
      //
      //
      //    this.item = {
      //       name: 'SDS Registration Kit',
      //       // serial_key: this.dog.dog_num,
      //       description: `Registration Kit for "${this.dog.name}"`,
      //       price: 75.00,
      //       number: 1,
      //       details: {
      //          handler_name: handler,
      //          trainer_name: trainer,
      //          dog_name: this.dog.name,
      //
      //          aide_name: '',
      //          purchase_date: now.toJSDate(),
      //          expiration: expiry,
      //
      //          user_id:  this.$auth.profile.user_id,
      //          member_num: this.$auth.profile.member_num,
      //
      //          dog_id: this.dog._id,
      //          dog_num: this.dog.dog_num,
      //          sds_num: 'SDS-'+this.dog.dog_num,
      //
      //          kit_image: image,
      //
      //       },
      //    };
      // },


      update_item(){

         console.log('debug')

         if (this.cart_ix !== null){
            this.item = _.cloneDeep(this.$store.state.cart.items[this.cart_ix]);
            return;
         }


         this.get_cart_item('sds_full_kit', 1, {dog: this.dog, aide: this.aide}).then(data=>{this.item = data});


      },

      on_upload_image(location){

         this.show_upload_image = false;
         this.item.details.kit_image = location;
         // this.item.price += 20;
         this.item.description= `Registration Kit w/ Image for "${this.dog.name}"`

      },


      // add_aide(){
      //    if (!this.$refs.aide_name.validate()){
      //       return;
      //    }
      //
      //
      //    let name = this.aide_name_first + ' ' + this.aide_name_last;
      //
      //    this.item.details.aide_name = name;
      //
      //    this.show_aide_question = false;
      //
      // },


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





      //TODO:  should centralize this to a mixin function for adding in any item
      async add_to_cart(){
         if ( this.item.details.expiration == null){
            throw Error('expiration date is null')
         }

         if (this.show_add_aide && !this.$refs.aide_name.validate()){
            return;
         }


         try{

            await  this.add_item_to_cart(this.item, {navigateToCart: false});

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


</style>