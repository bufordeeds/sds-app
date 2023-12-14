<template>
  <div>
    <div class="sds-content-container-bg">
      <div
        class="sds-content-container"
        style="display: flex; flex-direction: column; align-items: center"
      >
        <div
          class="sds-subtitle"
          :style="$vuetify.breakpoint.smAndDown? 'font-size: 15pt' : ''"
          style="text-align: center"
        >
          Customize your materials
        </div>
        <img
          src="../../assets/images/products/SDSProductPackage.png"
          style="max-width: 750px; width: 90%"
        >
        <div style="font-size: 10pt; padding-left: 20px; margin-top: -20px">
          <!--               Click on any item to enlarge.  Items not to scale.-->
        </div>




        <!---------------------- container for the "continue" buttons --------------------------------------------->
        <div
          v-if="!show_dogs"
          style="display: flex; flex-direction: column; align-items: center"
        >
          <div style="color: var(--color-subheading); margin-top: 30px; font-weight: 600">
            Enter SDS Number
          </div>

          <my-form
            ref="form"
            style="display: flex; justify-content: center"
          >
            <!--<text-input-->
            <!--    style="max-width: 250px; margin-top: 10px"-->
            <!--    label="SDS Number"-->
            <!--    hide-label-on-input-->
            <!--    border-color="var(&#45;&#45;color-primary)"-->
            <!--    v-model="sds_number"-->
            <!--    :rules="[isRequired]"-->
            <!--&gt;</text-input>-->



            <v-menu
              v-model="show_dog_list"
              bottom
              nudge-bottom="50px"
              :disabled="dogs.length==0"
            >
              <template #activator="props">
                <div v-on="props.on">
                  <text-input

                    v-model="sds_number"
                    style="max-width: 250px; margin-top: 10px"
                    label="SDS Number"
                    hide-label-on-input
                    border-color="var(--color-primary)"
                    :rules="[isRequired]"
                  />
                </div>
              </template>

              <dog-list
                :dogs="dogs"
                @click="sds_number='SDS-'+$event"
              />
            </v-menu>
          </my-form>


          <div style="color: var(--color-subheading); margin-top: 5px; font-weight: 600; font-size: 8pt; display: flex; justify-content: center; max-width: 250px; width: 100%">
            <!--<router-link to="/?advanced_search=true" target="_blank">-->
            <!--   Find SDS number-->
            <!--</router-link>-->


            <!--<router-link to="/manageServiceDogs" v-if="$auth.authenticated " >-->
            <!--   View All Dogs-->
            <!--</router-link>-->


            <v-btn
              x-small
              to="/manageServiceDogs"
            >
              View All Dogs
            </v-btn>
          </div>




          <div style="height: 30px" />


          <!--            arrow button 2-->
          <v-btn
            dark
            text
            class="ma-0 pa-0"
            style="height: 40px"
            @click="get_dog"
          >
            <div style="background-color: var(--color-btn); height: 40px; display: flex; justify-content: center; align-items: center; width: 170px">
              Continue
            </div>
            <div class="btn-arrow-right" />
          </v-btn>
        </div>






        <!------------------------------ show user's dogs --------------------------------------------------------->
        <div
          v-else
          style="margin-top: 25px;"
        >
          <div class="reg-body">
            <div class="table-header">
              Choose the animal you need a kit for
            </div>


            <table style="width: 100%">
              <colgroup>
                <col
                  span="1"
                  style="width: 80%;"
                >
                <col
                  span="1"
                  style="width: 20%;"
                >
              </colgroup>
              <tbody>
                <tr style="background-color: #b7dbf1">
                  <th>Service Dog</th>
                  <th>Registration</th>
                </tr>

                <tr
                  v-for="(item, ix) in dogs"
                  :key="item._id"
                >
                  <td>
                    <input
                      v-model="dogs[ix].loc_selected"
                      type="checkbox"
                    >
                    {{ item.name }}
                  </td>
                  <td style="color: var(--color-subheading)">
                    {{ item.dog_num }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-3">
            <v-btn
              dark
              text
              class="ma-0 pa-0"
              style="height: 40px"
              @click="add_to_cart"
            >
              <div style="background-color: var(--color-btn); height: 40px; display: flex; justify-content: center; align-items: center; width: 170px">
                Add to cart
              </div>
              <div class="btn-arrow-right" />
            </v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "@/components/inputs/TextInput";
import MyForm from "@/components/inputs/MyForm";
import data_getters from "@/mixins/data_getters";
import validation from "@/mixins/validation";
import helpers from "@/utilities/helpers";
import DogList from "@/components/inputs/DogList";

export default {
   name: "StorePage1",
   components: {MyForm, TextInput, DogList},
   mixins: [data_getters,validation],
   data() {
      return {

         sds_number: null,

         dogs: [],
         user: null,

         show_dogs: false,
         show_dog_list: false,

         dog_to_add: null,
         loading_dog: false,

      }
   },


   async created(){
      if (this.$auth.isAuthenticated()){
         await this.get_dogs();

         // this.sds_number = this.$auth.profile.member_num;

        let cart = await this.make_request('/store/getActiveCart');

        if (cart != null){
          this.$store.commit('set_cart_items', cart.items);
          console.log('i ran')
          // await this.continue_forward();

          for (let i in this.dogs){

            let ix = helpers.findWithAttr(cart.items, 'details.dog_num', this.dogs[i].dog_num)
            if (ix > -1){
              this.dogs[i].loc_selected = true;
            }
          }


        }


      }
   },

   methods:{
     // async continue_forward(){
     //    if (!this.$refs.form.validate()){
     //       return;
     //    }
     //
     //    try{
     //       let dogs = await this.make_request('/private/getDogs', {dog_num: this.sds_number});
     //       // this.user = await this.make_request('/private/getProfile', {member_num: this.sds_number});
     //
     //       for (let i in dogs){
     //          dogs[i].loc_selected = false;
     //       }
     //
     //       // this.dogs = dogs;
     //       // this.show_dogs = true;
     //    }
     //
     //    catch (e) {
     //       throw e;
     //    }
     // },


      async get_dogs(){
         try{
            let dogs = await this.make_request('/private/getDogs', {user_id: this.$auth.profile.user_id});
            console.log(dogs)
            this.dogs = dogs;

            if (dogs.length==1){
               this.sds_number = 'SDS-'+dogs[0].dog_num;
            }
         }catch (e) {

         }
      },

      async get_dog(){
         if (!this.$refs.form.validate()){
            return;
         }

         try{
            this.loading_dog = true;
            let dog = await this.make_request('/public/getDogProfile', {dog_num: this.sds_number});


            this.$emit('dog-selected', dog )
            this.loading_dog = false;

         }

         catch (e) {
            throw e;
         }
      },



      // async add_to_cart(){
      //
      //   for (let d of this.dogs){
      //      if (d.loc_selected){
      //
      //         let item = {
      //           name: 'SDS Dog Kit',
      //           item_key: d.dog_num,
      //           description: `Registration kit for dog ${d.name}`,
      //           details: {
      //             user_id:  d.user_id,
      //             dog_id: d._id,
      //             dog_name: d.name,
      //             dog_num: d.dog_num,
      //           },
      //         }
      //
      //         this.$store.commit('add_cart_item', item);
      //      }
      //   }
      //
      //    let name_user = this.user.name_first + ' ' + this.user.name_last;
      //   let user= {
      //      user_id: this.user._id,
      //      member_num: this.user.member_num,
      //      name: name_user,
      //   }
      //    this.$store.commit('update_cart_user', user);
      //
      //   await this.make_request('/store/updateCartItems', {items:this.$store.state.cart});
      //
      //   this.$emit('items-added')
      //
      // },


     /**
      *
      * Get cart from database and update store
      */
     // async update_cart(){
     //   let cart = await this.make_request('/store/getActiveCart');
     //
     //   if (cart != null){
     //     this.$store.commit('set_cart_items', cart.items);
     //   }
     // }

   }
}
</script>







<style scoped>
   @import url('./store_common.css');


   .sds-arrow-button {
      background-color: pink;
      /*color: blue;*/
      padding: 5px 20px 5px 20px;
   }

   .text {
      background-color:#ff0000;
      color:#fff;
      display:inline-block;
      padding-left:4px;
   }



   /******* for arrow button *********/
   /*used for arrow after buttone*/
   .arrow-btn-container{
      display: flex;
      overflow: hidden;
      height: 40px;
   }

   .arrow-btn{
      background-color: var(--color-btn);
      border-radius: 0px;
      height: 40px !important;
      color: white;
      padding-left: 50px !important;
      padding-right: 50px !important;
   }




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
   th, td{
      text-align: left;
      padding: 10px;
      font-weight: 600;
   }

   th{
     color: var(--color-subheading);
   }

   tr:nth-child(odd) {background-color: #e7f3fb;}
   tr:nth-child(even) {background-color: #f7fbfd;}

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



</style>
