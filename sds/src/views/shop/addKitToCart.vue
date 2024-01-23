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
                  label="Animal's Name"
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
      file-type="dog_kit"
      :dog_id="dog._id"
      @uploaded="on_upload_image"
    />

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
        <div style="display: flex; justify-content: left">
          <img
            src="../../assets/images/products/SDSProductPackage.png"
            style="max-width: 750px; width: 90%"
          >
        </div>


        <div
          v-if="!isMobile"
          style="font-size: 10pt; padding-left: 30px; margin-top: -50px; "
        >
          Items not to scale.
        </div>








        <!------------------------------ show user's dogs ------------------------------------------->
        <div
          v-if="false"
          style="margin-top: 25px;"
        >
          <div class="reg-body">
            <div class="table-header">
              Registration Kit for Team
            </div>



            <!----------------------- Full screen version -------------------------------->
            <table
              v-if="!isMobile"
              style="width: 100%"
              class="reg-table"
            >
              <!--                     <colgroup>-->
              <!--                        <col span="1" style="width: 80%;">-->
              <!--                        <col span="1" style="width: 20%;">-->

              <!--                     </colgroup>-->
              <tbody>
                <tr style="background-color: #b7dbf1">
                  <th>Service Dog</th>
                  <th>Handler</th>
                  <th>Trainer</th>
                </tr>


                <tr>
                  <td>
                    <div style="display: flex">
                      <avatar
                        size="50"
                        profile-type="dog"
                        :profile="dog"
                      />
                    </div>
                  </td>


                  <td>
                    <div style="display: flex;">
                      <avatar
                        v-if="dog.handler_id_FR"
                        size="50"
                        profile-type="user"
                        :profile="dog.handler_id_FR"
                      />
                      <div v-else>
                        No Handler
                      </div>
                    </div>
                  </td>

                  <td>
                    <div style="display: flex;">
                      <avatar
                        v-if="dog.trainer_id_FR"
                        size="50"
                        profile-type="user"
                        :profile="dog.trainer_id_FR"
                      />
                      <div v-else>
                        No Trainer
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>






            <!----------------------- Mobile version -------------------------------->
            <div v-if="isMobile">
              <div class="dog-row ">
                <!------------handler section------------>
                <div class="dog-row-section">
                  <div style="display: flex">
                    <avatar
                      :image="dog.handler_id_FR.profile_image"
                      :rounded="true"
                      size="50"
                      size-no-image="50"
                    />

                    <div class="ml-4">
                      <div
                        class="dog-row-header"
                        style="margin-top: 5px;"
                      >
                        Handler
                      </div>
                      <span class="dog-row-header2">
                        {{ dog.handler_id_FR.name_first }} {{ dog.handler_id_FR.name_last }}
                      </span>
                    </div>
                  </div>
                </div>




                <!------------dog section------------>
                <div class="dog-row-section">
                  <div style="display: flex">
                    <avatar
                      :image="dog.profile_image"
                      :rounded="true"
                      size="50"
                      size-no-image="50"
                    />

                    <div class="ml-4">
                      <div
                        class="dog-row-header"
                        style="margin-top: 5px;"
                      >
                        Service Dog
                      </div>
                      <span class="dog-row-header2">
                        {{ dog.handler_id_FR.name_first }} {{ dog.handler_id_FR.name_last }}
                      </span>
                    </div>
                  </div>
                </div>


                <!------------trainer section------------>
                <div
                  v-if="dog.trainer_id_FR"
                  class="dog-row-section"
                >
                  <div style="display: flex">
                    <avatar
                      :image="dog.trainer_id_FR.profile_image"
                      :rounded="true"
                      size="50"
                      size-no-image="50"
                    />

                    <div class="ml-4">
                      <div
                        class="dog-row-header"
                        style="margin-top: 5px;"
                      >
                        Trainer
                      </div>
                      <span class="dog-row-header2">
                        {{ dog.trainer_id_FR.name_first }} {{ dog.trainer_id_FR.name_last }}
                      </span>
                    </div>
                  </div>
                </div>
              </div> <!--end or row-->
            </div>
            <!-- end of mobile version -->
          </div>
        </div>










        <!-------------------------- Order Details ------------------------------------------------------>
        <div
          style="margin-top: 25px;"
          class="reg-body pa-4"
        >
          <div style="font-size: 14pt; font-weight: 600; color: var(--color-subheading)">
            Order Details
          </div>


          <div
            style="display: flex; justify-content: center; "
            class="mt-1"
          >
            <div style="display: flex; justify-content: center; flex-direction: column; align-items: flex-start">
              <div>
                SDS-Number:
                <span class="order-detail">
                  {{ item.details.dog_num }}
                </span>
              </div>

              <div>
                <v-tooltip right>
                  <template #activator="{ on, attrs }">
                    <span>
                      Expiration<v-icon
                        v-bind="attrs"
                        small
                        v-on="on"
                      >
                        help_outline
                      </v-icon>:
                    </span>
                  </template>
                  Expiration of handler's Behavior Standards Agreement
                </v-tooltip>

                <span
                  v-if="item.details.expiration != null"
                  class="order-detail"
                >
                  {{ fmt_date(item.details.expiration) }}
                </span>
                <span
                  v-else
                  style="color: red"
                >
                  Handler hasn't accept Behavior Standards!
                </span>
              </div>



              <table
                v-if="!isMobile"
                class="mt-1"
              >
                <tr>
                  <td class="order-label">
                    Service Dog:
                  </td>
                  <td class="order-detail">
                    {{ item.details.dog_name }}
                  </td>
                  <td style="width:20px" />

                  <td class="order-label">
                    Handler:
                  </td>
                  <td class="order-detail">
                    {{ item.details.handler_name }}
                  </td>
                </tr>

                <tr>
                  <td class="order-label">
                    Trainer:
                  </td>
                  <td class="order-detail">
                    {{ item.details.trainer_name }}
                  </td>
                  <td style="width:20px" />
                  <td class="order-label">
                    Aide:
                  </td>
                  <td class="order-detail">
                    {{ item.details.aide_name }}
                  </td>
                </tr>
              </table>


              <!------------mobile version-------------------------->
              <div
                v-else
                class="mt-4"
              >
                <div>
                  Service Dog:
                  <span class="order-detail">
                    {{ item.details.dog_name }}
                  </span>
                </div>


                <div>
                  Handler:
                  <span class="order-detail">
                    {{ item.details.handler_name }}
                  </span>
                </div>





                <div>
                  Trainer:
                  <span class="order-detail">
                    {{ item.details.trainer_name }}
                  </span>
                </div>

                <div>
                  Aide:
                  <span class="order-detail">
                    {{ item.details.aide_name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>






        <!----------------- add training aid ------------------------------------->
        <div
          class="sds-content-container mt-5 pa-3"
          style="text-align: center; background-color: white"
        >
          <div
            class="sds-subtitle"
            style="color: var(--color-headline)"
          >
            Do you need to add/edit an Aide's name, Training Organization or Trainer's Name?
          </div>


          <div style="color: var(--color-subheading); margin-top: 5px; font-weight: 600; font-size: 8pt">
            What is an Aide or a Training Organization?
          </div>

          <div style="height: 30px" />

          <v-btn
            dark
            color="var(--color-btn)"
            style="border-radius: 0px"
            class="pl-8 pr-8"
            @click="edit_item_fn"
          >
            Edit info
          </v-btn>

          <div style="height: 30px" />
        </div>



        <!----------------- add Image ----------------------------------------->
        <div
          class="sds-content-container mt-5 pa-3"
          style="text-align: center; background-color: white"
        >
          <div
            class="sds-subtitle"
            style="color: var(--color-headline)"
          >
            Add picture of {{ dog.name }} to your kit?
          </div>
          <!--               <div >-->
          <!--                  (Adds $20 to price)-->
          <!--               </div>-->
          <div style="height: 30px" />

          <div
            v-if="item.details.kit_image"
            style="display:flex; flex-direction: column; align-items: center"
          >
            <img
              :src="item.details.kit_image.Location"
              style="max-height:200px"
            >
            <v-btn
              style="border-radius: 0px"
              class="pl-8 pr-8 mt-4"
              dark
              color="var(--color-btn)"
              @click="remove_image"
            >
              Remove Image
            </v-btn>
          </div>


          <v-btn
            v-if="item.details.kit_image == null"
            dark
            color="var(--color-btn)"
            style="border-radius: 0px"
            class="pl-8 pr-8"
            @click="show_upload_image=true"
          >
            Add Image
          </v-btn>
          <div style="height: 30px" />
        </div>


        <!----------------- Total Cost ----------------------------------------->
        <div
          class="sds-content-container mt-5 pa-3"
          style="display: flex; background-color: white; font-weight: 600"
        >
          Item Total

          <v-spacer />
          {{ fmt_number(item.price, {places:2, prefix:'$'}) }}
        </div>





        <!------------ add to cart button ---------------------------------------------->
        <div
          class="sds-content-container mt-7 pa-0"
          style="display: flex; justify-content: center"
        >
          <template v-if="cart_ix != null">
            <v-btn
              color="grey"
              style="height: 40px"
              @click="$emit('close')"
            >
              Cancel
            </v-btn>

            <v-btn
              class="ml-2 "
              style="height: 40px"
              @click="save_cart_item_changes"
            >
              Save Changes
            </v-btn>
          </template>




          <v-btn
            v-else
            dark
            class="ma-0 "
            style="width: 100%; height: 40px"
            :disabled="!isValid"
            color="var(--color-btn)"
            @click="add_to_cart"
          >
            Add to cart
          </v-btn>
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

export default {
   name: "AddKitToCart",
   components: {UploadUserImage},
   mixins: [data_getters, utilities],
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

         show_upload_image: false
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
      }
   },

   watch: {
      dog(){
         this.update_item();
      }
   },

   created(){
      this.update_item();
   },


   methods: {

      replace_null(x){
         if (x=== null) return '';
         return x;
      },

      update_item(){


         if (this.cart_ix !== null){
            this.item = _.cloneDeep(this.$store.state.cart.items[this.cart_ix]);
            return;
         }


         let now = DateTime.local();


         let handler = this.replace_null(_.get(this.dog, 'handler_id_FR.name_first', ''));
         if (handler !== '') handler += ' ';
         handler += this.replace_null(_.get(this.dog, 'handler_id_FR.name_last', ''));

         let trainer = this.replace_null(_.get(this.dog, 'trainer_id_FR.name_first', ''));
         if (trainer !== '') trainer += ' ';
         trainer +=  this.replace_null(_.get(this.dog, 'trainer_id_FR.name_last', ''));

         // let handler_u = await this.make_request('/private/getUserAgreementExpiration', {user_id: this.dog.handler_id});
         let expiry =_.get(this.dog, 'handler_id_FR.account_status.date_expiry', null);


         this.item = {
            name: 'SDS Registration Kit',
            // serial_key: this.dog.dog_num,
            description: `Registration Kit for "${this.dog.name}"`,
            price: 75.00,
            number: 1,
            details: {
               handler_name: handler,
               trainer_name: trainer,
               dog_name: this.dog.name,

               aide_name: '',
               purchase_date: now.toJSDate(),
               expiration: expiry,

               user_id:  this.$auth.profile.user_id,
               member_num: this.$auth.profile.member_num,

               dog_id: this.dog._id,
               dog_num: this.dog.dog_num,

               kit_image: null,

            },
         };
      },

      on_upload_image(location){

         this.show_upload_image = false;
         this.item.details.kit_image = location;
         // this.item.price += 20;
         this.item.description= `Registration Kit w/ Image for "${this.dog.name}"`

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




      //TODO:  should centralize this to a mixin function for adding in any item
      async add_to_cart(){
         if (this.item.details.expiration == null){
            throw Error('expiration date is null')
         }


         try{

            await  this.add_item_to_cart(this.item);

            // //if user isn't logged in then don't try and save to db
            // if (!this.$auth.authenticated){
            //    this.$store.commit('add_cart_item', this.item);
            //    this.$emit('item-added');
            //    return;
            // }
            //
            //
            // //if user is logged in then save changes both to db and locally
            // let items  = _.cloneDeep( this.$store.state.cart.items)
            //
            // items.push(this.item);
            //
            // let res = await this.make_request('/store/updateCartItems', {items});
            //
            // if (res.newCart){
            //    //copy new cart with _id property over
            //    this.$store.commit('set_cart', res.cart);
            // }else{
            //    this.$store.commit('add_cart_item', this.item);
            // }


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



</style>